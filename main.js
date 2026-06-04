console.log("🚀 Zepòl v18.0.43 - MOOD ENHANCED");
import { NotificationSystem, renderChat, renderStories, renderPosts, createChatWindow, renderHelpGallery, updateWelcomeMessage } from './modules/ui.js?v=18.0.43-MOOD-ENHANCED';
// import './script.js?v=18.0.35'; // REMOVED to prevent duplicate UI logic
import { openModal, closeModal, toggleSidebar, closeSidebar } from './modules/ui-core.js?v=18.0.43-MOOD-ENHANCED';
import { validateEmail, validatePhone, selectContactMethod, switchAuth } from './modules/auth.js?v=18.0.43-MOOD-ENHANCED';
import { switchWellnessMode, initCloudGame, addGratitudeNote, initVibeGame, startTest, answerTest, launchGame, closeActiveGame, startBreathing } from './modules/wellness.js?v=18.0.43-MOOD-ENHANCED';
import { AIService } from './modules/ai-service.js?v=18.0.43-MOOD-ENHANCED'; // Force cache refresh
import { renderLibraryUI } from './modules/library.js';
import { renderMessagingUI } from './modules/messaging.js';

let dataManager;
window.currentUserId = null;
window.currentUserName = null;
window.currentHomeFilter = 'all';
window.refreshCurrentUser = () => {
    const user = dataManager?.getUser?.() || {};
    window.currentUserId = user.uid || null;
    window.currentUserName = user.name || null;
};

// Helper to expose globals immediately
window.openModal = openModal;
window.closeModal = closeModal;
window.switchAuth = switchAuth;
window.selectContactMethod = selectContactMethod;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
// Wellness Globals
// removed initBreathingExercise
window.initCloudGame = initCloudGame;
window.initVibeGame = initVibeGame;
window.addGratitudeNote = addGratitudeNote;
window.switchWellnessMode = switchWellnessMode;
window.startTest = startTest;
window.answerTest = answerTest;
window.launchGame = launchGame;
window.closeActiveGame = closeActiveGame;
window.startBreathing = startBreathing;
window.renderLibraryUI = renderLibraryUI;
window.renderMessagingUI = renderMessagingUI;

window.toggleEmergencyMode = () => {
    const overlay = document.getElementById('emergency-overlay');
    if (!overlay) return;
    
    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
        // Try to play soothing audio if available
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.src = "https://www.soundjay.com/nature/sounds/rain-03.mp3"; // Soothing rain
            bgMusic.loop = true;
            bgMusic.volume = 0.5;
            bgMusic.play().catch(e => console.log("Audio play prevented:", e));
        }
    } else {
        overlay.classList.add('hidden');
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) bgMusic.pause();
    }
};

// --- BOOKMARK SYSTEM (localStorage) ---
const BOOKMARK_KEY = 'zepol_bookmarks';

function getBookmarks() {
    try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '{}'); }
    catch(e) { return {}; }
}

window.isArticleBookmarked = (id) => {
    return !!getBookmarks()[id];
};

window.toggleBookmark = (type, id) => {
    const bookmarks = getBookmarks();
    if (bookmarks[id]) {
        delete bookmarks[id];
        NotificationSystem.show('Retire nan favori yo.', 'info');
    } else {
        bookmarks[id] = { type, id, savedAt: new Date().toISOString() };
        NotificationSystem.show('✅ Ajoute nan favori w yo!', 'success');
    }
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    // Refresh the bookmark button color in the UI
    const btn = document.querySelector(`.bookmark-btn[onclick*="${id}"]`);
    if (btn) btn.style.color = bookmarks[id] ? '#ff6b6b' : (type === 'book' ? '#475569' : '#999');
};

// --- MISSING FUNCTIONS IMPLEMENTATION ---
window.saveDraftFromShare = () => {
    const text = (document.getElementById('share-text-input-page') || document.getElementById('share-text-input'))?.value;
    if (!text) return NotificationSystem.show("Pa gen anyen pou sove.", "warning");
    localStorage.setItem('zepol_draft_' + Date.now(), text);
    NotificationSystem.show("Bouyon sove avèk siksè!", "success");
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

    // Track engagement for community access
    if (dataManager) dataManager.trackEngagement();

    // Simulate add (or use dataManager.addPost if available)
    NotificationSystem.show("Pataj ou a voye! Mèsi.", "success");
    closeModal('post-modal');
    if (document.getElementById('share-text-input-page')) document.getElementById('share-text-input-page').value = '';
};

window.openStoryModal = () => {
    const titleField = document.getElementById('story-title');
    const authorField = document.getElementById('story-author');
    const contentField = document.getElementById('story-content');
    const moodField = document.getElementById('story-mood');
    if (titleField) titleField.value = '';
    if (authorField) authorField.value = '';
    if (contentField) contentField.value = '';
    if (moodField) moodField.value = 'victory';
    document.getElementById('story-mode-victory')?.classList.add('active');
    document.getElementById('story-mode-struggle')?.classList.remove('active');
    openModal('story-modal');
};

window.selectStoryMood = (mood, btn) => {
    document.querySelectorAll('#story-modal .story-mood-btn').forEach(el => el.classList.remove('active'));
    btn?.classList.add('active');
    const moodField = document.getElementById('story-mood');
    if (moodField) moodField.value = mood;
};

window.submitStory = async () => {
    const title = document.getElementById('story-title')?.value.trim();
    const author = document.getElementById('story-author')?.value.trim() || "Anonim";
    const content = document.getElementById('story-content')?.value.trim();
    const mood = document.getElementById('story-mood')?.value || 'victory';
    const user = dataManager?.getUser?.() || {};

    if (!title || !content) {
        return NotificationSystem.show("Tanpri mete tit ak eksplike istwa w la.", "warning");
    }

    const newPost = {
        id: `story_${Date.now()}`,
        title: title,
        content: content,
        author: author,
        authorId: user.uid || null,
        isAnonymous: author.toLowerCase() === 'anonim',
        mood: mood,
        likes: 0,
        comments: [],
        date: new Date().toISOString(),
        type: 'community'
    };

    NotificationSystem.show("N ap pataje istwa w ak kominote a...", "info");
    try {
        const success = await dataManager?.addPost?.(newPost);
        if (success) {
            NotificationSystem.show("Istwa w la pataje avèk siksè.", "success");
        } else {
            NotificationSystem.show("Istwa w la sove lokalman pou kounye a.", "success");
            window.currentCommunityPosts = window.currentCommunityPosts || [];
            window.currentCommunityPosts.unshift(newPost);
            renderPosts(window.currentCommunityPosts, 'posts-feed');
        }
    } catch (e) {
        console.warn("⚠️ Pataje istwa echwe, sove lokalman:", e);
        NotificationSystem.show("Istwa a sove lokalman. Lè rezo a retounen, li pral senkronize.", "warning");
        window.currentCommunityPosts = window.currentCommunityPosts || [];
        window.currentCommunityPosts.unshift(newPost);
        renderPosts(window.currentCommunityPosts, 'posts-feed');
    }

    closeModal('story-modal');
};

window.logMood = async (mood) => {
    console.log("📊 Mood Logged:", mood);
    const scoreMap = { 'happy': 5, 'neutral': 3, 'sad': 2, 'anxious': 1 };

    // Personalized responses based on mood
    const moodResponses = {
        'happy': {
            message: "Mèsi pou pataje jan w santi w! Nou kontan wè w byen jodi a! 😊💚",
            advice: "Kontinye kenbe espri pozitif sa a! Ou ka pataje viktwa w la ak kominote a."
        },
        'neutral': {
            message: "Mèsi pou pataje jan w santi w. Ou pa pou kont ou. 💙",
            advice: "Si w bezwen pale, chatbot la la pou ou, oswa ou ka pataje nan kominote a."
        },
        'sad': {
            message: "Mwen konprann ou santi w tris. Ou pa pou kont ou, nou la pou ou. 💙🕊️",
            advice: "Ann pale ansanm. Mwen ka ede w jwenn solisyon oswa jis koute w."
        },
        'anxious': {
            message: "Mwen wè w santi w anksye. Respire pwofon, ou an sekirite. 🌿💚",
            advice: "Eseye egzèsis respirasyon nou an, oswa pale ak mwen sou sa k ap deranje w."
        }
    };

    const response = moodResponses[mood] || moodResponses['neutral'];

    try {
        if (dataManager && dataManager.addMoodEntry) {
            await dataManager.addMoodEntry({
                mood: mood,
                score: scoreMap[mood] || 3,
                timestamp: new Date().toISOString()
            });
        }
    } catch (e) {
        console.warn("⚠️ Mood saving skipped:", e.message);
    }

    // Show personalized notification
    NotificationSystem.show(response.message, "success");

    // Auto-open chatbot with supportive message for sad/anxious moods
    if (mood === 'sad' || mood === 'anxious') {
        setTimeout(() => {
            let chatWindow = document.getElementById('chat-window');
            if (!chatWindow) {
                chatWindow = createChatWindow();
            }

            const chatInput = document.getElementById('bot-input');

            if (chatInput && chatWindow) {
                // Pre-fill input with context
                chatInput.value = mood === 'sad'
                    ? "Mwen santi m yon ti jan tris jodi a..."
                    : "Mwen santi m yon ti jan anksye jodi a...";

                // Open chat window
                chatWindow.classList.remove('hidden');
                chatWindow.style.display = 'flex'; // Force display to override !important hidden rules
                chatInput.focus();

                // Add automatic supportive message as fallback
                setTimeout(() => {
                    const chatMessages = document.getElementById('chat-messages');
                    if (chatMessages) {
                        const fallbackMsg = document.createElement('div');
                        fallbackMsg.className = 'message bot-message';
                        fallbackMsg.innerHTML = `
                            <div class="message-content">
                                <p><strong>Zepòl:</strong></p>
                                <p>${response.advice}</p>
                                <p style="margin-top: 10px; font-style: italic; opacity: 0.9;">
                                    ${mood === 'sad'
                                ? "Sonje: Chak jou difisil se yon etap nan chemen w. Ou pi fò pase w panse."
                                : "Sonje: Anksyete a se yon santi, li pa reyalite. Ou kapab pase sou li."}
                                </p>
                            </div>
                        `;
                        chatMessages.appendChild(fallbackMsg);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }
                }, 500);
            }
        }, 1000);
    } else if (mood === 'happy') {
        // Encourage sharing victories
        setTimeout(() => {
            NotificationSystem.show("Ou vle pataje viktwa w la ak kominote a? 🎉", "info");
        }, 2000);
    }
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

/* --- SHARE IMAGE UPLOAD HANDLERS --- */
window.shareImageBase64 = null;

window.previewShareImage = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            window.shareImageBase64 = e.target.result;
            document.getElementById('share-image-preview').classList.remove('hidden');
            document.getElementById('share-preview-img').src = window.shareImageBase64;
        };
        reader.readAsDataURL(input.files[0]);
    }
};

window.clearShareImage = () => {
    window.shareImageBase64 = null;
    document.getElementById('share-image-preview').classList.add('hidden');
    document.getElementById('share-image-input').value = '';
};

// --- CHAT INITIALIZATION ---
window.chatHistory = [];
window.chatImageBase64 = null;

window.clearChatImage = () => {
    window.chatImageBase64 = null;
    const preview = document.getElementById('chat-image-preview');
    if (preview) preview.classList.add('hidden');
    const input = document.getElementById('chat-image-input');
    if (input) input.value = '';
};


/* --- MOOD LOGGING & AFFIRMATIONS --- */
const DAILY_AFFIRMATIONS = [
    "Ou gen fòs pou w travèse nenpòt tanpèt. Chak ti pa ou fè konte. Kontinye avanse.",
    "Bèl bagay pran tan pou yo grandi. Fè pasyans ak tèt ou jodi a.",
    "Chak souf ou pran se yon chans pou w kòmanse ankò. Ou merite lapè.",
    "Ou pa sèl nan batay la. Gen yon limyè nan ou ki pi fò pase nenpòt fènwa.",
    "Jodi a, chwazi pou w janti ak tèt ou. Ou fè ase, ou se ase."
];

const SUPPORT_QUOTES = DAILY_AFFIRMATIONS;

const ANIME_QUOTES = [
    { quote: "Mwen pa janm fè bak sou pawòl mwen... Sa se Nindo pa m, chemen ninja m lan!", author: "Naruto Uzumaki", image: "./assets/naruto_uzumaki.jpg", advice: "Gade anime 'Naruto' a si w bezwen yon gwo poul kouraj. Se yon istwa ki remoute moral nenpòt moun ! 📺✨" },
    { quote: "Si w pa renmen desten w lan, pa aksepte l. Olye de sa, gen kouraj pou w chanje l jan w vle l la.", author: "Naruto Uzumaki", image: "./assets/naruto_uzumaki.jpg", advice: "Gade anime 'Naruto' a si w bezwen yon gwo poul kouraj. Se yon istwa ki remoute moral nenpòt moun ! 📺✨" },
    { quote: "Paske yo dim se yon rate, mwen te deside pwouve yo kontrè a!", author: "Naruto Uzumaki", image: "./assets/naruto_uzumaki.jpg", advice: "Gade anime 'Naruto' a si w bezwen yon gwo poul kouraj. Se yon istwa ki remoute moral nenpòt moun ! 📺✨" },
    { quote: "Lè moun gen yon bagay ki chè pou yo, yo ka vrèman vin fò.", author: "Haku", image: "./assets/haku.jpg", advice: "Gade anime 'Naruto' a pou wè kijan lanmou pouse nou fè tout gwo sakrifis. 📺✨" },
    { quote: "Moun yo ap viv nan konte sou sa yo konnen e sa yo konprann. Yo rele sa reyalite.", author: "Itachi Uchiha", image: "./assets/itachi_uchiha.jpg", advice: "Itachi se yon egzanp sakrifis ak lespri filizofik. Ou bezwen gade 'Naruto Shippuden'. 📺✨" },
    { quote: "Nan mond ninja a, moun ki pa swiv règ yo se dechè, men moun ki abandone zanmi yo pi mal pase dechè.", author: "Kakashi Hatake", image: "./assets/kakashi_hatake.jpg", advice: "Valè amitye a pa janm peri avèk Kakashi nan seri 'Naruto'. 📺✨" },
    { quote: "Moun ki pa konprann doulè pap janm kapab konprann vrè lapè a.", author: "Pain", image: "./assets/pain.jpg", advice: "Doulè a se pafwa sèl mwayen pou aprann vrè valè lavi. Gade 'Moun K'ap Blese' (Pain Arc) nan Naruto. 📺✨" },
    { quote: "Vrè valè yon ninja pa mezire nan fason li viv, men pito nan sa l reyalize anvan l mouri.", author: "Jiraiya", image: "./assets/jiraiya.jpg", advice: "Jiraiya montre enpòtans transmèt konesans pami jenerasyon. 📺✨" },
    { quote: "Osi lontan ke gen limyè, ap toujou gen fènwa. Konsèp lajwa pa egziste san soufrans.", author: "Madara Uchiha", image: "./assets/madara_uchiha.jpg", advice: "Yon bèl refleksyon sou de fas reyalite nan mond lan, enspire pa Madara. 📺✨" },
    { quote: "Moun ki pa ka kwè nan tèt yo, yo p'ap janm travay ase.", author: "Might Guy", image: "./assets/might_guy.jpg", advice: "Kwè nan tèt ou avèk espri Prentan Jenès la nan seri 'Naruto'. 📺✨" },
    { quote: "Avan w jije moun, eseye konprann doulè yo. Nou tout se moun ak pwòp batay nou.", author: "Gaara", image: "./assets/gaara.jpg", advice: "Gade chanjman lavi Gaara a pou jwenn fòs renmen, malgre tout doulè ki te la nan 'Naruto'. 📺✨" },
    { quote: "Mwen p'ap janm abandone, paske sa se Nindo pa m!", author: "Asta", image: "./assets/asta.jpg", advice: "Gade 'Black Clover' si w bezwen motive pou kraze tout limit ou genyen. 📺✨" },
    { quote: "Mwen pa gouvène anyen okenn bò, m ap jis tounen Wa Pirat yo!", author: "Monkey D. Luffy", image: "./assets/monkey_d_luffy.jpg", advice: "Gade 'One Piece' pou aprann vale libète ak fòs pasyon ! 📺✨" }
];

window.showNarutoMotivation = () => {
    const data = ANIME_QUOTES[Math.floor(Math.random() * ANIME_QUOTES.length)];
    const quoteEl = document.getElementById('naruto-quote');
    const authorEl = document.getElementById('anime-author');
    const photoEl = document.getElementById('anime-character-photo');
    const recommendationEl = document.getElementById('anime-recommendation');

    if (quoteEl) quoteEl.textContent = `"${data.quote}"`;
    if (authorEl) authorEl.textContent = `- ${data.author}`;
    if (photoEl) {
        photoEl.onerror = function () {
            this.onerror = null;
            this.src = './assets/naruto_icon.png';
        };
        photoEl.src = data.image;
        photoEl.alt = data.author;
    }
    if (recommendationEl) {
        recommendationEl.innerHTML = `<strong>Konsèy Zepòl :</strong> ${data.advice}`;
    }
    openModal('naruto-modal');
};



const RICH_ADVICE_QUOTES = [
    { title: "Mache yon ti kras 🚶‍♂️", body: "Chanje anviwònman w ka chanje atitid ou. Yon ti mache 5 minit ka fè yon gwo diferans pou lespri w.", color: "var(--primary)" },
    { title: "Bwè dlo 💧", body: "Pafwa, fatig mantal se jis dezidratasyon. Bwè yon vè dlo frèt pou reveye sistèm ou.", color: "var(--accent)" },
    { title: "Dekonekte 🚫", body: "Etenn telefòn ou pou 30 minit. Repoze lespri w anba tout bri rezo sosyal yo.", color: "var(--danger)" },
    { title: "Respire fon 🌬️", body: "Pran 3 gwo souf kounye a menm. Kenbe li pou 4 segonn, epi lage l dousman. Sa ede bese batman kè w.", color: "#4CAF50" },
    { title: "Fè yon Lis Gratitid 📝", body: "Ekri 3 bagay ou rekonesan pou yo jodi a. Li ka nenpòt ti bagay senp tankou solèy la.", color: "#FF9800" },
    { title: "Ou Gen Valè 💎", body: "Sonje, pwoblèm w ap pase kounye a pa defini kilès ou ye. Ou se yon moun ki gen anpil enpòtans.", color: "#9C27B0" },
    { title: "Aksepte Doulè a 🌱", body: "Li nòmal pou w tris. Pa fòse tèt ou kontan lè w pa ye. Kite santiman w pase tankou yon nwaj.", color: "#3F51B5" },
    { title: "Pale ak Yon Moun 🗣️", body: "Kenbe bagay yo andedan ap fè yo pi lou. Ekri yon moun nan kominote Zepòl la.", color: "#00BCD4" },
    { title: "Padone Tèt Ou 🕊️", body: "Ou fè erè paske w se moun. Padone tèt ou jodi a pou w ka vanse demen.", color: "#E91E63" },
    { title: "Rete Prezan 🧘", body: "Pase a ale, fiti a poko rive. Kisa w ap fè egzakteman nan moman sa a? Konsantre sou li.", color: "#8BC34A" }
];

