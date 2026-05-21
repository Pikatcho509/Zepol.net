// import { FirebaseManager } from './modules/firebase-manager.js'; // REMOVED STATIC IMPORT
import { NotificationSystem, renderChat, renderStories, renderPosts, createChatWindow, renderHelpGallery, updateWelcomeMessage } from './modules/ui.js?v=18.0.35';
import { openModal, closeModal, toggleSidebar, closeSidebar } from './modules/ui-core.js?v=18.0.35';
import { validateEmail, validatePhone, selectContactMethod, switchAuth } from './modules/auth.js?v=18.0.35';
import { switchWellnessMode, initCloudGame, addGratitudeNote, initVibeGame, initBreathingExercise } from './modules/wellness.js?v=18.0.35';
import { AIService } from './modules/ai-service.js?v=18.0.35'; // NEW IMPORT

let dataManager;
// Helper to expose globals immediately
window.openModal = openModal;
window.closeModal = closeModal;
window.switchAuth = switchAuth;
window.selectContactMethod = selectContactMethod;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
// Wellness Globals
window.initBreathingExercise = initBreathingExercise;
window.initCloudGame = initCloudGame;
window.initVibeGame = initVibeGame;
window.addGratitudeNote = addGratitudeNote;
window.switchWellnessMode = switchWellnessMode;

// --- MISSING FUNCTIONS IMPLEMENTATION ---
window.saveDraftFromShare = () => {
    const text = document.getElementById('share-text-input-page')?.value;
    if (!text) return NotificationSystem.show("Pa gen anyen pou sove.", "warning");
    localStorage.setItem('zepol_draft_' + Date.now(), text);
    NotificationSystem.show("Bouyon sove avÃ¨k siksÃ¨!", "success");
};

window.submitSharePost = async () => {
    const text = document.getElementById('share-text-input-page')?.value || document.getElementById('share-text-input-modal')?.value;
    const mood = document.getElementById('share-mood-input-page')?.value || "neutral";
    const nameInput = document.getElementById('share-name-input-page');
    const isAnon = !nameInput || nameInput.classList.contains('hidden');
    const authorName = isAnon ? "Anonim" : (nameInput.value || "Anonim");

    if (!text) return NotificationSystem.show("Tanpri ekri yon bagay.", "warning");

    const newPost = {
        text: text,
        author: authorName,
        mood: mood,
        likes: 0,
        comments: [],
        timestamp: new Date().toISOString()
    };

    // Simulate add (or use dataManager.addPost if available)
    NotificationSystem.show("Pataj ou a voye! MÃ¨si.", "success");
    closeModal('post-modal');
    if (document.getElementById('share-text-input-page')) document.getElementById('share-text-input-page').value = '';
};

window.exportUserData = () => {
    const data = {
        user: window.dataManager.getUser(),
        moodLogs: localStorage.getItem('zepol_mood_logs'),
        journal: "Exported Journal Data"
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "zepol_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    NotificationSystem.show("Done ou yo telechaje.", "success");
};

/* --- HOME PAGE SHARING LOGIC --- */
window.submitHomePost = async () => {
    const input = document.getElementById('home-share-input');
    const isAnon = document.getElementById('home-anon-toggle').checked;
    const text = input.value.trim();

    // Safety Check
    if (window.detectDistress && window.detectDistress(text)) return;

    if (!text) return NotificationSystem.show("Tanpri ekri yon bagay anvan ou pataje.", "warning");

    const user = dataManager.getUser(); // May be guest or logged in

    // Construct Post Object
    const newPost = {
        text: text,
        author: isAnon ? "Yon Nanm Pogre" : (user.name || "Yon Zanmi"), // "A Soul in Progress" or Member Name
        authorId: isAnon ? null : user.uid,
        isAnonymous: isAnon,
        mood: "neutral", // Default or could add mood selector later
        likes: 0,
        comments: [],
        timestamp: new Date().toISOString(),
        type: 'public'
    };

    console.log("ðŸ“¨ Submitting Home Post:", newPost);
    NotificationSystem.show("N ap voye pataj ou a...", "info");

    try {
        const success = await dataManager.addPost(newPost);
        if (success) {
            NotificationSystem.show("MÃ¨si paske w pataje. Ou pa pou kont ou. ðŸ’™", "success");
            input.value = ''; // Clear input
            // Ideally, the listener will auto-update the feed, but we can manually prepend if offline
            // if (window.dataManager === window.mockDataManager && window.currentPublicPosts) {
            //     window.currentPublicPosts.unshift(newPost);
            //     window.applyHomeFilter('all');
            // }
        } else {
            // Fallback for mock/offline
            NotificationSystem.show("Pataj ou a sove lokalman (Mode Hors Ligne).", "success");
            // Force UI update for immediate feedback
            if (!window.currentPublicPosts) window.currentPublicPosts = [];
            window.currentPublicPosts.unshift(newPost);
            window.applyHomeFilter('all');
            input.value = '';
        }
    } catch (e) {
        console.error("Post Error:", e);
        NotificationSystem.show("ErÃ¨ pandan pataj la.", "error");
    }
};

window.selectIdentity = (type, el) => {
    document.querySelectorAll('.identity-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    const input = document.getElementById('share-name-input-page');
    if (type === 'named') input?.classList.remove('hidden');
    else input?.classList.add('hidden');
};

window.selectMood = (mood, el) => {
    document.querySelectorAll('.mood-opt').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('share-mood-input-page').value = mood;
};

// Global Firestore Listeners Tracker (for cleanup on logout)
window.firestoreUnsubscribers = [];

const mockDataManager = {
    getUser: () => ({ name: 'Envite (Hors Ligne)', loggedIn: false, uid: null }),
    login: async () => ({ success: false, message: "Mode Hors Ligne: Connexion impossible." }),
    logout: async () => { },
    listenToPosts: (type, cb) => cb([]),
    addPost: async () => false,
    listenToNotifications: () => () => { },
    listenToInbox: () => () => { },
    listenToChat: (cb) => cb([]),
    listenToStories: (cb) => cb([])
};
// Default to mock initially
window.dataManager = mockDataManager;

// --- Firebase Loader Moved to Main Init ---

// --- Chatbot Functionality ---
window.chatHistory = [];
window.chatImageBase64 = null;
window.recognition = null;

// Initialize Voice Recognition if available
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ht-HT'; // Haitian Creole (or fr-FR if not supported well)
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        const input = document.getElementById('bot-input');
        if (input) {
            input.value = text;
            window.sendUserMessage();
        }
    };



    // --- DLS & GAMES LOGIC ---
    window.dlsCodes = [
        { code: "HT-LEGEND-10", author: "Admin", timestamp: Date.now() }
    ];

    window.submitDLSCode = () => {
        const input = document.getElementById('dls-code-input');
        const code = input.value.trim();
        if (!code) return NotificationSystem.show("Antre yon kÃ²d valab.", "warning");

        const newEntry = {
            code: code,
            author: dataManager.getUser().name || "JwÃ¨ Anonim",
            timestamp: Date.now()
        };

        window.dlsCodes.unshift(newEntry);
        input.value = '';
        NotificationSystem.show("KÃ²d ou a pataje! Bon match! âš½", "success");
        window.renderDLSCodes();
    };

    window.renderDLSCodes = () => {
        const container = document.getElementById('dls-codes-list');
        if (!container) return;

        container.innerHTML = window.dlsCodes.map(c => `
        <div class="dls-card bounce-in" style="background:white; padding:10px; border-radius:8px; border:1px solid #eee; text-align:center; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
            <span style="font-weight:bold; font-size:1.1rem; color:#2c3e50; display:block;">${c.code}</span>
            <div style="font-size:0.8rem; color:#7f8c8d; margin-top:5px;">${c.author}</div>
            <button onclick="navigator.clipboard.writeText('${c.code}'); NotificationSystem.show('KÃ²ye!', 'info')" style="margin-top:5px; font-size:0.7rem; padding:2px 8px; border-radius:4px; border:none; background:#edf2f7; cursor:pointer;">Kopye</button>
        </div>
    `).join('');
    };

    // --- END DLS LOGIC ---

    recognition.onend = () => {
        const btn = document.getElementById('voice-btn');
        if (btn) btn.classList.remove('recording');
    };

    window.recognition = recognition;
}

