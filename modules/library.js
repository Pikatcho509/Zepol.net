// ─── LANGUAGE HELPER ─────────────────────────────────────────────────────────
function getSiteLang() {
    return localStorage.getItem('zepol_lang') ||
        document.documentElement.lang ||
        'ht';
}

// ─── READING POSITION (BOOKMARK) ─────────────────────────────────────────────
function saveReadingPos(bookId, chapterIdx, scrollTop = 0) {
    const pos = JSON.parse(localStorage.getItem('zepol_reading_pos') || '{}');
    pos[bookId] = { chapterIdx, scrollTop, savedAt: new Date().toISOString() };
    localStorage.setItem('zepol_reading_pos', JSON.stringify(pos));
}
function getReadingPos(bookId) {
    const pos = JSON.parse(localStorage.getItem('zepol_reading_pos') || '{}');
    return pos[bookId] || null;
}

// ─── LIBRARY DATA ─────────────────────────────────────────────────────────────
import { BOOKS } from './books-data.js';

export const LIBRARY_DATA = {
    articles: [
        {
            id: 'art-1', title: "Kijan pou Konprann epi Jere Depresyon",
            author: "Dr. Zepòl", readTime: "7 min", image: "assets/depression_support.jfif",
            content: `<h3>Depresyon se pa yon feblès</h3>
<p>Anpil moun panse depresyon se jis yon kesyon "tristès" oswa "feblès karaktè". Men sa pa vre ditou. Depresyon se yon maladi reyèl ki afekte ni lespri, ni kò moun nan. Li kapab deranje fason w panse, fason w dòmi, fason w manje ak fason w santi w chak jou.</p>
<h3>Siy ki montre w ka gen depresyon:</h3>
<ul><li>Ou santi w tris oswa vid prèske toutan.</li><li>Ou pèdi enterè nan bagay ki te konn fè w plezi.</li><li>Ou gen pwoblèm pou w dòmi, oswa ou dòmi twòp.</li><li>Ou santi w pa gen enèji menm lè w pa fè anyen.</li><li>Ou gen panse negatif sou tèt ou toutan.</li></ul>
<h3>Kisa w ka fè jodi a menm?</h3>
<p><strong>1. Pale ak yon moun:</strong> Premye etap la se kraze silans la.</p>
<p><strong>2. Fè ti pa:</strong> Fikse yon sèl ti objektif chak jou (tankou bwè yon vè dlo lè w leve).</p>
<p><strong>3. Respire:</strong> Lè estrès la wo, itilize teknik respirasyon 4-7-8 ki nan seksyon Byennèt nou an.</p>`
        },
        {
            id: 'art-2', title: "Gid pou Goumen ak Anksyete",
            author: "Zepòl Byennèt", readTime: "5 min", image: "assets/hero_illustration.png",
            content: `<h3>Anksyete a ap manti ba ou</h3>
<p>Anksyete souvan fè nou santi yon danje ki pa la reyèlman. Li fè kè nou bat fò, li fè nou swe, epi li plen tèt nou ak "e si...?"</p>
<h3>Teknik "Grounding" (Retounen sou tè a)</h3>
<p>Lè panik pran w, eseye teknik 5-4-3-2-1 an:</p>
<ul><li>Gade pou <strong>5</strong> bagay ou ka wè bò kote w.</li><li>Manyen <strong>4</strong> bagay ou ka santi.</li><li>Koute pou <strong>3</strong> son ou tande.</li><li>Chèche <strong>2</strong> bagay ou ka pran sant.</li><li>Panse ak <strong>1</strong> bon bagay ou ka goute.</li></ul>`
        },
        {
            id: 'art-3', title: "Poukisa Mande Èd Se Pi Gwo Prèv Fòs",
            author: "Kominote Zepòl", readTime: "6 min", image: "assets/community_bg.png",
            content: `<h3>Kilti nou an ak Sante Mantal</h3>
<p>Nan anpil kilti, sitou ann Ayiti, yo souvan di nou fòk nou "gason vanyan" oswa "fanm fò". Men reyalite a se ke lè w pote yon gwo fado pou kont ou, ou riske kraze anba l.</p>
<h3>Ou gen dwa kraze pafwa</h3>
<p>Ou pa oblije fò chak jou. Rekonèt ou bezwen èd se premye pa nan gerizon. Nan Zepòl, deviz nou se: <strong>"Se depi nan Ginen, Nèg ap ede Nèg"</strong>.</p>`
        },
        {
            id: 'art-4', title: "Geri Kole-Kole: Enpòtans Kominote nan Rebati Tèt",
            author: "Equip Zepòl", readTime: "6 min", image: "assets/brotherhood_support.png",
            content: `<h3>Ou pa pou kont ou</h3>
<p>Rechèch syantifik montre ke moun ki gen rezo sipò solid viv pi lontan, rekipere pi vit apre maladi, epi gen mwens risk pou depresyon grav. Koneksyon sosyal se yon medikaman natirèl.</p>
<h3>Kominote Zepòl la se espas sa a pou ou</h3>
<p>Isit la, ou jwenn moun ki konprann. Ou pa bezwen esplike tout istwa w. Jis prezan ak kè ouvert se ase.</p>
<h3>3 Fason pou konekte jodi a:</h3>
<ul><li>Pataje yon panse nan feed la (menm anonim).</li><li>Reponn ak yon "❤️" sou pòs yon moun ki parèt tris.</li><li>Ekri yon mesaj ankourajan nan bokal sipò a.</li></ul>`
        },
        {
            id: 'art-5', title: "Teknik Pwisan pou Jere Estrès Travay",
            author: "Nadia Lavi", readTime: "7 min", image: "assets/support_vibe.jfif",
            content: `<h3>Estrès travay ka detwi sante mantal ou</h3>
<p>Rechèch montre ke estrès travay se youn nan pi gwo kòz depresyon nan mond lan. Men gen estrateji ki mache reyèlman.</p>
<h3>Teknik Pomodoro pou Produktivite ak Lapè:</h3>
<ul><li>Travay 25 minit san entèripsyon.</li><li>Pran yon ti poz 5 minit — leve, bwè dlo.</li><li>Apre 4 "Pomodoro", pran yon gwo poz 15-30 minit.</li></ul>
<h3>Règ "Pa palé travay" lè w lakay:</h3>
<p>Kreye yon limit entèlektyèl ant travay ak repo. Lè w kite biwo a (fizikman oswa vityèlman), travay la rete la.</p>`
        },
        {
            id: 'art-6', title: "Dòmi Se Geri: Kijan Dòmi Afekte Sante Mantal",
            author: "Team Byennèt", readTime: "5 min", image: "assets/depression_support.jfif",
            content: `<h3>Dòmi se manje lespri</h3>
<p>Lè w pa dòmi 7-9 è, nivo kortizon (omimon estrès) ogmante, serotonin bese, epi risk depresyon monte 40%. Se pa dòmi ki fè ou parese — se dòmi ki geri ou.</p>
<h3>Rituèl dòmi ki mache:</h3>
<ol><li>Etenn ekran 1è anvan kouche.</li><li>Fè egzèsis 4-7-8 (4 souf anndan, 7 tann, 8 lage).</li><li>Tanperati chanm la: 18-20°C optimal.</li><li>Ekri 3 bagay pozitif ki te rive jodi a.</li></ol>`
        },
        {
            id: 'art-7', title: "Kijan pou Ede yon Zanmi ki gen Depresyon",
            author: "Gwoup Sipò Zepòl", readTime: "8 min", image: "assets/community_bg.png",
            content: `<h3>Ou ka fè yon diferans</h3>
<p>Lè yon moun ou renmen ap soufri ak depresyon, sa difisil pou tou de bò. Men prezan ou gen yon pouvwa gerizon ke yo pa ka mesire.</p>
<h3>Sa pou DI:</h3>
<ul><li>"Mwen la pou ou. Pa gen pres."</li><li>"Mwen kwè sa w ap di a."</li><li>"Ou pa bezwen fò devan mwen."</li></ul>
<h3>Sa pou EVITE di:</h3>
<ul><li>"Forte! Se nan tèt ou sa ye."</li><li>"Gen moun ki pi mal pase ou."</li><li>"Ou bezwen souri ak panse pozitif."</li></ul>
<h3>Aksyon konkrè ou ka fè:</h3>
<p>Òfri ede ak yon ti bagay spesifik (pa di "rele mwen si w bezwen yon bagay" — di "mwen ap pase chèche w demen maten"). Presans fizik gen pouvwa.</p>`
        },
        {
            id: 'art-8', title: "Teraphy pa Yon Sekrè — Se yon Chwa Kourajèz",
            author: "Dr. Zepòl", readTime: "6 min", image: "assets/depression_support.jfif",
            content: `<h3>Wè yon sikològ se pa pou "moun fou"</h3>
<p>Sa se youn nan pi gwo malentendu sou sante mantal. Teraphy se yon zouti pou nenpòt moun ki vle konprann tèt li pi byen, travay sou relasyon yo, oswa jere emosyon yo.</p>
<h3>Ki kalite teraphy ki egziste?</h3>
<ul><li><strong>TCC (Teraphy Kognitif-Konpòtman):</strong> Chanje panse negatif ki otomatik.</li><li><strong>Teraphy Travma:</strong> Pou geri pla ki fèt apre chòk.</li><li><strong>Teraphy Sipò:</strong> Jis pale, jwenn koute aktif.</li></ul>
<h3>Kijan pou kòmanse:</h3>
<p>Klike sou "Anyè Sikològ" nan menu Zepòl la pou jwenn yon pwofesyonèl Ayiti ki ka ede w. Premye sesyon an se jis yon koze — pa gen angajman obligatwa.</p>`
        }
    ],

    books: BOOKS
};