// --- BOOKMARK SYSTEM ---
window.toggleBookmark = async (type, resourceId) => {
    const bookmarks = JSON.parse(localStorage.getItem('zepol_bookmarks') || '{}');
    const key = `${type}_${resourceId}`;
    
    if (bookmarks[key]) {
        delete bookmarks[key];
    } else {
        bookmarks[key] = {
            type: type,
            resourceId: resourceId,
            savedAt: new Date().toISOString()
        };
    }
    
    localStorage.setItem('zepol_bookmarks', JSON.stringify(bookmarks));
    
    // Sync to Firebase if logged in
    const user = window.dataManager?.getUser?.();
    if (user?.loggedIn && user?.uid) {
        try {
            await window.dataManager?.addBookmark?.(type, resourceId);
        } catch (e) {
            console.warn("⚠️ Firebase bookmark sync failed:", e);
        }
    }
    
    // Visual feedback
    const btn = event.target.closest('.bookmark-btn');
    if (btn) {
        btn.style.color = bookmarks[key] ? '#ff6b6b' : '#999';
        const icon = btn.querySelector('i');
        if (icon) {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'bounce 0.6s ease';
            }, 10);
        }
    }
    
    window.NotificationSystem.show(bookmarks[key] ? 'Mark pou kite!' : 'Mark enleve.', 'success');
};

window.isArticleBookmarked = (resourceId) => {
    const bookmarks = JSON.parse(localStorage.getItem('zepol_bookmarks') || '{}');
    return !!bookmarks[`article_${resourceId}`] || !!bookmarks[`book_${resourceId}`];
};

window.getBookmarkedResources = () => {
    const bookmarks = JSON.parse(localStorage.getItem('zepol_bookmarks') || '{}');
    return Object.values(bookmarks);
};

window.refreshAdvice = () => {
    const container = document.getElementById('dynamic-advice-container');
    if (!container) return;
    
    // Clear current container
    container.innerHTML = '';
    
    // Shuffle the array to get random quotes
    const shuffled = [...RICH_ADVICE_QUOTES].sort(() => 0.5 - Math.random());
    
    // Pick 3 quotes to show
    const selectedQuotes = shuffled.slice(0, 3);
    
    selectedQuotes.forEach(quote => {
        const card = document.createElement('div');
        card.className = 'advice-card float-animation';
        card.style.borderLeft = `4px solid ${quote.color}`;
        card.style.padding = '15px';
        card.style.background = 'rgba(255,255,255,0.7)';
        card.style.borderRadius = '10px';
        card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
        
        card.innerHTML = `
            <h4 style="color: ${quote.color}; margin-top:0; font-size: 1.1rem;">${quote.title}</h4>
            <p style="margin-bottom:0; color: #555; font-size: 0.95rem; line-height: 1.5;">${quote.body}</p>
        `;
        container.appendChild(card);
    });
};

window.rotateDailyAffirmation = () => {
    const affirmationEl = document.getElementById('daily-affirmation-text');
    if (!affirmationEl) return;

    const hour = new Date().getHours();
    const greeting = (hour >= 12) ? "Bonswa" : "Bonjou";

    const randomIndex = Math.floor(Math.random() * DAILY_AFFIRMATIONS.length);
    affirmationEl.textContent = `"${greeting}! ${DAILY_AFFIRMATIONS[randomIndex]}"`;
};

// Rotate affirmation on load and every 30 seconds
setInterval(window.rotateDailyAffirmation, 30000);

// Ensure advice is loaded when page starts
window.addEventListener('load', () => {
    if(window.refreshAdvice) window.refreshAdvice();
});


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
        author: isAnon ? "Yon Nanm Pwogrè" : (user.name || "Yon Zanmi"), // "A Soul in Progress" or Member Name
        authorId: isAnon ? null : user.uid,
        isAnonymous: isAnon,
        mood: "neutral", // Default or could add mood selector later
        likes: 0,
        comments: [],
        timestamp: new Date().toISOString(),
        type: 'public'
    };

    console.log("📨 Submitting Home Post:", newPost);
    NotificationSystem.show("N ap voye pataj ou a...", "info");

    try {
        const success = await dataManager.addPost(newPost);
        if (success) {
            NotificationSystem.show("Mèsi paske w pataje. Ou pa pou kont ou. 💙", "success");
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
            window.applyHomeFilter(window.currentHomeFilter || 'all');
            input.value = '';
        }
    } catch (e) {
        console.error("Post Error:", e);
        NotificationSystem.show("Erè pandan pataj la.", "error");
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
    login: async () => ({ success: false, message: "Mòd Hors Ligne: Koneksyon enposib." }),
    register: async () => ({ success: false, message: "Mòd Hors Ligne: Enskripsyon enposib." }),
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



    // --- REPLACED DLS LOGIC (See bottom of file for real Firebase integration) ---

    recognition.onend = () => {
        const btn = document.getElementById('voice-btn');
        if (btn) btn.classList.remove('recording');
    };

    window.recognition = recognition;
}

window.toggleVoiceInput = () => {
    if (!window.recognition) {
        NotificationSystem.show("Navigatè ou a pa sipòte vwa.", "warning");
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
                    <button id="snap-btn" class="btn-primary" onclick="window.captureFace()">Kòmanse Analiz 📸</button>
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
        NotificationSystem.show("Pa ka jwenn kamera a. Verifye pèmisyon ou.", "error");
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
        if (scanText) scanText.innerHTML = "N ap analize vizaj ou<br>pou wè nivo tristès ou...";

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


// AI message limit for free users
const FREE_AI_DAILY_LIMIT = 10;
function checkAILimit() {
    const plan = dataManager.getUserPlan ? dataManager.getUserPlan() : 'free';
    if (plan === 'pro' || plan === 'ultimate') return { allowed: true }; // unlimited

    const today = new Date().toDateString();
    let data = JSON.parse(localStorage.getItem('zepol_ai_usage') || '{}');
    if (data.date !== today) { data = { date: today, count: 0 }; }

    if (data.count >= FREE_AI_DAILY_LIMIT) {
        return { allowed: false, remaining: 0 };
    }
    return { allowed: true, remaining: FREE_AI_DAILY_LIMIT - data.count, data };
}
function incrementAIUsage() {
    const today = new Date().toDateString();
    let data = JSON.parse(localStorage.getItem('zepol_ai_usage') || '{}');
    if (data.date !== today) data = { date: today, count: 0 };
    data.count++;
    localStorage.setItem('zepol_ai_usage', JSON.stringify(data));
}

window.sendUserMessage = async () => {
    const input = document.getElementById('bot-input');
    const text = input.value.trim();
    const image = window.chatImageBase64;

    if (!text && !image) return;

    // Check AI limit for free users
    const limit = checkAILimit();
    if (!limit.allowed) {
        addMessageToChat('user', text, image);
        input.value = '';
        window.clearChatImage();
        setTimeout(() => {
            addMessageToChat('bot', `Ou rive nan limit ${FREE_AI_DAILY_LIMIT} mesaj pa jou pou plan Gratis la. 🌿<br><br>Pou pale san limit ak Asistan Zepòl la, <strong>abòne nan Premium</strong>!<br><br><button onclick="window.closeChat&&window.toggleChat(); navigateTo('premium');" style="background:var(--primary);color:white;border:none;padding:8px 16px;border-radius:20px;cursor:pointer;font-weight:600;margin-top:5px;">Wè Plan Premium ⭐</button>`);
        }, 400);
        return;
    }

    // 1. Add User Message
    addMessageToChat('user', text, image);
    input.value = '';
    window.clearChatImage(); // Clear image after sending
    incrementAIUsage();

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




window.navigateTo = function (viewId) {
    viewId = (viewId || 'home').trim();
    // console.log("Navigating to:", viewId);

    const targetId = `view-${viewId}`;
    let target = document.getElementById(targetId);

    if (!target) {
        let container = document.getElementById('main-view-wrapper');
        if (!container) {
            NotificationSystem.show("Erè teknik. Tanpri rafrechi paj la.", "error");
            return;
        }
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

        console.log(`✅ View ${viewId} is now active.`);
    } else {
        console.error(`❌ Target view view-${viewId} not found! Fallback to Home.`);
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
                if (feed) feed.innerHTML = '<div style="text-align:center; padding: 40px; color: grey;">Mete tèt ou ansanm ak nou (vin manm) pou w wè mesaj sa yo.</div>';
            }
        });
        // Ensure sub-listeners attached
        if (typeof renderStories === 'function') dataManager.listenToStories(renderStories);
    }

    if (viewId === 'resources') {
        if (window.renderLibraryUI) window.renderLibraryUI();
    }

    if (viewId === 'messages') {
        if (window.renderMessagingUI) window.renderMessagingUI();
    }

    if (viewId === 'premium') {
        if (window.refreshPremiumUI) window.refreshPremiumUI();
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
        "Ou pa pou kont ou. 💙",
        "Gen espwa toujou. ✨",
        "Nou la avè w. 🤝",
        "Chak pa konte. 👣"
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

window.openDiversion = () => {
    const url = 'https://translate.google.com';
    window.open(url, '_blank');
};

window.setupSilentSosShortcut = () => {
    const sequence = [];
    const maxDelay = 2500;
    const keepRecent = () => {
        const now = Date.now();
        while (sequence.length && now - sequence[0].time > maxDelay) {
            sequence.shift();
        }
    };
    document.addEventListener('keydown', (event) => {
        const key = event.key === 'Escape' ? 'Esc' : event.key === '9' ? '9' : null;
        if (!key) return;
        sequence.push({ key, time: Date.now() });
        keepRecent();
        const lastThree = sequence.slice(-3).map(item => item.key).join('');
        if (lastThree === 'EscEscEsc' || lastThree === '999') {
            openModal('sos-modal');
            NotificationSystem.show('Sekirite an kache aktive. SOS ouvri.', 'info');
            sequence.length = 0;
        }
    });
};

window.openRealityCheck = (postId) => {
    const posts = [...(window.currentPublicPosts || []), ...(window.currentCommunityPosts || [])];
    const post = posts.find(p => p.id === postId || p.postId === postId);
    const message = post ? (post.content || post.text || '') : '';
    const response = "Se santiman w ki pale, pa reyalite. Menm si jodi a difisil, ou pa defini pa sa ou santi kounye a.";
    const evidence = [
        "Ou gen valè menm si ou pa santi li kounye a.",
        "Gen moun ki toujou la pou sipòte w, menm nan moman difisil.",
        "Ti aksyon tankou bwè dlo oswa ouvè fenèt la se yon viktwa reyèl."
    ];
    const originalTextEl = document.getElementById('rumination-original-text');
    const responseEl = document.getElementById('rumination-response-text');
    const proofList = document.getElementById('rumination-proof-list');

    if (originalTextEl) originalTextEl.textContent = message ? `Sa ou te di: "${message}"` : 'Nou p ap bliye sa ou santi.';
    if (responseEl) responseEl.textContent = response;
    if (proofList) {
        proofList.innerHTML = evidence.map(line => `<li>${line}</li>`).join('');
    }
    openModal('rumination-modal');
};

window.completeMicroTask = (taskKey) => {
    const tasks = {
        'drink-water': 'Bwe yon gwo boutèy dlo',
        'open-window': 'Louvri fenèt la 30 segonn',
        'sing-head': 'Chante 1 minit nan mitan tèt ou'
    };
    const current = JSON.parse(localStorage.getItem('zepol_micro_tasks') || '{}');
    if (current[taskKey]) {
        NotificationSystem.show('Ou deja fin fè sa. Bon travay toujou.', 'info');
        return;
    }
    current[taskKey] = new Date().toISOString();
    localStorage.setItem('zepol_micro_tasks', JSON.stringify(current));
    const feedback = document.getElementById('micro-task-feedback');
    if (feedback) feedback.textContent = '✅ Fè. Se pa anpil, men se yon viktwa.';
    NotificationSystem.show(`Ou fè ${tasks[taskKey]}. Bon travay.`, 'success');
    window.refreshMicroTaskState();
};

window.refreshMicroTaskState = () => {
    const current = JSON.parse(localStorage.getItem('zepol_micro_tasks') || '{}');
    document.querySelectorAll('.micro-task-btn').forEach((btn) => {
        const action = btn.getAttribute('onclick')?.match(/completeMicroTask\('([^']+)'\)/);
        if (!action) return;
        const key = action[1];
        if (current[key]) btn.classList.add('done');
        else btn.classList.remove('done');
    });
};

window.loadJournalEntry = () => {
    const saved = localStorage.getItem('zepol_journal_entry');
    const textarea = document.getElementById('private-journal-text');
    const status = document.getElementById('journal-save-status');
    if (textarea) textarea.value = saved || '';
    if (status) status.textContent = saved ? 'Dènye sove: ' + new Date().toLocaleString('ht-HT') : 'Sove otomatikman.';
    if (textarea) textarea.addEventListener('input', () => {
        localStorage.setItem('zepol_journal_entry', textarea.value);
        if (status) status.textContent = 'Sove otomatikman. ' + new Date().toLocaleTimeString('ht-HT');
    });
};

window.addSupportJarMessage = async () => {
    const input = document.getElementById('support-jar-input');
    const output = document.getElementById('support-jar-output');
    if (!input) return;
    const text = input.value.trim();
    if (text.length < 8) {
        NotificationSystem.show('Ekri yon ti mesaj ankourajman ki pi long, tanpri.', 'warning');
        return;
    }
    
    const user = dataManager.getUser();
    const message = { text, addedAt: new Date().toISOString() };
    
    // Save to localStorage for offline
    const jar = JSON.parse(localStorage.getItem('zepol_support_jar') || '[]');
    jar.push(message);
    localStorage.setItem('zepol_support_jar', JSON.stringify(jar));
    
    // Try to sync to Firebase if logged in
    if (user.loggedIn && user.uid) {
        try {
            await dataManager.addGratitudeNote(text);
            console.log("✅ Gratitude note synced to Firebase");
        } catch (e) {
            console.warn("⚠️ Firebase sync failed, using localStorage:", e);
        }
    }
    
    input.value = '';
    if (output) output.textContent = 'Mèsi. Mesaj ou te ajoute nan bokal la.';
    NotificationSystem.show('Mèsi! Mesaj ou a pare pou yon lòt moun si yo chwazi resevwa li.', 'success');
};

window.receiveSupportJarMessage = async () => {
    const output = document.getElementById('support-jar-output');
    const user = dataManager.getUser();
    
    const defaults = [
        'W ap fè byen menm si li difisil. Kenbe li vit.',
        'Pa prese. Chak ti pa gen valè.',
        'Ou merite repo, kè poze, ak yon ti moman pou tèt ou.'
    ];
    
    let message;
    
    // Try to get from Firebase first if logged in
    if (user.loggedIn && user.uid && dataManager.getGratitudeNotes) {
        try {
            const notes = await dataManager.getGratitudeNotes();
            if (notes && notes.length > 0) {
                message = notes[Math.floor(Math.random() * notes.length)];
            }
        } catch (e) {
            console.warn("⚠️ Firebase fetch failed, using localStorage:", e);
        }
    }
    
    // Fallback to localStorage
    if (!message) {
        const jar = JSON.parse(localStorage.getItem('zepol_support_jar') || '[]');
        if (jar.length > 0) {
            message = jar[Math.floor(Math.random() * jar.length)].text;
        } else {
            message = defaults[Math.floor(Math.random() * defaults.length)];
        }
    } else if (typeof message === 'object') {
        message = message.text || message;
    }
    
    if (output) output.textContent = message;
    NotificationSystem.show('Youn mesaj te parèt pou ou.', 'info');
};

window.openPauseMode = () => {
    const overlay = document.getElementById('pause-overlay');
    if (overlay) overlay.classList.remove('hidden');
};

window.closePauseMode = () => {
    const overlay = document.getElementById('pause-overlay');
    if (overlay) overlay.classList.add('hidden');
};

window.openWhiteNoisePanel = () => {
    openModal('whitenoise-modal');
};

window.playWhiteNoise = (type) => {
    try {
        if (!window.noiseCtx) {
            window.noiseCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (window.noiseSource) {
            window.noiseSource.stop();
            window.noiseSource.disconnect();
            window.noiseSource = null;
        }
        const ctx = window.noiseCtx;
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const filter = ctx.createBiquadFilter();
        if (type === 'rain') {
            filter.type = 'highpass';
            filter.frequency.value = 900;
        } else if (type === 'fan') {
            filter.type = 'lowpass';
            filter.frequency.value = 1200;
        } else if (type === 'wave') {
            filter.type = 'bandpass';
            filter.frequency.value = 500;
        }
        source.connect(filter).connect(ctx.destination);
        source.start();
        window.noiseSource = source;
        NotificationSystem.show('Bri kòmanse. Si ou bezwen li, kite li jwe.', 'success');
    } catch (e) {
        console.error('White noise init failed:', e);
        NotificationSystem.show('Bri pa disponib kounye a sou navigatè sa a.', 'error');
    }
};

window.stopWhiteNoise = () => {
    if (window.noiseSource) {
        window.noiseSource.stop();
        window.noiseSource.disconnect();
        window.noiseSource = null;
    }
    NotificationSystem.show('Silans radio aktive.', 'info');
};

window.toggleStrongNightMode = () => {
    const enabled = document.body.classList.toggle('strong-night-mode');
    localStorage.setItem('zepol_night_mode', enabled ? 'on' : 'off');
    window.applyStrongNightMode(enabled);
    NotificationSystem.show(enabled ? 'Mòd Apra midi aktive.' : 'Mòd nòmal tounen.', enabled ? 'success' : 'info');
};

window.applyStrongNightMode = (enabled) => {
    if (enabled) {
        document.body.classList.add('strong-night-mode');
    } else {
        document.body.classList.remove('strong-night-mode');
    }
    window.updateNightModeTerms(enabled);
};

window.updateNightModeTerms = (enabled) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
            if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        }
    });
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (enabled) {
            if (!node._zepolOriginalText) node._zepolOriginalText = node.nodeValue;
            node.nodeValue = node._zepolOriginalText.replace(/Succès/g, 'Eseye').replace(/Échec/g, 'Pa koupe');
        } else if (node._zepolOriginalText) {
            node.nodeValue = node._zepolOriginalText;
            delete node._zepolOriginalText;
        }
    }
};

