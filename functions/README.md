# Zepòl Cloud Functions — AI Proxy

`chatWithAI` se yon proxy ki rele Gemini **sou sèvè a**. Kle Gemini an rete nan
Google Secret Manager (`GEMINI_KEY`) — li **pa janm** ekspoze nan navigatè a.

## Konfigirasyon (yon sèl fwa)

> Pwojè a dwe sou plan **Blaze** (pay-as-you-go) pou Cloud Functions + Secret Manager.
> Si pwojè a sispann, tann li reaktive anvan.

```bash
# 1. Enstale depandans yo
cd functions
npm install
cd ..

# 2. Mete kle Gemini an nan Secret Manager (l ap mande w kole kle a)
firebase functions:secrets:set GEMINI_KEY --project zepol-2c1b5

# 3. Deplwaye fonksyon an
firebase deploy --only functions --project zepol-2c1b5
```

## Test lokal (opsyonèl)

Kreye `functions/.env.local` (li deja nan .gitignore — PA commit li) :

```
GEMINI_KEY=kole_kle_a_la
```

Apre sa : `firebase emulators:start --only functions`

## Sekirite

- Fonksyon an egzije itilizatè **konekte** (Firebase Auth).
- Lè App Check fin konfigire, mete `enforceAppCheck: true` nan `index.js`.
- Pa janm mete kle a nan okenn fichye `.js` ki commit nan git.
