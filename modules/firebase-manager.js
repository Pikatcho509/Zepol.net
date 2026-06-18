import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, doc, setDoc, getDoc, getDocs, updateDoc, collection, addDoc, query, orderBy, limit, onSnapshot, arrayUnion, increment, where, sendPasswordResetEmail, deleteDoc, GoogleAuthProvider, signInWithPopup } from '../firebase-config.js';
import { NotificationSystem } from './ui.js?v=18.0.43-MOOD-ENHANCED';

export class FirebaseManager {
    static ADMIN_EMAIL = 'pikatcho77@gmail.com';

    constructor() {
        this.currentUser = null;
        this.initAuth();
    }

    initAuth() {
        console.log("🔥 Initializing Firebase Auth... Project ID:", db._app.options.projectId);

        // Return a promise that resolves when the first auth check completes
        this.authReadyPromise = new Promise((resolve) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const userDoc = await getDoc(doc(db, "users", user.uid));
                        const userData = userDoc.exists() ? userDoc.data() : {};

                        // Load blocked users
                        const blockedUsersSnapshot = await getDoc(doc(db, `users/${user.uid}/blocked_users/list`));
                        const blockedUsersData = blockedUsersSnapshot.exists() ? blockedUsersSnapshot.data().uids || [] : [];

                        this.currentUser = {
                            name: user.displayName || user.email.split('@')[0],
                            email: user.email,
                            uid: user.uid,
                            loggedIn: true,
                            isMember: userData.isMember || false,
                            engagementCount: userData.engagementCount || 0,
                            hasAcceptedRules: userData.hasAcceptedRules || false,
                            blockedUsers: blockedUsersData,
                            plan: userData.plan || 'free',
                            premiumUntil: userData.premiumUntil || null,
                            purchases: userData.purchases || []
                        };
                        // Backfill / refresh the public profile mirror on every login.
                        this.syncPublicProfile({
                            uid: user.uid,
                            name: this.currentUser.name,
                            photoURL: user.photoURL
                        });
                    } catch (e) {
                        console.error("Error fetching user data:", e);
                        this.currentUser = {
                            name: user.displayName || user.email.split('@')[0],
                            email: user.email,
                            uid: user.uid,
                            loggedIn: true,
                            isMember: false,
                            engagementCount: 0,
                            hasAcceptedRules: false,
                            blockedUsers: []
                        };
                    }
                    // Start tracking online status
                    this.updateUserStatus('online');
                } else {
                    this.currentUser = { name: 'Envite', loggedIn: false, isMember: false, uid: null };
                }

                // Notify logic (UI updates)
                if (window.updateUserUI) window.updateUserUI(); // Global UI update

