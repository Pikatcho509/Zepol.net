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

// --- GAME LAUNCHER START ---

export function launchGame(type) {
    console.log(`🎮 Launching game: ${type}`);
    const container = document.getElementById('active-game-container');
    const stage = document.getElementById('game-stage');

    if (!container || !stage) {
        console.error("❌ Game container or stage not found!");
        return NotificationSystem.show("Erè: Ekran jwèt la pa pare.", "error");
    }

    container.classList.remove('hidden');
    stage.innerHTML = ''; // Clear previous

    // Hide the games list to create a "dedicated page" feel
    const listSection = document.getElementById('games-list-section');
    if (listSection) listSection.classList.add('hidden');

    if (type === 'clouds') {
        stage.innerHTML = `
            <div class="game-container clouds-container" style="height:400px; position:relative; background:linear-gradient(to bottom, #87CEEB, #E0F7FA); border-radius:12px; overflow:hidden;">
                <h3 style="position:absolute; top:10px; left:10px; z-index:10;">Nwaj Pozitif</h3>
                <div class="sun-behind" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:80px; transition:all 1s;">☀️</div>
                <div id="clouds-overlay-active" style="position:absolute; width:100%; height:100%;"></div>
            </div>
        `;
        initCloudGameInternal(document.getElementById('clouds-overlay-active'));
    } else if (type === 'vibe') {
        stage.innerHTML = `
             <div class="game-container" style="height:400px; position:relative; background:#2c3e50; border-radius:12px; overflow:hidden;">
                <div id="vibe-score-active" style="position:absolute; top:10px; right:10px; color:white; font-weight:bold; font-size:1.2rem; z-index:10;">Sko: 0</div>
                <div id="vibe-game-area-active" style="width:100%; height:100%;"></div>
                <button id="vibe-start-btn-active" class="btn-primary" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:20;">Kòmanse Jwèt</button>
            </div>
        `;
        // Delay slighty to ensure DOM is ready
        setTimeout(() => {
            const btn = document.getElementById('vibe-start-btn-active');
            if (btn) btn.onclick = () => initVibeGameInternal();
        }, 100);
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
                
                <h4 style="color: var(--primary); margin-top: 15px; margin-bottom: 15px; border-top: 1px solid #eee; padding-top:15px;">
                    <i class="fas fa-users"></i> Jwè Online kounye a
                </h4>
                <div id="online-players-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; margin-bottom: 20px;">
                    <div style="color: grey; font-size: 0.8rem; grid-column: 1/-1;">Ap chèche lòt jwè...</div>
                </div>

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
    } else if (type === 'bubble') {
        stage.innerHTML = `
            <div class="game-container" style="height:400px; position:relative; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:12px; overflow:hidden;">
                <h3 style="position:absolute; top:10px; left:10px; z-index:10; color:white;">🫧 Eclate Bulles</h3>
                <canvas id="bubble-canvas" width="600" height="400" style="width:100%; height:100%; cursor:pointer; touch-action: none;"></canvas>
            </div>
        `;
        setTimeout(() => initBubbleGame(), 100);
    } else if (type === 'gratitude') {
        // Re-use main gratitude modal or mini version? Let's use mini version
        stage.innerHTML = `
            <div class="gratitude-container glass-card" style="padding:20px;">
                <h3>🍯 Bokal Gratitid</h3>
                <p>Ekri yon bagay ou rekonesan pou li jodi a.</p>
                <div class="jar-wrapper" style="margin:20px auto; max-width:300px;">
                     <div id="gratitude-jar-body" class="jar-body">
                         <div id="jar-empty-msg" class="jar-msg">Bokal la vid...</div>
                         <div id="jar-fill-level" class="jar-fill"></div>
                     </div>
                </div>
                <div class="jar-input" style="display:flex; gap:10px;">
                    <input type="text" id="gratitude-text" placeholder="Mwen rekonesan pou..." style="flex:1; padding:10px; border-radius:8px; border:1px solid #ddd;">
                    <button class="btn-primary" onclick="window.addGratitudeNote()">Ajoute</button>
                </div>
            </div>
        `;
    }
}

function initBubbleGame() {
    const canvas = document.getElementById('bubble-canvas');
    if (!canvas) return;

    // Fix Canvas Size
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const ctx = canvas.getContext('2d');
    const bubbles = [];

    // Create bubbles
    for (let i = 0; i < 20; i++) {
        bubbles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 20 + Math.random() * 30,
            speedY: -1 - Math.random() * 2,
            color: `hsl(${Math.random() * 360}, 70%, 80%)`
        });
    }

    function animate() {
        if (!document.getElementById('bubble-canvas')) return; // Stop if removed
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bubbles.forEach((bubble) => {
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            ctx.fillStyle = bubble.color;
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.stroke();

            bubble.y += bubble.speedY;
            if (bubble.y + bubble.radius < 0) {
                bubble.y = canvas.height + bubble.radius;
                bubble.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animate);
    }

    // Pop bubbles on click
    const pop = (e) => {
        const rect = canvas.getBoundingClientRect();
        // Handle touch or mouse
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        bubbles.forEach((bubble) => {
            const dist = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);
            if (dist < bubble.radius * 1.5) { // Forgive aim
                bubble.y = canvas.height + bubble.radius;
                bubble.x = Math.random() * canvas.width;
                // NotificationSystem.show("Pop! 🫧", "info"); // Too spammy
            }
        });
    };

    canvas.addEventListener('click', pop);
    canvas.addEventListener('touchstart', pop);

    animate();
}

