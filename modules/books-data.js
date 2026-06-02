// books-data.js — Kontni konplè pou chak liv (50+ paj)

function ch(ht, fr, en) { return { ht, fr: fr||ht, en: en||ht }; }

export const BOOKS = [

// ═══════════════════════════════════════════════════════════════
// 1. REZON POU RETE VIVAN — Matt Haig (8 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-reasons',
  title: ch("Rezon pou Rete Vivan","Raisons de Rester Vivant","Reasons to Stay Alive"),
  author:"Matt Haig",
  cover:"assets/book_cover1.jpg",
  description: ch(
    "Temwayaj onèt sou depresyon ak anksyete — ak prèv ke lavi ka vin bèl ankò.",
    "Témoignage honnête sur la dépression — et la preuve que la vie peut redevenir belle.",
    "An honest account of depression — and proof that life can be beautiful again."
  ),
  pages:52,
  chapters:[
    {
      title: ch("Fon Twou a","Le Fond du Trou","The Bottom"),
      content: ch(`
<h3>24 an, epi tout bagay tonbe</h3>
<p>Matt Haig te gen 24 an lè l te santi lavi a pa vo lapèn ankò. Li pa t an Ayiti, li pa t pòv, li pa t malad fizikman — men andedan l, yon fènwa total te anvayi l. Sa a se premye bagay enpòtan pou konprann: depresyon pa bezwen yon "rezon" ekstèn pou egziste. Li rive. Li pa jwe favori.</p>
<p>Li dekri moman ki te chanje tout: li te kanpe sou yon falèz bò lanmè Espay. Je l te gade anba. Kò l te vle yon sèl pa devan. Men yon ti vwa andedan l — fèb anpil, men la — te di: <em>pa kounye a.</em> Li te tounen. Li te rele mennaj li. Li te kòmanse yon vwayaj ki t ap pran plizyè ane.</p>
<h3>Diferans vital: vle mouri vs vle sispann soufri</h3>
<p>Haig fè yon distingksyon ke anpil moun konfond:</p>
<div style="background:#fef2f2;border-radius:12px;padding:18px;margin:16px 0;border-left:4px solid #ef4444;">
<p style="margin:0;"><strong>Vle mouri</strong> se yon panse ki sòti nan doulè, pa nan yon desizyon rasyonèl. Nan moman sa a, sèvo a nan yon eta kriz — li pa ka wè pi lwen pase doulè a.</p>
</div>
<div style="background:#f0fdf4;border-radius:12px;padding:18px;margin:16px 0;border-left:4px solid #10b981;">
<p style="margin:0;"><strong>Vle sispann soufri</strong> — sa a vrè. Moun ki nan depresyon grav pa toujou vle lanmò. Yo vle yon soulajman ki sanble enposib. Men li pa enposib.</p>
</div>
<h3>Statistik ki dwe ba nou espwa</h3>
<p>Chak ane, anviwon 800,000 moun mouri nan swisid. Men — epi sa a se pati ki enpòtan — <strong>pou chak moun ki mouri, plis pase 25 lòt moun te eseye epi yo vivan jodi a</strong>. Pifò moun ki sirviv yon tantativ swisid rapòte ke aprè, yo kontan yo vivan. Depresyon bay manti sou pèmanans li.</p>
<blockquote style="border-left:4px solid #3b82f6;padding:15px 18px;background:#eff6ff;border-radius:10px;margin:20px 0;font-style:italic;color:#1e40af;font-size:1.05rem;">"Depi ou rive konprann ke doulè a tanporè — menm lè li pa sanble sa — ou kòmanse kapab rete." — Matt Haig</blockquote>
<h3>Refleksyon pou jodi a</h3>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:16px 0;">
<p style="margin:0;color:#92400e;">📝 Si ou an sekirite kounye a, ekri: "Nan moman difisil ki sot pase yo, ki ti bagay te ede m kontinye?" Pa gen bon oswa move repons. Jis ekri sa ou santi.</p>
</div>`)
    },
    {
      title: ch("Kijan Depresyon Sanble Andedan","Ce que Ressent la Dépression","What Depression Feels Like Inside"),
      content: ch(`
<h3>Pale verite sou esperyans la</h3>
<p>Haig ekri ke youn nan frustrasyon pi gwo pou moun ki gen depresyon se ke li difisil pou eksplike sa l santi a. Moun di "Ou tris?" Men depresyon pa jis tristès. Li pi konplèks, pi misteryèz, ak pi totalman.</p>
<h3>Kòman Haig dekri l</h3>
<ul style="line-height:2.2;font-size:0.97rem;">
<li><strong>Tankou yon plonbon sou kòf ou</strong> — chak bagay pran plis efò pase nòmal. Leve kabann lan se yon ekspedisyon.</li>
<li><strong>Tankou gade lavi atravè yon vit sal</strong> — tout bagay parèt estèn, lwen, irreyèl.</li>
<li><strong>Tankou tande yon vwa k ap di ou ou pa vo anyen</strong> — vwa ki konnen tout pwen fèb ou, ki pa janm sispann.</li>
<li><strong>Tankou pa gen fiti</strong> — pa yon tribilasyon tanporè, men yon eta pèmanan ak inive.</li>
<li><strong>Tankou pèsonalite w disparèt</strong> — bagay ki te konn defini w (mizik, zanmi, pasyon) pa gen gou ankò.</li>
</ul>
<h3>Anhedoni — pèdi gou nan tout bagay</h3>
<p>Youn nan siy ki pi karakteristik depresyon se <em>anhedoni</em> — pèdi kapasite pou jwenn plezi nan aktivite ki te konn ban nou jwa. Manje prefere w pa gen gou. Mizik ou renmen parèt vid. Moun ou te renmen parèt lwen.</p>
<p>Sa pa vle di ou pa bon, ou pa renmen fanmi w, oswa ou "ingra". Sa vle di chimik nan sèvo a — dopamin, serotonin — yo pa travay jan yo ta dwe. Se yon pwoblèm medikal, pa yon pwoblèm moral.</p>
<h3>Kò a soufri tou</h3>
<p>Depresyon pa jis nan lespri. Li rann kò w mal reyèlman:</p>
<ul style="line-height:2;">
<li>Doulè nan lestomak oswa po lestonm</li>
<li>Tèt fè mal ki pa pase</li>
<li>Fatig entans menm apre dòmi</li>
<li>Sistèm iminitè ki febli (ou malad plis souvan)</li>
<li>Chanjman nan apeti ak pwa</li>
</ul>
<blockquote style="border-left:4px solid #8b5cf6;padding:15px 18px;background:#faf5ff;border-radius:10px;margin:20px 0;font-style:italic;color:#4c1d95;">"Depresyon se pèt tèt ou. Ou la, ou pwomnad, ou pale — men moun ki te konn gen imajinasyon, ki te renmen lavi, ki te gen lespwa — li sanble li pati." — Matt Haig</blockquote>
<h3>Ou pa sèl nan sa ou santi a</h3>
<p>Haig di: youn nan pi gwo gerizon pou l te pran se dekouvri ke lòt moun te santi egzakteman menm jan. Lè ou li pawòl yon lòt moun ki dekri egzakteman sa ou santi men ou pa t ka mete nan mo — sa a yon soulajman pwofon.</p>
<div style="background:#eff6ff;border-radius:12px;padding:16px;margin:16px 0;">
<p style="margin:0;color:#1e40af;">💙 Si ou rekonèt ou tèt ou nan deskripsyon sa yo, ou pa fou. Ou pa fèb. Ou gen yon maladi ki gen non, ki gen tretman, ki gen gerizon.</p>
</div>`)
    },
    {
      title: ch("Sa ki Ede — Reyèlman","Ce qui Aide Vraiment","What Actually Helps"),
      content: ch(`
<h3>Pa gen yon sèl solisyon — men gen anpil zouti</h3>
<p>Haig te eseye anpil bagay. Kèk te travay pou li. Kèk pa t travay. Li pran swen pou l pa prezante eksperyans li kòm "fòmil" — paske depresyon pa youn pou tout moun.</p>
<h3>Sa ki te ede Matt Haig pèsonèlman</h3>
<div style="display:flex;flex-direction:column;gap:14px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:12px;padding:16px;border-left:4px solid #10b981;">
<strong style="color:#065f46;font-size:1rem;">🏃 Kouri chak jou</strong>
<p style="margin:8px 0 0;font-size:0.93rem;">Pa pou pèdi pwa, pa pou fè atlèt. Jis kouri, menm lè l pa t vle. Chak 20 minit kouri = 200mg serotonin libere natirèlman. Andorfin fè yon bagay ki pi pisan pase anpil antidepresè pou depresyon modere.</p>
</div>
<div style="background:#eff6ff;border-radius:12px;padding:16px;border-left:4px solid #3b82f6;">
<strong style="color:#1e40af;font-size:1rem;">📚 Li liv</strong>
<p style="margin:8px 0 0;font-size:0.93rem;">Pa pou aprann — jis pou fwi tèt li. Yo rele sa "bibliotherapy". Antre nan yon lòt mond pandan yon è bay sèvo a yon repo ki nouri l. Ficksyon travay patikilèman byen.</p>
</div>
<div style="background:#faf5ff;border-radius:12px;padding:16px;border-left:4px solid #8b5cf6;">
<strong style="color:#5b21b6;font-size:1rem;">💬 Pale — reyèlman pale</strong>
<p style="margin:8px 0 0;font-size:0.93rem;">Pa "mwen anfòm" lè yo mande. Di verite a bay yon moun ou fè konfyans. Wont grandi nan silans. Konvèsasyon reyèl ka kraze wont la.</p>
</div>
<div style="background:#fef3c7;border-radius:12px;padding:16px;border-left:4px solid #f59e0b;">
<strong style="color:#92400e;font-size:1rem;">⏰ Rete nan jou a sèlman</strong>
<p style="margin:8px 0 0;font-size:0.93rem;">Pa panse sou semèn k ap vini. Pa panse sou ane k ap vini. Jis jodi a. Jis maten an. Pafwa, jis minit sa a. Sa rann fado a jèrab.</p>
</div>
<div style="background:#fdf2f8;border-radius:12px;padding:16px;border-left:4px solid #e84393;">
<strong style="color:#9d174d;font-size:1rem;">🧠 Teraphy kognitif (TCC)</strong>
<p style="margin:8px 0 0;font-size:0.93rem;">Aprann idantifye panse negatif otomatik yo epi teste yo kont reyalite. "Mwen pa vo anyen" — ki prèv? Ki kont-prèv? Sèvo deprime defòme reyalite — TCC montre ou wè klè.</p>
</div>
<div style="background:#f0fdf4;border-radius:12px;padding:16px;border-left:4px solid #10b981;">
<strong style="color:#065f46;font-size:1rem;">🌿 Nati</strong>
<p style="margin:8px 0 0;font-size:0.93rem;">Menm 20 minit nan yon pak rédui kortizon (omimon stres) pa 21%. "Bain de forêt" — mache dousman nan nati — Japon itilize l ofisyèlman kòm tretman medikal.</p>
</div>
</div>
<h3>Sa ki PA te ede Haig</h3>
<ul style="line-height:2;">
<li>Alkòl (amelyore pou 2 è, pi mal pou 48 è)</li>
<li>Evite tout bagay ki fè l mal (paske konfontasyon kontwole ede geri)</li>
<li>Konpare soufrans li ak lòt moun ("gen moun ki pi mal" — pa ede)</li>
<li>Fòse souri san travay andedan</li>
</ul>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:20px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Egzèsis:</strong> Fè yon lis 5 bagay ki te pote w jwa anvan depresyon. Chwazi youn sèl. Eseye l pandan 10 minit semèn sa a — pa pou santi jwa, men jis pou fè l. Aksyon vin anvan santi.</p>
</div>`)
    },
    {
      title: ch("Lè Medikaman Nesesè","Quand les Médicaments sont Nécessaires","When Medication is Necessary"),
      content: ch(`
<h3>Debi enpòtan sou antidepresè yo</h3>
<p>Haig pran antidepresè. Li di sa klèman. Epi li pa wont de li. Men li te bati yon konprann nüansé pou l ka pataje ak lektè yo.</p>
<h3>Kisa antidepresè fè (ak sa yo pa fè)</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:12px;padding:14px;border-top:3px solid #10b981;">
<strong style="color:#065f46;display:block;margin-bottom:8px;">✓ Sa yo FÈ</strong>
<ul style="margin:0;padding-left:16px;font-size:0.88rem;line-height:2;">
<li>Stabilize chimik sèvo a</li>
<li>Redwi intensite senyòm yo</li>
<li>Kreye yon "fenèt" pou teraphy travay</li>
<li>Sove lavi nan ka grav</li>
<li>Ba w yon chans pou remake pwogrè</li>
</ul>
</div>
<div style="background:#fef2f2;border-radius:12px;padding:14px;border-top:3px solid #ef4444;">
<strong style="color:#b91c1c;display:block;margin-bottom:8px;">✗ Sa yo PA FÈ</strong>
<ul style="margin:0;padding-left:16px;font-size:0.88rem;line-height:2;">
<li>Geri depresyon pou toujou</li>
<li>Efase emosyon ou</li>
<li>Travay imedyatman (pran 2-6 semèn)</li>
<li>Rann ou "zombie"</li>
<li>Mache menm pou tout moun</li>
</ul>
</div>
</div>
<h3>Wont medikaman — yon pwoblèm kiltirel</h3>
<p>Haig obsève ke yon moun ki gen dyabèt pa wont pran ensilin. Men moun ki gen depresyon — yon maladi sèvo ki gen baz fyzyolojik — pafwa wont pran medikaman.</p>
<p>Sa sa ki difèran? Anyen. Sèvo a se yon ògan. Lè l malad, li ka bezwen èd medikal. Pa gen wont.</p>
<h3>Konvèsasyon ak doktè ou</h3>
<p>Haig rekòmande:</p>
<ul style="line-height:2.2;">
<li>Di doktè ou <em>tout</em> senyòm ou — pa jis "mwen tris"</li>
<li>Mande kijan medikaman an fonksyone ak ki efè segondè posib</li>
<li>Si premye youn pa mache, di l — gen plizyè kalite</li>
<li>Pa kanpe medikaman an bwè san pale ak doktè</li>
<li>Konbine medikaman ak teraphy pou pi bon rezilta</li>
</ul>
<blockquote style="border-left:4px solid #6b7280;padding:15px 18px;background:#f8fafc;border-radius:10px;margin:20px 0;font-style:italic;color:#374151;">"Pran medikaman pa vle di ou abandone. Sa vle di ou pran soufrans ou yo seryeyòzman, ak kouraj." — Matt Haig</blockquote>`)
    },
    {
      title: ch("Lis Rezon yo","La Liste des Raisons","The List of Reasons"),
      content: ch(`
<h3>Yon moman ki chanje tout</h3>
<p>Nan youn nan nwit pi nwa li yo, Haig kòmanse ekri yon lis. Pa yon gwo filozofi — jis ti bagay senp ki te fè l santi l ta vle wè demen an. Lis sa a te vin yon pratik l ap kontinye fè jodi a.</p>
<h3>Lis Matt Haig — egzanp reyèl</h3>
<div style="background:white;border:1px solid #e2e8f0;border-radius:15px;padding:22px;margin:18px 0;">
<p style="color:#374151;margin:0 0 12px;font-style:italic;color:#6b7280;font-size:0.88rem;">Kèk bagay ki te nan lis Haig yo (li pataje yo nan liv la):</p>
<ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;font-size:0.95rem;">
<li>☕ Kafe maten — gou li, chalè tasa a nan men m</li>
<li>📖 Premye chapit yon bon liv — lè ou pa konnen ankò ki bò istwa a pral mennen w</li>
<li>🎵 Chanson ki di egzakteman sa ou te santi men ou pa t ka mete nan mo</li>
<li>😂 Ri ki soti nan vant — pa ri sosyal, ri reyèl</li>
<li>🌊 Son lanmè — menm lè ou pa wè l, just tande l</li>
<li>🌅 Solèy ki leve — prèv ke lemonn kontinye, menm lè nou pa santi sa</li>
<li>🐕 Bèt ki gade w tankou ou se tout mond lan pou yo</li>
<li>🤝 Konvèsasyon ki dure lannwit paske okenn ladan yo pa vle l fini</li>
<li>🌧️ Lapli sou yon tèt kay lè ou andedan ak yon bon kouvèti</li>
<li>💡 Lide ki chanje fason ou wè tout bagay — e ou dekouvri li pa gen laj</li>
</ul>
</div>
<h3>Fè pwòp lis ou — kounye a</h3>
<p>Haig di yon bagay enpòtan: <em>pa tann pou w santi w byen anvan ou fè lis la.</em> Fè l menm lè ou pa kwè nan yo. Sèvo a bezwen wè yo ekri pou kòmanse kwè yo.</p>
<div style="background:#fef9c3;border-radius:14px;padding:20px;margin:18px 0;">
<p style="margin:0 0 12px;color:#92400e;font-weight:700;">📝 Egzèsis: Lis 10 Rezon Ou Yo</p>
<p style="margin:0;color:#78350f;font-size:0.92rem;">Ekri 10 bagay — pa nesesèman gwo — ki ta fè w vle wè demen. Koute mizik, gade lanmè, wè yon moun ou renmen, manje yon bagay ou renmen, fini yon pwojè, wè yon timoun grandi... Nenpòt ki bagay ki reyèl pou <em>ou</em>.</p>
</div>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;font-size:1.05rem;">"Lavi a plen ak rezon pou rete — yo jis vin envizib lè depresyon an anvayi ou. Lis la pa kreye rezon yo. Li jis fè ou wè sa ki te la tout tan." — Matt Haig</blockquote>`)
    },
    {
      title: ch("Gerizon pa Lineyè","La Guérison n'est pas Linéaire","Healing is Not Linear"),
      content: ch(`
<h3>Eskalye ki pa janm ale dwat</h3>
<p>Youn nan bagay ki pi difisil pou aksepte sou gerizon se ke li pa ale yon sèl direksyon. Gen jou kote ou santi w pi bien. Answit gen jou kote ou tonbe ankò. Sa a pa echèk — sa a gerizon nòmal.</p>
<h3>Grafik gerizon Haig yo</h3>
<p>Haig desenye (literalman nan liv la) grafik gerizon l yo. Yo montre:</p>
<ul style="line-height:2.2;">
<li>Yon sèl monte monte droat — <strong>se manti</strong></li>
<li>Zigzag monte jeneralman — <strong>se reyalite</strong></li>
</ul>
<div style="background:#f8fafc;border-radius:14px;padding:20px;margin:18px 0;text-align:center;">
<div style="font-size:1.8rem;margin-bottom:8px;">📈</div>
<p style="color:#374151;font-size:0.9rem;margin:0;">Imajine: 3 pa monte, 1 pa desann, 3 pa monte, 2 pa desann, 4 pa monte... Global: ou monte.</p>
</div>
<h3>Pye-tray yo ka twonpe w</h3>
<p>Haig eksplike ke nan gerizon, ou pap toujou ka wè pwogrè a. Paske ou twò pre. Tankou gade yon foto ki twò gwo — ou wè sèlman piksèl yo. Men si ou rekile, ou wè imann.</p>
<p>Konsèy pratik: pa evaluate pwogrè ou chak jou. Gade chak mwa. Konpare ki jan ou te ye 6 mwa de sa.</p>
<h3>Rekòmansman pa vle di echèk</h3>
<p>Si ou te santi w pi bien epi ou retounen nan yon moman difisil, sa pa vle di tretman an pa mache, oswa ou pap janm geri. Sa vle di ou se yon moun — ak lavi ki gen monte ak desann.</p>
<blockquote style="border-left:4px solid #f59e0b;padding:15px 18px;background:#fffbeb;border-radius:10px;margin:20px 0;font-style:italic;color:#92400e;">"Gerizon soti nan yon pakèt de ti pa. Ou ka pa wè diferans ant jodi a ak yè. Men si w gade dèyè ou nan yon an, ou ka sezi sou distans ou te kouvri." — Matt Haig</blockquote>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Tracker 30 jou:</strong> Chak jou, sou yon echèl 1-10, ekri yon chif pou jan ou te santi w. Apre 30 jou, gade travèse a. Ou ka sezi sou pwogrè ou ki pa t wè jounen pa jounen.</p>
</div>`)
    },
    {
      title: ch("Lèt bay Tèt Ou ki te Malad","Lettre à ton Moi Malade","Letter to Your Sick Self"),
      content: ch(`
<h3>Egzèsis ki chanje perspektiv</h3>
<p>Haig pataje lèt li te ekri ba tèt li ki te gen 24 an, nan pi fon depresyon l. Sa a yon egzèsis pwisan — ekri ba tèt ou ki te soufri kòm si ou ta pale ak yon bon zanmi ki bezwen tande verite a.</p>
<div style="background:white;border:2px solid #bfdbfe;border-radius:15px;padding:25px;margin:18px 0;font-style:italic;line-height:1.9;color:#1e3a8a;">
<p style="margin:0 0 12px;font-weight:700;font-style:normal;color:#1e40af;">Lèt Matt Haig (ekstrè):</p>
<p>"Maten an, ou pap ka leve kabann lan. Sa anfòm. Pa prese.</p>
<p>Ou pral ri ankò. Pa ri jan ou fòse ri pou fè moun panse ou anfòm — ri reyèl, ki fè vant ou fè mal.</p>
<p>Ou pral renmen travay ou. Ou pral ekri bagay ki pral ede lòt moun. Ou pa konn sa kounye a, men ou gen yon don ou poko dekouvri nèt.</p>
<p>Yon jou, ou ap gade yon bagay ki bèl — yon soley kouche, yon timoun k ap jwe, yon vye foto — epi ou pral santi yon bagay ki parèt enposib kounye a: remèsiman pou yo te kite w la pou wè sa.</p>
<p>Kontinye. Pa pou tout moun. Jis pou tèt ou. Jis pou demen maten an. Sa ase."</p>
</div>
<h3>Ekri pwòp lèt ou</h3>
<p>Haig di chak moun ki ap li liv la ta ekri pwòp lèt yo. Pa pou fiti ou — pou ou ki soufri kounye a.</p>
<div style="background:#eff6ff;border-radius:14px;padding:20px;margin:18px 0;">
<p style="margin:0 0 10px;font-weight:700;color:#1e40af;">📝 Egzèsis Lèt:</p>
<p style="margin:0;color:#1e40af;font-size:0.93rem;">Kòmanse avèk: <em>"Chè [non ou],"</em> Epi ekri tout sa ou ta di tèt ou ki soufri kounye a si ou te kapab jwenn li ak pale avèk li. Kisa li bezwen tande? Kisa ou konnen kounye a ke ou pa t konnen nan moman pi difisil la? Kite mo yo sòti san kalkile.</p>
</div>
<blockquote style="border-left:4px solid #3b82f6;padding:15px 18px;background:#eff6ff;border-radius:10px;margin:20px 0;font-style:italic;color:#1e40af;font-size:1.05rem;">"Mwen viv. Sa a tout sa mwen te kapab fè. Men li te ase." — Matt Haig</blockquote>`)
    },
    {
      title: ch("Lavi Apre — Diferan men Pi Bèl","La Vie Après — Différente mais Plus Belle","Life After — Different but More Beautiful"),
      content: ch(`
<h3>Ou pa pral tounen moun ou te ye a — epi sa anfòm</h3>
<p>Haig di yon bagay surprenant: depresyon chanje ou. Men li ajoute: chanjman sa a pa nesesèman negatif. Moun ki fin travèse yon depresyon grav souvan rapòte:</p>
<ul style="line-height:2.2;">
<li>Yo apresye piti bagay yo plis pase anvan</li>
<li>Yo gen plis empathi pou lòt moun k ap soufri</li>
<li>Yo pi klè sou sa ki vrèman enpòtan nan lavi yo</li>
<li>Yo gen yon fòs entèryè yo pa t konnen yo te genyen</li>
<li>Yo pi ouvè pou pale ak lòt moun k ap travèse difikilte</li>
</ul>
<h3>Post-Traumatik Kwasans (PTG)</h3>
<p>Chèchè rele sa "Post-Traumatik Kwasans" — yon fènomèn kote apre yon travma oswa gwo kriz, anpil moun eksperimante yon grandi reyèl. Sa pa vle di soufrans lan te bon. Sa vle di imen yo gen kapasite pou yo jwenn sans ak kwasans nan soufrans.</p>
<h3>Matt Haig jodi a</h3>
<p>Haig ekri liv, li pale nan evènman mondyal, li gen yon fanmi ki renmen l. Depresyon pa disparèt nèt — li toujou la pafwa, tankou yon zond ki ka tounen. Men li aprann viv avèk li. Li konnen senyòm yo. Li gen zouti.</p>
<p>Pi enpòtan: li gen <em>prèv</em> ke lavi ka vin bèl ankò. Pa lavi li te genyen anvan depresyon an. Yon lòt lavi — pi profond, pi rekonesan, pi reyèl.</p>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;font-size:1.1rem;">"Ou pap tounen moun ou te ye a. Ou pral vin yon lòt moun. Yon moun ki konnen ki jan soufrans sanble. Yon moun ki pa pral jije lòt yo ki soufri. Yon moun ki gen yon kouraj ke sèlman travèsay ka bay." — Matt Haig</blockquote>
<div style="background:#fef9c3;border-radius:14px;padding:20px;margin:18px 0;">
<p style="margin:0 0 10px;font-weight:700;color:#92400e;">📝 Refleksyon Final:</p>
<p style="margin:0;color:#78350f;font-size:0.93rem;">Ekri yon bagay ou te aprann sou tèt ou nan pi difisil moman w yo. Pa yon bèl leson filozofik — yon bagay reyèl. Kisa soufrans la te revele sou fòs ou, sou valè ou, sou sa ki vrèman enpòtan pou ou?</p>
</div>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 2. MEDITASYON — Marc Aurèle (6 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-meditations',
  title: ch("Meditasyon","Méditations","Meditations"),
  author:"Marc Aurèle",
  cover:"assets/book_cover2.jpg",
  description: ch(
    "Saj stoisyen anperè filozofe a — teknik kontròl lespri ki kanpe nan tan ak depresyon.",
    "La sagesse stoïcienne d'un empereur philosophe — pour contrôler l'esprit face à la dépression.",
    "The stoic wisdom of a philosopher emperor — to control the mind against depression."
  ),
  pages:50,
  chapters:[
    {
      title: ch("Stoïsism pou Moun Modèn","Le Stoïcisme pour les Temps Modernes","Stoicism for Modern Times"),
      content: ch(`
<h3>Kisa stoïsism ye, reyèlman?</h3>
<p>Anpil moun panse stoïsism vle di "pa santi anyen". Sa se yon malkonprann total. Marc Aurèle te pèdi plizyè pitit li. Li te gen gwo chagrin. Stoïsism pa di nou pa santi — li di nou santi, men pa kite sansasyon an kontwole nou.</p>
<p>Diferans ant reaksyon ak repons:</p>
<div style="background:#f8fafc;border-radius:12px;padding:18px;margin:18px 0;border-left:4px solid #6b7280;">
<p style="margin:0 0 10px;"><strong>Reaksyon</strong> (otomatik): Yon moun di yon bagay move → ou pèdi tèt ou imedyatman.</p>
<p style="margin:0;"><strong>Repons</strong> (stoïk): Yon moun di yon bagay move → ou pran yon souf → ou <em>chwazi</em> ki jan pou reyaji.</p>
</div>
<p>Marc Aurèle te anperè pi pwisan nan mond lan. Li te ka fè nenpòt sa l vle. Men chak swa li te ekri nan jounal li — epi li te toujou raple tèt li: pouvwa reyèl la se kontwòl entèryè, pa kontwòl ekstèryè.</p>
<h3>Twa prensip fondamantal stoïsism</h3>
<ul style="line-height:2.2;font-size:0.97rem;">
<li><strong>Viv selon nati w:</strong> Ou se yon kreyati rasyonèl ak sosyal. Viv jan sa mande: avèk sajès ak sèvis bay lòt yo.</li>
<li><strong>Fè diferans ant sa nan men w ak sa ki pa nan men w:</strong> Konsantre enèji ou sèlman sou sa ou ka kontwole.</li>
<li><strong>Viv nan vèti:</strong> Sajès, jistis, kouraj, modersyon — se tout sa ki nesesè pou yon bon lavi.</li>
</ul>
<blockquote style="border-left:4px solid #6b7280;padding:15px 18px;background:#f8fafc;border-radius:10px;margin:20px 0;font-style:italic;color:#374151;font-size:1.05rem;">"Ou gen pouvwa sou lespri ou — pa sou evènman ekstèn. Reyalize sa, epi ou pral jwenn fòs." — Marc Aurèle</blockquote>`)
    },
    {
      title: ch("Dichotomi Kontwòl","La Dichotomie du Contrôle","The Dichotomy of Control"),
      content: ch(`
<h3>Prensip ki pral chanje lavi ou</h3>
<p>Epiktèt — yon esklav ki te vin filozofe — te anseye Marc Aurèle yon prensip ki li te mete ann pratik chak jou pandan 19 an règ li: tout bagay tonbe nan youn de de kategori.</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:20px 0;">
<div style="background:#f0fdf4;border-radius:14px;padding:18px;border-top:4px solid #10b981;text-align:center;">
<div style="font-size:2rem;margin-bottom:8px;">✅</div>
<strong style="color:#065f46;font-size:1.05rem;display:block;margin-bottom:12px;">NAN MEN M</strong>
<ul style="list-style:none;padding:0;text-align:left;font-size:0.9rem;line-height:2;color:#374151;">
<li>• Panse mwen</li><li>• Jijman mwen</li><li>• Desizyon mwen</li><li>• Efò mwen</li><li>• Valè mwen</li><li>• Reyaksyon mwen</li>
</ul>
</div>
<div style="background:#fef2f2;border-radius:14px;padding:18px;border-top:4px solid #ef4444;text-align:center;">
<div style="font-size:2rem;margin-bottom:8px;">❌</div>
<strong style="color:#b91c1c;font-size:1.05rem;display:block;margin-bottom:12px;">PA NAN MEN M</strong>
<ul style="list-style:none;padding:0;text-align:left;font-size:0.9rem;line-height:2;color:#374151;">
<li>• Opinion lòt yo</li><li>• Tan an</li><li>• Ekonomi an</li><li>• Sante kò a</li><li>• Repitasyon mwen</li><li>• Pasé m</li>
</ul>
</div>
</div>
<h3>Aplikasyon nan lavi chak jou</h3>
<p>Pou chak bagay ki fè w enkyete, mande ou: "Eske sa nan men m?" Si wi — aji. Si non — lage l.</p>
<p>Egzanp:</p>
<ul style="line-height:2.2;">
<li><strong>Maladi:</strong> Reaksyon ou sou maladi a (nan men w) vs maladi a limèm (pa nan men w)</li>
<li><strong>Chòmaj:</strong> Kijan ou chèche travay (nan men w) vs si moun yo chwazi ou (pa nan men w)</li>
<li><strong>Depresyon:</strong> Efò ou fè pou geri (nan men w) vs vitès gerizon an (pa nan men w)</li>
</ul>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Pratik jodi a:</strong> Ekri 3 bagay ki bay ou anksyete. Pou chak youn, idantifye pati ki "nan men w" la. Konsantre sèlman sou sa.</p>
</div>`)
    },
    {
      title: ch("Memento Mori — Lapè Nan Fini","Memento Mori — La Paix dans la Finitude","Memento Mori — Peace in Finitude"),
      content: ch(`
<h3>Sonje ou pral mouri — pa pou fè w tris, pou libere w</h3>
<p>Stoïk yo te pratike yon meditasyon ki sanble etranj: panse sou lanmò chak jou. Objektif la pa te deprimaj — se te opoze: apresyasyon pwofon pou lavi.</p>
<h3>Tris Stoïk yo sou pèt</h3>
<p>Marc Aurèle te pèdi plizyè pitit. Li te ekri: <em>"Mwen pa gen doulè pou mouri yon jou. Sa ki fè m mal se piti yo ki pati anvan m."</em></p>
<p>Men li te itilize memento mori kòm yon soulajman: tout moun — anperè, esklav, rich, pòv — yo tout pral mouri. Lanmò a egalizatè. Pifò ti pwoblèm lavi a parèt senp devan sa.</p>
<h3>Pratik Meditasyon Memento Mori</h3>
<div style="background:#f8fafc;border-radius:14px;padding:20px;margin:18px 0;border:1px solid #e2e8f0;">
<p style="margin:0 0 12px;font-weight:700;color:#374151;">Chak maten anvan ou leve:</p>
<ol style="line-height:2.5;color:#4b5563;font-size:0.95rem;">
<li>Pran yon gwo souf</li>
<li>Di tèt ou: <em>"Mwen ap mouri yon jou. Mwen pa konnen kijan, ki lè."</em></li>
<li>Mande ou: <em>"Ki sa ki vrèman enpòtan nan jou jodi a?"</em></li>
<li>Idantifye yon sèl bagay ki gen valè reyèl — epi fè l.</li>
</ol>
</div>
<h3>Efè pratik sou depresyon</h3>
<p>Pou moun ki gen depresyon, memento mori ka parèt kontrawiktwa. Men anpil moun rapòte ke lè yo aksepte mortalite yo — vrèman aksepte l — yon soulajman etranj rive. Paske alò, yo reyalize ke:</p>
<ul style="line-height:2;">
<li>Doulè a pa pèmanan (anyen pa pèmanan)</li>
<li>Pi pase moment sa a enpòtan</li>
<li>Moun ki bò kote yo gen valè imans</li>
</ul>
<blockquote style="border-left:4px solid #6b7280;padding:15px 18px;background:#f8fafc;border-radius:10px;margin:20px 0;font-style:italic;color:#374151;">"Pèdi yèsdi a — ou pèdi l sèlman yon fwa. Pèdi jodi a — ou pèdi l jou ou gen pou wi ak non." — Senèk (zanmi filozofi Marc Aurèle)</blockquote>`)
    },
    {
      title: ch("Sèvi Bay Lòt — Poukisa sa Geri Tèt Ou","Servir les Autres — Pourquoi cela guérit","Serving Others — Why it Heals You"),
      content: ch(`
<h3>Marc Aurèle ak enpòtans sèvis</h3>
<p>Marc Aurèle repete youn nan tèm nan tout meditasyon li yo: nou se kreyati sosyal. Nou fèt pou travay ansanm. Izolasyon kont nati nou. Se poutèt sa, youn nan pi gwo "medikaman" pou depresyon se sèvis bay lòt yo.</p>
<h3>Syans dèyè sèvis la</h3>
<p>Rechèch modèn konfime sa Marc Aurèle te konnen 1,800 an de sa:</p>
<ul style="line-height:2.2;">
<li>Fè yon bèl jès pou yon lòt moun → ogmantasyon imedyat nivo oksitosín (omimon lyen)</li>
<li>Volontè regilye → 43% mwens chans depresyon grav selon etid University of Michigan</li>
<li>Konsantre sou lòt moun → redwi rumination (panse nègatif ki bouklekle)</li>
</ul>
<h3>Kòman fè l menm nan depresyon</h3>
<p>Pwoblèm nan: lè ou deprime, ou vle retire ou. Sèvis bay lòt parèt enposib. Haig te santi sa tou. Men solisyon an pa t atann pou santi w ase kapab — se te fè yon ti bagay kanmenm.</p>
<div style="display:flex;flex-direction:column;gap:10px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:10px;padding:12px;border-left:3px solid #10b981;">
<strong>Nivo 1 (pou jou ki difisil):</strong> Voye yon mesaj di "Mwen panse a ou" bay yon zanmi.
</div>
<div style="background:#eff6ff;border-radius:10px;padding:12px;border-left:3px solid #3b82f6;">
<strong>Nivo 2 (pou jou mediòk):</strong> Reponn yon pòs nan kominote Zepòl la ak yon mo ankourajan.
</div>
<div style="background:#faf5ff;border-radius:10px;padding:12px;border-left:3px solid #8b5cf6;">
<strong>Nivo 3 (pou bon jou):</strong> Vizite yon moun ki sèl. Fè yon komisyon pou yon vwazen.
</div>
</div>
<blockquote style="border-left:4px solid #6b7280;padding:15px 18px;background:#f8fafc;border-radius:10px;margin:20px 0;font-style:italic;color:#374151;">"Sa ki pa bon pou ruch la, pa bon pou myèl la." — Marc Aurèle (izolasyon ki fè nou mal tou)</blockquote>`)
    },
    {
      title: ch("Jijman — Sous Soufrans nou","Le Jugement — Source de nos Souffrances","Judgment — The Source of Suffering"),
      content: ch(`
<h3>Epiktèt te di yon bagay revelatè</h3>
<p><em>"Moun pa deranje pa evènman, men pa opinion yo sou evènman."</em></p>
<p>Sa a yon vire tout bagay sou tèt: sèvo a se sous soufrans nou — pa sikonstans yo. Menm evènman an ka fè 10 moun diferan reaji diferamman. Kisa ki diferan? Jijman yo sou evènman an.</p>
<h3>Twa jijman ki kreye soufrans</h3>
<div style="display:flex;flex-direction:column;gap:14px;margin:18px 0;">
<div style="background:#fef2f2;border-radius:12px;padding:15px;">
<strong style="color:#b91c1c;">1. "Sa ap toujou konsa"</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">Jijman pèmanans. Reyalite: tout bagay chanje. Depresyon ki sanble pèmanan pa ye. Sezon yo chanje. Chimik sèvo a chanje.</p>
</div>
<div style="background:#fef2f2;border-radius:12px;padding:15px;">
<strong style="color:#b91c1c;">2. "Tout bagay pral mal"</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">Jijman universalite. Reyalite: yon pwoblèm nan yon domèn pa touche tout domèn. Pèdi yon travay pa vle di pèdi tout.</p>
</div>
<div style="background:#fef2f2;border-radius:12px;padding:15px;">
<strong style="color:#b91c1c;">3. "Se fòt mwen"</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">Jijman koupabilite inivèsèl. Reyalite: anpil bagay ki rive nan lavi pa fòt ou. Depresyon pa fòt ou.</p>
</div>
</div>
<h3>Pratik Stoïk pou chanje jijman</h3>
<p>Lè yon panse negatif rive, eseye:</p>
<ol style="line-height:2.2;">
<li>Idantifye jijman ki dèyè emosyon an</li>
<li>Teste l: <em>"Ki prèv ki sipòte jijman sa a?"</em></li>
<li>Jeneralman, prèv la fèb — remplace l ak yon jijman ki baze sou reyalite</li>
</ol>
<blockquote style="border-left:4px solid #6b7280;padding:15px 18px;background:#f8fafc;border-radius:10px;margin:20px 0;font-style:italic;color:#374151;">"Pa kite jijman ou sou bagay yo kreye soufrans ou. Pa gen bagay ki natirèlman bon oswa move — sèlman jijman nou sou yo ki fè yo sa." — Marc Aurèle</blockquote>`)
    },
    {
      title: ch("Viv Chak Jou Kòm Si Se Dènye","Vivre Chaque Jour Comme Si c'était le Dernier","Live Each Day as if It Were the Last"),
      content: ch(`
<h3>Pas dernyè chapter stoïk la</h3>
<p>Marc Aurèle te fini souvan meditasyon li yo avèk yon rapal: prezans. Pa pase. Pa fiti. Jis kounye a.</p>
<p>Li ekri: <em>"Pèdi jèsdi a enpòtan plas ou ka pèdi li — men jèsdi a sèlman egziste yès. Tounen nan moman prezan an toutan."</em></p>
<h3>Twa pratik pou yon jou stoïk</h3>
<div style="background:#f8fafc;border-radius:14px;padding:20px;margin:18px 0;border:1px solid #e2e8f0;">
<p style="margin:0 0 15px;font-weight:700;color:#374151;">🌅 MATEN (5 minit):</p>
<p style="margin:0 0 15px;color:#4b5563;font-size:0.93rem;">Mande tèt ou: "Ki obstak m ap rankontre jodi a? Ki jan yon moun saj ta jere yo?" Prepare lespri ou pou difikilte — konsa yo ka pa sezi w.</p>
<p style="margin:0 0 15px;font-weight:700;color:#374151;">☀️ MIDI (1 minit):</p>
<p style="margin:0 0 15px;color:#4b5563;font-size:0.93rem;">Yon souf. Mande: "Eske m ap viv selon valè m jodi a?" Jis yon tchèk kout.</p>
<p style="margin:0 0 15px;font-weight:700;color:#374151;">🌙 ASWÈ (5 minit):</p>
<p style="margin:0;color:#4b5563;font-size:0.93rem;">3 kesyon: Ki sa m te fè byen jodi a? Ki sa m ta fè diferamman? Ki sa mwen rekonesan pou li?</p>
</div>
<h3>Rezon pou kontinye chak jou</h3>
<p>Marc Aurèle pa t tounen yon sen. Li te bay kòlè. Li te fè erè. Meditasyon yo se kanè l — kote l te rekonèt feblès li ak travay sou yo. Yo montre nou ke gerizon ak kwasans pa rézilta yon jou espesyal — yo rezilta de jou òdinè chak jou.</p>
<blockquote style="border-left:4px solid #6b7280;padding:15px 18px;background:#f8fafc;border-radius:10px;margin:20px 0;font-style:italic;color:#374151;font-size:1.05rem;">"Kòmanse maten an, di tèt ou: Jodi a m pral rankontre moun ki bay pwoblèm, ki ingra, ki arogan. Yo se tankou mwen. Mwen ka reyaji avèk jantiy ak sajès." — Marc Aurèle</blockquote>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 3. SANTI W BYEN / TCC — Dr. David Burns (7 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-feeling-good',
  title: ch("Santi w Byen — Nouvo Teraphy Imè","Se Sentir Bien — La Nouvelle Thérapie","Feeling Good — The New Mood Therapy"),
  author:"Dr. David Burns",
  cover:"assets/book_cover3.jpg",
  description: ch(
    "Gid TCC (Teraphy Kognitif) pratik — chanje panse negatif otomatik yo pou geri depresyon san medikaman pou kèk ka.",
    "Guide TCC pratique — changer les pensées négatives automatiques pour guérir la dépression.",
    "Practical CBT guide — changing automatic negative thoughts to treat depression."
  ),
  pages:55,
  chapters:[
    {
      title: ch("Depresyon Sòti nan Panse — pa Reyalite","La Dépression vient des Pensées — pas de la Réalité","Depression Comes from Thoughts — Not Reality"),
      content: ch(`
<h3>Revolisyon TCC a</h3>
<p>Dr. Aaron Beck — fondatè TCC a — te fè yon dekouvèt enpòtan nan ane 1960 yo: depresyon pa jis yon "dezekili chimik". Panse negatif — menm si yo pa reyèl — kreye emosyon deprimatè reyèl. Chanje panse yo = chanje emosyon yo.</p>
<p>Burns te elèv Beck. Li te ekri "Feeling Good" pou rann TCC aksesib pou tout moun san terapis. Li vann plis pase 4 milyon egzanplè. Li toujou yon nan liv ki pi prese rekòmande pa sikyat yo.</p>
<h3>Kòman panse kreye emosyon</h3>
<p>Panse → Emosyon → Konpòtman. Sa a sik ki travay nan depresyon:</p>
<div style="background:#fef2f2;border-radius:14px;padding:20px;margin:18px 0;">
<div style="display:flex;flex-direction:column;gap:10px;font-size:0.93rem;color:#374151;">
<div style="background:white;border-radius:8px;padding:12px;border-left:3px solid #ef4444;"><strong>Sitiyasyon:</strong> Ou pa pase yon entèvyou travay</div>
<div style="font-size:1.5rem;text-align:center;">↓</div>
<div style="background:white;border-radius:8px;padding:12px;border-left:3px solid #f59e0b;"><strong>Panse otomatik (distòsyon):</strong> "Mwen toujou echwe. Mwen pa bon pou anyen."</div>
<div style="font-size:1.5rem;text-align:center;">↓</div>
<div style="background:white;border-radius:8px;padding:12px;border-left:3px solid #8b5cf6;"><strong>Emosyon:</strong> Tristès pwofon, wont, dezespwa</div>
<div style="font-size:1.5rem;text-align:center;">↓</div>
<div style="background:white;border-radius:8px;padding:12px;border-left:3px solid #6b7280;"><strong>Konpòtman:</strong> Retire, sispann eseye, izole</div>
</div>
</div>
<h3>Kle a: panse yo pa fè yo vre paske yo la</h3>
<p>Sèvo deprime jenere panse negatif otomatik san yo pa kòrèspon ak reyalite. Travay TCC se aprann:</p>
<ol style="line-height:2.2;">
<li>Idantifye panse negatif otomatik yo (ANT — Automatic Negative Thoughts)</li>
<li>Rekonèt kalite distòsyon ki la a</li>
<li>Teste panse yo kont prèv reyèl</li>
<li>Remplace ak yon panse ki baze sou reyalite</li>
</ol>
<blockquote style="border-left:4px solid #3b82f6;padding:15px 18px;background:#eff6ff;border-radius:10px;margin:20px 0;font-style:italic;color:#1e40af;">"Ou pa soufri paske ou malchans. Ou soufri paske panse ou yo — ki pa vrè — kreye doulè ou." — Dr. Burns</blockquote>`)
    },
    {
      title: ch("10 Distòsyon Kognitif — Idantifye Yo","Les 10 Distorsions Cognitives — Les Identifier","The 10 Cognitive Distortions — Identifying Them"),
      content: ch(`
<h3>Zouti pou wè klè</h3>
<p>Burns idantifye 10 panse distòsyon ki pi komen nan depresyon. Konnen yo se premye etap pou goumen kont yo.</p>
<div style="display:flex;flex-direction:column;gap:12px;margin:18px 0;font-size:0.93rem;">
<div style="background:#fef2f2;border-radius:10px;padding:14px;">
<strong style="color:#b91c1c;">1. Panse Tout-oswa-Anyen</strong>
<p style="margin:6px 0 0;color:#374151;">"Si mwen pa pafè, mwen se yon total echèk." Lavi a se yon spektrum. Pa gen "tout bon" oswa "tout move".</p>
</div>
<div style="background:#fff7ed;border-radius:10px;padding:14px;">
<strong style="color:#c2410c;">2. Sipè-Jeneralizasyon</strong>
<p style="margin:6px 0 0;color:#374151;">"Mwen <em>toujou</em> fè erè." Yon evènman negatif vin yon règ inivèsèl. Mo "toujou" ak "janm" yo se siny.</p>
</div>
<div style="background:#fffbeb;border-radius:10px;padding:14px;">
<strong style="color:#a16207;">3. Filtre Mantal</strong>
<p style="margin:6px 0 0;color:#374151;">Wè sèlman negatif. Yon evalyasyon ki gen 9 bon pwen ak 1 move — ou sèlman sonje move a.</p>
</div>
<div style="background:#f0fdf4;border-radius:10px;padding:14px;">
<strong style="color:#15803d;">4. Devalye Pozitif</strong>
<p style="margin:6px 0 0;color:#374151;">"Sa nòmal — sa pa konte." Ou refize bay tèt ou kredi pou bon bagay.</p>
</div>
<div style="background:#eff6ff;border-radius:10px;padding:14px;">
<strong style="color:#1d4ed8;">5. Konklizyon Rapid</strong>
<p style="margin:6px 0 0;color:#374151;">Devine panse lòt moun san prèv, oswa predi move rezilta anvan sa rive.</p>
</div>
<div style="background:#faf5ff;border-radius:10px;padding:14px;">
<strong style="color:#7e22ce;">6. Grossisman / Minimizasyon</strong>
<p style="margin:6px 0 0;color:#374151;">Grossi erè ou yo ak diminye fòs ou yo. Pwen fèb parèt terib; pwen fò parèt ensinifyan.</p>
</div>
<div style="background:#fef2f2;border-radius:10px;padding:14px;">
<strong style="color:#b91c1c;">7. Rezonman Emosyonèl</strong>
<p style="margin:6px 0 0;color:#374151;">"Mwen santi m nul, donk mwen se nul." Santi yon bagay pa pwouve li vre.</p>
</div>
<div style="background:#fff7ed;border-radius:10px;padding:14px;">
<strong style="color:#c2410c;">8. Deklarasyon "Dwe"</strong>
<p style="margin:6px 0 0;color:#374151;">"Mwen <em>dwe</em> toujou fò." Règ enjis ou kreye pou tèt ou ki jenere koupabilite ak wont.</p>
</div>
<div style="background:#fffbeb;border-radius:10px;padding:14px;">
<strong style="color:#a16207;">9. Etiketaj</strong>
<p style="margin:6px 0 0;color:#374151;">"Mwen se yon pèdan" olye "Mwen te fè yon erè." Idantite negatif ki jenere sou yon evènman.</p>
</div>
<div style="background:#f0fdf4;border-radius:10px;padding:14px;">
<strong style="color:#15803d;">10. Pèsonalizasyon</strong>
<p style="margin:6px 0 0;color:#374151;">Pran responsabilite pou bagay ki pa nan men w. "Li tris — se fòt mwen."</p>
</div>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Pratik:</strong> Pandan yon semèn, chak fwa ou santi w mal, ekri panse otomatik la. Lèfini idantifye ki distòsyon ki la. Jis fè sa — san eseye chanje — se premye etap ki pwisan anpil.</p>
</div>`)
    },
    {
      title: ch("Teknik Kolòn Twa — Zouti Rezo","La Technique des Trois Colonnes — L'Outil Principal","The Triple Column Technique — The Main Tool"),
      content: ch(`
<h3>Kèlkeswa ki panse negatif — ou ka konbat li</h3>
<p>Teknik Kolòn Twa se kè TCC a. Li senp. Li efektif. Li ka fèt nenpòt kote — nan yon notebook, sou yon napkin, sou telefòn ou.</p>
<h3>Kòman l fonksyone</h3>
<div style="background:#f8fafc;border-radius:14px;padding:20px;margin:18px 0;border:1px solid #e2e8f0;">
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:15px;">
<div style="background:#fef2f2;border-radius:8px;padding:10px;text-align:center;font-weight:700;color:#b91c1c;font-size:0.88rem;">PANSE OTOMATIK</div>
<div style="background:#fef3c7;border-radius:8px;padding:10px;text-align:center;font-weight:700;color:#92400e;font-size:0.88rem;">DISTÒSYON</div>
<div style="background:#f0fdf4;border-radius:8px;padding:10px;text-align:center;font-weight:700;color:#065f46;font-size:0.88rem;">REPONS RASYONÈL</div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;font-size:0.86rem;color:#374151;">
<div style="background:white;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">"Mwen toujou fè erè nan travay."</div>
<div style="background:white;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">Sipè-jeneralizasyon + Filtre mantal</div>
<div style="background:white;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">"Mwen fè kèk erè, men mwen fè anpil bagay kòrèkteman tou. Tout moun fè erè."</div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;font-size:0.86rem;color:#374151;margin-top:8px;">
<div style="background:white;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">"Pèsonn pa renmen m."</div>
<div style="background:white;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">Konklizyon rapid + Tout-oswa-Anyen</div>
<div style="background:white;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">"[Nòm zanmi m] te rele m yè. Mwen pa ka li nan lespri tout moun."</div>
</div>
</div>
<h3>Repons rasyonèl — pa pozitivman fò</h3>
<p>Enpòtan anpil: repons rasyonèl la pa dwe yon panse "ultra-pozitif" oswa "tout anfòm". Li dwe <em>vre</em>. Yon repons balanse ki baze sou prèv.</p>
<p>Pa: "Mwen pafè ak tout moun renmen m!" — Sa manti epi sèvo ou ap rejete l.</p>
<p>Wi: "Gen moun ki renmen m, gen moun ki pa renmen m. Sa nòmal." — Sa se verite.</p>
<h3>Efikasité TCC a</h3>
<p>Etid montre TCC se tretman ki pi efikas pou depresyon modere a severe — menm plis efikas pase sèlman medikaman pou prevansyon rechit. Pou depresyon modere, TCC sèl ka sifi.</p>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Egzèsis semèn sa a:</strong> Chak swa, ekri yon panse negatif ki te rive jodi a. Fè Kolòn Twa a. Apre 7 jou, gade travèse a — ou pral wè patit nan panse ou yo.</p>
</div>`)
    },
    {
      title: ch("Aktivasyon Konpòtman — Aji Anvan Santi","L'Activation Comportementale — Agir Avant de Ressentir","Behavioral Activation — Act Before You Feel"),
      content: ch(`
<h3>Paradòks depresyon an</h3>
<p>Depresyon fè ou retire ak aktivite. Retrait la fè depresyon an pire. Depresyon pire fè ou retire plis. Se yon sik mal ki ranfòse tèt li.</p>
<p>Aktivasyon konpòtman kraze sik sa a.</p>
<h3>Prensip fondamantal</h3>
<p>Nan depresyon, sèvo a di: <em>"Tann pou santi w mye anvan w fè aktivite."</em> Men sa a yon manti. Motivasyon pa vin anvan aksyon — li vin <em>apre</em> aksyon.</p>
<div style="background:#eff6ff;border-radius:14px;padding:18px;margin:18px 0;text-align:center;">
<div style="font-size:1rem;color:#1e40af;">
<strong>Fason santiman yo travay:</strong><br><br>
<span style="background:#bfdbfe;padding:6px 12px;border-radius:20px;margin:4px;display:inline-block;">AKSYON</span>
<span style="font-size:1.5rem;">→</span>
<span style="background:#a5b4fc;padding:6px 12px;border-radius:20px;margin:4px;display:inline-block;">SANTI yon ti mye</span>
<span style="font-size:1.5rem;">→</span>
<span style="background:#818cf8;color:white;padding:6px 12px;border-radius:20px;margin:4px;display:inline-block;">MOTIVASYON</span>
</div>
</div>
<h3>Kòman aplike l</h3>
<p>Burns rekòmande:</p>
<ul style="line-height:2.2;">
<li><strong>Planifye aktivite</strong> — pa tann pou santi w vle. Mete nan aganda w.</li>
<li><strong>Kòmanse ti:</strong> 5 minit mache, pa yon marathon. 1 chapit, pa yon liv.</li>
<li><strong>Note plezi ak pwodiksyon:</strong> Apre chak aktivite, evalye 0-10 jan ou te jwenn plezi, ak 0-10 jan ou santi w produktif. Souvan pi wo pase ou te panse.</li>
</ul>
<h3>Aktivite ki mache pou depresyon</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:18px 0;font-size:0.9rem;">
<div style="background:#f0fdf4;border-radius:10px;padding:12px;"><strong>🏃 Egzèsis fizik</strong><br>Pase tout antidepresè pou depresyon modere</div>
<div style="background:#eff6ff;border-radius:10px;padding:12px;"><strong>🤝 Koneksyon sosyal</strong><br>Menm yon ti konvèsasyon ede</div>
<div style="background:#fff7ed;border-radius:10px;padding:12px;"><strong>🎨 Kreyativite</strong><br>Desen, mizik, ekri — pou jwi, pa pou montre</div>
<div style="background:#faf5ff;border-radius:10px;padding:12px;"><strong>🙏 Sèvis</strong><br>Fè yon bagay pou yon lòt moun rédui rumination</div>
<div style="background:#fef9c3;border-radius:10px;padding:12px;"><strong>🌿 Nati</strong><br>20 minit deyò chak jou, preferableman nan vèdire</div>
<div style="background:#fdf2f8;border-radius:10px;padding:12px;"><strong>📖 Li</strong><br>Ficksyon patikilèman efikas pou empathy ak distansyasyon</div>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Defi 7 jou:</strong> Chwazi yon aktivite ou te renmen anvan depresyon. Fè l 20 minit chak jou pandan 7 jou — menm si ou pa vle. Apre 7 jou, obsève: kijan ou santi w konpare ak premye jou a?</p>
</div>`)
    },
    {
      title: ch("Wont ak Koupabilite — Emosyon ki Touye","Honte et Culpabilité — Les Émotions qui Tuent","Shame and Guilt — The Killing Emotions"),
      content: ch(`
<h3>Emosyon ki pli domaje pase lòt</h3>
<p>Burns eksplike ke pami tout emosyon difisil, de a ki pli souvan asosye ak depresyon grav se wont ak koupabilite. Konprann diferans ant yo se kle pou travay avèk yo.</p>
<h3>Wont vs Koupabilite</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:18px 0;">
<div style="background:#fef2f2;border-radius:14px;padding:16px;border-top:4px solid #ef4444;">
<strong style="color:#b91c1c;font-size:1rem;display:block;margin-bottom:10px;">WONT</strong>
<p style="font-size:0.88rem;color:#374151;margin:0 0 8px;">"Mwen <em>se</em> yon move moun."</p>
<ul style="font-size:0.85rem;color:#4b5563;margin:0;padding-left:14px;line-height:1.9;">
<li>Touche idantite a</li>
<li>Fè ou kache</li>
<li>Renfòse depresyon</li>
<li>Souvan irrasyonèl</li>
</ul>
</div>
<div style="background:#f0fdf4;border-radius:14px;padding:16px;border-top:4px solid #10b981;">
<strong style="color:#065f46;font-size:1rem;display:block;margin-bottom:10px;">KOUPABILITE</strong>
<p style="font-size:0.88rem;color:#374151;margin:0 0 8px;">"Mwen <em>fè</em> yon move bagay."</p>
<ul style="font-size:0.85rem;color:#4b5563;margin:0;padding-left:14px;line-height:1.9;">
<li>Touche konpòtman an</li>
<li>Enkouraje chanjman</li>
<li>Ka konstruktif</li>
<li>Souvan rasyonèl</li>
</ul>
</div>
</div>
<h3>Koupabilite irasyonèl — sa ki touye</h3>
<p>Burns di anpil moun deprime soufri ak koupabilite irasyonèl — yo santi yo koupab pou bagay ki pa nan men yo, oswa yo egzajere koupabilite yo pou ti erè.</p>
<p>Tès koupabilite rasyonèl vs irasyonèl:</p>
<ol style="line-height:2.2;">
<li>Eske m te reyèlman fè mal la entansyonèlman?</li>
<li>Eske m te gen opòtinite epi kapasite pou fè diferamman?</li>
<li>Eske sanksyon (soufrans mwen) pwopòsyonèl ak "krim" nan?</li>
</ol>
<p>Si repons yo pa tout "wi" — koupabilite a ka irasyonèl.</p>
<h3>Konbat wont ak rèlman geri</h3>
<p>Burns eksplike ke wont geri lè nou kite l sòti nan fènwa izolasyon. Pale ak yon moun ou fè konfyans sou sa ou wont de — epi wè reyaksyon reyèl li. Pifò lè, moun reyaji avèk anpil plis konpreyansyon pase nou te imajine.</p>
<blockquote style="border-left:4px solid #3b82f6;padding:15px 18px;background:#eff6ff;border-radius:10px;margin:20px 0;font-style:italic;color:#1e40af;">"Wont viv nan silans ak sèkrè. Lap mouri nan ekspozisyon ak empathi." — Dr. Brené Brown (menm konklizyon ke Burns)</blockquote>`)
    },
    {
      title: ch("Relasyon ak Depresyon — Koneksyon ak Izolasyon","Relations et Dépression — Connexion et Isolement","Relationships and Depression — Connection and Isolation"),
      content: ch(`
<h3>Depresyon izole — izolasyon agrave depresyon</h3>
<p>Burns obsève yon sik ki difisil pou kraze: depresyon fè nou vle izole nou. Izolasyon fè depresyon pire. Men komplike: nan depresyon, relasyon yo tou vin difisil ak douloure.</p>
<h3>Panse negatif ki deranje relasyon</h3>
<ul style="line-height:2.2;">
<li>"Pèsonn pa vle tande pwoblèm mwen." (Jijman san prèv)</li>
<li>"Si yo konnen ki jan mwen reyèlman ye, yo pap renmen m." (Wont)</li>
<li>"Mwen se yon fado pou moun ki renmen m." (Siprè-jeneralizasyon)</li>
<li>"Mwen pa kapab ba yo sa yo bezwen." (Tout-oswa-Anyen)</li>
</ul>
<h3>Teknik Komunikasyon Empatik</h3>
<p>Burns bay yon zouti pou moun ki gen depresyon pou yo ka pale avèk moun ki renmen yo:</p>
<div style="background:#f8fafc;border-radius:14px;padding:20px;margin:18px 0;border:1px solid #e2e8f0;">
<p style="font-weight:700;color:#374151;margin:0 0 12px;">Modèl DER (Dekri, Eksprime, Rekèt):</p>
<div style="display:flex;flex-direction:column;gap:10px;font-size:0.9rem;color:#374151;">
<div><strong>D — Dekri:</strong> "Dènye semèn yo, mwen te retire m anpil..."</div>
<div><strong>E — Eksprime:</strong> "...paske mwen santi m fatige anpil epi m pa vle pote fado mwen sou ou."</div>
<div><strong>R — Rekèt:</strong> "Eske w kapab sèlman koute m pandan 10 minit san eseye regle pwoblèm yo?"</div>
</div>
</div>
<h3>Pou moun ki renmen yon moun ki gen depresyon</h3>
<p>Burns bay konsèy tou pou yo:</p>
<ul style="line-height:2.2;">
<li>Pa eseye "fiks" depresyon an — jis prezan</li>
<li>Pa pran izolasyon yo pèsonèlman — li pa sou ou</li>
<li>Di konkrè: "Mwen pral achte manje" olye "Di m si w bezwen yon bagay"</li>
<li>Montre ou la san kondisyon — pa sèlman lè "yo anfòm"</li>
</ul>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 Idantifye yon moun ou fè konfyans. Ekri sa ou ta vle di yo si ou te ka pran kouraj. Eske ou ka voye yon mesaj jodi a — menm yon ti "mwen panse a ou"?</p>
</div>`)
    },
    {
      title: ch("Prevansyon Rechit — Rete Bien pou Lontan","Prévention des Rechutes — Rester Bien sur le Long Terme","Relapse Prevention — Staying Well Long-Term"),
      content: ch(`
<h3>Gerizon pa yon pwen rive — se yon fason viv</h3>
<p>Burns esplike ke youn nan avantaj TCC sou medikaman pou depresyon se prevansyon rechit. Moun ki aprann teknik TCC yo epi ki pratike yo gen anpil mwens chans pou yo retounen nan depresyon grav.</p>
<h3>Plan prevansyon rechit Burns</h3>
<div style="display:flex;flex-direction:column;gap:14px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:12px;padding:16px;border-left:4px solid #10b981;">
<strong style="color:#065f46;display:block;margin-bottom:8px;">1. Rekonèt senyòm alèt bonè ou pèsonèl</strong>
<p style="margin:0;font-size:0.9rem;color:#374151;">Chak moun gen senyòm patikilye lè depresyon kòmanse retounen: pou Haig se izolasyon. Pou lòt se sovèz. Pou lòt se enkyetid sou dòmi. Konnen ou yo.</p>
</div>
<div style="background:#eff6ff;border-radius:12px;padding:16px;border-left:4px solid #3b82f6;">
<strong style="color:#1e40af;display:block;margin-bottom:8px;">2. Kreye yon "Plan Kriz" anvans</strong>
<p style="margin:0;font-size:0.9rem;color:#374151;">Anvan yon kriz rive, ekri: "Lè mwen wè senyòm X, mwen pral fè Y." Pa eseye deside pandan yon kriz — lespri nan kriz pa deside bien.</p>
</div>
<div style="background:#faf5ff;border-radius:12px;padding:16px;border-left:4px solid #8b5cf6;">
<strong style="color:#5b21b6;display:block;margin-bottom:8px;">3. Pratike teknik yo chak jou</strong>
<p style="margin:0;font-size:0.9rem;color:#374151;">Tankou yon atlèt ki pa sispann pratike pandan sezon repo — TCC kòm pratik chak jou, pa sèlman nan kriz.</p>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;border-left:4px solid #f59e0b;">
<strong style="color:#92400e;display:block;margin-bottom:8px;">4. Konsève rezo sipò ou</strong>
<p style="margin:0;font-size:0.9rem;color:#374151;">Pa kite relasyon enpòtan yo tombe pandan bon jou yo. Anvèstis nan yo anvan ou bezwen yo.</p>
</div>
<div style="background:#f0fdf4;border-radius:12px;padding:16px;border-left:4px solid #10b981;">
<strong style="color:#065f46;display:block;margin-bottom:8px;">5. Travay sou byennèt — pa jis mank maladi</strong>
<p style="margin:0;font-size:0.9rem;color:#374151;">Gerizon pa jis "pa deprime" — li pral aksyon aktif pou byennèt. Egzèsis, dòmi, nati, kreyativite, sèvis bay lòt yo.</p>
</div>
</div>
<blockquote style="border-left:4px solid #3b82f6;padding:15px 18px;background:#eff6ff;border-radius:10px;margin:20px 0;font-style:italic;color:#1e40af;font-size:1.05rem;">"Depresyon ka retounen. Men ou ka retounen pi rapid chak fwa. Paske chak fwa, ou gen plis zouti, plis konesans de pwòp tèt ou, epi plis prèv ke ou ka sipòte li." — Dr. David Burns</blockquote>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 4. ALKIMIS LA — Paulo Coelho (5 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-alchimiste',
  title: ch("Alkimis la","L'Alchimiste","The Alchemist"),
  author:"Paulo Coelho",
  cover:"assets/book_cover1.jpg",
  description: ch(
    "Yon kont filozofik sou Santiago ki aprann ke chemi a gen plis valè pase destinasyon an.",
    "Le voyage de Santiago qui apprend que le chemin vaut plus que la destination.",
    "Santiago's journey that teaches the path matters more than the destination."
  ),
  pages:50,
  chapters:[
    {
      title: ch("Santiago ak Rèv li","Santiago et son Rêve","Santiago and His Dream"),
      content: ch(`
<h3>Yon gadò mouton ki reve pi gwo</h3>
<p>Santiago se yon jèn Espayòl ki te kite seminè pou l vin gadò mouton — pou l ka vwayaje. Chak swa, yon rèv ki repete vini: yon trèzò kache bò Piramid Lejip yo.</p>
<p>Li al wè yon granmè (vye fanm ki entèprete rèv). Li di l: trèzò rèv la reyèl. Epi li rankontre yon vye wa — Melkisedèk — ki esplike l yon konsèp ki pral chanje lavi l.</p>
<h3>Legann Pèsonèl</h3>
<p>Melkisedèk di: <em>"Chak moun, lè yo jèn, konnen Legann Pèsonèl yo. Nan pwen sa nan lavi a, tout bagay klè epi tout sanble posib. Yo pa pè pou yo reve, epi yo dezire tout bagay yo vle fè nan lavi yo. Epi pandan tan an pase, yon fòs misterye kòmanse konvenk yo ke li va enposib pou yo reyalize Legann Pèsonèl yo."</em></p>
<h3>Fòs ki anpeche nou swiv rèv nou</h3>
<p>Coelho idantifye 4 obstak ki anpeche moun swiv Legann Pèsonèl yo:</p>
<ul style="line-height:2.2;">
<li><strong>Panse depi timoun ke tout bagay enposib:</strong> Moun granmoun anseye nou "se pa pou moun tankou nou".</li>
<li><strong>Lanmou:</strong> Nou abandone rèv nou paske nou pè pèdi moun nou renmen. Men Coelho di: yon moun ki vrèman renmen ou ap sipòte rèv ou.</li>
<li><strong>Pè echèk:</strong> Lè nou kòmanse reyalize rèv nou, nou panse a tout sa nou pral pèdi si nou echwe.</li>
<li><strong>Pè reyalize rèv la:</strong> Pè ke nou pa merite, oswa ke lavi nou pral chanje yon fason nou pa kontwole.</li>
</ul>
<blockquote style="border-left:4px solid #f59e0b;padding:15px 18px;background:#fffbeb;border-radius:10px;margin:20px 0;font-style:italic;color:#92400e;font-size:1.05rem;">"Lè w vle yon bagay, tout linivè konspire pou ede w reyalize l." — Paulo Coelho</blockquote>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 Kisa rèv ou ye? Pa sa ou "dwe" vle — sa ki reyèlman rale ou depi ou te timoun? Ekri li. Menm si li parèt enposib.</p>
</div>`)
    },
    {
      title: ch("Lang Lemonn nan","Le Langage du Monde","The Language of the World"),
      content: ch(`
<h3>Tout bagay pale — si ou koute</h3>
<p>Santiago vann mouton l yo epi al Lejip. Nan mache a, yon moun vole tout kòb li. Li oblije travay nan yon boutik kristal pou ranmase kòb. La a, li aprann premye gran leson: <em>travay avèk kouraj ak entegrite chanje bagay.</em></p>
<p>Pwopriyetè boutik la te gen yon rèv — ale Meke — men li te toujou pran eskiz. Santiago ede l wè ke depi ou kite rèv la dèyè "pou pita", ou pèdi kè ou depi kounye a.</p>
<h3>Lang inivèsèl la</h3>
<p>Coelho dekri yon "Lang Inivèsèl" — yon kominikasyon ki pase pi lwen pase mo yo. Manman ki souri ba pitit li. De moun ki tonbe nan lanmou nan premye je. Yon zanmi ki konnen ou tris san ou di anyen.</p>
<p>Santiago aprann ke nati a pale tou. Mouvman van an, wòl ke solèy fè, jan mouton yo vire — tout sa te di yon bagay pou ki t ap koute.</p>
<h3>Omen yo</h3>
<p>Coelho pale sou "omen" yo — siy ki parèt sou chemi nou ki montre nou direksyon bon an. Nan sikoloji modèn, nou ka konprann sa kòm entitisyon — sèvo nou ki trete enfòmasyon anba nivo konsyans epi voye sinyèl atravè sansasyon.</p>
<p>Aprann koute entwitisyon ou se yon konpetans. Pou moun ki gen depresyon, "bri" depresyon an ka fè entitisyon difisil pou tande. Men li la.</p>
<div style="background:#eff6ff;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#1e40af;">💡 <strong>Pratik:</strong> Pou yon semèn, chak fwa ou gen yon "santi" sou yon desizyon — note li. Pa swiv li nesesèman — jis note l. Apre semèn nan, wè konbyen fwa entwitisyon ou te kòrèk.</p>
</div>`)
    },
    {
      title: ch("Dezè a — Obstak kòm Mèt","Le Désert — L'Obstacle comme Maître","The Desert — Obstacles as Teachers"),
      content: ch(`
<h3>Wout Lejip se pa yon wout fasil</h3>
<p>Santiago rejwenn yon karavàn k ap travèse dezè Sahara. La a, li aprann leson pi difisil: pou l kite "lavi nòmal" la epi anbrase enkòni a ak tout danje l.</p>
<p>Li rankontre Fatima — yon fi dezè li tonbe nan lanmou avèk. Premye tantasyon: rete avèk li epi abandone rèv la. Men Fatima di l yon bagay etonan: <em>"Ou pa bezwen rete pou mwen. Moun ki gen yon rèv abandone l pou lanmou pèdi tou de."</em></p>
<h3>Leson dezè a sou obstak</h3>
<p>Coelho di dezè a anseye Santiago:</p>
<ul style="line-height:2.2;">
<li><strong>Silans revele:</strong> Nan dezè yo pa gen distraksyon. Ou oblije fè fas ak tèt ou.</li>
<li><strong>Danje klèrifye:</strong> Lè lavi ou an jeu, ou wè klè sou sa ki vrèman enpòtan.</li>
<li><strong>Pasyon se pwoteksyon:</strong> Moun ki viv pou yon bagay pi gwo pase tèt yo reziste obstak pi bien.</li>
</ul>
<h3>Aplikasyon nan depresyon</h3>
<p>Coelho fè yon konparezon ki frape: pafwa, periòd depresyon nou — moman ki sanble "dezè" yo — se moman kote nou aprann ki moun nou reyèlman ye. Pafwa, pi gran kwasans vin apre pi gwo soufrans.</p>
<p>Sa a pa vle di soufrans la bon, ni nesesè. Men li ka ba nou yon chwa: sibi l ak pasivite, oswa kite l anseye nou.</p>
<blockquote style="border-left:4px solid #f59e0b;padding:15px 18px;background:#fffbeb;border-radius:10px;margin:20px 0;font-style:italic;color:#92400e;">"Lè w travèse yon dezè, ou ka swa konte grenn sab yo, oswa aprann koute van an." — Coelho</blockquote>`)
    },
    {
      title: ch("Alkimi — Transfòme Soufrans","L'Alchimie — Transformer la Souffrance","Alchemy — Transforming Suffering"),
      content: ch(`
<h3>Kisa alkimi reyèlman ye</h3>
<p>Nan istwa a, Santiago rankontre yon Alkimis reyèl — yon ansyen moun ki konnen sèkrèt transfòme metal an lò. Men Coelho itilize sa kòm metafò: alkimi vrè a se transfòme soufrans an sajès, pè an kouraj, doulè an konpasyon.</p>
<h3>Twa transfòmasyon alkimik</h3>
<div style="display:flex;flex-direction:column;gap:14px;margin:18px 0;">
<div style="background:linear-gradient(135deg,#fef9c3 0%,#fde68a 100%);border-radius:12px;padding:16px;">
<strong style="color:#92400e;">Metal → Lò</strong>
<p style="margin:6px 0 0;color:#78350f;font-size:0.9rem;">Doulè anp → Empati. Moun ki soufri anpil souvan gen plis kapasite pou konprann soufrans lòt yo.</p>
</div>
<div style="background:linear-gradient(135deg,#dbeafe 0%,#bfdbfe 100%);border-radius:12px;padding:16px;">
<strong style="color:#1e40af;">Pou → Dife</strong>
<p style="margin:6px 0 0;color:#1e3a8a;font-size:0.9rem;">Pè → Kouraj. Pè pa disparèt — li transfòme lè ou aji malgre li.</p>
</div>
<div style="background:linear-gradient(135deg,#d1fae5 0%,#a7f3d0 100%);border-radius:12px;padding:16px;">
<strong style="color:#065f46;">Plòm → Limyè</strong>
<p style="margin:6px 0 0;color:#064e3b;font-size:0.9rem;">Ekperyans negatif → Sagès. Sa ou te traverse devin zouti pou ede lòt yo.</p>
</div>
</div>
<h3>Santiago jwenn trèzò a — epi surpriz la</h3>
<p>Santiago finalman rive bò Piramid yo. La a, li aprann ke trèzò reyèl la pa te kache anba Piramid — li te nan pwòp peyi l, nan kote li te kòmanse vwayaj la. Men — epi sa a kle — si l pa t fè vwayaj la, l pa t ap janm konnen kote cherche.</p>
<p>Coelho di: pafwa, rèv nou mennen nou nan vwayaj ki transfòme nou yon jan ke reyalizasyon rèv la ta pa te kapab fè. <em>Chemi an menm se trezò a.</em></p>
<blockquote style="border-left:4px solid #f59e0b;padding:15px 18px;background:#fffbeb;border-radius:10px;margin:20px 0;font-style:italic;color:#92400e;font-size:1.05rem;">"Lè ou vle yon bagay avèk tout kè ou, tout linivè konspire pou ede w reyalize l — paske sa a soti nan Nanm Lemonn." — Coelho</blockquote>`)
    },
    {
      title: ch("Nanm Lemonn — Tout Bagay Konekte","L'Âme du Monde — Tout est Connecté","The Soul of the World — All is Connected"),
      content: ch(`
<h3>Koneksyon inivèsèl la</h3>
<p>Nan fen liv la, Coelho prezante yon konsèp ki sòti nan tradisyon milenè anpil kilti: idee ke tout moun, tout bèt, tout nati, tout lavi konekte nan yon fòs yon sèl — "Nanm Lemonn nan" (Soul of the World).</p>
<p>Sa pa nesesèman yon afèman relijye — menm an tèm sikolojik, nou ka wè verite li: soufrans yon moun afekte lòt yo. Jwa yon moun ka ba nou espwa. Nou pa viv izole — nou fè pati yon web koneksyon.</p>
<h3>Poukisa sa enpòtan pou byennèt mantal</h3>
<p>Depresyon fè nou santi nou separe — pa jis de moun, men de lavi limèm. Konsèp Nanm Lemonn nan ofri yon kontrè: ou fè pati yon bagay pi gwo pase soufrans ou. Prezan ou — rèv ou, doulè ou, amelyorasyon ou — gen enpak sou mond lan.</p>
<h3>Pratik: Wè koneksyon yo</h3>
<div style="background:#f8fafc;border-radius:14px;padding:20px;margin:18px 0;border:1px solid #e2e8f0;">
<p style="font-weight:700;color:#374151;margin:0 0 12px;">Egzèsis "Wèb Koneksyon":</p>
<ol style="line-height:2.2;color:#4b5563;font-size:0.93rem;">
<li>Panse ak yon aksyon piti ou te fè pou yon lòt moun (yon souri, yon mo, yon jès).</li>
<li>Imajine kijan sa te afekte moun sa a.</li>
<li>Imajine kijan moun sa a te afekte lòt moun apre — yon sik ki kontinye.</li>
<li>Reyalize: ou gen enpak sou mond lan, menm lè depresyon di ou non.</li>
</ol>
</div>
<blockquote style="border-left:4px solid #f59e0b;padding:15px 18px;background:#fffbeb;border-radius:10px;margin:20px 0;font-style:italic;color:#92400e;font-size:1.05rem;">"Mwen vin dekouvri ke pifò moun pa pè echèk — yo pè reyisi epi pui wè ke yo pa te kapab ale pi lwen." — Coelho</blockquote>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Refleksyon final:</strong> Ki "Legann Pèsonèl" ou te bliye kounye a? Ki premye ti pa ou ta ka fè jodi a, pa demen — pou kòmanse vwayaj la ankò?</p>
</div>`)
    }
  ]
}

,

// ═══════════════════════════════════════════════════════════════
// 5. POUVWA MOMAN PREZAN — Eckhart Tolle (6 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-power-now',
  title: ch("Pouvwa Moman Prezan an","Le Pouvoir du Moment Présent","The Power of Now"),
  author:"Eckhart Tolle",
  cover:"assets/book_cover3.jpg",
  description: ch(
    "Kijan viv nan moman prezan ka liberew nan soufrans mantal ak panse ki pa sispann.",
    "Comment vivre dans l'instant présent pour se libérer de la souffrance mentale.",
    "How living in the present moment frees you from mental suffering."
  ),
  pages:50,
  chapters:[
    {
      title: ch("Ou se pa Panse w","Tu n'es pas ta Pensée","You Are Not Your Mind"),
      content: ch(`
<h3>Revelasyon fondamantal Tolle a</h3>
<p>Eckhart Tolle te gen 29 an lè, yon nwit, li te santi yon transfòmasyon total. Li te tèlman soufri ak depresyon ke li te di tèt li: "Mwen pa ka viv avèk tèt mwen ankò." Epi yon kesyon frape l: "Ki 'mwen' sa a ki pa ka viv avèk 'tèt mwen'? Eske pa gen de 'mwen' la a?"</p>
<p>Sa a te kòmansman yon dekouvèt pwofon: <em>lespri a — vwa ki nan tèt ou, panse ki pa sispann — se pa ou. W ap obsève l. Donk ou gen yon konsyans ki pi gwo pase panse yo.</em></p>
<h3>Tès senp</h3>
<p>Tolle bay yon egzèsis senp: fèmen je w pou 30 segonn. Tann pwòp panse w yo. Obsève yo rive — san ou pa envite yo. Kòm si ou t ap chita bò yon rivyè epi gade dlo a pase.</p>
<p>Ki sa sa prouve? Ke ou pa <em>se</em> panse yo — ou <em>obsève</em> yo. Se yon diferans ki chanje tout.</p>
<h3>Kòman sa ede moun ki gen depresyon</h3>
<p>Depresyon souvan ranfòse tèt li pa yon sik panse: panse negatif → emosyon mal → panse negatif sou panse negatif ("Poukisa m panse konsa? Mwen mal. Mwen toujou mal...").</p>
<p>Konsèp Tolle a ofri yon sòti: si ou pa se panse ou, ou pa <em>oblije</em> kwè yo. Ou ka obsève yo san yo kontwole ou.</p>
<div style="background:#faf5ff;border-radius:12px;padding:18px;margin:18px 0;border-left:4px solid #8b5cf6;">
<p style="margin:0;color:#4c1d95;font-style:italic;">"Moun ki soufri pi gwo se moun ki pi idantifye avèk lespri yo. Libète a kòmanse lè ou reyalize: 'Mwen gen panse — men mwen se pa panse mwen.'"</p>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Pratik:</strong> Chak fwa yon panse negatif rive, di tèt ou: "Mwen obsève panse sa a." Pa "Mwen panse X" — men "Mwen wè panse X ap pase." Ti chanjman mo sa a gen gwo efè sou relasyon ou avèk panse ou yo.</p>
</div>`)
    },
    {
      title: ch("Moman Prezan — Sèl Reyalite","Le Moment Présent — La Seule Réalité","The Present Moment — The Only Reality"),
      content: ch(`
<h3>Kote lavi reyèlman egziste</h3>
<p>Tolle di yon bagay senp men pwisan: lavi pa egziste nan pase a ni nan fiti a. Pase a se yon souvni — yon panse kounye a sou sa ki te rive. Fiti a se yon imajinasyon — yon panse kounye a sou sa ki ka rive. Sèl kote ou ka reyèlman viv se <em>kounye a</em>.</p>
<p>Depresyon viv nan pase a (souvni doulè, regre). Anksyete viv nan fiti a (krent, "e si...?"). Lapè viv nan prezan an.</p>
<h3>Kòman retounen nan prezan an</h3>
<div style="display:flex;flex-direction:column;gap:12px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:10px;padding:14px;border-left:4px solid #10b981;">
<strong style="color:#065f46;">Kò a kòm ank:</strong> Santi men ou. Pye ou sou tè a. Souf ou k ap antre ak sòti. Kò a toujou nan prezan an.
</div>
<div style="background:#eff6ff;border-radius:10px;padding:14px;border-left:4px solid #3b82f6;">
<strong style="color:#1e40af;">Sons yo:</strong> Koute son ki bò kote w san ou pa nonmen yo. Jis tande. Sa fòse konsyans ou nan isi-kounye a.
</div>
<div style="background:#faf5ff;border-radius:10px;padding:14px;border-left:4px solid #8b5cf6;">
<strong style="color:#5b21b6;">Gade san nonmen:</strong> Gade yon objè — flè, yon tasa, yon men — san ou pa di non l nan tèt ou. Jis gade.
</div>
</div>
<h3>Pratik "Isi-Kounye a"</h3>
<p>Tolle rekòmande yon pratik li rele "Isi-Kounye a": plizyè fwa pa jou, pran yon gwo souf epi mande tèt ou: "Eske gen yon pwoblèm <em>kounye a</em>, nan moman sa a egzak?" — pa jou k ap vini, pa yè — jis kounye a.</p>
<p>Pifò lè, repons la se non. Pwoblèm yo egziste nan panse — nan prezan a, souvan ou anfòm.</p>
<blockquote style="border-left:4px solid #8b5cf6;padding:15px 18px;background:#faf5ff;border-radius:10px;margin:20px 0;font-style:italic;color:#4c1d95;">"Tan se ilizyon — byennèt nan prezan, soufrans nan panse sou pase oswa fiti." — Eckhart Tolle</blockquote>`)
    },
    {
      title: ch("Kò Doulè — Emosyon ki Akimile","Le Corps de Douleur — Émotions Accumulées","The Pain Body — Accumulated Emotions"),
      content: ch(`
<h3>Kisa "kò doulè" ye?</h3>
<p>Tolle dekri yon konsèp li rele "kò doulè" (pain body) — yon akimilasyon emosyon negatif ki rete andedan nou kòm yon "enèji" epi ki ka aktive nan sèten sikonstans.</p>
<p>Li pa youn bagay mistik — nan tèm sikolojik, nou ka konprann sa kòm travma ki pa trete, souvni emosyonèl ki pa entegre, patè konpòtman ki aprann nan doulè.</p>
<h3>Kòman kò doulè a aktive</h3>
<p>Ou ka santi yon reyaksyon emosyonèl dispropòsyonèl sou yon ti bagay — yon mo, yon ton vwa, yon sitiyasyon — epi ou pa konprann poukisa. Se souvan kò doulè a ki reyaji sou baz ansyen soufrans.</p>
<ul style="line-height:2.2;">
<li>Yon kritik piti fè ou santi w devasté — kò doulè depi timoun ki te jije anpil</li>
<li>Izolasyon fè ou santi yon laperèz total — kò doulè depi abandonment</li>
<li>Echèk piti fè ou santi tout lavi w pèdi valè — kò doulè depi echèk gwo</li>
</ul>
<h3>Travay avèk kò doulè a</h3>
<p>Tolle di: pa eseye detwi kò doulè a. Obsève l lè li aktive. Reyalize: "Kò doulè m nan aktif kounye a." Sa a sifi pou diminye pouvwa li.</p>
<div style="background:#fef2f2;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0 0 10px;font-weight:700;color:#b91c1c;">Lè ou santi yon emosyon ki fò san rezon klar:</p>
<ol style="margin:0;color:#374151;font-size:0.93rem;line-height:2;">
<li>Rekonèt: "Kò doulè m nan aktif kounye a."</li>
<li>Santi emosyon an nan kò a — ki kote ou santi l fizikman?</li>
<li>Obsève l san jije, san eseye elimine l.</li>
<li>Ba l espas egziste — li pral pase.</li>
</ol>
</div>
<blockquote style="border-left:4px solid #8b5cf6;padding:15px 18px;background:#faf5ff;border-radius:10px;margin:20px 0;font-style:italic;color:#4c1d95;">"Lè ou obsève kò doulè a san idantifye avèk li, li kòmanse pèdi pouvwa li sou ou." — Tolle</blockquote>`)
    },
    {
      title: ch("Akseptasyon — Pa Reziyasyon","L'Acceptation — Pas la Résignation","Acceptance — Not Resignation"),
      content: ch(`
<h3>Mal konprann enpòtan</h3>
<p>Tolle di anpil moun konfond akseptasyon avèk reziyasyon oswa pasivite. Sa pa menm bagay:</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0;">
<div style="background:#fef2f2;border-radius:12px;padding:14px;border-top:3px solid #ef4444;">
<strong style="color:#b91c1c;">REZIYASYON (pa sa Tolle di)</strong>
<p style="font-size:0.88rem;color:#374151;margin:6px 0 0;">"Sa move men mwen pa ka fè anyen." Pasif, viktimizasyon, abandone aksyon.</p>
</div>
<div style="background:#f0fdf4;border-radius:12px;padding:14px;border-top:3px solid #10b981;">
<strong style="color:#065f46;">AKSEPTASYON (sa Tolle di)</strong>
<p style="font-size:0.88rem;color:#374151;margin:6px 0 0;">"Sa la kounye a. Mwen pa reziste l entèyè." Libere enèji pou aji efikasman.</p>
</div>
</div>
<h3>Fòmil Tolle</h3>
<p>Tolle di: fas ak nenpòt sitiyasyon ou pa renmen, ou gen twa opsyon:</p>
<ol style="line-height:2.5;font-size:0.97rem;color:#374151;">
<li><strong>Kite l:</strong> Si ou ka chanje sitiyasyon an, fè l imedyatman.</li>
<li><strong>Chanje l:</strong> Aji pou amelyore l — paròl, aksyon, chwa.</li>
<li><strong>Aksepte l nèt:</strong> Si ou pa ka kite ni chanje — aksepte l konplètman san rezistans entèryè.</li>
</ol>
<p><strong>Opsyon ke pa egziste:</strong> rete men kenbe rezistans entèryè pou l. Sa a krée soufrans san valè.</p>
<h3>Akseptasyon ak depresyon</h3>
<p>Tolle ap pale pa de aksepte depresyon pou toujou. Li pale de aksepte <em>moman prezan an</em> jan l ye — epi alò aji depi la. "Mwen deprime kounye a. Sa a reyalite moman sa a. Kisa m ka fè nan moman sa a pou ede tèt mwen?"</p>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Pratik akseptasyon:</strong> Pran yon sitiyasyon ki ba ou doulè kounye a. Di: "Sa kounye a. Mwen pa oblije renmen l. Men mwen aksepte li egziste kounye a." Santi si rezistans entèryè a diminye.</p>
</div>`)
    },
    {
      title: ch("Relasyon — Depi yon Kote Konplè","Les Relations — à Partir d'un Lieu Complet","Relationships — Coming from Wholeness"),
      content: ch(`
<h3>Pwoblèm relasyon ki sòti nan vid</h3>
<p>Tolle di ke anpil soufrans nan relasyon sòti nan sa li rele "mande relasyon an pou l ranpli vid andedan ou". Lè nou depann sou yon lòt moun pou nou santi nou konplè, relasyon an vini chaje ak atant ki prèske enposib pou satisfè.</p>
<h3>Relasyon kòm glas</h3>
<p>Yon lòt moun pa ka ba w byennèt fondamantal. Yo ka reflete byennèt ou — tankou yon glas — men yo pa ka kreye l. Si yon glas sale, imaj la ap parèt degrade menm si ou bèl.</p>
<p>Sa a vle di: travay sou byennèt entèryè ou — pa tann pou yon relasyon "sove" ou. Men sa pa vle di relasyon pa enpòtan. Relasyon ki bon amplifye byennèt. Men yo pa kreye l.</p>
<h3>Amou vs Depandans</h3>
<div style="display:flex;flex-direction:column;gap:12px;margin:18px 0;font-size:0.92rem;">
<div style="background:#f0fdf4;border-radius:10px;padding:14px;border-left:4px solid #10b981;">
<strong style="color:#065f46;">Amou reyèl:</strong> "Mwen renmen ou epi mwen vle byennèt ou — menm si sa pa baze sou tèt mwen."
</div>
<div style="background:#fef2f2;border-radius:10px;padding:14px;border-left:4px solid #ef4444;">
<strong style="color:#b91c1c;">Depandans:</strong> "Mwen bezwen ou pou santi m konplè — si w kite m, mwen pèdi tèt mwen."
</div>
</div>
<h3>Konsèy pratik</h3>
<p>Tolle rekòmande:</p>
<ul style="line-height:2.2;">
<li>Pase tan regilye pou kont ou — pa pou izole, men pou reyalize ou gen valè andeyò relasyon yo</li>
<li>Lè ou avèk yon moun, chwazi prezans total — mete telefòn la, gade je yo</li>
<li>Pa chèche relasyon pou ranpli vid — chèche l pou pataje richès</li>
</ul>
<blockquote style="border-left:4px solid #8b5cf6;padding:15px 18px;background:#faf5ff;border-radius:10px;margin:20px 0;font-style:italic;color:#4c1d95;">"Relasyon ki pi bèl yo se ant de moun ki konplè chak kote yo — epi ki chwazi pou yo ansanm, pa paske yo bezwen youn lòt." — Tolle</blockquote>`)
    },
    {
      title: ch("Libète — Jwenn Lapè ak Tèt Ou","La Liberté — Trouver la Paix avec Soi-Même","Freedom — Finding Peace with Yourself"),
      content: ch(`
<h3>Sa libète reyèlman ye</h3>
<p>Pifò moun chèche libète deyò: libète finansyè, libète nan travay, libète nan relasyon. Tolle di libète reyèl la entèryè — libète de panse ki tòtire, libète de kò doulè, libète de nesesite pou tout bagay "dwe" yon sèten fason.</p>
<h3>Silans kòm baz tout bagay</h3>
<p>Tolle di ke dèyè tout bri panse nou yo, gen yon silans pwofon ki toujou la. Sa a "prezans" vèritab nou — konsyans ki obsève tout. Lè nou jwenn aksè ak silans sa a, nou jwenn yon repo ki pa depann sou sikonstans.</p>
<h3>Pratik chak jou: Meditasyon Tolle</h3>
<div style="background:#f8fafc;border-radius:14px;padding:20px;margin:18px 0;border:1px solid #e2e8f0;">
<p style="font-weight:700;color:#374151;margin:0 0 14px;">5 Minit pou Twouve Silans la:</p>
<ol style="color:#4b5563;line-height:2.5;font-size:0.93rem;">
<li>Chita komftableman. Fèmen je ou.</li>
<li>Pran 3 gwo souf — santi chak youn antre ak sòti.</li>
<li>Poze kesyon sa a nan tèt ou: "Ki pwochen panse m pral genyen?" — Epi tann.</li>
<li>Nan atant lan, ou nan silans prezan la. Sa a lapè.</li>
<li>Panse ap rive — obsève yo kòm nwaj k ap pase. Retounen nan silans la.</li>
</ol>
</div>
<h3>Lè depresyon di ou pa gen espwa</h3>
<p>Tolle ba nou yon zouti: lè depresyon di "tout bagay pèdi", mande ou: "Èske panse sa a vre <em>kounye a</em>, nan moman sa a egzak?" Depresyon viv nan fiti. Prezan an souvan pi reyèl ak pi richès pase depresyon ta di.</p>
<blockquote style="border-left:4px solid #8b5cf6;padding:15px 18px;background:#faf5ff;border-radius:10px;margin:20px 0;font-style:italic;color:#4c1d95;font-size:1.05rem;">"Ou pa ka jwenn tèt ou nan pase ni nan fiti. Sèl kote ou jwenn tèt ou se kounye a." — Eckhart Tolle</blockquote>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Defi final:</strong> Pandan yon jou konplè, chak fwa ou wè tèt ou nan pase oswa nan fiti, raple tèt ou: "Prezan an. Isi-kounye a." Wè si sa chanje jan ou santi w nan jounen an.</p>
</div>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 6. HABITID ATOMIK — James Clear (5 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-habits',
  title: ch("Abitid Atomik","Habitudes Atomiques","Atomic Habits"),
  author:"James Clear",
  cover:"assets/book_cover1.jpg",
  description: ch(
    "Kijan ti chanjman chak jou ka lakòz gwo transfòmasyon nan lavi w ak byennèt mantal ou.",
    "Comment de petits changements quotidiens mènent à de grandes transformations.",
    "How tiny daily changes lead to remarkable life transformations."
  ),
  pages:50,
  chapters:[
    {
      title: ch("Pouvwa 1% — Pwogrè ki Pa Wè","Le Pouvoir du 1% — Le Progrès Invisible","The 1% Rule — Invisible Progress"),
      content: ch(`
<h3>Matematik ki chanje perspektiv</h3>
<p>James Clear kòmanse ak yon kalkil senp: si ou amelyore pa 1% chak jou pandan yon ane, ou vin 37 fwa pi bon nan fen ane a. Si ou degrade pa 1% chak jou, ou vin prèske zewo.</p>
<p>Pwogrè ki pa wè chak jou — menm depresyon konnen sa. 1% pi bon jodi a pa santi l anyen. Men 1% × 365 jou = transfòmasyon.</p>
<h3>Poukisa nou pa wè pwogrè a</h3>
<p>Clear rele sa "vallée de la déception" — faz kote efò yo reyèl men rezilta yo pa parèt ankò. Tout krevasyon, tout kwasans durable, gen yon faz kache sa a.</p>
<div style="background:#f8fafc;border-radius:14px;padding:18px;margin:18px 0;text-align:center;border:1px solid #e2e8f0;">
<p style="color:#6b7280;font-size:0.88rem;margin:0 0 8px;">Grafik kwasans reyèl:</p>
<div style="font-size:0.9rem;color:#374151;line-height:2;">
<span style="color:#ef4444;">Efò</span> ――――――――――――――――<br>
<span style="color:#6b7280;">Rezilta wè ──────</span><span style="color:#10b981;">─────── 📈 Kwasans eksponansyèl</span>
</div>
<p style="color:#6b7280;font-size:0.82rem;margin:8px 0 0;">La faz kache = kote pifò moun abandone</p>
</div>
<h3>Aplikasyon nan gerizon depresyon</h3>
<p>Gerizon depresyon fonksyone menm jan. Ou pa pral santi amelyorasyon chak jou. Gen jou ki parèt pire pase yè. Men si ou kontinye fè ti aksyon yo — 10 minit mache, yon panse rekonèt, yon konvèsasyon — chanjman yo akimile.</p>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;">"Pa bezwen yon gwo sanzatann pou chanje lavi w. Yon seri ti chanjman regilye ase." — James Clear</blockquote>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Ti pa jodi a:</strong> Chwazi yon abitid ki ta ede byennèt ou (egzèsis, dòmi, manje). Pa eseye fè l pafèt — fè l pandan <em>2 minit</em> jodi a. Jis 2 minit. Se kòmansman ki difisil.</p>
</div>`)
    },
    {
      title: ch("Idantite ak Abitid — Tounen Moun ou Vle","Identité et Habitudes — Devenir la Personne que tu Veux","Identity and Habits — Becoming Who You Want"),
      content: ch(`
<h3>Ki nivo ou vle chanje?</h3>
<p>Clear idantifye 3 nivo chanjman:</p>
<ol style="line-height:2.2;font-size:0.97rem;">
<li><strong>Rezilta</strong> (pi wotè): Pèdi 10 kilo, ekri yon liv, geri depresyon.</li>
<li><strong>Pwosesis</strong> (mitan): Fè egzèsis chak jou, ekri 500 mo, fè teraphy.</li>
<li><strong>Idantite</strong> (pi fon): "Mwen se yon moun ki pran swen sante l." "Mwen se yon kreyatif." "Mwen se yon moun ki ba tèt li valè."</li>
</ol>
<p>Pifò moun eseye chanje de rezilta ("mwen <em>vle</em> egzèsis"). Clear di chanje de idantite travay plis: "Mwen <em>se</em> yon moun ki aktif."</p>
<h3>Kòman bati idantite pa ti pa</h3>
<p>Chak aksyon ou fè se yon "vòt" pou moun ou vle vin nan. Ou pa bezwen chanje pafètman pou kòmanse bati yon idantite nouvo. Jis vòte pou l chak jou.</p>
<div style="background:#eff6ff;border-radius:14px;padding:18px;margin:18px 0;">
<p style="font-weight:700;color:#1e40af;margin:0 0 12px;">Egzanp vòt idantite:</p>
<ul style="color:#374151;font-size:0.93rem;line-height:2;margin:0;">
<li>Bwè yon vè dlo = vòt pou "moun ki pran swen kò l"</li>
<li>Reponn yon mesaj zanmi = vòt pou "moun ki konekte ak lòt"</li>
<li>Fè 5 minit meditasyon = vòt pou "moun ki pran swen lespri l"</li>
<li>Ekri yon fraz nan jounal = vòt pou "moun ki reflechi sou lavi l"</li>
</ul>
</div>
<h3>Idantite nan depresyon</h3>
<p>Depresyon pafwa fòse yon idantite: "Mwen se yon moun deprime. Mwen pa ka chanje." Clear montre: chak aksyon ou fè pou tèt ou se yon vòt kont idantite sa a. Menm lè ou pa santi l, aksyon yo di yon bagay diferan sou ki moun ou ye.</p>
<blockquote style="border-left:4px solid #3b82f6;padding:15px 18px;background:#eff6ff;border-radius:10px;margin:20px 0;font-style:italic;color:#1e40af;">"Prèske tout sa ou fè reflete idantite ou. Chanje idantite w = chanje lavi w, youn pa youn." — James Clear</blockquote>`)
    },
    {
      title: ch("4 Lwa Abitid Bon — Kreye yo","Les 4 Lois des Bonnes Habitudes — Les Créer","The 4 Laws of Good Habits — Creating Them"),
      content: ch(`
<h3>Fòmil klè pou kreye abitid ki kole</h3>
<p>Clear idantifye 4 lwa pou kreye yon abitid bon. Yo travay ansanm pou fè abitid la natirèl epi difisil pou abandone.</p>
<div style="display:flex;flex-direction:column;gap:14px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:12px;padding:16px;border-left:4px solid #10b981;">
<strong style="color:#065f46;font-size:1rem;">Lwa 1: Fè l EVIDAN</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">Mete rappèl vizib. "Mwen pral [ABITID] nan [LÈ] nan [KOTE]." Egzanp: "Mwen pral fè 5 minit meditasyon chak maten nan kabann mwen anvan m leve."</p>
</div>
<div style="background:#eff6ff;border-radius:12px;padding:16px;border-left:4px solid #3b82f6;">
<strong style="color:#1e40af;font-size:1rem;">Lwa 2: Fè l ATIRAN</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">Konbine abitid ou pa vle fè ak yon ou renmen ("konbinasyon tentasyon"). Mache pandan ou koute podcast ou renmen. Egzèsis pandan ou gade fim ou renmen.</p>
</div>
<div style="background:#faf5ff;border-radius:12px;padding:16px;border-left:4px solid #8b5cf6;">
<strong style="color:#5b21b6;font-size:1rem;">Lwa 3: Fè l FASIL</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">Redwi fwit lan. Mete chosèt egzèsis ou bò kabann ou la aswè. Prepare smoothy materyèl la yè. Rann abitid la osi fasil pou kòmanse ke posib.</p>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;border-left:4px solid #f59e0b;">
<strong style="color:#92400e;font-size:1rem;">Lwa 4: Fè l SATISFEZAN</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">Rekonpans imedyat. Fè yon tchèk nan yon kalandrye. Di "Bravo" ba tèt ou. Pran yon ti moman pou rele sante. Sèvo a bezwen santi satisfaksyon imedyat pou repete konpòtman.</p>
</div>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 Chwazi yon abitid byennèt ou vle kòmanse. Aplike 4 lwa yo: Ki sa ou pral fè pou l evidan? Atiran? Fasil? Satisfezan? Ekri repons yo.</p>
</div>`)
    },
    {
      title: ch("Rule of Two Minutes — Kòmanse Toujou","La Règle des Deux Minutes — Toujours Commencer","The Two Minute Rule — Always Start"),
      content: ch(`
<h3>Prensip ki kraze pwoblèm motivasyon</h3>
<p>Clear bay yon règ ki senp men efikas: "Lè w kòmanse yon nouvo abitid, li ta dwe pran mwens pase de minit pou fè."</p>
<p>Pifò blòk kont abitid yo se blòk pou <em>kòmanse</em> — pa pou kontinye. Rule of Two Minutes règle sa.</p>
<h3>Egzanp aplikasyon</h3>
<div style="display:flex;flex-direction:column;gap:10px;margin:18px 0;font-size:0.9rem;">
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
<div style="background:#fef2f2;border-radius:8px;padding:10px;color:#374151;"><em>Vle kouri chak jou →</em></div>
<div style="background:#f0fdf4;border-radius:8px;padding:10px;color:#065f46;"><strong>Mete soulye kouri ou</strong></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
<div style="background:#fef2f2;border-radius:8px;padding:10px;color:#374151;"><em>Vle li chak swa →</em></div>
<div style="background:#f0fdf4;border-radius:8px;padding:10px;color:#065f46;"><strong>Louvri yon liv</strong></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
<div style="background:#fef2f2;border-radius:8px;padding:10px;color:#374151;"><em>Vle ekri jounal →</em></div>
<div style="background:#f0fdf4;border-radius:8px;padding:10px;color:#065f46;"><strong>Ekri yon fraz</strong></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
<div style="background:#fef2f2;border-radius:8px;padding:10px;color:#374151;"><em>Vle medite →</em></div>
<div style="background:#f0fdf4;border-radius:8px;padding:10px;color:#065f46;"><strong>Chita, fèmen je 2 minit</strong></div>
</div>
</div>
<h3>Poukisa 2 minit chanje tout</h3>
<p>Yon abitid ta dwe yon pòt pwensipal, pa yon destinasyon. Lè ou kòmanse ak 2 minit, ou:</p>
<ul style="line-height:2;">
<li>Elimine fwit psikolojik devan habitid la</li>
<li>Bati idantite "moun ki fè abitid sa a"</li>
<li>Souvan kontinye natirèlman pi lwen pase 2 minit</li>
</ul>
<p>Clear di: "Ou pa pral toujou santi w motivé. Men ou ka toujou fè 2 minit."</p>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;">"Ebauche yon abitid anvan ou eseye la mètrize. Premye, asire ou ke l egziste." — James Clear</blockquote>`)
    },
    {
      title: ch("Anviwonman — Kontèks ki Kontwole Nou","L'Environnement — Le Contexte qui nous Contrôle","Environment — The Context That Controls Us"),
      content: ch(`
<h3>Ou pa gen move volonte — ou gen move anviwonman</h3>
<p>Clear fè yon obsèvasyon etonan: moun ki parèt "gen gwo volonte" pa nesesèman pi fò psikolojikman — yo gen pi bon anviwonman. Yo pa goumen kont tantasyon — yo strukture lavi yo pou yo pa jwenn tentasyon yo.</p>
<h3>Kòman anviwonman kontwole konpòtman</h3>
<p>Rechèch montre ke nou pran plis pase 40% desizyon nou yo otomatikman — reflex nan anviwonman nou, pa chwa konsyan. Donk chanje anviwonman an = chanje desizyon yo san efò.</p>
<div style="display:flex;flex-direction:column;gap:12px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:10px;padding:14px;border-left:4px solid #10b981;">
<strong>Vle manje pi sèn?</strong> Mete fwi yo sou kont nan kwizin. Kache junk food.
</div>
<div style="background:#eff6ff;border-radius:10px;padding:14px;border-left:4px solid #3b82f6;">
<strong>Vle li plis?</strong> Mete yon liv sou tab bwason w chak swa. Retire aplikasyon rezo sosyal de ekran dakèy telefòn.
</div>
<div style="background:#faf5ff;border-radius:10px;padding:14px;border-left:4px solid #8b5cf6;">
<strong>Vle egzèsis?</strong> Mete soulye egzèsis bò kabann ou. Mete rad spò la aswè anvan ou dòmi.
</div>
<div style="background:#fef9c3;border-radius:10px;padding:14px;border-left:4px solid #f59e0b;">
<strong>Vle medite?</strong> Kreye yon kwen espesyal — yon chèz, yon kousen, yon kote ou pa janm travay. Anviwonman an aktivé konpòtman.
</div>
</div>
<h3>Anviwonman byennèt mantal</h3>
<p>Clear ba nou yon konsèp enpòtan: kreye yon "espas byennèt" — yon kote fizik asosye avèk swen tèt ou sèlman. Lespri a aprann asosye espas ak konpòtman.</p>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;font-size:1.05rem;">"Ou pa leve chak maten ak yon lespri ki vide. Ou leve pou pote chaj abitid, anviwonman, ak idantite ou. Chanje yon nan yo, chanje ou." — James Clear</blockquote>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Refòm anviwonman jodi a:</strong> Gade kote ou pase plis tan. Ki yon chanjman ou ka fè nan 10 minit ki ta fè abitid byennèt ou pi fasil? Fè chanjman sa a kounye a.</p>
</div>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 7. KISA EMOSYON YO — Equip Zepòl (5 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-feelings',
  title: ch("Konprann Santiman w","Comprendre tes Émotions","Understanding Your Feelings"),
  author:"Equip Zepòl",
  cover:"assets/book_cover2.jpg",
  description: ch(
    "Yon gid pratik pou idantifye, aksepte ak jere emosyon difisil yo — ekri pou kontèks Ayisyen.",
    "Guide pratique pour identifier, accepter et gérer les émotions difficiles — contexte haïtien.",
    "Practical guide to identify, accept and manage difficult emotions — Haitian context."
  ),
  pages:51,
  chapters:[
    {
      title: ch("Emosyon se Done — Pa Ennmi","Les Émotions sont des Données — Pas des Ennemis","Emotions Are Data — Not Enemies"),
      content: ch(`
<h3>Kilti nou ak emosyon</h3>
<p>Ann Ayiti, tankou nan anpil kilti Karayib ak Lafrik, nou aprann souvan pou nou pa montre emosyon nou yo — sitou nan piblik. "Gason pa kriye." "Fanm fò pa pete." "Pa kite moun wè ou fèb." Ces mesaj, pandan y ap pwoteje nou nan kèk kontèks, ka kreye yon relasyon danjere ak pwòp lavi entèryè nou.</p>
<h3>Sa rechèch di sou reprime emosyon</h3>
<p>Chèchè James Gross montre ke lè nou reprime emosyon nou — eseye sispann santi yo — kò a kontinye santi yo, souvan pi fò. Reprime emosyon:</p>
<ul style="line-height:2.2;">
<li>Ogmante tansyon arteriyèl</li>
<li>Degrade relasyon (moun santi distans nou)</li>
<li>Diminye byennèt psikolojik sou longtèm</li>
<li>Pouse emosyon yo "anba" kote yo vin pi difisil pou jere</li>
</ul>
<h3>Emosyon kòm enfòmasyon</h3>
<p>Chak emosyon ba nou yon mesaj:</p>
<div style="display:flex;flex-direction:column;gap:10px;margin:18px 0;font-size:0.9rem;">
<div style="background:#fef2f2;border-radius:8px;padding:12px;border-left:3px solid #ef4444;"><strong>Kòlè:</strong> Yon limit depase. Yon enjistis. Yon bezwen ki pa respekte.</div>
<div style="background:#eff6ff;border-radius:8px;padding:12px;border-left:3px solid #3b82f6;"><strong>Tristès:</strong> Yon pèt. Yon chanjman. Yon bagay ki te gen valè.</div>
<div style="background:#fff7ed;border-radius:8px;padding:12px;border-left:3px solid #f97316;"><strong>Laperèz:</strong> Yon danje pèse. Yon bezwen pou pwoteksyon.</div>
<div style="background:#faf5ff;border-radius:8px;padding:12px;border-left:3px solid #8b5cf6;"><strong>Wont:</strong> Yon vyolasyon nan nòm sosyal oswa valè pèsonèl.</div>
<div style="background:#f0fdf4;border-radius:8px;padding:12px;border-left:3px solid #10b981;"><strong>Jwa:</strong> Yon bezwen satisfè. Yon valè konfime.</div>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Jounal Emosyon:</strong> Pou yon semèn, chak swa, ekri: "Jodi a mwen te santi [emosyon]. Sa l te di mwen se [mesaj]." Pratik sa a ba ou aksè ak sagès entèryè ou.</p>
</div>`)
    },
    {
      title: ch("Woulo Emosyon Plutchik — Idantifye Yo","La Roue Émotionnelle de Plutchik","Plutchik's Wheel — Identifying Emotions"),
      content: ch(`
<h3>Pi pase "tris" oswa "kontan"</h3>
<p>Anpil fwa lè moun mande "Kòman ou ye?" nou reponn "tris" oswa "bien". Rechèchè Robert Plutchik dekouvri ke nou gen 8 emosyon debaz — epi chak youn gen entansite ak konbinasyon ki kreye yon rich spektrum.</p>
<h3>8 Emosyon Debaz yo</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:18px 0;font-size:0.88rem;">
<div style="background:linear-gradient(135deg,#fee2e2,#fca5a5);border-radius:10px;padding:12px;text-align:center;"><strong>KÒLÈ</strong><br><span style="color:#374151;font-size:0.82rem;">depi aji → kaolin</span></div>
<div style="background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:10px;padding:12px;text-align:center;"><strong>SIPRIZ</strong><br><span style="color:#374151;font-size:0.82rem;">depi distrakasyon → stupefaksyon</span></div>
<div style="background:linear-gradient(135deg,#dbeafe,#93c5fd);border-radius:10px;padding:12px;text-align:center;"><strong>TRISTÈS</strong><br><span style="color:#374151;font-size:0.82rem;">depi pensan → lapèn</span></div>
<div style="background:linear-gradient(135deg,#d1fae5,#6ee7b7);border-radius:10px;padding:12px;text-align:center;"><strong>JWA</strong><br><span style="color:#374151;font-size:0.82rem;">depi serennité → eksta</span></div>
<div style="background:linear-gradient(135deg,#ede9fe,#c4b5fd);border-radius:10px;padding:12px;text-align:center;"><strong>KONFYANS</strong><br><span style="color:#374151;font-size:0.82rem;">depi akseptasyon → admiration</span></div>
<div style="background:linear-gradient(135deg,#fdf2f8,#f9a8d4);border-radius:10px;padding:12px;text-align:center;"><strong>DEGOU</strong><br><span style="color:#374151;font-size:0.82rem;">depi ennwi → aversion</span></div>
<div style="background:linear-gradient(135deg,#fff7ed,#fdba74);border-radius:10px;padding:12px;text-align:center;"><strong>ANTISIPASYON</strong><br><span style="color:#374151;font-size:0.82rem;">depi atansyon → vigilans</span></div>
<div style="background:linear-gradient(135deg,#f0fdf4,#4ade80);border-radius:10px;padding:12px;text-align:center;"><strong>KRENT</strong><br><span style="color:#374151;font-size:0.82rem;">depi aprehansyon → terreur</span></div>
</div>
<h3>Konbinasyon ki kreye emosyon konplèks</h3>
<p>Jwa + Konfyans = Amou. Tristès + Krent = Dezespwa. Kòlè + Anticipasyon = Agresivite.</p>
<p>Depresyon klinike pa yon emosyon senp — li yon pakèt emosyon: tristès + degou (de tèt ou) + krent + pèdi jwa.</p>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Pratik rafi:</strong> Pou yon semèn, pa di jis "tris" oswa "bien". Eseye itilize mo pi presiz: "mwen santi m izole", "mwen santi m espere", "mwen santi m ap grandi". Espesifik pote klaté.</p>
</div>`)
    },
    {
      title: ch("Gerizon Travma — Kontèks Ayisyen","Guérison du Trauma — Contexte Haïtien","Healing Trauma — Haitian Context"),
      content: ch(`
<h3>Travma kolektif Ayiti a</h3>
<p>Pèp Ayisyen an pote yon chaj travma kolektif ki eksepsyonèl: esklavaj, kolonyalis, tranblamantè, siklòn, enstabilite politik, emijrasyon. Sa a afekte sante mantal jenerasyon apre jenerasyon.</p>
<p>Rechèchè rele sa "travma entèjenerasyon" — doulè ki transmèt ki pafwa pa mo, men pa konpòtman, pè, epi sis ak osyolojik.</p>
<h3>Siy travma ki ka parèt kòm "mavi"</h3>
<p>Nan kominote Ayisyen yo (ak nan anpil kominote ki sibi opresyon istorik), sèten manifestasyon travma yo ka parèt "nòmal" ou "kiltirel" — men yo merite atansyon:</p>
<ul style="line-height:2.2;">
<li>Difikikte konfye moun deyò fanmi imedyat</li>
<li>Tandans pou panse "men bagay yo ka mal ale" menm lè tout bon</li>
<li>Reyaksyon siprize entans, hypervigilans</li>
<li>Difikilte rekonèt epi eskprime emosyon (nou apran pou nou "gere")</li>
<li>Sante fizik pwoblèm yo ki pa gen eksplikasyon medikal</li>
</ul>
<h3>Rezilyans kiltirel Ayisyen</h3>
<p>An menm tan, pèp Ayisyen an gen rezilyans espesyal. Kilti kominotè a — solidarite, "konbit", lapriyè, mizik — se baz rezilyans ki pemet sirviv apre tout chòk.</p>
<p>Nan kontèks sante mantal: fòs kiltirel sa yo ka manje depi nan tèt yo pou geri. Reyini familyal, priyè, mizik tradisyon, koneksyon kominote — yo tout gen pouvwa terapetik reyèl.</p>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;">"Rezilyans pa vle di pa soufri. Sa vle di soufri epi ankò travèse. Pèp Ayisyen an montre sa chak jou." — Equip Zepòl</blockquote>`)
    },
    {
      title: ch("Limite — Pwoteje Espas Mantal ou","Les Limites — Protéger ton Espace Mental","Boundaries — Protecting Your Mental Space"),
      content: ch(`
<h3>Kisa limit ye reyèlman</h3>
<p>Nan kilti Ayisyen an, pawòl "limit" ka parèt selfish oswa "ingra". Men Brené Brown ak Dr. Henry Cloud montre ke limit yo se yon gès lanmou — pou tèt ou <em>ak</em> pou lòt yo.</p>
<p>Moun ki pa gen limit yo pafwa vin resanti epi regrèt — sa ki kreye plis konfli pase si yo te di non ab initio.</p>
<h3>Limit nan relasyon fanmi Ayisyen</h3>
<p>Kontèks kiltilrèl patikilye: Ann Ayiti, fanmi gen yon enpòtans entral. Men fanmi ka tou tounen sous estrès enpòtan pou moun ki gen depresyon si pa gen limit klè.</p>
<div style="background:#f8fafc;border-radius:14px;padding:18px;margin:18px 0;border:1px solid #e2e8f0;">
<p style="font-weight:700;color:#374151;margin:0 0 12px;">Egzanp limit sèn pou kominote nou:</p>
<ul style="color:#4b5563;font-size:0.9rem;line-height:2.2;margin:0;">
<li>"Mwen renmen tout moun, men mwen bezwen yon ti tan pou kont mwen."</li>
<li>"Mwen pa kapab ede ak kòb la kounye a — mwen ka ede yon lòt fason."</li>
<li>"Mwen pa vle pale de pwoblèm sa a kounye a — tanpri respekte sa."</li>
<li>"Konvèsasyon sa a fè m mal — mwen pral kite kounye a."</li>
</ul>
</div>
<h3>Kòman mete yon limit avèk respè</h3>
<ol style="line-height:2.2;font-size:0.93rem;">
<li><strong>Klè:</strong> Di sa w vle dirèkteman, pa nan siyal</li>
<li><strong>Jantiy men fèm:</strong> Ton dou, men kontni pa negosiab</li>
<li><strong>San eksplikasyon twò long:</strong> "Non mèsi" se yon fraz konplè</li>
<li><strong>Konsistan:</strong> Si ou di non, kenbe l — konsistans bati respè</li>
</ol>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Idantifye:</strong> Ki kote nan lavi w ou bezwen yon limit ki pa la kounye a? Ak ki moun? Kòman ou ta ka eksprime l avèk jantiy men avèk klète?</p>
</div>`)
    },
    {
      title: ch("Chèche Èd — Akèyman Kouraj","Chercher de l'Aide — Acte de Bravoure","Seeking Help — An Act of Courage"),
      content: ch(`
<h3>Poukisa nou pa chèche èd</h3>
<p>Nan kilti Ayisyen an (ak anpil kilti mondyal), mande èd ka parèt kòm admèt feblès. Men konprann ki kote konsepsyon sa a sòti: li sòti nan pèp ki te oblije "fort" pou sirviv. Kouraj sirviv la vin konfond ak refiz feblès tout kalte.</p>
<p>Kounye a, sa k ap fè nou mal, se ke nou transpòte konsepsyon sa a menm lè nou pa nan menm kondisyon sirviv la. Nou pa bezwen "fò" ak doulè kèlkeswa.</p>
<h3>Mande èd se kouraj — pa feblès</h3>
<p>Panse l konsa: yon grenn sòlda ki sèl ka goumen kont yon gwo lame. Si li rele ranfò — eske sa feblès? Non — sa stratèji saj.</p>
<p>Mande èd vle di ou rekonèt reyalite sitiyasyon an. Sa a sijès entèlektyèl ak emosyonèl, pa feblès.</p>
<h3>Kijan chèche èd ann Ayiti</h3>
<ul style="line-height:2.2;font-size:0.93rem;">
<li><strong>Teraphy:</strong> Sikològ, konseye, terapist — klike "Anyè Sikològ" nan Zepòl la</li>
<li><strong>Kominote Zepòl:</strong> Pataje, koute, epi wè ke lòt moun gen menm difikilte yo</li>
<li><strong>Moun ou fè konfyans:</strong> Yon zanmi, yon manm fanmi — pale yon verite reyèl</li>
<li><strong>Lapriyè ak sosyete espirityèl:</strong> Pou moun ki kwè, espirityalite ka yon sipò enpòtan</li>
<li><strong>Lejans:</strong> Si ou nan kriz, rele 116 oswa +509 4005-7183</li>
</ul>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;font-size:1.05rem;">"Mande èd se premye pa pou gerizon. Pi gwo kouraj pa se kenbe doulè a — se kite l." — Equip Zepòl</blockquote>
<div style="background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%);border-radius:14px;padding:20px;margin:18px 0;text-align:center;">
<p style="margin:0 0 10px;font-weight:700;color:#1e40af;">Ou pa bezwen pote pwa sa a pou kont ou.</p>
<p style="margin:0;color:#1e40af;">Zepòl la isit la. Kominote a isit la. Nou la.</p>
</div>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 8. BATI REZIYANS — Equip Zepòl (5 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-resilience',
  title: ch("Bati Reziyans","Construire sa Résilience","Building Resilience"),
  author:"Equip Zepòl",
  cover:"assets/book_cover3.jpg",
  description: ch(
    "Gid pratik sou kòman rebati fòs apre soufrans — zouti sikolojik ki travay pou kontèks Ayisyen.",
    "Guide pratique pour reconstruire la force après la souffrance — outils psychologiques adaptés.",
    "Practical guide to rebuild strength after suffering — psychological tools that work."
  ),
  pages:53,
  chapters:[
    {
      title: ch("Reziyans — Konesans Fondamantal","La Résilience — Connaissances Fondamentales","Resilience — Foundational Knowledge"),
      content: ch(`
<h3>Kisa reziyans ye reyèlman?</h3>
<p>Reziyans pa vle di "pa gen emosyon" oswa "pa soufri". Nan rechèch, reziyans defini kòm: <em>kapasite pou adapte falyableman fas ak adversite, travma, trajedi, menas, oswa gwo sous estrès.</em></p>
<p>Sa enpòtan pou konprann: reziyans pa karakteristik ou genyen oswa ou pa genyen. Se yon <strong>misk</strong> ou ka devlope. Ou ka vin pi reziyan.</p>
<h3>Kisa rechèch montre sou reziyans</h3>
<p>American Psychological Association idantifye fachtè kle ki bati reziyans:</p>
<ul style="line-height:2.2;">
<li><strong>Relasyon ki sipòte:</strong> Youn nan pi gwo pwotektè kont depresyon</li>
<li><strong>Kapasite pou jere emosyon:</strong> Pa reprime, men regile</li>
<li><strong>Santiman kontwòl pèsonèl:</strong> Kwè w ka afekte pwòp sitiyasyon w</li>
<li><strong>Espwa reyalis:</strong> Kwè demen ka pi bon, menm si jodi a difisil</li>
<li><strong>Sans pèsonèl:</strong> Konnen poukisa ou la, poukisa ou kontinye</li>
</ul>
<h3>Bonjan nouvèl la</h3>
<p>Chak nan faktè sa yo ka devlope — yo pa fiks. Sa vle di: ou ka bati reziyans ou, kèlkeswa pwen ou depi. Li pa yon kous kont lòt yo — li yon travay ak tèt ou.</p>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;">"Reziyans pa vle di pa tonbe. Sa vle di chak fwa ou tonbe, ou aprann kòman leve yon ti kras pi vit." — Equip Zepòl</blockquote>`)
    },
    {
      title: ch("Post-Traumatik Kwasans — Grandi Nan Soufrans","Croissance Post-Traumatique","Post-Traumatic Growth"),
      content: ch(`
<h3>Fenomèn etonan</h3>
<p>Chèchè Richard Tedeschi ak Lawrence Calhoun dekouvri ke apre yon gwo travma, anpil moun eksperimante pa jis yon retounen nan "nòmal" — men yon kwasans reyèl ki depase nivo anvan travma a. Yo rele sa "Post-Traumatik Kwasans" (PTG).</p>
<h3>5 domèn PTG yo</h3>
<div style="display:flex;flex-direction:column;gap:12px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:10px;padding:14px;border-left:4px solid #10b981;">
<strong style="color:#065f46;">1. Fòs pèsonèl nouvo</strong>
<p style="margin:6px 0 0;font-size:0.9rem;">Dekouvri kapasite ou pa t konnen ou te genyen. "Si m te ka sibi sa a, mwen ka sibi anpil bagay."</p>
</div>
<div style="background:#eff6ff;border-radius:10px;padding:14px;border-left:4px solid #3b82f6;">
<strong style="color:#1e40af;">2. Nouvo posibilite</strong>
<p style="margin:6px 0 0;font-size:0.9rem;">Wè pòt ki pa t la anvan. Chanje direksyon lavi, jwenn nouvo vokasyon.</p>
</div>
<div style="background:#faf5ff;border-radius:10px;padding:14px;border-left:4px solid #8b5cf6;">
<strong style="color:#5b21b6;">3. Relasyon pi rich</strong>
<p style="margin:6px 0 0;font-size:0.9rem;">Relasyon ki sibi travma ak ou vin pi pwofon. Pèdi moun ki te sipèfisyèl. Geri moun ki te vrè.</p>
</div>
<div style="background:#fff7ed;border-radius:10px;padding:14px;border-left:4px solid #f97316;">
<strong style="color:#c2410c;">4. Apresyasyon pou lavi</strong>
<p style="margin:6px 0 0;font-size:0.9rem;">Ti bagay yo konte plis. Yon bèl maten, yon bon konvèsasyon, manje ou renmen.</p>
</div>
<div style="background:#fef9c3;border-radius:10px;padding:14px;border-left:4px solid #f59e0b;">
<strong style="color:#92400e;">5. Pwofondè espirityèl</strong>
<p style="margin:6px 0 0;font-size:0.9rem;">Kesyon fondamantal — sou sans lavi, sou sans soufrans — jwenn repons pi rich.</p>
</div>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Refleksyon PTG:</strong> Panse ak yon difikilte ou te pase. Kisa ou aprann sou tèt ou ladan l? Ki domèn nan 5 ki parèt nan eksperyans ou?</p>
</div>`)
    },
    {
      title: ch("Teknik Konkrèt pou Bati Reziyans","Techniques Concrètes pour Bâtir la Résilience","Concrete Techniques to Build Resilience"),
      content: ch(`
<h3>Pratik Evidence-Based</h3>
<p>Research montre ke reziyans bati pa pawòl sèlman — li bati nan pratik chak jou. Men teknik ki pi sipòte nan rechèch.</p>
<div style="display:flex;flex-direction:column;gap:14px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:12px;padding:16px;border-left:4px solid #10b981;">
<strong style="color:#065f46;font-size:1rem;">1. Jounal Gratitud (3 × pa semèn)</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">Ekri 3 bagay ou rekonesan pou yo. Rechèch Emmons ak McCullough montre sa redwi depresyon pa 35% sou 6 semèn.</p>
</div>
<div style="background:#eff6ff;border-radius:12px;padding:16px;border-left:4px solid #3b82f6;">
<strong style="color:#1e40af;font-size:1rem;">2. Reframign Kognitif</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">Pou chak evènman negatif, mande: "Ki lòt fason pou wè sa?" Pa niye doulè a — chèche yon pèspektiv adisyonèl.</p>
</div>
<div style="background:#faf5ff;border-radius:12px;padding:16px;border-left:4px solid #8b5cf6;">
<strong style="color:#5b21b6;font-size:1rem;">3. Sèvis Bay Lòt</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">Volontè regilye redwi estrès, bati sans, konekte avèk kominote. Youn nan pi gwo "medikaman" kont depresyon.</p>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;border-left:4px solid #f59e0b;">
<strong style="color:#92400e;font-size:1rem;">4. Egzèsis Fizik</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">30 minit, 3 fwa pa semèn. Pou depresyon modere, pase anpil antidepresè pou anpil moun (etid Blumenthal 2007).</p>
</div>
<div style="background:#f0fdf4;border-radius:12px;padding:16px;border-left:4px solid #10b981;">
<strong style="color:#065f46;font-size:1rem;">5. Koneksyon Sosyal Pwofon</strong>
<p style="margin:8px 0 0;font-size:0.9rem;color:#374151;">Pa kantite zanmi — kalite koneksyon. 1-2 relasyon pwofon plis proteje pase 20 relasyon sipèfisyèl.</p>
</div>
</div>`)
    },
    {
      title: ch("Plan Kriz — Pare Anvan Li Rive","Plan de Crise — Se Préparer Avant","Crisis Plan — Prepare Before It Arrives"),
      content: ch(`
<h3>Poukisa planifye pou kriz</h3>
<p>Meilleu moman pou planifye pou yon kriz se lè ou pa nan kriz. Lè ou nan kriz, lespri ou pa ka panse klè. Yon plan ki deja la ede ou aji san bezwen deside.</p>
<h3>Kreye Plan Kriz Pèsonèl ou</h3>
<div style="background:white;border:2px solid #e2e8f0;border-radius:15px;padding:22px;margin:18px 0;">
<p style="font-weight:700;color:#374151;margin:0 0 16px;font-size:1.05rem;">📋 Plan Kriz Mwen (egzanp pou konplete)</p>
<div style="display:flex;flex-direction:column;gap:14px;font-size:0.9rem;">
<div><strong style="color:#374151;">Senyòm alèt bonè m yo:</strong><br><span style="color:#6b7280;font-style:italic;">_________________________________</span></div>
<div><strong style="color:#374151;">Moun mwen rele an premye:</strong><br><span style="color:#6b7280;font-style:italic;">Nòm: _______ Nimewo: _______</span></div>
<div><strong style="color:#374151;">3 bagay ki ede m toujou:</strong><br><span style="color:#6b7280;font-style:italic;">1. ______ 2. ______ 3. ______</span></div>
<div><strong style="color:#374151;">Kote ki an sekirite pou mwen:</strong><br><span style="color:#6b7280;font-style:italic;">_________________________________</span></div>
<div><strong style="color:#374151;">Nimewo ijans:</strong><br><span style="color:#10b981;">116 (nasyonal) | +509 4005-7183 (Zepòl)</span></div>
</div>
</div>
<h3>Plan pou jou ki difisil (pa jis kriz)</h3>
<p>Pa tann yon kriz pou gen yon plan. Kreye yon plan "jou gri" tou — yon lis aksyon pou fè lè ou pa nan kriz men ou pa nan bon jou:</p>
<ul style="line-height:2.2;font-size:0.93rem;">
<li>Jou gri → kouri 20 minit + rele yon zanmi</li>
<li>Jou difisil → teraphy sesyon emerjanis + konekte kominote Zepòl</li>
<li>Jou kriz → nimewo ijans + pati kote ki an sekirite</li>
</ul>`)
    },
    {
      title: ch("Viv Avèk Depresyon — Fè Lapè","Vivre avec la Dépression — Faire la Paix","Living with Depression — Making Peace"),
      content: ch(`
<h3>Gerizon pa toujou "disparèt" depresyon</h3>
<p>Pou kèk moun, depresyon se yon kondisyon ki jere pou longtèm — tankou dyabèt oswa hypertensyon. Gerizon pa nesesèman vle di depresyon disparèt nèt — li ka vle di aprann viv ak li jan pou l pa kontwole ou.</p>
<p>Sa a pa yon echèk. Sa a yon reyalite pou anpil moun, epi li gen yon dignite pwòp li.</p>
<h3>Diferans ant "sibi" ak "jere"</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0;">
<div style="background:#fef2f2;border-radius:12px;padding:14px;border-top:3px solid #ef4444;">
<strong style="color:#b91c1c;">Sibi depresyon (sik mal):</strong>
<ul style="font-size:0.88rem;color:#374151;margin:8px 0 0;padding-left:14px;line-height:1.9;">
<li>Pa rekonèt senyòm yo</li>
<li>Izole</li>
<li>Abandone zouti yo</li>
<li>Trete depresyon kòm identite</li>
</ul>
</div>
<div style="background:#f0fdf4;border-radius:12px;padding:14px;border-top:3px solid #10b981;">
<strong style="color:#065f46;">Jere depresyon (sik gerizon):</strong>
<ul style="font-size:0.88rem;color:#374151;margin:8px 0 0;padding-left:14px;line-height:1.9;">
<li>Rekonèt senyòm bonè</li>
<li>Aktive plan kriz</li>
<li>Kontinye zouti yo</li>
<li>Separe mwen de maladi a</li>
</ul>
</div>
</div>
<h3>Afimation final</h3>
<div style="background:linear-gradient(135deg,#f0fdf4 0%,#d1fae5 100%);border-radius:15px;padding:25px;margin:18px 0;text-align:center;">
<p style="font-size:1.1rem;color:#065f46;font-weight:600;margin:0 0 10px;">Ou pi gwo pase depresyon an.</p>
<p style="color:#374151;font-size:0.95rem;margin:0 0 10px;">Ou se pa maladi ou. Ou se moun ki gen depresyon.</p>
<p style="color:#374151;font-size:0.95rem;margin:0;">Diferans sa a enpòtan. Epi chak jou ou leve — ou montre li.</p>
</div>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;font-size:1.05rem;">"Gerizon pa yon desitinasyon. Se yon jan pou viv — avèk konsyans, avèk zouti, avèk kominote." — Equip Zepòl</blockquote>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 9. CHÈCHE SANS — Viktor Frankl (5 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-mans-search',
  title: ch("Chèche Sans pou Lavi a","Découvrir un Sens à sa Vie","Man's Search for Meaning"),
  author:"Viktor Frankl",
  cover:"assets/book_cover1.jpg",
  description: ch(
    "Yon sikyat ki sirviv kamp konsan Nazi yo montre ke jwenn yon sans ka sove lavi — menm nan pi gwo doulè.",
    "Un psychiatre survivant des camps nazis prouve que trouver un sens peut sauver une vie.",
    "A psychiatrist who survived Nazi camps proves that finding meaning can save a life."
  ),
  pages:50,
  chapters:[
    {
      title: ch("Nan Kamp Konsan yo — Obsèvasyon Yon Sikyat","Dans les Camps — Les Observations d'un Psychiatre","In the Camps — A Psychiatrist's Observations"),
      content: ch(`
<h3>Kontèks etonan</h3>
<p>Viktor Frankl te gen 37 an lè Nazi yo te arete l nan 1942. Li te gen maniskri yon travay syantifik enpòtan — Logoterapi. Yo te retire l de men li epi boule l nan Auschwitz. Pandan 3 an, li te nan kamp konsan kote kondisyon yo te depase tout sa nou ka imajine.</p>
<p>Men li te toujou sikyat. Li te obsève. Li te pran nòt nan tèt li. Epi yon verite te parèt klè:</p>
<blockquote style="border-left:4px solid #1e40af;padding:15px 18px;background:#eff6ff;border-radius:10px;margin:18px 0;font-style:italic;color:#1e3a8a;font-size:1.05rem;">"Moun ki ka ede yo nan soufrans a ki pral ede yo — se moun ki te jwenn yon sans pou soufrans lan." — Viktor Frankl</blockquote>
<h3>Sa k te distenge sivivan yo</h3>
<p>Frankl te wè moun ki te sirviv pi lontan an gen kèk pwen komon:</p>
<ul style="line-height:2.2;">
<li>Yo te kenbe yon imaj klè sou yon moun yo te renmen oswa yon pwojè yo vle fini</li>
<li>Yo te kapab jwenn yon "rezon" kèlkeswa pou yo te kontinye</li>
<li>Yo te kapab distanse tèt yo emosyonèlman de soufrans la — obsève l kòm si se yon lòt moun</li>
</ul>
<h3>Dechifre poukisa sa travay</h3>
<p>Nietzsche te di: "Moun ki gen yon poukisa pou viv ka sipòte prèske nenpòt kòman." Frankl te wè sa konkrètman, pa kòm filozofi, men kòm reyalite sikolojik verifye an kondisyon ekstrem.</p>`)
    },
    {
      title: ch("Logoterapi — Geri pa Sans","La Logothérapie — Guérir par le Sens","Logotherapy — Healing Through Meaning"),
      content: ch(`
<h3>Pi lwen pase Freud ak Adler</h3>
<p>Freud te di motivasyon fondamantal imen an se rechèch plezi. Adler te di se rechèch pouvwa. Frankl di: se rechèch <em>sans</em>. Epi lè sans la manke, gen yon "vid egzistansyèl" ki ka kreye soufrans pwofon.</p>
<h3>Logoterapi an pratik</h3>
<p>Logoterapi (logo = sans nan grèk ancien) pa chèche elimine soufrans — li chèche ede moun jwenn sans nan soufrans yo, pou yo ka pote l avèk dinyite.</p>
<div style="background:#eff6ff;border-radius:14px;padding:20px;margin:18px 0;">
<p style="font-weight:700;color:#1e40af;margin:0 0 14px;">3 Fason pou Jwenn Sans (Frankl):</p>
<div style="display:flex;flex-direction:column;gap:12px;font-size:0.92rem;color:#374151;">
<div style="background:white;border-radius:8px;padding:12px;border-left:3px solid #10b981;"><strong>Kreye yon travay oswa fè yon jès:</strong> Kontribye yon bagay — gwo oswa piti. Ekri, ede yon moun, plante.</div>
<div style="background:white;border-radius:8px;padding:12px;border-left:3px solid #3b82f6;"><strong>Eksperyanse yon bagay oswa rankontre yon moun:</strong> Lanmou. Bote. Verite. Yon konvèsasyon pwofon.</div>
<div style="background:white;border-radius:8px;padding:12px;border-left:3px solid #8b5cf6;"><strong>Chwazi atitid ou fas ak soufrans:</strong> La fòm pi gwo kouraj imen — chwazi ki jan ou reyaji lè ou pa ka chanje sitiyasyon an.</div>
</div>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Kesyon Frankl:</strong> "Kisa ki tann ou demen?" Ekri yon repons — menm si li piti. Menm yon repon tankou "wè soley leve a" ase. Yo tout valab.</p>
</div>`)
    },
    {
      title: ch("Libète Dènye — Chwazi Atitid ou","La Dernière Liberté — Choisir son Attitude","The Last Freedom — Choosing Your Attitude"),
      content: ch(`
<h3>Sa yo te pran — sa yo pa t ka pran</h3>
<p>Nan kamp lan, Nazi yo te pran tout bagay Frankl te genyen: kay, fanmi, travay, maniskri, rad, non — tout. Men yon bagay yo pa t ka pran:</p>
<p style="font-size:1.1rem;text-align:center;color:#1e3a8a;font-weight:700;margin:20px 0;padding:15px;background:#eff6ff;border-radius:12px;">"Libète mwen pou chwazi atitid mwen fas ak nenpòt seri sikonstans."</p>
<h3>Pratik libète dènye a</h3>
<p>Frankl di: lè ou pa ka chanje sitiyasyon an, ou ka toujou chwazi <em>kijan ou reyaji</em>. Sa a pa fasil — men sa a toujou posib.</p>
<div style="background:#f8fafc;border-radius:14px;padding:18px;margin:18px 0;border:1px solid #e2e8f0;">
<p style="font-weight:700;color:#374151;margin:0 0 12px;">Egzanp aplikasyon:</p>
<ul style="color:#4b5563;line-height:2.2;font-size:0.93rem;margin:0;">
<li>Depresyon la — ou pa ka "chwazi" pou sispann deprime. Men ou ka chwazi fè yon ti pa pou geri jodi a.</li>
<li>Travma pase a — ou pa ka chanje l. Men ou ka chwazi ki sans pou li ba w jodi a.</li>
<li>Pèdi yon moun ou renmen — ou pa ka rann sa. Men ou ka chwazi honore yo ak jan w ap viv.</li>
</ul>
</div>
<blockquote style="border-left:4px solid #1e40af;padding:15px 18px;background:#eff6ff;border-radius:10px;margin:20px 0;font-style:italic;color:#1e3a8a;font-size:1.05rem;">"Tout sa yo ka pran nan yon moun eksèpte yon bagay: dènye libète imen — libète chwazi pwòp atitid ou fas ak nenpòt seri sikonstans." — Viktor Frankl</blockquote>`)
    },
    {
      title: ch("Soufrans ak Sans — Paradòks Pwisan","Souffrance et Sens — Le Paradoxe Puissant","Suffering and Meaning — A Powerful Paradox"),
      content: ch(`
<h3>Frankl pa glorifye soufrans</h3>
<p>Li enpòtan pou klèrifye: Frankl pa di soufrans la bon, oswa ke nou dwe chèche l. Li di: si soufrans la la epi ou pa ka evite l, ou ka chwazi kijan pou reyaji avèk li.</p>
<h3>Istwa vye doktè a</h3>
<p>Yon vye doktè te vini wè Frankl. Li t ap soufri anpil depi mò madanm li. Frankl te poze yon sèl kesyon: "Si se ou ki te mouri an premye, kòman madanm ou ta santi l?"</p>
<p>Doktè a te di: "Li ta soufri terib."</p>
<p>Frankl te di: "Wèl. Ou ap ekonomize soufrans sa a ba li. Men pri a se soufrans ou. Sa a te gen sans — soufrans ou a."</p>
<p>Doktè a te leve epi pati san yon mo. Men li pa t kriye ankò.</p>
<h3>Transfòme soufrans nan sens</h3>
<p>Sa a pa fasil. Men pou moun ki ap soufri, yon kesyon sa ka ede: "Si eksperyans doulè sa a te gen yon sous, yon rezon, yon leson — kisa li ta ye?" Pa bezwen jwenn yon repons parfè. Jis poze kesyon an.</p>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 Panse ak yon soufrans ou pote kounye a. Mande: "Ki jan eksperyans sa a ap chanje m? Ki fòs li ap ka revele nan mwen? Kisa m ka fè ak sa m ap aprann?"</p>
</div>`)
    },
    {
      title: ch("Lespwa ak Siviv — Leçon Frankl","L'Espoir et la Survie — Les Leçons de Frankl","Hope and Survival — Frankl's Lessons"),
      content: ch(`
<h3>Kè de yo ki te pèdi espwa</h3>
<p>Frankl dekri de ka espesifik ki te frape l. Yon zanmi te di l: "Mwen pa ka wè okenn rezon pou kontinye. Mwen pa espere anyen nan lavi."</p>
<p>Frankl te reponn: "Ou pa kesyon pou poze se ki rezon ou espere nan lavi. Lavi a k ap poze kesyon ba ou. Ou dwe reponn — avèk vi ou, avèk aksyon ou."</p>
<h3>Ranvèse kesyon an</h3>
<p>Sa a prensip ki pran anpil tan pou konprann men ki transformatif: ranvèse kesyon an. Pa "Ki rezon mwen gen pou viv?" — men "Ki rezon lavi a ba mwen pou mwen la?"</p>
<p>Diferans lan subtil men kle: premye kesyon an mete w kòm jij de lavi a. Dezyèm nan mete w kòm moun ki gen yon responsabilite fè fas ak lavi a.</p>
<h3>Twa rezon pou rete — aplike nan Zepòl</h3>
<p>Frankl identifye ke sivivan yo souvan kenbe nan youn nan twa:</p>
<ol style="line-height:2.2;font-size:0.95rem;">
<li><strong>Yon moun yo te vin wè ankò:</strong> Yon zanmi, yon pitit, yon paran, yon mennaj.</li>
<li><strong>Yon travay yo te vle fini:</strong> Yon pwojè, yon rèv, yon atizay, yon sèvis.</li>
<li><strong>Yon verite yo te vle temwaye:</strong> Yon istwa pou rakonte, yon leson pou transmèt.</li>
</ol>
<div style="background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%);border-radius:15px;padding:22px;margin:18px 0;text-align:center;">
<p style="font-size:1.05rem;color:#1e40af;font-weight:600;margin:0 0 10px;">Ki youn nan twa yo ki vrè pou ou kounye a?</p>
<p style="color:#374151;font-size:0.92rem;margin:0;">Ekri li. Gade li chak maten.</p>
</div>
<blockquote style="border-left:4px solid #1e40af;padding:15px 18px;background:#eff6ff;border-radius:10px;margin:20px 0;font-style:italic;color:#1e3a8a;font-size:1.05rem;">"An dènyè analiz, sa ki te pèmèt nou sirviv pa t te yon bagay eksteryè. Se te desizyon entèryè pou pa kite sirkonstans ekstèryè detèmine valè nou." — Viktor Frankl</blockquote>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 10. BIBLIOTEYK MINWI — Matt Haig (5 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-midnight',
  title: ch("Bibliyotèk Minwi a","La Bibliothèque de Minuit","The Midnight Library"),
  author:"Matt Haig",
  cover:"assets/book_cover2.jpg",
  description: ch(
    "Yon roman filozofik — Nora Seed dekouvri ke chak chwa ki pa pran ta ka mennen lòt vwa, men lavi li genyen gen pwòp valè li.",
    "Un roman philosophique — Nora découvre que chaque vie a sa propre valeur.",
    "A philosophical novel — Nora discovers that every life has its own value."
  ),
  pages:50,
  chapters:[
    {
      title: ch("Minwi nan Lavi Nora","Minuit dans la Vie de Nora","Midnight in Nora's Life"),
      content: ch(`
<h3>Yon nwit ki chanje tout</h3>
<p>Nora Seed gen 35 an. Li pèdi travay li — kòm pwofesè mizik. Chat li mouri. Frè l pa pale avèk li. Garson li te renmen marye yon lòt moun. Li santi l regrèt chak desizyon li te janm pran.</p>
<p>Nan yon nwit, li deside lavi a pa vo lapèn. Men olye l mouri, li reyveye nan yon bibliyotèk etranj — ak ray liv inifini kote lumyè la tounen vèt lè janm yo pase 12:00.</p>
<p>Bibliotekyè a — Mme Elm, ki te chèf bibliyotèk li a lè li te timoun — esplike l: "Chak liv nan bibliyotèk sa a reprezante yon lòt lavi ou ta ka te viv. Si w chwazi yon liv, ou antre ladan l."</p>
<h3>Liv Regre a</h3>
<p>Nan bibliyotèk la, gen yon liv espesyal — "Liv Regre a" — ki plen tout desizyon Nora te regrèt. Chak paj se yon lòt pòt ki ta ka te louvri.</p>
<p>Haig itilize konsèp sa a pou poze yon kesyon fondamantal: <em>Eske lòt chwa nou ta ka te fè ta reyèlman ban nou yon lavi pi bon?</em></p>
<blockquote style="border-left:4px solid #6c5ce7;padding:15px 18px;background:#f5f3ff;border-radius:10px;margin:20px 0;font-style:italic;color:#4c1d95;">"Pwoblèm nan pa t ke lavi Nora te vid. Pwoblèm nan se ke li pa t wè tout sa ki te la." — Matt Haig</blockquote>`)
    },
    {
      title: ch("Lòt Lavi yo — Vizit nan Posibilite","Les Autres Vies — Visite des Possibilités","Other Lives — Visiting Possibilities"),
      content: ch(`
<h3>Nora kòmanse eksplore</h3>
<p>Nora antre nan plizyè lòt lavi yo:</p>
<ul style="line-height:2.5;font-size:0.95rem;">
<li><strong>Lavi kote l te rete avèk gason l te renmen:</strong> Marye, but malkirèz — li santi l pèdi tèt li nan maryaj la, pèdi rèv li.</li>
<li><strong>Lavi kote l te vin natatè Olenpik:</strong> Bèl, men izolasyon espesifik atlèt elit, estrès konpetisyon, pa gen lavi sosyal.</li>
<li><strong>Lavi kote l te vin rokès mons:</strong> Selebrite, men anksyete, alkolism, relasyon broken.</li>
<li><strong>Lavi kote l te vin chèchè glacyè ann Antiboreal:</strong> Pwofon ak satisfezan — epi li wè ke sa a te pi pre pase tout lòt yo.</li>
</ul>
<h3>Dekouvèt etonan</h3>
<p>Chak "lavi pafè" li te imajine te gen pwòp doulè, pwòp rekòmansman, pwòp vid. Rèv ke nou panse ki ta "solye" tout bagay — yo gen pwòp pwoblèm yo lè yo vin reyalite.</p>
<p>Sa a pa vle di pa dwe gen rèv — men se yon leson sou kòman nou ideyalize vwa nou pa pran epi devalye vwa nou genyen.</p>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Refleksyon:</strong> Ki "lavi" ou imajine ke ou ta pi kontan ladan l? Panse konkrètman sou sa ta ka manke ladan l, pwoblèm ki ta la. Sa chanje fason ou wè vwa ou?</p>
</div>`)
    },
    {
      title: ch("Verite Sou Regre","La Vérité sur les Regrets","The Truth About Regrets"),
      content: ch(`
<h3>Regre bay manti</h3>
<p>Youn nan pwen santral liv la: regre nou gen sou desizyon yo souvan baze sou yon presupozisyon fo — ke si nou te pran yon lòt chwa, tout bagay ta pi bon.</p>
<p>Men lavi pi konplèks pase sa. Chak chwa fèmen kèk pòt epi louvri lòt. Chwa "pafè" ki pa egziste — paske tout vwayaj gen pwòp challenge yo.</p>
<h3>Rechèch sou regre</h3>
<p>Sikològ Daniel Kahneman montre ke nou plis wont de aksyon ki te ka diferan pase non-aksyon. Men pandan tan, pwobabilite yo chanje: pifò moun nan fen lavi yo regrèt plis bagay yo PA te fè pase bagay yo te fè.</p>
<h3>Kòman travay avèk regre</h3>
<p>Haig ofri yon egzèsis:</p>
<ol style="line-height:2.2;font-size:0.93rem;">
<li>Panse ak yon gwo regre ou pote.</li>
<li>Imajine lavi sa a an detay — pa sèlman bon aspè yo, men tout defi yo tou.</li>
<li>Mande tèt ou: "Eske mwen sèten ke lòt vwa ta te pi bon?"</li>
<li>Lèfini: "Ki valè ki la nan vwa mwen genyen kounye a?"</li>
</ol>
<blockquote style="border-left:4px solid #6c5ce7;padding:15px 18px;background:#f5f3ff;border-radius:10px;margin:20px 0;font-style:italic;color:#4c1d95;">"Chak desizyon ki te mèn nou isit la — menm yo ki te difisil — yo tout te mèn nou bò yon moun nou kapab kontinye vin." — Matt Haig</blockquote>`)
    },
    {
      title: ch("Moman ki Konte — Piti Bagay yo","Les Moments qui Comptent — Les Petites Choses","The Moments That Matter — Small Things"),
      content: ch(`
<h3>Dekouvèt Nora — espès bèl</h3>
<p>Nan tout eksplorasyon lòt lavi li yo, Nora kòmanse wè yon patit: moman ki fè l santi l vrèman vivan pa janm te gwo evènman yo — se te ti bagay senp ki ta ka parèt ensinifyan:</p>
<div style="background:white;border:1px solid #ede9fe;border-radius:14px;padding:20px;margin:18px 0;">
<ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;font-size:0.93rem;color:#374151;">
<li>🌙 Yon nwit ète kote l te danse nan lakou paran l avèk frè l</li>
<li>☕ Gou kafe ki te fè l tounen nan matin l te renmen travay la</li>
<li>🎵 Yon chanson ki te kaptire egzakteman sa l te santi yon jou l te tris</li>
<li>🐱 Papiyon chat li — souri li, sèten l te fè pou Nora sèlman</li>
<li>🤝 Konvèsasyon ak yon vye vwazen ki te di l yon bagay li pa t ka bliye</li>
</ul>
</div>
<h3>Prezans kontra abse</h3>
<p>Haig di: lè nou ap chèche "gwo" lavi — sikses, richès, renomé — nou pafwa raté richès ki deja la. Prezans ak piti bagay yo se yon kapasite ki ka devlope.</p>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Koleksyon Moman:</strong> Pou yon semèn, ekri chak swa yon "moman" ki te ka fasil rate — yon son, yon souri, yon gou, yon konvèsasyon piti. Kè w ap kòmanse wè richès ki te la tout tan.</p>
</div>`)
    },
    {
      title: ch("Retou — Chwazi Lavi ou","Le Retour — Choisir Sa Vie","The Return — Choosing Your Life"),
      content: ch(`
<h3>Moman desizyon Nora a</h3>
<p>Nan pwen pi kritik la, Nora oblije chwazi: rete nan bibliyotèk la (ki vle di mouri) oswa retounen nan pwòp lavi li — ak tout enpèfeksyon li, ak tout doulè li, ak tout potansyèl li ki pa ko reyalize.</p>
<p>Pou premye fwa, li rekonèt: li vle viv. Pa yon lavi pafè imajinè — lavi <em>li</em>, avèk tout moun ki nan li, tout opòtinite ki anko posib.</p>
<h3>Sa ki te chanje</h3>
<p>Nora pa retounen avèk yon lavi ki diferan — li retounen avèk yon <em>pèspektiv</em> ki diferan. Li wè:</p>
<ul style="line-height:2.2;font-size:0.93rem;">
<li>Vwazen l ki te toujou la epi li pa t janm wè</li>
<li>Opòtinite pou rakòmode relasyon avèk frè l</li>
<li>Pasyon pou mizik ki te toujou la, men kache anba regre</li>
<li>Kapasite ede lòt moun avèk eksperyans gerizon li</li>
</ul>
<h3>Mesaj final Haig ba nou</h3>
<p>Liv la pa di lavi a toujou fasil. Li di lavi a toujou gen posibilite — menm lè nou pa ka wè yo. Epi chwa pou rete — pou kontinye — se youn nan akò ki pi bèl yon moun ka fè.</p>
<div style="background:linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%);border-radius:15px;padding:22px;margin:20px 0;text-align:center;">
<p style="font-size:1.1rem;color:#4c1d95;font-weight:600;margin:0 0 10px;">Lavi w — avèk tout enpèfeksyon li — vo lapèn.</p>
<p style="color:#374151;font-size:0.93rem;margin:0;">Pa lavi yon lòt moun. Pa lavi ou ta ka te genyen. <strong>Sa a, jodi a.</strong></p>
</div>
<blockquote style="border-left:4px solid #6c5ce7;padding:15px 18px;background:#f5f3ff;border-radius:10px;margin:20px 0;font-style:italic;color:#4c1d95;font-size:1.05rem;">"Li te reyalize — nan bi lavi a pa ta dwe yon dènye desizyon. Bi li se te viv." — Matt Haig</blockquote>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 11. WALDEN — Henry David Thoreau (5 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-walden',
  title: ch("Walden — Yon Vi Senp","Walden — Une Vie Simple","Walden — A Simple Life"),
  author:"Henry David Thoreau",
  cover:"assets/book_cover3.jpg",
  description: ch(
    "Refleksyon sou lavi senp, nati, ak chèche sa ki esansyèl — yon antidòt kont estrès lavi modèn.",
    "Réflexion sur la vie simple, la nature et l'essentiel — un antidote au stress moderne.",
    "Reflection on simple living, nature, and the essential — an antidote to modern stress."
  ),
  pages:52,
  chapters:[
    {
      title: ch("Poukisa Thoreau te Ale nan Bwa","Pourquoi Thoreau est Allé dans les Bois","Why Thoreau Went to the Woods"),
      content: ch(`
<h3>Yon eksperyans radikal</h3>
<p>An 1845, Henry David Thoreau te gen 28 an. Li te bati yon ti kay ak men l bò yon lak ki rele Walden, nan Massachusetts. Li te viv la pou kont li pandan 2 an, 2 mwa, 2 jou. Objektif li: dekouvri sa ki vrèman nesesè nan lavi.</p>
<p>Li te ekri: <em>"Mwen te ale nan bwa yo paske mwen te vle viv delibereman, fè fas sèlman ak fè esansyèl lavi a, epi wè si mwen pa t ka aprann sa li te gen pou anseye — pou mwen pa dekouvri, lè mwen vin mouri, ke mwen pa t janm viv."</em></p>
<h3>Sa Thoreau t ap fwi</h3>
<p>Thoreau te wè moun otou li k ap "viv lavi dezespwa nan silans" — travay san sans, dèt, achte bagay yo pa bezwen, pou enpresyone moun yo pa renmen. Li te di sa a "dezespwa silansye" — yon depresyon ki kache anba aktivite.</p>
<h3>Leson pou nou jodi a</h3>
<p>Nou pa bezwen ale nan bwa pou aprann leson Thoreau a. Men nou ka mande:</p>
<ul style="line-height:2.2;">
<li>Kisa ki vrèman nesesè nan lavi mwen?</li>
<li>Konbyen nan estrès mwen sòti nan bagay mwen pa reyèlman bezwen?</li>
<li>Eske m ap viv lavi mwen — oswa lavi yo te di m pou m viv?</li>
</ul>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;font-size:1.05rem;">"Mas moun mennen lavi dezespwa nan silans. Sa yo rele resignasyon se dezespwa konfime." — Thoreau</blockquote>`)
    },
    {
      title: ch("Senplisite — Mwens se Plis","La Simplicité — Moins c'est Plus","Simplicity — Less is More"),
      content: ch(`
<h3>Pwen santral Thoreau a</h3>
<p>Thoreau te dekouvri ke pifò sa nou panse nou bezwen — nou pa bezwen. Epi chak bagay nou posede mande tan, atansyon, ak enèji pou kenbe l. Plis nou genyen, plis nou esklav.</p>
<p>Li te ekri: <em>"Senplisite, senplisite, senplisite! Mwen di, kite afè ou yo se de oswa twa, pa yon san oswa yon mil."</em></p>
<h3>Senplisite ak sante mantal</h3>
<p>Rechèch modèn konfime entwisyon Thoreau a. "Fatig desizyon" se reyèl — chak chwa nou fè konsome enèji mantal. Anviwonman ki ankonbre, aganda ki twò plen, twòp opsyon — yo tout ogmante anksyete.</p>
<div style="background:#f0fdf4;border-radius:14px;padding:18px;margin:18px 0;">
<p style="font-weight:700;color:#065f46;margin:0 0 12px;">Senplifye pou redwi estrès:</p>
<ul style="color:#374151;line-height:2;font-size:0.92rem;margin:0;">
<li><strong>Espas:</strong> Yon chanm ki ranje kalme lespri a</li>
<li><strong>Tan:</strong> Mwens angajman = plis espas pou respire</li>
<li><strong>Dijital:</strong> Mwens notifikasyon, mwens rezo sosyal = mwens konparezon</li>
<li><strong>Desizyon:</strong> Rutin senp elimine fatig chwa</li>
</ul>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Egzèsis Senplisite:</strong> Chwazi yon sèl domèn (yon tirwa, telefòn ou, aganda semèn nan). Retire 3 bagay ki pa esansyèl. Obsève kijan ou santi w apre.</p>
</div>`)
    },
    {
      title: ch("Solitud — Pa Menm ak Izolasyon","La Solitude — Différente de l'Isolement","Solitude — Different from Isolation"),
      content: ch(`
<h3>Distenksyon kle</h3>
<p>Thoreau te pase anpil tan pou kont li, men li te klè: solitud (chwazi) pa menm bagay ak izolasyon (fòse). Solitud volontè ka geri. Izolasyon ki sòti nan depresyon fè mal.</p>
<p>Li te ekri: <em>"Mwen pa janm jwenn yon konpayon ki te tèlman bon konpayon ke solitud."</em></p>
<h3>Poukisa solitud sen enpòtan</h3>
<p>Nan solitud volontè, nou ka:</p>
<ul style="line-height:2.2;">
<li>Tande pwòp vwa nou san bri lemonn</li>
<li>Dekouvri sa nou reyèlman panse ak santi</li>
<li>Konekte ak pwòp valè nou san presyon sosyal</li>
<li>Repoze sistèm nève a sou-stimulé</li>
</ul>
<h3>Difference ak izolasyon depresyon</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:12px;padding:14px;border-top:3px solid #10b981;">
<strong style="color:#065f46;">Solitud (geri)</strong>
<p style="font-size:0.88rem;color:#374151;margin:6px 0 0;">Chwazi. Bay enèji. Ou santi w konekte ak tèt ou. Ou ka retounen nan moun.</p>
</div>
<div style="background:#fef2f2;border-radius:12px;padding:14px;border-top:3px solid #ef4444;">
<strong style="color:#b91c1c;">Izolasyon (mal)</strong>
<p style="font-size:0.88rem;color:#374151;margin:6px 0 0;">Fòse. Pran enèji. Ou santi w koupe. Ou pè retounen nan moun.</p>
</div>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Pratik Solitud Sen:</strong> Pran 30 minit pa semèn — pa telefòn, pa televizyon, pa konvèsasyon. Jis ou ak panse ou. Ekri sa ki parèt. Sa diferan de izolasyon — se yon randevou ak tèt ou.</p>
</div>`)
    },
    {
      title: ch("Viv nan Prezan — Leson Lak la","Vivre dans le Présent — La Leçon du Lac","Living in the Present — The Lake's Lesson"),
      content: ch(`
<h3>Lak Walden kòm mèt</h3>
<p>Thoreau te pase è ap obsève lak la. Li te aprann ke lak la te toujou prezan — li pa t enkyete sou yè ni sou demen. Li te jis reflete syèl la, sezon yo, limyè a — moman pa moman.</p>
<p>Thoreau te ekri: <em>"Ou pa ka touye tan san blese etènite."</em> Sa vle di: chak moman gen valè enfini si nou prezan ladan l.</p>
<h3>Travay vs Prezans</h3>
<p>Thoreau te kritike fonse pou "pwogrè" ki fè nou rate lavi a. Li te di nou tèlman okipe ak preparasyon pou lavi ke nou bliye viv. Sa frape jodi a plis pase janm — nou tèlman konekte ak telefòn nou ke nou rate moman reyèl yo.</p>
<h3>Pratik prezans Thoreau a</h3>
<div style="background:#eff6ff;border-radius:14px;padding:18px;margin:18px 0;">
<p style="font-weight:700;color:#1e40af;margin:0 0 12px;">Obsèvasyon Nati (15 minit):</p>
<ol style="color:#374151;line-height:2.2;font-size:0.92rem;margin:0;">
<li>Ale deyò — yon pak, yon jaden, menm yon fenèt ak yon pyebwa</li>
<li>Chwazi yon sèl bagay natirèl (yon pyebwa, nyaj, zwazo)</li>
<li>Obsève l pandan 15 minit san telefòn</li>
<li>Remake detay ou pa t janm wè anvan</li>
<li>Lè lespri ou ale, dousman tounen sou obsèvasyon an</li>
</ol>
</div>
<p>Etid montre "bain de forêt" (Shinrin-yoku nan Japon) redwi kortizon, tansyon arteryèl, ak senyòm depresyon. Thoreau te konnen sa 150 an anvan syans la prouve l.</p>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;">"Mwen te ale nan bwa yo paske mwen te vle viv delibereman... epi pa, lè mwen vin mouri, dekouvri ke mwen pa t janm viv." — Thoreau</blockquote>`)
    },
    {
      title: ch("Retounen — Pote Leson yo nan Lavi","Le Retour — Ramener les Leçons","The Return — Bringing the Lessons Back"),
      content: ch(`
<h3>Poukisa Thoreau te kite Walden</h3>
<p>Apre 2 an, Thoreau te kite kay bò lak la. Li te ekri: <em>"Mwen te kite bwa yo pou yon rezon osi bon ke pou m te ale la. Petèt mwen te santi mwen te gen plizyè lòt lavi pou viv, epi mwen pa t ka pèdi plis tan sou sa a."</em></p>
<p>Sa enpòtan: objektif la pa t te chape pou tout tan — se te aprann leson epi pote yo retounen nan lavi nòmal.</p>
<h3>Leson Walden pou lavi modèn</h3>
<div style="display:flex;flex-direction:column;gap:12px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:10px;padding:14px;border-left:4px solid #10b981;">
<strong style="color:#065f46;">Senplifye:</strong> Ou pa bezwen yon kay nan bwa — ou ka senplifye kote ou ye kounye a.
</div>
<div style="background:#eff6ff;border-radius:10px;padding:14px;border-left:4px solid #3b82f6;">
<strong style="color:#1e40af;">Konekte ak nati:</strong> Menm 20 minit deyò chak jou chanje sante mantal ou.
</div>
<div style="background:#faf5ff;border-radius:10px;padding:14px;border-left:4px solid #8b5cf6;">
<strong style="color:#5b21b6;">Solitud regilye:</strong> Pran tan ak tèt ou — pa kòm pinisyon, men kòm kado.
</div>
<div style="background:#fef9c3;border-radius:10px;padding:14px;border-left:4px solid #f59e0b;">
<strong style="color:#92400e;">Viv delibereman:</strong> Chwazi konsyan kòman ou pase tan ou — pa jis swiv kouran.
</div>
</div>
<blockquote style="border-left:4px solid #10b981;padding:15px 18px;background:#f0fdf4;border-radius:10px;margin:20px 0;font-style:italic;color:#065f46;font-size:1.05rem;">"Si yon moun mache avèk konfyans nan direksyon rèv li, epi efòse l pou viv lavi li te imajine, li pral rankontre yon siksè inekspekte nan moman òdinè." — Thoreau</blockquote>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 12. KÒ A SONJE — Dr. Bessel van der Kolk (5 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-body-score',
  title: ch("Kò a Sonje Tout Bagay","Le Corps n'Oublie Rien","The Body Keeps the Score"),
  author:"Dr. Bessel van der Kolk",
  cover:"assets/book_cover1.jpg",
  description: ch(
    "Kijan travma rete andedan kò a — ak metòd modèn pou geri reyèlman, pi lwen pase pawòl sèlman.",
    "Comment le traumatisme reste dans le corps — et comment guérir vraiment.",
    "How trauma lives in the body — and how to truly heal."
  ),
  pages:54,
  chapters:[
    {
      title: ch("Travma Rete nan Kò a","Le Trauma Reste dans le Corps","Trauma Lives in the Body"),
      content: ch(`
<h3>Dekouvèt revolisyonè</h3>
<p>Dr. Bessel van der Kolk te travay 40 an avèk sivivan travma — veteran lagè, sivivan abi, viktim aksidan. Li te dekouvri yon bagay ki te chanje konpreyansyon nou sou travma: <em>travma pa jis nan memwa — li rete nan kò a.</em></p>
<h3>Kijan travma fonksyone nan sèvo</h3>
<p>Lè nou travèse yon evènman traumatik, "amygdala" (deteketè dife sèvo a) aktive. Kò a inonde ak adrenarin ak kortizon. Sa pèmèt nou kouri oswa goumen. Men nan travma, sistèm sa a pa "etenn" apre danje a pase. Li rete aktif — kòm si menas la toujou prezan.</p>
<h3>Siy kò a ap kenbe travma</h3>
<ul style="line-height:2.2;">
<li>Doulè fizik san eksplikasyon medikal (tèt fè mal, doulè do, pwoblèm vant)</li>
<li>Reyaksyon siprize entans (ou sote fasil)</li>
<li>Hypervigilans — ou toujou "sou gad"</li>
<li>Santi dekonekte de kò ou oswa de reyalite</li>
<li>Kochma, flashback, oswa souvni ki anvayi</li>
<li>Difikilte rilaks menm nan moman sekirite</li>
</ul>
<blockquote style="border-left:4px solid #6b7280;padding:15px 18px;background:#f8fafc;border-radius:10px;margin:20px 0;font-style:italic;color:#374151;">"Travma a se pa evènman an limèm — se anpranta li kite nan sèvo, lespri, ak kò." — Dr. van der Kolk</blockquote>`)
    },
    {
      title: ch("Poukisa Pale Sèlman pa Sifi","Pourquoi Parler ne Suffit Pas","Why Talking Isn't Enough"),
      content: ch(`
<h3>Limit teraphy klasik</h3>
<p>Van der Kolk fè yon obsèvasyon ki sezi: pou anpil moun ki gen travma, pale sèlman de eksperyans la pa ase pou geri — epi pafwa li ka menm re-traumatize.</p>
<p>Poukisa? Paske travma yo pa estoke kòm istwa avèk mo nan sèvo a. Yo estoke kòm sansasyon, imaj, ak reyaksyon kò. Pati sèvo a ki jenere lang (Broca) souvan "etenn" pandan travma.</p>
<h3>Sa sa vle di pou gerizon</h3>
<p>Pou rive nan travma a, nou bezwen yon apwòch ki enkli kò a — pa sèlman pawòl. Sa pa vle di teraphy pawòl initil — li vle di li souvan pa ase pou kont li.</p>
<div style="background:#eff6ff;border-radius:14px;padding:18px;margin:18px 0;">
<p style="font-weight:700;color:#1e40af;margin:0 0 12px;">Apwòch ki enkli kò a:</p>
<ul style="color:#374151;line-height:2;font-size:0.92rem;margin:0;">
<li>Yoga ak mouvman konsyan</li>
<li>Respirasyon kontwole</li>
<li>EMDR (mouvman je)</li>
<li>Teyat, dans, atizay</li>
<li>Touche terapetik (masaj, akupuntir)</li>
</ul>
</div>
<p>Sa pa vle di abandone teraphy pawòl — li vle di konbine l avèk apwòch ki travay sou kò a tou.</p>`)
    },
    {
      title: ch("Yoga ak Mouvman — Reklame Kò ou","Le Yoga et le Mouvement — Reconquérir son Corps","Yoga and Movement — Reclaiming Your Body"),
      content: ch(`
<h3>Etid yoga ak travma</h3>
<p>Van der Kolk te kondwi etid sou yoga ak fanm ki te gen PTSD chronik (twoub estrès post-traumatik). Rezilta yo te enpresyonan: yoga te redwi senyòm PTSD plis pase nenpòt medikaman yo te teste.</p>
<p>Poukisa? Paske travma fè moun santi yo pa an sekirite nan pwòp kò yo. Yoga ede yo "reklame" kò yo — aprann santi sansasyon fizik san laperèz.</p>
<h3>Prensip dèyè a</h3>
<p>Lè ou nan travma, kò a santi tankou yon kote danjere. Yoga (ak lòt mouvman konsyan) anseye sèvo a ke kò a ka yon kote sekirite ankò. Chak pòz, chak souf, di sèvo a: "Mwen an kontwòl. Mwen an sekirite."</p>
<div style="background:#f0fdf4;border-radius:14px;padding:18px;margin:18px 0;">
<p style="font-weight:700;color:#065f46;margin:0 0 12px;">Pratik senp pou kòmanse (5 minit):</p>
<ol style="color:#374151;line-height:2.2;font-size:0.92rem;margin:0;">
<li>Chita oswa kanpe komftableman</li>
<li>Mete yon men sou vant ou, yon sou lestomak ou</li>
<li>Respire dousman — santi men yo monte ak desann</li>
<li>Bouje dousman — vire kou ou, woule zepòl ou</li>
<li>Remake sansasyon yo san jije — jis obsève</li>
</ol>
</div>
<blockquote style="border-left:4px solid #6b7280;padding:15px 18px;background:#f8fafc;border-radius:10px;margin:20px 0;font-style:italic;color:#374151;">"Pou geri travma, ou dwe aprann abite nan kò ou ankò — santi l, fè l konfyans, jwenn lapè ladan l." — Dr. van der Kolk</blockquote>`)
    },
    {
      title: ch("Respirasyon ak Sistèm Nève a","La Respiration et le Système Nerveux","Breathing and the Nervous System"),
      content: ch(`
<h3>Pòt antre nan sistèm nève a</h3>
<p>Van der Kolk eksplike ke respirasyon se youn nan pi pwisan zouti pou regile sistèm nève a — paske li se sèl fonksyon otonomik nou ka kontwole konsyan.</p>
<p>Lè nou respire dousman ak pwofon — espesyalman lè ekspirasyon an pi long pase enspirasyon — nou aktive "sistèm parasenpatik" (repo ak dijesyon), ki kalme reyaksyon estrès la.</p>
<h3>Koherans Kadyak</h3>
<p>Yon teknik ki byen etidye: respire 5 segonn antre, 5 segonn sòti — 6 souf pa minit. Sa kreye "koherans kadyak" — yon eta kote kè, souf, ak sèvo sinkronize. Etid montre li redwi anksyete ak ogmante klèté mantal.</p>
<div style="background:#eff6ff;border-radius:14px;padding:18px;margin:18px 0;text-align:center;">
<p style="font-weight:700;color:#1e40af;margin:0 0 14px;">Teknik 4-7-8 (van der Kolk rekòmande):</p>
<div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
<div style="background:#bfdbfe;border-radius:10px;padding:12px 18px;"><strong>4</strong><br><span style="font-size:0.82rem;">souf antre</span></div>
<div style="background:#a5b4fc;border-radius:10px;padding:12px 18px;"><strong>7</strong><br><span style="font-size:0.82rem;">kenbe</span></div>
<div style="background:#818cf8;color:white;border-radius:10px;padding:12px 18px;"><strong>8</strong><br><span style="font-size:0.82rem;">lage dousman</span></div>
</div>
<p style="color:#1e40af;font-size:0.85rem;margin:14px 0 0;">Repete 4 fwa. Itilize l nan moman estrès oswa anvan dòmi.</p>
</div>
<p>Zepòl gen yon zouti respirasyon entegre nan seksyon Byennèt ak nan jwèt "Ritm Souf" la — eseye yo!</p>`)
    },
    {
      title: ch("Koneksyon — Sèvo Geri nan Sekirite","La Connexion — Le Cerveau Guérit dans la Sécurité","Connection — The Brain Heals in Safety"),
      content: ch(`
<h3>Nou geri nan relasyon</h3>
<p>Van der Kolk mete aksan sou yon verite fondamantal: sèvo imen an se yon ògan sosyal. Nou geri pi byen nan prezans moun ki fè nou santi nou an sekirite. Izolasyon agrave travma; koneksyon geri l.</p>
<h3>Poukisa koneksyon geri</h3>
<p>Lè nou avèk yon moun nou fè konfyans, sèvo nou libere oksitosín — yon òmòn ki kalme reyaksyon estrès la. Yon gade jantiy, yon vwa dou, yon touche an sekirite — yo tout siyale sèvo a: "Ou an sekirite kounye a."</p>
<div style="background:#f0fdf4;border-radius:14px;padding:18px;margin:18px 0;">
<p style="font-weight:700;color:#065f46;margin:0 0 12px;">Kalite koneksyon ki geri:</p>
<ul style="color:#374151;line-height:2;font-size:0.92rem;margin:0;">
<li><strong>Sekirite:</strong> Yon relasyon kote ou pa pè jije</li>
<li><strong>Konsistans:</strong> Moun ki la regilyèman, pa jis nan kriz</li>
<li><strong>Atansyon:</strong> Yon moun ki vrèman koute, san eseye "fiks" ou</li>
<li><strong>Reciprosite:</strong> Bay ak resevwa — pa jis youn fason</li>
</ul>
</div>
<h3>Pou moun ki izole</h3>
<p>Si ou pa gen koneksyon sa yo kounye a, sa pa vle di ou pap janm genyen yo. Kòmanse piti:</p>
<ul style="line-height:2.2;">
<li>Yon mesaj bay yon ansyen zanmi</li>
<li>Yon konvèsasyon nan kominote Zepòl la</li>
<li>Yon gwoup sipò (an pèsòn oswa anliy)</li>
<li>Yon terapist — yon relasyon pwofesyonèl ki an sekirite</li>
</ul>
<blockquote style="border-left:4px solid #6b7280;padding:15px 18px;background:#f8fafc;border-radius:10px;margin:20px 0;font-style:italic;color:#374151;font-size:1.05rem;">"Kò a gen sajès pwofon. Aprann koute l — epi konekte ak lòt moun an sekirite — se de nan pi gwo jès gerizon ou ka fè." — Dr. van der Kolk</blockquote>
<div style="background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%);border-radius:14px;padding:20px;margin:18px 0;text-align:center;">
<p style="margin:0;color:#1e40af;font-weight:600;">Kominote Zepòl la se yon espas sekirite. Ou pa pou kont ou.</p>
</div>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 13. KOURAJ VIRE DÒ JIJMAN — Brené Brown (5 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-daring',
  title: ch("Kouraj nan Fèblès","Le Pouvoir de la Vulnérabilité","Daring Greatly"),
  author:"Brené Brown",
  cover:"assets/book_cover2.jpg",
  description: ch(
    "Chèchè Brené Brown montre ke fèblès — kouraj pou montre ki moun ou ye — se sous vrè koneksyon ak kouraj.",
    "Brené Brown montre que la vulnérabilité est la source du vrai courage et de la connexion.",
    "Brené Brown shows vulnerability is the source of true courage and connection."
  ),
  pages:51,
  chapters:[
    {
      title: ch("Fèblès se pa Feblès","La Vulnérabilité n'est pas Faiblesse","Vulnerability is Not Weakness"),
      content: ch(`
<h3>12 an rechèch sou koneksyon imen</h3>
<p>Brené Brown se yon chèchè ki te pase 12 an ap etidye yon sèl kesyon: kisa ki pèmèt moun konekte reyèlman ak lòt yo? Repons li te dekouvri te sezi l: <strong>fèblès.</strong></p>
<p>Pa fèblès kòm mank fòs — men fèblès kòm kouraj pou montre ki moun ou reyèlman ye, san garanti rezilta a ap bon.</p>
<h3>Sa rechèch la montre</h3>
<p>Brown te entèvyouve dè milye moun. Li te dekouvri yon gwoup li rele "Kè Antye" — moun ki te gen yon kapasite natirèl pou koneksyon pwofon. Sa ki te distenge yo:</p>
<ul style="line-height:2.2;">
<li>Yo te kwè yo <strong>merite</strong> lanmou — pa paske yo pafè, men malgre enpèfeksyon yo</li>
<li>Yo te gen kouraj pou di "Mwen pa konnen" oswa "Mwen bezwen èd"</li>
<li>Yo te aksepte fèblès kòm pati nòmal nan eksistans imen</li>
<li>Yo te pratike konpasyon pou tèt yo</li>
</ul>
<blockquote style="border-left:4px solid #e84393;padding:15px 18px;background:#fdf2f8;border-radius:10px;margin:20px 0;font-style:italic;color:#9d174d;font-size:1.05rem;">"Fèblès se nesans pou koneksyon, kreyativite, ak chanjman. Se pa feblès — se pi gwo mezi kouraj nou genyen." — Brené Brown</blockquote>`)
    },
    {
      title: ch("Wont vs Koupabilite","Honte vs Culpabilité","Shame vs Guilt"),
      content: ch(`
<h3>De emosyon ki sanble men diferan nèt</h3>
<p>Brown fè yon distenksyon ki ka chanje fason ou trete tèt ou:</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:18px 0;">
<div style="background:#fef2f2;border-radius:14px;padding:16px;border-top:4px solid #ef4444;">
<strong style="color:#b91c1c;font-size:1rem;">WONT</strong>
<p style="font-size:0.9rem;color:#374151;margin:8px 0;">"Mwen <em>se</em> move."</p>
<p style="font-size:0.82rem;color:#6b7280;margin:0;">Touche idantite. Asosye ak depresyon, adiksyon, agresyon. Souvan irrasyonèl.</p>
</div>
<div style="background:#f0fdf4;border-radius:14px;padding:16px;border-top:4px solid #10b981;">
<strong style="color:#065f46;font-size:1rem;">KOUPABILITE</strong>
<p style="font-size:0.9rem;color:#374151;margin:8px 0;">"Mwen <em>fè</em> yon move bagay."</p>
<p style="font-size:0.82rem;color:#6b7280;margin:0;">Touche konpòtman. Ka motive chanjman pozitif. Souvan konstruktif.</p>
</div>
</div>
<h3>Wont se pwazon — empathi se antidòt</h3>
<p>Brown dekouvri ke wont grandi nan twa kondisyon: sekrè, silans, ak jijman. Li mouri nan twa lòt: pale, empathi, ak konpasyon.</p>
<p>Lè nou pataje sa nou wont de avèk yon moun ki reponn ak empathi, wont pa ka sirviv. Se poutèt sa pale — nan teraphy, nan kominote, ak yon zanmi — geri.</p>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 <strong>Egzèsis:</strong> Panse ak yon bagay ou wont de. Idantifye: eske se "Mwen se move" (wont) oswa "Mwen fè yon erè" (koupabilite)? Reframe l: "Mwen se yon moun ki fè erè — tankou tout moun."</p>
</div>`)
    },
    {
      title: ch("Move Kouvèti — Fason Nou Pwoteje Tèt Nou","Les Boucliers — Comment Nous Nous Protégeons","The Shields — How We Protect Ourselves"),
      content: ch(`
<h3>Fason nou evite fèblès</h3>
<p>Brown idantifye estrateji nou itilize pou pwoteje tèt nou kont fèblès — men ki an reyalite koupe nou de koneksyon ak jwa.</p>
<div style="display:flex;flex-direction:column;gap:12px;margin:18px 0;">
<div style="background:#fef2f2;border-radius:10px;padding:14px;border-left:4px solid #ef4444;">
<strong style="color:#b91c1c;">1. Pèfeksyonism</strong>
<p style="font-size:0.88rem;color:#374151;margin:6px 0 0;">"Si mwen pafè, mwen pap jwenn jijman." Men pèfeksyonism se yon fado ki pa janm satisfè — epi li blòk kreyativite ak jwa.</p>
</div>
<div style="background:#fff7ed;border-radius:10px;padding:14px;border-left:4px solid #f97316;">
<strong style="color:#c2410c;">2. Anestezi (Numbing)</strong>
<p style="font-size:0.88rem;color:#374151;margin:6px 0 0;">Nou eseye angourdi doulè ak alkòl, travay twòp, manje, ekran. Men nou pa ka angourdi doulè selèktivman — lè nou angourdi tristès, nou angourdi jwa tou.</p>
</div>
<div style="background:#faf5ff;border-radius:10px;padding:14px;border-left:4px solid #8b5cf6;">
<strong style="color:#5b21b6;">3. Foreboding Joy (Pè Jwa)</strong>
<p style="font-size:0.88rem;color:#374151;margin:6px 0 0;">Lè bon bagay rive, nou pè: "Sa twò bon — yon bagay mal pral rive." Nou pa kite tèt nou jwi paske nou pè pèdi.</p>
</div>
</div>
<h3>Antidòt: Gratitud ak prezans</h3>
<p>Brown dekouvri ke moun ki ka jwi jwa pleneman pratike gratitud aktif. Olye pè pèdi sa yo genyen, yo apresye l pleneman kounye a.</p>
<blockquote style="border-left:4px solid #e84393;padding:15px 18px;background:#fdf2f8;border-radius:10px;margin:20px 0;font-style:italic;color:#9d174d;">"Nou pa ka angourdi emosyon selektivman. Lè nou angourdi doulè, nou angourdi jwa, gratitud, ak kè kontan tou." — Brené Brown</blockquote>`)
    },
    {
      title: ch("Konpasyon pou Tèt Ou","L'Auto-Compassion","Self-Compassion"),
      content: ch(`
<h3>Trete tèt ou tankou yon zanmi</h3>
<p>Brown — ansanm ak chèchè Kristin Neff — montre ke konpasyon pou tèt ou se youn nan pi gwo zouti kont depresyon ak wont. Sa vle di trete tèt ou ak menm jantiy ou ta trete yon bon zanmi.</p>
<h3>3 eleman konpasyon pou tèt ou</h3>
<div style="display:flex;flex-direction:column;gap:12px;margin:18px 0;">
<div style="background:#f0fdf4;border-radius:10px;padding:14px;border-left:4px solid #10b981;">
<strong style="color:#065f46;">1. Jantiy pou tèt ou:</strong> Olye kritike tèt ou brital, pale ak tèt ou avèk konpreyansyon. "Sa difisil. Li nòmal pou m soufri."
</div>
<div style="background:#eff6ff;border-radius:10px;padding:14px;border-left:4px solid #3b82f6;">
<strong style="color:#1e40af;">2. Imanite komen:</strong> Sonje ke soufrans fè pati eksperyans imen. Ou pa sèl. Tout moun lite. "Lòt moun santi sa tou."
</div>
<div style="background:#faf5ff;border-radius:10px;padding:14px;border-left:4px solid #8b5cf6;">
<strong style="color:#5b21b6;">3. Konsyans (Mindfulness):</strong> Rekonèt doulè ou san egzajere ni minimize l. "Mwen ap soufri kounye a" — san drama, san repress.
</div>
</div>
<h3>Egzèsis konpasyon pou tèt ou</h3>
<div style="background:#fef9c3;border-radius:14px;padding:18px;margin:18px 0;">
<p style="font-weight:700;color:#92400e;margin:0 0 12px;">Lè ou nan yon moman difisil:</p>
<ol style="color:#78350f;line-height:2.2;font-size:0.92rem;margin:0;">
<li>Mete men ou sou kè ou</li>
<li>Di: "Sa a yon moman soufrans." (konsyans)</li>
<li>Di: "Soufrans fè pati lavi. Mwen pa sèl." (imanite komen)</li>
<li>Di: "Ke m janti ak tèt mwen. Ke m ba tèt mwen sa m bezwen." (jantiy)</li>
</ol>
</div>
<blockquote style="border-left:4px solid #e84393;padding:15px 18px;background:#fdf2f8;border-radius:10px;margin:20px 0;font-style:italic;color:#9d174d;">"Pale ak tèt ou tankou ou ta pale ak yon moun ou renmen." — Brené Brown</blockquote>`)
    },
    {
      title: ch("Oze Anpil — Viv ak Tout Kè","Oser Pleinement — Vivre de Tout Son Cœur","Daring Greatly — Living Wholeheartedly"),
      content: ch(`
<h3>Tit liv la sòti nan yon diskou</h3>
<p>"Daring Greatly" sòti nan yon diskou Theodore Roosevelt: <em>"Pa kritik la ki konte... Onè a apateni a moun ki reyèlman nan arèn nan, ki figi l makonnen ak pousyè, swè, ak san; ki oze anpil."</em></p>
<p>Brown itilize sa pou montre: viv ak fèblès vle di antre nan arèn nan — eseye, renmen, kreye — menm si ou ka echwe oswa blese.</p>
<h3>Sa sa vle di pratikman</h3>
<ul style="line-height:2.2;">
<li><strong>Nan relasyon:</strong> Renmen menm si ou ka blese. Di "Mwen renmen ou" an premye.</li>
<li><strong>Nan kreyativite:</strong> Kreye ak pataje menm si moun ka jije. Ekri, chante, fè atizay.</li>
<li><strong>Nan koneksyon:</strong> Pale verite ou. Mande èd. Di "Mwen pa byen" lè ou pa byen.</li>
<li><strong>Nan gerizon:</strong> Antre nan teraphy. Pale nan kominote. Oze chèche èd.</li>
</ul>
<h3>Pou moun ki gen depresyon</h3>
<p>Brown ofri yon mesaj pwisan pou moun k ap soufri: <em>jis montre — jis prezan, jis kontinye — se deja oze anpil.</em> Ou pa bezwen "geri pafètman" pou ou kourajèz. Chak jou ou leve epi eseye, ou nan arèn nan.</p>
<div style="background:linear-gradient(135deg,#fdf2f8 0%,#fce7f3 100%);border-radius:15px;padding:22px;margin:20px 0;text-align:center;">
<p style="font-size:1.1rem;color:#9d174d;font-weight:600;margin:0 0 10px;">Ou nan arèn nan.</p>
<p style="color:#374151;font-size:0.93rem;margin:0;">Chak fwa ou pataje, ou mande èd, ou eseye ankò — ou oze anpil. Sa a kouraj.</p>
</div>
<blockquote style="border-left:4px solid #e84393;padding:15px 18px;background:#fdf2f8;border-radius:10px;margin:20px 0;font-style:italic;color:#9d174d;font-size:1.05rem;">"Oze anpil pa vle di genyen oswa pèdi. Sa vle di parèt epi kite tèt ou wè — lè ou pa gen kontwòl sou rezilta a." — Brené Brown</blockquote>`)
    }
  ]
},

// ═══════════════════════════════════════════════════════════════
// 14. WONDER — R.J. Palacio (5 chapit)
// ═══════════════════════════════════════════════════════════════
{
  id:'book-wonder',
  title: ch("Mèvèy — Istwa Auggie","Wonder — L'Histoire d'Auggie","Wonder"),
  author:"R.J. Palacio",
  cover:"assets/book_cover3.jpg",
  description: ch(
    "Istwa yon timoun ki gen yon figi diferan ki anseye yon mond konplè leson sou jantiy ak akseptasyon.",
    "L'histoire d'un enfant au visage différent qui enseigne au monde la gentillesse.",
    "A child with a facial difference teaches the world about kindness and acceptance."
  ),
  pages:50,
  chapters:[
    {
      title: ch("Auggie — Yon Timoun Tankou Tout Lòt","Auggie — Un Enfant Comme les Autres","Auggie — A Child Like Any Other"),
      content: ch(`
<h3>Yon istwa sou diferans ak apatenans</h3>
<p>August "Auggie" Pullman gen 10 an. Li te fèt ak yon kondisyon medikal ki rann figi l diferan de lòt timoun. Li te fè 27 operasyon. Pou premye fwa, li pral antre nan yon lekòl regilye apre fè lekòl lakay pandan plizyè ane.</p>
<p>Auggie di yon bagay senp men pwofon nan kòmansman istwa a: <em>"Mwen konnen mwen pa yon timoun nòmal 10 an. Men andedan, mwen santi m nòmal. Se sèlman pa fason lòt moun gade m ki fè m santi m diferan."</em></p>
<h3>Sa istwa a anseye sou sante mantal</h3>
<p>"Wonder" pa yon liv sou maladi mantal — men li anseye leson pwofon ki enpòtan pou byennèt nou tout:</p>
<ul style="line-height:2.2;">
<li>Kijan jijman lòt moun afekte fason nou wè tèt nou</li>
<li>Pouvwa jantiy pou geri ak transfòme</li>
<li>Kouraj pou kontinye fas ak rejè</li>
<li>Enpòtans wè pi lwen pase aparans</li>
</ul>
<blockquote style="border-left:4px solid #f59e0b;padding:15px 18px;background:#fffbeb;border-radius:10px;margin:20px 0;font-style:italic;color:#92400e;">"Ou pa ka mélange nan foul la lè ou te fèt pou kanpe deyò." — R.J. Palacio</blockquote>`)
    },
    {
      title: ch("Premye Jou — Kouraj Fas ak Rejè","Le Premier Jour — Le Courage Face au Rejet","The First Day — Courage in the Face of Rejection"),
      content: ch(`
<h3>Pi gwo defi Auggie a</h3>
<p>Premye jou lekòl Auggie a difisil. Timoun gade l, kèk evite l, gen youn ki rele l non. Li santi tout sa moun ki "diferan" santi — rejè, izolasyon, dezi pou kache.</p>
<p>Men Auggie gen yon zouti pwisan: fanmi li renmen l san kondisyon, epi li te aprann ke valè li pa depann sou opinion lòt moun.</p>
<h3>Leson pou nou tout</h3>
<p>Nou tout — menm san yon diferans vizib — santi pafwa ke nou pa "antre", ke nou diferan, ke moun jije nou. Depresyon ak anksyete amplifye santiman sa yo.</p>
<div style="background:#eff6ff;border-radius:14px;padding:18px;margin:18px 0;">
<p style="font-weight:700;color:#1e40af;margin:0 0 12px;">Sa Auggie anseye sou rejè:</p>
<ul style="color:#374151;line-height:2;font-size:0.92rem;margin:0;">
<li>Rejè lòt moun pa defini valè ou</li>
<li>Yon sèl moun ki aksepte ou ka chanje tout</li>
<li>Kouraj se kontinye parèt menm lè difisil</li>
<li>Moun ki rejte souvan aji nan pwòp ensekirite yo</li>
</ul>
</div>
<div style="background:#fef9c3;border-radius:12px;padding:16px;margin:18px 0;">
<p style="margin:0;color:#92400e;">📝 Panse ak yon moman ou te santi rejte oswa diferan. Kisa ou ta di Auggie nan menm sitiyasyon? Kounye a — di menm bagay sa a ba tèt ou.</p>
</div>`)
    },
    {
      title: ch("Chwazi Jantiy","Choisir la Gentillesse","Choose Kind"),
      content: ch(`
<h3>Prensip santral liv la</h3>
<p>Mesye Browne, pwofesè Auggie a, anseye yon prensip chak mwa. Premye a vin filozofi tout liv la: <em>"Lè ou gen chwa ant gen rezon ak gen jantiy, chwazi jantiy."</em></p>
<p>Sa pa vle di toujou dakò ak tout moun. Sa vle di chèche konprann anvan jije, epi trete moun ak dinyite menm lè ou pa dakò.</p>
<h3>Jantiy kòm fòs gerizon</h3>
<p>Rechèch montre ke fè jès jantiy:</p>
<ul style="line-height:2.2;">
<li>Libere oksitosín ak serotonin (omimon byennèt) nan moun k ap bay ak moun k ap resevwa</li>
<li>Redwi anksyete ak senyòm depresyon</li>
<li>Kreye yon "efè domino" — jantiy enspire plis jantiy</li>
<li>Bay yon sans pèsonèl ak konekte ak lòt yo</li>
</ul>
<h3>Jantiy pou tèt ou tou</h3>
<p>Yon pwen enpòtan: "chwazi jantiy" aplike pou tèt ou tou. Moun ki gen depresyon souvan brital ak tèt yo. Auggie anseye nou trete tout moun — enkli tèt nou — ak konpasyon.</p>
<div style="background:#f0fdf4;border-radius:14px;padding:18px;margin:18px 0;">
<p style="font-weight:700;color:#065f46;margin:0 0 12px;">Defi Jantiy (chak jou pou yon semèn):</p>
<ul style="color:#374151;line-height:2;font-size:0.92rem;margin:0;">
<li>Jou 1: Di yon moun yon bagay pozitif sensè</li>
<li>Jou 2: Ede yon moun san yo mande</li>
<li>Jou 3: Voye yon mesaj ankourajan nan kominote Zepòl</li>
<li>Jou 4: Padone tèt ou pou yon erè</li>
<li>Jou 5: Koute yon moun san jije</li>
<li>Jou 6: Fè yon bagay jantiy pou tèt ou</li>
<li>Jou 7: Di mèsi bay yon moun ki te ede ou</li>
</ul>
</div>
<blockquote style="border-left:4px solid #f59e0b;padding:15px 18px;background:#fffbeb;border-radius:10px;margin:20px 0;font-style:italic;color:#92400e;">"Se pa ase pou jis bon. Ou dwe pi bon pase bon — ou dwe jantiy." — R.J. Palacio</blockquote>`)
    },
    {
      title: ch("Plizyè Pèspektiv — Tout Moun Gen Yon Batay","Plusieurs Perspectives — Chacun Mène un Combat","Many Perspectives — Everyone Fights a Battle"),
      content: ch(`
<h3>Inovasyon liv la</h3>
<p>"Wonder" rakonte istwa a de plizyè pwen de vi — Auggie, sè li Via, zanmi l yo. Chak moun gen pwòp batay yo ke lòt yo pa wè.</p>
<p>Via, sè Auggie a, renmen frè l — men li tou santi izole paske tout atansyon fanmi an sou Auggie. Li pa di sa paske li santi koupab. Chak moun nan istwa a pote yon chaj kache.</p>
<h3>Leson pwofon</h3>
<p>Yon pwen ki frape: <em>"Tout moun nan mond lan ap goumen yon batay ou pa konnen anyen sou li. Se poutèt sa — sois jantiy, toujou."</em></p>
<p>Sa enpòtan pou sante mantal: lè nou nan depresyon, nou panse nou sèl k ap soufri. Men reyalite a se ke prèske tout moun otou nou ap pote yon chaj kache.</p>
<div style="background:#faf5ff;border-radius:14px;padding:18px;margin:18px 0;">
<p style="font-weight:700;color:#5b21b6;margin:0 0 12px;">Sa sa vle di pou ou:</p>
<ul style="color:#374151;line-height:2;font-size:0.92rem;margin:0;">
<li>Ou pa sèl nan soufrans ou — lòt moun konprann</li>
<li>Moun ki sanble "byen" ka ap goumen tou</li>
<li>Konpasyon pou lòt yo louvri pòt pou konpasyon pou tèt ou</li>
<li>Pataje batay ou (nan kominote Zepòl) ede lòt santi yo mwens sèl</li>
</ul>
</div>
<blockquote style="border-left:4px solid #8b5cf6;padding:15px 18px;background:#faf5ff;border-radius:10px;margin:20px 0;font-style:italic;color:#5b21b6;">"Tout moun merite yon ovasyon kanpe omwen yon fwa nan lavi yo, paske nou tout simonte mond lan." — R.J. Palacio</blockquote>`)
    },
    {
      title: ch("Transfòmasyon — Jantiy Chanje Tout","La Transformation — La Gentillesse Change Tout","Transformation — Kindness Changes Everything"),
      content: ch(`
<h3>Fen istwa a</h3>
<p>Nan fen ane lekòl la, Auggie pa sèlman sirviv — li transfòme lekòl la. Timoun ki te evite l vin zanmi l. Li resevwa yon meday pou kouraj li. Men plis enpòtan: li montre yon kominote antye kijan pou yo wè pi lwen pase aparans.</p>
<p>Direktè a di nan diskou final la: <em>"Pi gwo bagay yon moun ka fè se chanje lemonn yon ti kras — pa ak gwo aksyon, men ak senp jantiy chak jou."</em></p>
<h3>Leson final pou byennèt</h3>
<p>Auggie pa t ka chanje figi l. Men li te ka chanje kijan li te reyaji fas ak mond lan — ak kouraj, ak jantiy, ak pèseverans. Sa a se yon model pwisan pou nenpòt moun k ap fè fas ak yon defi yo pa ka kontwole — enkli depresyon.</p>
<div style="background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 100%);border-radius:15px;padding:22px;margin:20px 0;text-align:center;">
<p style="font-size:1.1rem;color:#92400e;font-weight:600;margin:0 0 10px;">Ou pa ka toujou chwazi sa ki rive ou.</p>
<p style="color:#374151;font-size:0.93rem;margin:0;">Men ou ka chwazi jantiy — pou lòt yo, ak pou tèt ou. Epi sa chanje tout.</p>
</div>
<h3>Mesaj final</h3>
<p>"Wonder" raple nou ke nou tout gen yon "diferans" nou pote — kèk vizib, kèk kache. Depresyon se youn nan diferans kache sa yo. Men tankou Auggie, nou ka jwenn kouraj, kominote, ak yon jou — transfòmasyon.</p>
<blockquote style="border-left:4px solid #f59e0b;padding:15px 18px;background:#fffbeb;border-radius:10px;margin:20px 0;font-style:italic;color:#92400e;font-size:1.05rem;">"Sois jantiy, paske tout moun ap goumen yon gwo batay. Epi sonje — ou menm tou, ou merite jantiy sa a." — Enspire pa R.J. Palacio</blockquote>`)
    }
  ]
}

]; // fin BOOKS array
