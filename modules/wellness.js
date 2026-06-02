import { NotificationSystem, openModal } from './ui.js?v=18.0.43-MOOD-ENHANCED';

export function switchWellnessMode(mode) {
    // 1. Handle Visual Tab Switching
    document.querySelectorAll('.wellness-mode').forEach(el => el.classList.add('hidden'));
    const targetMode = document.getElementById(`mode-${mode}`);
    if (targetMode) {
        targetMode.classList.remove('hidden');
    } else {
        console.warn(`Wellness mode '${mode}' not found.`);
    }

    // 2. Update Button State
    document.querySelectorAll('.wellness-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick')?.includes(`'${mode}'`)) btn.classList.add('active');
    });

    // 3. Init Specific Logic
    if (mode === 'breathing') {
        // Stop breathing if switching away? Not strictly necessary, but good practice
        const circle = document.getElementById('breathing-circle');
        if (circle) circle.style.animation = 'none';
        const instruction = document.getElementById('breath-instruction');
        if (instruction) instruction.textContent = "Chwazi yon teknik";
        if (window.activeBreathInterval) clearInterval(window.activeBreathInterval);
    }
}

// --- BREATHING EXERCISES ---
export function startBreathing(type) {
    const circle = document.getElementById('breathing-circle');
    const instruction = document.getElementById('breath-instruction');
    
    if (!circle || !instruction) return;
    
    // Clear any existing animation
    if (window.activeBreathInterval) clearInterval(window.activeBreathInterval);
    circle.style.animation = 'none';
    circle.offsetHeight; // trigger reflow
    
    if (type === '478') {
        // 4-7-8 Breathing (Total 19s)
        circle.style.animation = 'breathe-478 19s infinite cubic-bezier(0.4, 0, 0.2, 1)';
        
        const breatheCycle = () => {
            instruction.textContent = "Respire anndan... (4s)";
            setTimeout(() => {
                instruction.textContent = "Kenbe souf ou... (7s)";
                setTimeout(() => {
                    instruction.textContent = "Lage souf la tou dousman... (8s)";
                }, 7000);
            }, 4000);
        };
        
        breatheCycle();
        window.activeBreathInterval = setInterval(breatheCycle, 19000);
        
    } else if (type === 'box') {
        // Box Breathing 4-4-4-4 (Total 16s)
        circle.style.animation = 'breathe-box 16s infinite cubic-bezier(0.4, 0, 0.2, 1)';
        
        const breatheCycle = () => {
            instruction.textContent = "Respire anndan... (4s)";
            setTimeout(() => {
                instruction.textContent = "Kenbe... (4s)";
                setTimeout(() => {
                    instruction.textContent = "Lage souf la... (4s)";
                    setTimeout(() => {
                        instruction.textContent = "Rete vid... (4s)";
                    }, 4000);
                }, 4000);
            }, 4000);
        };
        
        breatheCycle();
        window.activeBreathInterval = setInterval(breatheCycle, 16000);
    }
}

// --- MENTAL HEALTH TESTS START ---