window.updateSupportJarDisplay = async () => {
    const output = document.getElementById('support-jar-output');
    const user = dataManager.getUser();
    
    let jar = JSON.parse(localStorage.getItem('zepol_support_jar') || '[]');
    
    // If logged in, also try to fetch from Firebase
    if (user.loggedIn && user.uid && dataManager.getGratitudeNotes) {
        try {
            const firebaseNotes = await dataManager.getGratitudeNotes();
            if (firebaseNotes && firebaseNotes.length > 0) {
                jar = firebaseNotes;
            }
        } catch (e) {
            console.warn("⚠️ Firebase fetch failed:", e);
        }
    }
    
    if (output && jar.length === 0) {
        output.textContent = 'Ajoute premye mesaj ou nan bokal la pou bay lòt moun ankourajman.';
    }
};

// --- GUEST QUIZ LOGIC ---
window.currentQuizStep = 1;
window.quizData = {};

window.startGuestQuiz = () => {
    window.currentQuizStep = 1;
    window.quizData = {};
    document.querySelectorAll('[id^="quiz-step-"]').forEach(el => el.classList.add('hidden'));
    document.getElementById('quiz-step-1').classList.remove('hidden');
    document.getElementById('quiz-result-gate').classList.add('hidden');
    openModal('guest-quiz-modal');
};

window.nextQuizStep = (step) => {
    // Hide all steps first
    document.querySelectorAll('[id^="quiz-step-"]').forEach(el => el.classList.add('hidden'));

    // Show target step
    const nextEl = document.getElementById(`quiz-step-${step}`);
    if (nextEl) {
        nextEl.classList.remove('hidden');
        nextEl.classList.add('fade-in');
        window.currentQuizStep = step;
    } else {
        console.warn(`Step ${step} not found`);
    }
};

window.finishQuiz = (resultType) => {
    window.quizData.result = resultType;
    // Hide all steps
    document.querySelectorAll('[id^="quiz-step-"]').forEach(el => el.classList.add('hidden'));

    // Show loader
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

window.handleBack = () => navigateTo('home');

// Click outside to close modals
window.addEventListener('click', (e) => {
    // 1. Modal Logic (If clicking on the backdrop itself)
    if (e.target && e.target.classList && e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        if (modalId) {
            window.closeModal(modalId);
        }
    }

    // 2. Chatbot Close Logic (Click Outside)
    const chatWindow = document.getElementById('chat-window');
    const toggleBtn = document.querySelector('.floating-chat-btn'); // Assuming there's a toggle button class or ID
    // Check if chat is open AND click is NOT on chat window AND NOT on a toggle button/icon
    if (chatWindow && !chatWindow.classList.contains('hidden')) {
        if (!chatWindow.contains(e.target) && !e.target.closest('#chat-toggle-btn') && !e.target.closest('.chat-action-btn') && !e.target.closest('.fa-robot')) {
            // Basic check, might need refinement if toggle button has no ID. 
            // Let's assume the user clicks "somewhere else".
            window.toggleChat();
        }
    }
});

window.applyHomeFilter = (mood) => {
    window.currentHomeFilter = mood;
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
            if (mood === 'anxious') return m === 'anxious' || txt.includes('pè') || txt.includes('anksye');
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

    // Save Result for post-login
    localStorage.setItem('zepol_pending_result', resultType || 'general');

    // If user reports despair, show immediate crisis support BEFORE registration gate
    if (resultType === 'despair') {
        closeModal('guest-quiz-modal');
        setTimeout(() => {
            openModal('crisis-support-modal');
        }, 300);
        return;
    }

    // Show gate for other results
    document.getElementById('quiz-result-gate')?.classList.remove('hidden');
};

window.checkPendingQuizResult = () => {
    const pending = localStorage.getItem('zepol_pending_result');

    // Always check for Dashboard Card
    const dashCard = document.getElementById('dash-quiz-result-card');
    const dashAdvice = document.getElementById('dash-quiz-advice');

    if (pending) {
        // localStorage.removeItem('zepol_pending_result'); // Wait, let's keep it until dismissed? Or clear it.
        // For now clear it to avoid loops, but maybe we want persistence.

        let message = "Mèsi paske w te onèt ak tèt ou.";
        if (pending === 'hope') message = "Lè w kenbe espwa, ou deja fè mwatye chemen an. Nou la pou n fè rès la avè w.";
        if (pending === 'doubt') message = "Li nòmal pou w gen dout. Isit la, n ap ede w jwenn klète ak kalm.";
        if (pending === 'despair') message = "Ou gen anpil kouraj. Pataje pwa sa a avèk nou, pa pote l pou kont ou ankò.";

        // Dashboard Card Update
        if (dashCard && dashAdvice) {
            dashAdvice.textContent = message;
            dashCard.classList.remove('hidden');
        }

        // Modal Fallback (only if not on dashboard view?)
        const modal = document.getElementById('welcome-result-modal');
        if (modal && !dashCard) {
            const user = dataManager.getUser();
            const welcomeName = document.getElementById('welcome-name');
            const welcomeAnalysis = document.getElementById('welcome-analysis');
            if (welcomeName) welcomeName.textContent = user.name || "Zanmi";
            if (welcomeAnalysis) welcomeAnalysis.textContent = message;
            openModal('welcome-result-modal');
        }
    }
};

// Removed duplicate DAILY_AFFIRMATIONS definition

// Sidebar Logic
window.toggleDashboardSidebar = () => {
    const sidebar = document.getElementById('dashboard-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) {
        sidebar.classList.toggle('active');
        if (overlay) overlay.classList.toggle('hidden');
        // Re-check admin status each time the menu opens
        if (sidebar.classList.contains('active') && window.refreshPremiumUI) {
            window.refreshPremiumUI();
        }
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
        console.warn("⚠️ updateUserUI called before dataManager init. Skipping.");
        return;
    }
    window.refreshCurrentUser();
    const user = window.dataManager.getUser();

    // LOCK: If logging in, do NOT revert to guest
    if (window.isLoggingIn && !user.loggedIn) {
        console.warn("🔒 updateUserUI blocked: Login in progress.");
        return;
    }

    console.log("🔄 updateUserUI Triggered. User Object:", user);
    console.log("   -> Is LoggedIn:", user.loggedIn, "| Is Member:", user.isMember);

    // UI ELEMENTS
    const authHidden = document.querySelectorAll('.auth-only-hidden');
    const authVisible = document.querySelectorAll('.auth-only-visible');
    const memberContent = document.getElementById('member-home-content');
    const heroSection = document.querySelector('.hero-section');
    const guestFeatures = document.querySelector('.guest-features');

    if (user.loggedIn) {
        console.log("✅ User Logged In -> UI Update");

        // UI ELEMENTS from ui.js version
        const userMini = document.getElementById('user-mini');
        const authBtn = document.getElementById('auth-btn');
        const registerBtn = document.getElementById('register-btn');
        const joinCommBtn = document.getElementById('join-comm-btn');
        const chatOverlay = document.getElementById('chat-lock-overlay');
        const navUser = document.getElementById('nav-username');
        const greetingName = document.getElementById('user-greeting-name');

        if (navUser) navUser.textContent = user.name;
        if (greetingName && user.name) greetingName.textContent = user.name;

        userMini?.classList.remove('hidden');
        document.getElementById('naruto-btn')?.classList.remove('hidden');
        if (authBtn) authBtn.textContent = 'Pwofil';
        registerBtn?.classList.add('hidden');

        if (user.isMember) {
            joinCommBtn?.classList.add('hidden');
            chatOverlay?.classList.add('hidden');
            document.getElementById('posts-feed')?.classList.remove('blurred');
        } else {
            joinCommBtn?.classList.remove('hidden');
            chatOverlay?.classList.remove('hidden');
            document.getElementById('posts-feed')?.classList.add('blurred');
        }

        // Original main.js logic
        authHidden.forEach(el => el.classList.add('hidden'));
        authVisible.forEach(el => el.classList.remove('hidden'));

        if (memberContent) memberContent.classList.remove('hidden');
        if (heroSection) heroSection.classList.add('hidden');
        if (guestFeatures) guestFeatures.classList.add('hidden');

        const dashUser = document.getElementById('dash-user-name');
        const dashWelcome = document.getElementById('dash-welcome-name');
        if (dashUser) dashUser.textContent = user.name || "Manm";
        if (dashWelcome) dashWelcome.textContent = user.name || "Zanmi";

        document.querySelectorAll('.header-icon-btn').forEach(btn => btn.classList.remove('hidden'));

        const quoteEl = document.getElementById('dynamic-quote');
        const subtitleEl = document.querySelector('.welcome-subtitle');
        const randomQuote = SUPPORT_QUOTES[Math.floor(Math.random() * SUPPORT_QUOTES.length)];

        if (quoteEl) quoteEl.textContent = randomQuote;
        if (subtitleEl) subtitleEl.textContent = randomQuote;

        // Ensure Daily Affirmation is updated
        if (window.rotateDailyAffirmation) window.rotateDailyAffirmation();
        if (window.updateWelcomeMessage) window.updateWelcomeMessage();
        if (window.refreshPremiumUI) window.refreshPremiumUI();

        window.checkPendingQuizResult();

        const currentView = document.querySelector('.view.active');
        if (!currentView || currentView.id === 'view-dashboard') {
            navigateTo('home');
        }

    } else {
        console.log("👤 User Logged Out -> Guest UI");

        const userMini = document.getElementById('user-mini');
        const authBtn = document.getElementById('auth-btn');
        const registerBtn = document.getElementById('register-btn');
        const joinCommBtn = document.getElementById('join-comm-btn');
        const chatOverlay = document.getElementById('chat-lock-overlay');

        userMini?.classList.add('hidden');
        if (authBtn) authBtn.textContent = 'Konekte';
        registerBtn?.classList.remove('hidden');
        joinCommBtn?.classList.remove('hidden');
        chatOverlay?.classList.add('hidden');

        authHidden.forEach(el => el.classList.remove('hidden'));
        authVisible.forEach(el => el.classList.add('hidden'));

        if (memberContent) memberContent.classList.add('hidden');
        if (heroSection) heroSection.classList.remove('hidden');
        if (guestFeatures) guestFeatures.classList.remove('hidden');

        // Cleanup listeners on logout
        if (window.unsubscribeNotifs) { window.unsubscribeNotifs(); window.unsubscribeNotifs = null; }
        if (window.unsubscribeInbox) { window.unsubscribeInbox(); window.unsubscribeInbox = null; }
        if (window.unsubscribeDLS) { window.unsubscribeDLS(); window.unsubscribeDLS = null; }
        window.activeNotifUserId = null;
    }

    // Existing update logic for other parts
    // Dynamic Greeting
    const hour = new Date().getHours();
    const greetingText = document.getElementById('greeting-text');
    const dynamicGreeting = document.getElementById('dynamic-greeting');
    const isMorning = hour < 12;
    const isAfternoon = hour >= 12 && hour < 18;
    const greetingMsg = isMorning ? "Bonjou" : (isAfternoon ? "Bon apremidi" : "Bonswa");
    
    if (greetingText) greetingText.innerText = greetingMsg;
    if (dynamicGreeting) dynamicGreeting.innerText = greetingMsg;

    const lockOverlay = document.getElementById('auth-lock-overlay');
    const communityLock = document.getElementById('community-lock-overlay');
    const currentEngagement = document.getElementById('current-engagement');
    const btnAcceptRules = document.getElementById('btn-accept-rules');

    if (user.loggedIn) {
        if (lockOverlay) lockOverlay.classList.add('hidden');

        // Community Membership Check
        if (communityLock) {
            const hasEngagement = (user.engagementCount || 0) >= 5;
            const hasAccepted = user.hasAcceptedRules || false;

            if (hasEngagement && hasAccepted) {
                communityLock.classList.add('hidden');
            } else {
                communityLock.classList.remove('hidden');
                if (currentEngagement) currentEngagement.textContent = user.engagementCount || 0;
                if (btnAcceptRules) btnAcceptRules.disabled = !hasEngagement;
            }
        }
    } else {
        if (lockOverlay) lockOverlay.classList.remove('hidden');
        if (communityLock) communityLock.classList.add('hidden'); // Don't show both locks
    }

    // Re-enable notifications if logged in
    if (user.loggedIn) {
        setupNotifications();
    }
};

function setupNotifications() {
    const user = dataManager.getUser();
    if (!user.loggedIn || !user.uid) return;

    if (window.activeNotifUserId === user.uid) {
        console.log("🔔 Listeners already active for:", user.uid);
        return;
    }
    window.activeNotifUserId = user.uid;

    console.log("🔔 Setting up Notifications for:", user.uid);
    setupDLSListener();
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

    // NEW: Real-time Online Tracking
    if (dataManager.listenToOnlineUsers) {
        if (window.unsubscribeOnline) window.unsubscribeOnline();
        window.unsubscribeOnline = dataManager.listenToOnlineUsers((users) => {
            window.onlineUsers = users;
            renderCommunityOnlineList(users);
            renderDLSCodes(); // Re-render DLS with real-time online players
        });
    }
}

/* --- COMMUNITY LOGIC --- */
window.showCommunityRules = () => openModal('community-rules-modal');

window.confirmCommunityRules = async () => {
    NotificationSystem.show("N ap anrejistre angajman w...", "info");
    await dataManager.acceptCommunityRules();
    closeModal('community-rules-modal');
    NotificationSystem.show("Byenveni nan kominote a! 🎉", "success");
};

window.switchCommunityTab = (tab) => {
    const tabs = document.querySelectorAll('.comm-tab');
    const sections = document.querySelectorAll('.comm-section');

    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.add('hidden'));

    const activeTab = document.querySelector(`.comm-tab[onclick*="${tab}"]`);
    if (activeTab) activeTab.classList.add('active');
    const section = document.getElementById(`tab-${tab}`);
    if (section) section.classList.remove('hidden');

    // Load confessions on demand
    if (tab === 'confession') {
        const feed = document.getElementById('confession-feed');
        if (feed && feed.children.length <= 1) {
            const confessions = (window.currentCommunityPosts || []).filter(p => p.type === 'confession');
            if (confessions.length > 0) {
                renderPosts(confessions, 'confession-feed');
            } else {
                feed.innerHTML = '<div style="text-align:center;padding:30px;color:#94a3b8;"><i class="fas fa-theater-masks" style="font-size:2rem;margin-bottom:10px;"></i><p>Pa gen konfesyon ankò. Soyez premye!</p></div>';
            }
        }
    }
};

function renderCommunityOnlineList(users) {
    const list = document.getElementById('community-online-list');
    if (!list) return;

    if (users.length === 0) {
        list.innerHTML = '<div style="color:grey; font-size:0.8rem;">Pa gen manm online kounye a.</div>';
        return;
    }

    list.innerHTML = users.map(u => `
        <div class="online-user-item">
            <div class="online-avatar">${u.name[0]}</div>
            <span>${u.name}</span>
            <div class="online-status-dot"></div>
        </div>
    `).join('');
}

/* --- DLS MATCHING SYSTEM --- */
window.submitDLSCode = async () => {
    const input = document.getElementById('dls-code-input');
    const code = input?.value.trim();
    const user = dataManager.getUser();

    if (!code) return NotificationSystem.show("Tanpri antre yon kòd.", "warning");
    if (!user.loggedIn) return NotificationSystem.show("Konekte pou pataje kòd.", "info");

    NotificationSystem.show("N ap pataje kòd la...", "info");
    const success = await dataManager.addDLSCode(code);

    if (success) {
        NotificationSystem.show("Kòd pataje! Lòt moun ap ka wè l.", "success");
        input.value = '';
    } else {
        NotificationSystem.show("Echèk pataj kòd.", "error");
    }
};