// ─── RENDER LIBRARY UI ────────────────────────────────────────────────────────
export function renderLibraryUI() {
    const container = document.getElementById('view-resources');
    if (!container) return;

    container.innerHTML = `
        <div class="container">
            <div class="premium-page-header" style="background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%); color: white; padding: 40px 20px; border-radius: 20px; margin-bottom: 30px; text-align: center; position: relative;">
                <h2 style="font-size: 2.2rem; margin-bottom: 8px;"><i class="fas fa-book-reader"></i> Bibliyotèk Zepòl</h2>
                <p style="opacity: 0.9;">Konesans se pouvwa. Atik, gid ak liv pou byennèt ou.</p>
            </div>

            <div class="library-tabs" style="display:flex; justify-content:center; gap:12px; margin-bottom:25px; flex-wrap:wrap;">
                <button class="lib-tab-btn active" id="tab-articles" onclick="window.switchLibraryTab('articles')" style="border-radius:25px; padding:10px 25px; font-weight:600;">📚 Atik (${LIBRARY_DATA.articles.length})</button>
                <button class="lib-tab-btn" id="tab-books" onclick="window.switchLibraryTab('books')" style="border-radius:25px; padding:10px 25px; font-weight:600;">📖 Liv (${LIBRARY_DATA.books.length})</button>
            </div>

            <div id="library-content" style="min-height:400px;"></div>
        </div>`;

    // Inject book reader modal once
    if (!document.getElementById('book-reader-modal')) _injectBookReaderModal();
    if (!document.getElementById('article-reader-modal')) _injectArticleReaderModal();

    window.switchLibraryTab('articles');
}

