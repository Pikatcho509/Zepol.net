/**
 * Zepòl — Cloud Functions
 *
 * chatWithAI: yon proxy ki rele Gemini SOU SÈVÈ A. Kle Gemini an rete
 * nan Google Secret Manager (GEMINI_KEY) — li PA JANM rive nan navigatè a,
 * donk pèsonn pa ka vòlè l nan DevTools (sa ki te lakòz sispansyon an).
 *
 * Pwoteksyon kont fwod:
 *   1. Egzije otantifikasyon Firebase (itilizatè konekte sèlman).
 *   2. App Check (aktive `enforceAppCheck: true` lè w fin konfigire l).
 *   3. Limit gwosè antre + limit istwa.
 */

const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

// Kle a li nan Secret Manager — pa nan kòd la.
const GEMINI_KEY = defineSecret("GEMINI_KEY");

// gemini-2.5-flash konfime k ap travay ak kle a (2026-06).
const MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
Ou se "Zepòl", yon konpayon sante mantal ak yon zanmi ki gen anpati pou Ayisyen.
Ròl ou: Aji tankou yon sikològ ki gen bon kè. Koute pwoblèm itilizatè a san jijman, epi bay konsèy ki saj, ki senp, e ki ankourajan.
Langaj: Ou dwe pale yon Kreyòl Ayisyen estanda, kòrèk, epi ki gen tout aksan yo (è, ò). Pa itilize "franse kreyolize" si gen yon mo kreyòl natif natal (egz: itilize "lis" olye de "list", "konfimasyon" olye de "confirmation").
Ton: Chaleureux, kalm, respekte moun nan.
Brevite (TRÈ ENPÒTAN): Fè repons ou yo tou kout epi presi. Pa fè gwo paragraf long. Pale tankou w ap fè yon ti chat tou kout. Yon sèl ou de fraz jeneralman ase sof si moun nan nan gwo danje.
Si w resevwa yon foto: Analize sa w wè a. Si se yon vizaj, chèche emosyon yo epi mande kijan moun nan santi l. Si se yon objè oswa yon sèn, fè yon lyen pozitif ak lavi oswa byennèt.
Objektif: Ede moun nan santi l mwen sèl, mwens tris, epi plis espwa.
Reponn TOUJOU an Kreyòl Ayisyen.
`;

exports.chatWithAI = onCall(
  {
    secrets: [GEMINI_KEY],
    region: "us-central1",
    // Lè App Check fin konfigire, chanje sa a an true pou plis sekirite.
    enforceAppCheck: false,
    cors: true,
  },
  async (request) => {
    // 1. Egzije itilizatè konekte.
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Konekte pou itilize asistan an.");
    }

    // 2. Valide + limite antre yo.
    const text = (request.data && request.data.text ? String(request.data.text) : "").slice(0, 5000);
    const image = request.data && request.data.image ? String(request.data.image) : null;
    const history = Array.isArray(request.data && request.data.history)
      ? request.data.history.slice(-20)
      : [];

    if (!text && !image) {
      throw new HttpsError("invalid-argument", "Mesaj la vid.");
    }

    // 3. Konstwi demann Gemini an (prompt sistèm lan rete sou sèvè a).
    const contents = [{ role: "user", parts: [{ text: SYSTEM_PROMPT }] }];

    history.forEach((m) => {
      if (m && typeof m.text === "string") {
        contents.push({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text.slice(0, 5000) }],
        });
      }
    });

    const parts = [];
    if (image) {
      const clean = image.split(",")[1] || image;
      parts.push({ inline_data: { mime_type: "image/jpeg", data: clean } });
      parts.push({ text: text || "Analize imaj sa a." });
    } else {
      parts.push({ text });
    }
    contents.push({ role: "user", parts });

    // 4. Rele Gemini ak kle a (header sekrè, pa nan URL).
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
    let data;
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_KEY.value(),
        },
        body: JSON.stringify({ contents }),
      });
      data = await resp.json();
    } catch (e) {
      console.error("Gemini call failed:", e && e.message);
      throw new HttpsError("unavailable", "Sèvis AI a pa disponib kounye a.");
    }

    if (data && data.candidates && data.candidates.length > 0) {
      const reply = data.candidates[0].content.parts[0].text;
      return { reply };
    }

    const errMsg = (data && data.error && data.error.message) || "";
    console.error("Gemini error:", errMsg);
    if (/quota|limit/i.test(errMsg)) {
      return { reply: "API a rive nan limit li. Tanpri eseye ankò nan kèk minit. 🙏" };
    }
    return { reply: "Mwen gen yon ti pwoblèm pou m konprann. Èske w ka eseye ankò?" };
  }
);