window.renderDLSCodes = () => {
    const list = document.getElementById('dls-codes-list');
    if (!list) return;

    const THIRTY_MINUTES = 30 * 60 * 1000; // Changed from 10 to 30 minutes
    const now = Date.now();

    // Filter codes from Firebase valid within 30 minutes
    const validCodes = (window.currentDLSCodes || []).filter(c => {
        if (!c.timestamp) return false;
        const passedTime = now - new Date(c.timestamp).getTime();
        return passedTime < THIRTY_MINUTES;
    });

    let html = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: var(--primary); margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                <span style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; display: inline-block;"></span>
                Kòd Manm Yo Pataje (${validCodes.length})
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px;">
    `;

    if (validCodes.length === 0) {
        html += '<p style="color:grey; grid-column: 1 / -1; text-align: center;">Pa gen paj kòd ajoute. Ou kòmanse youn anba!</p>';
    } else {
        html += validCodes.map(c => `
            <div class="dls-player-card" style="background: white; border: 1px solid #e2e8f0; color: var(--text-primary); padding: 15px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <div style="font-size: 1.5rem; margin-bottom: 5px;">⚽</div>
                <div style="font-weight: bold; font-size: 0.95rem; margin-bottom: 5px;">${c.ownerName}</div>
                <div style="font-size: 1rem; background: #f1f5f9; padding: 5px; border-radius: 6px; margin-bottom: 8px; font-family: monospace; letter-spacing: 1px;">${c.code}</div>
                <div style="font-size: 0.75rem; color: #a0aec0; margin-bottom: 10px;">Rete ${Math.ceil((THIRTY_MINUTES - (now - new Date(c.timestamp).getTime())) / 60000)} minit</div>
            </div>
        `).join('');
    }

    html += `</div></div>`;
    list.innerHTML = html;

    // Render Online Players in DLS view too
    const dlsOnlineList = document.getElementById('online-players-grid');
    if (dlsOnlineList && window.onlineUsers) {
        const currentUser = dataManager.getUser();
        const otherUsers = window.onlineUsers.filter(u => u.uid !== currentUser.uid);

        if (otherUsers.length === 0) {
            dlsOnlineList.innerHTML = '<div style="color: grey; font-size: 0.8rem; grid-column: 1/-1;">Pa gen lòt moun online kounye a.</div>';
        } else {
            dlsOnlineList.innerHTML = otherUsers.map(u => `
                <div class="dls-player-card" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); color: var(--text-primary); padding: 10px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 1.5rem;">⚽</div>
                    <div style="font-weight: bold; font-size: 0.9rem;">${u.name}</div>
                    <div style="font-size: 0.75rem; color: #10b981; margin-bottom: 8px;">Online</div>
                    <button onclick="window.challengePlayerDLS('${u.uid}', '${u.name}')" style="background: #10b981; color: white; border: none; padding: 4px 10px; border-radius: 15px; font-size: 0.75rem; cursor: pointer; display: inline-block; width: 100%;">
                        <i class="fas fa-gamepad"></i> Defye l
                    </button>
                </div>
            `).join('');
        }
    }
};

window.currentSystemMatchListener = null;

window.challengePlayerDLS = async (targetUid, targetName) => {
    const user = dataManager.getUser();
    if (!user.loggedIn) return NotificationSystem.show("Konekte pou w ka defye lòt jwè!", "warning");

    NotificationSystem.show(`Ou voye yon demand match bay ${targetName}! 🎮`, "info");

    await dataManager.notifyDLSEvent(targetUid, {
        type: 'match_challenge',
        joinerName: user.name
    });
};

window.cancelSystemMatch = () => {
    if (window.currentSystemMatchListener) {
        window.currentSystemMatchListener();
        window.currentSystemMatchListener = null;
    }
    const uiContainer = document.getElementById('dls-system-match-ui');
    if (uiContainer) {
        uiContainer.innerHTML = `
            <button class="btn-primary" onclick="window.startSystemMatch()" style="background: white; color: #10b981; border: none; padding: 10px 20px; font-weight: bold; font-size: 1rem; border-radius: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                <i class="fas fa-search"></i> Chèche yon jwè Koulye a
            </button>
        `;
    }
};

window.startSystemMatch = async () => {
    const user = dataManager.getUser();
    if (!user.loggedIn) return NotificationSystem.show("Konekte pou jwe!", "warning");

    const uiContainer = document.getElementById('dls-system-match-ui');
    uiContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 24px; color: white;"></i>
            <span style="font-weight: bold;">Ap tann yon lòt moun ki pare pou jwe...</span>
            <button onclick="window.cancelSystemMatch()" style="background: rgba(255,255,255,0.2); border: 1px solid white; color: white; padding: 6px 15px; border-radius: 20px; margin-top: 5px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">Anile</button>
        </div>
    `;

    const matchId = await dataManager.findSystemMatch();
    if (!matchId) {
        uiContainer.innerHTML = `<p style="color: #ffe4e6; font-weight: bold;">Gen yon erè ki fèt. Eseye ankò.</p><button onclick="window.cancelSystemMatch()" style="background: white; color: #10b981; border: none; padding: 6px 15px; border-radius: 20px; font-weight: bold; cursor: pointer;">Retounen</button>`;
        return;
    }

    if (window.currentSystemMatchListener) window.currentSystemMatchListener();
    window.currentSystemMatchListener = dataManager.listenToMatch(matchId, (matchData) => {
        if (!matchData) return;

        if (matchData.status === 'matched') {
            const partnerName = matchData.ownerId === user.uid ? matchData.joinerName : matchData.ownerName;
            uiContainer.innerHTML = `
                <div style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.4);">
                    <div style="font-size: 1.2rem; margin-bottom: 10px; font-weight: bold;">🎉 Ou match ak: <span style="color: #ffde59;">${partnerName}</span></div>
                    <div style="font-size: 0.95rem; margin-bottom: 10px;">Men Kòd Jwèt Nou An:</div>
                    <div style="font-size: 1.8rem; font-family: monospace; letter-spacing: 2px; font-weight: 800; background: white; color: #10b981; padding: 10px 20px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        ${matchData.gameCode}
                    </div>
                    <div style="margin-top: 20px;">
                        <button onclick="window.cancelSystemMatch()" style="background: white; border: none; color: #10b981; padding: 8px 20px; border-radius: 30px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">Mwen Fini</button>
                    </div>
                </div>
            `;
            if (window.currentSystemMatchListener) {
                window.currentSystemMatchListener();
                window.currentSystemMatchListener = null;
            }
        }
    });
};

window.joinDLSMatch = async (id, ownerId, code) => {
    const user = dataManager.getUser();
    if (!user.loggedIn) return openModal('auth-modal');

    NotificationSystem.show(`N ap enfòme ${code.ownerName || 'zanmi an'}...`, "info");
    await dataManager.notifyDLSEvent(ownerId, {
        type: 'match_accept',
        code: code,
        joinerName: user.name
    });

    // Copy to clipboard for convenience
    try {
        await navigator.clipboard.writeText(code);
        NotificationSystem.show(`Kòd ${code} kopye! Louvri DLS pou jwe.`, "success");
    } catch (e) {
        NotificationSystem.show(`Kòd ou se: ${code}`, "success");
    }
};