// ─── TAB SWITCHER ─────────────────────────────────────────────────────────────
window.switchLibraryTab = (tab) => {
    const content = document.getElementById('library-content');
    if (!content) return;
    const lang = getSiteLang();

    document.querySelectorAll('.lib-tab-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`tab-${tab}`);
    if (activeBtn) activeBtn.classList.add('active');

    if (tab === 'articles') {
        content.innerHTML = `<div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px;">
            ${LIBRARY_DATA.articles.map(art => `
                <div class="card float-animation" style="cursor:pointer;padding:0;overflow:hidden;position:relative;border-radius:16px;box-shadow:0 4px 15px rgba(0,0,0,0.07);" onclick="window.openArticle('${art.id}')">
                    <img src="${art.image}" style="width:100%;height:160px;object-fit:cover;" onerror="this.src='assets/resources_bg.png'">
                    <button class="bookmark-btn" onclick="event.stopPropagation();window.toggleBookmark('article','${art.id}')" style="position:absolute;top:8px;right:8px;background:rgba(255,255,255,0.9);border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1.1rem;color:${window.isArticleBookmarked&&window.isArticleBookmarked(art.id)?'#ff6b6b':'#94a3b8'};display:flex;align-items:center;justify-content:center;"><i class="fas fa-bookmark"></i></button>
                    <div style="padding:16px;">
                        <h3 style="margin:0 0 6px;color:var(--text-dark);font-size:1rem;line-height:1.3;">${art.title}</h3>
                        <p style="color:var(--text-muted);font-size:0.82rem;margin:0;"><i class="fas fa-user" style="margin-right:4px;"></i>${art.author} &nbsp;·&nbsp; <i class="far fa-clock"></i> ${art.readTime}</p>
                    </div>
                </div>`).join('')}
        </div>`;

    } else if (tab === 'books') {
        content.innerHTML = `<div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:24px;">
            ${LIBRARY_DATA.books.map(book => {
                const title = typeof book.title === 'object' ? (book.title[lang] || book.title.en || book.title.ht) : book.title;
                const desc = typeof book.description === 'object' ? (book.description[lang] || book.description.en || book.description.ht) : '';
                const pos = getReadingPos(book.id);
                const hasBookmark = !!pos;
                return `
                <div class="card float-animation" style="cursor:pointer;position:relative;overflow:hidden;border-radius:20px;box-shadow:0 8px 25px rgba(0,0,0,0.08);" onclick="window.openBook('${book.id}')">
                    <div style="position:relative;height:240px;overflow:hidden;">
                        <img src="${book.cover||'assets/resources_bg.png'}" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/resources_bg.png'">
                        <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.65) 100%);"></div>
                        <div style="position:absolute;bottom:12px;left:12px;right:12px;">
                            <h4 style="margin:0;color:white;font-size:1rem;line-height:1.3;text-shadow:0 1px 4px rgba(0,0,0,0.5);">${title}</h4>
                        </div>
                        ${hasBookmark ? `<div title="Kontinye lekti" style="position:absolute;top:8px;left:8px;background:#f59e0b;color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;box-shadow:0 2px 6px rgba(0,0,0,0.2);">✒️</div>` : ''}
                    </div>
                    <div style="padding:14px;background:white;">
                        <p style="margin:0 0 6px;color:#6b7280;font-size:0.82rem;">${book.author}</p>
                        <p style="margin:0 0 10px;color:#374151;font-size:0.88rem;line-height:1.5;">${desc}</p>
                        ${hasBookmark ? `<div style="background:#fef3c7;color:#92400e;font-size:0.78rem;padding:4px 10px;border-radius:10px;display:inline-block;">✒️ Kontinye nan Chapit ${pos.chapterIdx+1}</div>` : ''}
                    </div>
                </div>`;
            }).join('')}
        </div>`;
    }
};