const TESTS = {
    depression: {
        title: "Tès Depresyon (PHQ-9 Amelyore)",
        options: [
            { text: "Sa pa rive m ditou (0)", val: 0 },
            { text: "Sa rive m, men m ap jere l (1)", val: 1 },
            { text: "Sa rive souvan, li kòmanse afekte m (2)", val: 2 },
            { text: "Sa ap peze lou sou mwen prèske chak jou (3)", val: 3 }
        ],
        questions: [
            "Nan 2 semèn ki sot pase yo, èske w santi w pèdi enterè nan ti bagay ki te konn fè kè w kontan anvan yo?",
            "Èske gen moman kote w santi yon gwo nwaj tristès ki refize ale, ki fè w santi w dekouraje oswa san espwa?",
            "Lè lannwit rive, èske lespri w pa ka sispann kouri, sa ki anpeche w dòmi, oswa èske w santi w jis anvi rete kouche tout lajounen?",
            "Malgre ou pa fè gwo efò fizik, èske kò w santi l lou e fatige anpil?",
            "Èske w remake chanjman nan fason ou manje (pèdi apeti totalman oswa manje twòp pou w konsole tèt ou)?",
            "Lè w gade tèt ou nan glas oswa ou panse a lavi w, èske w gen santiman ou pa gen valè oswa ou se yon desepsyon pou moun ou renmen yo?",
            "Lè w ap eseye gade televizyon oswa li, èske l difisil pou w rete konsantre paske lespri w lwen?",
            "Èske moun nan anviwònman w remake ou swa ralanti anpil, swa ou ajite k ap vire san rete?",
            "Nan moman ki pi sonb yo, èske w konn gen panse li ta pi fasil si w pa t la ankò oswa ou anvi fè tèt ou mal?"
        ],
        results: [
            { max: 4, msg: "Lavi a pa toujou fasil, men ou sanble ap kenbe yon bon ekilib. Kontinye pran swen tèt ou! 🌟" },
            { max: 9, msg: "Ou gen yon ti nwaj ki pase pafwa. Eseye pran yon ti tan pou respire, pale ak yon zanmi oswa ekri nan jounal la. 🌿" },
            { max: 14, msg: "Pwa a kòmanse vin lou. Li ta vrèman bon pou w konsidere pale ak yon pwofesyonèl sante mantal. Ou pa oblije pote sa sèl. 🩺" },
            { max: 27, msg: "Doulè sa a twòp pou yon sèl moun pote. Tanpri, chèche èd pwofesyonèl imedyatman. Nou la, e ou pa pou kont ou. 🆘" }
        ]
    },
    anxiety: {
        title: "Tès Anksyete (GAD-7 Amelyore)",
        options: [
            { text: "Sa pa rive m ditou (0)", val: 0 },
            { text: "Sa rive m, men m ap jere l (1)", val: 1 },
            { text: "Sa rive souvan, li kòmanse afekte m (2)", val: 2 },
            { text: "Sa ap peze lou sou mwen prèske chak jou (3)", val: 3 }
        ],
        questions: [
            "Èske w pase anpil tan ap santi w anba presyon, kòmsi gen yon move bagay ki pral rive yon sèl kou?",
            "Lè yon lide ki fè w pè antre nan tèt ou, èske l vin tounen yon bouk ou pa ka sispann?",
            "Èske w santi enkyetid yo anvayi w sou twòp ti detay nan lavi chak jou?",
            "Menm lè w gen ti moman lib, èske kò w ak lespri w toujou refize detann yo nèt?",
            "Èske w santi w oblije bouje toutan paske gen yon laperèz andedan w?",
            "Èske w wè ti bagay senp fè w pèdi pasyans oswa eksploze fasil?",
            "Èske gen yon santiman laperèz konstan, tankou yon katastwòf iminan k ap tann ou?"
        ],
        results: [
            { max: 4, msg: "Nivo anksyete w rete nòmal. Ou byen metrize estrès yo! 🌬️" },
            { max: 9, msg: "Ou pote kèk ti enkyetid. Eseye fè egzèsis respirasyon yo pou kalme lespri w. 🧘‍♂️" },
            { max: 14, msg: "Anksyete a ap pran plas nan lavi w. Siveye sa, e li ta bon pou pale ak yon moun de krent ou yo. 🗣️" },
            { max: 21, msg: "Kè sote sa yo twò fò. Li enpòtan anpil pou w jwenn sipò pwofesyonèl pou ede w libere. 💙" }
        ]
    },
    relation: {
        title: "Tès Relasyon Amoure 💘",
        options: [
            { text: "Wi, sa vrèman solid (0)", val: 0 },
            { text: "Gen de fwa wi (1)", val: 1 },
            { text: "Raman, sa banm pwoblèm (2)", val: 2 },
            { text: "Non, se opoze a nèt (3)", val: 3 }
        ],
        questions: [
            "Nan fon kè w, èske w santi moun w ap pataje lavi w la vrèman konprann doulè w ak lajwa w san l pa jije w?",
            "Lè w gen yon gwo rèv, èske prezans li se yon fòs ki pouse w pi devan, oswa li fè w fè bak?",
            "Lè gen ti chire-pit, èske diskisyon yo mennen nan yon solisyon ak respè, oswa yo fini nan voye pwen oswa blese santiman?",
            "Èske w oblije kache yon pati nan moun ou ye vre a paske ou pè li p ap aksepte w konsa?",
            "Lè w nan bra moun sa a oswa toupre l, èske kè w santi l anpè e kò w santi l an sekirite nèt?",
            "Si mond lan ta tonbe sou ou jodi a, èske se li menm ou ta fè konfyans avèg pou l vin sove w?"
        ],
        results: [
            { max: 4, msg: "Relasyon w lan sanble gen yon fondasyon solid ki baze sou respè ak konfyans. Kontinye nouri l ak lanmou. ❤️" },
            { max: 10, msg: "Gen kèk tibilans. Li nòmal nan tout koup, men veye sou kominikasyon an. Yon dyalòg sensè ka geri anpil bagay. 🗣️" },
            { max: 14, msg: "Atansyon: Gen siy ki montre w pa fin alèz e ou ka pèdi tèt ou ladan l. Chèche konsèy oswa mete limit. ⚠️" },
            { max: 18, msg: "Sitiyasyon sa a parèt toksik epi li ka detwi byennèt ou. Lanmou pa dwe fè mal konsa. Pwoteje tèt ou. 🛡️" }
        ]
    },
    family: {
        title: "Tès Relasyon Fanmi 🏡",
        options: [
            { text: "Wi, sa vrèman solid (0)", val: 0 },
            { text: "Gen de fwa wi (1)", val: 1 },
            { text: "Raman, sa banm pwoblèm (2)", val: 2 },
            { text: "Non, se opoze a nèt (3)", val: 3 }
        ],
        questions: [
            "Malgre defo w, èske w kwè fanmi w apresye w jis pou moun ou ye a?",
            "Si w fè yon gwo erè jodi a, èske premye reyaksyon yo ap se kore w oswa kondane w?",
            "Nan kay la, èske tout moun gen yon vwa k ap koute, menm lè sa difisil pou pale?",
            "Lè w pran yon chemen diferan ak sa yo te vle a, èske yo fini pa respekte chwa lavi w?",
            "Lè w franchi pòt kay la, èske l se yon kote ki pote estrès, oswa yon refij kote lespri w poze?"
        ],
        results: [
            { max: 4, msg: "Fanmi w se yon gwo poto sipò pou ou. Sa se yon richès presye anpil. 🌳" },
            { max: 9, msg: "Gen kote ki bezwen reparasyon, men gen de baz ki la. Pafwa mete limit klè ka ede. 🚧" },
            { max: 15, msg: "Anbyans lan sanble lou e li fè w soufri. Pwoteje espas mantal ou ak jwenn pwòp fanmi chwa ou (zanmi) se priyorite w. 🧘" }
        ]
    }
};

let currentTest = null;
let currentQuestionIndex = 0;
let testScore = 0;