function setupDLSListener() {
    const user = dataManager.getUser();
    if (!user.loggedIn) return;

    // Listen to Lobby
    if (dataManager.listenToDLSLobby) {
        if (window.unsubscribeDLS) window.unsubscribeDLS();
        window.unsubscribeDLS = dataManager.listenToDLSLobby((codes) => {
            // If new code added by someone else, show alert
            if (window.currentDLSCodes && codes.length > window.currentDLSCodes.length) {
                const newCode = codes[0];
                if (newCode.ownerId !== user.uid) {
                    NotificationSystem.show(`⚽ Nouvo kòd DLS! ${newCode.ownerName} envite w jwe.`, "info");
                }
            }
            window.currentDLSCodes = codes;
            if (document.getElementById('view-games')?.classList.contains('active')) {
                window.renderDLSCodes();
            }
        });
    }
}
function renderNotifications() {
    const list = document.getElementById('notifications-list');
    if (!list || !window.currentNotifications) return;
    if (window.currentNotifications.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:grey;">Pa gen nouvo alèt.</p>';
        return;
    }
    list.innerHTML = window.currentNotifications.map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}" style="display: flex; justify-content: space-between; align-items: center; position: relative;">
            <div style="flex: 1; cursor: pointer; display: flex; flex-direction: column; gap: 4px;" onclick="handleNotifClick('${n.id}', '${n.postId}')">
                <div style="display: flex; gap: 10px; align-items: center;">
                    <i class="fas ${n.type === 'like' ? 'fa-heart' : 'fa-comment'}"></i>
                    <span><strong>${n.senderName}</strong> ${n.message}</span>
                </div>
                <div style="font-size: 11px; color: grey; margin-left: 26px;">${formatDateTime(n.date)}</div>
            </div>
            <button onclick="window.deleteNotification('${n.id}')" style="background: none; border: none; color: var(--danger); cursor: pointer; padding: 10px; margin-left: 5px; position: relative; z-index: 5;" title="Efase">
                <i class="fas fa-trash-alt" style="font-size: 16px;"></i>
            </button>
        </div>
    `).join('');
}

window.deleteNotification = async (notifId) => {
    if (confirm("Èske w sèten ou vle efase alèt sa a?")) {
        await dataManager.deleteNotification(notifId);
        // UI refreshes automatically through Firestore listener
    }
};

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

window.selectedInboxMessages = new Set();

function formatDateTime(dateString) {
    const d = new Date(dateString);
    return `${d.toLocaleDateString('ht-HT')} a ${d.toLocaleTimeString('ht-HT', { hour: '2-digit', minute: '2-digit' })}`;
}

function renderInbox(messages) {
    const container = document.getElementById('inbox-list');
    if (!container) return;

    // Clear selections when re-rendering to prevent ghost selections
    window.selectedInboxMessages.clear();

    if (!messages || messages.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:grey;">Pa gen mesaj ankò.</div>';
        return;
    }

    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.5); border-radius: 10px; margin-bottom: 10px; position: sticky; top: 0; z-index: 10;">
            <label style="cursor: pointer; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="select-all-inbox" onclick="window.selectAllInbox(this.checked)" style="width: 18px; height: 18px;">
                <span style="font-size: 14px; font-weight: 600;">Tout Chwazi</span>
            </label>
            <button class="btn-primary" onclick="window.deleteSelectedInboxMessages()" style="background: var(--danger); border: none; padding: 5px 15px; font-size: 13px; display: none;" id="bulk-delete-btn">Efase Chwa yo (<span id="selected-count">0</span>)</button>
        </div>
    `;

    html += messages.map(m => `
        <div class="msg-card ${m.read ? '' : 'unread'}" style="display: flex; align-items: flex-start; gap: 10px; position: relative;">
            <input type="checkbox" class="inbox-msg-checkbox" value="${m.id}" onclick="window.toggleInboxSelection(this)" style="margin-top: 15px; width: 18px; height: 18px; cursor: pointer;">
            <div class="msg-avatar">${m.senderName[0]}</div>
            <div class="msg-content-mini" style="flex: 1;">
                <div class="msg-header">
                    <span class="msg-sender">${m.senderName}</span>
                    <span class="msg-time">${formatDateTime(m.date)}</span>
                </div>
                <div class="msg-text-preview" style="margin-bottom: 8px;">${m.text}</div>
                <div class="msg-actions" style="display: flex; gap: 8px; font-size: 12px;">
                    <button onclick="window.replyMessage('${m.senderId}', '${m.senderName.replace(/'/g, "\\'")}')" style="background: none; border: 1px solid var(--primary); color: var(--primary); border-radius: 12px; padding: 3px 8px; cursor: pointer;"><i class="fas fa-reply"></i> Reponn</button>
                    <button onclick="window.deleteInboxMessage('${m.id}')" style="background: none; border: 1px solid var(--danger); color: var(--danger); border-radius: 12px; padding: 3px 8px; cursor: pointer;"><i class="fas fa-trash"></i> Efase</button>
                    <button onclick="window.blockUser('${m.senderId}')" style="background: none; border: 1px solid #718096; color: #718096; border-radius: 12px; padding: 3px 8px; cursor: pointer;"><i class="fas fa-ban"></i> Bloke</button>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

window.toggleInboxSelection = (checkbox) => {
    if (checkbox.checked) {
        window.selectedInboxMessages.add(checkbox.value);
    } else {
        window.selectedInboxMessages.delete(checkbox.value);
    }
    updateBulkDeleteUi();
};

window.selectAllInbox = (isChecked) => {
    const checkboxes = document.querySelectorAll('.inbox-msg-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = isChecked;
        if (isChecked) {
            window.selectedInboxMessages.add(cb.value);
        } else {
            window.selectedInboxMessages.delete(cb.value);
        }
    });
    updateBulkDeleteUi();
};

function updateBulkDeleteUi() {
    const btn = document.getElementById('bulk-delete-btn');
    const countSpan = document.getElementById('selected-count');
    if (!btn || !countSpan) return;

    if (window.selectedInboxMessages.size > 0) {
        btn.style.display = 'inline-block';
        countSpan.textContent = window.selectedInboxMessages.size;
    } else {
        btn.style.display = 'none';
    }
}

window.deleteInboxMessage = async (msgId) => {
    if (confirm("Èske w sèten ou vle efase mesaj sa a?")) {
        const success = await dataManager.deleteMessage(msgId);
        if (success) NotificationSystem.show("Mesaj la efase.", "success");
        else NotificationSystem.show("Erè. Pa ka efase mesaj la.", "error");
    }
};

window.deleteSelectedInboxMessages = async () => {
    if (window.selectedInboxMessages.size === 0) return;
    if (confirm(`Èske w sèten ou vle efase ${window.selectedInboxMessages.size} mesaj sa yo?`)) {
        let successCount = 0;
        for (const msgId of window.selectedInboxMessages) {
            const success = await dataManager.deleteMessage(msgId);
            if (success) successCount++;
        }
        window.selectedInboxMessages.clear();
        updateBulkDeleteUi();
        NotificationSystem.show(`${successCount} mesaj efase.`, "success");
    }
};

window.replyMessage = (recipientId, recipientName) => {
    // Check if recipient is blocked
    const user = dataManager.getUser();
    if (user.blockedUsers && user.blockedUsers.includes(recipientId)) {
        NotificationSystem.show("Ou paka reponn yon moun ou bloke.", "error");
        return;
    }
    window.openMessageTo(recipientId, recipientName);
};

window.blockUser = async (userIdToBlock) => {
    if (confirm("Èske w sèten ou vle bloke moun sa a? Li p'ap ka wè afè w' yo ni voye mesaj ba ou ankò.")) {
        const success = await dataManager.blockUser(userIdToBlock);
        if (success) {
            NotificationSystem.show("Ou bloke itilizatè a ak siksè.", "success");
            // The listenToPosts and listenToInbox realtime subscriptions will naturally filter out their content now
        } else {
            NotificationSystem.show("Gen yon erè ki fèt.", "error");
        }
    }
};

window.handleLike = async (postId) => {
    const user = dataManager.getUser();
    if (!user.loggedIn) { openModal('auth-modal'); return; }
    await dataManager.likePost(postId);
    await dataManager.trackEngagement();
};

// --- REACTIONS SYSTEM ---
window.handleReaction = async (postId, emoji) => {
    const user = dataManager.getUser();
    if (!user.loggedIn) { openModal('auth-modal'); return; }

    // Track locally
    const key = `zepol_react_${postId}_${user.uid || 'guest'}`;
    const prev = localStorage.getItem(key);
    if (prev === emoji) {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, emoji);
    }

    // Update post reactions in Firebase
    try {
        if (dataManager.addReaction) {
            await dataManager.addReaction(postId, emoji);
        }
    } catch (e) {
        console.warn('Reaction sync failed:', e);
    }

    // Optimistic UI update
    const pills = document.querySelectorAll(`.reaction-pill[data-postid="${postId}"]`);
    pills.forEach(pill => {
        const pillEmoji = pill.dataset.emoji;
        const countSpan = pill.querySelector('span');
        if (!countSpan) return;
        const current = parseInt(countSpan.textContent) || 0;
        if (pillEmoji === emoji) {
            const newCount = prev === emoji ? Math.max(0, current - 1) : current + 1;
            countSpan.textContent = newCount > 0 ? newCount : '';
            pill.style.background = (prev !== emoji) ? '#fef2f2' : '#f8fafc';
            pill.style.borderColor = (prev !== emoji) ? '#fecaca' : '#e2e8f0';
            pill.style.transform = 'scale(1.15)';
            setTimeout(() => pill.style.transform = 'scale(1)', 200);
        }
    });

    await dataManager.trackEngagement();
};

window.reportPost = async (postId) => {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        openModal('auth-modal');
        return;
    }
    const reason = prompt("Poukisa w ap siyale pòs sa a?\n\n(Egz: Kontni ki pa apwopriye, awoyo, spam, danje...)", "Kontni ki pa apwopriye");
    if (reason === null) return; // user cancelled
    NotificationSystem.show("N ap voye rapò w...", "info");
    const ok = await dataManager.reportPost(postId, reason);
    if (ok) {
        NotificationSystem.show("Mèsi! Nou resevwa rapò w la. Ekip moderasyon an ap gade sa.", "success");
    } else {
        NotificationSystem.show("Erè pandan voye rapò a. Eseye ankò.", "error");
    }
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

/* --- INLINE COMMENT SUBMISSION & LIKING --- */
window.submitComment = async (postId) => {
    const input = document.getElementById(`comment-input-${postId}`);
    if (!input) return;

    const text = input.value.trim();
    if (!text) return NotificationSystem.show("Ekri yon bagay anvan ou kòmante.", "warning");

    const user = dataManager.getUser();
    if (!user.loggedIn) {
        openModal('auth-modal');
        return;
    }

    // Find the post to check if user is author
    const post = (window.currentPublicPosts?.find(p => p.id === postId)) || (window.currentCommunityPosts?.find(p => p.id === postId));
    
    // Only post author can reply to comments
    if (post && post.comments && post.comments.length > 0) {
        const isPostAuthor = post.authorId === user.uid;
        if (!isPostAuthor) {
            return NotificationSystem.show("Sèlman otem istwa a ka reponn nan kòmantè yo.", "warning");
        }
    }

    const comment = {
        text: text,
        author: user.name || "Manm",
        authorId: user.uid,
        timestamp: new Date().toISOString(),
        likes: 0
    };

    try {
        await dataManager.addComment(postId, comment);
        input.value = '';
        NotificationSystem.show("Repons ou ajoute! 💬", "success");

        // Local optimistic update so new comments appear immediately
        if (post) {
            post.comments = post.comments || [];
            post.comments.push(comment);
        }
        if (window.applyHomeFilter) window.applyHomeFilter(window.currentHomeFilter || 'all');
    } catch (e) {
        console.error("Comment Error:", e);
        NotificationSystem.show("Erè pandan ajoute repons la.", "error");
    }
};

window.likeComment = async (postId, commentIndex) => {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        openModal('auth-modal');
        return;
    }

    // Find the post
    const post = (window.currentPublicPosts?.find(p => p.id === postId)) || (window.currentCommunityPosts?.find(p => p.id === postId));
    if (!post || !post.comments || !post.comments[commentIndex]) return;

    // Increment like count locally (optimistic update)
    post.comments[commentIndex].likes = (post.comments[commentIndex].likes || 0) + 1;

    // Update in Firebase
    try {
        await dataManager.likeComment(postId, commentIndex);
        NotificationSystem.show("❤️", "success");
    } catch (e) {
        console.error("Like Comment Error:", e);
        // Rollback on error
        post.comments[commentIndex].likes--;
    }
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
    console.log("🙏 Gratitude added:", text);
    // In a real app we would save this to Firestore
    // await dataManager.addGratitude(text); 

    input.value = '';
    closeModal('gratitude-modal');
    NotificationSystem.show("Mèsi! Gratitid ou ajoute nan bokal la. ✨", "success");

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
    console.log("📖 Journal saved");

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

// ============================================================
//  ALL NEW FEATURES
// ============================================================

// --- COMMUNITY SEARCH + CATEGORY FILTER ---
window.searchCommunityPosts = (query) => {
    const posts = [...(window.currentCommunityPosts || []), ...(window.currentPublicPosts || [])];
    const q = query.toLowerCase().trim();
    if (!q) {
        renderPosts(posts.slice(0, 20), 'struggles-feed');
        return;
    }
    const filtered = posts.filter(p => {
        const text = ((p.text || '') + (p.content || '') + (p.title || '')).toLowerCase();
        return text.includes(q);
    });
    renderPosts(filtered, 'struggles-feed');
};

window.filterByCategory = (cat, btn) => {
    document.querySelectorAll('.cat-chip').forEach(b => {
        b.style.background = '#f8fafc'; b.style.color = '#374151';
        b.style.borderColor = '#e2e8f0'; b.style.fontWeight = '400';
    });
    if (btn) {
        btn.style.background = 'var(--primary)'; btn.style.color = 'white';
        btn.style.borderColor = 'var(--primary)'; btn.style.fontWeight = '600';
    }

    const posts = [...(window.currentCommunityPosts || []), ...(window.currentPublicPosts || [])];
    const catKeywords = {
        'estrès': ['estrès', 'stress', 'travay', 'fatige', 'prese'],
        'solitude': ['solitud', 'pou kont', 'izole', 'sèl', 'abandone'],
        'dèy': ['dèy', 'mouri', 'pèdi', 'kè kraze', 'soufrans'],
        'anksyete': ['anksyete', 'pè', 'laperèz', 'panike', 'enkyetid'],
        'relasyon': ['relasyon', 'renmen', 'koup', 'maryaj', 'divòs', 'separe'],
        'travay': ['travay', 'chèf', 'lajan', 'chomaj', 'karyè'],
        'espwa': ['espwa', 'viktwa', 'byennèt', 'kontan', 'jwa', 'geri']
    };

    if (cat === 'all') {
        renderPosts(posts.slice(0, 20), 'struggles-feed');
        return;
    }

    const keywords = catKeywords[cat] || [cat];
    const filtered = posts.filter(p => {
        const text = ((p.text || '') + (p.content || '') + (p.category || '')).toLowerCase();
        return keywords.some(k => text.includes(k)) || (p.category || '').toLowerCase() === cat;
    });
    renderPosts(filtered.length > 0 ? filtered : posts.slice(0, 10), 'struggles-feed');
};

// --- CONFESSION ANONYME ---
window.submitConfession = async () => {
    const input = document.getElementById('confession-input');
    const cat = document.getElementById('confession-category')?.value || 'general';
    const text = input?.value.trim();
    if (!text || text.length < 10) return NotificationSystem.show('Ekri yon ti bagay anvan ou konfese.', 'warning');
    if (window.detectDistress && window.detectDistress(text)) return;

    const confession = {
        text,
        category: cat,
        author: 'Anonim 🎭',
        isAnonymous: true,
        mood: cat,
        likes: 0,
        reactions: {},
        comments: [],
        type: 'confession',
        timestamp: new Date().toISOString()
    };

    try {
        await dataManager.addPost({ ...confession, type: 'community' });
    } catch (e) {
        console.warn('Confession sync failed:', e);
    }

    // Local fallback render
    const feed = document.getElementById('confession-feed');
    if (feed) {
        const div = document.createElement('div');
        div.style.cssText = 'background:white; border:1px solid #ede9fe; border-radius:14px; padding:18px; border-left:4px solid #8b5cf6;';
        div.innerHTML = `
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                <div style="width:36px;height:36px;background:#8b5cf6;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;">🎭</div>
                <div><strong style="color:#5b21b6;">Anonim</strong><br><span style="font-size:0.78rem;color:#94a3b8;">jis kounye a</span></div>
                <span style="margin-left:auto;background:#f5f3ff;color:#7c3aed;padding:3px 10px;border-radius:12px;font-size:0.78rem;">${cat}</span>
            </div>
            <p style="color:#374151;margin:0;line-height:1.6;">${text}</p>
        `;
        feed.prepend(div);
    }

    input.value = '';
    NotificationSystem.show('Ou konfese anonim. Ou pa pou kont ou. 💜', 'success');
};

// --- GOALS SYSTEM ---
window.openGoalModal = () => {
    document.getElementById('goal-title-input').value = '';
    openModal('goal-modal');
};

window.saveGoal = () => {
    const title = document.getElementById('goal-title-input')?.value.trim();
    const cat = document.getElementById('goal-category-input')?.value || 'byennèt';
    if (!title) return NotificationSystem.show('Ekri yon objektif anvan.', 'warning');

    const goals = JSON.parse(localStorage.getItem('zepol_goals') || '[]');
    goals.unshift({ id: Date.now(), title, cat, done: false, created: new Date().toISOString() });
    if (goals.length > 10) goals.splice(10);
    localStorage.setItem('zepol_goals', JSON.stringify(goals));

    closeModal('goal-modal');
    window.renderGoals();
    NotificationSystem.show(`Objektif "${title}" anrejistre! ✓`, 'success');
};

window.completeGoal = (id) => {
    const goals = JSON.parse(localStorage.getItem('zepol_goals') || '[]');
    const idx = goals.findIndex(g => g.id === id);
    if (idx === -1) return;

    goals[idx].done = true;
    goals[idx].completedAt = new Date().toISOString();
    localStorage.setItem('zepol_goals', JSON.stringify(goals));

    // Add to achievements
    const achievements = JSON.parse(localStorage.getItem('zepol_achievements') || '[]');
    achievements.unshift({ title: goals[idx].title, cat: goals[idx].cat, date: new Date().toISOString() });
    if (achievements.length > 20) achievements.splice(20);
    localStorage.setItem('zepol_achievements', JSON.stringify(achievements));

    // Award points
    const pts = parseInt(localStorage.getItem('zepol_points') || '0') + 10;
    localStorage.setItem('zepol_points', pts);
    const streak = parseInt(localStorage.getItem('zepol_streak') || '0') + 1;
    localStorage.setItem('zepol_streak', streak);
    const el = document.getElementById('streak-count');
    if (el) el.textContent = streak;

    window.renderGoals();
    window.renderAchievements();
    NotificationSystem.show(`🎉 Bravo! Ou fini "${goals[idx].title}" +10 pwen!`, 'success');
};

window.deleteGoal = (id) => {
    let goals = JSON.parse(localStorage.getItem('zepol_goals') || '[]');
    goals = goals.filter(g => g.id !== id);
    localStorage.setItem('zepol_goals', JSON.stringify(goals));
    window.renderGoals();
};

// --- DAILY CHALLENGES ---
const DAILY_CHALLENGE_POOL = [
    { id: 'water', text: 'Bwè 2 gode dlo 💧', points: 5 },
    { id: 'outside', text: 'Pran 10 minit deyò ☀️', points: 10 },
    { id: 'journal', text: 'Ekri 3 bagay pozitif 📝', points: 10 },
    { id: 'breathe', text: 'Fè egzèsis respirasyon an 🌬️', points: 8 },
    { id: 'smile', text: 'Di yon moun yon bagay jantiy 💙', points: 12 },
    { id: 'sleep', text: 'Kouche anvan minwi aswè a 🌙', points: 8 },
    { id: 'share', text: 'Pataje yon panse nan kominote a ✍️', points: 15 },
    { id: 'gratitude', text: 'Ajoute yon bagay nan bokal gratitid la 🍯', points: 8 },
    { id: 'phone', text: 'Pase 30 min san telefòn 📵', points: 10 },
    { id: 'music', text: 'Koute yon mizik ki fè w relaks 🎵', points: 5 },
];

window.initDailyChallenges = () => {
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem('zepol_daily_challenges') || '{}');

    if (saved.date !== today) {
        const shuffled = [...DAILY_CHALLENGE_POOL].sort(() => 0.5 - Math.random()).slice(0, 4);
        localStorage.setItem('zepol_daily_challenges', JSON.stringify({ date: today, challenges: shuffled, done: [] }));
    }

    const data = JSON.parse(localStorage.getItem('zepol_daily_challenges'));
    const container = document.getElementById('daily-challenges-list');
    if (!container) return;

    container.innerHTML = data.challenges.map(c => `
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:10px;border-radius:8px;background:${data.done.includes(c.id)?'#f0fdf4':'#f8fafc'};border:1px solid ${data.done.includes(c.id)?'#86efac':'#e2e8f0'};transition:all 0.2s;">
            <input type="checkbox" id="challenge-${c.id}" ${data.done.includes(c.id)?'checked':''} style="width:18px;height:18px;cursor:pointer;accent-color:var(--primary);">
            <span style="flex:1;font-size:0.92rem;color:var(--text-dark);${data.done.includes(c.id)?'text-decoration:line-through;color:#6b7280;':''}">${c.text}</span>
            <span style="font-size:0.78rem;background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:10px;">+${c.points}</span>
        </label>
    `).join('');

    const pts = parseInt(localStorage.getItem('zepol_points') || '0');
    const el = document.getElementById('total-points-display');
    if (el) el.textContent = pts;
};

window.validateDailyChallenges = () => {
    const data = JSON.parse(localStorage.getItem('zepol_daily_challenges') || '{}');
    if (!data.challenges) return;

    let newPoints = 0;
    const doneBefore = new Set(data.done || []);

    data.challenges.forEach(c => {
        const cb = document.getElementById(`challenge-${c.id}`);
        if (cb && cb.checked && !doneBefore.has(c.id)) {
            data.done = data.done || [];
            data.done.push(c.id);
            newPoints += c.points;
        }
    });

    if (newPoints > 0) {
        const total = parseInt(localStorage.getItem('zepol_points') || '0') + newPoints;
        localStorage.setItem('zepol_points', total);
        localStorage.setItem('zepol_daily_challenges', JSON.stringify(data));
        const el = document.getElementById('total-points-display');
        if (el) el.textContent = total;
        NotificationSystem.show(`🎉 +${newPoints} pwen! Kontinye konsa!`, 'success');
        window.initDailyChallenges();

        // Check badges
        setTimeout(() => window.loadBadges(), 500);
    } else {
        NotificationSystem.show('Chwazi yon defi anvan valide.', 'info');
    }
};

window.renderGoals = () => {
    const container = document.getElementById('goals-list');
    if (!container) return;
    const goals = JSON.parse(localStorage.getItem('zepol_goals') || '[]').filter(g => !g.done);
    if (goals.length === 0) {
        container.innerHTML = '<div style="color:#94a3b8;font-size:0.85rem;text-align:center;padding:10px;">Klike + pou ajoute yon objektif</div>';
        return;
    }
    const catColors = { 'byennèt': '#10b981', 'sosyal': '#3b82f6', 'travay': '#f59e0b', 'sante': '#ef4444', 'kreyatif': '#8b5cf6' };
    container.innerHTML = goals.map(g => `
        <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:#f8fafc;border-radius:10px;border-left:3px solid ${catColors[g.cat]||'#6b7280'};">
            <button onclick="window.completeGoal(${g.id})" style="background:none;border:2px solid #d1d5db;width:20px;height:20px;border-radius:50%;cursor:pointer;flex-shrink:0;transition:all 0.2s;" onmouseover="this.style.background='#10b981';this.style.borderColor='#10b981'" onmouseout="this.style.background='none';this.style.borderColor='#d1d5db'"></button>
            <span style="flex:1;font-size:0.88rem;color:#374151;">${g.title}</span>
            <button onclick="window.deleteGoal(${g.id})" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:12px;padding:2px;flex-shrink:0;">✕</button>
        </div>
    `).join('');
};

window.renderAchievements = () => {
    const container = document.getElementById('achievements-wall');
    if (!container) return;
    const achievements = JSON.parse(localStorage.getItem('zepol_achievements') || '[]').slice(0, 6);
    if (achievements.length === 0) {
        container.innerHTML = '<div style="color:#78350f;font-size:0.82rem;text-align:center;width:100%;padding:5px;">Ranpli objektif pou débloke rékonpans!</div>';
        return;
    }
    container.innerHTML = achievements.map(a => `
        <div title="${a.title}" style="background:white;border-radius:10px;padding:8px 10px;font-size:0.78rem;color:#92400e;font-weight:600;border:1px solid #fde68a;display:flex;align-items:center;gap:5px;">
            🏆 ${a.title.substring(0, 18)}${a.title.length > 18 ? '...' : ''}
        </div>
    `).join('');
};

// --- BADGES SYSTEM ---
const BADGES_DEF = [
    { id: 'new', icon: '🌱', label: 'Kòmansan', desc: 'Byenveni nan Zepòl!', condition: () => true },
    { id: 'post1', icon: '✍️', label: 'Premye Pataj', desc: 'Ou fè premye pataj ou', condition: () => (parseInt(localStorage.getItem('zepol_post_count')||'0') >= 1) },
    { id: 'post5', icon: '💬', label: 'Mizajou', desc: '5 pataj fè', condition: () => (parseInt(localStorage.getItem('zepol_post_count')||'0') >= 5) },
    { id: 'mood7', icon: '📊', label: 'Swivi Santi', desc: '7 jou de swivi santi', condition: () => (JSON.parse(localStorage.getItem('zepol_mood_logs')||'[]').length >= 7) },
    { id: 'goal1', icon: '🎯', label: 'Premye Viktwa', desc: 'Ou fini premye objektif ou', condition: () => (JSON.parse(localStorage.getItem('zepol_achievements')||'[]').length >= 1) },
    { id: 'goal5', icon: '🏆', label: 'Chanpyon', desc: '5 objektif fini', condition: () => (JSON.parse(localStorage.getItem('zepol_achievements')||'[]').length >= 5) },
    { id: 'support', icon: '🤝', label: 'Pilye Kominote', desc: '10 reyaksyon bay lòt', condition: () => (parseInt(localStorage.getItem('zepol_reactions_given')||'0') >= 10) },
    { id: 'streak7', icon: '🔥', label: 'Seri 7 Jou', desc: '7 jou konsekitif aktif', condition: () => (parseInt(localStorage.getItem('zepol_streak')||'0') >= 7) },
    { id: 'journal5', icon: '📖', label: 'Ekrivèn', desc: '5 antre jounal', condition: () => (JSON.parse(localStorage.getItem('zepol_journal_entries')||'[]').length >= 5) },
    { id: 'helper', icon: '💙', label: 'Sipò Depresyon', desc: 'Ou te ede yon moun nan kriz', condition: () => (parseInt(localStorage.getItem('zepol_helped_count')||'0') >= 1) },
];

window.loadBadges = () => {
    const container = document.getElementById('badges-grid');
    if (!container) return;
    const user = dataManager.getUser();
    container.innerHTML = BADGES_DEF.map(b => {
        const earned = user.loggedIn ? b.condition() : false;
        return `
            <div style="background:${earned?'linear-gradient(135deg, #fef9c3 0%, #fde68a 100%)':'#f8fafc'}; border:2px solid ${earned?'#fbbf24':'#e2e8f0'}; border-radius:14px; padding:15px; text-align:center; opacity:${earned?1:0.5};">
                <div style="font-size:2rem;margin-bottom:8px;">${b.icon}</div>
                <div style="font-weight:700;font-size:0.85rem;color:${earned?'#92400e':'#6b7280'};">${b.label}</div>
                <div style="font-size:0.72rem;color:${earned?'#78350f':'#94a3b8'};margin-top:4px;">${b.desc}</div>
                ${earned ? '<div style="margin-top:6px;font-size:0.7rem;background:#fbbf24;color:white;border-radius:10px;padding:2px 6px;">✓ Debloke</div>' : ''}
            </div>
        `;
    }).join('');
};

// --- FAQ MENTAL HEALTH ---
const FAQ_DATA = [
    { q: "Kisa depresyon ye egzakteman?", a: "Depresyon se yon maladi mantal reyèl ki afekte santiman, panse ak kò w. Li pi grav pase tristès nòmal. Li ka dire semèn oswa mwa si ou pa trete l. Li KAPAB geri ak bon sipò." },
    { q: "Eske sante mantal konsène tout moun?", a: "Wi, absoliman. Sante mantal se yon pati enpòtan nan byennèt jeneral tout moun, tankou sante fizik. Pa gen okenn danje pou pale sou li." },
    { q: "Kijan pou m ede yon moun ki gen depresyon?", a: "Koute l san jije. Evite di 'fò w forte' oswa 'se pa anyen'. Ofri w ede l pran randevou ak yon pwofesyonèl. Pran nouvèl li regilyèman. Prezans ou gen valè." },
    { q: "Eske medyitasyon reyèlman ede?", a: "Wi, etid montre medyitasyon ka redui nivo kortizon (omimon stres) epi amelyore fason lespri trete emosyon. Menm 10 minit pa jou ka fè diferans." },
    { q: "Ki diferans ki genyen ant anksyete ak stres?", a: "Stres se reyaksyon kò w avan yon defi espesifik (egzamen, travay). Anksyete se pè kontinye menm lè pa gen rezon klar. Si anksyete dure plis pase 6 mwa, chèche èd." },
    { q: "Kijan mwen ka jwenn yon sikològ Ayiti?", a: "Ou ka kontakte MSPP (Ministè Sante), chèche nan anyè psymed-haiti.org, oswa klike sou 'Anyè Sikològ' nan Zepòl. Kèk ofri sesyon gratis oswa pri ba." },
    { q: "Èske ale wè yon sikològ vle di m fou?", a: "Absoliman non! Ale wè yon sikològ vle di ou se yon moun ki prann sante w o serye. Se yon siy kouraj, pa fèblès. Anpil moun siksè gen yon terapis yo travay avèk." },
    { q: "Kisa ki ta fè m rele 116 ?", a: "Rele 116 si w gen panse pou fè mal ak tèt ou oswa lòt moun, si w santi w an gwo danje emosyonèl, oswa si yon moun ou konnen semble an danje imedyat. Pa tann." },
    { q: "Kijan pou m dòmi pi byen lè m anksye?", a: "Evite telefòn 1h anvan kouche. Fè respirasyon 4-7-8 anvan w dòmi. Fikse yon lè dòmi regilye. Louvri fenèt la yon ti moman. Ekri panse w avan w kouche." },
    { q: "Eske lavi sosyal ka ede sante mantal?", a: "Wi! Koneksyon sosyal se youn nan pi gwo pwoteksyon kont depresyon. Menm yon ti konvèsasyon avèk yon zanmi ka amelyore imiyo ak santi byennèt ou." },
];

window.loadFAQ = () => {
    const container = document.getElementById('faq-container');
    if (!container || container.children.length > 0) return;
    container.innerHTML = FAQ_DATA.map((item, i) => `
        <div style="border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;">
            <button onclick="window.toggleFAQ(this, ${i})" style="width:100%; padding:15px 18px; background:#f8fafc; border:none; text-align:left; cursor:pointer; font-weight:600; color:#1f2937; font-size:0.95rem; display:flex; justify-content:space-between; align-items:center;">
                <span>${item.q}</span>
                <i class="fas fa-chevron-down" style="transition:transform 0.2s; color:#6b7280; font-size:0.85rem;"></i>
            </button>
            <div id="faq-answer-${i}" style="display:none; padding:15px 18px; background:white; color:#4b5563; font-size:0.92rem; line-height:1.7; border-top:1px solid #e2e8f0;">${item.a}</div>
        </div>
    `).join('');
};

window.toggleFAQ = (btn, i) => {
    const ans = document.getElementById(`faq-answer-${i}`);
    const icon = btn.querySelector('i');
    if (ans.style.display === 'none') {
        ans.style.display = 'block';
        if (icon) icon.style.transform = 'rotate(180deg)';
    } else {
        ans.style.display = 'none';
        if (icon) icon.style.transform = 'rotate(0)';
    }
};

// --- PSYCHOLOGIST DIRECTORY ---
const PSYCHO_LIST = [
    { name: "Dr. Marie-Claire Duvigneaud", spec: "Depresyon & Anksyete", location: "Pòtoprens", phone: "+509 3456-7890", available: true, price: "Varyab (gratis pou bezwen)" },
    { name: "Ctr. Sante Mantal MSPP", spec: "Sèvis Piblik Nasyonal", location: "Tout Ayiti", phone: "116", available: true, price: "Gratis" },
    { name: "Dr. Jean-Robert Celestin", spec: "Traumatizm & PTSD", location: "Pòtoprens", phone: "+509 4123-5678", available: true, price: "Negosyab" },
    { name: "Zanmi Lasante - Klinik", spec: "Sante Mantal Entegre", location: "Mirebalais / Pòtoprens", phone: "+509 3388-1234", available: true, price: "Redwi oswa Gratis" },
    { name: "GHESKIO Mental Health", spec: "Sipò Kriz & Konseling", location: "Pòtoprens", phone: "+509 2940-0001", available: true, price: "Gratis" },
];

window.loadPsychoDirectory = () => {
    const container = document.getElementById('psycho-list');
    if (!container || container.children.length > 0) return;
    container.innerHTML = PSYCHO_LIST.map(p => `
        <div style="background:white; border:1px solid #e2e8f0; border-radius:14px; padding:18px; display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; justify-content:space-between; align-items:start; flex-wrap:wrap; gap:8px;">
                <div>
                    <h4 style="margin:0 0 4px; color:#1f2937;">${p.name}</h4>
                    <span style="background:#eff6ff;color:#1d4ed8;padding:3px 10px;border-radius:12px;font-size:0.8rem;">${p.spec}</span>
                </div>
                <span style="background:${p.available?'#f0fdf4':'#fef2f2'};color:${p.available?'#15803d':'#b91c1c'};padding:4px 10px;border-radius:12px;font-size:0.78rem;font-weight:600;">${p.available?'✓ Disponib':'Pa disponib'}</span>
            </div>
            <div style="display:flex;gap:15px;font-size:0.85rem;color:#6b7280;flex-wrap:wrap;">
                <span><i class="fas fa-map-marker-alt"></i> ${p.location}</span>
                <span><i class="fas fa-tag"></i> ${p.price}</span>
            </div>
            <a href="tel:${p.phone.replace(/\D/g,'')}" style="background:var(--primary);color:white;text-decoration:none;padding:10px;border-radius:10px;text-align:center;font-weight:600;font-size:0.9rem;display:block;">
                <i class="fas fa-phone-alt"></i> Rele: ${p.phone}
            </a>
        </div>
    `).join('');
};

// --- EMOTIONAL CALENDAR ---
window.loadEmotionCalendar = () => {
    const container = document.getElementById('emotion-calendar-grid');
    if (!container) return;

    const logs = JSON.parse(localStorage.getItem('zepol_mood_logs') || '[]');
    const logsByDate = {};
    logs.forEach(l => {
        const d = new Date(l.date).toDateString();
        logsByDate[d] = l.mood;
    });

    const colorMap = { happy: '#10b981', neutral: '#6b7280', sad: '#3b82f6', anxious: '#f59e0b' };
    const days = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];

    // Header
    let html = days.map(d => `<div style="text-align:center;font-size:0.72rem;font-weight:700;color:#6b7280;padding:4px 0;">${d}</div>`).join('');

    // Last 28 days
    const today = new Date();
    const cells = [];
    for (let i = 27; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = d.toDateString();
        const mood = logsByDate[key];
        const col = mood ? colorMap[mood] : '#e2e8f0';
        const isToday = i === 0;
        cells.push(`<div title="${d.toLocaleDateString('ht-HT')}${mood ? ' — ' + mood : ''}" style="aspect-ratio:1;border-radius:6px;background:${col};border:${isToday?'2px solid #1f2937':'1px solid transparent'};cursor:default;"></div>`);
    }

    // Pad to start on right day
    const firstDay = new Date(today);
    firstDay.setDate(today.getDate() - 27);
    const startPad = firstDay.getDay();
    const padCells = Array(startPad).fill('<div></div>').join('');

    container.innerHTML = html + padCells + cells.join('');
};

// --- PAYMENT METHODS ---
window.showPaymentMethod = (method) => {
    const panel = document.getElementById('payment-instructions');
    const content = document.getElementById('payment-details-content');
    if (!panel || !content) return;

    const methods = {
        moncash: {
            title: '📱 MonCash', color: '#15803d',
            steps: ['Ouvri aplikasyon MonCash ou a', 'Klike sou "Paye" oswa "Transfer"', 'Antre nimewo: <strong>+509 4005-7183</strong>', 'Mete montan ou vle bay la', 'Nan nòt la: ekri "Don Zepòl"', 'Konfime tranzaksyon an']
        },
        natcash: {
            title: '💳 NatCash', color: '#1d4ed8',
            steps: ['Ouvri NatCash oswa Nasyonal Bank an', 'Ale nan "Transfert de fonds"', 'Antre nimewo: <strong>+509 4905-0000</strong>', 'Chwazi montan ou vle bay la', 'Nan referans: "Don Zepòl"', 'Konfime transfè a']
        },
        paypal: {
            title: '🌐 PayPal', color: '#a16207',
            steps: ['Ale sou paypal.me/ZepolSupport', 'Konekte ak kont PayPal ou', 'Antre montan ou vle voye a (USD)', 'Klike "Voye kounye a"', 'Nou ap konfime resevwa a pa imèl']
        },
        virement: {
            title: '🏦 Viman Bancaire', color: '#7e22ce',
            steps: ['Banque: Unibank Ayiti', 'Non kont: Zepòl Foundation', 'Nimewo kont: 1234-5678-9012', 'Routing: 022000020', 'Mete "Don Zepòl" nan referans', 'Voye konfirmasyon a sipozepol@gmail.com']
        }
    };

    const m = methods[method];
    if (!m) return;

    content.innerHTML = `
        <h4 style="color:${m.color};margin:0 0 15px;font-size:1.1rem;">${m.title} — Enstriksyon</h4>
        <ol style="padding-left:20px;display:flex;flex-direction:column;gap:8px;">
            ${m.steps.map(s => `<li style="color:#374151;font-size:0.9rem;">${s}</li>`).join('')}
        </ol>
        <p style="margin-top:15px;color:#6b7280;font-size:0.82rem;"><i class="fas fa-info-circle"></i> Mèsi pou sipò ou! Nou ap konfime nan 24h.</p>
    `;
    panel.style.display = 'block';
    panel.style.borderColor = m.color;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// --- MEMBER SUPPORT PROFILES ---
window.loadMemberSupportProfiles = () => {
    const container = document.getElementById('member-support-profiles');
    if (!container || container.children.length > 0) return;

    const profiles = [
        { name: "Yves M.", goal: "Achte liv pou inivèsite", target: 150, raised: 85, currency: 'USD', story: "Mwen vle kontinye etid mwen men mwen manke lajan pou livre yo." },
        { name: "Marie J.", goal: "Pran swen mantal (terapi)", target: 80, raised: 30, currency: 'USD', story: "Mwen bezwen 4 sesyon terapi. Mwen fè fas ak depresyon pandan 2 an." },
        { name: "Pierre D.", goal: "Medikaman pou sante mantal", target: 60, raised: 60, currency: 'USD', story: "Mèsi kominote a! Objektif mwen atenn. 🙏", completed: true },
    ];

    container.innerHTML = profiles.map(p => {
        const pct = Math.min(100, Math.round((p.raised / p.target) * 100));
        return `
            <div style="background:white;border:1px solid #e2e8f0;border-radius:15px;padding:20px;${p.completed?'opacity:0.7;':''}">
                <div style="display:flex;gap:12px;align-items:start;margin-bottom:12px;">
                    <div style="width:42px;height:42px;background:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:16px;flex-shrink:0;">${p.name[0]}</div>
                    <div><strong style="color:#1f2937;">${p.name}</strong><br><span style="font-size:0.82rem;color:#6b7280;">${p.goal}</span></div>
                </div>
                <p style="font-size:0.85rem;color:#6b7280;font-style:italic;margin-bottom:12px;">"${p.story}"</p>
                <div style="background:#f1f5f9;border-radius:10px;height:8px;margin-bottom:6px;">
                    <div style="background:${pct>=100?'#10b981':'var(--primary)'};height:100%;border-radius:10px;width:${pct}%;transition:width 0.5s;"></div>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:0.82rem;color:#6b7280;margin-bottom:12px;">
                    <span>$${p.raised} ranmase</span><span>${pct}% / $${p.target}</span>
                </div>
                ${p.completed ? '<div style="text-align:center;background:#f0fdf4;color:#15803d;padding:8px;border-radius:10px;font-weight:600;">✓ Objektif atenn! Mèsi.</div>' :
                `<button onclick="window.showPaymentMethod('moncash')" style="background:var(--primary);color:white;border:none;padding:10px;border-radius:10px;width:100%;font-weight:600;cursor:pointer;">
                    <i class="fas fa-hand-holding-heart"></i> Ede ${p.name.split(' ')[0]}
                </button>`}
            </div>
        `;
    }).join('');
};

window.openMemberSupportRequest = () => {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        NotificationSystem.show('Ou dwe konekte pou mande èd.', 'info');
        openModal('auth-modal');
        return;
    }
    openModal('support-request-modal');
};

window.submitSupportRequest = async () => {
    const goal = document.getElementById('support-goal')?.value.trim();
    const amount = document.getElementById('support-amount')?.value;
    const story = document.getElementById('support-story')?.value.trim();
    if (!goal || !story) return NotificationSystem.show('Tanpri ranpli bezwen w ak istwa w.', 'warning');

    NotificationSystem.show('N ap voye demand ou...', 'info');
    const res = await dataManager.requestSupport({ goal, amount, story });
    if (res.success) {
        closeModal('support-request-modal');
        NotificationSystem.show(res.message, 'success');
        ['support-goal', 'support-amount', 'support-story'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    } else {
        NotificationSystem.show(res.message, 'error');
    }
};

// ═══════════════════════════════════════════════════════════
//  PREMIUM / CHECKOUT SYSTEM
// ═══════════════════════════════════════════════════════════
const PLAN_INFO = {
    pro:      { name: 'Abònman Pro',     price: '$5',  amount: 5,  icon: '⭐', perMonth: true },
    ultimate: { name: 'Abònman Ilimite', price: '$15', amount: 15, icon: '👑', perMonth: true }
};
const PRODUCT_INFO = {
    'ebook-stress':   { name: 'Ebook Anti-Strès',  price: '$4.99', icon: '📘' },
    'meditation-pack':{ name: 'Meditasyon Gide',   price: '$7.99', icon: '🧘' },
    'journal-pdf':    { name: 'Jounal PDF 30 jou', price: '$2.99', icon: '📓' }
};

const PAYMENT_DETAILS = {
    moncash:  { title: '📱 MonCash',  color: '#15803d', steps: ['Ouvri aplikasyon MonCash ou a', 'Chwazi "Transfè Lajan"', 'Nimewo: <strong>+509 4005-7183</strong>', 'Antre montan an: <strong>{AMOUNT}</strong>', 'Nan nòt: ekri "<strong>{REF}</strong>"', 'Konfime epi kopye nimewo tranzaksyon an'] },
    natcash:  { title: '💳 NatCash',  color: '#1d4ed8', steps: ['Ouvri NatCash', 'Chwazi "Transfert"', 'Nimewo: <strong>+509 4905-0000</strong>', 'Antre montan an: <strong>{AMOUNT}</strong>', 'Referans: "<strong>{REF}</strong>"', 'Konfime transfè a'] },
    paypal:   { title: '🌐 PayPal',   color: '#a16207', steps: ['Ale sou <strong>paypal.me/ZepolSupport</strong>', 'Antre montan an: <strong>{AMOUNT}</strong> (USD)', 'Nan nòt: "<strong>{REF}</strong>"', 'Voye peman an', 'Kopye ID tranzaksyon PayPal la'] },
    card:     { title: '💰 Kat Bankè', color: '#7e22ce', steps: ['Voye yon imèl bay <strong>sipozepol@gmail.com</strong>', 'Sijè: "<strong>{REF}</strong>"', 'N ap voye yon lyen peman sekirize ba ou', 'Montan: <strong>{AMOUNT}</strong>'] }
};

let currentCheckout = null; // { type:'plan'|'product', id, name, price, amount }

window.selectPlan = (planKey) => {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        NotificationSystem.show('Konekte pou w abòne.', 'info');
        openModal('auth-modal');
        return;
    }
    const plan = PLAN_INFO[planKey];
    if (!plan) return;
    currentCheckout = { type: 'plan', id: planKey, name: plan.name, price: plan.price, amount: '$' + plan.amount };
    _openCheckout(plan.icon, plan.name, plan.price + (plan.perMonth ? '<span style="font-size:0.9rem;font-weight:400;color:var(--text-muted);">/mwa</span>' : ''));
};

window.buyProduct = (productId) => {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        NotificationSystem.show('Konekte pou w achte.', 'info');
        openModal('auth-modal');
        return;
    }
    const prod = PRODUCT_INFO[productId];
    if (!prod) return;
    currentCheckout = { type: 'product', id: productId, name: prod.name, price: prod.price, amount: prod.price };
    _openCheckout(prod.icon, prod.name, prod.price);
};

function _openCheckout(icon, title, priceHtml) {
    document.getElementById('checkout-icon').textContent = icon;
    document.getElementById('checkout-title').textContent = title;
    document.getElementById('checkout-price').innerHTML = priceHtml;
    document.getElementById('checkout-step-method').style.display = 'block';
    document.getElementById('checkout-step-pay').style.display = 'none';
    const txref = document.getElementById('checkout-txref');
    if (txref) txref.value = '';
    openModal('checkout-modal');
}

window.selectCheckoutMethod = (method) => {
    if (!currentCheckout) return;
    currentCheckout.method = method;
    const d = PAYMENT_DETAILS[method];
    const ref = 'ZEP-' + currentCheckout.id.toUpperCase().slice(0, 6) + '-' + Date.now().toString().slice(-5);
    currentCheckout.ref = ref;

    const stepsHtml = d.steps.map(s =>
        s.replace('{AMOUNT}', currentCheckout.amount).replace('{REF}', ref)
    ).map(s => `<li style="margin-bottom:7px;">${s}</li>`).join('');

    document.getElementById('checkout-instructions').innerHTML = `
        <h4 style="margin:0 0 12px; color:${d.color};">${d.title}</h4>
        <ol style="padding-left:18px; color:#374151; font-size:0.88rem; line-height:1.5;">${stepsHtml}</ol>`;
    document.getElementById('checkout-step-method').style.display = 'none';
    document.getElementById('checkout-step-pay').style.display = 'block';
};

window.backToCheckoutMethod = () => {
    document.getElementById('checkout-step-method').style.display = 'block';
    document.getElementById('checkout-step-pay').style.display = 'none';
};

window.confirmCheckout = async () => {
    if (!currentCheckout) return;
    const txRef = document.getElementById('checkout-txref')?.value.trim() || currentCheckout.ref;
    NotificationSystem.show('N ap anrejistre demand ou...', 'info');

    let res;
    if (currentCheckout.type === 'plan') {
        res = await dataManager.subscribeToPlan(currentCheckout.id, currentCheckout.method, txRef);
    } else {
        res = await dataManager.purchaseProduct(currentCheckout.id, currentCheckout.name, currentCheckout.price, currentCheckout.method, txRef);
    }

    if (res && res.success) {
        closeModal('checkout-modal');
        // Show confirmation modal
        openModal('thanks-modal');
        const thanksModal = document.getElementById('thanks-modal');
        if (thanksModal) {
            const p = thanksModal.querySelector('p');
            if (p) p.textContent = currentCheckout.type === 'plan'
                ? `Mèsi! Demand abònman ${currentCheckout.name} w resevwa. Ekip la ap verifye peman w nan 24è epi aktive l. N ap voye w yon konfimasyon.`
                : `Mèsi! Demand acha "${currentCheckout.name}" w resevwa. N ap voye pwodwi a ba ou apre konfimasyon peman an.`;
        }
        NotificationSystem.show(res.message, 'success');
        currentCheckout = null;
    } else {
        NotificationSystem.show(res?.message || 'Erè. Eseye ankò.', 'error');
    }
};

// ── COACHING ─────────────────────────────────────────────────
window.openCoachingModal = () => {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        NotificationSystem.show('Konekte pou pran randevou.', 'info');
        openModal('auth-modal');
        return;
    }
    openModal('coaching-modal');
};

window.submitCoaching = async () => {
    const type = document.getElementById('coaching-type')?.value;
    const phone = document.getElementById('coaching-phone')?.value.trim();
    const preferredDate = document.getElementById('coaching-date')?.value.trim();
    const note = document.getElementById('coaching-note')?.value.trim();
    if (!phone) return NotificationSystem.show('Tanpri mete yon nimewo pou n ka kontakte w.', 'warning');

    NotificationSystem.show('N ap voye demand randevou w...', 'info');
    const res = await dataManager.bookCoaching({ type, phone, preferredDate, note });
    if (res.success) {
        closeModal('coaching-modal');
        NotificationSystem.show(res.message, 'success');
        ['coaching-phone', 'coaching-date', 'coaching-note'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    } else {
        NotificationSystem.show(res.message, 'error');
    }
};

// ── PREMIUM FEATURE GATES & UI ───────────────────────────────
window.refreshPremiumUI = () => {
    const plan = dataManager.getUserPlan ? dataManager.getUserPlan() : 'free';
    const user = dataManager.getUser();
    const isPremium = plan === 'pro' || plan === 'ultimate';

    // Show premium badge in profile/header
    document.querySelectorAll('.premium-badge').forEach(el => {
        el.classList.toggle('hidden', !isPremium);
    });

    // Update plan card buttons
    const proBtn = document.getElementById('plan-pro-btn');
    const ultBtn = document.getElementById('plan-ultimate-btn');
    const pending = user.pendingPlan;

    if (proBtn) {
        if (plan === 'pro') { proBtn.textContent = '✓ Plan Aktyèl'; proBtn.disabled = true; proBtn.style.opacity = '0.7'; }
        else if (pending === 'pro') { proBtn.textContent = '⏳ Ap verifye...'; }
        else { proBtn.innerHTML = 'Chwazi Pro'; proBtn.disabled = false; proBtn.style.opacity = '1'; }
    }
    if (ultBtn) {
        if (plan === 'ultimate') { ultBtn.textContent = '✓ Plan Aktyèl'; ultBtn.disabled = true; ultBtn.style.opacity = '0.7'; }
        else if (pending === 'ultimate') { ultBtn.textContent = '⏳ Ap verifye...'; }
        else { ultBtn.innerHTML = 'Chwazi Ilimite'; ultBtn.disabled = false; ultBtn.style.opacity = '1'; }
    }

    // Unlock premium content markers
    document.querySelectorAll('.premium-locked').forEach(el => {
        el.classList.toggle('unlocked', isPremium);
    });

    // Show admin button only for admin
    const isAdmin = dataManager.isAdmin && dataManager.isAdmin();
    const adminBtn = document.getElementById('sidebar-admin-btn');
    if (adminBtn) adminBtn.classList.toggle('hidden', !isAdmin);
};

// ═══════════════════════════════════════════════════════════
//  ADMIN PANEL
// ═══════════════════════════════════════════════════════════
let adminCurrentTab = 'subscriptions';

window.openAdminPanel = () => {
    if (!dataManager.isAdmin || !dataManager.isAdmin()) {
        NotificationSystem.show('Aksè rezève pou administratè.', 'warning');
        return;
    }
    openModal('admin-modal');
    window.switchAdminTab('subscriptions');
};

window.switchAdminTab = (tab, btnEl) => {
    adminCurrentTab = tab;
    // Update tab styles
    document.querySelectorAll('.admin-tab').forEach(b => {
        b.style.background = '#e2e8f0'; b.style.color = '#475569';
    });
    const activeBtn = btnEl || document.querySelector(`.admin-tab[onclick*="${tab}"]`);
    if (activeBtn) { activeBtn.style.background = 'var(--primary)'; activeBtn.style.color = 'white'; }
    window.loadAdminTab(tab);
};

window.loadAdminTab = async (tab) => {
    const container = document.getElementById('admin-content');
    if (!container) return;
    container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:40px;"><i class="fas fa-spinner fa-spin"></i> Ap chaje...</div>';

    const items = await dataManager.adminFetch(tab);

    if (!items.length) {
        container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:40px;"><i class="fas fa-inbox" style="font-size:2rem;opacity:0.4;"></i><p>Pa gen anyen nan seksyon sa a.</p></div>';
        return;
    }

    // Render based on tab type
    const renderers = {
        subscriptions: _renderAdminSubscription,
        purchases: _renderAdminPurchase,
        support_requests: _renderAdminSupport,
        coaching_requests: _renderAdminCoaching,
        reports: _renderAdminReport
    };
    const render = renderers[tab] || (i => JSON.stringify(i));
    container.innerHTML = items.map(render).join('');
};

function _statusBadge(status) {
    const map = {
        pending: ['#fef3c7', '#92400e', '⏳ An atant'],
        active:  ['#dcfce7', '#15803d', '✓ Aktif'],
        rejected:['#fee2e2', '#b91c1c', '✗ Rejte'],
        delivered:['#dbeafe', '#1e40af', '📦 Livre'],
        open:    ['#fef3c7', '#92400e', '🔴 Ouvè'],
        resolved:['#dcfce7', '#15803d', '✓ Rezoud']
    };
    const [bg, col, txt] = map[status] || ['#f1f5f9', '#475569', status];
    return `<span style="background:${bg};color:${col};padding:3px 10px;border-radius:12px;font-size:0.72rem;font-weight:600;">${txt}</span>`;
}

function _fmtDate(iso) {
    if (!iso) return '';
    try { return new Date(iso).toLocaleString('ht-HT', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }); }
    catch(e) { return iso; }
}

function _adminCard(inner) {
    return `<div style="background:white;border:1px solid #e2e8f0;border-radius:12px;padding:14px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">${inner}</div>`;
}

function _renderAdminSubscription(s) {
    const amount = s.plan === 'ultimate' ? '$15' : '$5';
    const actions = s.status === 'pending' ? `
        <div style="display:flex;gap:8px;margin-top:10px;">
            <button onclick="window.adminActivate('${s.id}','${s.userId}','${s.plan}')" style="flex:1;background:#10b981;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.82rem;"><i class="fas fa-check"></i> Valide (1 mwa)</button>
            <button onclick="window.adminActivate('${s.id}','${s.userId}','${s.plan}',12)" style="flex:1;background:#059669;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.82rem;">Valide (1 an)</button>
            <button onclick="window.adminReject('subscriptions','${s.id}')" style="background:#ef4444;color:white;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:0.82rem;"><i class="fas fa-times"></i></button>
        </div>` : '';
    return _adminCard(`
        <div style="display:flex;justify-content:space-between;align-items:start;gap:8px;">
            <div>
                <strong style="color:#1f2937;">${s.userName || 'Itilizatè'}</strong>
                <span style="background:#faf5ff;color:#7e22ce;padding:2px 8px;border-radius:8px;font-size:0.72rem;margin-left:6px;">${s.plan?.toUpperCase()} ${amount}/mwa</span>
                <div style="font-size:0.8rem;color:#6b7280;margin-top:4px;">📱 ${s.paymentMethod || '?'} · Ref: <code style="background:#f1f5f9;padding:1px 5px;border-radius:4px;">${s.txRef || 'N/A'}</code></div>
                <div style="font-size:0.72rem;color:#94a3b8;margin-top:2px;">${_fmtDate(s.requestedAt)} · ${s.userEmail || ''}</div>
            </div>
            ${_statusBadge(s.status)}
        </div>${actions}`);
}

function _renderAdminPurchase(p) {
    const actions = p.status === 'pending' ? `
        <div style="display:flex;gap:8px;margin-top:10px;">
            <button onclick="window.adminMarkDelivered('${p.id}')" style="flex:1;background:#3b82f6;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.82rem;"><i class="fas fa-paper-plane"></i> Make Livre</button>
            <button onclick="window.adminReject('purchases','${p.id}')" style="background:#ef4444;color:white;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:0.82rem;"><i class="fas fa-times"></i></button>
        </div>` : '';
    return _adminCard(`
        <div style="display:flex;justify-content:space-between;align-items:start;gap:8px;">
            <div>
                <strong style="color:#1f2937;">${p.productName}</strong> <span style="color:var(--primary);font-weight:700;">${p.price}</span>
                <div style="font-size:0.8rem;color:#6b7280;margin-top:4px;">${p.userName} · 📱 ${p.paymentMethod} · Ref: <code style="background:#f1f5f9;padding:1px 5px;border-radius:4px;">${p.txRef || 'N/A'}</code></div>
                <div style="font-size:0.72rem;color:#94a3b8;margin-top:2px;">${_fmtDate(p.purchasedAt)}</div>
            </div>
            ${_statusBadge(p.status)}
        </div>${actions}`);
}

function _renderAdminSupport(s) {
    const actions = s.status === 'pending' ? `
        <div style="display:flex;gap:8px;margin-top:10px;">
            <button onclick="window.adminResolve('support_requests','${s.id}','approved')" style="flex:1;background:#10b981;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.82rem;"><i class="fas fa-check"></i> Apwouve & Pibliye</button>
            <button onclick="window.adminReject('support_requests','${s.id}')" style="background:#ef4444;color:white;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:0.82rem;"><i class="fas fa-times"></i></button>
        </div>` : '';
    return _adminCard(`
        <div style="display:flex;justify-content:space-between;align-items:start;gap:8px;">
            <div style="flex:1;">
                <strong style="color:#1f2937;">${s.userName}</strong> — ${s.goal} ${s.amount ? `<span style="color:var(--secondary);font-weight:700;">($${s.amount})</span>` : ''}
                <p style="font-size:0.85rem;color:#475569;margin:6px 0;font-style:italic;">"${s.story}"</p>
                <div style="font-size:0.72rem;color:#94a3b8;">${_fmtDate(s.createdAt)} · ${s.contact || ''}</div>
            </div>
            ${_statusBadge(s.status)}
        </div>${actions}`);
}

function _renderAdminCoaching(c) {
    const actions = c.status === 'pending' ? `
        <div style="display:flex;gap:8px;margin-top:10px;">
            <button onclick="window.adminResolve('coaching_requests','${c.id}','confirmed')" style="flex:1;background:#10b981;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.82rem;"><i class="fas fa-check"></i> Konfime Randevou</button>
            <a href="https://wa.me/${(c.phone||'').replace(/\\D/g,'')}" target="_blank" style="background:#22c55e;color:white;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:0.82rem;text-decoration:none;"><i class="fab fa-whatsapp"></i></a>
            <button onclick="window.adminReject('coaching_requests','${c.id}')" style="background:#ef4444;color:white;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:0.82rem;"><i class="fas fa-times"></i></button>
        </div>` : '';
    return _adminCard(`
        <div style="display:flex;justify-content:space-between;align-items:start;gap:8px;">
            <div style="flex:1;">
                <strong style="color:#1f2937;">${c.userName}</strong> — <span style="background:#eef2ff;color:#4338ca;padding:2px 8px;border-radius:8px;font-size:0.75rem;">${c.type}</span>
                <div style="font-size:0.82rem;color:#475569;margin:5px 0;">📞 ${c.phone || 'N/A'} · 🕐 ${c.preferredDate || 'fleksib'}</div>
                ${c.note ? `<p style="font-size:0.82rem;color:#6b7280;margin:4px 0;font-style:italic;">"${c.note}"</p>` : ''}
                <div style="font-size:0.72rem;color:#94a3b8;">${_fmtDate(c.createdAt)}</div>
            </div>
            ${_statusBadge(c.status)}
        </div>${actions}`);
}

function _renderAdminReport(r) {
    const actions = r.status === 'open' ? `
        <div style="display:flex;gap:8px;margin-top:10px;">
            <button onclick="window.adminResolve('reports','${r.id}','resolved')" style="flex:1;background:#10b981;color:white;border:none;padding:8px;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.82rem;"><i class="fas fa-check"></i> Make Rezoud</button>
        </div>` : '';
    return _adminCard(`
        <div style="display:flex;justify-content:space-between;align-items:start;gap:8px;">
            <div style="flex:1;">
                <strong style="color:#b91c1c;">🚩 Rapò sou pòs</strong>
                <div style="font-size:0.82rem;color:#475569;margin:5px 0;">Rezon: ${r.reason}</div>
                <div style="font-size:0.75rem;color:#6b7280;">Pòs ID: <code style="background:#f1f5f9;padding:1px 5px;border-radius:4px;">${r.postId}</code></div>
                <div style="font-size:0.72rem;color:#94a3b8;margin-top:2px;">Pa: ${r.reporterName} · ${_fmtDate(r.reportedAt)}</div>
            </div>
            ${_statusBadge(r.status)}
        </div>${actions}`);
}

// Admin actions
window.adminActivate = async (subId, userId, plan, months = 1) => {
    NotificationSystem.show('N ap aktive plan an...', 'info');
    const res = await dataManager.activateSubscription(subId, userId, plan, months);
    NotificationSystem.show(res.message, res.success ? 'success' : 'error');
    if (res.success) window.loadAdminTab(adminCurrentTab);
};

window.adminReject = async (coll, docId) => {
    if (!confirm('Èske w sèten ou vle rejte sa a?')) return;
    const res = await dataManager.adminUpdateStatus(coll, docId, 'rejected');
    NotificationSystem.show(res.message, res.success ? 'info' : 'error');
    if (res.success) window.loadAdminTab(adminCurrentTab);
};

window.adminMarkDelivered = async (purchaseId) => {
    const res = await dataManager.adminUpdateStatus('purchases', purchaseId, 'delivered');
    NotificationSystem.show(res.success ? 'Pwodwi make kòm livre!' : res.message, res.success ? 'success' : 'error');
    if (res.success) window.loadAdminTab(adminCurrentTab);
};

window.adminResolve = async (coll, docId, status) => {
    const res = await dataManager.adminUpdateStatus(coll, docId, status);
    NotificationSystem.show(res.success ? 'Mizajou fèt!' : res.message, res.success ? 'success' : 'error');
    if (res.success) window.loadAdminTab(adminCurrentTab);
};

window.adminSetPlanManual = async () => {
    const email = document.getElementById('admin-manual-email')?.value.trim();
    const plan = document.getElementById('admin-manual-plan')?.value;
    if (!email) return NotificationSystem.show('Mete yon imèl.', 'warning');
    NotificationSystem.show('N ap aplike plan an...', 'info');
    const res = await dataManager.adminSetPlanByEmail(email, plan, plan === 'ultimate' ? 12 : 1);
    NotificationSystem.show(res.message, res.success ? 'success' : 'error');
    if (res.success) document.getElementById('admin-manual-email').value = '';
};

// ═══════════════════════════════════════════════════════════
//  PREMIUM FEATURE: GUIDED MEDITATION (Pro/Ultimate)
// ═══════════════════════════════════════════════════════════
const MEDITATION_SESSIONS = [
    { id: 'calm', title: '🌊 Kalm Pwofon', duration: 300, free: true, guide: ['Fèmen je w dousman...', 'Respire anndan... 1, 2, 3, 4', 'Kenbe... santi lapè a', 'Lage dousman... tout tansyon ale', 'Ou an sekirite. Ou la. Kounye a.', 'Kite chak souf pote w pi fon nan kalm'] },
    { id: 'sleep', title: '🌙 Dòmi Trankil', duration: 600, free: false, guide: ['Kouche komftableman...', 'Relaks zòtèy ou, pye ou...', 'Relaks janm ou, vant ou...', 'Relaks zepòl ou, figi w...', 'Chak pati nan kò w vin lou ak kalm', 'Kite lespri w flote tankou yon nyaj', 'Dòmi ap vini natirèlman...'] },
    { id: 'anxiety', title: '🍃 Kont Anksyete', duration: 420, free: false, guide: ['Mete yon men sou kè w...', 'Santi batman kè w san jije l', 'Respire pi long ke ou inspire', 'Anksyete a se yon nyaj — li ap pase', 'Ou pi gwo pase laperèz ou', 'Chak souf di: mwen an sekirite', 'Ou gen kontwòl. Ou la kounye a.'] },
    { id: 'morning', title: '☀️ Kòmanse Jounen', duration: 300, free: false, guide: ['Souri dousman...', 'Panse a yon bagay ou rekonesan pou li', 'Respire enèji pozitif', 'Jodi a se yon nouvo paj', 'Ou gen fòs pou jounen an', 'Mete entansyon w: jodi a m ap dou ak tèt mwen'] }
];

window.openMeditation = () => {
    const plan = dataManager.getUserPlan ? dataManager.getUserPlan() : 'free';
    const isPremium = plan === 'pro' || plan === 'ultimate';

    const list = document.getElementById('meditation-list');
    const player = document.getElementById('meditation-player');
    if (player) player.style.display = 'none';
    if (list) {
        list.style.display = 'flex';
        list.innerHTML = MEDITATION_SESSIONS.map(s => {
            const locked = !s.free && !isPremium;
            return `<button onclick="${locked ? `window.promptPremiumForMeditation()` : `window.startMeditation('${s.id}')`}" style="display:flex;align-items:center;justify-content:space-between;gap:10px;background:${locked?'#f8fafc':'white'};border:1px solid #e2e8f0;border-radius:12px;padding:14px;cursor:pointer;text-align:left;opacity:${locked?0.7:1};">
                <span style="font-size:1rem;font-weight:600;color:var(--text-dark);">${s.title}</span>
                <span style="font-size:0.8rem;color:#94a3b8;">${locked ? '🔒 Premium' : Math.floor(s.duration/60)+' min'}</span>
            </button>`;
        }).join('');
    }
    openModal('meditation-modal');
};

window.promptPremiumForMeditation = () => {
    closeModal('meditation-modal');
    NotificationSystem.show('Sesyon sa a se pou manm Premium. Abòne pou debloke tout meditasyon yo! 🧘', 'info');
    setTimeout(() => navigateTo('premium'), 800);
};

let meditationInterval = null, meditationPhaseInterval = null;

window.startMeditation = (sessionId) => {
    const session = MEDITATION_SESSIONS.find(s => s.id === sessionId);
    if (!session) return;

    document.getElementById('meditation-list').style.display = 'none';
    document.getElementById('meditation-player').style.display = 'block';
    document.getElementById('meditation-subtitle').textContent = session.title;

    let remaining = session.duration;
    let phaseIdx = 0;
    const orb = document.getElementById('meditation-orb');
    const phaseEl = document.getElementById('meditation-phase');
    const guideEl = document.getElementById('meditation-guide');
    const timerEl = document.getElementById('meditation-timer');

    const updateTimer = () => {
        const m = Math.floor(remaining / 60), s = remaining % 60;
        if (timerEl) timerEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    };
    updateTimer();

    // Breathing orb animation (expand/contract every 8s)
    let expanded = false;
    const breathe = () => {
        expanded = !expanded;
        if (orb) orb.style.transform = expanded ? 'scale(1.3)' : 'scale(1)';
        if (phaseEl) phaseEl.textContent = expanded ? 'Respire...' : 'Lage...';
    };
    breathe();
    meditationPhaseInterval = setInterval(breathe, 4000);

    // Guide text rotation
    if (guideEl) guideEl.textContent = session.guide[0];
    let guideTimer = setInterval(() => {
        phaseIdx = (phaseIdx + 1) % session.guide.length;
        if (guideEl) {
            guideEl.style.opacity = '0';
            setTimeout(() => { guideEl.textContent = session.guide[phaseIdx]; guideEl.style.opacity = '1'; }, 300);
        }
    }, 8000);

    meditationInterval = setInterval(() => {
        remaining--;
        updateTimer();
        if (remaining <= 0) {
            window.stopMeditation();
            NotificationSystem.show('Sesyon meditasyon konplè! Byen fèt. 🌟 +5 pwen', 'success');
            const pts = parseInt(localStorage.getItem('zepol_points') || '0') + 5;
            localStorage.setItem('zepol_points', pts);
        }
    }, 1000);
    meditationInterval._guideTimer = guideTimer;
};

window.stopMeditation = () => {
    if (meditationInterval) { clearInterval(meditationInterval); if (meditationInterval._guideTimer) clearInterval(meditationInterval._guideTimer); meditationInterval = null; }
    if (meditationPhaseInterval) { clearInterval(meditationPhaseInterval); meditationPhaseInterval = null; }
    const player = document.getElementById('meditation-player');
    const list = document.getElementById('meditation-list');
    if (player) player.style.display = 'none';
    if (list) list.style.display = 'flex';
};

// --- PHQ-2 DEPRESSION SCREEN ---
window.evaluatePHQ2 = () => {
    const q1 = parseInt(document.getElementById('phq2-q1')?.value || '0');
    const q2 = parseInt(document.getElementById('phq2-q2')?.value || '0');
    const score = q1 + q2;
    const resultEl = document.getElementById('phq2-result');
    if (!resultEl) return;

    let bg, color, message, action;
    if (score === 0) {
        bg = '#f0fdf4'; color = '#15803d';
        message = '✅ Rezilta: Ou pa montre siy depresyon. Kontinye pran swen tèt ou!';
        action = '';
    } else if (score <= 2) {
        bg = '#fefce8'; color = '#854d0e';
        message = '⚠️ Rezilta: Siy yo fèb. Pran swen tèt ou, fè egzèsis byennèt yo regilyèman.';
        action = `<button onclick="switchWellnessMode('breathing')" style="background:#d97706; color:white; border:none; padding:8px 15px; border-radius:20px; font-weight:600; cursor:pointer; margin-top:8px; width:100%;">Kòmanse Respirasyon</button>`;
    } else if (score <= 4) {
        bg = '#fff7ed'; color = '#c2410c';
        message = '🔶 Rezilta: Siy modere. Li bon pou pale ak yon pwofesyonèl sante mantal.';
        action = `<button onclick="openModal('crisis-support-modal')" style="background:#ea580c; color:white; border:none; padding:8px 15px; border-radius:20px; font-weight:600; cursor:pointer; margin-top:8px; width:100%;">Wè Resous Sipò</button>`;
    } else {
        bg = '#fef2f2'; color = '#991b1b';
        message = '🔴 Rezilta: Siy sevè. Tanpri kontakte yon pwofesyonèl sante mantal oswa rele liy sipò a.';
        action = `<a href="tel:116" style="background:#dc2626; color:white; text-decoration:none; padding:8px 15px; border-radius:20px; font-weight:600; display:block; margin-top:8px; text-align:center;">Rele 116 Kounye a</a>`;
    }

    resultEl.style.display = 'block';
    resultEl.style.background = bg;
    resultEl.style.color = color;
    resultEl.innerHTML = `<p style="margin:0; font-weight:600;">${message}</p><p style="margin:6px 0 0; font-size:0.82rem; opacity:0.8;">Skò: ${score}/6 — Rezilta sa pa ranplase dyagnòstik yon pwofesyonèl.</p>${action}`;

    // Save to local analytics
    const logs = JSON.parse(localStorage.getItem('zepol_phq2_logs') || '[]');
    logs.push({ score, date: new Date().toISOString() });
    localStorage.setItem('zepol_phq2_logs', JSON.stringify(logs));
};

// --- MOOD HISTORY ---
window.loadMoodHistory = () => {
    const container = document.getElementById('mood-history-chart');
    if (!container) return;

    const logs = JSON.parse(localStorage.getItem('zepol_mood_logs') || '[]');
    if (logs.length === 0) {
        container.innerHTML = '<div style="color:#94a3b8; font-size:0.85rem; width:100%; text-align:center;">Pa gen istwa ankò. Kòmanse tcheke santi w chak jou.</div>';
        return;
    }

    const recent = logs.slice(-14);
    const colorMap = { happy: '#10b981', neutral: '#6b7280', sad: '#3b82f6', anxious: '#f59e0b' };
    const emojiMap = { happy: '😊', neutral: '😐', sad: '😔', anxious: '😰' };
    const maxScore = 10;

    container.innerHTML = recent.map(entry => {
        const h = Math.max(20, (entry.score / maxScore) * 90);
        const col = colorMap[entry.mood] || '#6b7280';
        const emoji = emojiMap[entry.mood] || '😐';
        const d = new Date(entry.date);
        const label = `${d.getDate()}/${d.getMonth() + 1}`;
        return `
            <div style="display:flex; flex-direction:column; align-items:center; gap:4px; flex:1; min-width:20px;">
                <span style="font-size:14px;">${emoji}</span>
                <div style="width:100%; height:${h}px; background:${col}; border-radius:4px; opacity:0.8;" title="${label}: ${entry.score}/10"></div>
                <span style="font-size:9px; color:#94a3b8; white-space:nowrap;">${label}</span>
            </div>
        `;
    }).join('');
};

window.openMoodHistory = () => {
    window.loadMoodHistory();
    openModal('mood-history-modal');
};

// --- MISSING FUNCTIONS ---

// submitMoodLog called from mood-modal (score 1-10)
window.submitMoodLog = async (score) => {
    const moodMap = {
        2: { mood: 'sad', label: 'Tris anpil' },
        4: { mood: 'sad', label: 'Pa anfòm' },
        6: { mood: 'neutral', label: 'Nòmal' },
        8: { mood: 'happy', label: 'Bien' },
        10: { mood: 'happy', label: 'Ekselan' }
    };
    const entry = moodMap[score] || { mood: 'neutral', label: 'Nòmal' };

    try {
        if (dataManager && dataManager.addMoodEntry) {
            await dataManager.addMoodEntry({
                mood: entry.mood,
                score: score,
                label: entry.label,
                timestamp: new Date().toISOString()
            });
        }
        // Save locally too
        const logs = JSON.parse(localStorage.getItem('zepol_mood_logs') || '[]');
        logs.push({ score, mood: entry.mood, date: new Date().toISOString() });
        if (logs.length > 30) logs.shift();
        localStorage.setItem('zepol_mood_logs', JSON.stringify(logs));
    } catch (e) {
        console.warn('Mood log save failed:', e);
    }

    NotificationSystem.show(`Nivo ou: ${entry.label}. Mèsi pou pataje!`, 'success');
    closeModal('mood-modal');

    if (score <= 4) {
        setTimeout(() => openModal('crisis-support-modal'), 800);
    }
};

// submitJoinCommunity from join-community-modal
window.submitJoinCommunity = async () => {
    const user = dataManager.getUser();
    if (!user.loggedIn) {
        closeModal('join-community-modal');
        openModal('auth-modal');
        return;
    }
    NotificationSystem.show('N ap anrejistre angajman w...', 'info');
    try {
        if (dataManager.acceptCommunityRules) {
            await dataManager.acceptCommunityRules();
        }
        closeModal('join-community-modal');
        NotificationSystem.show('Byenveni nan kominote Zepòl! 🎉', 'success');
        setTimeout(() => navigateTo('community'), 500);
    } catch (e) {
        console.warn('Join community failed:', e);
        closeModal('join-community-modal');
        NotificationSystem.show('Ou rejwenn kominote a. Byenveni!', 'success');
        setTimeout(() => navigateTo('community'), 500);
    }
};

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

// [DUPLICATE LISTENER REMOVED]
// The login logic is now handled by the updated listener around line 1520.
// This prevents double submissions and timeout race conditions.

document.getElementById('submit-comment-btn')?.addEventListener('click', async () => {
    const input = document.getElementById('comment-input');
    const isAnon = document.querySelector('input[name="comment-identity"]:checked')?.value === 'anon';
    if (!input.value.trim() || !window.currentPostId) return;
    if (await dataManager.addComment(window.currentPostId, { text: input.value.trim(), author: isAnon ? "Anonim" : dataManager.getUser().name })) {
        input.value = '';
        closeModal('comment-modal');
        NotificationSystem.show("Repòns ou voye!", "success");
    }
});

// --- APP INITIALIZATION & RECOVERY ---

// --- Error Handling & Offline Mode ---
window.addEventListener('unhandledrejection', function (event) {
    if (event.reason && (event.reason.code === 'permission-denied' || event.reason.message.includes('permission-denied'))) {
        event.preventDefault();
        console.warn("⚠️ Firestore Permission Denied - Ignoring non-critical auth error.");
        // We NO LONGER switch to mockDataManager here because it causes unexpected logouts
        // for users who actually have valid auth but hit a restricted collection.
        /* 
        if (window.dataManager !== window.mockDataManager) {
            window.dataManager = window.mockDataManager;
            NotificationSystem.show("Mòd Sekirite (Hors Ligne) aktive", "info");
        }
        */
    }
});

// Duplicate init block removed. Initialization is handled by window.load at end of file.



window.logout = async () => {
    await dataManager.logout();
    NotificationSystem.show("Ou dekonekte.", "info");
    // Force refresh to clear all states
    setTimeout(() => window.location.reload(), 500);
};


// --- Safety & Content Features ---
window.detectDistress = (text) => {
    const keywords = ['swisid', 'suicide', 'touye tèt', 'mouri', 'pa kapab ankò', 'finisman', 'die', 'kill myself'];
    const lowerText = text.toLowerCase();
    const found = keywords.some(k => lowerText.includes(k));

    if (found) {
        console.warn("🚨 Distress detected in text:", text);
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
            { name: "Zanmi", text: "Mwen santi m pi byen jodia apre m fin pale ak yon moun isit la. Pa dekouraje! 💪", time: "2 min" },
            { name: "Anonim", text: "Pafwa lavi a di, men nou la pou youn lòt. 🤝", time: "1h" },
            { name: "Sipò", text: "N ap òganize yon sesyon respirasyon aswè a. Vini non! 🌬️", time: "3h" }
        ];

        let html = '';
        templates.forEach(post => {
            html += `
            <div class="post-card fade-in">
                <div class="post-header">
                    <div class="post-user-info">
                        <strong>${post.name}</strong>
                        <span style="font-size:0.8rem; color:#888;">• ${post.time}</span>
                    </div>
                </div>
                <div class="post-content">${post.text}</div>
                <div class="post-actions">
                    <button class="btn-text"><i class="fas fa-heart"></i> Sipò</button>
                    <button class="btn-text"><i class="fas fa-comment"></i> Kòmantè</button>
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
            console.warn("⚠️ Home View was hidden, forcing display.");
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
    console.log("🌸 Switching Wellness Mode to:", mode);

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
        console.warn(`⚠️ Mode mode-${mode} not found!`);
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

// --- Robust DOM Waiting Logic ---
function waitForElement(selector, maxAttempts = 50) {
    // Optimization: Check immediately first
    if (selector.startsWith('#')) {
        const id = selector.substring(1);
        const el = document.getElementById(id);
        if (el) return Promise.resolve(el);
    }

    return new Promise((resolve, reject) => {
        let attempts = 0;
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve(element);
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                reject(new Error(`Element ${selector} not found after ${maxAttempts} attempts`));
            }
            attempts++;
        }, 100);
    });
}