// ─── OPEN ARTICLE ─────────────────────────────────────────────────────────────
window.openArticle = (id) => {
    const art = LIBRARY_DATA.articles.find(a => a.id === id);
    if (!art) return;
    const el = id => document.getElementById(id);
    if (el('article-img')) el('article-img').src = art.image;
    if (el('article-title')) el('article-title').textContent = art.title;
    if (el('article-author')) el('article-author').textContent = art.author;
    if (el('article-time')) el('article-time').textContent = art.readTime;
    if (el('article-content')) el('article-content').innerHTML = art.content;
    if (window.openModal) window.openModal('article-reader-modal');
};

// ─── OPEN BOOK ────────────────────────────────────────────────────────────────
let currentBook = null;
let currentChapterIdx = 0;

window.openBook = (id) => {
    const book = LIBRARY_DATA.books.find(b => b.id === id);
    if (!book) return;
    currentBook = book;
    const lang = getSiteLang();
    const title = typeof book.title === 'object' ? (book.title[lang] || book.title.en || book.title.ht) : book.title;

    document.getElementById('reader-title').textContent = title;
    document.getElementById('reader-author').textContent = book.author;

    // Build TOC with bookmark indicators
    const pos = getReadingPos(book.id);
    const toc = document.getElementById('reader-toc');
    toc.innerHTML = book.chapters.map((ch, idx) => {
        const chTitle = typeof ch.title === 'object' ? (ch.title[lang] || ch.title.en || ch.title.ht) : ch.title;
        const isSaved = pos && pos.chapterIdx === idx;
        return `<li style="margin-bottom:8px;">
            <a href="#" onclick="window.loadChapter(${idx}); return false;" class="toc-link" id="toc-${idx}"
               style="color:var(--text-main);text-decoration:none;display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;transition:background 0.2s;">
                ${isSaved ? '<span title="Ou te rete la">✒️</span>' : `<span style="color:#94a3b8;font-size:0.8rem;">${idx+1}.</span>`}
                <span style="flex:1;">${chTitle}</span>
            </a>
        </li>`;
    }).join('');

    // Resume from saved position or start from 0
    const startIdx = (pos && typeof pos.chapterIdx === 'number') ? pos.chapterIdx : 0;
    window.loadChapter(startIdx);
    if (window.openModal) window.openModal('book-reader-modal');

    // Auto-scroll restore
    if (pos && pos.scrollTop) {
        setTimeout(() => {
            const body = document.getElementById('reader-body-container');
            if (body) body.scrollTop = pos.scrollTop;
        }, 200);
    }
};