export function startTest(type) {
    const testData = TESTS[type];
    if (!testData) return;

    currentTest = testData;
    currentQuestionIndex = 0;
    testScore = 0;

    // Create Modal for Test
    let modal = document.getElementById('test-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'test-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    renderTestStep(modal);
    modal.classList.remove('hidden');
}

function renderTestStep(modal) {
    const q = currentTest.questions[currentQuestionIndex];
    const progress = Math.round(((currentQuestionIndex) / currentTest.questions.length) * 100);

    // Dynamic Options Rendering
    let optionsHtml = '';
    const options = currentTest.options || [
        { text: "Pa ditou (0)", val: 0 },
        { text: "Plizyè jou (1)", val: 1 },
        { text: "Plis pase mwatye (2)", val: 2 },
        { text: "Prèske chak jou (3)", val: 3 }
    ];

    options.forEach(opt => {
        optionsHtml += `<button class="method-btn" style="flex:1; min-width:120px; text-align:center; padding:10px; border-radius:20px; font-size:13px; margin:5px;" onclick="window.answerTest(${opt.val})">
            ${opt.text}
        </button>`;
    });

    modal.innerHTML = `
        <div class="modal-content glass-panel" style="max-width:550px; padding:0; display:flex; flex-direction:column; height:80vh; max-height:600px;">
            <div style="padding:15px 20px; background:linear-gradient(135deg, var(--primary), var(--secondary)); color:white; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="margin:0; font-size:1.2rem; color:white; background:none; -webkit-text-fill-color:white;">${currentTest.title}</h3>
                <button class="btn-icon" style="color:white;" onclick="window.closeModal('test-modal')"><i class="fas fa-times"></i></button>
            </div>
            
            <div style="width:100%; height:4px; background:#edf2f7;">
                <div style="width:${progress}%; height:100%; background:#f1c40f; transition:width 0.4s ease-out;"></div>
            </div>

            <div class="test-chat-area" style="flex:1; padding:20px; overflow-y:auto; background:#f8fafc; display:flex; flex-direction:column; gap:15px;">
                <div class="chat-bubble-model received" style="background:white; padding:15px; border-radius:15px 15px 15px 0; max-width:85%; box-shadow:0 2px 5px rgba(0,0,0,0.05); align-self:flex-start;">
                    <span style="color:var(--primary); font-size:0.8rem; font-weight:bold; display:block; margin-bottom:5px;">Zepòl (Kesyon ${currentQuestionIndex + 1})</span>
                    <span style="font-size:1.1rem; line-height:1.4; color:#2d3748;">${q}</span>
                </div>
            </div>

            <div style="padding:15px; background:white; border-top:1px solid #edf2f7;">
                <div style="display:flex; flex-wrap:wrap; justify-content:center; margin-bottom:15px;">
                    ${optionsHtml}
                </div>
                
                <div style="display:flex; gap:10px; align-items:center;">
                    <input type="text" id="test-written-answer" placeholder="Eksplike nan mo pa w..." style="flex:1; padding:12px 15px; border-radius:25px; border:1px solid #cbd5e0; background:#f1f5f9; outline:none;" onkeypress="if(event.key === 'Enter') window.answerTestWritten()">
                    <button onclick="window.answerTestWritten()" style="background:var(--primary); color:white; border:none; width:45px; height:45px; border-radius:50%; cursor:pointer; display:flex; justify-content:center; align-items:center; box-shadow:0 4px 10px rgba(0,0,0,0.1);"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    `;
}

// Add global binding for the new written test function
window.answerTestWritten = function() {
    const textInput = document.getElementById('test-written-answer');
    if (textInput && textInput.value.trim() !== "") {
        console.log("📝 Itilizatè a ekri nan tès:", textInput.value.trim());
        // For written response, we just give an average score (1) so it continues but doesn't skew drastically
        window.answerTest(1, textInput.value.trim());
    }
};

export function answerTest(score, writtenText = null) {
    if (!writtenText) {
        const textInput = document.getElementById('test-written-answer');
        if (textInput && textInput.value.trim() !== "") {
            console.log("📝 Itilizatè a ekri:", textInput.value.trim());
        }
    }

    testScore += score;
    currentQuestionIndex++;

    if (currentQuestionIndex < currentTest.questions.length) {
        renderTestStep(document.getElementById('test-modal'));
    } else {
        finishTest();
    }
}

function finishTest() {
    let resultMsg = "";
    // Find result range
    for (const r of currentTest.results) {
        if (testScore <= r.max) {
            resultMsg = r.msg;
            break;
        }
    }
    // Fallback if score exceeds max defined (shouldn't happen)
    if (!resultMsg && currentTest.results.length > 0) resultMsg = currentTest.results[currentTest.results.length - 1].msg;

    const modal = document.getElementById('test-modal');
    modal.innerHTML = `
        <div class="modal-content glass-panel" style="text-align:center;">
             <div style="font-size:60px; margin-bottom:10px;">📊</div>
             <h3 style="margin-bottom:15px;">Konsta Nou Fè</h3>
             <p style="font-size:1.1rem; line-height:1.6; margin-bottom:25px; color:#2c3e50;">${resultMsg}</p>
             <button class="btn-primary" onclick="window.closeModal('test-modal')" style="width:100%;">Mèsi pou konfyans lan</button>
             <p style="font-size:0.8rem; color:#95a5a6; margin-top:20px;">*Sa a se yon gid pou ede w wè klè. Li pa ranplase yon pwofesyonèl.*</p>
        </div>
    `;
}

// ─── SHARED GAME HELPERS ────────────────────────────────────────────────────

function gameHeader(title, score = null) {
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 18px;background:rgba(0,0,0,0.25);color:white;">
        <button onclick="window.closeActiveGame()" style="background:rgba(255,255,255,0.2);border:none;color:white;padding:6px 14px;border-radius:20px;cursor:pointer;font-weight:600;"><i class="fas fa-times"></i> Soti</button>
        <strong style="font-size:1.1rem;">${title}</strong>
        ${score !== null ? `<span id="game-score-display" style="background:rgba(255,255,255,0.2);padding:4px 14px;border-radius:20px;font-weight:700;">${score}</span>` : '<span></span>'}
    </div>`;
}

function audioClick() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 800; g.gain.setValueAtTime(0.15, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.15);
    } catch(e) {}
}

function confetti(x, y, container) {
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        const colors = ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#5f27cd'];
        p.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:8px;height:8px;background:${colors[i%colors.length]};border-radius:2px;pointer-events:none;transition:all 0.6s ease-out;`;
        container.appendChild(p);
        setTimeout(() => {
            p.style.transform = `translate(${(Math.random()-0.5)*80}px,${(Math.random()-0.8)*80}px) rotate(${Math.random()*360}deg)`;
            p.style.opacity = '0';
        }, 10);
        setTimeout(() => p.remove(), 700);
    }
}

// ─── GAME LAUNCHER ──────────────────────────────────────────────────────────

