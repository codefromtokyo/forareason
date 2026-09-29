const SOUNDS_NL = [
  { s:"g and ch", tip:"Made at the back of the throat, like a soft clearing sound. g and ch sound the same.", ex:["goed","gisteren","acht","lachen"] },
  { s:"sch", tip:"s followed by the throat sound. At the end of a word (-isch) it sounds like s.", ex:["school","schrijven","Scheveningen"] },
  { s:"ui", tip:"No English equivalent. Start from the 'ow' in 'how' with rounded lips.", ex:["huis","uit","buiten","duizend"] },
  { s:"ij and ei", tip:"The same sound, close to 'ay' in 'day' but more open.", ex:["mijn","tijd","trein","klein"] },
  { s:"oe", tip:"Like 'oo' in 'food'.", ex:["goed","boek","doen"] },
  { s:"eu", tip:"Say 'ay' with rounded lips.", ex:["deur","leuk","neus"] },
  { s:"ou and au", tip:"Like 'ow' in 'how'.", ex:["oud","koud","blauw","vrouw"] },
  { s:"ie", tip:"Like 'ee' in 'see'.", ex:["niet","fiets","bier"] },
  { s:"uu and u", tip:"Say 'ee' with rounded lips. Long in uur, short in bus.", ex:["uur","minuut","duur","bus"] },
  { s:"aa or a", tip:"A double vowel is long. A single vowel at the end of a syllable is also long: ma-ken.", ex:["man","maan","tak","taak","maken"] },
  { s:"w", tip:"Softer than English w. Top teeth lightly touch the lower lip.", ex:["water","werken","wonen"] },
  { s:"v and f", tip:"v at the start of a word is often close to f.", ex:["vier","vrouw","fiets"] },
  { s:"r", tip:"Rolled or throat r are both fine. At the end of a word it is often soft.", ex:["rood","trein","water"] },
  { s:"-en at the end", tip:"The final n is usually dropped in speech: werken sounds like werke.", ex:["werken","praten","eten"] }
];
const SOUNDS_JA = [
  { s:"Long vowels", tip:"A long vowel changes the meaning. Hold it for two beats.", ex:["おばさん","おばあさん","ゆき","ゆうき"] },
  { s:"Small っ", tip:"A small っ is a one-beat pause before the next sound.", ex:["きて","きって","さか","さっか"] },
  { s:"ん", tip:"ん is a full beat of its own: ほ-ん.", ex:["ほん","せんせい","きんえん"] },
  { s:"ら row", tip:"Between English r and l: one light tap of the tongue behind the teeth.", ex:["らいねん","りんご","ありがとう"] },
  { s:"つ", tip:"Like 'ts' in 'cats'.", ex:["つくえ","なつ","つぎ"] },
  { s:"ふ", tip:"Blow softly through the lips, between f and h.", ex:["ふじさん","ふく","さいふ"] },
  { s:"Small ゃ ゅ ょ", tip:"They merge with the kana before into one beat: き + ゃ = kya.", ex:["きょう","しゃしん","りょこう"] }
];
const KANA_H = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ".split("");
const KANA_R = "a i u e o ka ki ku ke ko sa shi su se so ta chi tsu te to na ni nu ne no ha hi fu he ho ma mi mu me mo ya yu yo ra ri ru re ro wa wo n ga gi gu ge go za ji zu ze zo da ji zu de do ba bi bu be bo pa pi pu pe po".split(" ");
const KANA_ALT = { shi:["si"], chi:["ti"], tsu:["tu"], fu:["hu"], ji:["zi","di"], zu:["du"], wo:["o"], n:["nn"] };
const toKata = s => s.replace(/[\u3041-\u3096]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));

