/**
 * AI Service for Zepòl Chatbot (Gemini via Cloud Function proxy)
 *
 * SEKIRITE: Kle Gemini an PA nan fichye sa a ankò. Kliyan an rele yon
 * Cloud Function ("chatWithAI") ki kenbe kle a an sekrè sou sèvè a.
 * Konsa kle a pa janm ekspoze nan navigatè a / DevTools.
 */
import { app } from '../firebase-config.js';
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";

// Dwe matche ak region fonksyon an (us-central1).
const functions = getFunctions(app, 'us-central1');

export class AIService {
    static async sendMessage(userText, history = [], imageBase64 = null) {
        try {
            const chatWithAI = httpsCallable(functions, 'chatWithAI');
            const res = await chatWithAI({
                text: userText,
                history: history,
                image: imageBase64
            });
            return (res && res.data && res.data.reply) ||
                "Mwen pa byen konprann. Èske w ka eseye ankò?";
        } catch (error) {
            console.error("AI call error:", error?.code, error?.message);
            if (error?.code === 'functions/unauthenticated') {
                return "Konekte pou ou ka pale ak Asistan Zepòl la. 🌿";
            }
            if (error?.code === 'functions/resource-exhausted' ||
                /quota|limit/i.test(error?.message || '')) {
                return "Asistan an okipe kounye a. Tanpri eseye ankò nan kèk minit. 🙏";
            }
            return "Sanble gen yon ti pwoblèm ak sèvis la. Mwen toujou la pou ou. 🌿";
        }
    }
}
