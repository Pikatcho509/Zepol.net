/**
 * AI Service for Zepòl Chatbot (Gemini API)
 * Supports Text and Image (Multimodal)
 */
export class AIService {
    static async sendMessage(userText, history = [], imageBase64 = null) {
        // API Key provided by user
        const API_KEY = "AIzaSyBDjliYyrXbs9AVQSpqA1y2oEmgsZqWfYU";
        const MODEL = "gemini-flash-latest";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

        console.log("🤖 AI Service v18.0.42 - Using model:", MODEL);

        // Construct the prompt with context
        // Construct the prompt with context
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

        const contents = [
            {
                role: "user",
                parts: [{ text: context }]
            }
        ];

        // Add history (text only for now to save tokens/bandwidth, unless we want to store images in history too)
        history.forEach(msg => {
            contents.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }] // History is text-only for simplicity
            });
        });

        // Current Message
        const currentParts = [];

        if (imageBase64) {
            // Remove header if present (e.g., "data:image/jpeg;base64,")
            const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
            currentParts.push({
                inline_data: {
                    mime_type: "image/jpeg",
                    data: cleanBase64
                }
            });
            currentParts.push({ text: userText || "Analize imaj sa a." });
        } else {
            currentParts.push({ text: userText });
        }

        contents.push({
            role: "user",
            parts: currentParts
        });

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: contents
                })
            });

            const data = await response.json();

            if (data.candidates && data.candidates.length > 0) {
                return data.candidates[0].content.parts[0].text;
            } else {
                console.error("AI Error:", data);

                // Detailed error messages
                if (data.error) {
                    const errorMsg = data.error.message || "Erè enkoni";
                    console.error("API Error Details:", {
                        message: errorMsg,
                        status: data.error.status,
                        code: data.error.code
                    });

                    // User-friendly error messages in Kreyòl
                    if (errorMsg.includes("quota") || errorMsg.includes("limit")) {
                        return "API a rive nan limit li. Tanpri eseye ankò nan kèk minit. 🙏";
                    } else if (errorMsg.includes("API key")) {
                        return "Gen yon pwoblèm ak kle API a. Kontakte administratè a.";
                    } else {
                        return `Erè: ${errorMsg}`;
                    }
                }

                return "Mwen gen yon ti pwoblèm pou m konprann. Èske w ka eseye ankò?";
            }
        } catch (error) {
            console.error("Network Error:", error);
            return "Sanble entènèt la yon ti jan dousman. Mwen toujou la pou ou. 🌿";
        }
    }
}