export function closeActiveGame() {
    const container = document.getElementById('active-game-container');
    if (container) container.classList.add('hidden');

    // Show the games list again
    const listSection = document.getElementById('games-list-section');
    if (listSection) listSection.classList.remove('hidden');

    // Cleanup intervals if any
    if (vibeInterval) clearInterval(vibeInterval);
    const stage = document.getElementById('game-stage');
    if (stage) stage.innerHTML = ''; // Full Cleanup
}

// --- INDIVIDUAL GAME LOGIC (Internal) ---

function initCloudGameInternal(area) {
    if (!area) return;
    area.innerHTML = '';
    const cloudEmojis = ['☁️', '🌩️', '⛈️', '🌨️'];
    for (let i = 0; i < 15; i++) { // More clouds for bigger screen
        const cloud = document.createElement('div');
        cloud.className = 'cloud-item';
        cloud.innerText = cloudEmojis[Math.floor(Math.random() * cloudEmojis.length)];
        cloud.style.position = 'absolute'; // Ensure absolute
        cloud.style.left = Math.random() * 80 + 10 + '%';
        cloud.style.top = Math.random() * 80 + 10 + '%';
        cloud.style.fontSize = (Math.random() * 40 + 40) + 'px';
        cloud.style.cursor = 'pointer';
        cloud.style.transition = 'all 0.5s ease';

        cloud.onclick = function () {
            this.style.opacity = '0';
            this.style.transform = 'scale(2) translateY(-50px)';
            setTimeout(() => {
                this.remove();
                if (area.querySelectorAll('.cloud-item').length === 0) {
                    NotificationSystem.show("Solèy la ap briye! Ou fò! ☀️", "success");
                    closeActiveGame();
                }
            }, 500);
        };
        area.appendChild(cloud);
    }
}

// Global scope for DLS active render to be accessible - REMOVED, using main.js global

// Vibe Game logic
let vibeScore = 0;
let vibeInterval;

function initVibeGameInternal() {
    const area = document.getElementById('vibe-game-area-active');
    const startBtn = document.getElementById('vibe-start-btn-active');
    if (!area) return;

    vibeScore = 0;
    document.getElementById('vibe-score-active').innerText = `Sko: ${vibeScore}`;
    startBtn.style.display = 'none';

    if (vibeInterval) clearInterval(vibeInterval);

    // Improved spawn logic
    vibeInterval = setInterval(() => {
        if (!document.getElementById('vibe-game-area-active')) {
            clearInterval(vibeInterval);
            return;
        }
        spawnVibeInternal(area);
    }, 800);

    setTimeout(() => {
        clearInterval(vibeInterval);
        if (startBtn) {
            startBtn.style.display = 'inline-block';
            startBtn.innerText = 'Re-kòmanse';
        }
        NotificationSystem.show(`Jwèt fini! Sko: ${vibeScore}. ✨`, "success");
    }, 30000); // 30s game
}

function spawnVibeInternal(area) {
    const item = document.createElement('div');
    item.className = 'vibe-item';
    const vibes = ['✨', '❤️', '🦋', '🌟', '🍀', '🌈', '☀️', '💖'];
    item.innerText = vibes[Math.floor(Math.random() * vibes.length)];
    item.style.position = 'absolute';
    const x = Math.random() * (area.clientWidth - 40);
    item.style.left = `${x}px`;
    item.style.top = '-50px';
    item.style.fontSize = '30px';
    item.style.cursor = 'pointer';

    // Animation via JS to ensure it works in this dynamic container
    let y = -50;
    const speed = 2 + Math.random() * 3;

    function fall() {
        if (!item.parentNode) return; // Stop if removed
        y += speed;
        item.style.top = `${y}px`;
        if (y > area.clientHeight) {
            item.remove();
        } else {
            requestAnimationFrame(fall);
        }
    }
    requestAnimationFrame(fall);

    item.onclick = (e) => {
        e.stopPropagation(); // Prevent issues
        vibeScore += 10;
        const scoreEl = document.getElementById('vibe-score-active');
        if (scoreEl) scoreEl.innerText = `Sko: ${vibeScore}`;

        // Pop effect
        item.style.transform = "scale(1.5)";
        item.style.opacity = "0";
        setTimeout(() => item.remove(), 200);
    };

    // Touch support
    item.ontouchend = item.onclick;

    area.appendChild(item);
}


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