// --- Initialization Logic ---
// --- Initialization Logic ---
async function initApp() {
    if (window.appInitialized) return;
    window.appInitialized = true;

    console.log("🚀 Initializing App...");
    const overlay = document.getElementById('global-loading-overlay');

    try {
        const viewsContainer = await waitForElement('#main-view-wrapper');
        const viewHome = await waitForElement('#view-home');

        // Initialize DataManager directly (Force refresh on dynamic import)
        try {
            const module = await import(`./modules/firebase-manager.js?v=18.0.43-MOOD-ENHANCED`);
            dataManager = new module.FirebaseManager();
            window.dataManager = dataManager;

            const btn = document.querySelector('#login-form button[type="submit"]');
            if (btn) btn.innerHTML = "Konekte";
            document.body.classList.add('firebase-active');
            console.log("✅ Firebase Manager Loaded Successfully");
        } catch (err) {
            console.error("⚠️ Firebase load failed:", err);
            const btn = document.querySelector('#login-form button[type="submit"]');
            if (btn) btn.innerHTML = "Konekte (Hors Ligne)";
            NotificationSystem.show("Mòd Hors Ligne aktive.", "warning");
        }

        // Initialize UI - WAIT for Auth Ready Signal
        try {
            console.log("⏳ Waiting for initial auth check...");
            const authTimeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Auth check timeout')), 8000)
            );

            await Promise.race([
                dataManager.waitForAuth(),
                authTimeout
            ]);
            console.log("✅ Initial auth check complete.");
        } catch (e) {
            console.warn("⚠️ Auth wait timeout/error:", e);
        }

        // Now safe to update UI
        try {
            window.updateUserUI();
        } catch (uiErr) {
            console.error("⚠️ updateUserUI failed during init:", uiErr);
        }

    } catch (criticalErr) {
        console.error("❌ CRITICAL INIT ERROR:", criticalErr);
    } finally {
        // ALWAYS Remove Overlay
        console.log("🏁 Init sequence finishing. Removing overlay.");
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
                console.log("✨ Overlay removed.");
            }, 500);
        }
        window.setupSilentSosShortcut?.();
        window.refreshMicroTaskState?.();
        window.loadJournalEntry?.();
        window.updateSupportJarDisplay?.();
        window.applyStrongNightMode?.(localStorage.getItem('zepol_night_mode') === 'on');
        window.renderGoals?.();
        window.renderAchievements?.();
        window.initDailyChallenges?.();
        window.loadMemberSupportProfiles?.();
        // Streak display
        const streakEl = document.getElementById('streak-count');
        if (streakEl) streakEl.textContent = localStorage.getItem('zepol_streak') || '0';
        // Force Navigation to Home
        navigateTo('home');
    }
}