                // Resolve initialization promise on FIRST run
                resolve(this.currentUser);
            });
        });
    }

    // Helper to wait for auth ready
    async waitForAuth() {
        if (this.authReadyPromise) return this.authReadyPromise;
        return this.getUser();
    }

    getUser() {
        return this.currentUser || { name: 'Envite', loggedIn: false, isMember: false, uid: null };
    }

    async login(identifier, password) {
        console.log("🔥 FirebaseManager.login called with:", identifier);
        try {
            let email = identifier;
            // Phone Normalization logic
            if (/^[+]?[0-9\s]+$/.test(identifier) && !identifier.includes('@')) {
                email = `${identifier.replace(/\s/g, '')}@zepol-phone.temp`;
            }

            console.log("⏳ Awaiting signInWithEmailAndPassword...");

            // Login Timeout Race (15s)
            const loginPromise = signInWithEmailAndPassword(auth, email, password);
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('auth/network-timeout')), 15000)
            );

            const userCredential = await Promise.race([loginPromise, timeoutPromise]);

            console.log("✅ User Signed In:", userCredential.user.uid);

            // MANUAL STATE UPDATE: Set currentUser immediately to avoid listener race condition
            // We fetch the basic info we have now, firestore data may come later but loggedIn=true is key
            this.currentUser = {
                name: userCredential.user.displayName || userCredential.user.email.split('@')[0],
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                loggedIn: true,
                isMember: false // We don't know yet, but at least we are logged in. Listener will update this later.
            };
            return { success: true };
        } catch (error) {
            console.error("❌ Firebase Login Error:", error);
            // ...

            let msg = "Erè koneksyon.";
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                msg = "Imel oswa modpas ou pa kòrèk.";
            } else if (error.code === 'auth/too-many-requests') {
                msg = "Twòp esè echwe. Tanpri eseye pita.";
            } else if (error.code === 'auth/network-request-failed') {
                msg = "Pwoblèm koneksyon entènèt.";
            }
            return { success: false, message: msg };
        }
    }

    async register(identifier, password, userData = {}) {
        try {
            let email = identifier;
            // Phone Normalization
            if (/^[+]?[0-9\s]+$/.test(identifier) && !identifier.includes('@')) {
                email = `${identifier.replace(/\s/g, '')}@zepol-phone.temp`;
                if (!userData.phone) userData.phone = identifier;
            } else {
                if (!userData.email) userData.email = email;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: userData.fullName || userData.username
            });
            await setDoc(doc(db, "users", userCredential.user.uid), {
                fullName: userData.fullName || '',
                email: email,
                phone: userData.phone || '',
                username: userData.username || '',
                isMember: false, // Default to non-member
                createdAt: new Date().toISOString()
            });
            await this.syncPublicProfile({
                uid: userCredential.user.uid,
                name: userData.fullName || userData.username
            });
            return { success: true };
        } catch (error) {
            console.error("Registration Error:", error);
            let msg = error.message;
            if (error.code === 'auth/email-already-in-use') {
                msg = "Imèl sa a deja itilize. Eseye konekte pito.";
            } else if (error.code === 'auth/weak-password') {
                msg = "Modpas la twò fèb. Mete omwen 6 karaktè.";
            } else if (error.code === 'auth/invalid-email') {
                msg = "Imèl la pa bon.";
            }
            return { success: false, message: msg };
        }
    }

    async signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Create/update user doc in Firestore
            const userRef = doc(db, 'users', user.uid);
            const snap = await getDoc(userRef);
            if (!snap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    name: user.displayName || 'Manm Zepòl',
                    email: user.email,
                    photoURL: user.photoURL || null,
                    createdAt: new Date().toISOString(),
                    provider: 'google'
                });
            }
            await this.syncPublicProfile({
                uid: user.uid,
                name: user.displayName,
                photoURL: user.photoURL
            });
            return { success: true, user };
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            if (error.code === 'auth/popup-closed-by-user') {
                return { success: false, message: "Ou fèmen fenèt Google a." };
            }
            if (error.code === 'auth/popup-blocked') {
                return { success: false, message: "Navigatè w bloke popup. Pèmèt popup pou site sa a." };
            }
            return { success: false, message: "Erè koneksyon Google. Eseye ankò." };
        }
    }

    async resetPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true, message: "Imèl rekiperasyon voye! Tcheke bwat ou." };
        } catch (error) {
            console.error("Reset Password Error:", error);
            let msg = "Erè pandan voye imèl la.";
            if (error.code === 'auth/user-not-found') msg = "Pa gen kont ak imèl sa a.";
            if (error.code === 'auth/invalid-email') msg = "Imèl la pa valid.";
            return { success: false, message: msg };
        }
    }

    async logout() {
        if (this.currentUser?.uid && window.firestoreUnsubscribers) {
            window.firestoreUnsubscribers.forEach(unsub => {
                try {
                    unsub();
                } catch (e) {
                    console.warn('Error unsubscribing listener:', e);
                }
            });
            window.firestoreUnsubscribers = [];
        }
        await signOut(auth);
        window.location.reload(); // Refresh to clear all states
    }

    listenToPosts(type, callback) {
        const q = query(collection(db, "posts"), where("postType", "==", type), orderBy("date", "desc"), limit(50));

        return onSnapshot(q, (snapshot) => {
            const posts = [];
            const blocked = this.currentUser?.blockedUsers || [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (!blocked.includes(data.creatorUid)) {
                    posts.push({ id: doc.id, ...data });
                }
            });
            callback(posts);
        }, (error) => {
            if (error.code === 'failed-precondition' || error.message.includes('index')) {
                console.info("Missing Composite Index. Using Client-Side filtering fallback...");
                const fallbackQ = query(collection(db, "posts"), orderBy("date", "desc"), limit(100));
                onSnapshot(fallbackQ, (snapshot) => {
                    const posts = [];
                    const blocked = this.currentUser?.blockedUsers || [];
                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        if (data.postType === type && !blocked.includes(data.creatorUid)) {
                            posts.push({ id: doc.id, ...data });
                        }
                    });
                    callback(posts);
                });
            } else {
                console.error(`Firestore [${type}] error:`, error);
                callback([]);
            }
        });
    }

    async addPost(post) {
        try {
            const postData = {
                postType: post.postType || 'public',
                ...post,
                creatorUid: this.currentUser?.uid || 'guest',
                date: post.date || new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, "posts"), postData);
            return true;
        } catch (e) {
            console.error("❌ Error adding post: ", e);
            return false;
        }
    }

    async addMoodEntry(data) {
        if (!this.currentUser?.uid) return false;
        try {
            await addDoc(collection(db, `users/${this.currentUser.uid}/moods`), {
                ...data,
                timestamp: data.timestamp || new Date().toISOString()
            });
            return true;
        } catch (e) {
            console.warn("⚠️ Mood log skipped (Permissions):", e.message);
            return false;
        }
    }

    async updateUserStatus(status) {
        if (!this.currentUser?.uid || !this.currentUser.loggedIn) return;
        try {
            const statusRef = doc(db, "online_users", this.currentUser.uid);
            await setDoc(statusRef, {
                uid: this.currentUser.uid,
                name: this.currentUser.name || 'Zanmi',
                status: status || 'online',
                lastActive: new Date().toISOString()
            }, { merge: true });
        } catch (e) {
            // Silencing as warning for production stability
            console.warn("⚠️ Online status update skipped:", e.message);
        }
    }

    async likePost(postId) {
        try {
            const postRef = doc(db, "posts", postId);
            const postSnap = await getDoc(postRef);

            await updateDoc(postRef, {
                likes: increment(1)
            });

            if (postSnap.exists()) {
                const data = postSnap.data();
                if (data.creatorUid && data.creatorUid !== this.currentUser?.uid) {
                    await this.addNotification(data.creatorUid, {
                        type: 'like',
                        postId: postId,
                        senderName: this.currentUser?.name || 'Yon moun',
                        message: `soutni paj ou a.`
                    });
                }
            }
            return true;
        } catch (e) {
            console.error("Error liking post: ", e);
            return false;
        }
    }

    async addComment(postId, commentData) {
        if (!this.currentUser) return false;
        try {
            const postRef = doc(db, "posts", postId);
            const postSnap = await getDoc(postRef);

            const comment = {
                author: commentData.author || this.currentUser.name,
                authorId: this.currentUser.uid,
                text: commentData.text,
                date: new Date().toISOString()
            };

            await updateDoc(postRef, {
                comments: arrayUnion(comment)
            });

            if (postSnap.exists()) {
                const data = postSnap.data();
                if (data.creatorUid && data.creatorUid !== this.currentUser?.uid) {
                    await this.addNotification(data.creatorUid, {
                        type: 'comment',
                        postId: postId,
                        senderName: comment.author,
                        message: `kòmante sou pòs ou a.`
                    });
                }
            }
            return true;
        } catch (e) {
            console.error("Error adding comment: ", e);
            return false;
        }
    }

    async toggleMembership(status) {
        if (!this.currentUser?.uid) return false;
        try {
            await setDoc(doc(db, "users", this.currentUser.uid), {
                isMember: status,
                joinedCommunityAt: new Date().toISOString()
            }, { merge: true });
            this.currentUser.isMember = status;
            return true;
        } catch (e) {
            console.error("Error toggling membership:", e);
            return false;
        }
    }

    // ── SUBSCRIPTIONS / PREMIUM ──────────────────────────────────
    async subscribeToPlan(plan, paymentMethod, txRef) {
        if (!this.currentUser?.uid) return { success: false, message: "Konekte pou abòne." };
        try {
            // 1. Record subscription request (admin verifies payment)
            await addDoc(collection(db, "subscriptions"), {
                userId: this.currentUser.uid,
                userName: this.currentUser.name,
                userEmail: this.currentUser.email || null,
                plan: plan,                 // 'pro' | 'ultimate'
                paymentMethod: paymentMethod, // 'moncash' | 'natcash' | 'paypal'
                txRef: txRef || null,
                status: 'pending',          // admin sets to 'active'
                requestedAt: new Date().toISOString()
            });
            // 2. Mark user with pending plan so UI reflects it
            await setDoc(doc(db, "users", this.currentUser.uid), {
                pendingPlan: plan,
                pendingSince: new Date().toISOString()
            }, { merge: true });
            this.currentUser.pendingPlan = plan;
            return { success: true, message: "Demand abònman w resevwa!" };
        } catch (e) {
            console.error("Subscribe error:", e);
            return { success: false, message: "Erè. Eseye ankò." };
        }
    }

    getUserPlan() {
        if (!this.currentUser) return 'free';
        // Check premium expiry
        if (this.currentUser.premiumUntil) {
            const until = new Date(this.currentUser.premiumUntil);
            if (until < new Date()) return 'free';
        }
        return this.currentUser.plan || 'free';
    }

    isPremium() {
        const p = this.getUserPlan();
        return p === 'pro' || p === 'ultimate';
    }

    // Pwodwi/abònman itilizatè a (pou paj "Acha Mwen")
    async getMyPurchases() {
        if (!this.currentUser?.uid) return { purchases: [], subscriptions: [] };
        try {
            const uid = this.currentUser.uid;
            const [pSnap, sSnap] = await Promise.all([
                getDocs(query(collection(db, 'purchases'), where('userId', '==', uid))),
                getDocs(query(collection(db, 'subscriptions'), where('userId', '==', uid)))
            ]);
            const sortByDate = arr => arr.sort((a, b) =>
                new Date(b.purchasedAt || b.requestedAt || 0) - new Date(a.purchasedAt || a.requestedAt || 0));
            return {
                purchases: sortByDate(pSnap.docs.map(d => ({ id: d.id, ...d.data() }))),
                subscriptions: sortByDate(sSnap.docs.map(d => ({ id: d.id, ...d.data() })))
            };
        } catch (e) {
            console.warn('getMyPurchases error:', e);
            return { purchases: [], subscriptions: [] };
        }
    }

    // Eske itilizatè a achte yon pwodwi espesifik (livre)?
    hasProduct(productId) {
        return (this.currentUser?.purchases || []).includes(productId);
    }

    // ── DIGITAL PRODUCTS ─────────────────────────────────────────
    async purchaseProduct(productId, productName, price, paymentMethod, txRef) {
        if (!this.currentUser?.uid) return { success: false, message: "Konekte pou achte." };
        try {
            await addDoc(collection(db, "purchases"), {
                userId: this.currentUser.uid,
                userName: this.currentUser.name,
                productId, productName, price,
                paymentMethod, txRef: txRef || null,
                status: 'pending',
                purchasedAt: new Date().toISOString()
            });
            return { success: true, message: "Demand acha w resevwa!" };
        } catch (e) {
            console.error("Purchase error:", e);
            return { success: false, message: "Erè acha. Eseye ankò." };
        }
    }

    // ── REPORT POST ──────────────────────────────────────────────
    async reportPost(postId, reason) {
        if (!this.currentUser?.uid) return false;
        try {
            await addDoc(collection(db, "reports"), {
                postId: postId,
                reporterId: this.currentUser.uid,
                reporterName: this.currentUser.name,
                reason: reason || 'Kontni ki pa apwopriye',
                status: 'open',
                reportedAt: new Date().toISOString()
            });
            return true;
        } catch (e) {
            console.error("Report error:", e);
            return false;
        }
    }

    // ── SUPPORT REQUEST (mande èd) ───────────────────────────────
    async requestSupport(data) {
        if (!this.currentUser?.uid) return { success: false, message: "Konekte pou mande èd." };
        try {
            await addDoc(collection(db, "support_requests"), {
                userId: this.currentUser.uid,
                userName: this.currentUser.name,
                goal: data.goal || '',
                amount: data.amount || null,
                story: data.story || '',
                contact: data.contact || this.currentUser.email || null,
                status: 'pending',
                createdAt: new Date().toISOString()
            });
            return { success: true, message: "Demand èd ou voye! Ekip la ap revize l." };
        } catch (e) {
            console.error("Support request error:", e);
            return { success: false, message: "Erè. Eseye ankò." };
        }
    }

    // ── COACHING / KONSILTASYON ──────────────────────────────────
    async bookCoaching(data) {
        if (!this.currentUser?.uid) return { success: false, message: "Konekte pou rezève." };
        try {
            await addDoc(collection(db, "coaching_requests"), {
                userId: this.currentUser.uid,
                userName: this.currentUser.name,
                type: data.type || 'sikològ',
                preferredDate: data.preferredDate || null,
                phone: data.phone || null,
                note: data.note || '',
                status: 'pending',
                createdAt: new Date().toISOString()
            });
            return { success: true, message: "Demand randevou w voye! N ap kontakte w." };
        } catch (e) {
            console.error("Coaching error:", e);
            return { success: false, message: "Erè. Eseye ankò." };
        }
    }

    // ═══════════════════════════════════════════════════════════
    //  ADMIN PANEL (pikatcho77@gmail.com only)
    // ═══════════════════════════════════════════════════════════
    isAdmin() {
        // Check both cached user and live Firebase auth (fallback)
        const cachedEmail = (this.currentUser?.email || '').trim().toLowerCase();
        const authEmail = (auth.currentUser?.email || '').trim().toLowerCase();
        const adminEmail = FirebaseManager.ADMIN_EMAIL.toLowerCase();
        return cachedEmail === adminEmail || authEmail === adminEmail;
    }

    // Generic admin fetch — returns array of {id, ...data}
    async adminFetch(collName, statusFilter = null) {
        if (!this.isAdmin()) return [];
        try {
            const colRef = collection(db, collName);
            const snapshot = await getDocs(colRef);
            let items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            if (statusFilter) items = items.filter(i => i.status === statusFilter);
            // Sort newest first
            items.sort((a, b) => {
                const da = new Date(a.requestedAt || a.purchasedAt || a.createdAt || a.reportedAt || 0);
                const db2 = new Date(b.requestedAt || b.purchasedAt || b.createdAt || b.reportedAt || 0);
                return db2 - da;
            });
            return items;
        } catch (e) {
            console.error(`Admin fetch ${collName} error:`, e);
            return [];
        }
    }

    // Activate a subscription → set target user's plan + premium expiry
    async activateSubscription(subId, targetUserId, plan, months = 1) {
        if (!this.isAdmin()) return { success: false, message: "Pa otorize." };
        try {
            const until = new Date();
            until.setMonth(until.getMonth() + months);

            // Update the subscription doc
            await updateDoc(doc(db, "subscriptions", subId), {
                status: 'active',
                activatedAt: new Date().toISOString(),
                activatedBy: this.currentUser.email,
                premiumUntil: until.toISOString()
            });

            // Update the target user's plan
            await setDoc(doc(db, "users", targetUserId), {
                plan: plan,
                premiumUntil: until.toISOString(),
                pendingPlan: null
            }, { merge: true });

            return { success: true, message: `Plan ${plan} aktive pou ${months} mwa!` };
        } catch (e) {
            console.error("Activate subscription error:", e);
            return { success: false, message: "Erè aktivasyon." };
        }
    }

    // Reject / cancel any pending item
    async adminUpdateStatus(collName, docId, newStatus, extra = {}) {
        if (!this.isAdmin()) return { success: false, message: "Pa otorize." };
        try {
            await updateDoc(doc(db, collName, docId), {
                status: newStatus,
                resolvedAt: new Date().toISOString(),
                resolvedBy: this.currentUser.email,
                ...extra
            });
            return { success: true, message: "Mizajou fèt." };
        } catch (e) {
            console.error("Admin update error:", e);
            return { success: false, message: "Erè mizajou." };
        }
    }

    // Make yon acha "livre" EPI ajoute pwodwi a nan kont kliyan an (debloke l)
    async adminDeliverPurchase(purchaseId, buyerUserId, productId) {
        if (!this.isAdmin()) return { success: false, message: "Pa otorize." };
        try {
            await updateDoc(doc(db, "purchases", purchaseId), {
                status: 'delivered',
                deliveredAt: new Date().toISOString(),
                deliveredBy: this.currentUser.email
            });
            // Ajoute pwodwi a nan lis kliyan an genyen
            if (buyerUserId && productId) {
                await setDoc(doc(db, "users", buyerUserId), {
                    purchases: arrayUnion(productId)
                }, { merge: true });
            }
            return { success: true, message: "Pwodwi livre epi debloke pou kliyan an!" };
        } catch (e) {
            console.error("Deliver purchase error:", e);
            return { success: false, message: "Erè." };
        }
    }

    // Manually set a user's plan by their email (admin override)
    async adminSetPlanByEmail(email, plan, months = 1) {
        if (!this.isAdmin()) return { success: false, message: "Pa otorize." };
        try {
            // Find user by email
            const q = query(collection(db, "users"), where("email", "==", email.toLowerCase()));
            const snap = await getDocs(q);
            if (snap.empty) return { success: false, message: "Itilizatè pa jwenn." };
            const userDoc = snap.docs[0];
            const until = new Date();
            until.setMonth(until.getMonth() + months);
            await setDoc(doc(db, "users", userDoc.id), {
                plan: plan,
                premiumUntil: plan === 'free' ? null : until.toISOString(),
                pendingPlan: null
            }, { merge: true });
            return { success: true, message: `Plan ${email} mete sou ${plan}.` };
        } catch (e) {
            console.error("Admin set plan error:", e);
            return { success: false, message: "Erè." };
        }
    }

    async blockUser(userIdToBlock) {
        if (!this.currentUser?.uid) return false;
        try {
            const currentBlocked = this.currentUser.blockedUsers || [];
            if (!currentBlocked.includes(userIdToBlock)) {
                currentBlocked.push(userIdToBlock);
                await setDoc(doc(db, `users/${this.currentUser.uid}/blocked_users/list`), { uids: currentBlocked }, { merge: true });
                this.currentUser.blockedUsers = currentBlocked;
                // Force UI refresh explicitly on post / inbox level later if needed.
                return true;
            }
            return true; // Already blocked
        } catch (e) {
            console.error("Error blocking user:", e);
            return false;
        }
    }

    // --- Notifications & DMs ---

    async addNotification(userId, data) {
        try {
            await addDoc(collection(db, `users/${userId}/notifications`), {
                ...data,
                read: false,
                date: new Date().toISOString()
            });
        } catch (e) {
            console.error("Error adding notification:", e);
        }
    }

    listenToNotifications(callback) {
        if (!this.currentUser?.uid || !this.currentUser.loggedIn) {
            // Return dummy unsubscriber
            return () => { };
        }
        const q = query(collection(db, `users/${this.currentUser.uid}/notifications`), orderBy("date", "desc"), limit(20));
        return onSnapshot(q, (snapshot) => {
            const notifs = [];
            snapshot.forEach((doc) => {
                notifs.push({ id: doc.id, ...doc.data() });
            });
            callback(notifs);
        }, (error) => {
            console.warn("⚠️ Listen Notifications Error:", error.message);
            callback([]);
        });
    }

    async markNotificationRead(notifId) {
        if (!this.currentUser?.uid) return;
        try {
            await updateDoc(doc(db, `users/${this.currentUser.uid}/notifications`, notifId), {
                read: true
            });
        } catch (e) {
            console.error("Error marking notif read:", e);
        }
    }

    async deleteNotification(notifId) {
        if (!this.currentUser?.uid) return false;
        try {
            await deleteDoc(doc(db, `users/${this.currentUser.uid}/notifications`, notifId));
            return true;
        } catch (e) {
            console.error("Error deleting notification:", e);
            return false;
        }
    }

    async sendDirectMessage(recipientId, text) {
        if (!this.currentUser?.uid) return false;
        try {
            const msg = {
                senderId: this.currentUser.uid,
                senderName: this.currentUser.name || 'Zanmi Zepòl',
                recipientId: recipientId,
                text: text,
                date: new Date().toISOString(),
                read: false,
                type: 'dm'
            };
            // Use top-level collection for universal access (bypass per-user permission blocks)
            await addDoc(collection(db, "direct_messages"), msg);

            await this.addNotification(recipientId, {
                type: 'dm',
                senderName: this.currentUser.name || 'Zanmi Zepòl',
                message: "voye yon bèl mesaj sipò pou ou. Mèsi pou konfyans ou! 🕊️"
            });
            console.log("✅ DM sent via shared collection");
            return true;
        } catch (e) {
            console.error("❌ DM Send Error:", e);
            return false;
        }
    }

    listenToInbox(callback) {
        if (!this.currentUser?.uid || !this.currentUser.loggedIn) return () => { };
        
        let receivedMsgs = [];
        let sentMsgs = [];
        let isInitialLoad1 = true;
        let isInitialLoad2 = true;

        const mergeAndCallback = () => {
            const allMsgs = [...receivedMsgs, ...sentMsgs];
            // Sort by date descending
            allMsgs.sort((a, b) => new Date(b.date) - new Date(a.date));
            // De-duplicate by ID just in case
            const uniqueMsgs = [];
            const seen = new Set();
            for (const msg of allMsgs) {
                if (!seen.has(msg.id)) {
                    seen.add(msg.id);
                    uniqueMsgs.push(msg);
                }
            }
            console.log(`📩 Inbox updated: ${uniqueMsgs.length} messages combined`);
            callback(uniqueMsgs.slice(0, 100));
        };

        const qReceived = query(
            collection(db, "direct_messages"),
            where("recipientId", "==", this.currentUser.uid),
            orderBy("date", "desc"),
            limit(50)
        );

        const unsub1 = onSnapshot(qReceived, (snapshot) => {
            const blocked = this.currentUser?.blockedUsers || [];
            receivedMsgs = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (!blocked.includes(data.senderId)) {
                    receivedMsgs.push({ id: doc.id, ...data });
                }
            });
            isInitialLoad1 = false;
            mergeAndCallback();
        }, (error) => {
            console.warn("⚠️ Listen Inbox Error (Received):", error.message);
            isInitialLoad1 = false;
            mergeAndCallback();
        });

        const qSent = query(
            collection(db, "direct_messages"),
            where("senderId", "==", this.currentUser.uid),
            orderBy("date", "desc"),
            limit(50)
        );

        const unsub2 = onSnapshot(qSent, (snapshot) => {
            sentMsgs = [];
            snapshot.forEach((doc) => {
                sentMsgs.push({ id: doc.id, ...doc.data() });
            });
            isInitialLoad2 = false;
            mergeAndCallback();
        }, (error) => {
            if (error.code === 'failed-precondition' || error.message.includes('index')) {
                // If index is missing for senderId + date, we can fallback or just ignore. 
                // Mostly Firebase requires index for where + orderBy.
                // We'll just fetch without orderBy if we have to.
                console.info("Missing Index for Sent messages, using fallback...");
                const fallbackQ = query(collection(db, "direct_messages"), where("senderId", "==", this.currentUser.uid), limit(50));
                onSnapshot(fallbackQ, (fbSnapshot) => {
                    sentMsgs = fbSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                    mergeAndCallback();
                });
            } else {
                console.warn("⚠️ Listen Inbox Error (Sent):", error.message);
            }
            isInitialLoad2 = false;
            mergeAndCallback();
        });

        return () => {
            unsub1();
            unsub2();
        };
    }

    async deleteMessage(messageId) {
        if (!this.currentUser?.uid) return false;
        try {
            await deleteDoc(doc(db, "direct_messages", messageId));
            return true;
        } catch (e) {
            console.error("Error deleting message:", e);
            return false;
        }
    }

    // Keep a PUBLIC, non-sensitive mirror of the profile so social
    // features (chat search, names, avatars) keep working WITHOUT
    // exposing email/phone stored in the private `users` doc.
    async syncPublicProfile({ uid, name, photoURL } = {}) {
        try {
            uid = uid || this.currentUser?.uid;
            if (!uid) return;
            await setDoc(doc(db, "public_profiles", uid), {
                uid: uid,
                name: name || this.currentUser?.name || 'Manm Zepòl',
                photoURL: photoURL || null,
                updatedAt: new Date().toISOString()
            }, { merge: true });
        } catch (e) {
            console.warn("syncPublicProfile skipped:", e?.message);
        }
    }

    async getUserProfile(uid) {
        try {
            // Read the public mirror — NOT the private users doc.
            const docRef = doc(db, "public_profiles", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            }
        } catch (e) {
            console.warn("getUserProfile error:", e);
        }
        return null;
    }

    // --- Other methods ---
    async addSuccessStory(story) {
        try {
            await addDoc(collection(db, "success_stories"), { ...story, date: new Date().toISOString() });
            return true;
        } catch (e) { return false; }
    }

    listenToStories(callback) {
        const q = query(collection(db, "success_stories"), orderBy("date", "desc"), limit(20));
        return onSnapshot(q, (snapshot) => {
            const stories = [];
            snapshot.forEach((doc) => stories.push({ id: doc.id, ...doc.data() }));
            callback(stories);
        }, (error) => {
            console.warn("Listen Stories Error:", error.message);
            callback([]);
        });
    }

    listenToChat(callback) {
        const q = query(collection(db, "support_chat"), orderBy("date", "asc"), limit(100));
        return onSnapshot(q, (snapshot) => {
            const msgs = [];
            snapshot.forEach((doc) => msgs.push({ id: doc.id, ...doc.data() }));
            callback(msgs);
        }, (error) => {
            console.warn("Listen Chat Error:", error.message);
            callback([]);
        });
    }

    async sendMessage(text) {
        if (!this.currentUser?.loggedIn) return false;
        try {
            await addDoc(collection(db, "support_chat"), {
                author: this.currentUser.name,
                text: text,
                date: new Date().toISOString()
            });
            return true;
        } catch (e) { return false; }
    }

    // --- DLS & Mood Enhancements ---
    async addDLSCode(code) {
        if (!this.currentUser?.uid) return false;
        try {
            await addDoc(collection(db, "dls_lobby"), {
                code: code,
                ownerId: this.currentUser.uid,
                ownerName: this.currentUser.name,
                timestamp: new Date().toISOString(),
                status: 'open'
            });
            return true;
        } catch (e) { return false; }
    }

    listenToDLSLobby(callback) {
        const q = query(collection(db, "dls_lobby"), orderBy("timestamp", "desc"), limit(20));
        return onSnapshot(q, (snapshot) => {
            const codes = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.status === 'open' || data.type !== 'system') {
                    codes.push({ id: doc.id, ...data });
                }
            });
            callback(codes);
        }, (error) => {
            // Quietly handle permission errors in production
            if (error.message.includes("permissions")) {
                console.info("ℹ️ Lobby listener restricted by permissions.");
            } else {
                console.warn("⚠️ Listen DLS Lobby Error:", error.message);
            }
            callback([]);
        });
    }

    async findSystemMatch() {
        if (!this.currentUser?.uid) return null;
        try {
            // Find an open system match not created by the current user
            const q = query(collection(db, "dls_lobby"), where("type", "==", "system"), where("status", "==", "waiting_for_player"), limit(5));
            const snapshot = await getDocs(q);
            let matchIdToJoin = null;

            snapshot.forEach(docSnap => {
                if (docSnap.data().ownerId !== this.currentUser.uid && !matchIdToJoin) {
                    matchIdToJoin = docSnap.id;
                }
            });

            if (matchIdToJoin) {
                return await this.joinSystemMatch(matchIdToJoin);
            } else {
                return await this.createSystemMatch();
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async createSystemMatch() {
        if (!this.currentUser?.uid) return null;
        try {
            const matchDoc = await addDoc(collection(db, "dls_lobby"), {
                type: 'system',
                ownerId: this.currentUser.uid,
                ownerName: this.currentUser.name,
                status: 'waiting_for_player',
                timestamp: new Date().toISOString()
            });
            return matchDoc.id;
        } catch (e) {
            console.error(e); return null;
        }
    }

    async joinSystemMatch(matchId) {
        if (!this.currentUser?.uid) return null;
        try {
            const gameCode = `Zepòl-${Math.floor(1000 + Math.random() * 9000)}`;
            const matchRef = doc(db, "dls_lobby", matchId);
            await updateDoc(matchRef, {
                status: 'matched',
                joinerId: this.currentUser.uid,
                joinerName: this.currentUser.name,
                gameCode: gameCode
            });

            // Notify original owner out of courtesy
            const matchSnap = await getDoc(matchRef);
            if (matchSnap.exists()) {
                await this.notifyDLSEvent(matchSnap.data().ownerId, { type: 'match_accept', joinerName: this.currentUser.name });
            }

            return matchId;
        } catch (e) {
            console.error(e); return null;
        }
    }

    listenToMatch(matchId, callback) {
        if (!matchId) return () => { };
        return onSnapshot(doc(db, "dls_lobby", matchId), (docSnap) => {
            if (docSnap.exists()) {
                callback({ id: docSnap.id, ...docSnap.data() });
            } else {
                callback(null);
            }
        });
    }
    async notifyDLSEvent(targetId, data) {
        if (!this.currentUser?.uid) return false;
        try {
            const msg = data.type === 'match_accept'
                ? `⚽ ${data.joinerName} aksepte defi DLS ou a! Pare kò w.`
                : `⚽ ${this.currentUser.name} envite w jwe DLS. Kòd: ${data.code}`;

            await this.addNotification(targetId, {
                type: 'dls',
                senderName: this.currentUser.name,
                message: msg
            });
            return true;
        } catch (e) { return false; }
    }

    async addMoodEntry(entry) {
        if (!this.currentUser?.uid) return false;
        try {
            await addDoc(collection(db, `users/${this.currentUser.uid}/moods`), entry);
            return true;
        } catch (e) { return false; }
    }

    // --- COMMUNITY & ENGAGEMENT ---
    async trackEngagement() {
        if (!this.currentUser?.uid || !this.currentUser.loggedIn) return;
        try {
            const userRef = doc(db, "users", this.currentUser.uid);
            await updateDoc(userRef, {
                engagementCount: increment(1)
            });
            // Update local state
            this.currentUser.engagementCount = (this.currentUser.engagementCount || 0) + 1;
            if (window.updateUserUI) window.updateUserUI();
        } catch (e) {
            console.error("Error tracking engagement:", e);
        }
    }

    async acceptCommunityRules() {
        if (!this.currentUser?.uid || !this.currentUser.loggedIn) return;
        try {
            const userRef = doc(db, "users", this.currentUser.uid);
            await updateDoc(userRef, {
                hasAcceptedRules: true
            });
            this.currentUser.hasAcceptedRules = true;
            if (window.updateUserUI) window.updateUserUI();
        } catch (e) {
            console.error("Error accepting rules:", e);
        }
    }

    // --- ONLINE STATUS ---
    async updateUserStatus(status) {
        if (!this.currentUser?.uid || !this.currentUser.loggedIn) return;
        try {
            const statusRef = doc(db, "online_users", this.currentUser.uid);
            await setDoc(statusRef, {
                uid: this.currentUser.uid,
                name: this.currentUser.name || 'Zanmi',
                status: status || 'online',
                lastActive: new Date().toISOString()
            }, { merge: true });
        } catch (e) {
            // Silencing as warning for production stability
            console.warn("⚠️ Online status update skipped:", e.message);
        }
    }

    listenToOnlineUsers(callback) {
        const q = query(collection(db, "online_users"), where("status", "==", "online"), limit(50));
        return onSnapshot(q, (snapshot) => {
            const users = [];
            snapshot.forEach(doc => users.push(doc.data()));
            callback(users);
        }, (error) => {
            if (error.message.includes("permissions")) {
                console.info("ℹ️ Online users list restricted by permissions.");
            } else {
                console.warn("Listen Online Users Error:", error.message);
            }
            callback([]);
        });
    }
}