window.loadChapter = (idx) => {
    if (!currentBook || !currentBook.chapters[idx]) return;
    currentChapterIdx = idx;
    const lang = getSiteLang();
    const ch = currentBook.chapters[idx];
    const chTitle = typeof ch.title === 'object' ? (ch.title[lang] || ch.title.en || ch.title.ht) : ch.title;
    const chContent = typeof ch.content === 'object' ? (ch.content[lang] || ch.content.en || ch.content.ht) : ch.content;

    const readerContent = document.getElementById('reader-content');
    if (readerContent) {
        readerContent.innerHTML = `
            <h2 style="color:var(--primary);border-bottom:1px solid #e2e8f0;padding-bottom:15px;margin-bottom:20px;font-size:1.4rem;">${chTitle}</h2>
            <div style="font-size:var(--reader-font-size,1.1rem);line-height:1.9;">${chContent}</div>`;
        // Reset scroll
        const body = document.getElementById('reader-body-container');
        if (body) body.scrollTop = 0;
    }

    // Save reading position
    if (currentBook) saveReadingPos(currentBook.id, idx);

    document.getElementById('reader-progress').textContent = `${idx+1} / ${currentBook.chapters.length}`;
    document.getElementById('reader-prev-btn').disabled = (idx === 0);
    document.getElementById('reader-next-btn').disabled = (idx === currentBook.chapters.length - 1);

    document.querySelectorAll('.toc-link').forEach(l => {
        l.style.background = 'transparent';
        l.style.fontWeight = 'normal';
        l.style.color = 'var(--text-main)';
    });
    const active = document.getElementById(`toc-${idx}`);
    if (active) { active.style.background = 'rgba(16,185,129,0.1)'; active.style.color = 'var(--primary)'; active.style.fontWeight = '700'; }

    // Scroll sidebar to active item on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('reader-sidebar')?.classList.add('collapsed');
    }
};

window.prevChapter = () => { if (currentChapterIdx > 0) window.loadChapter(currentChapterIdx - 1); };
window.nextChapter = () => { if (currentBook && currentChapterIdx < currentBook.chapters.length - 1) window.loadChapter(currentChapterIdx + 1); };

// Save scroll position as user reads
document.addEventListener('scroll', () => {
    const body = document.getElementById('reader-body-container');
    if (body && currentBook) {
        saveReadingPos(currentBook.id, currentChapterIdx, body.scrollTop);
    }
}, true);

window.toggleToc = () => document.getElementById('reader-sidebar')?.classList.toggle('collapsed');
window.returnToResources = () => { if (window.closeModal) window.closeModal('book-reader-modal'); if (window.switchLibraryTab) window.switchLibraryTab('books'); };
window.returnToArticles = () => { if (window.closeModal) window.closeModal('article-reader-modal'); if (window.switchLibraryTab) window.switchLibraryTab('articles'); };

// Font size controls
window.adjustReaderFont = (delta) => {
    const root = document.documentElement;
    const current = parseFloat(getComputedStyle(root).getPropertyValue('--reader-font-size') || '1.1');
    const next = Math.min(1.5, Math.max(0.8, current + delta));
    root.style.setProperty('--reader-font-size', next + 'rem');
    const body = document.getElementById('reader-body-container');
    if (body) body.querySelectorAll('div[style*="font-size"]').forEach(el => el.style.fontSize = next + 'rem');
};