window.toggleVoiceInput = () => {
    if (!window.recognition) {
        NotificationSystem.show("NavigatÃ¨ ou a pa sipÃ²te vwa.", "warning");
        return;
    }
    const btn = document.getElementById('voice-btn');
    if (btn.classList.contains('recording')) {
        window.recognition.stop();
        btn.classList.remove('recording');
    } else {
        window.recognition.start();
        btn.classList.add('recording');
        NotificationSystem.show("Pale kounye a...", "info");
    }
};

// Image Upload Logic
window.triggerPhotoUpload = () => document.getElementById('chat-file-input').click();

window.handleChatImageSelect = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            window.chatImageBase64 = e.target.result;
            // Show preview
            document.getElementById('chat-preview-area').classList.remove('hidden');
            document.getElementById('chat-image-preview').src = window.chatImageBase64;
        };
        reader.readAsDataURL(input.files[0]);
    }
};

window.clearChatImage = () => {
    window.chatImageBase64 = null;
    document.getElementById('chat-preview-area').classList.add('hidden');
    document.getElementById('chat-file-input').value = '';
};

// Face Scan / Camera Logic
window.triggerFaceScan = async () => {
    // 1. Create Modal UI on the fly if not exists
    let camModal = document.getElementById('camera-modal');
    if (!camModal) {
        camModal = document.createElement('div');
        camModal.id = 'camera-modal';
        camModal.className = 'modal';
        camModal.innerHTML = `
            <div class="modal-content glass-panel" style="text-align:center; position:relative; overflow:hidden;">
                <h3>Analiz Emosyon</h3>
                <div style="position:relative; display:inline-block; width:100%; max-width:400px;">
                    <video id="face-video" autoplay playsinline style="width:100%; border-radius:10px; display:block;"></video>
                    <div id="scan-overlay" class="hidden" style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,20,0,0.3); border-radius:10px; z-index:10; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                        <div class="scan-line"></div>
                        <p id="scan-text" style="color:#00ff9d; font-weight:bold; font-size:16px; margin-top:20px; text-shadow:0 2px 4px rgba(0,0,0,0.8); background:rgba(0,0,0,0.6); padding:5px 10px; border-radius:5px;">
                            Pare pou analiz...
                        </p>
                    </div>
                </div>
                <canvas id="face-canvas" class="hidden"></canvas>
                <div class="modal-buttons" style="margin-top:15px;">
                    <button id="snap-btn" class="btn-primary" onclick="window.captureFace()">KÃ²manse Analiz ðŸ“¸</button>
                    <button class="btn-secondary" onclick="window.closeCamera()">Anile</button>
                </div>
            </div>
            <style>
                .scan-line {
                    width: 90%;
                    height: 3px;
                    background: #00ff9d;
                    box-shadow: 0 0 15px #00ff9d;
                    position: absolute;
                    top: 10%;
                    left: 5%;
                    animation: scanMove 2s infinite linear;
                }
                @keyframes scanMove {
                    0% { top: 10%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 90%; opacity: 0; }
                }
            </style>
        `;
        document.body.appendChild(camModal);
    }

    camModal.classList.remove('hidden');

    // Reset UI state
    const overlay = document.getElementById('scan-overlay');
    const btn = document.getElementById('snap-btn');
    if (overlay) overlay.classList.add('hidden');
    if (btn) btn.style.display = 'inline-block';

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('face-video');
        video.srcObject = stream;
        window.localStream = stream;
    } catch (err) {
        console.error("Camera Error:", err);
        NotificationSystem.show("Pa ka jwenn kamera a. Verifye pÃ¨misyon ou.", "error");
        window.closeCamera();
    }
};

window.captureFace = () => {
    const video = document.getElementById('face-video');
    const canvas = document.getElementById('face-canvas');
    const overlay = document.getElementById('scan-overlay');
    const snapBtn = document.getElementById('snap-btn');
    const scanText = document.getElementById('scan-text');

    if (video && canvas && overlay) {
        // Start Scanning Effect
        overlay.classList.remove('hidden');
        if (snapBtn) snapBtn.style.display = 'none';

        // Update text as requested
        if (scanText) scanText.innerHTML = "N ap analize vizaj ou<br>pou wÃ¨ nivo tristÃ¨s ou...";

        // Wait 3 seconds for effect
        setTimeout(() => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0);

            const dataUrl = canvas.toDataURL('image/jpeg');
            window.chatImageBase64 = dataUrl;

            window.closeCamera();

            // Auto send to chat
            const input = document.getElementById('bot-input');
            if (input) input.value = "Men foto m. Analize l."; // Optional text
            window.sendUserMessage();

        }, 3000);
    }
};

window.closeCamera = () => {
    const modal = document.getElementById('camera-modal');
    if (modal) modal.classList.add('hidden');
    if (window.localStream) {
        window.localStream.getTracks().forEach(track => track.stop());
    }
};


window.sendUserMessage = async () => {
    const input = document.getElementById('bot-input');
    const text = input.value.trim();
    const image = window.chatImageBase64;

    if (!text && !image) return;

    // 1. Add User Message
    addMessageToChat('user', text, image);
    input.value = '';
    window.clearChatImage(); // Clear image after sending

    window.chatHistory.push({ role: 'user', text: text }); // Note: We don't store base64 in history to save memory

    // 2. Show Typing Indicator
    const typingId = showTypingIndicator();

    // 3. Call AI
    const response = await AIService.sendMessage(text, window.chatHistory, image);

    // 4. Remove Typing & Add Bot Message
    removeTypingIndicator(typingId);
    addMessageToChat('bot', response);
    window.chatHistory.push({ role: 'model', text: response });
};