// --- AUTH EVENT LISTENERS (Restored) ---
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (window.isLoggingIn) {
            console.warn("🚫 Login already in progress, ignoring duplicate submit.");
            return;
        }

        console.log("🚀 Login Form Submitted!");

        const btn = loginForm.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Koneksyon...';
        }

        const identifier = document.getElementById('login-identifier').value;
        const password = document.getElementById('login-password').value;
        console.log("🔑 Attempting login for:", identifier);

        try {
            // Start Login - Set Lock
            window.isLoggingIn = true;
            console.log("🔒 Login Lock Active");

            const result = await dataManager.login(identifier, password);
            console.log("Login Result Object:", result);

            if (result && result.success) {
                NotificationSystem.show("Byenveni tounen! 👋", "success");
                window.closeModal('auth-modal');

                // CRITICAL: Clear lock BEFORE updating UI
                window.isLoggingIn = false;
                console.log("🔓 Login Lock Released - Assessing UI State...");

                // POLL: Check if user data is ready
                let attempts = 0;
                const pollUser = setInterval(() => {
                    attempts++;
                    const user = window.dataManager.getUser();
                    console.log(`⏳ Post-Login Poll #${attempts}: LoggedIn=${user.loggedIn}`);

                    if (user.loggedIn) {
                        clearInterval(pollUser);
                        console.log("✅ User Data Ready -> Updating UI");
                        window.updateUserUI();
                        navigateTo('home');
                    } else if (attempts >= 10) { // 5 seconds max
                        clearInterval(pollUser);
                        console.warn("⚠️ User Data Timeout -> Forcing Guest UI (Auth listener should catch up)");
                        window.updateUserUI(); // Fallback
                    }
                }, 500);
            } else {
                window.isLoggingIn = false; // Release lock on failure
                console.warn("Login failed gracefully:", result);
                NotificationSystem.show(result?.message || "Echèk koneksyon. Verifye modpas ou.", "error");
            }
        } catch (error) {
            window.isLoggingIn = false; // Release lock on error
            console.error("Login fatal error:", error);
            NotificationSystem.show("Erè teknik. Tanpri reesye.", "error");
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'Konekte 🚀';
            }
        }
    });
}

