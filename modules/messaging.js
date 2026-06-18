// modules/messaging.js — Full-featured, mobile-responsive chat

let activeChatId   = null;
let filteredFriends = [];
let realChats      = {};
let realFriendsMap = {};
let inboxUnsubscribe = null;
let localSentMessages = {};

// ─── RENDER ROOT ─────────────────────────────────────────────────────────────
export function renderMessagingUI() {
    const container = document.getElementById('view-messages');
    if (!container) return;

    container.innerHTML = `
    <div class="msg-root">

        <!-- ── SIDEBAR : liste conversations ─────────────────── -->
        <div class="msg-sidebar-panel" id="msg-sidebar-panel">
            <div class="msg-sidebar-header">
                <span class="msg-sidebar-title">💬 Mesaj</span>
                <button class="msg-new-btn" onclick="window.openNewChatModal()" title="Nouvo mesaj">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
            <div class="msg-search-wrap">
                <i class="fas fa-search msg-search-icon"></i>
                <input id="msg-search-box" class="msg-search-input" type="text"
                    placeholder="Chèche..." oninput="window.searchMessages(this.value)">
            </div>
            <div id="friends-list" class="msg-friends-list">
                <div class="msg-empty-state">
                    <i class="fas fa-spinner fa-spin"></i><br>Ap chaje...
                </div>
            </div>
        </div>

        <!-- ── CHAT AREA ──────────────────────────────────────── -->
        <div class="msg-chat-panel" id="msg-chat-panel">
            <!-- Header -->
            <div class="msg-chat-header" id="msg-chat-header">
                <button class="msg-back-btn" onclick="window.closeChat()" id="msg-back-btn">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <div class="msg-chat-avatar" id="msg-chat-avatar">?</div>
                <div class="msg-chat-meta">
                    <div class="msg-chat-name" id="msg-chat-name">Chwazi yon konvèsasyon</div>
                    <div class="msg-chat-status" id="msg-chat-status">Zanmi Zepòl</div>
                </div>
                <div class="msg-chat-actions">
                    <button class="msg-action-btn" onclick="window.deleteChatActive()" title="Efase">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>

            <!-- Messages -->
            <div id="active-chat-messages" class="msg-messages-area">
                <div class="msg-empty-chat">
                    <div class="msg-empty-icon">💬</div>
                    <p>Chwazi yon konvèsasyon<br>oswa kòmanse yon nouvo</p>
                    <button class="msg-start-btn" onclick="window.openNewChatModal()">
                        <i class="fas fa-plus"></i> Kòmanse pale
                    </button>
                </div>
            </div>

            <!-- Input -->
            <div class="msg-input-bar" id="msg-input-bar" style="display:none;">
                <input type="text" id="chat-dm-input" class="msg-text-input"
                    placeholder="Ekri mesaj ou a..."
                    onkeypress="if(event.key==='Enter') window.sendDM()">
                <button class="msg-send-btn" onclick="window.sendDM()">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>`;

    // Load inbox
    if (inboxUnsubscribe) inboxUnsubscribe();
    const dmUser = window.dataManager?.getUser?.() || window.dataManager?.currentUser;
    const isLoggedIn = dmUser?.loggedIn;

    if (window.dataManager && isLoggedIn) {
        inboxUnsubscribe = window.dataManager.listenToInbox(msgs => processInbox(msgs));
    } else {
        document.getElementById('friends-list').innerHTML = `
            <div class="msg-empty-state">
                <i class="fas fa-lock" style="font-size:2rem;color:#cbd5e0;margin-bottom:10px;"></i>
                <p>Konekte pou wè mesaj ou yo</p>
                <button class="msg-start-btn" onclick="openModal('auth-modal')">
                    <i class="fas fa-sign-in-alt"></i> Konekte
                </button>
            </div>`;
    }
}

