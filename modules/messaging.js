// modules/messaging.js

let activeChatId = null;
let filteredFriends = [];
let messageFilter = 'all'; // all, unread, read
let realChats = {}; // Maps friendId to array of messages
let realFriendsMap = {}; // Maps friendId to friend object
let inboxUnsubscribe = null;
let localSentMessages = {}; // Maps friendId to array of messages we sent in this session

export function renderMessagingUI() {
    const container = document.getElementById('view-messages');
    if (!container) return;

    container.innerHTML = `
        <div class="container" style="max-width: 1000px; margin-top: 20px;">
            <div class="messages-layout glass-card" style="display: flex; height: 75vh; padding: 0; overflow: hidden; border-radius: 15px;">
                
                <!-- Sidebar List -->
                <div class="msg-sidebar" style="width: 35%; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; background: #f8fafc;">
                    <div style="padding: 20px; border-bottom: 1px solid #e2e8f0; background: white;">
                        <h3 style="margin: 0; color: var(--text-dark); display: flex; justify-content: space-between; align-items: center;">
                            Mesaj dirèk <i class="fas fa-edit" style="color: var(--primary); cursor: pointer; font-size: 1.2rem;" onclick="window.startNewChat()" title="Ekri yon nouvo moun"></i>
                        </h3>
                        <input type="text" id="msg-search-box" placeholder="Chèche moun..." onkeyup="window.searchMessages(this.value)" style="width: 100%; padding: 10px 15px; border-radius: 20px; border: 1px solid #e2e8f0; margin-top: 15px; font-size: 0.9rem; background: #f1f5f9; outline: none;">
                        
                        <!-- Filter buttons -->
                        <div style="display: flex; gap: 8px; margin-top: 12px; font-size: 0.85rem;">
                            <button onclick="window.filterMessages('all')" class="msg-filter-btn active" style="background: var(--primary); color: white; border: none; padding: 6px 12px; border-radius: 15px; cursor: pointer; font-weight: 600;">Tout</button>
                            <button onclick="window.filterMessages('unread')" class="msg-filter-btn" style="background: transparent; color: var(--text-muted); border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 15px; cursor: pointer;">Pa li</button>
                            <button onclick="window.filterMessages('read')" class="msg-filter-btn" style="background: transparent; color: var(--text-muted); border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 15px; cursor: pointer;">Li</button>
                        </div>
                    </div>
                    
                    <div id="friends-list" style="flex: 1; overflow-y: auto;">
                        <div style="padding: 20px; text-align: center; color: var(--text-muted);">Ap chaje mesaj yo... <i class="fas fa-spinner fa-spin"></i></div>
                    </div>
                </div>

                <!-- Chat Area -->
                <div class="msg-chat-area" style="flex: 1; display: flex; flex-direction: column; background: white;">
                    <!-- Chat Header -->
                    <div id="chat-header" style="padding: 15px 20px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 15px;">
                        <h4 style="margin: 0; color: var(--text-muted);">Chwazi yon konvèsasyon pou w kòmanse pale</h4>
                    </div>

                    <!-- Messages -->
                    <div id="active-chat-messages" style="flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 15px; background: #f0fdf4; background-image: url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%2310b981\\' fill-opacity=\\'0.05\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');">
                    </div>

                    <!-- Input Area -->
                    <div id="chat-input-area" style="padding: 15px 20px; border-top: 1px solid #e2e8f0; display: none; gap: 10px; align-items: center; background: #f8fafc;">
                        <button style="background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer; padding: 5px;"><i class="far fa-smile"></i></button>
                        <input type="text" id="dm-input" placeholder="Ekri yon mesaj isit la..." style="flex: 1; padding: 12px 20px; border-radius: 25px; border: 1px solid #e2e8f0; outline: none; font-size: 1rem;" onkeypress="if(event.key === 'Enter') window.sendDM()">
                        <button onclick="window.sendDM()" style="background: var(--primary); color: white; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; display: flex; justify-content: center; align-items: center; font-size: 1.2rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1);"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;

    if (inboxUnsubscribe) {
        inboxUnsubscribe();
    }

    if (window.dataManager && window.dataManager.currentUser?.loggedIn) {
        inboxUnsubscribe = window.dataManager.listenToInbox((msgs) => {
            processInbox(msgs);
        });
    } else {
        document.getElementById('friends-list').innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">Ou dwe konekte pou wè mesaj ou yo.</div>`;
    }
}