const SOUNDS_FR = [
  { s:"an and en", tip:"Say 'ah' through your nose, with no n sound.", ex:["enfant","temps","France"] },
  { s:"on", tip:"Rounded lips, air through the nose.", ex:["bonjour","non","maison"] },
  { s:"in, ain and un", tip:"Like the 'a' in 'bag', through the nose.", ex:["vin","pain","un"] },
  { s:"u or ou", tip:"u: say 'ee' with rounded lips. ou: like 'oo' in 'food'.", ex:["tu","tout","rue","roue"] },
  { s:"r", tip:"Made at the back of the throat, like a soft gargle.", ex:["rouge","Paris","merci"] },
  { s:"Silent endings", tip:"Most final consonants are silent, and so is -ent in verbs: ils parlent.", ex:["petit","beaucoup","ils parlent"] },
  { s:"é, è and ê", tip:"é is closed, like 'ay' without the y. è and ê are open, like 'e' in 'bed'.", ex:["café","père","fête"] },
  { s:"eu", tip:"Say 'ay' with rounded lips.", ex:["deux","peu","heure"] },
  { s:"oi", tip:"Sounds like 'wa'.", ex:["moi","trois","voiture"] },
  { s:"Liaison", tip:"A silent final consonant is pronounced before a vowel: les amis sounds like 'lay-za-mee'.", ex:["les amis","vous avez","deux heures"] },
  { s:"gn and ch", tip:"gn is like 'ny' in 'canyon'. ch is like English 'sh'.", ex:["montagne","champagne","chat"] }
];
const HOURS_FR = ["douze","une","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze"];
function timeFR(h, m) {
  const n = x => { const w = HOURS_FR[((x - 1) % 12) + 1]; return w + (w === "une" ? " heure" : " heures"); };
  const words = { 5:"cinq", 10:"dix", 20:"vingt", 25:"vingt-cinq" };
  if (m === 0) return n(h); if (m === 15) return n(h) + " et quart"; if (m === 30) return n(h) + " et demie";
  if (m === 45) return n(h + 1) + " moins le quart";
  return m < 30 ? n(h) + " " + words[m] : n(h + 1) + " moins " + words[60 - m];
}
const HOURS_NL = ["twaalf","een","twee","drie","vier","vijf","zes","zeven","acht","negen","tien","elf","twaalf"];
function timeNL(h, m) {
  const n = x => HOURS_NL[((x - 1) % 12) + 1], nx = n(h + 1);
  return ({0:`${n(h)} uur`,5:`vijf over ${n(h)}`,10:`tien over ${n(h)}`,15:`kwart over ${n(h)}`,20:`tien voor half ${nx}`,25:`vijf voor half ${nx}`,30:`half ${nx}`,35:`vijf over half ${nx}`,40:`tien over half ${nx}`,45:`kwart voor ${nx}`,50:`tien voor ${nx}`,55:`vijf voor ${nx}`})[m];
}
const timeJA = (h, m) => h + "時" + (m === 0 ? "" : m === 30 ? "半" : m + "分");