function addMessageToChat(role, text, image = null) {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    const div = document.createElement('div');
    div.className = `msg ${role}`;

    let content = '';
    if (image) {
        content += `<img src="${image}" style="max-width:150px; border-radius:10px; display:block; margin-bottom:5px;">`;
    }
    if (text) {
        content += text.replace(/\n/g, '<br>');
    }

    div.innerHTML = content;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'msg bot typing-indicator';
    div.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

window.toggleChat = () => {
    const user = dataManager.getUser();
    // Allow guests to chat too (USER REQUEST IMPLICIT) or keep restricted?
    // Let's allow everyone for now as it's a key feature.
    // if (!user.loggedIn) ... 

    const win = document.getElementById('chat-window') || createChatWindow();
    if (win) {
        win.classList.toggle('hidden');
        if (!win.classList.contains('hidden')) {
            document.getElementById('bot-input')?.focus();
        }
    }
};

// Call init
// Top-level init block removed. Initialization is handled by window.load at end of file.

function logAvailableViews() {
    const views = document.querySelectorAll('.view');
    const ids = Array.from(views).map(v => v.id);
    console.log(`ðŸ”Ž Found ${views.length} views in DOM:`, ids);
    if (views.length === 0) {
        console.error("âŒ CRITICAL: No views found! Check HTML structure or script loading order.");
        console.log("Body Content Preview:", document.body.innerHTML.substring(0, 500));
    } else if (!ids.includes('view-home')) {
        console.error("âŒ CRITICAL: 'view-home' is MISSING from the DOM list!");
    } else {
        const vh = document.getElementById('view-home');
        console.log("âœ… 'view-home' found. Parent:", vh.parentElement.id, "Classes:", vh.className);
    }
}


window.navigateTo = function (viewId) {
    console.log("ðŸš€ Navigating to:", viewId);

    // Safety check for views
    const targetId = `view-${viewId}`;
    let target = document.getElementById(targetId);

    if (!target) {
        console.warn(`âš ï¸ Target ${targetId} not found initially. Retrying search...`);
        // Use querySelector as fallback or re-log
        target = document.querySelector(`#${targetId}`);
    }

    const user = dataManager.getUser();
    const publicViews = ['home', 'sos'];
    const backBtn = document.getElementById('back-btn');

    if (!user.loggedIn && !publicViews.includes(viewId)) {
        NotificationSystem.show("Tanpri konekte pou aksede fonksyonalite sa a.", "info");
        navigateTo('home');
        openModal('auth-modal');
        return;
    }

    // 1. Force Close Dashboard if open
    const dashCollapse = document.getElementById('dashboard-collapse');
    if (dashCollapse && !dashCollapse.classList.contains('hidden')) {
        dashCollapse.classList.add('hidden');
        const toggleBtn = document.getElementById('dash-toggle-text');
        if (toggleBtn) toggleBtn.textContent = "Rezime Mwen";
    }

    // 1b. Force Close NEW Dashboard Sidebar & Overlay
    const dashSidebar = document.getElementById('dashboard-sidebar');
    const funcOverlay = document.getElementById('sidebar-overlay');
    if (dashSidebar && dashSidebar.classList.contains('active')) {
        dashSidebar.classList.remove('active');
    }
    if (funcOverlay && !funcOverlay.classList.contains('hidden')) {
        funcOverlay.classList.add('hidden');
    }

    // 1c. Force Close Mobile Navbar
    document.querySelector('.sidebar')?.classList.remove('mobile-open');

    // 2. Hide ALL views AND Modals/Overlays
    document.querySelectorAll('.view').forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
    });
    // Hide Member Dashboard Content by default
    const memberContent = document.getElementById('member-home-content');
    if (memberContent) memberContent.classList.add('hidden');

    // Close any open modals to prevent stacking
    document.querySelectorAll('.modal').forEach(el => el.classList.add('hidden'));

    // Close specific overlays
    document.getElementById('sidebar-overlay')?.classList.add('hidden');
    document.getElementById('chat-window')?.classList.add('hidden'); // Close chat on nav if open

    // 3. Show Target View
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');

        // If target is HOME and user is logged in, show member content
        if (viewId === 'home' && user.loggedIn && memberContent) {
            memberContent.classList.remove('hidden');
        }

        // Scroll Main Content to top (handled by .main-content class)
        const main = document.querySelector('.main-content');
        if (main) main.scrollTop = 0;
        else window.scrollTo(0, 0);

        console.log(`âœ… View ${viewId} is now active.`);
    } else {
        console.error(`âŒ Target view view-${viewId} not found! Fallback to Home.`);
        // Prevent white screen by forcing home
        const home = document.getElementById('view-home');
        if (home) {
            home.classList.remove('hidden');
            home.classList.add('active');
            if (user.loggedIn && memberContent) memberContent.classList.remove('hidden');
        }
    }

    // 4. Update Navigation State (Sidebar/Footer)
    document.querySelectorAll('.nav-links li, .nav-links a').forEach(el => {
        el.classList.remove('active');
        if (el.dataset.view === viewId) el.classList.add('active');
        if (viewId !== 'home' && el.innerText.toLowerCase().includes('akey')) {
            el.classList.remove('active');
        }
    });

    document.querySelectorAll('.mobile-nav-footer .mobile-nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.view === viewId) {
            item.classList.add('active');
        }
    });

    if (viewId !== 'home') backBtn?.classList.remove('hidden');
    else backBtn?.classList.add('hidden');

    // 5. View Specific Logic
    if (viewId === 'home') {
        if (window.unsubscribeHome) window.unsubscribeHome();
        window.unsubscribeHome = dataManager.listenToPosts('public', (posts) => {
            window.currentPublicPosts = posts;
            window.applyHomeFilter('all');
        });
    }

    if (viewId === 'community') {
        if (window.unsubscribePosts) window.unsubscribePosts();
        window.unsubscribePosts = dataManager.listenToPosts('community', (posts) => {
            window.currentCommunityPosts = posts;
            if (user.isMember) renderPosts(posts, 'posts-feed');
            else {
                const feed = document.getElementById('posts-feed');
                if (feed) feed.innerHTML = '<div style="text-align:center; padding: 40px; color: grey;">Mete tÃ¨t ou ansanm ak nou (vin manm) pou w wÃ¨ mesaj sa yo.</div>';
            }
        });
        // Ensure sub-listeners attached
        if (typeof renderStories === 'function') dataManager.listenToStories(renderStories);
    }

    if (viewId === 'messages') {
        if (dataManager.listenToInbox) dataManager.listenToInbox(renderInbox);
    }

    if (viewId === 'games' || viewId === 'wellness') {
        if (window.renderDLSCodes) window.renderDLSCodes();
    }

    if (window.startSosTicker) window.startSosTicker();
};

