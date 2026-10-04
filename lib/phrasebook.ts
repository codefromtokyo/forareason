/* Offline survival phrasebook. [English, target, (optional) romaji]. Serves travellers, students, employees and dependents. */
export interface Cat { title: string; icon: string; phrases: [string, string, string?][]; }
export const PHRASEBOOK: Record<string, { lang: string; speech: string; cats: Cat[] }> = {
  nl: { lang: "Dutch", speech: "nl-NL", cats: [
    { title: "Basics", icon: "👋", phrases: [["Hello", "Hallo"], ["Thank you", "Dank je wel"], ["Please / here you are", "Alsjeblieft"], ["Sorry / excuse me", "Sorry"], ["Do you speak English?", "Spreekt u Engels?"], ["I don't understand", "Ik begrijp het niet"]] },
    { title: "Getting around", icon: "🚆", phrases: [["Where is…?", "Waar is…?"], ["the station", "het station"], ["How much is a ticket?", "Hoeveel kost een kaartje?"], ["Left / right", "Links / rechts"], ["Is it far?", "Is het ver?"]] },
    { title: "Eating out", icon: "🍽️", phrases: [["A table for two", "Een tafel voor twee"], ["The menu, please", "De kaart, alstublieft"], ["Water, please", "Water, alstublieft"], ["The bill, please", "De rekening, alstublieft"], ["I'm vegetarian", "Ik ben vegetariër"]] },
    { title: "Shopping", icon: "🛍️", phrases: [["How much is it?", "Hoeveel kost het?"], ["Too expensive", "Te duur"], ["Do you have…?", "Heeft u…?"], ["Can I pay by card?", "Kan ik met pin betalen?"]] },
    { title: "Health & emergency", icon: "🆘", phrases: [["Help!", "Help!"], ["Call an ambulance", "Bel een ambulance"], ["I need a doctor", "Ik heb een dokter nodig"], ["Where is the pharmacy?", "Waar is de apotheek?"], ["It hurts here", "Het doet hier pijn"], ["Call the police", "Bel de politie"]] },
    { title: "Making friends", icon: "🤝", phrases: [["Nice to meet you", "Aangenaam"], ["What's your name?", "Hoe heet je?"], ["I'm new here", "Ik ben hier nieuw"], ["Would you like a coffee?", "Wil je een koffie?"]] },
  ] },
  fr: { lang: "French", speech: "fr-FR", cats: [
    { title: "Basics", icon: "👋", phrases: [["Hello", "Bonjour"], ["Thank you", "Merci"], ["Please", "S'il vous plaît"], ["Excuse me / sorry", "Pardon"], ["Do you speak English?", "Parlez-vous anglais ?"], ["I don't understand", "Je ne comprends pas"]] },
    { title: "Getting around", icon: "🚆", phrases: [["Where is…?", "Où est…?"], ["the station", "la gare"], ["How much is a ticket?", "Combien coûte un billet ?"], ["Left / right", "Gauche / droite"], ["Is it far?", "C'est loin ?"]] },
    { title: "Eating out", icon: "🍽️", phrases: [["A table for two", "Une table pour deux"], ["The menu, please", "La carte, s'il vous plaît"], ["Water, please", "De l'eau, s'il vous plaît"], ["The bill, please", "L'addition, s'il vous plaît"], ["I'm vegetarian", "Je suis végétarien(ne)"]] },
    { title: "Shopping", icon: "🛍️", phrases: [["How much is it?", "C'est combien ?"], ["Too expensive", "Trop cher"], ["Do you have…?", "Avez-vous…?"], ["Can I pay by card?", "Je peux payer par carte ?"]] },
    { title: "Health & emergency", icon: "🆘", phrases: [["Help!", "Au secours !"], ["Call an ambulance", "Appelez une ambulance"], ["I need a doctor", "J'ai besoin d'un médecin"], ["Where is the pharmacy?", "Où est la pharmacie ?"], ["It hurts here", "J'ai mal ici"], ["Call the police", "Appelez la police"]] },
    { title: "Making friends", icon: "🤝", phrases: [["Nice to meet you", "Enchanté(e)"], ["What's your name?", "Comment vous appelez-vous ?"], ["I'm new here", "Je suis nouveau/nouvelle ici"], ["Would you like a coffee?", "Un café ?"]] },
  ] },
  jp: { lang: "Japanese", speech: "ja-JP", cats: [
    { title: "Basics", icon: "👋", phrases: [["Hello", "こんにちは", "konnichiwa"], ["Thank you", "ありがとうございます", "arigatō gozaimasu"], ["Please", "お願いします", "onegai shimasu"], ["Excuse me / sorry", "すみません", "sumimasen"], ["Do you speak English?", "英語を話せますか？", "eigo o hanasemasu ka?"], ["I don't understand", "わかりません", "wakarimasen"]] },
    { title: "Getting around", icon: "🚆", phrases: [["Where is…?", "…はどこですか？", "… wa doko desu ka?"], ["the station", "駅", "eki"], ["How much is a ticket?", "切符はいくらですか？", "kippu wa ikura desu ka?"], ["Left / right", "左 / 右", "hidari / migi"], ["Is it far?", "遠いですか？", "tōi desu ka?"]] },
    { title: "Eating out", icon: "🍽️", phrases: [["A table for two", "二人です", "futari desu"], ["The menu, please", "メニューをください", "menyū o kudasai"], ["Water, please", "お水をください", "omizu o kudasai"], ["The bill, please", "お会計をお願いします", "okaikei o onegai shimasu"], ["I'm vegetarian", "ベジタリアンです", "bejitarian desu"]] },
    { title: "Shopping", icon: "🛍️", phrases: [["How much is it?", "いくらですか？", "ikura desu ka?"], ["Too expensive", "高すぎます", "takasugimasu"], ["Do you have…?", "…はありますか？", "… wa arimasu ka?"], ["Can I pay by card?", "カードで払えますか？", "kādo de haraemasu ka?"]] },
    { title: "Health & emergency", icon: "🆘", phrases: [["Help!", "助けて！", "tasukete!"], ["Call an ambulance", "救急車を呼んでください", "kyūkyūsha o yonde kudasai"], ["I need a doctor", "医者が必要です", "isha ga hitsuyō desu"], ["Where is the pharmacy?", "薬局はどこですか？", "yakkyoku wa doko desu ka?"], ["It hurts here", "ここが痛いです", "koko ga itai desu"], ["Call the police", "警察を呼んでください", "keisatsu o yonde kudasai"]] },
    { title: "Making friends", icon: "🤝", phrases: [["Nice to meet you", "はじめまして", "hajimemashite"], ["What's your name?", "お名前は？", "onamae wa?"], ["I'm new here", "最近来たばかりです", "saikin kita bakari desu"], ["Would you like a coffee?", "コーヒーでもどうですか？", "kōhī demo dō desu ka?"]] },
  ] },
};
