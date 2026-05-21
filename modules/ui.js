console.log("🎨 UI.js Loaded V3.5.9-Debug");
// --- Système de Notifications ---
export class NotificationSystem {
    static init() {
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'notification-container';
            if (document.body) {
                document.body.appendChild(container);
            } else {
                console.error("❌ Document body not ready for NotificationSystem");
                return null;
            }
        }
        return container;
    }

    static show(message, type = 'info', duration = 5000) {
        const container = this.init();
        if (!container) {
            console.warn("⚠️ Notification skipped (No UI container):", message);
            return;
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const iconMap = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };

        notification.innerHTML = `
            <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentNode.remove()">&times;</button>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                notification.style.transition = 'all 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }
}

// --- UI Rendering Helpers ---
export function renderChat(msgs) {
    const feed = document.getElementById('sg-chat-feed');
    if (!feed) return;
    feed.innerHTML = '';
    msgs.forEach(m => {
        const div = document.createElement('div');
        div.className = 'sg-message';
        div.innerHTML = `<span class="chat-author">${m.author}</span>: <p>${m.text}</p>`;
        feed.appendChild(div);
    });
    feed.scrollTop = feed.scrollHeight;
}

export function renderStories(stories) {
    const container = document.getElementById('stories-grid');
    if (!container) return;
    container.innerHTML = '';

    if (!stories || stories.length === 0) {
        stories = [
            { title: "Mwen jwenn limyè", content: "Apre 3 mwa nan fènwa, mwen kòmanse wè espwa gras ak gwoup sipò a.", author: "Marie J." },
            { title: "Respire...", content: "Teknik 4-7-8 la vrèman ede m jere panik mwen.", author: "Jean P." },
            { title: "Pa janm abandone", content: "Chak ti pa konte. Jodi a mwen soti kabann mwen, e se yon viktwa.", author: "Alex" }
        ];
    }

    stories.forEach(s => {
        const div = document.createElement('div');
        div.className = 'card story-card glass-card';
        div.innerHTML = `<h4>${s.title}</h4><p>"${s.content}"</p><span class="story-author">- ${s.author}</span>`;
        container.appendChild(div);
    });
}

export function renderPosts(posts, containerId = 'posts-feed') {
    // console.log(`🖼️ Rendering ${posts ? posts.length : 0} posts into #${containerId}`);
    let container = document.getElementById(containerId);
    const strugglesFeed = document.getElementById('struggles-feed');
    const victoriesFeed = document.getElementById('victories-feed');

    if (!container && !strugglesFeed && !victoriesFeed) {
        console.warn(`⚠️ No post containers found. skipping render.`);
        return;
    }

    // Merge community and public posts for global lookup if needed, or just set current
    window.currentPosts = posts;

    // Clear containers
    if (container) container.innerHTML = '';
    if (strugglesFeed) strugglesFeed.innerHTML = '';
    if (victoriesFeed) victoriesFeed.innerHTML = '';

    if (!posts || posts.length === 0) {
        const fallbacks = [
            { id: 'f1', author: "Sipò Zepòl", content: "Byenveni! Se premye fwa w? Pa ezite pataje sa k nan kè w jodi a.", date: new Date().toISOString(), likes: 5, mood: 'neutral', comments: [{ author: "Yon Zanmi", text: "Mèsi pou mesaj sa! 🙏" }] },
            { id: 'f2', author: "Kominote Zepòl", content: "Sonje ke ou pa pou kont ou. Nou la pou nou sipòte youn lòt! ✨", date: new Date().toISOString(), likes: 12, mood: 'victory', comments: [{ author: "Fanmi Zepòl", text: "Vrèman sa fè m kontan wè nou ansanm." }, { author: "Lòt Moun", text: "Wi, nou fò!" }] },
            { id: 'f3', author: "Yon Zanmi", content: "Mwen te santi m tris yè, men jodi a m ap eseye jwenn yon ti limyè. Kenbe fèm!", date: new Date().toISOString(), likes: 8, mood: 'struggle', comments: [] },
            { id: 'f4', author: "Zepòl 3.0", content: "Pran yon gwo respirasyon... Tout bagay ap anfòm. 🌿", date: new Date().toISOString(), likes: 15, mood: 'calm', comments: [{ author: "Zepòl", text: "Se verite!" }] }
        ];
        posts = fallbacks;
    }

    posts.forEach(post => {
        // console.log(`📝 Rendering post ID: ${post.id}`);
        const div = document.createElement('div');
        div.className = 'post-card';
        if (post.likes > 10) div.classList.add('highlight');

        const content = post.content || post.text || "(Pa gen kontni)";
        const author = post.author || "Anonyme";

        const comments = post.comments || [];
        const previewComments = comments.slice(-2); // Show last 2
        const moreCommentsCount = comments.length - previewComments.length;

        let commentsHtml = '';
        if (previewComments.length > 0) {
            commentsHtml = `
                <div class="post-comments-section" style="margin-top: 15px; padding: 15px; background: #f8fafc; border-radius: 12px;">
                    <div class="comments-list" style="display: flex; flex-direction: column; gap: 10px;">
                        ${previewComments.map((c, idx) => `
                            <div class="comment-bubble" style="display: flex; gap: 10px; align-items: start;">
                                <div class="comment-avatar" style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; flex-shrink: 0;">
                                    ${(c.author || 'A')[0].toUpperCase()}
                                </div>
                                <div class="comment-content" style="flex: 1; background: white; padding: 10px 12px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                                    <div class="comment-author" style="font-weight: 600; color: var(--primary-dark); font-size: 13px; margin-bottom: 4px;">
                                        ${c.author || 'Anonim'}
                                    </div>
                                    <div class="comment-text" style="color: #4a5568; font-size: 14px; line-height: 1.5;">
                                        ${c.text}
                                    </div>
                                    <div class="comment-actions" style="margin-top: 6px; display: flex; gap: 12px; align-items: center;">
                                        <button class="comment-like-btn" onclick="window.likeComment('${post.id}', ${idx})" style="background: none; border: none; color: #94a3b8; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 0;">
                                            <i class="far fa-heart"></i> <span>${c.likes || 0}</span>
                                        </button>
                                        <span style="color: #cbd5e0; font-size: 11px;">${c.timestamp ? new Date(c.timestamp).toLocaleTimeString('ht-HT', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ${moreCommentsCount > 0 ? `
                        <button class="view-all-comments-btn" onclick="window.handleComment('${post.id}')" style="margin-top: 10px; background: none; border: none; color: var(--primary); font-weight: 600; font-size: 13px; cursor: pointer; padding: 5px 0; width: 100%; text-align: left;">
                            Gade tout ${comments.length} kòmantè yo...
                        </button>
                    ` : ''}
                    <div class="comment-input-group" style="margin-top: 12px; display: flex; gap: 8px; align-items: center;">
                        <input type="text" id="comment-input-${post.id}" placeholder="Ekri yon repons..." style="flex: 1; padding: 10px 15px; border: 1px solid #e2e8f0; border-radius: 20px; font-size: 14px; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e2e8f0'">
                        <button onclick="window.submitComment('${post.id}')" style="background: var(--primary); color: white; border: none; padding: 10px 18px; border-radius: 20px; cursor: pointer; font-weight: 600; font-size: 13px; transition: all 0.2s;">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            `;
        } else {
            // No comments yet - show input only
            commentsHtml = `
                <div class="comment-input-group" style="margin-top: 12px; display: flex; gap: 8px; align-items: center; padding: 10px; background: #f8fafc; border-radius: 12px;">
                    <input type="text" id="comment-input-${post.id}" placeholder="Premye kòmantè a se pou ou..." style="flex: 1; padding: 10px 15px; border: 1px solid #e2e8f0; border-radius: 20px; font-size: 14px; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e2e8f0'">
                    <button onclick="window.submitComment('${post.id}')" style="background: var(--primary); color: white; border: none; padding: 10px 18px; border-radius: 20px; cursor: pointer; font-weight: 600; font-size: 13px; transition: all 0.2s;">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            `;
        }


        let displayDate = '...';
        try {
            displayDate = post.date ? new Date(post.date).toLocaleDateString('ht-HT') : 'Kounye a';
        } catch (e) {
            console.warn("Invalid date for post:", post.id);
        }
        
        const authorHandle = (author || 'Anonim').replace(/\s+/g, '').toLowerCase();
        const postAuthorId = post.creatorUid || post.authorId || 'guest';
        const canSendPrivateMessage = postAuthorId !== 'guest' && postAuthorId !== (window.currentUserId || 'guest');

        div.className = 'tweet-card float-animation';
        if (post.likes > 10) div.classList.add('highlight');

        div.innerHTML = `
            <div class="tweet-layout" style="display: flex; gap: 12px; padding: 15px;">
                <div class="tweet-avatar" style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    ${(author || 'A')[0].toUpperCase()}
                </div>
                <div class="tweet-content-area" style="flex: 1; min-width: 0;">
                    <div class="tweet-header" style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 4px;">
                        <span class="tweet-author" style="font-weight: 700; color: var(--text-dark); font-size: 15px;">${author}</span>
                        <span class="tweet-handle" style="color: var(--text-muted); font-size: 14px;">@${authorHandle}</span>
                        ${canSendPrivateMessage ? `<span style="background: #eef2ff; color: #4338ca; font-size: 12px; padding: 2px 8px; border-radius: 999px;">Mesaj prive</span>` : ''}
                        <span class="tweet-dot" style="color: var(--text-muted);">&middot;</span>
                        <span class="tweet-date" style="color: var(--text-muted); font-size: 14px;">${displayDate}</span>
                    </div>
                    
                    ${post.title ? `<div style="font-weight: 700; color: var(--text-dark); font-size: 16px; margin-bottom: 10px;">${post.title}</div>` : ''}
                    <div class="tweet-text" style="color: var(--text-main); font-size: 15px; line-height: 1.5; margin-bottom: 12px; word-wrap: break-word;">
                        ${content}
                    </div>
                    
                    <div class="tweet-actions" style="display: flex; justify-content: space-between; max-width: 400px; margin-top: 10px; color: #536471;">
                        <button class="tweet-btn" onclick="window.handleComment('${post.id}')" style="background:none; border:none; color:inherit; cursor:pointer; display:flex; align-items:center; gap:8px; font-size:14px; transition: color 0.2s;">
                            <i class="far fa-comment" style="transition: transform 0.2s;"></i> <span>${comments.length || ''}</span>
                        </button>
                        <button class="tweet-btn" onclick="window.openRealityCheck('${post.id}')" style="background:none; border:none; color:inherit; cursor:pointer; display:flex; align-items:center; gap:8px; font-size:14px; transition: color 0.2s;">
                            <i class="fas fa-brain" style="transition: transform 0.2s;"></i> Èske se vre?
                        </button>
                        <button class="tweet-btn" onclick="window.handleShare('${post.id}')" style="background:none; border:none; color:inherit; cursor:pointer; display:flex; align-items:center; gap:8px; font-size:14px; transition: color 0.2s;">
                            <i class="fas fa-retweet" style="transition: transform 0.2s;"></i>
                        </button>
                        <button class="tweet-btn" onclick="window.handleLike('${post.id}')" style="background:none; border:none; color:inherit; cursor:pointer; display:flex; align-items:center; gap:8px; font-size:14px; transition: color 0.2s;">
                            <i class="far fa-heart" style="transition: transform 0.2s;"></i> <span style="color: ${post.likes > 0 ? '#f91880' : 'inherit'}">${post.likes || ''}</span>
                        </button>
                        ${postAuthorId !== 'guest' && postAuthorId !== (window.currentUserId || 'guest') ? `
                        <button class="tweet-btn" onclick="window.openMessageTo('${postAuthorId}', '${author}')" style="background:none; border:none; color:inherit; cursor:pointer; display:flex; align-items:center; gap:8px; font-size:14px; transition: color 0.2s;">
                            <i class="far fa-envelope"></i>
                        </button>` : ''}
                    </div>
                    
                    <div style="margin-top: 15px;">
                        ${commentsHtml}
                    </div>
                </div>
            </div>
        `;

        // Routing Logic
        if (container) container.appendChild(div.cloneNode(true));

        if (victoriesFeed && strugglesFeed) {
            const isVictory = post.mood === 'victory' || content.toLowerCase().includes('viktwa') || content.toLowerCase().includes('siksè');
            if (isVictory) victoriesFeed.appendChild(div);
            else strugglesFeed.appendChild(div);
        } else if (containerId === 'posts-feed' && !container) {
            // Fail-safe if containerId was posts-feed but it's missing (happens on community tab)
            // It will be handled by the logic above
        }
    });
}

// Redundant updateUserUI removed. Using implementation in main.js.

// --- Modals ---
export { openModal, closeModal } from './ui-core.js';

export function createChatWindow() {
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chat-window';
    chatWindow.className = 'chat-window glass-panel hidden';
    chatWindow.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 350px; max-height: 500px; display: flex; flex-direction: column; z-index: 99999;';
    chatWindow.innerHTML = `
        <div class="chat-header">
            <div style="display:flex; align-items:center; gap:10px;">
                <div class="chat-avatar-icon">
                    <img src="./assets/zepol_ai.png" alt="Zepòl AI" style="width: 30px; height: 30px; border-radius: 50%;">
                </div>
                <div>
                    <h4 style="margin:0; font-size:16px;">Zepòl AI</h4>
                    <span style="font-size:11px; opacity:0.8;">Mwen la pou ou</span>
                </div>
            </div>
            <span class="close-chat" onclick="window.toggleChat()">&times;</span>
        </div>
        <div class="chat-messages" id="chat-messages">
            <div class="msg bot">
                Bonjou! Mwen se Zepòl. Mwen ka wè, mwen ka tande, epi mwen la pou koute w.<br>
                <button onclick="window.startGuestQuiz()" style="margin-top:5px; background:var(--primary); color:white; border:none; padding:6px 12px; border-radius:15px; cursor:pointer; font-size:13px;">
                    Kijan w santi w?
                </button>
            </div>
        </div>
        <div id="chat-preview-area" class="hidden" style="padding: 10px; border-top: 1px solid #eee; display: flex; align-items: center; gap: 10px;">
            <img id="chat-image-preview" src="" style="max-height: 50px; border-radius: 5px;">
            <button onclick="window.clearChatImage()" style="background:none; border:none; color:red;"><i class="fas fa-times"></i></button>
        </div>
        <div class="chat-input-area">
            <button class="chat-action-btn" onclick="window.triggerPhotoUpload()" title="Voye Foto"><i class="fas fa-image"></i></button>
            <button class="chat-action-btn" onclick="window.triggerFaceScan()" title="Analize Emosyon"><i class="fas fa-camera"></i></button>
            <input type="file" id="chat-file-input" accept="image/*" class="hidden" onchange="window.handleChatImageSelect(this)">
            
            <input type="text" id="bot-input" placeholder="Ekri (oswa pale)...">
            
            <button class="chat-action-btn" id="voice-btn" onclick="window.toggleVoiceInput()" title="Pale"><i class="fas fa-microphone"></i></button>
            <button class="chat-send-btn" onclick="window.sendUserMessage()"><i class="fas fa-paper-plane"></i></button>
        </div>`;
    document.body.appendChild(chatWindow);
    document.getElementById('bot-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') window.sendUserMessage(); });
    return chatWindow;
}

export function renderHelpGallery() {
    const container = document.getElementById('help-gallery');
    if (!container) return;
    const helpItems = [
        { title: "Kijan pou m pataje?", icon: "pen-fancy", desc: "Klike sou 'Pataje' epi ekri sa k nan kè w." },
        { title: "Kijan pou m jwenn èd?", icon: "hand-holding-heart", desc: "Sèvi ak bouton 'SOS' la pou w jwenn sipò imedyat." },
        { title: "Ki sekirite m genyen?", icon: "shield-alt", desc: "Done ou yo an sekirite epi w ka anonim." }
    ];
    container.innerHTML = helpItems.map(item => `
        <div class="card help-card glass-card">
            <i class="fas fa-${item.icon}"></i>
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
        </div>
    `).join('');
}

export function updateWelcomeMessage() {
    const greetingEl = document.getElementById('dynamic-greeting');
    const quoteEl = document.getElementById('dynamic-quote');

    if (!greetingEl || !quoteEl) return;

    // Time Logic
    const hour = new Date().getHours();
    const isMorning = hour < 12;
    const isAfternoon = hour >= 12 && hour < 18;
    greetingEl.textContent = isMorning ? "Bonjou" : (isAfternoon ? "Bon apremidi" : "Bonswa");

    // Quote Logic
    const quotes = [
        "Chak jou se yon nouvo chans. Respire... Tout bagay ap anfòm.",
        "Ou pi fò pase sa ou panse. Kenbe fèm.",
        "Pa bliye pran swen tèt ou jodi a.",
        "Ti pa pa ti pa, w ap rive.",
        "Solèy la ap leve demen tou. Gen espwa.",
        "Ou pa pou kont ou nan batay sa a.",
        "Kè kontan se yon desizyon tou. Chwazi l.",
        "Kèlkeswa jan nwit la long, jou a ap vini."
    ];

    // Simple random pick based on time to avoid rapid changes, OR purely random on refresh
    // User asked "pas le meme message chaque refresh", so pure random.
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = `"${randomQuote}"`;
}