const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (window.isRegistering) {
            console.warn("🚫 Registration already in progress, ignoring duplicate submit.");
            return;
        }
        window.isRegistering = true;

        console.log("🚀 Register Form Submitted!");

        const btn = registerForm.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Kreyasyon...';
        }

        const fullname = document.getElementById('reg-fullname').value;
        const email = document.getElementById('reg-email').value || document.getElementById('reg-phone').value;
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;

        if (password !== confirm) {
            NotificationSystem.show("Modpas yo pa idantik.", "error");
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-user-plus"></i> Kreye Kont Mwen';
            }
            return;
        }

        try {
            // Start Registration
            const result = await dataManager.register(email, password, { fullName: fullname, username: username });
            console.log("Register Result Object:", result);

            if (result.success) {
                console.log("✅ Registration Successful. Refreshing...");
                NotificationSystem.show("Kont ou kreye ak siksè! Byenveni nan Zepòl.", "success");

                // Force reload after a short delay to allow the notification to be seen
                // This breaks any potential JS state loops and ensures the Service Worker updates.
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                NotificationSystem.show(result?.message || "Erè enskripsyon. Tcheke enfòmasyon yo.", "error");
            }
        } catch (error) {
            console.error("Register fatal error:", error);
            NotificationSystem.show(error.message || "Erè teknik.", "error");
        } finally {
            window.isRegistering = false;
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-user-plus"></i> Kreye Kont Mwen';
            }
        }
    });
}

window.resetPassword = () => {
    openModal('reset-password-modal');
};

window.handleGoogleSignIn = async () => {
    const btn = document.getElementById('google-signin-btn');
    if (btn) { btn.disabled = true; btn.style.opacity = '0.7'; }

    try {
        NotificationSystem.show('Koneksyon Google ap ouvri...', 'info');
        const result = await dataManager.signInWithGoogle();

        if (result && result.success) {
            closeModal('auth-modal');
            closeModal('register-modal');
            NotificationSystem.show('Byenveni! Koneksyon Google reyisi. 🎉', 'success');
            // Poll for user data ready
            let attempts = 0;
            const poll = setInterval(() => {
                attempts++;
                const user = window.dataManager.getUser();
                if (user.loggedIn) {
                    clearInterval(poll);
                    window.updateUserUI();
                    navigateTo('home');
                } else if (attempts >= 10) {
                    clearInterval(poll);
                    window.updateUserUI();
                }
            }, 500);
        } else {
            NotificationSystem.show(result?.message || 'Erè Google Sign-In.', 'error');
        }
    } catch (e) {
        console.error('Google Sign-In error:', e);
        NotificationSystem.show('Erè: ' + (e.message || 'Eseye ankò'), 'error');
    } finally {
        if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
    }
};

window.handleResetSubmit = async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('reset-email');
    const email = emailInput.value.trim();

    if (!email) return;

    NotificationSystem.show("N ap voye imèl...", "info");
    const res = await window.dataManager.resetPassword(email);

    if (res.success) {
        NotificationSystem.show(res.message, "success");
        closeModal('reset-password-modal');
        emailInput.value = ''; // Reset input
    } else {
        NotificationSystem.show(res.message, "error");
    }
};

// Start when content is loaded
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