function processInbox(msgs) {
    realChats = {};
    const myId = window.dataManager?.currentUser?.uid;
    
    // We don't wipe realFriendsMap entirely because we might have initiated a chat that doesn't have a reply yet.
    // So we just update the existing one or create it.
    
    msgs.forEach(m => {
        const isMe = m.senderId === myId;
        const friendId = isMe ? m.recipientId : m.senderId;
        
        if (!realFriendsMap[friendId]) {
            realFriendsMap[friendId] = {
                id: friendId,
                name: isMe ? ('Itilizatè ' + friendId.substring(0,4)) : (m.senderName || 'Zanmi Zepòl'),
                avatar: isMe ? 'U' : ((m.senderName || 'Z').charAt(0).toUpperCase()),
                lastMessage: m.text,
                date: new Date(m.date),
                hasUnread: !isMe && !m.read
            };
        } else {
            // If we now have a better name (because they sent us a message)
            if (!isMe && m.senderName) {
                realFriendsMap[friendId].name = m.senderName;
                realFriendsMap[friendId].avatar = m.senderName.charAt(0).toUpperCase();
            }
            // Update latest msg if this is newer
            if (new Date(m.date) >= realFriendsMap[friendId].date) {
                realFriendsMap[friendId].lastMessage = m.text;
                realFriendsMap[friendId].date = new Date(m.date);
            }
            if (!isMe && !m.read) realFriendsMap[friendId].hasUnread = true;
        }
        
        if (!realChats[friendId]) realChats[friendId] = [];
        realChats[friendId].push({
            id: m.id,
            sender: isMe ? 'me' : friendId,
            text: m.text,
            time: new Date(m.date).toLocaleTimeString('ht-HT', { hour: '2-digit', minute: '2-digit' }),
            date: new Date(m.date),
            status: m.read ? 'read' : 'delivered',
            rawRead: m.read
        });
    });
    
    for (let fid in realChats) {
        realChats[fid].sort((a,b) => a.date - b.date);
    }
    
    let friendsArray = Object.values(realFriendsMap).sort((a,b) => b.date - a.date);
    filteredFriends = friendsArray;
    
    // If no active chat but we have friends, select the first one
    if (!activeChatId && friendsArray.length > 0) {
        activeChatId = friendsArray[0].id;
    }
    
    applyFilter();
}

