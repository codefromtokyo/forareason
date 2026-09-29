/* Interface languages. en is the base; others fall back to en for any missing key.
   The learning content (courses) is separate; this is only the app's own wording. */
const UI_LANGS = [["en","English","English"],["hi","हिन्दी","Hindi"],["fr","Français","French"],["ja","日本語","Japanese"],["nl","Nederlands","Dutch"]];
const STR_HI = {
  signIn:"साइन इन", profile:"प्रोफ़ाइल", navSyllabus:"पाठ्यक्रम", navMock:"मॉक टेस्ट", about:"हमारे बारे में", community:"समुदाय", course:"कोर्स", level:"स्तर",
  whyLearning:"आप क्यों सीख रहे हैं?", groupLang:"भाषाएँ", groupRoad:"सड़क और ड्राइविंग",
  gradeTitle:"आपका ग्रेड", continue:"जारी रखें", todayTitle:"आज", play:"सुनें", slow:"धीरे", speakBtn:"बोलें", next:"आगे", check:"जाँचें", showAnswer:"उत्तर दिखाएँ",
  settings:"सेटिंग्स और बैकअप", signOut:"साइन आउट", editProfile:"प्रोफ़ाइल संपादित करें", saveProfile:"सहेजें",
  footerOpen:"ग़ैर-लाभकारी और ओपन सोर्स। समुदाय द्वारा बनाया और बेहतर किया गया।",
  tagline:"नए देश की ज़रूरतें सीखें।"
};
const STR_EXTRA = { hi: STR_HI };
STR_HI.aboutPage = { title:"एक वजह से", intro:"मैं सakshi हूँ। हिमाचल की पहाड़ियों से टोक्यो तक, मैं चलते-चलते सीख रही हूँ।" };
STR_EXTRA.fr = STR_EXTRA.fr || {}; STR_EXTRA.fr.about = "À propos"; STR_EXTRA.fr.aboutPage = { title:"Pour une raison", intro:"Je suis Sakshi. Des montagnes de l'Himachal à Tokyo, j'apprends en avançant." };
STR_EXTRA.ja = STR_EXTRA.ja || {}; STR_EXTRA.ja.about = "私たちについて"; STR_EXTRA.ja.aboutPage = { title:"理由があって", intro:"サクシです。ヒマーチャルの山から東京へ、進みながら学んでいます。" };
STR_EXTRA.nl = STR_EXTRA.nl || {}; STR_EXTRA.nl.about = "Over ons"; STR_EXTRA.nl.aboutPage = { title:"Voor een reden", intro:"Ik ben Sakshi. Van de bergen van Himachal naar Tokio, ik leer terwijl ik ga." };

