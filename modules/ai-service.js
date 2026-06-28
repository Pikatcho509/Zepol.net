/**
 * AI Service for Zepòl Chatbot (Gemini API) — Text + Image (Multimodal)
 *
 * ⚠️ SEKIRITE: kle a li depi window.GEMINI_API_KEY (fichye keys.local.js,
 * ki nan .gitignore — pa janm nan git). Kle a VIZIB nan navigatè a, donk li
 * DWE restrike nan Google Cloud Console (HTTP referrer = domèn ou + API
 * restriction = Generative Language API + quota cap). Si w vle sekirite total,
 * deplase l sou backend (functions/chatWithAI deja pare pou Blaze).
 */
export class AIService {
    static async sendMessage(userText, history = [], imageBase64 = null) {
        const API_KEY = (typeof window !== 'undefined' && window.GEMINI_API_KEY) || '';
        const MODEL = "gemini-2.5-flash";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

        if (!API_KEY) {
            console.error("⚠️ GEMINI_API_KEY pa defini (keys.local.js manke?).");
            return "Asistan an pa konfigire byen kounye a. Kontakte administratè a.";
        }

        const context = `
Ou se "Zepòl", yon konpayon sante mantal ak yon zanmi ki gen anpati pou Ayisyen.
Ròl ou: Aji tankou yon sikològ ki gen bon kè. Koute pwoblèm itilizatè a san jijman, epi bay konsèy ki saj, ki senp, e ki ankourajan.
Langaj: Ou dwe pale yon Kreyòl Ayisyen estanda, kòrèk, epi ki gen tout aksan yo (è, ò). Pa itilize "franse kreyolize" si gen yon mo kreyòl natif natal (egz: itilize "lis" olye de "list", "konfimasyon" olye de "confirmation").
Ton: Chaleureux, kalm, respekte moun nan.
Brevite (TRÈ ENPÒTAN): Fè repons ou yo tou kout epi presi. Pa fè gwo paragraf long. Pale tankou w ap fè yon ti chat tou kout. Yon sèl ou de fraz jeneralman ase sof si moun nan nan gwo danje.
Si w resevwa yon foto: Analize sa w wè a. Si se yon vizaj, chèche emosyon yo epi mande kijan moun nan santi l. Si se yon objè oswa yon sèn, fè yon lyen pozitif ak lavi oswa byennèt.
Objektif: Ede moun nan santi l mwen sèl, mwens tris, epi plis espwa.
Reponn TOUJOU an Kreyòl Ayisyen.
        `;

        const contents = [{ role: "user", parts: [{ text: context }] }];

        history.forEach(msg => {
            contents.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            });
        });

        const currentParts = [];
        if (imageBase64) {
            const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
            currentParts.push({ inline_data: { mime_type: "image/jpeg", data: cleanBase64 } });
            currentParts.push({ text: userText || "Analize imaj sa a." });
        } else {
            currentParts.push({ text: userText });
        }
        contents.push({ role: "user", parts: currentParts });

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": API_KEY
                },
                body: JSON.stringify({ contents })
            });
            const data = await response.json();

            if (data.candidates && data.candidates.length > 0) {
                return data.candidates[0].content.parts[0].text;
            }

            console.error("AI Error:", data);
            const errorMsg = data.error?.message || "";
            if (/quota|limit|exhausted/i.test(errorMsg)) {
                return "API a rive nan limit li. Tanpri eseye ankò nan kèk minit. 🙏";
            } else if (/API key|API_KEY|permission|denied/i.test(errorMsg)) {
                return "Gen yon pwoblèm ak kle API a. Kontakte administratè a.";
            } else if (/overloaded|unavailable|503/i.test(errorMsg)) {
                return "Asistan an okipe kounye a. Eseye ankò nan yon ti moman. 🌿";
            }
            return "Mwen gen yon ti pwoblèm pou m konprann. Èske w ka eseye ankò?";
        } catch (error) {
            console.error("Network Error:", error);
            return "Sanble entènèt la yon ti jan dousman. Mwen toujou la pou ou. 🌿";
        }
    }
}