// ─── PROCESS INBOX ────────────────────────────────────────────────────────────
function processInbox(msgs) {
    realChats = {};
    const dmUser = window.dataManager?.getUser?.() || window.dataManager?.currentUser;
    const myId = dmUser?.uid;

    msgs.forEach(m => {
        const isMe = m.senderId === myId;
        const fid  = isMe ? m.recipientId : m.senderId;

        if (!realFriendsMap[fid]) {
            realFriendsMap[fid] = {
                id: fid,
                name: isMe ? ('Itilizatè #' + fid.slice(0,4)) : (m.senderName || 'Zanmi'),
                avatar: (isMe ? 'U' : (m.senderName || 'Z').charAt(0)).toUpperCase(),
                lastMsg: m.text || '',
                date: new Date(m.date),
                unread: !isMe && !m.read,
            };
        } else {
            if (!isMe && m.senderName) {
                realFriendsMap[fid].name   = m.senderName;
                realFriendsMap[fid].avatar = m.senderName.charAt(0).toUpperCase();
            }
            const d = new Date(m.date);
            if (d >= realFriendsMap[fid].date) {
                realFriendsMap[fid].lastMsg = m.text || '';
                realFriendsMap[fid].date    = d;
            }
            if (!isMe && !m.read) realFriendsMap[fid].unread = true;
        }

        if (!realChats[fid]) realChats[fid] = [];
        realChats[fid].push({
            id: m.id,
            sender: isMe ? 'me' : fid,
            text: m.text || '',
            time: new Date(m.date).toLocaleTimeString('ht-HT', { hour:'2-digit', minute:'2-digit' }),
            date: new Date(m.date),
            read: !!m.read,
        });
    });

    for (const fid in realChats) {
        realChats[fid].sort((a, b) => a.date - b.date);
    }

    filteredFriends = Object.values(realFriendsMap).sort((a, b) => b.date - a.date);
    renderFriendsList();
    if (activeChatId) openChat(activeChatId);
    updateBadge();
}

// ─── FRIENDS LIST ─────────────────────────────────────────────────────────────
function renderFriendsList() {
    const list = document.getElementById('friends-list');
    if (!list) return;

    if (!filteredFriends.length) {
        list.innerHTML = `
            <div class="msg-empty-state">
                <div style="font-size:2.5rem;margin-bottom:10px;">📭</div>
                <p>Pa gen mesaj ankò</p>
                <button class="msg-start-btn" onclick="window.openNewChatModal()">
                    <i class="fas fa-plus"></i> Kòmanse yon konvèsasyon
                </button>
            </div>`;
        return;
    }

    list.innerHTML = filteredFriends.map(f => `
        <div class="msg-friend-item ${f.id === activeChatId ? 'active' : ''} ${f.unread ? 'unread' : ''}"
             onclick="window.switchChat('${f.id}')">
            <div class="msg-friend-avatar">${escapeHtml(f.avatar)}</div>
            <div class="msg-friend-info">
                <div class="msg-friend-name">${escapeHtml(f.name)}</div>
                <div class="msg-friend-preview">${escapeHtml(f.lastMsg.substring(0, 40))}${f.lastMsg.length>40?'...':''}</div>
            </div>
            <div class="msg-friend-meta">
                <div class="msg-friend-time">${f.date.toLocaleDateString('ht-HT',{day:'numeric',month:'short'})}</div>
                ${f.unread ? '<div class="msg-unread-dot"></div>' : ''}
            </div>
        </div>`).join('');
}

// ─── SEARCH ───────────────────────────────────────────────────────────────────
window.searchMessages = (q) => {
    q = q.trim().toLowerCase();
    filteredFriends = q
        ? Object.values(realFriendsMap).filter(f =>
            f.name.toLowerCase().includes(q) ||
            f.lastMsg.toLowerCase().includes(q))
            .sort((a,b) => b.date - a.date)
        : Object.values(realFriendsMap).sort((a,b) => b.date - a.date);
    renderFriendsList();
};

// ─── OPEN CHAT ────────────────────────────────────────────────────────────────
window.switchChat = (fid) => {
    activeChatId = fid;
    if (realFriendsMap[fid]) realFriendsMap[fid].unread = false;
    updateBadge();
    renderFriendsList();
    openChat(fid);
    // On mobile: hide sidebar, show chat
    const sidebar = document.getElementById('msg-sidebar-panel');
    const chatPanel = document.getElementById('msg-chat-panel');
    if (sidebar) sidebar.classList.add('mobile-hidden');
    if (chatPanel) chatPanel.classList.add('mobile-active');
};