export function launchGame(type) {
    const container = document.getElementById('active-game-container');
    const stage = document.getElementById('game-stage');

    if (!container || !stage) {
        return NotificationSystem.show("Erè: Ekran jwèt la pa pare.", "error");
    }

    container.classList.remove('hidden');
    stage.innerHTML = '';
    const listSection = document.getElementById('games-list-section');
    if (listSection) listSection.classList.add('hidden');

    if (type === 'clouds') {
        initCloudGameV2(stage);
    } else if (type === 'vibe') {
        initVibeGameV2(stage);
    } else if (type === 'bubble') {
        initBubbleWordsGame(stage);
    } else if (type === 'memory') {
        initZenMemoryGame(stage);
    } else if (type === 'breathtap') {
        initBreathTapGame(stage);
    } else if (type === 'dls') {
        stage.innerHTML = `
            <div style="padding:20px; text-align:center;">
                <div style="margin-bottom: 30px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 12px; color: white; text-align: center; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
                    <h3 style="margin-bottom: 10px; font-size: 1.4rem;">⚽ Jwe kounye a ak yon lòt moun!</h3>
                    <p style="margin-bottom: 15px; opacity: 0.9; font-size: 0.9rem;">Sistèm nan ap chache yon parèy pou ou, epi ba nou yon kòd sekrè otomatikman.</p>
                    <div id="dls-system-match-ui">
                        <button class="btn-primary" onclick="window.startSystemMatch()" style="background: white; color: #10b981; border: none; padding: 10px 20px; font-weight: bold; font-size: 1rem; border-radius: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                            <i class="fas fa-search"></i> Chèche yon jwè Koulye a
                        </button>
                    </div>
                </div>
                <div id="dls-codes-list"></div>
                <h4 style="color: var(--primary); margin-top: 15px; margin-bottom: 15px; border-top: 1px solid #eee; padding-top:15px;"><i class="fas fa-users"></i> Jwè Online kounye a</h4>
                <div id="online-players-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; margin-bottom: 20px;"><div style="color: grey; font-size: 0.8rem; grid-column: 1/-1;">Ap chèche lòt jwè...</div></div>
                <div style="display:flex; flex-direction:column; gap:10px; margin-top:30px; background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
                    <label for="dls-code-input" style="font-weight:bold; color:var(--primary); text-align:left; font-size: 1rem;">Oswa pataje pwòp kòd ou:</label>
                    <div style="display:flex; gap:10px;">
                        <input type="text" id="dls-code-input" placeholder="Kòd DLS ou..." style="flex:1; padding:15px; border-radius:10px; border:2px solid #cbd5e1; outline: none; font-size: 1.2rem; font-family: monospace; font-weight: bold; color: #334155; text-align: center; letter-spacing: 2px;">
                        <button class="btn-primary" onclick="window.submitDLSCode()" style="white-space: nowrap; padding: 10px 25px; font-size: 1.1rem; border-radius: 10px;">Pataje Kòd</button>
                    </div>
                </div>
            </div>
        `;
        if (window.renderDLSCodes) window.renderDLSCodes();
    }
}

// ═══════════════════════════════════════════════════════════════════════════
//  GAME 1: CLOUD CLEARER V2 — therapeutic, animated, progressive
// ═══════════════════════════════════════════════════════════════════════════
const CLOUD_MESSAGES = [
    "Souf ou kite yon nwaj ale ✨","Ou pi fò pase sa!","Chak klik se yon pas devan 💙",
    "Respire... ou ap fè li 🌿","Nwaj yo pa ka rete devan ou ☀️","Wo! Ou eksepsyonèl!",
    "Ou manke 3 pou wè solèy la 🌤","Kontinye, ou prèske la!","Lespri w ap klè!"
];
let cloudScore = 0, cloudTotal = 0;