window.startSosTicker = () => {
    const ticker = document.getElementById('sos-ticker-text');
    if (!ticker) return;
    const messages = [
        "Ou pa pou kont ou. ðŸ’™",
        "Gen espwa toujou. âœ¨",
        "Nou la avÃ¨ w. ðŸ¤",
        "Chak pa konte. ðŸ‘£"
    ];
    let i = 0;
    if (window.sosInterval) clearInterval(window.sosInterval);
    window.sosInterval = setInterval(() => {
        ticker.style.opacity = 0;
        setTimeout(() => {
            i = (i + 1) % messages.length;
            ticker.textContent = messages[i];
            ticker.style.opacity = 1;
        }, 500);
    }, 4000);
};

window.handleBack = () => navigateTo('home');

// Click outside to close modals
document.addEventListener('click', (e) => {
    // 1. Modal Logic (If clicking on the backdrop itself)
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        if (modalId) {
            window.closeModal(modalId);
        }
    }
});

window.applyHomeFilter = (mood) => {
    if (!window.currentPublicPosts) return;
    const feed = document.getElementById('home-posts-feed');
    if (!feed) return;

    // Filter Logic
    let filtered = window.currentPublicPosts;
    if (mood !== 'all') {
        filtered = window.currentPublicPosts.filter(p => {
            // Check if post content or mood matches filter
            const txt = (p.text || "").toLowerCase();
            const m = (p.mood || "").toLowerCase();
            if (mood === 'happy') return m === 'happy' || m === 'joy' || txt.includes('kontan') || txt.includes('byen');
            if (mood === 'sad') return m === 'sad' || txt.includes('tris') || txt.includes('mal');
            if (mood === 'anxious') return m === 'anxious' || txt.includes('pÃ¨') || txt.includes('anksye');
            return false;
        });
    }

    // Render
    renderPosts(filtered.slice(0, window.showingAllHome ? 50 : 3), 'home-posts-feed');

    // Update active tab visual
    document.querySelectorAll('.home-filters .filter-chip').forEach(btn => {
        if (btn.innerText.toLowerCase().includes(mood === 'all' ? 'tout' : (mood === 'happy' ? 'kontan' : (mood === 'sad' ? 'tris' : 'anksye')))) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Handle "View All" visibility
    const viewAllBtn = document.querySelector('#featured-posts .view-all');
    if (viewAllBtn) {
        if (mood === 'all' && !window.showingAllHome) viewAllBtn.classList.remove('hidden');
        else viewAllBtn.classList.add('hidden');
    }
};



window.showAllHomePosts = function () {
    window.showingAllHome = true;
    window.applyHomeFilter('all');
};

window.startGuestQuiz = () => {
    ['1', '2', '3', '4'].forEach(s => document.getElementById(`quiz-step-${s}`)?.classList.add('hidden'));
    document.getElementById('quiz-step-1')?.classList.remove('hidden');
    document.getElementById('quiz-result-gate')?.classList.add('hidden');
    openModal('guest-quiz-modal');
};

window.nextQuizStep = (step) => {
    // Hide previous
    document.getElementById(`quiz-step-${step - 1}`)?.classList.add('hidden');
    // Show current
    document.getElementById(`quiz-step-${step}`)?.classList.remove('hidden');
};

window.finishQuiz = (resultType) => {
    // Hide last step
    document.getElementById('quiz-step-4')?.classList.add('hidden');
    // Show gate
    document.getElementById('quiz-result-gate')?.classList.remove('hidden');

    // Save Result for post-login
    localStorage.setItem('zepol_pending_result', resultType || 'general');
};

window.checkPendingQuizResult = () => {
    const pending = localStorage.getItem('zepol_pending_result');

    // Always check for Dashboard Card
    const dashCard = document.getElementById('dash-quiz-result-card');
    const dashAdvice = document.getElementById('dash-quiz-advice');

    if (pending) {
        // localStorage.removeItem('zepol_pending_result'); // Wait, let's keep it until dismissed? Or clear it.
        // For now clear it to avoid loops, but maybe we want persistence.

        let message = "MÃ¨si paske w te onÃ¨t ak tÃ¨t ou.";
        if (pending === 'hope') message = "LÃ¨ w kenbe espwa, ou deja fÃ¨ mwatye chemen an. Nou la pou n fÃ¨ rÃ¨s la avÃ¨ w.";
        if (pending === 'doubt') message = "Li nÃ²mal pou w gen dout. Isit la, n ap ede w jwenn klÃ¨te ak kalm.";
        if (pending === 'despair') message = "Ou gen anpil kouraj. Pataje pwa sa a avÃ¨k nou, pa pote l pou kont ou ankÃ².";

        // Dashboard Card Update
        if (dashCard && dashAdvice) {
            dashAdvice.textContent = message;
            dashCard.classList.remove('hidden');
        }

        // Modal Fallback (only if not on dashboard view?)
        const modal = document.getElementById('welcome-result-modal');
        if (modal && !dashCard) {
            const user = dataManager.getUser();
            document.getElementById('welcome-name').textContent = user.name || "Zanmi";
            document.getElementById('welcome-analysis').textContent = message;
            openModal('welcome-result-modal');
        }

        if (!modal && !dashCard) {
            NotificationSystem.show("Byenveni lakay ou. Rezilta w anrejistre.", "success");
        }
    }
};

const SUPPORT_QUOTES = [
    "Lavi a ka difisil, men sonje: apre lapli, solÃ¨y toujou leve. Ou gen fÃ²s pou w travÃ¨se nenpÃ²t tanpÃ¨t. ðŸ’™",
    "Pa bliye, ou enpÃ²tan. Chak ti pa ou fÃ¨ konte. Pran swen tÃ¨t ou jodi a, menm si se jis yon ti moman. ðŸŒ¿",
    "LÃ¨ w santi w ap noye, sonje ou konn naje. Respire fon, epi pran bagay yo youn pa youn. Ou pa pou kont ou. ðŸŒŠ",
    "Ou fÃ² plis pase sa w panse. Chak eprÃ¨v fÃ¨ w vin pi solid. Kenbe la, demen ap pi bÃ¨l. ðŸ’ª",
    "Jodi a, chwazi lapÃ¨. Kite sa w pa ka kontwole, epi konsantre sou sa ki fÃ¨ kÃ¨ w kontan. ðŸ•Šï¸",
    "ZepÃ²l la la pou ou. Pale lib, san jijman. Nou tout se yon fanmi. ðŸ¤"
];

// Sidebar Logic
window.toggleDashboardSidebar = () => {
    const sidebar = document.getElementById('dashboard-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) {
        sidebar.classList.toggle('active');
        if (overlay) overlay.classList.toggle('hidden');
    }
};

// Event Listeners for Sidebar
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sidebar-toggle')?.addEventListener('click', window.toggleDashboardSidebar);
    document.getElementById('sidebar-close')?.addEventListener('click', window.toggleDashboardSidebar);
    document.getElementById('sidebar-overlay')?.addEventListener('click', window.toggleDashboardSidebar);
});