function openChat(fid) {
    const f = realFriendsMap[fid];
    if (!f) return;

    // Update header
    const nameEl   = document.getElementById('msg-chat-name');
    const avatarEl = document.getElementById('msg-chat-avatar');
    const statusEl = document.getElementById('msg-chat-status');
    if (nameEl)   nameEl.textContent   = f.name;
    if (avatarEl) avatarEl.textContent = f.avatar;
    if (statusEl) statusEl.textContent = 'Zanmi Zepòl ·  ' + f.date.toLocaleDateString('ht-HT');

    // Show input bar
    const inputBar = document.getElementById('msg-input-bar');
    if (inputBar) inputBar.style.display = 'flex';

    // Build messages
    const msgs = [...(realChats[fid] || []), ...(localSentMessages[fid] || [])];
    msgs.sort((a, b) => a.date - b.date);

    // Deduplicate
    const seen = new Set();
    const unique = msgs.filter(m => {
        const k = m.text + m.time + m.sender;
        if (seen.has(k)) return false;
        seen.add(k); return true;
    });

    const box = document.getElementById('active-chat-messages');
    if (!box) return;

    if (!unique.length) {
        box.innerHTML = `
            <div class="msg-empty-chat">
                <div class="msg-empty-icon">👋</div>
                <p>Kòmanse pale ak <strong>${escapeHtml(f.name)}</strong></p>
            </div>`;
    } else {
        let html = '';
        let lastDate = null;
        unique.forEach(m => {
            const dStr = m.date.toLocaleDateString('ht-HT', {weekday:'short', day:'numeric', month:'short'});
            if (dStr !== lastDate) {
                html += `<div class="msg-date-divider"><span>${dStr}</span></div>`;
                lastDate = dStr;
            }
            const isMe = m.sender === 'me';
            html += `
                <div class="msg-row ${isMe ? 'sent' : 'received'}">
                    ${!isMe ? `<div class="msg-bubble-avatar">${escapeHtml(f.avatar)}</div>` : ''}
                    <div class="msg-bubble ${isMe ? 'sent' : 'received'}">
                        <div class="msg-bubble-text">${escapeHtml(m.text)}</div>
                        <div class="msg-bubble-time">${m.time} ${isMe ? (m.read ? '✓✓' : '✓') : ''}</div>
                    </div>
                </div>`;
        });
        box.innerHTML = html;
    }
    box.scrollTop = box.scrollHeight;
    document.getElementById('chat-dm-input')?.focus();
}