function initCloudGameV2(stage) {
    cloudScore = 0;
    const totalClouds = 12;
    cloudTotal = totalClouds;

    stage.innerHTML = `
        <div style="position:relative; background:linear-gradient(180deg,#87ceeb 0%,#e0f7fa 100%); border-radius:16px; overflow:hidden; user-select:none;">
            ${gameHeader('☁️ Netwaye Syèl la', '0')}
            <div style="height:420px; position:relative;" id="cloud-arena">
                <div id="sun-glow" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:90px;opacity:0.15;transition:opacity 1.5s;pointer-events:none;z-index:0;">☀️</div>
                <div id="cloud-feedback" style="position:absolute;top:60px;left:50%;transform:translateX(-50%);color:#1e3a8a;font-weight:700;font-size:1rem;pointer-events:none;transition:opacity 0.5s;opacity:0;z-index:20;text-align:center;width:80%;"></div>
            </div>
            <div style="padding:10px 15px;background:rgba(255,255,255,0.7);text-align:center;font-size:0.85rem;color:#1e40af;">Klike sou chak nwaj pou li disparèt!</div>
        </div>`;

    const arena = stage.querySelector('#cloud-arena');
    const feedbackEl = stage.querySelector('#cloud-feedback');
    const sunEl = stage.querySelector('#sun-glow');
    let scoreEl = stage.querySelector('#game-score-display');

    const NEGATIVES = ['😰','💔','😣','😤','😞','☁️','⛈️','🌩️'];
    const placed = [];

    for (let i = 0; i < totalClouds; i++) {
        const el = document.createElement('div');
        el.textContent = NEGATIVES[i % NEGATIVES.length];
        el.style.cssText = `position:absolute;font-size:${38+Math.random()*22}px;cursor:pointer;z-index:5;transition:transform 0.15s,opacity 0.4s;`;
        // Avoid clumping
        let x, y, attempts = 0;
        do { x = 5 + Math.random()*80; y = 8 + Math.random()*75; attempts++; }
        while (attempts < 30 && placed.some(p => Math.abs(p.x-x)<12 && Math.abs(p.y-y)<12));
        placed.push({x,y});
        el.style.left = x+'%'; el.style.top = y+'%';

        // Gentle float animation offset
        el.style.animation = `float ${2.5+Math.random()*2}s ease-in-out ${Math.random()*2}s infinite`;

        el.addEventListener('pointerdown', function(e) {
            audioClick();
            cloudScore++;
            if (scoreEl) scoreEl.textContent = cloudScore;
            const rect = arena.getBoundingClientRect();
            confetti(e.clientX - rect.left, e.clientY - rect.top, arena);

            this.style.transform = 'scale(1.4)';
            this.style.opacity = '0';
            const self = this;
            setTimeout(() => { self.remove(); }, 400);

            const msg = CLOUD_MESSAGES[Math.floor(Math.random()*CLOUD_MESSAGES.length)];
            feedbackEl.textContent = msg;
            feedbackEl.style.opacity = '1';
            setTimeout(() => feedbackEl.style.opacity = '0', 1800);

            const remaining = arena.querySelectorAll('[style*="cursor:pointer"]').length - 1;
            sunEl.style.opacity = (1 - remaining/totalClouds).toFixed(2);

            if (remaining === 0) {
                setTimeout(() => {
                    arena.innerHTML = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:90px;animation:bounce-in 0.4s;text-align:center;">
                        ☀️<div style="font-size:1.3rem;font-weight:700;color:#1e3a8a;margin-top:15px;">Solèy la ap briye! Ou fò! 🌟</div>
                        <div style="font-size:0.95rem;color:#1e40af;margin-top:8px;">Sko: ${cloudScore} nwaj netwaye</div>
                        <button onclick="window.launchGame('clouds')" style="margin-top:20px;background:#0984e3;color:white;border:none;padding:10px 25px;border-radius:20px;font-weight:600;cursor:pointer;font-size:1rem;">Rejwe 🔄</button>
                    </div>`;
                    NotificationSystem.show("Bravo! Ou netwaye syèl la nèt! ☀️ +5 pwen", "success");
                    const pts = parseInt(localStorage.getItem('zepol_points')||'0') + 5;
                    localStorage.setItem('zepol_points', pts);
                }, 300);
            }
        });
        arena.appendChild(el);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
//  GAME 2: VIBE CATCHER V2 — good/bad items, speed progression
// ═══════════════════════════════════════════════════════════════════════════
let vibeV2Score = 0, vibeV2Lives = 3, vibeV2Interval, vibeV2Running = false;

function initVibeGameV2(stage) {
    vibeV2Score = 0; vibeV2Lives = 3; vibeV2Running = false;

    stage.innerHTML = `
        <div style="background:linear-gradient(135deg,#2d3436 0%,#1e1e2e 100%);border-radius:16px;overflow:hidden;user-select:none;">
            ${gameHeader('⭐ Atrape Bon Enèji', 'Sko: 0')}
            <div style="display:flex;justify-content:space-between;padding:8px 18px;color:white;font-size:0.9rem;">
                <span id="vibe-v2-lives">❤️❤️❤️</span>
                <span id="vibe-v2-level" style="background:rgba(255,255,255,0.1);padding:2px 10px;border-radius:10px;">Nivo 1</span>
            </div>
            <div id="vibe-v2-arena" style="height:360px;position:relative;overflow:hidden;cursor:none;">
                <div id="vibe-v2-cursor" style="position:absolute;font-size:28px;pointer-events:none;transition:all 0.05s;z-index:10;">🧲</div>
                <div id="vibe-v2-start" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;text-align:center;gap:15px;background:rgba(0,0,0,0.5);">
                    <div style="font-size:3rem;">⭐</div>
                    <p style="font-size:1.1rem;opacity:0.9;">Atrape zetwal ❤️ 🌟 ✨<br>Evite 💔 ⛈️ 😤</p>
                    <button onclick="startVibeV2()" style="background:#a29bfe;color:white;border:none;padding:12px 30px;border-radius:25px;font-weight:700;font-size:1.1rem;cursor:pointer;">Kòmanse!</button>
                </div>
            </div>
            <div style="padding:8px 15px;background:rgba(255,255,255,0.05);text-align:center;font-size:0.78rem;color:rgba(255,255,255,0.5);">Deplase sori ou pou atrape bon enèji</div>
        </div>`;

    const arena = stage.querySelector('#vibe-v2-arena');
    const cursor = stage.querySelector('#vibe-v2-cursor');

    arena.addEventListener('pointermove', (e) => {
        const r = arena.getBoundingClientRect();
        cursor.style.left = (e.clientX - r.left - 14) + 'px';
        cursor.style.top = (e.clientY - r.top - 14) + 'px';
    });

    window.startVibeV2 = () => {
        const startEl = stage.querySelector('#vibe-v2-start');
        if (startEl) startEl.style.display = 'none';
        vibeV2Running = true;
        vibeV2Score = 0; vibeV2Lives = 3;
        updateVibeV2HUD(stage);
        if (vibeV2Interval) clearInterval(vibeV2Interval);

        let spawnRate = 900, levelTimer = 0;
        vibeV2Interval = setInterval(() => {
            if (!vibeV2Running) return;
            levelTimer++;
            if (levelTimer % 20 === 0) {
                spawnRate = Math.max(350, spawnRate - 80);
                const lvl = Math.ceil(levelTimer/20);
                const lvlEl = stage.querySelector('#vibe-v2-level');
                if (lvlEl) { lvlEl.textContent = `Nivo ${lvl}`; lvlEl.style.color = '#ffeaa7'; }
            }
            spawnVibeV2Item(arena, stage);
        }, spawnRate);

        setTimeout(() => {
            clearInterval(vibeV2Interval);
            vibeV2Running = false;
            arena.innerHTML = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,0.8);color:white;text-align:center;gap:12px;padding:20px;">
                <div style="font-size:3rem;">${vibeV2Score>50?'🏆':'⭐'}</div>
                <h3 style="color:white;margin:0;">Jwèt Fini!</h3>
                <p style="font-size:1.2rem;opacity:0.9;">Sko ou: <strong style="color:#ffeaa7;font-size:1.5rem;">${vibeV2Score}</strong></p>
                <p style="font-size:0.9rem;opacity:0.7;">${vibeV2Score>80?'Ekselan! Ou yon chanpyon!':vibeV2Score>40?'Trè bon! Kontinye pratike!':'Bon kòmansman! Eseye ankò!'}</p>
                <button onclick="window.launchGame('vibe')" style="background:#a29bfe;color:white;border:none;padding:10px 25px;border-radius:20px;font-weight:600;cursor:pointer;">Rejwe 🔄</button>
            </div>`;
            const pts = parseInt(localStorage.getItem('zepol_points')||'0') + Math.floor(vibeV2Score/5);
            localStorage.setItem('zepol_points', pts);
        }, 30000);
    };
}

const GOOD_VIBES = ['⭐','❤️','✨','🌟','💚','🌈','🦋','☀️','🌸','💫'];
const BAD_VIBES  = ['💔','⛈️','😤','🌑','💢','👿'];

function spawnVibeV2Item(arena, stage) {
    const isGood = Math.random() > 0.35;
    const emoji = isGood ? GOOD_VIBES[Math.floor(Math.random()*GOOD_VIBES.length)] : BAD_VIBES[Math.floor(Math.random()*BAD_VIBES.length)];
    const el = document.createElement('div');
    el.textContent = emoji;
    el.style.cssText = `position:absolute;font-size:${28+Math.random()*16}px;left:${Math.random()*90}%;top:-40px;pointer-events:auto;transition:transform 0.1s;cursor:pointer;`;

    let y = -40;
    const speed = 2.5 + Math.random() * 3.5;

    el.addEventListener('pointerdown', (e) => {
        audioClick();
        const rect = arena.getBoundingClientRect();
        confetti(e.clientX - rect.left, e.clientY - rect.top, arena);
        el.style.transform = 'scale(2)';
        el.style.opacity = '0';

        if (isGood) {
            vibeV2Score += 10;
        } else {
            vibeV2Lives = Math.max(0, vibeV2Lives - 1);
            NotificationSystem.show('Oops! Ou atrape yon move enèji. -1 ❤️', 'warning');
            if (vibeV2Lives === 0) { clearInterval(vibeV2Interval); vibeV2Running = false; }
        }
        updateVibeV2HUD(stage);
        setTimeout(() => el.remove(), 200);
    });

    arena.appendChild(el);

    const fall = () => {
        if (!el.parentNode || !vibeV2Running) { el.remove(); return; }
        y += speed;
        el.style.top = y + 'px';
        if (y > arena.clientHeight + 20) {
            el.remove();
            if (isGood) { vibeV2Lives = Math.max(0, vibeV2Lives - 1); updateVibeV2HUD(stage); }
        } else requestAnimationFrame(fall);
    };
    requestAnimationFrame(fall);
}

function updateVibeV2HUD(stage) {
    const scoreEl = stage.querySelector('#game-score-display');
    const livesEl = stage.querySelector('#vibe-v2-lives');
    if (scoreEl) scoreEl.textContent = `Sko: ${vibeV2Score}`;
    if (livesEl) livesEl.textContent = '❤️'.repeat(vibeV2Lives) + '🖤'.repeat(3 - vibeV2Lives);
}

// ═══════════════════════════════════════════════════════════════════════════
//  GAME 3: BUBBLE WORDS — positive messages revealed on pop
// ═══════════════════════════════════════════════════════════════════════════
const BUBBLE_WORDS = ['Fò','Bèl','Espwa','Kouraj','Valè','Lapè','Lanmou','Geri','Bravo','Viktwa','Limyè','Dous','Lib','Kontan','Zanmi','Grandi','Respire'];

function initBubbleWordsGame(stage) {
    stage.innerHTML = `
        <div style="background:linear-gradient(135deg,#fd79a8 0%,#e84393 100%);border-radius:16px;overflow:hidden;user-select:none;">
            ${gameHeader('🫧 Mots ki Vole', '0 klase')}
            <div style="padding:8px 15px;color:white;font-size:0.85rem;text-align:center;opacity:0.9;">Klike sou boul yo pou dekouvri mesaj yo! 💬</div>
            <div style="position:relative;height:400px;overflow:hidden;" id="bubble-words-arena">
                <canvas id="bubble-canvas" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;"></canvas>
            </div>
            <div id="bubble-msg-banner" style="padding:10px;background:rgba(255,255,255,0.15);text-align:center;color:white;font-size:1rem;font-weight:600;min-height:40px;transition:all 0.3s;"></div>
        </div>`;

    const arena = stage.querySelector('#bubble-words-arena');
    const canvas = stage.querySelector('#bubble-canvas');
    const msgBanner = stage.querySelector('#bubble-msg-banner');
    const scoreEl = stage.querySelector('#game-score-display');
    let popped = 0;

    canvas.width = arena.clientWidth;
    canvas.height = arena.clientHeight;
    const ctx = canvas.getContext('2d');

    // Particle trails
    const particles = [];
    function animParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length-1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy; p.life -= 0.03;
            if (p.life <= 0) { particles.splice(i, 1); continue; }
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(animParticles);
    }
    animParticles();

    function spawnBubble() {
        if (!stage.querySelector('#bubble-words-arena')) return;
        const word = BUBBLE_WORDS[Math.floor(Math.random()*BUBBLE_WORDS.length)];
        const r = 35 + Math.random()*25;
        const el = document.createElement('div');
        const hue = Math.floor(Math.random()*360);
        el.style.cssText = `position:absolute;width:${r*2}px;height:${r*2}px;border-radius:50%;background:hsla(${hue},70%,70%,0.3);border:3px solid hsla(${hue},70%,80%,0.8);box-shadow:0 0 15px hsla(${hue},70%,70%,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:${r>45?'1rem':'0.85rem'};font-weight:700;color:white;text-shadow:0 1px 3px rgba(0,0,0,0.5);left:${Math.random()*85}%;animation:float ${3+Math.random()*3}s ease-in-out ${Math.random()*2}s infinite;`;
        el.textContent = word;
        el.dataset.word = word;

        let y = arena.clientHeight + r;
        el.style.top = y + 'px';
        el.style.transition = 'opacity 0.3s';

        el.addEventListener('pointerdown', function(e) {
            audioClick();
            popped++;
            if (scoreEl) scoreEl.textContent = `${popped} klase`;

            // Particle burst
            const rect = arena.getBoundingClientRect();
            const bx = e.clientX - rect.left, by = e.clientY - rect.top;
            for (let i = 0; i < 12; i++) {
                const angle = (i/12)*Math.PI*2;
                particles.push({ x:bx, y:by, vx:Math.cos(angle)*3, vy:Math.sin(angle)*3, life:1, r:4+Math.random()*4, color:`hsl(${hue},80%,65%)` });
            }

            msgBanner.textContent = `✨ ${word} — Se ou menm!`;
            this.style.transform = 'scale(1.5)';
            this.style.opacity = '0';
            clearInterval(this._rise);
            setTimeout(() => { this.remove(); }, 300);
        });

        arena.appendChild(el);

        // Rise animation
        el._rise = setInterval(() => {
            if (!el.parentNode) return;
            y -= 0.8;
            el.style.top = y + 'px';
            if (y < -r*2) { el.remove(); clearInterval(el._rise); }
        }, 20);
    }

    const spawnInterval = setInterval(() => {
        if (!stage.querySelector('#bubble-words-arena')) { clearInterval(spawnInterval); return; }
        spawnBubble();
    }, 1200);

    for (let i = 0; i < 6; i++) setTimeout(spawnBubble, i * 200);
}

// ═══════════════════════════════════════════════════════════════════════════
//  GAME 4: ZEN MEMORY — card matching with healing symbols
// ═══════════════════════════════════════════════════════════════════════════
const ZEN_CARDS = ['🌸','🌊','☀️','🌿','🦋','🌙','🌺','🌴'];

function initZenMemoryGame(stage) {
    let flipped = [], matched = [], attempts = 0, lockBoard = false;
    const PAIRS = [...ZEN_CARDS, ...ZEN_CARDS].sort(() => Math.random()-0.5);

    stage.innerHTML = `
        <div style="background:linear-gradient(135deg,#00b894 0%,#00cec9 100%);border-radius:16px;overflow:hidden;user-select:none;">
            ${gameHeader('🌸 Memwa Zen', 'Tentativ: 0')}
            <div style="padding:10px 15px;color:white;text-align:center;font-size:0.85rem;opacity:0.9;">Jwenn pè a nan chak kat — respire ant chak mouvman</div>
            <div id="memory-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:15px;max-width:420px;margin:0 auto;"></div>
            <div id="memory-msg" style="padding:10px;text-align:center;color:white;font-size:0.95rem;font-weight:600;min-height:36px;"></div>
        </div>`;

    const grid = stage.querySelector('#memory-grid');
    const scoreEl = stage.querySelector('#game-score-display');
    const msgEl = stage.querySelector('#memory-msg');

    PAIRS.forEach((emoji, idx) => {
        const card = document.createElement('div');
        card.style.cssText = `width:100%;padding-bottom:100%;position:relative;cursor:pointer;perspective:600px;`;
        card.innerHTML = `
            <div class="memory-card-inner" style="position:absolute;inset:0;transition:transform 0.5s;transform-style:preserve-3d;">
                <div style="position:absolute;inset:0;background:rgba(255,255,255,0.2);border-radius:12px;border:2px solid rgba(255,255,255,0.4);display:flex;align-items:center;justify-content:center;font-size:1.8rem;backface-visibility:hidden;">🌀</div>
                <div style="position:absolute;inset:0;background:white;border-radius:12px;border:2px solid #55efc4;display:flex;align-items:center;justify-content:center;font-size:2rem;backface-visibility:hidden;transform:rotateY(180deg);">${emoji}</div>
            </div>`;
        card.dataset.emoji = emoji; card.dataset.idx = idx;

        card.addEventListener('click', () => {
            if (lockBoard || card.classList.contains('matched') || flipped.includes(card)) return;
            audioClick();
            const inner = card.querySelector('.memory-card-inner');
            inner.style.transform = 'rotateY(180deg)';
            flipped.push(card);

            if (flipped.length === 2) {
                lockBoard = true; attempts++;
                if (scoreEl) scoreEl.textContent = `Tentativ: ${attempts}`;
                const [a, b] = flipped;
                if (a.dataset.emoji === b.dataset.emoji) {
                    [a, b].forEach(c => { c.classList.add('matched'); c.style.opacity = '0.7'; });
                    matched.push(a.dataset.emoji);
                    msgEl.textContent = `✅ Pè jwenn! ${a.dataset.emoji}`;
                    flipped = []; lockBoard = false;
                    if (matched.length === ZEN_CARDS.length) {
                        setTimeout(() => {
                            msgEl.innerHTML = `🏆 Bravo! Ou match tout kat yo an ${attempts} tentativ!<br><button onclick="window.launchGame('memory')" style="margin-top:8px;background:white;color:#00b894;border:none;padding:8px 20px;border-radius:20px;font-weight:700;cursor:pointer;">Rejwe 🔄</button>`;
                            const pts = parseInt(localStorage.getItem('zepol_points')||'0') + 15;
                            localStorage.setItem('zepol_points', pts);
                            NotificationSystem.show(`🌸 Memwa Zen konplè! +15 pwen`, 'success');
                        }, 500);
                    }
                } else {
                    msgEl.textContent = '🔄 Eseye ankò — respire...';
                    setTimeout(() => {
                        [a, b].forEach(c => { const inner = c.querySelector('.memory-card-inner'); inner.style.transform = 'rotateY(0deg)'; });
                        flipped = []; lockBoard = false;
                    }, 1000);
                }
            }
        });
        grid.appendChild(card);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
//  GAME 5: BREATH TAP — tap in sync with breathing rhythm
// ═══════════════════════════════════════════════════════════════════════════
function initBreathTapGame(stage) {
    let btScore = 0, btPhase = 'inhale', btRound = 0, btRunning = false;
    const PHASES = [
        { name: 'inhale', label: 'Respire anndan...', duration: 4000, color: '#74b9ff', emoji: '🫁' },
        { name: 'hold',   label: 'Kenbe...', duration: 4000, color: '#a29bfe', emoji: '⏸️' },
        { name: 'exhale', label: 'Lage dousman...', duration: 6000, color: '#55efc4', emoji: '🌬️' },
    ];

    stage.innerHTML = `
        <div style="background:linear-gradient(135deg,#e17055 0%,#fdcb6e 100%);border-radius:16px;overflow:hidden;user-select:none;">
            ${gameHeader('🫁 Ritm Souf', 'Sko: 0')}
            <div style="display:flex;flex-direction:column;align-items:center;padding:30px 20px;gap:20px;">
                <div id="bt-circle" style="width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,0.2);border:4px solid rgba(255,255,255,0.6);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.5s;box-shadow:0 0 40px rgba(255,255,255,0.2);">
                    <div id="bt-emoji" style="font-size:4rem;margin-bottom:5px;">🫁</div>
                    <div id="bt-label" style="color:white;font-weight:700;font-size:1.1rem;text-align:center;">Tap pou kòmanse</div>
                </div>
                <div style="display:flex;gap:8px;justify-content:center;">
                    ${PHASES.map(p => `<div id="bt-phase-${p.name}" style="padding:5px 14px;border-radius:20px;background:rgba(255,255,255,0.15);color:white;font-size:0.8rem;font-weight:600;">${p.label.split('...')[0]}</div>`).join('')}
                </div>
                <div id="bt-progress-wrap" style="width:100%;max-width:300px;height:6px;background:rgba(255,255,255,0.2);border-radius:10px;">
                    <div id="bt-progress-bar" style="height:100%;border-radius:10px;background:white;width:0%;transition:width 0.1s;"></div>
                </div>
                <div id="bt-feedback" style="color:rgba(255,255,255,0.9);font-size:0.9rem;text-align:center;min-height:24px;"></div>
            </div>
            <div style="padding:8px;background:rgba(0,0,0,0.1);text-align:center;color:rgba(255,255,255,0.7);font-size:0.78rem;">Tap sou sèk la lè w wè faz la chanje • 8 sik = +10 pwen</div>
        </div>`;

    const circle = stage.querySelector('#bt-circle');
    const emoji = stage.querySelector('#bt-emoji');
    const label = stage.querySelector('#bt-label');
    const progBar = stage.querySelector('#bt-progress-bar');
    const feedback = stage.querySelector('#bt-feedback');
    const scoreEl = stage.querySelector('#game-score-display');
    let phaseIdx = 0, phaseTimer = null, phaseStart = 0, animReq;

    function startPhase() {
        if (!stage.querySelector('#bt-circle')) return;
        const ph = PHASES[phaseIdx % PHASES.length];
        btPhase = ph.name;
        phaseStart = Date.now();

        emoji.textContent = ph.emoji;
        label.textContent = ph.label;
        circle.style.background = ph.color + '55';
        circle.style.borderColor = ph.color;
        circle.style.boxShadow = `0 0 40px ${ph.color}55`;
        if (ph.name === 'inhale') circle.style.transform = 'scale(1)';
        else if (ph.name === 'hold')  circle.style.transform = 'scale(1.15)';
        else circle.style.transform = 'scale(0.85)';

        PHASES.forEach(p => {
            const el = stage.querySelector(`#bt-phase-${p.name}`);
            if (el) el.style.background = p.name === ph.name ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)';
        });

        if (ph.name === 'inhale') { btRound++; if (btRound > 1 && btRound % 3 === 0) { btScore += 10; if(scoreEl) scoreEl.textContent = `Sko: ${btScore}`; feedback.textContent = '🌟 +10 pwen! Ou ap fè ekselan!'; setTimeout(() => feedback.textContent = '', 1500); } }

        clearTimeout(phaseTimer);
        phaseTimer = setTimeout(() => { phaseIdx++; startPhase(); }, ph.duration);
    }

    function updateProgress() {
        if (!stage.querySelector('#bt-progress-bar')) { cancelAnimationFrame(animReq); return; }
        const ph = PHASES[phaseIdx % PHASES.length];
        const elapsed = Date.now() - phaseStart;
        const pct = Math.min(100, (elapsed / ph.duration) * 100);
        progBar.style.width = pct + '%';
        animReq = requestAnimationFrame(updateProgress);
    }

    circle.addEventListener('pointerdown', () => {
        if (!btRunning) {
            btRunning = true;
            btRound = 0; btScore = 0;
            phaseIdx = 0;
            startPhase();
            updateProgress();
            audioClick();
            return;
        }
        // Tap during correct phase
        const ph = PHASES[phaseIdx % PHASES.length];
        audioClick();
        if (ph.name !== 'hold') {
            btScore += 5;
            if (scoreEl) scoreEl.textContent = `Sko: ${btScore}`;
            feedback.textContent = '✅ An kadans!';
        } else {
            feedback.textContent = '⏸️ Kenbe souf ou — pa tap';
        }
        setTimeout(() => feedback.textContent = '', 1000);
    });

    // Stop after 60 seconds
    setTimeout(() => {
        if (!stage.querySelector('#bt-circle')) return;
        clearTimeout(phaseTimer); cancelAnimationFrame(animReq); btRunning = false;
        circle.style.transform = 'scale(1)';
        label.textContent = 'Fini! 🎉';
        emoji.textContent = '🌬️';
        feedback.innerHTML = `Sko: <strong>${btScore}</strong> — Souf ou kalme w. <br><button onclick="window.launchGame('breathtap')" style="margin-top:8px;background:white;color:#e17055;border:none;padding:6px 18px;border-radius:18px;font-weight:700;cursor:pointer;font-size:0.9rem;">Rekòmanse 🔄</button>`;
        const pts = parseInt(localStorage.getItem('zepol_points')||'0') + Math.floor(btScore/5);
        localStorage.setItem('zepol_points', pts);
        NotificationSystem.show(`🫁 Ritm Souf fini! +${Math.floor(btScore/5)} pwen`, 'success');
    }, 60000);
}

// (Bubble game replaced by initBubbleWordsGame above)

export function closeActiveGame() {
    const container = document.getElementById('active-game-container');
    if (container) container.classList.add('hidden');
    const listSection = document.getElementById('games-list-section');
    if (listSection) listSection.classList.remove('hidden');
    if (vibeInterval) clearInterval(vibeInterval);
    if (vibeV2Interval) clearInterval(vibeV2Interval);
    const stage = document.getElementById('game-stage');
    if (stage) stage.innerHTML = '';
}

// Legacy stubs kept for backward compat
let vibeScore = 0;
let vibeInterval;


export function initCloudGame() {
    launchGame('clouds');
}

export function initVibeGame() {
    launchGame('vibe');
}

// Keep existing Gratitude / Breathing
let gratitudeCount = parseInt(localStorage.getItem('zepol_gratitude_count') || '0');
export function addGratitudeNote() {
    const input = document.getElementById('gratitude-text');
    const text = input.value.trim();
    if (!text) return;
    const jarBody = document.getElementById('gratitude-jar-body');
    const fill = document.getElementById('jar-fill-level');

    // Handle mini-jar in games vs main jar
    if (!jarBody) {
        if(window.NotificationSystem) window.NotificationSystem.show("Louvri bokal la anvan!", "error");
        return;
    }

    const note = document.createElement('div');
    note.className = 'gratitude-note balloon-anim';
    note.innerText = text;
    // Visual as balloon
    note.style.left = (Math.random() * 60 + 10) + '%';
    note.style.bottom = '-50px'; // start below
    
    // Add random color
    const colors = ['#ff7eb3', '#ff758c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#fa709a', '#fee140'];
    note.style.background = colors[Math.floor(Math.random() * colors.length)];
    note.style.color = 'white';
    note.style.padding = '8px 12px';
    note.style.borderRadius = '20px';
    note.style.position = 'absolute';
    note.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    note.style.transition = 'bottom 1s ease-out';
    
    jarBody.appendChild(note);
    
    setTimeout(() => {
        note.style.bottom = (gratitudeCount * 25 + 10) + 'px';
    }, 50);

    gratitudeCount++;
    localStorage.setItem('zepol_gratitude_count', gratitudeCount);
    
    if (fill) fill.style.height = Math.min(gratitudeCount * 10, 100) + '%';
    input.value = '';
    
    if (gratitudeCount >= 10) {
        setTimeout(() => {
            if(window.NotificationSystem) window.NotificationSystem.show("Felisitasyon! Bokal ou a plen ak bèl panse! 🎉", "success");
            jarBody.innerHTML = '<div style="text-align:center; padding:20px; color:white; font-size:1.5rem; font-weight:bold; background:linear-gradient(135deg, #f6d365, #fda085); border-radius:15px; width:100%; height:100%; display:flex; align-items:center; justify-content:center;">Bokal Plen! 🍯✨</div>';
            gratitudeCount = 0;
            localStorage.setItem('zepol_gratitude_count', 0);
        }, 1500);
    } else {
        if(window.NotificationSystem) window.NotificationSystem.show("Kore! Rekonesans se fòs. 😊", "success");
    }
}