// ─── MODAL INJECTORS ──────────────────────────────────────────────────────────
function _injectBookReaderModal() {
    const modal = document.createElement('div');
    modal.id = 'book-reader-modal';
    modal.className = 'modal hidden';
    modal.innerHTML = `
        <div class="modal-content glass-panel reader-modal-content" style="display:flex;flex-direction:column;max-width:800px;height:88vh;padding:0;overflow:hidden;">
            <div class="reader-header" style="padding:12px 18px;background:linear-gradient(135deg,var(--primary),var(--accent));color:white;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;flex-shrink:0;">
                <div style="flex:1;min-width:0;">
                    <h3 id="reader-title" style="margin:0;font-size:1.1rem;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">...</h3>
                    <span id="reader-author" style="font-size:0.82rem;opacity:0.85;">...</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
                    <button onclick="window.adjustReaderFont(-0.1)" title="Police -" style="background:rgba(255,255,255,0.2);border:none;color:white;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:0.75rem;">A-</button>
                    <button onclick="window.adjustReaderFont(0.1)" title="Police +" style="background:rgba(255,255,255,0.2);border:none;color:white;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:0.9rem;">A+</button>
                    <button onclick="window.toggleToc()" title="Chapit" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:5px 12px;border-radius:15px;cursor:pointer;font-size:0.8rem;"><i class="fas fa-list"></i></button>
                    <button onclick="window.returnToResources()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:5px 12px;border-radius:15px;cursor:pointer;font-size:0.8rem;">✕ Fèmen</button>
                </div>
            </div>
            <div style="display:flex;flex:1;overflow:hidden;position:relative;">
                <div id="reader-sidebar" class="reader-sidebar" style="width:220px;background:#f8fafc;border-right:1px solid #e2e8f0;overflow-y:auto;padding:12px;flex-shrink:0;transition:width 0.3s,opacity 0.3s;">
                    <h4 style="margin:0 0 10px;color:var(--text-dark);font-size:0.9rem;padding-bottom:8px;border-bottom:1px solid #e2e8f0;">📑 Chapit yo</h4>
                    <ul id="reader-toc" style="list-style:none;padding:0;margin:0;"></ul>
                </div>
                <div id="reader-body-container" class="reader-body" style="flex:1;overflow-y:auto;padding:25px 30px;background:white;line-height:1.9;color:var(--text-dark);">
                    <div id="reader-content"></div>
                </div>
            </div>
            <div class="reader-footer" style="padding:12px 20px;background:#f8fafc;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">
                <button class="btn-secondary" id="reader-prev-btn" onclick="window.prevChapter()" style="border-radius:20px;padding:7px 18px;">← Anvan</button>
                <span id="reader-progress" style="font-weight:700;color:var(--text-muted);font-size:0.9rem;">Chapit 1</span>
                <button class="btn-primary" id="reader-next-btn" onclick="window.nextChapter()" style="border-radius:20px;padding:7px 18px;">Apre →</button>
            </div>
        </div>`;
    document.body.appendChild(modal);
}

function _injectArticleReaderModal() {
    const modal = document.createElement('div');
    modal.id = 'article-reader-modal';
    modal.className = 'modal hidden';
    modal.innerHTML = `
        <div class="modal-content glass-panel" style="max-width:680px;max-height:85vh;overflow-y:auto;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;padding-bottom:12px;border-bottom:1px solid #e2e8f0;">
                <button onclick="window.returnToArticles()" style="background:#f1f5f9;border:none;padding:8px 14px;border-radius:20px;cursor:pointer;color:var(--primary);font-weight:600;font-size:0.85rem;">← Retounen</button>
                <span onclick="closeModal('article-reader-modal')" style="font-size:1.4rem;cursor:pointer;color:#94a3b8;">&times;</span>
            </div>
            <img id="article-img" src="" style="width:100%;height:220px;object-fit:cover;border-radius:12px;margin-bottom:18px;" onerror="this.style.display='none'">
            <h2 id="article-title" style="color:var(--primary-dark);margin:0 0 8px;font-size:1.4rem;"></h2>
            <div style="color:var(--text-muted);margin-bottom:18px;font-size:0.85rem;display:flex;gap:12px;">
                <span><i class="fas fa-user"></i> <span id="article-author"></span></span>
                <span><i class="far fa-clock"></i> <span id="article-time"></span></span>
            </div>
            <div id="article-content" style="line-height:1.85;font-size:1.05rem;color:var(--text-main);"></div>
        </div>`;
    document.body.appendChild(modal);
}