const PACKS = {
  nl: {
    name:"Dutch", native:"Nederlands", test:"Staatsexamen NT2", speech:"nl-NL", whisper:"dutch", split:"space", articles:/^(de|het) /,
    levels:["A1","A2","B1","B2"], data:DATA, sounds:SOUNDS_NL, kana:false, dictation:"type",
    time:timeNL, timeHint:"Dutch counts half hours towards the next hour: half acht is 7:30.",
    sections:[{k:"reading",nl:"Lezen",en:"Reading",type:"mc"},{k:"listening",nl:"Luisteren",en:"Listening",type:"listen"},{k:"writing",nl:"Schrijven",en:"Writing",type:"write"},{k:"speaking",nl:"Spreken",en:"Speaking",type:"speak"}],
    official:{ url:"https://www.staatsexamensnt2.nl", label:"staatsexamensnt2.nl" },
    wordHint:"Type in Dutch, with de/het for nouns",
    topics:{ A1:["boodschappen doen","een afspraak bij de kapper","het weer","een verjaardag","de bus en de trein"], A2:["een nieuwe buurvrouw","een pakketje dat niet is aangekomen","de sportschool","een schoolreisje","een ziek kind"], B1:["een nieuwe regel van de gemeente","werken bij een start-up","energie besparen thuis","een cursus Nederlands","vrijwilligerswerk"], B2:["kunstmatige intelligentie op het werk","de woningmarkt in grote steden","het openbaar vervoer op het platteland","flexwerk en vaste contracten","klimaatbeleid en landbouw"] },
    certOf: L => L === "B1" ? "Staatsexamen NT2 Programma I (CEFR B1)" : L === "B2" ? "Staatsexamen NT2 Programma II (CEFR B2)" : "CEFR " + L,
    textPrompt: (L, topic) => `Write an original Dutch reading text at CEFR ${L}, in the style of the reading tasks of the Dutch Staatsexamen NT2 and inburgering exams, about: ${topic}. Length ${({A1:"60-80",A2:"100-130",B1:"180-230",B2:"250-320"})[L]} words. Use vocabulary and grammar appropriate to ${L}. Then write 4 multiple-choice comprehension questions in Dutch, each with 3 options, only one correct.`,
    wordsPrompt: (L, topic, have) => `List 15 useful Dutch words or short phrases at CEFR ${L} for an adult preparing for Dutch exams, theme: ${topic} and everyday work life. Do not repeat any of these: ${have}. Nouns must start with de or het. Verbs in the infinitive. Reply with only JSON: {"words": [{"t": "de ...", "en": "English meaning", "ex": "short Dutch example sentence at ${L}", "ex_en": "English translation of the example"}]}`
  },
  fr: {
    name:"French", native:"Français", test:"DELF", speech:"fr-FR", whisper:"french", split:"space", articles:/^(le|la|les|l') ?/,
    levels:["A1","A2","B1","B2"], data:DATA_FR, sounds:SOUNDS_FR, kana:false, dictation:"type",
    time:timeFR, timeHint:"et demie is half past, moins le quart is quarter to: huit heures moins le quart is 7:45.",
    sections:[{k:"reading",nl:"Compréhension des écrits",en:"Reading",type:"mc"},{k:"listening",nl:"Compréhension de l'oral",en:"Listening",type:"listen"},{k:"writing",nl:"Production écrite",en:"Writing",type:"write"},{k:"speaking",nl:"Production orale",en:"Speaking",type:"speak"}],
    official:{ url:"https://www.france-education-international.fr", label:"France Éducation international (DELF)" },
    wordHint:"Type in French, with le/la/l' for nouns",
    topics:{ A1:["faire les courses","la famille","le week-end","la météo","le métro"], A2:["un nouveau voisin","un colis perdu","la salle de sport","les vacances","un enfant malade"], B1:["une nouvelle règle de la mairie","travailler dans une start-up","économiser l'énergie","apprendre une langue","le bénévolat"], B2:["l'intelligence artificielle au travail","le logement dans les grandes villes","les transports en zone rurale","le télétravail","l'agriculture et le climat"] },
    certOf: L => "DELF " + L + " (CEFR " + L + ")",
    textPrompt: (L, topic) => `Write an original French reading text at CEFR ${L}, in the style of the DELF ${L} reading section (compréhension des écrits), about: ${topic}. Length ${({A1:"60-90",A2:"100-150",B1:"200-260",B2:"300-380"})[L]} words. Use vocabulary and grammar appropriate to ${L}. Then write 4 multiple-choice comprehension questions in French, each with 3 options, only one correct.`,
    wordsPrompt: (L, topic, have) => `List 15 useful French words or short phrases at CEFR ${L} for an adult preparing for the DELF, theme: ${topic} and everyday work life. Do not repeat any of these: ${have}. Nouns must start with le, la, les or l'. Verbs in the infinitive. Reply with only JSON: {"words": [{"t": "le ...", "en": "English meaning", "ex": "short French example sentence at ${L}", "ex_en": "English translation of the example"}]}`
  },
  ja: {
    name:"Japanese", native:"日本語", test:"JLPT", speech:"ja-JP", whisper:"japanese", split:"char",
    levels:["N5","N4","N3","N2","N1"], data:DATA_JA, sounds:SOUNDS_JA, kana:true, dictation:"choose",
    time:timeJA, timeHint:"半 (han) means half past: 7時半 is 7:30.",
    sections:[{k:"vocab",nl:"文字・語彙",en:"Vocabulary",type:"mc"},{k:"reading",nl:"文法・読解",en:"Grammar and reading",type:"mc"},{k:"listening",nl:"聴解",en:"Listening",type:"listen"}],
    official:{ url:"https://www.jlpt.jp/e/samples/forlearners.html", label:"jlpt.jp sample questions" },
    wordHint:"Type in kana, kanji or romaji",
    topics:{ N5:["買い物","家族","週末","食べ物","駅と電車"], N4:["アルバイト","旅行の計画","病院","引っ越し","趣味"], N3:["職場のルール","健康","地域のイベント","インターネット","環境"], N2:["働き方","少子化","観光","消費者の行動","教育"], N1:["テクノロジーと社会","都市と地方","科学研究","文化の継承","経済政策"] },
    certOf: L => "JLPT " + L,
    textPrompt: (L, topic) => `Write an original Japanese reading passage at JLPT ${L} level, in the style of the JLPT 読解 section, about: ${topic}. Length ${({N5:"120-180",N4:"180-250",N3:"300-400",N2:"400-550",N1:"500-700"})[L]} Japanese characters. Use only vocabulary, grammar and kanji expected at ${L}. For N5 and N4, put a space between phrases like the JLPT does. Then write 3 multiple-choice comprehension questions in Japanese, each with 4 options, only one correct.`,
    wordsPrompt: (L, topic, have) => `List 15 useful Japanese words at JLPT ${L} level, theme: ${topic}. Do not repeat any of these: ${have}. Reply with only JSON: {"words": [{"t": "word as normally written (kanji if usual)", "r": "reading in hiragana", "rom": "Hepburn romaji without macrons, long vowels as ou/uu", "en": "English meaning", "ex": "short Japanese example sentence at ${L}", "ex_en": "English translation"}]}`
  }
};

/* Road modules reuse the course shell: guide, practice, licence path, mock theory test. */
function roadQ(r, q) {
  if (r.answers) return { q:q[0], o:r.answers, a:q[1] ? 0 : 1, why:q[2] };
  return { q:q[0], o:q[1], why:q[2] };
}
function roadPack(code, name) {
  const r = ROAD[code];
  return { kind:"road", code, name, native:name, test:r.test.name, speech:"en-US", whisper:"english", split:"space", levels:["road"], sounds:[], kana:false, dictation:"type",
    time:timeNL, timeHint:"", official:{ url:r.official[0][1], label:r.official[0][0] }, wordHint:"", topics:{ road:[] }, certOf:() => r.test.name,
    sections:[{ k:"theory", nl:r.test.short, en:"Theory test", type:"mc", sample:r.test.sample, pass:r.test.pass }],
    data:{ road:{ cert:`${r.test.name} · official format: ${r.test.official}`, vocab:[], grammar:[], order:[], exam:{ minutes:{ theory:r.test.minutes }, theory:[{ title:r.test.name, qs:r.quiz.map(q => roadQ(r, q)) }] } } },
    road:r };
}
PACKS["road-jp"] = roadPack("jp", "Driving in Japan");
PACKS["road-nl"] = roadPack("nl", "Driving in the Netherlands");

/* Visa modules: guide (types), journey path, a basics quiz, and an "understand the basics" mark. No official exam. */
function visaPack(code, name) {
  const v = VISA[code];
  return { kind:"visa", code, name, native:name, test:name, speech:"en-US", whisper:"english", split:"space", levels:["visa"], sounds:[], kana:false, dictation:"type",
    time:timeNL, timeHint:"", official:{ url:v.authority[0][1], label:v.authority[0][0] }, wordHint:"", topics:{ visa:[] }, certOf:() => name,
    sections:[], data:{ visa:{ cert:`${name} · overview, not legal advice`, vocab:[], grammar:[], order:[], exam:{ minutes:{}, } } }, visa:v };
}
PACKS["visa-jp"] = visaPack("jp", "Visa & residency: Japan");
PACKS["visa-nl"] = visaPack("nl", "Visa & residency: Netherlands");
PACKS["visa-fr"] = visaPack("fr", "Visa & residency: France");

/* Nomad modules reuse the visa shell: guide (types) + setup steps + basics quiz + cert. */
function nomadPack(code, name) {
  const n = NOMAD[code];
  return { kind:"nomad", code, name, native:name, test:name, speech:"en-US", whisper:"english", split:"space", levels:["nomad"], sounds:[], kana:false, dictation:"type",
    official:{ url:n.authority[0][1], label:n.authority[0][0] }, wordHint:"", topics:{ nomad:[] }, certOf:() => name,
    sections:[], data:{ nomad:{ cert:`${name} · overview, not legal or tax advice`, vocab:[], grammar:[], order:[], exam:{ minutes:{} } } },
    // present the nomad content under the same field the visa views read
    visa:{ country:n.country, authority:n.authority, intro:n.intro, types:n.types, journey:n.setup, quiz:n.quiz, focus:null, cities:n.cities, jobs:n.jobs } };
}
PACKS["nomad-jp"] = nomadPack("jp", "Remote & nomad: Japan");
PACKS["nomad-nl"] = nomadPack("nl", "Remote & nomad: Netherlands");
PACKS["nomad-fr"] = nomadPack("fr", "Remote & nomad: France");

/* Travel guides: essentials (guide accordion) + when/budget + top experiences + link to the Trip-ready phrases. */
function travelPack(code, name) {
  const tv = TRAVEL[code];
  return { kind:"travel", code, name, native:name, test:name, speech:"en-US", whisper:"english", split:"space", levels:["travel"], sounds:[], kana:false, dictation:"type",
    official:{ url:tv.authority[0][1], label:tv.authority[0][0] }, wordHint:"", topics:{ travel:[] }, certOf:() => name,
    sections:[], data:{ travel:{ cert:`${name} · practical guide`, vocab:[], grammar:[], order:[], exam:{ minutes:{} } } }, travel:tv };
}
PACKS["travel-jp"] = travelPack("jp", "Travel: Japan");
PACKS["travel-nl"] = travelPack("nl", "Travel: Netherlands");
PACKS["travel-fr"] = travelPack("fr", "Travel: France");