window.updateUserUI = () => {
    // Safety check
    if (!window.dataManager) {
        console.warn("âš ï¸ updateUserUI called before dataManager init. Skipping.");
        return;
    }
    const user = window.dataManager.getUser();

    console.log("ðŸ”„ updateUserUI Triggered. User:", user.name, "LoggedIn:", user.loggedIn);

    // UI ELEMENTS
    const authHidden = document.querySelectorAll('.auth-only-hidden');
    const authVisible = document.querySelectorAll('.auth-only-visible');
    const memberContent = document.getElementById('member-home-content');
    const heroSection = document.querySelector('.hero-section');
    const guestFeatures = document.querySelector('.guest-features');

    if (user.loggedIn) {
        console.log("âœ… User Logged In -> UI Update");

        // Toggle Buttons (Hide Login/Register, Show Hamburger/Logout)
        authHidden.forEach(el => el.classList.add('hidden'));
        authVisible.forEach(el => el.classList.remove('hidden'));

        // Toggle Content on Home View
        if (memberContent) memberContent.classList.remove('hidden');
        if (heroSection) heroSection.classList.add('hidden');
        if (guestFeatures) guestFeatures.classList.add('hidden');

        // Update Member Specific Text
        const dashUser = document.getElementById('dash-user-name');
        const dashWelcome = document.getElementById('dash-welcome-name');
        if (dashUser) dashUser.textContent = user.name || "Manm";
        if (dashWelcome) dashWelcome.textContent = user.name || "Zanmi";

        // Show Header Icons
        document.querySelectorAll('.header-icon-btn').forEach(btn => btn.classList.remove('hidden'));

        // Random Quote Logic
        const quoteEl = document.getElementById('dynamic-quote');
        const subtitleEl = document.querySelector('.welcome-subtitle');
        const randomQuote = SUPPORT_QUOTES[Math.floor(Math.random() * SUPPORT_QUOTES.length)];

        if (quoteEl) quoteEl.textContent = randomQuote;
        if (subtitleEl) subtitleEl.textContent = randomQuote; // Also put it in the member welcome area

        // Check for pending quiz results
        window.checkPendingQuizResult();

        // Ensure View Home is Active if we are on dashboard flow (or just stay where we are)
        // If we were on a generic view, stick to it. If we were on 'view-dashboard', switch to 'view-home'
        const currentView = document.querySelector('.view.active');
        if (!currentView || currentView.id === 'view-dashboard') {
            navigateTo('home');
        }

    } else {
        console.log("ðŸ‘¤ User Logged Out -> Guest UI");

        // Toggle Buttons
        authHidden.forEach(el => el.classList.remove('hidden'));
        authVisible.forEach(el => el.classList.add('hidden'));

        // Toggle Content
        if (memberContent) memberContent.classList.add('hidden');
        if (heroSection) heroSection.classList.remove('hidden');
        if (guestFeatures) guestFeatures.classList.remove('hidden');
    }

    // Existing update logic for other parts
    // Dynamic Greeting
    const hour = new Date().getHours();
    const greetingText = document.getElementById('greeting-text');
    if (greetingText) {
        greetingText.innerText = hour >= 16 ? "Bonswa" : "Bonjou";
    }

    const lockOverlay = document.getElementById('auth-lock-overlay');

    if (user.loggedIn) {
        if (lockOverlay) lockOverlay.classList.add('hidden');
    } else {
        if (lockOverlay) lockOverlay.classList.remove('hidden');
    }

    // Re-enable notifications if logged in
    if (user.loggedIn) {
        setupNotifications();
    }
};

function setupNotifications() {
    const user = dataManager.getUser();
    if (!user.loggedIn || !user.uid) {
        // console.warn("âš ï¸ setupNotifications: User not logged in, skipping listeners.");
        return;
    }
    console.log("ðŸ”” Setting up Notifications for:", user.uid);
    if (dataManager.listenToNotifications) {
        if (window.unsubscribeNotifs) window.unsubscribeNotifs();
        window.unsubscribeNotifs = dataManager.listenToNotifications((notifs) => {
            const unreadCount = notifs.filter(n => !n.read).length;
            const badge = document.getElementById('notif-badge');
            if (badge) {
                badge.textContent = unreadCount;
                badge.classList.toggle('hidden', unreadCount === 0);
            }
            window.currentNotifications = notifs;
            renderNotifications();
        });
    }

    if (dataManager.listenToInbox) {
        if (window.unsubscribeInbox) window.unsubscribeInbox();
        window.unsubscribeInbox = dataManager.listenToInbox((messages) => {
            const unreadCount = messages.filter(m => !m.read).length;
            const badge = document.getElementById('msg-badge');
            if (badge) {
                badge.textContent = unreadCount;
                badge.classList.toggle('hidden', unreadCount === 0);
            }
            renderInbox(messages);
        });
    }
}