function renderFriendsList() {
    const list = document.getElementById('friends-list');
    if (!list) return;

    if (filteredFriends.length === 0) {
        list.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">Pa gen mesaj. Ou pako resevwa ni voye mesaj.</div>`;
        return;
    }

    list.innerHTML = filteredFriends.map(f => {
        const isActive = f.id === activeChatId;
        const unreadDot = f.hasUnread ? `<div style="width:10px; height:10px; background:var(--primary); border-radius:50%; margin-left:5px;"></div>` : '';
        return `
            <div onclick="window.switchChat('${f.id}')" style="display: flex; align-items: center; gap: 15px; padding: 15px 20px; cursor: pointer; border-bottom: 1px solid #f1f5f9; background: ${isActive ? '#e0f2fe' : 'transparent'}; transition: background 0.2s;">
                <div style="position: relative;">
                    <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">
                        ${f.avatar}
                    </div>
                </div>
                <div style="flex: 1; overflow: hidden;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px; align-items: center;">
                        <span style="font-weight: ${f.hasUnread ? '700' : '600'}; color: var(--text-dark);">${f.name}</span>
                        ${unreadDot}
                    </div>
                    <div style="color: ${f.hasUnread ? 'var(--primary)' : 'var(--text-muted)'}; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: ${f.hasUnread ? '600' : 'normal'};">
                        ${f.lastMessage}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.searchMessages = (query) => {
    if (!query.trim()) {
        filteredFriends = Object.values(realFriendsMap).sort((a,b) => b.date - a.date);
    } else {
        const lowerQuery = query.toLowerCase();
        filteredFriends = Object.values(realFriendsMap).filter(f => 
            f.name.toLowerCase().includes(lowerQuery) || 
            f.lastMessage.toLowerCase().includes(lowerQuery)
        ).sort((a,b) => b.date - a.date);
    }
    renderFriendsList();
};

window.filterMessages = (filter) => {
    messageFilter = filter;
    applyFilter();
};

function applyFilter() {
    let friends = Object.values(realFriendsMap).sort((a,b) => b.date - a.date);
    
    if (messageFilter === 'unread') {
        friends = friends.filter(f => f.hasUnread);
    } else if (messageFilter === 'read') {
        friends = friends.filter(f => !f.hasUnread);
    }
    
    filteredFriends = friends;
    
    document.querySelectorAll('.msg-filter-btn').forEach(btn => {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--text-muted)';
        btn.style.border = '1px solid #e2e8f0';
    });
    
    const activeBtn = Array.from(document.querySelectorAll('.msg-filter-btn')).find(btn => btn.textContent.toLowerCase().includes(messageFilter === 'all' ? 'tout' : (messageFilter === 'unread' ? 'pa li' : 'li')));
    if (activeBtn) {
        activeBtn.style.background = 'var(--primary)';
        activeBtn.style.color = 'white';
        activeBtn.style.border = 'none';
    }
    
    renderFriendsList();
    if (activeChatId) {
        openChat(activeChatId);
    }
}

window.switchChat = (friendId) => {
    activeChatId = friendId;
    
    // Mark as read locally
    if (realFriendsMap[friendId]) {
        realFriendsMap[friendId].hasUnread = false;
    }
    
    renderFriendsList();
    openChat(friendId);
};

function openChat(friendId) {
    const friend = realFriendsMap[friendId];
    if (!friend) return;

    document.getElementById('chat-input-area').style.display = 'flex';

    document.getElementById('chat-header').innerHTML = `
        <div style="position: relative;">
            <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">
                ${friend.avatar}
            </div>
        </div>
        <div style="flex: 1;">
            <h4 style="margin: 0; color: var(--text-dark); font-size: 1.1rem;">${friend.name}</h4>
        </div>
        <div style="display: flex; gap: 15px; color: var(--primary); font-size: 1.2rem; cursor: pointer;">
            <i class="fas fa-info-circle"></i>
            <i class="fas fa-trash" onclick="window.deleteChat('${friendId}')" title="Efase konvèsasyon sa"></i>
        </div>
    `;

    let allKnownMsgs = realChats[friendId] || [];
    let optimisticMsgs = localSentMessages[friendId] || [];
    
    // Combine and deduplicate
    let combined = [...allKnownMsgs, ...optimisticMsgs];
    let uniqueMsgsMap = new Map();
    combined.forEach(m => {
        // If we have an optimistic message and a real message with the same text and roughly same time, prefer the real one.
        // We use text + minute as a rough deduplication key for optimistic vs real
        let minuteStr = m.time; // Format: HH:MM
        let dedupKey = m.text.trim() + '_' + minuteStr + '_' + (m.sender === 'me' ? 'me' : 'them');
        
        if (m.id.startsWith('msg_')) {
            // It's optimistic
            if (!uniqueMsgsMap.has(dedupKey)) {
                uniqueMsgsMap.set(dedupKey, m);
            }
        } else {
            // It's from Firebase, overwrite any optimistic match
            uniqueMsgsMap.set(dedupKey, m);
        }
    });
    
    let msgs = Array.from(uniqueMsgsMap.values()).sort((a,b) => a.date - b.date);
    
    const chatBox = document.getElementById('active-chat-messages');

    if (!msgs.length) {
        chatBox.innerHTML = `
            <div class="empty-chat-placeholder" style="text-align: center; color: var(--text-muted); margin-top: 50px;">
                Pa gen mesaj. Ekri premye mesaj la pi ba a pou w kòmanse konvèsasyon an.
            </div>
        `;
    } else {
        chatBox.innerHTML = msgs.map(m => {
            const isMe = m.sender === 'me';
            let statusIcon = '';
            // if (isMe) {
            //     statusIcon = '<i class="fas fa-check status-icon sent" style="color: rgba(255,255,255,0.7); font-size: 0.8rem; margin-left: 4px;"></i>';
            // }

            return `
                <div class="message-row ${isMe ? 'message-sent' : 'message-received'} group" id="msg-row-${m.id}" style="display: flex; justify-content: ${isMe ? 'flex-end' : 'flex-start'}; margin-bottom: 15px;">
                    <div class="msg-bubble ${isMe ? 'sent' : 'received'}" style="background: ${isMe ? 'var(--primary)' : 'white'}; color: ${isMe ? 'white' : 'var(--text-dark)'}; padding: 12px 18px; border-radius: 20px; max-width: 70%; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border: ${isMe ? 'none' : '1px solid #e2e8f0'}; position: relative;">
                        <div class="bubble-text" style="font-size: 1rem; line-height: 1.4; word-break: break-word;">${m.text}</div>
                        <div class="bubble-meta" style="font-size: 0.75rem; text-align: right; margin-top: 5px; opacity: 0.8; display: flex; justify-content: flex-end; gap: 5px; align-items: center;">
                            <span>${m.time}</span>
                            ${statusIcon}
                        </div>
                        ${isMe && !m.id.startsWith('msg_') ? `<i class="fas fa-trash msg-delete-btn" onclick="window.deleteSingleMessage('${m.id}')" title="Efase mesaj sa" style="position: absolute; ${isMe ? 'left: -25px;' : 'right: -25px;'} top: 50%; transform: translateY(-50%); color: #ef4444; cursor: pointer; font-size: 0.9rem; opacity: 0.5;"></i>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

window.sendDM = async () => {
    const input = document.getElementById('dm-input');
    const text = input.value.trim();
    if (!text || !activeChatId) return;

    if (window.dataManager) {
        // Optimistic UI update
        if (!localSentMessages[activeChatId]) localSentMessages[activeChatId] = [];
        
        const now = new Date();
        const tempMsg = {
            id: 'msg_' + Date.now(),
            sender: 'me',
            text: text,
            time: now.toLocaleTimeString('ht-HT', { hour: '2-digit', minute: '2-digit' }),
            date: now,
            status: 'sending'
        };
        
        localSentMessages[activeChatId].push(tempMsg);
        input.value = '';
        openChat(activeChatId);

        // Actual network request
        const success = await window.dataManager.sendDirectMessage(activeChatId, text);
        if (success) {
            tempMsg.status = 'sent';
            openChat(activeChatId);
        } else {
            // Remove on failure
            localSentMessages[activeChatId] = localSentMessages[activeChatId].filter(m => m.id !== tempMsg.id);
            if (window.NotificationSystem) {
                window.NotificationSystem.show("Erè lè t ap voye mesaj la. Tcheke entènèt ou.", "error");
            }
            openChat(activeChatId);
            input.value = text; // Restore text
        }
    }
};

window.startNewChat = async () => {
    const userId = prompt("Antre ID itilizatè a ou vle ekri a:");
    if (userId && userId.trim()) {
        const trimmedId = userId.trim();
        activeChatId = trimmedId;
        
        let friendName = 'Itilizatè ' + trimmedId.substring(0,4);
        
        if (!realFriendsMap[trimmedId]) {
            // Check if we can get their real name
            if (window.dataManager && window.dataManager.getUserProfile) {
                const profile = await window.dataManager.getUserProfile(trimmedId);
                if (profile && profile.name) {
                    friendName = profile.name;
                }
            }
            
            realFriendsMap[trimmedId] = {
                id: trimmedId,
                name: friendName,
                avatar: friendName.charAt(0).toUpperCase(),
                lastMessage: '',
                date: new Date(),
                hasUnread: false
            };
            if (!realChats[trimmedId]) realChats[trimmedId] = [];
        }
        applyFilter();
    }
};

window.deleteSingleMessage = async (messageId) => {
    if(confirm("Ou vrèman vle efase mesaj sa a?")) {
        const row = document.getElementById(`msg-row-${messageId}`);
        if(row) row.style.opacity = '0.5';
        if (window.dataManager && window.dataManager.deleteMessage) {
            await window.dataManager.deleteMessage(messageId);
        }
    }
};

window.deleteChat = (friendId) => {
    if(confirm("Ou vrèman vle efase konvèsasyon sa a nan ekran w lan?")) {
        delete realFriendsMap[friendId];
        delete realChats[friendId];
        delete localSentMessages[friendId];
        activeChatId = null;
        applyFilter();
    }
};