function escapeHtml(text) {
    return (text || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ─── CLOSE CHAT (mobile back button) ─────────────────────────────────────────
window.closeChat = () => {
    activeChatId = null;
    const sidebar   = document.getElementById('msg-sidebar-panel');
    const chatPanel = document.getElementById('msg-chat-panel');
    if (sidebar)   sidebar.classList.remove('mobile-hidden');
    if (chatPanel) chatPanel.classList.remove('mobile-active');
    document.getElementById('msg-input-bar').style.display = 'none';
    document.getElementById('active-chat-messages').innerHTML = `
        <div class="msg-empty-chat">
            <div class="msg-empty-icon">💬</div>
            <p>Chwazi yon konvèsasyon<br>oswa kòmanse yon nouvo</p>
            <button class="msg-start-btn" onclick="window.openNewChatModal()">
                <i class="fas fa-plus"></i> Kòmanse pale
            </button>
        </div>`;
    document.getElementById('msg-chat-name').textContent = 'Chwazi yon konvèsasyon';
    document.getElementById('msg-chat-avatar').textContent = '?';
    renderFriendsList();
};

// ─── SEND MESSAGE ─────────────────────────────────────────────────────────────
window.sendDM = async () => {
    const input = document.getElementById('chat-dm-input');
    const text  = input?.value.trim();
    if (!text || !activeChatId) return;

    const f   = realFriendsMap[activeChatId];
    const now = new Date();
    const tmp = {
        id: 'tmp_' + Date.now(),
        sender: 'me',
        text,
        time: now.toLocaleTimeString('ht-HT', { hour:'2-digit', minute:'2-digit' }),
        date: now,
        read: false,
    };

    if (!localSentMessages[activeChatId]) localSentMessages[activeChatId] = [];
    localSentMessages[activeChatId].push(tmp);
    input.value = '';
    openChat(activeChatId);

    if (window.dataManager) {
        const ok = await window.dataManager.sendDirectMessage(activeChatId, text);
        if (!ok) {
            localSentMessages[activeChatId] = localSentMessages[activeChatId].filter(m => m.id !== tmp.id);
            openChat(activeChatId);
            input.value = text;
            if (window.NotificationSystem) {
                window.NotificationSystem.show('Erè voye mesaj. Tcheke entènèt ou.', 'error');
            }
        }
    }
};

// ─── DELETE CHAT ──────────────────────────────────────────────────────────────
window.deleteChatActive = () => {
    if (!activeChatId) return;
    const f = realFriendsMap[activeChatId];
    if (!confirm(`Efase konvèsasyon avèk ${f?.name || 'moun sa a'}?`)) return;
    delete realFriendsMap[activeChatId];
    delete realChats[activeChatId];
    delete localSentMessages[activeChatId];
    filteredFriends = Object.values(realFriendsMap).sort((a,b) => b.date - a.date);
    window.closeChat();
};

// ─── NEW CHAT MODAL ───────────────────────────────────────────────────────────
window.openNewChatModal = () => {
    const modal = document.getElementById('modal-new-chat');
    if (!modal) return;
    document.getElementById('new-chat-search-input').value = '';
    document.getElementById('new-chat-results').style.display = 'none';
    modal.classList.remove('hidden');
};

window.initiateNewChat = async () => {
    const input  = document.getElementById('new-chat-search-input').value.trim();
    const results = document.getElementById('new-chat-results');
    if (!input) return;

    results.style.display = 'block';
    results.innerHTML = `<div style="padding:10px;color:#6b7280;text-align:center;"><i class="fas fa-spinner fa-spin"></i> Ap chèche...</div>`;

    if (!window.dataManager) { results.innerHTML = '<div style="padding:10px;color:#ef4444;">Konekte pou chèche.</div>'; return; }

    let found = null;
    try {
        const p = await window.dataManager.getUserProfile(input);
        if (p?.name) found = { id: input, name: p.name };
    } catch(e) {}

    if (!found) {
        found = Object.values(realFriendsMap).find(f => f.name.toLowerCase().includes(input.toLowerCase()));
    }

    if (found) {
        results.innerHTML = `
            <div class="msg-friend-item" onclick="window.startChatWith('${(found.id||'').replace(/['"<>`\\]/g,'')}','${(found.name||'').replace(/['"<>`\\]/g,'')}')" style="padding:12px;cursor:pointer;">
                <div class="msg-friend-avatar">${escapeHtml((found.name||'?').charAt(0).toUpperCase())}</div>
                <div class="msg-friend-info">
                    <div class="msg-friend-name">${escapeHtml(found.name)}</div>
                    <div class="msg-friend-preview">Klike pou kòmanse pale</div>
                </div>
            </div>`;
    } else {
        results.innerHTML = '<div style="padding:12px;color:#ef4444;text-align:center;">Nou pa jwenn itilizatè sa.</div>';
    }
};

window.startChatWith = (uid, name) => {
    document.getElementById('modal-new-chat')?.classList.add('hidden');
    if (!realFriendsMap[uid]) {
        realFriendsMap[uid] = {
            id: uid, name: name || 'Itilizatè',
            avatar: (name || 'I').charAt(0).toUpperCase(),
            lastMsg: '', date: new Date(), unread: false,
        };
    }
    filteredFriends = Object.values(realFriendsMap).sort((a,b) => b.date - a.date);
    window.switchChat(uid);
};

// ─── BADGE ────────────────────────────────────────────────────────────────────
function updateBadge() {
    const count = Object.values(realFriendsMap).filter(f => f.unread).length;
    ['msg-badge','sidebar-msg-badge'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = count;
        el.style.display = count > 0 ? 'inline-block' : 'none';
        if (id === 'msg-badge') el.classList.toggle('hidden', count === 0);
    });
}