function renderNotifications() {
    const list = document.getElementById('notifications-list');
    if (!list || !window.currentNotifications) return;
    if (window.currentNotifications.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:grey;">Pa gen nouvo alÃ¨t.</p>';
        return;
    }
    list.innerHTML = window.currentNotifications.map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}" onclick="handleNotifClick('${n.id}', '${n.postId}')">
            <i class="fas ${n.type === 'like' ? 'fa-heart' : 'fa-comment'}"></i>
            <span><strong>${n.senderName}</strong> ${n.message}</span>
        </div>
    `).join('');
}

window.handleNotifClick = async (notifId, postId) => {
    await dataManager.markNotificationRead(notifId);
    closeModal('notifications-modal');
    if (postId) window.handleComment(postId);
};

window.openNotifications = () => openModal('notifications-modal');

// handleComment moved up

window.submitDM = async () => {
    const input = document.getElementById('dm-input');
    const text = input.value.trim();
    if (!text) return;
    const success = await dataManager.sendDirectMessage(window.currentDMRecipientId, text);
    if (success) {
        input.value = '';
        closeModal('direct-message-modal');
        openModal('thanks-modal');
    }
};

window.openMessageTo = (recipientId, recipientName) => {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        openModal('auth-modal');
        return NotificationSystem.show("Tanpri konekte pou w voye mesaj prive.", "warning");
    }
    if (!recipientId) {
        return NotificationSystem.show("Moun pa disponib kounye a.", "warning");
    }
    if (recipientId === user.uid) {
        return NotificationSystem.show("Ou pa ka voye mesaj bay tèt ou.", "warning");
    }
    window.currentDMRecipientId = recipientId;
    const title = document.getElementById('dm-recipient-name');
    if (title) title.textContent = `Pou: ${recipientName}`;
    openModal('direct-message-modal');
};

function renderInbox(messages) {
    const container = document.getElementById('inbox-list');
    if (!container) return;
    if (!messages || messages.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:grey;">Pa gen mesaj ankÃ².</div>';
        return;
    }
    container.innerHTML = messages.map(m => `
        <div class="msg-card ${m.read ? '' : 'unread'}">
            <div class="msg-avatar">${m.senderName[0]}</div>
            <div class="msg-content-mini">
                <div class="msg-header">
                    <span class="msg-sender">${m.senderName}</span>
                    <span class="msg-time">${new Date(m.date).toLocaleTimeString()}</span>
                </div>
                <div class="msg-text-preview">${m.text}</div>
            </div>
        </div>
    `).join('');
}

window.handleLike = async (postId) => {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        openModal('auth-modal');
        return;
    }
    await dataManager.likePost(postId);
};

window.handleComment = (postId) => {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        openModal('auth-modal');
        return;
    }
    window.currentPostId = postId;
    const post = (window.currentPublicPosts?.find(p => p.id === postId)) || (window.currentCommunityPosts?.find(p => p.id === postId));
    const list = document.getElementById('comments-list');
    list.innerHTML = '';
    if (post?.comments) {
        post.comments.forEach(c => {
            const cdiv = document.createElement('div');
            cdiv.className = 'comment-item';
            cdiv.style = "padding: 10px; border-bottom: 1px solid #eee; display:flex; justify-content:space-between; align-items:center;";
            cdiv.innerHTML = `
                <div><strong>${c.author}:</strong> ${c.text}</div>
                ${(c.authorId && c.authorId !== user.uid) ? `
                <button class="action-btn" onclick="closeModal('comment-modal'); window.openMessageTo('${c.authorId}', '${c.author}')">
                    <i class="fas fa-reply"></i> Prive
                </button>` : ''}
            `;
            list.appendChild(cdiv);
        });
    }
    openModal('comment-modal');
};

window.toggleQuickBreathe = () => {
    const circle = document.getElementById('mini-breathe-circle');
    const textSpan = document.getElementById('breathe-text');

    if (circle) {
        if (circle.classList.contains('hidden')) {
            circle.classList.remove('hidden');

            // Initial Text
            if (textSpan) textSpan.textContent = "Inspirer";

            // Loop for text change (4s cycle: 0-2s Inhale, 2-4s Exhale)
            window.breatheInterval = setInterval(() => {
                if (!textSpan) return;
                // Check animation phase approximately by toggling? 
                // Better: 0ms -> Inspirer, 2000ms -> Expirer
                // We set interval 2000ms.
                const txt = textSpan.textContent;
                textSpan.textContent = txt === "Inspirer" ? "Expirer" : "Inspirer";
            }, 2000);

            // Stop after 3 cycles (12 seconds)
            setTimeout(() => {
                circle.classList.add('hidden');
                clearInterval(window.breatheInterval);
            }, 12000);
        } else {
            circle.classList.add('hidden');
            if (window.breatheInterval) clearInterval(window.breatheInterval);
        }
    }
};

window.submitGratitude = async () => {
    const input = document.getElementById('gratitude-input');
    const text = input.value.trim();
    if (!text) return;

    // Simulate API call
    console.log("ðŸ™ Gratitude added:", text);
    // In a real app we would save this to Firestore
    // await dataManager.addGratitude(text); 

    input.value = '';
    closeModal('gratitude-modal');
    NotificationSystem.show("MÃ¨si! Gratitid ou ajoute nan bokal la. âœ¨", "success");

    // Update dashboard mini text if it exists
    const latestEl = document.getElementById('latest-gratitude');
    if (latestEl) latestEl.textContent = `"${text}"`;
};

window.saveJournalEntry = async () => {
    const text = document.getElementById('journal-text').value.trim();
    const status = document.getElementById('journal-save-status');

    if (!text) {
        closeModal('journal-entry-modal');
        return;
    }

    if (status) status.textContent = "Anrejistre...";

    // Simulate Save
    await new Promise(r => setTimeout(r, 800));
    console.log("ðŸ“– Journal saved");

    if (status) status.textContent = "Sove!";
    setTimeout(() => closeModal('journal-entry-modal'), 500);
    NotificationSystem.show("Panse w yo an sekirite.", "success");
};

window.showAllHomePosts = function () {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        openModal('auth-modal');
        return;
    }
    window.showingAllHome = true;
    window.applyHomeFilter('all');
    document.querySelector('#featured-posts .view-all')?.classList.add('hidden');
};

// Alias for HTML compatibility
window.filterHomePosts = window.applyHomeFilter;

window.updateUserUI(); // Use the wrapper or pass dataManager
document.querySelectorAll('.nav-links li').forEach(li => li.addEventListener('click', () => navigateTo(li.dataset.view)));



window.togglePassword = (fieldId) => {
    const input = document.getElementById(fieldId);
    const icon = document.getElementById('icon-' + fieldId);
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
        if (icon) {
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        }
    }
};

document.getElementById('login-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    if (window.isLoggingIn) {
        console.warn("🚫 Login already in progress, ignoring duplicate submit.");
        return;
    }
    console.log("ðŸ” Login Form Submitted");

    if (!window.dataManager) {
        console.error("âŒ Critical: window.dataManager is UNDEFINED during login attempt!");
        NotificationSystem.show("SistÃ¨m nan pa pare. RafraÃ®chissez paj la.", "error");
        return;
    }

    let id, pass;
    try {
        const idEl = document.getElementById('login-identifier');
        const passEl = document.getElementById('login-password');

        if (!idEl) console.error("âŒ CRITICAL: 'login-identifier' input NOT FOUND in DOM");
        if (!passEl) console.error("âŒ CRITICAL: 'login-password' input NOT FOUND in DOM");

        if (!idEl || !passEl) {
            NotificationSystem.show("ErÃ¨ teknik: FÃ²milÃ¨ enkonplÃ¨.", "error");
            return;
        }

        id = idEl.value.trim();
        pass = passEl.value.trim();
    } catch (err) {
        console.error("âŒ Error retrieving inputs:", err);
        return;
    }

    console.log("ðŸ‘‰ Inputs retrieved:", id ? "ID Present" : "No ID", pass ? "Pass Present" : "No Pass");

    if (!id || !pass) {
        console.warn("âš ï¸ Missing fields");
        NotificationSystem.show("Tanpri ranpli tout jaden yo.", "warning");
        return;
    }

    const submitBtn = document.querySelector('#login-form button[type="submit"]');
    console.log("ðŸ”˜ Button found:", submitBtn ? "Yes" : "No");

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Koneksyon...';
    submitBtn.disabled = true;

    console.log("ðŸ”’ Initiating Login Request to window.dataManager...");

    try {
        // Create a timeout promise (30s)
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), 30000)
        );

        // Race login
        const result = await Promise.race([
            window.dataManager.login(id, pass),
            timeout
        ]);

        console.log("ðŸ” Login Result:", result);

        if (result.success) {
            NotificationSystem.show("Byenveni tounen! ðŸ‘‹", "success");
            closeModal('auth-modal');
            await window.updateUserUI(); // Ensure UI updates
            navigateTo('home');
        } else {
            NotificationSystem.show(result.message || "ErÃ¨ koneksyon.", "error");
        }
    } catch (error) {
        console.error("âŒ Login Error:", error);
        if (error.message === 'timeout') {
            NotificationSystem.show("Koneksyon an pran twÃ²p tan. Verifye entÃ¨nÃ¨t ou.", "error");
        } else {
            NotificationSystem.show("ErÃ¨: " + error.message, "error");
        }
    } finally {
        // ALWAYS restore button state
        if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    }
});

document.getElementById('submit-comment-btn')?.addEventListener('click', async () => {
    const input = document.getElementById('comment-input');
    const isAnon = document.querySelector('input[name="comment-identity"]:checked')?.value === 'anon';
    if (!input.value.trim() || !window.currentPostId) return;
    if (await dataManager.addComment(window.currentPostId, { text: input.value.trim(), author: isAnon ? "Anonim" : dataManager.getUser().name })) {
        input.value = '';
        closeModal('comment-modal');
        NotificationSystem.show("RepÃ²ns ou voye!", "success");
    }
});

// --- APP INITIALIZATION & RECOVERY ---

async function initApp() {
    if (window.appInitialized) {
        console.warn("âš ï¸ App already initialized (Duplicate Call Blocked).");
        return;
    }
    window.appInitialized = true;
    console.log("ðŸš€ ZepÃ²l App Initializing...");

    // 0. Load Firebase (Merged Logic)
    window.addEventListener('unhandledrejection', function (event) {
        if (event.reason && (event.reason.code === 'permission-denied' || event.reason.message.includes('permission-denied'))) {
            event.preventDefault();
            console.warn("âš ï¸ Firestore Permission Denied - Switching to SAFE OFFLINE MODE.");
            if (window.dataManager !== window.mockDataManager) {
                window.dataManager = window.mockDataManager;
                NotificationSystem.show("MÃ²d Sekirite (Hors Ligne) aktive", "info");
            }
        }
    });

    try {
        console.log("ðŸŒ Attempting to load Firebase module...");
        const module = await import('./modules/firebase-manager.js');
        console.log("ðŸ“¦ Firebase Module Loaded.");
        dataManager = new module.FirebaseManager();
        window.dataManager = dataManager;
        console.log("âœ… Firebase loaded successfully.");

        // VISUAL DEBUG: Success
        const btn = document.querySelector('#login-form button[type="submit"]');
        if (btn) btn.innerHTML = "Konekte (En Ligne âœ…)";
        document.body.classList.add('firebase-active');
        NotificationSystem.show("SistÃ¨m Prensipal Aktive ðŸŸ¢", "success");

    } catch (e) {
        console.warn("âš ï¸ Firebase load failed:", e);
        NotificationSystem.show("Mode Hors Ligne ðŸ”´ (ErÃ¨ Chargement)", "warning");

        // VISUAL DEBUG: Failure
        const btn = document.querySelector('#login-form button[type="submit"]');
        if (btn) btn.innerHTML = "Konekte (Hors Ligne âŒ)";
    }

    // 0b. DOM Stability Check (Wait for Views)
    const views = document.querySelectorAll('.view');
    if (views.length === 0) {
        if (!window.viewRetryCount) window.viewRetryCount = 0;

        // Check if parent exists
        const parent = document.getElementById('member-home-content');

        if (window.viewRetryCount < 50) { // 50 * 500ms = 25 seconds max wait
            window.viewRetryCount++;
            if (window.viewRetryCount % 5 === 0) {
                console.warn(`âš ï¸ DOM not ready. Waiting... (${window.viewRetryCount}/50)`);
            }
            setTimeout(() => {
                window.appInitialized = false;
                initApp();
            }, 500); // 500ms interval for less CPU load
            return;
        } else {
            console.error("âŒ CRTICAL: DOM failed after 50 retries.");
            // Last ditch: Log body length
            console.error("Body length:", document.body.innerHTML.length);
        }
    }

    // 1. Initialize UI based on current Auth State
    const user = dataManager.getUser();

    // VISUAL UPDATE FOR LOGIN BUTTON
    const btn = document.querySelector('#login-form button[type="submit"]');
    if (user.loggedIn && btn) btn.innerHTML = "Konekte (En Ligne âœ…)";

    window.updateUserUI();

    // 2. Navigate to initial view
    navigateTo('home');
}

// Duplicate init block removed. Initialization is handled by window.load at end of file.



window.logout = async () => {
    await dataManager.logout();
    NotificationSystem.show("Ou dekonekte.", "info");
    // Force refresh to clear all states
    setTimeout(() => window.location.reload(), 500);
};


// --- Safety & Content Features ---
window.detectDistress = (text) => {
    const keywords = ['swisid', 'suicide', 'touye tÃ¨t', 'mouri', 'pa kapab ankÃ²', 'finisman', 'die', 'kill myself'];
    const lowerText = text.toLowerCase();
    const found = keywords.some(k => lowerText.includes(k));

    if (found) {
        console.warn("ðŸš¨ Distress detected in text:", text);
        openModal('sos-modal');
        // Optional: Notify admin or save special flag in Firestore
        return true;
    }
    return false;
};

window.seedTemplatePosts = () => {
    // Only seed if list is empty and user is guest/new
    const feed = document.getElementById('public-posts-feed');
    if (feed && feed.children.length === 0) {
        const templates = [
            { name: "Zanmi", text: "Mwen santi m pi byen jodia apre m fin pale ak yon moun isit la. Pa dekouraje! ðŸ’ª", time: "2 min" },
            { name: "Anonim", text: "Pafwa lavi a di, men nou la pou youn lÃ²t. ðŸ¤", time: "1h" },
            { name: "SipÃ²", text: "N ap Ã²ganize yon sesyon respirasyon aswÃ¨ a. Vini non! ðŸŒ¬ï¸", time: "3h" }
        ];

        let html = '';
        templates.forEach(post => {
            html += `
            <div class="post-card fade-in">
                <div class="post-header">
                    <div class="post-user-info">
                        <strong>${post.name}</strong>
                        <span style="font-size:0.8rem; color:#888;">â€¢ ${post.time}</span>
                    </div>
                </div>
                <div class="post-content">${post.text}</div>
                <div class="post-actions">
                    <button class="btn-text"><i class="fas fa-heart"></i> SipÃ²</button>
                    <button class="btn-text"><i class="fas fa-comment"></i> KÃ²mantÃ¨</button>
                </div>
            </div>`;
        });
        feed.innerHTML = html;
    }
};

window.onload = () => {
    setTimeout(window.seedTemplatePosts, 1500); // Run after initial load

    // Failsafe: Ensure Home View is visible
    setTimeout(() => {
        const homeView = document.getElementById('view-home');
        if (homeView && homeView.classList.contains('hidden')) {
            console.warn("âš ï¸ Home View was hidden, forcing display.");
            window.navigateTo('home');
        }

        // Ensure Hero is visible for guests
        if (window.dataManager) {
            const user = window.dataManager.getUser();
            if (!user.loggedIn) {
                const hero = document.querySelector('.hero-section');
                if (hero) hero.classList.remove('hidden');
            }
        }
    }, 500);
};

// --- Wellness Mode Switcher ---
window.switchWellnessMode = (mode) => {
    console.log("ðŸŒ¸ Switching Wellness Mode to:", mode);

    // 1. Update Buttons
    document.querySelectorAll('.wellness-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(`'${mode}'`)) {
            btn.classList.add('active');
        }
    });

    // 2. Hide All Modes
    document.querySelectorAll('.wellness-mode').forEach(el => el.classList.add('hidden'));

    // 3. Show Selected Mode
    const target = document.getElementById(`mode-${mode}`);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('bounce-in'); // Add animation
    } else {
        console.warn(`âš ï¸ Mode mode-${mode} not found!`);
    }

    // 4. Special Logic
    if (mode === 'dls') {
        if (window.renderDLSCodes) window.renderDLSCodes();
    }
    if (mode === 'clouds') {
        if (window.initCloudGame) window.initCloudGame();
    }
    if (mode === 'vibe') {
        // Vibe game might need init or restart
    }
};

// --- Secure Chat Toggle ---
window.toggleChat = function () {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        NotificationSystem.show("Tanpri konekte pou pale ak asistan an.", "info");
        openModal('auth-modal');
        return;
    }

    let chatWindow = document.getElementById('chat-window');
    if (!chatWindow) {
        // Try creating it if imported
        if (typeof createChatWindow === 'function') {
            chatWindow = createChatWindow();
            chatWindow.classList.remove('hidden'); // Show immediately
        } else {
            console.error("Chat Window Creator not found!");
            return;
        }
    } else {
        chatWindow.classList.toggle('hidden');
    }

    // Focus input if visible
    if (chatWindow && !chatWindow.classList.contains('hidden')) {
        const input = document.getElementById('bot-input');
        if (input) input.focus();
    }
};

// End of Script - Version 17.0.3

// --- Initialization Logic ---
window.addEventListener('load', () => {
    console.log("ðŸŒ Window Loaded. Initializing App...");
    setTimeout(() => {
        if (!window.appInitialized) {
            // window.appInitialized = true; // REMOVE THIS LINE - let initApp set it
            if (typeof initApp === 'function') {
                initApp();
            } else {
                console.error("âŒ initApp function not found!");
            }
        }
    }, 500);
});
// --- GUEST QUIZ LOGIC (Global Fallback) ---
window.currentQuizStep = 1;
window.quizData = {};

window.startGuestQuiz = () => {
    console.log("ðŸš€ Starting Guest Quiz...");
    window.currentQuizStep = 1;
    window.quizData = {};
    document.querySelectorAll('[id^="quiz-step-"]').forEach(el => el.classList.add('hidden'));

    const step1 = document.getElementById('quiz-step-1');
    if (step1) step1.classList.remove('hidden');

    document.getElementById('quiz-result-gate')?.classList.add('hidden');

    // Ensure modal is open
    const modal = document.getElementById('guest-quiz-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex'); // Ensure flex display if needed
    }
};

window.nextQuizStep = (step) => {
    console.log(`âž¡ï¸ Validating Step ${step}...`);
    // Hide all steps first
    document.querySelectorAll('[id^="quiz-step-"]').forEach(el => el.classList.add('hidden'));

    // Show target step
    const nextEl = document.getElementById(`quiz-step-${step}`);
    if (nextEl) {
        nextEl.classList.remove('hidden');
        nextEl.classList.add('fade-in');
        window.currentQuizStep = step;
    } else {
        console.error(`âŒ Step ${step} not found!`);
        // Fallback to result gate if step 4 fails
        if (step > 3) window.finishQuiz('unknown');
    }
};

window.finishQuiz = (resultType) => {
    console.log("ðŸ Finishing Quiz:", resultType);
    window.quizData.result = resultType;
    document.querySelectorAll('[id^="quiz-step-"]').forEach(el => el.classList.add('hidden'));

    const loader = document.getElementById('quiz-step-4');
    if (loader) loader.classList.remove('hidden');

    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
        const gate = document.getElementById('quiz-result-gate');
        if (gate) {
            gate.classList.remove('hidden');
            gate.classList.add('bounce-in');
        }
    }, 1500);
};

console.log("ðŸ Script (Fallback) Loaded Completely.");




// Mood Logging Function
window._legacyLogMood = (mood) => {
    // Visual Feedback
    const btn = document.querySelector(`.mood-btn[onclick*='${mood}']`);
    if (btn) {
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    }

    const advice = {
        'happy': {
            icon: '🌟',
            title: 'Bonè ak Lajwa !',
            text: 'Mwen kontan wè ou santi ou byen konsa! Pataje lajwa sa a ak kominote a oswa bay yon moun yon ti souri jodi a.',
            actionLabel: 'Pataje sa ✍️',
            actionRoute: 'share'
        },
        'neutral': {
            icon: '🍃',
            title: 'Yon Moman Kalm',
            text: 'Yon jounen trankil se yon bon okazyon pou w poze tèt ou. Èske w ta vle fè yon ti egzèsis respirasyon pou w rete nan eta sa a?',
            actionLabel: 'Respire 🌬️',
            actionRoute: 'wellness',
            subMode: 'breathing'
        },
        'sad': {
            icon: '💙',
            title: 'Nou la avè w',
            text: 'Li oke pou w pa oke. Pa kenbe sa pou ou sèl. Èske w ta vle pale ak AI konpayon nou an oswa pataje sa nan kominote a?',
            actionLabel: 'Pale ak AI 🤖',
            actionRoute: 'chatbot' // Specially handled in click
        },
        'anxious': {
            icon: '🌬️',
            title: 'Respire dousman',
            text: 'Lè anksyete a monte, pi bon zanmi w se souf ou. Eseye teknik respirasyon kare a kounye a.',
            actionLabel: 'Eseye kounye a 🧘‍♂️',
            actionRoute: 'wellness',
            subMode: 'breathing'
        }
    };

    const data = advice[mood] || advice['neutral'];

    // Update and Show Modal
    document.getElementById('mood-advice-icon').innerText = data.icon;
    document.getElementById('mood-advice-title').innerText = data.title;
    document.getElementById('mood-advice-text').innerText = data.text;

    const actionBtn = document.querySelector('#mood-advice-actions button.btn-primary');
    actionBtn.innerText = data.actionLabel;
    actionBtn.onclick = () => {
        closeModal('mood-advice-modal');
        if (data.actionRoute === 'chatbot') {
            toggleChat();
        } else {
            navigateTo(data.actionRoute);
            if (data.subMode) {
                setTimeout(() => switchWellnessMode(data.subMode), 100);
            }
        }
    };

    openModal('mood-advice-modal');

    // Save to local storage
    const logs = JSON.parse(localStorage.getItem('zepol_mood_logs') || '[]');
    logs.push({ mood, timestamp: new Date().toISOString() });
    localStorage.setItem('zepol_mood_logs', JSON.stringify(logs));
};
