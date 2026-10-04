/* Ported language data: Dutch NT2, French DELF, Japanese JLPT. */
export const DATA_NL: Record<string, any> = {
A1: {
cert: "Checkpoint (no state exam at this level)",
vocab: [["hallo","hello"],["goedemorgen","good morning"],["dank je wel","thank you"],["alsjeblieft","please / here you are"],["de man","the man"],["de vrouw","the woman"],["het kind","the child"],["het huis","the house"],["de fiets","the bicycle"],["het water","the water"],["het brood","the bread"],["eten","to eat"],["drinken","to drink"],["wonen","to live (reside)"],["werken","to work"],["spreken","to speak"],["de trein","the train"],["het station","the station"],["de winkel","the shop"],["vandaag","today"]],
grammar: [
{title:"Present tense", notes:["Stem = infinitive minus -en: werken → werk.","ik werk, jij werkt, hij/zij werkt, wij/jullie/zij werken.","In a question with jij/je, drop the -t: Werk jij?","Keep the vowel sound in the stem: slapen → ik slaap, zitten → ik zit."],
drills:[
{q:"Ik ___ in Tokyo. (wonen)", o:["woon","woont","wonen","wone"], why:"ik + stem: woon."},
{q:"Hij ___ bij een groot bedrijf. (werken)", o:["werkt","werk","werken","werkte"], why:"hij + stem + t."},
{q:"___ jij Nederlands? (spreken)", o:["Spreek","Spreekt","Spreken","Sprak"], why:"jij after the verb: no -t."},
{q:"Wij ___ koffie. (drinken)", o:["drinken","drinkt","drink","drinkten"], why:"wij takes the infinitive form."},
{q:"Zij (she) ___ een boek. (lezen)", o:["leest","lees","lezen","lest"], why:"Stem lees + t. z becomes s at the end."},
{q:"Ik ___ acht uur per nacht. (slapen)", o:["slaap","slap","slaapt","slapen"], why:"Double the vowel to keep it long: slaap."}
]},
{title:"de or het", notes:["About two thirds of nouns take de.","All plurals take de: de kinderen.","Diminutives with -je always take het: het huisje.","Learn every noun with its article."],
drills:[
{q:"___ fiets", o:["de","het"], why:"de fiets."},
{q:"___ huis", o:["het","de"], why:"het huis."},
{q:"___ kinderen", o:["de","het"], why:"Plurals always take de."},
{q:"___ meisje", o:["het","de"], why:"-je words take het."},
{q:"___ water", o:["het","de"], why:"het water."},
{q:"___ trein", o:["de","het"], why:"de trein."}
]}
],
order: [["I live in Tokyo.","Ik woon in Tokyo."],["Today I work at home.","Vandaag werk ik thuis."],["Do you speak Dutch?","Spreek jij Nederlands?"],["The train leaves at eight o'clock.","De trein vertrekt om acht uur."],["Tomorrow we go to Amsterdam.","Morgen gaan wij naar Amsterdam."]],
exam: {
minutes:{reading:15, listening:10, writing:15, speaking:5},
reading:[
{title:"Bericht van de gemeente", text:"Beste bewoners,\n\nOp dinsdag 14 oktober is er geen water in de Lindestraat. Dat is van 9.00 uur tot 13.00 uur. Wij maken dan een nieuwe leiding.\n\nHeeft u vragen? Bel dan de gemeente: 020 123 4567. Wij zijn open van maandag tot en met vrijdag.\n\nMet vriendelijke groet,\nGemeente Amsterdam",
qs:[{q:"Wanneer is er geen water?", o:["Op dinsdag in de ochtend","Op maandag de hele dag","Op vrijdag in de middag"]},
{q:"Waarom is er geen water?", o:["De gemeente maakt een nieuwe leiding","Het water is vies","De straat is dicht"]},
{q:"Wanneer kunt u de gemeente bellen?", o:["Van maandag tot en met vrijdag","Alleen op dinsdag","In het weekend"]}]},
{title:"Een bericht van Mark", text:"Hoi Sanne!\n\nIk ben op het station. Mijn trein is te laat. Ik ben om half acht bij het restaurant, niet om zeven uur. Bestel jij alvast een drankje voor mij? Een cola, graag.\n\nTot straks!\nMark",
qs:[{q:"Waar is Mark nu?", o:["Op het station","In het restaurant","Thuis"]},
{q:"Hoe laat komt Mark bij het restaurant?", o:["19.30 uur","19.00 uur","18.30 uur"], why:"half acht = half an hour before eight = 7:30."},
{q:"Wat moet Sanne doen?", o:["Een cola bestellen","Mark bellen","Naar het station gaan"]}]}
],
listening:[
{script:"Goedemorgen. Ik heet Anna. Ik woon in Utrecht en ik werk in een ziekenhuis. Ik ga elke dag met de fiets naar mijn werk.",
qs:[{q:"Waar woont Anna?", o:["In Utrecht","In Amsterdam","In Delft"]},{q:"Waar werkt Anna?", o:["In een ziekenhuis","In een winkel","Op een school"]},{q:"Hoe gaat Anna naar haar werk?", o:["Met de fiets","Met de trein","Met de auto"]}]},
{script:"Beste reizigers. De trein naar Rotterdam vertrekt vandaag van spoor vijf. Niet van spoor drie. De trein vertrekt om tien over twee.",
qs:[{q:"Van welk spoor vertrekt de trein?", o:["Spoor 5","Spoor 3","Spoor 10"]},{q:"Hoe laat vertrekt de trein?", o:["14.10 uur","14.50 uur","13.10 uur"], why:"tien over twee = ten past two."}]}
],
writing:[{prompt:"Je nieuwe buurman heet Tom. Schrijf hem een kort briefje. Vertel je naam, waar je vandaan komt en wat je werk is. Nodig hem uit voor koffie op zaterdag.", words:[25,40]}],
speaking:["Stel jezelf voor. Vertel je naam, waar je woont en wat je doet.","Je bent in een bakkerij. Vraag hoeveel een brood kost en zeg dat je met je pinpas wilt betalen."]
}
},
A2: {
cert: "Checkpoint (CNaVT can certify A2 abroad)",
vocab: [["de afspraak","the appointment"],["de huisarts","the GP (family doctor)"],["de collega","the colleague"],["verhuizen","to move house"],["huren","to rent"],["de huur","the rent"],["de rekening","the bill"],["betalen","to pay"],["de boodschappen","the groceries"],["gisteren","yesterday"],["morgen","tomorrow"],["vergeten","to forget"],["onthouden","to remember"],["opbellen","to call (phone)"],["de buurman","the (male) neighbour"],["ziek","ill"],["ophalen","to pick up"],["de verdieping","the floor (storey)"],["vertrekken","to depart"],["aankomen","to arrive"]],
grammar: [
{title:"Perfect tense", notes:["hebben/zijn + participle. The participle goes to the end: Ik heb gisteren gewerkt.","Participle = ge + stem + t or d. Stem ends in t, k, f, s, ch or p ('t kofschip) → -t: gewerkt. Otherwise -d: gewoond.","Verbs starting with be-, ge-, ver-, her-, ont- get no extra ge-: betaald, vergeten.","Movement to a place and change of state use zijn: Ik ben verhuisd. Hij is gegaan."],
drills:[
{q:"Ik heb gisteren lang ___. (werken)", o:["gewerkt","gewerkd","werkte","gewerken"], why:"k is in 't kofschip → -t."},
{q:"Wij ___ vorig jaar verhuisd.", o:["zijn","hebben","worden","waren"], why:"verhuizen = change of place → zijn."},
{q:"Hij heeft vijf jaar in Delft ___. (wonen)", o:["gewoond","gewoont","woonde","gewonen"], why:"n is not in 't kofschip → -d."},
{q:"Ik heb de rekening ___. (betalen)", o:["betaald","gebetaald","betaalt","betaalden"], why:"be- verbs get no ge-."},
{q:"Zij ___ naar huis gegaan.", o:["is","heeft","wordt","was"], why:"gaan (movement) → zijn."},
{q:"Heb je dat boek al ___? (lezen)", o:["gelezen","geleest","gelees","leesde"], why:"lezen is irregular: gelezen."}
]},
{title:"Separable verbs and modals", notes:["Separable verbs split in a main clause: opbellen → Ik bel je morgen op.","A modal (kunnen, moeten, willen, mogen) sends the infinitive to the end: Ik moet morgen werken.","With a modal, the separable verb stays together at the end: Ik wil je morgen opbellen."],
drills:[
{q:"Choose: I'll call you tonight.", o:["Ik bel je vanavond op.","Ik opbel je vanavond.","Ik bel op je vanavond.","Ik je vanavond opbel."], why:"Verb second, prefix op at the end."},
{q:"Choose: I have to work tomorrow.", o:["Ik moet morgen werken.","Ik moet werken morgen.","Ik werken moet morgen.","Morgen ik moet werken."], why:"Modal second, infinitive last."},
{q:"Choose: The train arrives at nine.", o:["De trein komt om negen uur aan.","De trein aankomt om negen uur.","De trein om negen uur aankomt.","Aankomt de trein om negen uur."], why:"aankomen splits: komt ... aan."},
{q:"Choose: I want to call you tomorrow.", o:["Ik wil je morgen opbellen.","Ik wil je morgen bellen op.","Ik wil opbellen je morgen.","Ik bel je wil morgen op."], why:"With a modal the whole verb goes to the end."},
{q:"Choose: Can you help me?", o:["Kun je mij helpen?","Kun je helpen mij?","Helpen kun je mij?","Kun mij je helpen?"], why:"Question: modal first, infinitive last."}
]}
],
order: [["Yesterday I called my colleague.","Gisteren heb ik mijn collega gebeld."],["Tomorrow I have to go to the GP.","Morgen moet ik naar de huisarts gaan."],["We moved last year.","Wij zijn vorig jaar verhuisd."],["Can you do the groceries?","Kun jij de boodschappen doen?"],["I'll call you tonight.","Ik bel je vanavond op."]],
exam: {
minutes:{reading:20, listening:12, writing:20, speaking:6},
reading:[
{title:"E-mail van Esther", text:"Beste Priya,\n\nVolgende week begint er een nieuwe collega op onze afdeling. Hij heet Daan en hij komt uit Groningen. Op maandag geven we een kleine lunch om hem welkom te heten. De lunch is om 12.30 uur in de kantine op de tweede verdieping.\n\nWil jij voor vrijdag laten weten of je komt? Ik moet dan het eten bestellen. Iets meenemen is niet nodig, maar een taart is altijd welkom!\n\nGroeten,\nEsther",
qs:[{q:"Waarom is er een lunch?", o:["Om een nieuwe collega welkom te heten","Omdat Esther jarig is","Omdat Daan weggaat"]},
{q:"Wat moet Priya voor vrijdag doen?", o:["Laten weten of ze komt","Een taart kopen","Het eten bestellen"]},
{q:"Waar is de lunch?", o:["In de kantine op de tweede verdieping","In een restaurant","In Groningen"]}]},
{title:"Huisartsenpraktijk De Linde", text:"Wilt u een afspraak maken? Bel ons tussen 8.00 en 10.00 uur.\n\nVoor een herhaalrecept kunt u de hele dag bellen met de receptenlijn of een bericht sturen via de app.\n\nBent u 's avonds of in het weekend ernstig ziek? Bel dan de huisartsenpost. Bij levensgevaar belt u altijd 112.",
qs:[{q:"Wanneer belt u voor een afspraak?", o:["Tussen 8.00 en 10.00 uur","De hele dag","Alleen in het weekend"]},
{q:"Hoe vraagt u een herhaalrecept aan?", o:["Via de receptenlijn of de app","Alleen aan de balie","Via 112"]},
{q:"U bent zaterdagavond erg ziek, maar het is geen levensgevaar. Wat doet u?", o:["De huisartsenpost bellen","112 bellen","Maandag de praktijk bellen"]}]}
],
listening:[
{script:"Hallo, met Kees van Fietsenwinkel Snel. Uw fiets is klaar. We hebben de band en de remmen gerepareerd. Het kost vijfenveertig euro. U kunt de fiets morgen ophalen, tussen negen en zes uur. Tot ziens!",
qs:[{q:"Wat is er gerepareerd?", o:["De band en de remmen","Alleen de band","Het licht"]},{q:"Hoeveel kost het?", o:["€ 45","€ 54","€ 15"], why:"vijfenveertig = five-and-forty = 45."},{q:"Wanneer kan de fiets opgehaald worden?", o:["Morgen tussen 9.00 en 18.00 uur","Vandaag tot 18.00 uur","Morgen na 18.00 uur"]}]},
{script:"Ik ben vorige maand verhuisd naar Leiden. Mijn nieuwe appartement is kleiner dan mijn oude huis, maar het ligt dicht bij het station. Daarom ben ik nu veel sneller op mijn werk in Den Haag. De huur is wel hoger.",
qs:[{q:"Waar woont de spreker nu?", o:["In Leiden","In Den Haag","In Amsterdam"]},{q:"Wat is beter aan het nieuwe appartement?", o:["Het ligt dicht bij het station","Het is groter","De huur is lager"]},{q:"Wat is minder goed?", o:["De huur is hoger","Het ligt ver van het station","Het is lawaaierig"]}]}
],
writing:[{prompt:"Je kunt morgen niet werken, want je bent ziek. Schrijf een e-mail aan je leidinggevende. Schrijf dat je ziek bent, wanneer je denkt terug te komen en welke collega je werk kan overnemen.", words:[40,60]},
{prompt:"Je hebt vorige week een nieuw huis gekocht of gehuurd. Schrijf een bericht aan een vriend. Vertel waar het huis is, hoe het eruitziet en nodig je vriend uit om te komen kijken.", words:[40,60]}],
speaking:["Vertel over je laatste vakantie. Waar ben je geweest en wat heb je gedaan?","Je buurman speelt 's avonds laat harde muziek. Vraag hem vriendelijk of het zachter kan.","Je wilt een afspraak maken bij de huisarts. Leg uit waarom en vraag wanneer het kan."]
}
},
B1: {
cert: "Staatsexamen NT2 Programma I",
vocab: [["de ervaring","the experience"],["de ontwikkeling","the development"],["de voorwaarde","the condition (requirement)"],["de sollicitatie","the job application"],["solliciteren","to apply for a job"],["het contract","the contract"],["de gemeente","the municipality"],["de verzekering","the insurance"],["vergelijken","to compare"],["besluiten","to decide"],["het voordeel","the advantage"],["het nadeel","the disadvantage"],["de mening","the opinion"],["beweren","to claim"],["ondanks","despite"],["bovendien","moreover"],["daarom","therefore"],["echter","however"],["het onderzoek","the research"],["verantwoordelijk","responsible"]],
grammar: [
{title:"Subordinate clauses", notes:["After omdat, dat, als, wanneer, hoewel, terwijl the conjugated verb goes to the end: ..., omdat ik moe ben.","Two verbs both go to the end: ..., omdat ik moet werken.","If the subclause comes first, the main clause starts with its verb: Als het regent, neem ik de trein.","en, maar, want, of, dus do not change word order: ..., want ik ben moe."],
drills:[
{q:"Choose: I'm staying home because I'm ill.", o:["Ik blijf thuis, omdat ik ziek ben.","Ik blijf thuis, omdat ik ben ziek.","Ik blijf thuis, omdat ben ik ziek.","Ik blijf thuis, want ik ziek ben."], why:"omdat → verb at the end."},
{q:"Choose: If it rains, I take the train.", o:["Als het regent, neem ik de trein.","Als het regent, ik neem de trein.","Als het regent, de trein neem ik.","Als regent het, neem ik de trein."], why:"Subclause first → main clause starts with the verb."},
{q:"Choose: I'm tired, because I slept badly.", o:["Ik ben moe, want ik heb slecht geslapen.","Ik ben moe, want ik slecht geslapen heb.","Ik ben moe, want heb ik slecht geslapen.","Ik ben moe, want slecht ik heb geslapen."], why:"want keeps normal word order."},
{q:"Choose: He says that he wants to move.", o:["Hij zegt dat hij wil verhuizen.","Hij zegt dat wil hij verhuizen.","Hij zegt dat hij wil dat verhuizen.","Hij zegt, hij dat wil verhuizen."], why:"dat → verbs at the end."},
{q:"Choose: I don't know if he is coming.", o:["Ik weet niet of hij komt.","Ik weet niet of komt hij.","Ik weet niet als hij komt.","Ik weet niet of hij is komen."], why:"of = whether; verb at the end."}
]},
{title:"die, dat, waar and er", notes:["die for de-words and plurals: de man die daar woont.","dat for het-words: het huis dat ik huur.","Places and prepositions: waar (+ preposition): de stad waar ik woon.","Prepositions with people: met wie, voor wie.","er as placeholder subject: Er zijn veel fietsen in Amsterdam."],
drills:[
{q:"Het huis ___ ik huur, is klein.", o:["dat","die","wat","waar"], why:"het huis → dat."},
{q:"De collega ___ naast mij zit, komt uit Delft.", o:["die","dat","wie","wat"], why:"de collega → die."},
{q:"De boeken ___ ik lees, zijn moeilijk.", o:["die","dat","wat","wie"], why:"Plural → die."},
{q:"Dit is de stad ___ ik woon.", o:["waar","die","dat","wat"], why:"Place → waar."},
{q:"___ zijn veel fietsen in Amsterdam.", o:["Er","Het","Dat","Wat"], why:"Indefinite subject → er."},
{q:"De vrouw met ___ ik praat, is mijn buurvrouw.", o:["wie","die","wat","dat"], why:"Preposition + person → wie."}
]}
],
order: [["I'm learning Dutch because I want to work in Amsterdam.","Ik leer Nederlands omdat ik in Amsterdam wil werken."],["If I have time, I cycle to work.","Als ik tijd heb, fiets ik naar mijn werk."],["I think that the rent is too high.","Ik vind dat de huur te hoog is."],["The house that we rent is close to the station.","Het huis dat wij huren ligt dicht bij het station."],["There are many cyclists in the city.","Er zijn veel fietsers in de stad."]],
exam: {
minutes:{reading:30, listening:15, writing:30, speaking:8},
reading:[
{title:"Thuiswerken blijft populair", text:"Sinds de coronapandemie werken veel Nederlanders een deel van de week thuis. In een onderzoek onder 2.000 werknemers zei ongeveer de helft dat ze minstens één dag per week thuiswerken. Werknemers noemen vooral voordelen: ze verliezen minder tijd in de file en kunnen werk en privé beter combineren.\n\nToch zijn niet alle werkgevers enthousiast. Zij merken dat nieuwe medewerkers thuis minder leren van hun collega's. Bovendien is het contact tussen teams soms minder goed.\n\nVeel bedrijven kiezen daarom voor een vaste kantoordag, waarop het hele team aanwezig is. Zo proberen ze de voordelen van thuiswerken te houden, zonder dat de samenwerking eronder lijdt.",
qs:[{q:"Welk voordeel noemen werknemers?", o:["Ze staan minder in de file","Ze verdienen meer","Ze hebben minder werk"]},
{q:"Wat is een probleem volgens werkgevers?", o:["Nieuwe medewerkers leren minder van collega's","Werknemers werken te veel","Thuiswerken is te duur"]},
{q:"Waarom kiezen bedrijven voor een vaste kantoordag?", o:["Om de samenwerking goed te houden","Om kosten te besparen","Omdat de wet dat verplicht"]},
{q:"Wat is het doel van de tekst?", o:["Informeren over voor- en nadelen van thuiswerken","Lezers overtuigen om thuis te werken","Een vacature aankondigen"]}]},
{title:"Nieuwe regels voor grofvuil", text:"Vanaf 1 januari haalt de gemeente grofvuil niet meer elke week op. U moet eerst online een afspraak maken. Daarna krijgt u een datum.\n\nZet het grofvuil pas op de avond vóór die datum buiten, na 21.00 uur. Zet u het eerder buiten, dan kunt u een boete krijgen van 100 euro.\n\nElektrische apparaten, zoals een oude wasmachine, mogen niet bij het grofvuil. Die kunt u gratis wegbrengen naar het afvalpunt.",
qs:[{q:"Wat moet u eerst doen?", o:["Online een afspraak maken","Het grofvuil buiten zetten","Een boete betalen"]},
{q:"Wanneer mag het grofvuil buiten staan?", o:["Op de avond voor de ophaaldatum, na 21.00 uur","Op elk moment van de week","Op de ochtend van de ophaaldatum"]},
{q:"Wat doet u met een oude wasmachine?", o:["Gratis wegbrengen naar het afvalpunt","Bij het grofvuil zetten","De gemeente vragen hem op te halen"]}]}
],
listening:[
{script:"Goedemiddag, u luistert naar Radio Stad. De gemeente wil het centrum autovrij maken. Vanaf volgend jaar mogen auto's tussen tien uur 's ochtends en zes uur 's avonds niet meer in de binnenstad rijden. Winkeliers zijn bang dat ze minder klanten krijgen. De gemeente zegt echter dat er juist meer mensen komen winkelen als het rustiger is. Bewoners met een vergunning mogen wel met de auto naar hun huis.",
qs:[{q:"Wat wil de gemeente?", o:["Overdag geen auto's in het centrum","Alle winkels sluiten","Meer parkeerplaatsen bouwen"]},{q:"Waar zijn winkeliers bang voor?", o:["Minder klanten","Een hogere huur","Meer fietsers"]},{q:"Wie mag wel met de auto het centrum in?", o:["Bewoners met een vergunning","Alle winkeliers","Iedereen na tien uur 's ochtends"]}]},
{script:"Welkom op je eerste werkdag. Ik leg even uit hoe het werkt. Je krijgt vandaag je laptop en je pasje. Met het pasje kun je het gebouw in en betalen in de kantine. Deze week volg je elke ochtend een training. 's Middags werk je samen met je buddy, Fatima. Als je vragen hebt, kun je altijd bij haar terecht. Vrijdag hebben we een gesprek over hoe je eerste week is gegaan.",
qs:[{q:"Waarvoor gebruik je het pasje?", o:["Om het gebouw in te gaan en in de kantine te betalen","Alleen om de laptop te openen","Om te parkeren"]},{q:"Wat doe je deze week 's ochtends?", o:["Een training volgen","Samenwerken met Fatima","Een gesprek voeren"]},{q:"Wat gebeurt er op vrijdag?", o:["Een gesprek over je eerste week","De laatste training","Je krijgt je laptop"]}]}
],
writing:[{prompt:"Je hebt online een koptelefoon gekocht, maar na een week werkt hij niet meer. Schrijf een e-mail aan de webwinkel. Beschrijf het probleem, zeg wanneer je het product hebt gekocht en vraag om een oplossing: een nieuwe koptelefoon of je geld terug.", words:[80,120]},
{prompt:"Op een forum wordt gediscussieerd over de vraag: moeten winkels op zondag open zijn? Geef je mening en noem twee argumenten.", words:[80,120]}],
speaking:["Je collega wil Nederlands leren, maar heeft weinig tijd. Geef hem twee tips en leg uit waarom die helpen.","Beschrijf hoe je normaal naar je werk gaat. Wat vind je daar prettig en wat niet?","Sommige mensen vinden dat iedereen op de fiets naar het werk moet gaan. Wat vind jij? Geef een argument."]
}
},
B2: {
cert: "Staatsexamen NT2 Programma II",
vocab: [["de maatregel","the measure"],["het beleid","the policy"],["de gevolgen","the consequences"],["aanzienlijk","considerable"],["toenemen","to increase"],["afnemen","to decrease"],["benadrukken","to emphasise"],["overwegen","to consider"],["de verwachting","the expectation"],["bijdragen aan","to contribute to"],["het draagvlak","the public support (backing)"],["de afweging","the trade-off / consideration"],["het uitgangspunt","the starting point"],["desondanks","nevertheless"],["weliswaar","admittedly"],["betreffende","concerning"],["vermijden","to avoid"],["de vergrijzing","population ageing"],["duurzaam","sustainable"],["de toelichting","the explanation"]],
grammar: [
{title:"Passive voice", notes:["Present: worden + participle: De brief wordt verstuurd.","Past: werd/werden: De brief werd verstuurd.","Perfect uses zijn, not worden: De brief is verstuurd.","The agent follows door: Het besluit werd door de gemeente genomen.","Impersonal passive with er: Er wordt veel gediscussieerd."],
drills:[
{q:"Het beleid ___ volgend jaar aangepast.", o:["wordt","heeft","zal","werd"], why:"Future/present passive → wordt."},
{q:"De maatregel ___ vorige maand ingevoerd.", o:["werd","wordt","heeft","werdt"], why:"Past passive → werd."},
{q:"De brief is gisteren ___.", o:["verstuurd","versturd","geverstuurd","verstuurt"], why:"ver- verb, stem ends in r → -d, no ge-."},
{q:"Er ___ in Nederland veel over woningnood gesproken.", o:["wordt","worden","heeft","zijn"], why:"Impersonal passive → singular wordt."},
{q:"Het rapport werd geschreven ___ twee onderzoekers.", o:["door","van","bij","met"], why:"Agent in the passive → door."}
]},
{title:"Linking words and inversion", notes:["Linking adverbs in first position trigger inversion: Daarom neem ik de trein.","Bovendien, toch, desondanks, daardoor work the same way.","ondanks + noun: Ondanks de regen ... ; hoewel + clause: Hoewel het regent, ...","om ... te + infinitive for purpose: Ik spaar om een huis te kopen.","zou + infinitive for polite or hypothetical: Ik zou dat willen overwegen."],
drills:[
{q:"Choose: Therefore the municipality invests more.", o:["Daarom investeert de gemeente meer.","Daarom de gemeente investeert meer.","De gemeente daarom meer investeert.","Daarom meer de gemeente investeert."], why:"Daarom first → verb second."},
{q:"___ de hoge kosten kiezen veel mensen voor de trein.", o:["Ondanks","Hoewel","Omdat","Daarom"], why:"Followed by a noun → ondanks."},
{q:"___ het duur is, kiezen veel mensen voor de trein.", o:["Hoewel","Ondanks","Daarom","Bovendien"], why:"Followed by a clause → hoewel."},
{q:"Ik spaar ___ een huis te kopen.", o:["om","voor","te","dat"], why:"Purpose → om ... te."},
{q:"Het plan is goedkoop. ___ is het beter voor het milieu.", o:["Bovendien","Hoewel","Ondanks","Omdat"], why:"Adding an argument → bovendien."},
{q:"Choose: I would like to consider that.", o:["Ik zou dat graag willen overwegen.","Ik zou graag overwegen willen dat.","Ik wil zou dat graag overwegen.","Ik zou willen dat graag overwegen."], why:"zou second, infinitives at the end."}
]}
],
order: [["The measure was introduced by the government.","De maatregel werd door de overheid ingevoerd."],["Although the plan is expensive, many people support it.","Hoewel het plan duur is, steunen veel mensen het."],["That is why it is important to invest in sustainable energy.","Daarom is het belangrijk om in duurzame energie te investeren."],["There is a lot of discussion about the housing market.","Er wordt veel gediscussieerd over de woningmarkt."]],
exam: {
minutes:{reading:40, listening:20, writing:40, speaking:10},
reading:[
{title:"Vergrijzing vraagt om keuzes", text:"Nederland vergrijst in hoog tempo. Het aandeel inwoners van 65 jaar en ouder neemt de komende decennia aanzienlijk toe, terwijl de groep werkenden relatief kleiner wordt. Economen waarschuwen dat dit gevolgen heeft voor de betaalbaarheid van de zorg en de pensioenen.\n\nSommige politici pleiten voor het verder verhogen van de pensioenleeftijd. Critici wijzen er echter op dat niet iedereen tot op hoge leeftijd kan doorwerken, zeker niet in fysiek zware beroepen.\n\nEen andere oplossing die vaak wordt genoemd, is het aantrekken van meer arbeidsmigranten. Ook dat ligt gevoelig: het vraagt om investeringen in huisvesting en integratie, terwijl de woningmarkt al onder druk staat.\n\nDuidelijk is dat er geen eenvoudige oplossing bestaat. Elke maatregel vraagt om een afweging tussen betaalbaarheid, draagvlak en rechtvaardigheid.",
qs:[{q:"Wat is volgens economen een gevolg van de vergrijzing?", o:["Zorg en pensioenen worden moeilijker te betalen","Er komen meer banen bij","De woningmarkt ontspant"]},
{q:"Welk bezwaar noemen critici tegen een hogere pensioenleeftijd?", o:["Niet iedereen kan lang doorwerken in zwaar werk","Het levert te weinig geld op","Jongeren verliezen daardoor hun baan"]},
{q:"Waarom ligt arbeidsmigratie gevoelig?", o:["Het vraagt investeringen terwijl de woningmarkt onder druk staat","Migranten willen niet in de zorg werken","Het is in strijd met de wet"]},
{q:"Welke conclusie trekt de schrijver?", o:["Elke oplossing vraagt om een afweging","Een hogere pensioenleeftijd is de beste oplossing","Vergrijzing is geen echt probleem"]}]},
{title:"Proef met vierdaagse werkweek", text:"Een middelgroot ICT-bedrijf in Eindhoven heeft een half jaar geëxperimenteerd met een vierdaagse werkweek, met behoud van salaris. Medewerkers werkten 32 in plaats van 40 uur.\n\nVolgens de directie is de productiviteit nauwelijks gedaald, terwijl het ziekteverzuim met bijna een derde afnam. Wel bleek dat niet alle afdelingen even goed konden omschakelen. Bij de klantenservice ontstonden wachttijden, omdat er op vrijdag te weinig personeel was.\n\nHet bedrijf zet de proef daarom voort, maar met roosters per afdeling. Vakbonden reageren positief, maar benadrukken dat de werkdruk niet mag toenemen doordat hetzelfde werk in minder tijd gedaan moet worden.",
qs:[{q:"Wat was een positief resultaat van de proef?", o:["Het ziekteverzuim daalde","Het salaris steeg","De klantenservice werd sneller"]},
{q:"Waarom ontstonden er problemen bij de klantenservice?", o:["Er was op vrijdag te weinig personeel","Medewerkers werkten nog steeds 40 uur","Er kwamen veel meer klanten"]},
{q:"Hoe gaat het bedrijf verder?", o:["Het gaat door met roosters per afdeling","Het stopt met de proef","Iedereen werkt weer vijf dagen"]},
{q:"Waar waarschuwen de vakbonden voor?", o:["Een hogere werkdruk","Lagere salarissen","Minder vakantiedagen"]}]}
],
listening:[
{script:"In dit college bespreken we het poldermodel. Die term verwijst naar de Nederlandse gewoonte om beslissingen te nemen via overleg tussen overheid, werkgevers en werknemers. Voorstanders zien het als een bron van stabiliteit: omdat alle partijen betrokken zijn, is er breed draagvlak voor maatregelen. Tegenstanders vinden het proces juist traag. Door het streven naar consensus duurt het soms jaren voordat er een beslissing valt. Bovendien worden compromissen volgens hen soms zo vaag dat niemand er echt tevreden mee is.",
qs:[{q:"Wat is het poldermodel?", o:["Besluiten nemen via overleg tussen overheid, werkgevers en werknemers","Een methode om land droog te maken","Een stemsysteem voor verkiezingen"]},{q:"Wat is volgens voorstanders het voordeel?", o:["Breed draagvlak en stabiliteit","Snelle beslissingen","Lagere kosten"]},{q:"Welke kritiek hebben tegenstanders?", o:["Het proces is traag en compromissen worden vaag","Werknemers krijgen te veel macht","Werkgevers worden niet betrokken"]}]},
{script:"Ik ben drie jaar geleden vanuit Brazilië naar Rotterdam gekomen voor mijn werk als data-analist. In het begin sprak ik op mijn werk alleen Engels, en dat was eigenlijk geen probleem. Maar ik merkte dat ik tijdens de lunch niet goed mee kon doen met informele gesprekken. Pas toen ik Nederlands ging leren, voelde ik me echt onderdeel van het team. Inmiddels heb ik het staatsexamen gehaald en overweeg ik een leidinggevende functie, waarvoor Nederlands wel vereist is.",
qs:[{q:"Waarom begon de spreker met Nederlands leren?", o:["Hij kon niet goed meedoen aan informele gesprekken","Zijn werkgever verplichtte het","Hij sprak geen Engels"]},{q:"Hoe was de situatie op het werk in het begin?", o:["Hij sprak alleen Engels en dat ging goed","Niemand sprak Engels","Hij werkte vooral thuis"]},{q:"Waarom is Nederlands nu belangrijk voor zijn carrière?", o:["Het is vereist voor een leidinggevende functie","Hij wil een nieuwe studie volgen","Hij wil terug naar Brazilië"]}]}
],
writing:[{prompt:"Je gemeente wil een groot park veranderen in een woonwijk om de woningnood aan te pakken. Schrijf een brief aan de gemeenteraad. Geef je standpunt, noem minstens twee argumenten en stel een alternatief voor.", words:[150,200]},
{prompt:"Schrijf een formele e-mail aan je leidinggevende waarin je voorstelt om in jouw team een vierdaagse werkweek te testen. Leg uit wat de voordelen zijn, welke risico's er zijn en hoe je die wilt beperken.", words:[150,200]}],
speaking:["Je werkgever overweegt om thuiswerken helemaal af te schaffen. Geef in een vergadering je mening, met argumenten en een compromisvoorstel.","Wat is volgens jou de grootste uitdaging voor expats in Nederland, en wat zou de overheid daaraan kunnen doen?","Beschrijf een project waarin je een moeilijke beslissing moest nemen. Wat heb je besloten en waarom?"]
}
}
};

export const DATA_FR: Record<string, any> = {
A1: {
  cert: "DELF A1 · pass 50/100, at least 5/25 in each part",
  vocab: [["bonjour","hello"],["merci","thank you"],["s'il vous plaît","please (formal)"],["au revoir","goodbye"],["le pain","the bread"],["l'eau","the water (feminine)"],["la gare","the station"],["le train","the train"],["la maison","the house"],["l'ami","the friend (masculine)"],["manger","to eat"],["boire","to drink"],["habiter","to live (reside)"],["travailler","to work"],["parler","to speak"],["aujourd'hui","today"],["demain","tomorrow"],["grand","big, tall"],["petit","small"],["combien","how much, how many"]],
  grammar: [
    {title:"Present tense: -er verbs, être, avoir", notes:["Regular -er verbs: je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent.","être (to be): je suis, tu es, il est, nous sommes, vous êtes, ils sont.","avoir (to have): j'ai, tu as, il a, nous avons, vous avez, ils ont.","je becomes j' before a vowel: j'habite, j'ai."],
     drills:[
      {q:"Nous ___ à Paris. (habiter)", o:["habitons","habitez","habitent","habite"], why:"nous + -ons."},
      {q:"Vous ___ anglais ? (parler)", o:["parlez","parlons","parles","parle"], why:"vous + -ez."},
      {q:"Elle ___ française. (être)", o:["est","es","a","sont"], why:"il/elle est."},
      {q:"Ils ___ deux enfants. (avoir)", o:["ont","sont","avez","a"], why:"ils ont."},
      {q:"Tu ___ au café ? (travailler)", o:["travailles","travaille","travaillez","travaillent"], why:"tu + -es."}
     ]},
    {title:"le, la, les, un, une", notes:["Every noun is masculine or feminine: le train, la gare.","le and la become l' before a vowel or a silent h: l'eau, l'hôtel.","The plural is les for both genders.","a/an: un (masculine), une (feminine). Learn every noun with its article."],
     drills:[
      {q:"___ gare", o:["la","le"], why:"la gare (feminine)."},
      {q:"___ train", o:["le","la"], why:"le train (masculine)."},
      {q:"___ eau", o:["l'","le","la"], why:"Before a vowel: l'."},
      {q:"___ enfants", o:["les","le","la"], why:"Plural: les."},
      {q:"J'ai ___ frère.", o:["un","une"], why:"frère is masculine: un."}
     ]}
  ],
  order: [["I live in Tokyo.","J'habite à Tokyo."],["Today I work at home.","Aujourd'hui, je travaille à la maison."],["Do you speak English?","Vous parlez anglais ?"],["The train leaves at eight o'clock.","Le train part à huit heures."],["Tomorrow we are going to Paris.","Demain, nous allons à Paris."]],
  exam: {
    minutes:{reading:30, listening:20, writing:30, speaking:7},
    reading:[
      {title:"Message de Julie", text:"Salut Tom !\n\nJe suis à la gare. Mon train a du retard. J'arrive au restaurant à vingt heures trente, pas à vingt heures. Tu peux commander une boisson pour moi ? Un jus d'orange, s'il te plaît.\n\nÀ tout à l'heure !\nJulie",
       qs:[{q:"Où est Julie ?", o:["À la gare","Au restaurant","À la maison"]},
           {q:"À quelle heure arrive Julie ?", o:["20 h 30","20 h 00","19 h 30"]},
           {q:"Qu'est-ce que Tom doit faire ?", o:["Commander un jus d'orange","Appeler Julie","Aller à la gare"]}]},
      {title:"Avis aux habitants", text:"Le mardi 14 octobre, il n'y a pas d'eau rue des Lilas de 9 h à 13 h. Nous changeons les tuyaux.\n\nDes questions ? Appelez la mairie au 01 23 45 67 89, du lundi au vendredi.\n\nLa mairie",
       qs:[{q:"Quand n'y a-t-il pas d'eau ?", o:["Mardi matin","Lundi toute la journée","Vendredi après-midi"]},
           {q:"Pourquoi n'y a-t-il pas d'eau ?", o:["La mairie change les tuyaux","L'eau est sale","La rue est fermée"]},
           {q:"Quand peut-on appeler la mairie ?", o:["Du lundi au vendredi","Seulement le mardi","Le week-end"]}]}
    ],
    listening:[
      {script:"Bonjour, je m'appelle Léa. J'habite à Lyon et je travaille dans un hôpital. Je vais au travail à vélo tous les jours.",
       qs:[{q:"Où habite Léa ?", o:["À Lyon","À Paris","À Nice"]},{q:"Où travaille Léa ?", o:["Dans un hôpital","Dans un magasin","Dans une école"]},{q:"Comment va-t-elle au travail ?", o:["À vélo","En train","En voiture"]}]},
      {script:"Mesdames et messieurs, le train à destination de Marseille partira de la voie cinq, et non de la voie trois. Départ à quatorze heures dix.",
       qs:[{q:"De quelle voie part le train ?", o:["Voie 5","Voie 3","Voie 10"]},{q:"À quelle heure part le train ?", o:["14 h 10","14 h 50","13 h 10"]}]}
    ],
    writing:[{prompt:"Votre nouveau voisin s'appelle Marc. Écrivez-lui un petit message. Dites votre nom, d'où vous venez et votre travail. Invitez-le à prendre un café samedi.", words:[40,50]}],
    speaking:["Présentez-vous : votre nom, où vous habitez et ce que vous faites.","Vous êtes dans une boulangerie. Demandez le prix d'une baguette et dites que vous payez par carte."]
  }
},
A2: {
  cert: "DELF A2 · pass 50/100, at least 5/25 in each part",
  vocab: [["le rendez-vous","the appointment"],["le médecin","the doctor"],["le collègue","the colleague"],["déménager","to move house"],["louer","to rent"],["le loyer","the rent"],["la facture","the bill"],["payer","to pay"],["les courses","the groceries"],["hier","yesterday"],["oublier","to forget"],["se souvenir","to remember"],["appeler","to call"],["le voisin","the neighbour"],["malade","ill"],["chercher","to look for"],["l'étage","the floor (storey)"],["partir","to leave"],["arriver","to arrive"],["la semaine","the week"]],
  grammar: [
    {title:"Passé composé", notes:["avoir or être + past participle: j'ai mangé, je suis allé(e).","-er verbs: parler → parlé. Common irregulars: fait, pris, vu, eu, été.","Movement verbs use être (aller, venir, partir, arriver) and agree: elle est partie.","Reflexive verbs use être: je me suis levé(e)."],
     drills:[
      {q:"Hier, j'___ travaillé tard.", o:["ai","suis","as","est"], why:"travailler takes avoir."},
      {q:"Nous ___ arrivés à midi.", o:["sommes","avons","sont","êtes"], why:"arriver takes être."},
      {q:"Elle est ___ à Lyon. (partir)", o:["partie","parti","partis","partir"], why:"With être, the participle agrees: partie."},
      {q:"J'ai ___ la facture. (payer)", o:["payé","payer","payais","paye"], why:"-er verb participle: -é."},
      {q:"Tu as ___ tes devoirs ? (faire)", o:["fait","faire","fais","faites"], why:"faire → fait."}
     ]},
    {title:"Near future and negation", notes:["aller + infinitive is the near future: je vais partir.","Negation wraps the verb: je ne parle pas. ne becomes n' before a vowel: je n'ai pas.","In the passé composé: je n'ai pas mangé.","ne ... plus (no longer), ne ... jamais (never), ne ... rien (nothing)."],
     drills:[
      {q:"Choose: I'm going to call you tonight.", o:["Je vais t'appeler ce soir.","Je t'vais appeler ce soir.","Je vais appeler toi ce soir.","Je appeler vais ce soir."], why:"aller + pronoun + infinitive."},
      {q:"Choose: I don't speak Dutch.", o:["Je ne parle pas néerlandais.","Je parle ne pas néerlandais.","Je ne pas parle néerlandais.","Je pas parle néerlandais."], why:"ne + verb + pas."},
      {q:"Choose: I didn't eat.", o:["Je n'ai pas mangé.","Je n'ai mangé pas.","Je ne pas ai mangé.","Je ai pas mangé."], why:"ne ... pas around the auxiliary."},
      {q:"Choose: She never works on Sundays.", o:["Elle ne travaille jamais le dimanche.","Elle jamais ne travaille le dimanche.","Elle ne jamais travaille le dimanche.","Elle travaille ne jamais le dimanche."], why:"ne + verb + jamais."},
      {q:"Choose: We are going to move next month.", o:["Nous allons déménager le mois prochain.","Nous déménager allons le mois prochain.","Nous allons déménagé le mois prochain.","Nous va déménager le mois prochain."], why:"allons + infinitive."}
     ]}
  ],
  order: [["Yesterday I called my colleague.","Hier, j'ai appelé mon collègue."],["Tomorrow I have to go to the doctor.","Demain, je dois aller chez le médecin."],["We moved last year.","Nous avons déménagé l'année dernière."],["I don't speak Dutch.","Je ne parle pas néerlandais."],["I'm going to call you tonight.","Je vais t'appeler ce soir."]],
  exam: {
    minutes:{reading:30, listening:25, writing:45, speaking:8},
    reading:[
      {title:"Courriel de Camille", text:"Bonjour Priya,\n\nLa semaine prochaine, un nouveau collègue arrive dans notre équipe. Il s'appelle Hugo et il vient de Bordeaux. Lundi, nous organisons un petit déjeuner pour l'accueillir, à 9 h 30 dans la cafétéria du deuxième étage.\n\nPeux-tu me dire avant vendredi si tu viens ? Je dois commander les croissants. Tu n'as rien à apporter, mais un gâteau est toujours le bienvenu !\n\nBonne journée,\nCamille",
       qs:[{q:"Pourquoi y a-t-il un petit déjeuner ?", o:["Pour accueillir un nouveau collègue","Pour l'anniversaire de Camille","Parce qu'Hugo part"]},
           {q:"Que doit faire Priya avant vendredi ?", o:["Dire si elle vient","Acheter un gâteau","Commander les croissants"]},
           {q:"Où a lieu le petit déjeuner ?", o:["À la cafétéria du deuxième étage","Dans un restaurant","À Bordeaux"]}]},
      {title:"Cabinet médical des Tilleuls", text:"Pour prendre rendez-vous, appelez-nous entre 8 h et 10 h ou réservez en ligne.\n\nPour un renouvellement d'ordonnance, envoyez un message sur notre site.\n\nLe soir et le week-end, en cas d'urgence, appelez le 15.",
       qs:[{q:"Comment prendre rendez-vous ?", o:["Par téléphone entre 8 h et 10 h ou en ligne","Seulement sur place","En appelant le 15"]},
           {q:"Que faire pour renouveler une ordonnance ?", o:["Envoyer un message sur le site","Appeler le 15","Venir le week-end"]},
           {q:"Samedi soir, vous êtes très malade. Que faites-vous ?", o:["J'appelle le 15","J'attends lundi","J'envoie un message sur le site"]}]}
    ],
    listening:[
      {script:"Bonjour, ici Kévin du magasin Vélo Plus. Votre vélo est prêt. Nous avons réparé les freins et le pneu. Ça fait quarante-cinq euros. Vous pouvez venir le chercher demain, entre neuf heures et dix-huit heures. Au revoir !",
       qs:[{q:"Qu'est-ce qui a été réparé ?", o:["Les freins et le pneu","Seulement le pneu","La lumière"]},{q:"Combien ça coûte ?", o:["45 €","55 €","15 €"]},{q:"Quand peut-on chercher le vélo ?", o:["Demain entre 9 h et 18 h","Aujourd'hui avant 18 h","Demain après 18 h"]}]},
      {script:"Le mois dernier, j'ai déménagé à Lille. Mon nouvel appartement est plus petit que l'ancien, mais il est tout près de la gare. Maintenant, j'arrive beaucoup plus vite au travail. Par contre, le loyer est plus cher.",
       qs:[{q:"Où habite la personne maintenant ?", o:["À Lille","À Paris","À Lyon"]},{q:"Quel est l'avantage du nouvel appartement ?", o:["Il est près de la gare","Il est plus grand","Le loyer est moins cher"]},{q:"Quel est l'inconvénient ?", o:["Le loyer est plus cher","Il est loin de la gare","Il est bruyant"]}]}
    ],
    writing:[{prompt:"Vous êtes malade et vous ne pouvez pas travailler demain. Écrivez un courriel à votre responsable : dites que vous êtes malade, quand vous pensez revenir et quel collègue peut vous remplacer.", words:[60,80]},
             {prompt:"Vous avez emménagé dans un nouvel appartement. Écrivez à un ami : où il se trouve, comment il est, et invitez votre ami à venir le voir.", words:[60,80]}],
    speaking:["Parlez de vos dernières vacances : où êtes-vous allé(e) et qu'avez-vous fait ?","Votre voisin écoute de la musique très fort le soir. Demandez-lui poliment de baisser le volume.","Vous voulez prendre rendez-vous chez le médecin. Expliquez pourquoi et demandez quand c'est possible."]
  }
},
B1: {
  cert: "DELF B1 · pass 50/100, at least 5/25 in each part",
  vocab: [["l'expérience","the experience"],["le développement","the development"],["la condition","the condition"],["la candidature","the job application"],["postuler","to apply (for a job)"],["le contrat","the contract"],["la mairie","the town hall"],["l'assurance","the insurance"],["comparer","to compare"],["décider","to decide"],["l'avantage","the advantage"],["l'inconvénient","the disadvantage"],["l'avis","the opinion"],["prétendre","to claim"],["malgré","despite"],["en outre","moreover"],["donc","therefore"],["cependant","however"],["la recherche","the research"],["responsable","responsible"]],
  grammar: [
    {title:"The subjunctive", notes:["After il faut que, je veux que, bien que, pour que: the subjunctive.","Regular form: take the ils form, drop -ent, add -e, -es, -e, -ions, -iez, -ent: qu'ils parlent → que je parle.","Irregular: être → que je sois, avoir → que j'aie, faire → que je fasse, aller → que j'aille.","Positive opinion verbs (je pense que, je crois que) take the indicative."],
     drills:[
      {q:"Il faut que tu ___ à l'heure. (être)", o:["sois","es","êtes","serais"], why:"il faut que + subjunctive of être: sois."},
      {q:"Je veux que vous ___ ce document. (lire)", o:["lisiez","lisez","lire","lirez"], why:"vouloir que + subjunctive."},
      {q:"Bien qu'il ___ tard, nous continuons. (être)", o:["soit","est","sera","était"], why:"bien que + subjunctive."},
      {q:"Je pense qu'il ___ raison. (avoir)", o:["a","ait","avoir","aie"], why:"Positive opinion: indicative."},
      {q:"Il faut que nous ___ les courses. (faire)", o:["fassions","faisons","ferons","faire"], why:"faire → que nous fassions."}
     ]},
    {title:"qui, que, où, dont", notes:["qui is the subject: la femme qui habite ici.","que is the object: le livre que je lis.","où for place and time: la ville où j'habite, le jour où...","dont replaces de + noun: le projet dont je parle."],
     drills:[
      {q:"La collègue ___ travaille à côté de moi vient de Lyon.", o:["qui","que","où","dont"], why:"Subject: qui."},
      {q:"Le livre ___ je lis est difficile.", o:["que","qui","où","dont"], why:"Object: que."},
      {q:"C'est la ville ___ j'habite.", o:["où","que","qui","dont"], why:"Place: où."},
      {q:"Voici le projet ___ je t'ai parlé.", o:["dont","que","qui","où"], why:"parler de → dont."},
      {q:"Le jour ___ je suis arrivé, il pleuvait.", o:["où","que","qui","dont"], why:"Time: où."}
     ]}
  ],
  order: [["I'm learning French because I want to work in Paris.","J'apprends le français parce que je veux travailler à Paris."],["If I have time, I cycle to work.","Si j'ai le temps, je vais au travail à vélo."],["I think the rent is too high.","Je pense que le loyer est trop cher."],["You have to arrive on time.","Il faut que tu arrives à l'heure."],["This is the city where I live.","C'est la ville où j'habite."]],
  exam: {
    minutes:{reading:35, listening:25, writing:45, speaking:15},
    reading:[
      {title:"Le télétravail reste populaire", text:"Depuis la pandémie, beaucoup de salariés travaillent à la maison une partie de la semaine. Dans une enquête auprès de 2 000 salariés, environ la moitié déclare télétravailler au moins un jour par semaine. Les salariés citent surtout des avantages : moins de temps dans les transports et un meilleur équilibre entre vie professionnelle et vie privée.\n\nPourtant, tous les employeurs ne sont pas convaincus. Ils constatent que les nouveaux salariés apprennent moins de leurs collègues à distance. De plus, le contact entre les équipes est parfois moins bon.\n\nBeaucoup d'entreprises choisissent donc un jour fixe au bureau, où toute l'équipe est présente. Elles essaient ainsi de garder les avantages du télétravail sans nuire à la collaboration.",
       qs:[{q:"Quel avantage les salariés citent-ils ?", o:["Moins de temps dans les transports","Un salaire plus élevé","Moins de travail"]},
           {q:"Quel problème les employeurs constatent-ils ?", o:["Les nouveaux apprennent moins de leurs collègues","Les salariés travaillent trop","Le télétravail coûte trop cher"]},
           {q:"Pourquoi les entreprises choisissent-elles un jour fixe au bureau ?", o:["Pour garder une bonne collaboration","Pour économiser de l'argent","Parce que la loi l'impose"]},
           {q:"Quel est le but du texte ?", o:["Informer sur les avantages et les inconvénients du télétravail","Convaincre les lecteurs de télétravailler","Annoncer une offre d'emploi"]}]},
      {title:"Nouvelles règles pour les encombrants", text:"À partir du 1er janvier, la ville ne ramasse plus les encombrants chaque semaine. Vous devez d'abord prendre rendez-vous en ligne. Vous recevez ensuite une date.\n\nSortez vos encombrants seulement la veille de cette date, après 21 h. Si vous les sortez plus tôt, vous risquez une amende de 100 euros.\n\nLes appareils électriques, comme un vieux lave-linge, ne sont pas acceptés avec les encombrants. Vous pouvez les déposer gratuitement à la déchetterie.",
       qs:[{q:"Que faut-il faire d'abord ?", o:["Prendre rendez-vous en ligne","Sortir les encombrants","Payer une amende"]},
           {q:"Quand peut-on sortir les encombrants ?", o:["La veille de la date, après 21 h","N'importe quel jour","Le matin de la date"]},
           {q:"Que faire d'un vieux lave-linge ?", o:["Le déposer gratuitement à la déchetterie","Le mettre avec les encombrants","Demander à la ville de le ramasser"]}]}
    ],
    listening:[
      {script:"Bonjour, vous écoutez Radio Ville. La mairie veut rendre le centre-ville piéton. À partir de l'année prochaine, les voitures ne pourront plus circuler dans le centre entre dix heures et dix-huit heures. Les commerçants ont peur de perdre des clients. La mairie affirme au contraire que plus de gens viendront faire leurs courses dans un centre plus calme. Les habitants qui ont une autorisation pourront toujours rentrer chez eux en voiture.",
       qs:[{q:"Que veut faire la mairie ?", o:["Interdire les voitures dans le centre en journée","Fermer les magasins","Construire des parkings"]},{q:"De quoi les commerçants ont-ils peur ?", o:["De perdre des clients","D'un loyer plus cher","De plus de vélos"]},{q:"Qui pourra encore entrer en voiture ?", o:["Les habitants avec une autorisation","Tous les commerçants","Tout le monde après dix heures"]}]},
      {script:"Bienvenue pour ton premier jour. Je t'explique comment ça marche. Aujourd'hui, tu reçois ton ordinateur et ton badge. Avec le badge, tu peux entrer dans le bâtiment et payer à la cantine. Cette semaine, tu suis une formation tous les matins. L'après-midi, tu travailles avec ta marraine, Fatima. Si tu as des questions, tu peux toujours lui demander. Vendredi, nous ferons un point sur ta première semaine.",
       qs:[{q:"À quoi sert le badge ?", o:["À entrer dans le bâtiment et payer à la cantine","Seulement à ouvrir l'ordinateur","À se garer"]},{q:"Que fait-on le matin cette semaine ?", o:["Une formation","Travailler avec Fatima","Un point sur la semaine"]},{q:"Que se passe-t-il vendredi ?", o:["Un point sur la première semaine","La dernière formation","On reçoit l'ordinateur"]}]}
    ],
    writing:[{prompt:"Vous avez acheté un casque audio en ligne, mais après une semaine il ne fonctionne plus. Écrivez un courriel au magasin : décrivez le problème, dites quand vous l'avez acheté et demandez une solution (un nouveau casque ou un remboursement).", words:[160,180]},
             {prompt:"Sur un forum, on discute de la question : les magasins doivent-ils ouvrir le dimanche ? Donnez votre opinion avec au moins deux arguments.", words:[160,180]}],
    speaking:["Un collègue veut apprendre le français mais a peu de temps. Donnez-lui deux conseils et expliquez pourquoi.","Décrivez comment vous allez au travail. Qu'est-ce que vous aimez et qu'est-ce que vous n'aimez pas ?","Certaines personnes pensent que tout le monde devrait aller au travail à vélo. Qu'en pensez-vous ?"]
  }
},
B2: {
  cert: "DELF B2 · pass 50/100, at least 5/25 in each part",
  vocab: [["la mesure","the measure"],["la politique","the policy"],["les conséquences","the consequences"],["considérable","considerable"],["augmenter","to increase"],["diminuer","to decrease"],["souligner","to emphasise"],["envisager","to consider"],["les attentes","the expectations"],["contribuer à","to contribute to"],["le compromis","the compromise"],["le point de départ","the starting point"],["néanmoins","nevertheless"],["certes","admittedly"],["concernant","concerning"],["éviter","to avoid"],["le vieillissement","ageing"],["durable","sustainable"],["l'arbitrage","the trade-off"],["l'explication","the explanation"]],
  grammar: [
    {title:"Passive and impersonal structures", notes:["Passive: être + participle, agreeing with the subject: La décision a été prise.","par introduces the agent: La loi a été votée par le Parlement.","on is often preferred in speech: On a pris la décision.","se faire + infinitive: Il s'est fait voler son vélo."],
     drills:[
      {q:"La réforme ___ adoptée l'année dernière.", o:["a été","est eu","avait","a"], why:"Passé composé passive: a été + participle."},
      {q:"Les décisions ont été ___ par la direction. (prendre)", o:["prises","pris","prise","prendre"], why:"Agrees with les décisions (feminine plural)."},
      {q:"Le rapport a été rédigé ___ deux chercheurs.", o:["par","de","avec","pour"], why:"Agent: par."},
      {q:"Elle s'est fait ___ son téléphone. (voler)", o:["voler","volé","volée","vole"], why:"se faire + infinitive."},
      {q:"___ a annoncé de nouvelles mesures.", o:["On","Il y","Ça","Se"], why:"Impersonal subject: on."}
     ]},
    {title:"Connectors and concession", notes:["bien que + subjunctive: Bien que le projet soit cher, ...","malgré + noun: Malgré le prix, ...","pourtant, cependant, néanmoins: however.","pour / afin de + infinitive: in order to."],
     drills:[
      {q:"___ le coût élevé, beaucoup de gens prennent le train.", o:["Malgré","Bien que","Parce que","Donc"], why:"Followed by a noun: malgré."},
      {q:"___ ce soit cher, beaucoup de gens prennent le train.", o:["Bien que","Malgré","Donc","Pourtant"], why:"Followed by a clause in the subjunctive: bien que."},
      {q:"J'économise ___ acheter un appartement.", o:["pour","afin que","malgré","bien que"], why:"pour + infinitive: in order to."},
      {q:"Le plan est bon marché. ___, il est meilleur pour l'environnement.", o:["En outre","Bien que","Malgré","Parce que"], why:"Adding an argument: en outre."},
      {q:"Il avait raison ; ___, personne ne l'a écouté.", o:["pourtant","parce que","afin que","donc"], why:"Contrast: pourtant."}
     ]}
  ],
  order: [["The measure was adopted by the government.","La mesure a été adoptée par le gouvernement."],["Although the plan is expensive, many people support it.","Bien que le plan soit cher, beaucoup de gens le soutiennent."],["That is why it is important to invest in renewable energy.","C'est pourquoi il est important d'investir dans les énergies renouvelables."],["Despite the rain, the event took place.","Malgré la pluie, l'événement a eu lieu."]],
  exam: {
    minutes:{reading:60, listening:30, writing:60, speaking:20},
    reading:[
      {title:"Le vieillissement impose des choix", text:"La population vieillit rapidement. La part des habitants de 65 ans et plus va augmenter considérablement dans les prochaines décennies, tandis que la population active diminue en proportion. Les économistes avertissent que cela aura des conséquences sur le financement de la santé et des retraites.\n\nCertains responsables politiques proposent de relever encore l'âge de départ à la retraite. Les critiques soulignent cependant que tout le monde ne peut pas travailler jusqu'à un âge avancé, surtout dans les métiers physiquement pénibles.\n\nUne autre solution souvent évoquée consiste à attirer davantage de travailleurs étrangers. Elle est elle aussi sensible : elle exige des investissements dans le logement et l'intégration, alors que le marché du logement est déjà sous tension.\n\nUne chose est claire : il n'existe pas de solution simple. Chaque mesure suppose un arbitrage entre coût, acceptabilité et justice.",
       qs:[{q:"Selon les économistes, quelle est une conséquence du vieillissement ?", o:["Le financement de la santé et des retraites devient plus difficile","Il y aura plus d'emplois","Le marché du logement se détend"]},
           {q:"Quelle objection les critiques font-ils au recul de l'âge de la retraite ?", o:["Tout le monde ne peut pas travailler longtemps dans un métier pénible","Cela rapporte trop peu","Les jeunes perdront leur emploi"]},
           {q:"Pourquoi l'immigration de travail est-elle un sujet sensible ?", o:["Elle exige des investissements alors que le logement est sous tension","Les étrangers ne veulent pas travailler dans la santé","Elle est contraire à la loi"]},
           {q:"Quelle conclusion l'auteur tire-t-il ?", o:["Chaque solution suppose un arbitrage","Relever l'âge de la retraite est la meilleure solution","Le vieillissement n'est pas un vrai problème"]}]},
      {title:"La semaine de quatre jours à l'essai", text:"Une entreprise informatique de taille moyenne à Nantes a testé pendant six mois la semaine de quatre jours, sans baisse de salaire. Les salariés ont travaillé 32 heures au lieu de 35.\n\nSelon la direction, la productivité a à peine baissé, tandis que l'absentéisme a diminué de près d'un tiers. Tous les services n'ont cependant pas réussi à s'adapter. Au service client, des temps d'attente sont apparus, car il manquait du personnel le vendredi.\n\nL'entreprise poursuit donc l'expérience, mais avec des plannings par service. Les syndicats saluent l'initiative, tout en soulignant que la charge de travail ne doit pas augmenter parce que le même travail doit être fait en moins de temps.",
       qs:[{q:"Quel a été un résultat positif de l'essai ?", o:["L'absentéisme a diminué","Les salaires ont augmenté","Le service client est devenu plus rapide"]},
           {q:"Pourquoi y a-t-il eu des problèmes au service client ?", o:["Il manquait du personnel le vendredi","Les salariés travaillaient 35 heures","Il y avait beaucoup plus de clients"]},
           {q:"Que fait l'entreprise ensuite ?", o:["Elle continue avec des plannings par service","Elle arrête l'expérience","Elle revient à cinq jours"]},
           {q:"Contre quoi les syndicats mettent-ils en garde ?", o:["Une charge de travail plus lourde","Des salaires plus bas","Moins de congés"]}]}
    ],
    listening:[
      {script:"Dans ce cours, nous étudions la concertation, c'est-à-dire l'habitude de prendre des décisions en discutant avec l'État, les employeurs et les syndicats. Ses partisans y voient une source de stabilité : comme toutes les parties sont impliquées, les mesures sont largement acceptées. Ses détracteurs trouvent au contraire le processus trop lent. À force de chercher le consensus, il faut parfois des années pour qu'une décision soit prise. De plus, selon eux, les compromis deviennent parfois si vagues que personne n'en est vraiment satisfait.",
       qs:[{q:"Qu'est-ce que la concertation ?", o:["Décider en discutant avec l'État, les employeurs et les syndicats","Une méthode de vote","Une loi sur le travail"]},{q:"Quel avantage voient ses partisans ?", o:["Une large acceptation et de la stabilité","Des décisions rapides","Des coûts plus bas"]},{q:"Quelle critique font ses détracteurs ?", o:["Le processus est lent et les compromis flous","Les syndicats ont trop de pouvoir","Les employeurs ne participent pas"]}]},
      {script:"Je suis arrivé du Brésil à Lyon il y a trois ans pour travailler comme analyste de données. Au début, je parlais seulement anglais au travail, et ce n'était pas vraiment un problème. Mais je me suis rendu compte que je n'arrivais pas à participer aux conversations informelles pendant le déjeuner. C'est seulement quand j'ai commencé à apprendre le français que je me suis senti vraiment intégré à l'équipe. Aujourd'hui, j'ai obtenu le DELF B2 et j'envisage un poste de manager, pour lequel le français est indispensable.",
       qs:[{q:"Pourquoi a-t-il commencé à apprendre le français ?", o:["Il ne participait pas aux conversations informelles","Son employeur l'y obligeait","Il ne parlait pas anglais"]},{q:"Comment était la situation au travail au début ?", o:["Il parlait seulement anglais et ça allait","Personne ne parlait anglais","Il travaillait surtout à la maison"]},{q:"Pourquoi le français est-il important pour sa carrière maintenant ?", o:["Il est indispensable pour un poste de manager","Il veut reprendre des études","Il veut rentrer au Brésil"]}]}
    ],
    writing:[{prompt:"Votre ville veut transformer un grand parc en quartier résidentiel pour lutter contre la crise du logement. Écrivez une lettre au conseil municipal : donnez votre point de vue, au moins deux arguments, et proposez une alternative.", words:[250,300]},
             {prompt:"Écrivez un courriel formel à votre responsable pour proposer de tester la semaine de quatre jours dans votre équipe. Expliquez les avantages, les risques et comment les limiter.", words:[250,300]}],
    speaking:["Votre employeur envisage de supprimer complètement le télétravail. Donnez votre avis en réunion, avec des arguments et une proposition de compromis.","Quel est selon vous le plus grand défi pour les expatriés en France, et que pourrait faire l'État ?","Décrivez un projet où vous avez dû prendre une décision difficile. Qu'avez-vous décidé et pourquoi ?"]
  }
}
};

export const DATA_JA: Record<string, any> = {
N5: {
  cert: "JLPT N5 · pass 80/180, about 800 words and 100 kanji",
  vocab: [["私","わたし","watashi","I, me"],["学校","がっこう","gakkou","school"],["先生","せんせい","sensei","teacher"],["水","みず","mizu","water"],["食べる","たべる","taberu","to eat"],["飲む","のむ","nomu","to drink"],["行く","いく","iku","to go"],["来る","くる","kuru","to come"],["見る","みる","miru","to see, to watch"],["駅","えき","eki","station"],["電車","でんしゃ","densha","train"],["今日","きょう","kyou","today"],["明日","あした","ashita","tomorrow"],["大きい","おおきい","ookii","big"],["高い","たかい","takai","expensive, tall"],["ありがとう","ありがとう","arigatou","thank you"],["すみません","すみません","sumimasen","excuse me, sorry"],["何","なん","nan","what"],["時間","じかん","jikan","time"],["友だち","ともだち","tomodachi","friend"]],
  grammar: [
    {title:"Particles は, を, に, で", notes:["は marks the topic: 私は学生です。","を marks the object: 水を飲みます。","に marks a destination or a time: 駅に行きます。7時に起きます。","で marks where an action happens, or the means: 学校で勉強します。電車で行きます。"],
     drills:[
      {q:"私___学生です。", o:["は","を","に","で"], why:"は marks the topic."},
      {q:"水___飲みます。", o:["を","は","で","に"], why:"を marks the object."},
      {q:"明日、駅___行きます。", o:["に","を","で","は"], why:"に marks the destination."},
      {q:"電車___会社に行きます。", o:["で","に","を","は"], why:"で marks the means of transport."},
      {q:"図書館___本を読みます。", o:["で","に","を","は"], why:"で marks where the action happens."}
     ]},
    {title:"Polite verbs: ます, ません, ました", notes:["Polite present or future: 食べます.","Negative: 食べません.","Past: 食べました. Past negative: 食べませんでした.","Questions end in か: 行きますか。"],
     drills:[
      {q:"昨日、映画を___。(見る, past)", o:["見ました","見ます","見ません","見ませんでした"], why:"Past polite: ました."},
      {q:"私はお酒を___。(飲む, negative)", o:["飲みません","飲みます","飲みました","飲む"], why:"Negative polite: ません."},
      {q:"明日、学校に___か。(来る)", o:["来ます","来ました","来て","来い"], why:"Future question: 来ますか."},
      {q:"昨日は雨が___。(降る, past)", o:["降りました","降ります","降りません","降る"], why:"Past polite of 降る: 降りました."},
      {q:"毎朝コーヒーを___。(飲む)", o:["飲みます","飲みました","飲みませんでした","飲んで"], why:"A habit uses the present form."}
     ]}
  ],
  order: [["I drink coffee every morning.",["私は","毎朝","コーヒーを","飲みます。"]],["I go to the station by train.",["私は","電車で","駅に","行きます。"]],["What time is it now?",["今","何時","ですか。"]],["Yesterday I watched a movie with a friend.",["昨日","友だちと","映画を","見ました。"]]],
  exam: {
    minutes:{vocab:20, reading:40, listening:30},
    vocab:[{title:"文字・語彙", qs:[
      {q:"「学校」の読み方は？", o:["がっこう","がこう","がっこ","かっこう"]},
      {q:"「電車」の読み方は？", o:["でんしゃ","でんしや","てんしゃ","でんちゃ"]},
      {q:"「たかい」を漢字で書くと？", o:["高い","長い","安い","早い"]},
      {q:"きのう ともだちと えいがを（　）。", o:["みました","たべました","のみました","ききました"]},
      {q:"「おおきい」の反対は？", o:["ちいさい","たかい","ながい","ひろい"]}]}],
    reading:[
      {title:"わたしの 一日", text:"わたしは 毎朝 7時に おきます。あさごはんを 食べて、8時に 電車で 会社に 行きます。会社は 駅の 近くです。\n\n12時に 友だちと 昼ごはんを 食べます。夜は うちで 本を 読みます。",
       qs:[{q:"この 人は なんで 会社に 行きますか。", o:["電車で","バスで","じてんしゃで","あるいて"]},
           {q:"会社は どこに ありますか。", o:["駅の 近く","うちの 近く","学校の となり","駅の 中"]},
           {q:"夜 なにを しますか。", o:["本を 読みます","昼ごはんを 食べます","電車に のります","会社に 行きます"]}]},
      {title:"文法", qs:[
        {q:"わたしは まいにち 日本語___ べんきょうします。", o:["を","が","に","へ"]},
        {q:"つくえの 上___ ねこが います。", o:["に","を","で","と"]},
        {q:"きのうは さむかった___、きょうは あたたかいです。", o:["ですが","ですから","ので","と"]}]}
    ],
    listening:[
      {script:"みなさん、おはようございます。きょうは 10時から 図書館で 日本語の じゅぎょうが あります。12時に 昼ごはんを 食べます。1時に バスで 美術館に 行きます。",
       qs:[{q:"じゅぎょうは どこで ありますか。", o:["図書館で","美術館で","教室で","バスの 中で"]},{q:"美術館に なんで 行きますか。", o:["バスで","電車で","あるいて","タクシーで"]},{q:"何時に 昼ごはんを 食べますか。", o:["12時","10時","1時","2時"]}]},
      {script:"いらっしゃいませ。この りんごは 一つ 100円です。三つで 250円です。",
       qs:[{q:"りんごを 三つ 買います。いくらですか。", o:["250円","300円","100円","350円"]}]}
    ]
  }
},
N4: {
  cert: "JLPT N4 · pass 90/180, about 1,500 words and 300 kanji",
  vocab: [["経験","けいけん","keiken","experience"],["約束","やくそく","yakusoku","promise, appointment"],["準備","じゅんび","junbi","preparation"],["説明","せつめい","setsumei","explanation"],["届ける","とどける","todokeru","to deliver"],["遅れる","おくれる","okureru","to be late"],["急ぐ","いそぐ","isogu","to hurry"],["集める","あつめる","atsumeru","to collect"],["比べる","くらべる","kuraberu","to compare"],["特に","とくに","tokuni","especially"],["必ず","かならず","kanarazu","without fail"],["残念","ざんねん","zannen","a pity, unfortunate"],["安全","あんぜん","anzen","safe, safety"],["会議","かいぎ","kaigi","meeting"],["予定","よてい","yotei","plan, schedule"]],
  grammar: [
    {title:"て-form and ている", notes:["The て-form links actions in order: 起きて、顔を洗って、出かけます。","〜てください asks politely: 見てください。","〜ている is an ongoing action or a state: 雨が降っています。東京に住んでいます。","〜てもいい asks permission; 〜てはいけない forbids."],
     drills:[
      {q:"ここで 写真を___もいいですか。(撮る)", o:["撮って","撮り","撮った","撮る"], why:"Permission: て-form + もいい."},
      {q:"今、雨が___います。(降る)", o:["降って","降り","降った","降る"], why:"Ongoing action: て-form + いる."},
      {q:"もう少し ゆっくり___ください。(話す)", o:["話して","話し","話す","話した"], why:"Polite request: て-form + ください."},
      {q:"朝ごはんを___、学校に行きます。(食べる)", o:["食べて","食べ","食べた","食べる"], why:"The て-form links actions in order."},
      {q:"図書館で 大きい声で 話しては___。", o:["いけません","いいです","ください","います"], why:"〜てはいけません: must not."}
     ]},
    {title:"Plain forms, たい, つもり, から", notes:["Plain forms: 行く, 行かない, 行った, 行かなかった.","〜たい expresses a wish: 日本に行きたいです。","〜つもり is a plan: 来年、日本に行くつもりです。","から gives a reason: 時間がないから、タクシーで行きます。"],
     drills:[
      {q:"来年、日本で 働く___です。", o:["つもり","たい","から","まで"], why:"Plain verb + つもり: intention."},
      {q:"疲れた___、今日は 早く 寝ます。", o:["から","のに","けど","まで"], why:"から gives the reason."},
      {q:"新しい パソコンが 買い___です。", o:["たい","ます","て","ない"], why:"Stem + たい: want to."},
      {q:"昨日は 雨が 降ら___。(plain past negative)", o:["なかった","ない","なくて","ず"], why:"Plain past negative: 〜なかった."},
      {q:"日本語を 話す___が できます。", o:["こと","もの","ところ","ため"], why:"Verb + ことができる: can do."}
     ]}
  ],
  order: [["Please speak a little more slowly.",["もう少し","ゆっくり","話して","ください。"]],["I plan to work in Japan next year.",["来年","日本で","働く","つもりです。"]],["It is raining now.",["今","雨が","降って","います。"]],["I'm tired, so I'll sleep early today.",["疲れたから","今日は","早く","寝ます。"]]],
  exam: {
    minutes:{vocab:25, reading:55, listening:35},
    vocab:[{title:"文字・語彙", qs:[
      {q:"「約束」の読み方は？", o:["やくそく","やくそっく","よくそく","やくぞく"]},
      {q:"「おくれる」を漢字で書くと？", o:["遅れる","送れる","起れる","置れる"]},
      {q:"会議の（　）を します。書類を コピーして ください。", o:["準備","経験","残念","安全"]},
      {q:"この 道は 車が 少なくて（　）です。", o:["安全","残念","特に","必ず"]}]}],
    reading:[
      {title:"お知らせ", text:"来週の 月曜日、午後2時から 3階の 会議室で 会議が あります。会議の 前に、資料を 読んで おいて ください。\n\n資料は 金曜日までに メールで 送ります。会議に 来られない 人は、山田さんに 連絡して ください。",
       qs:[{q:"会議の 前に 何を しなければ なりませんか。", o:["資料を 読む","資料を コピーする","山田さんに 会う","メールを 送る"]},
           {q:"資料は いつまでに 届きますか。", o:["金曜日まで","月曜日まで","会議の 後","午後2時まで"]},
           {q:"会議に 出られない 人は どう しますか。", o:["山田さんに 連絡する","資料を 送る","3階に 行く","何も しない"]}]},
      {title:"文法", qs:[
        {q:"この 本は 先週 図書館で 借り___ 本です。", o:["た","て","る","ない"]},
        {q:"雨が 降って いる___、出かけません。", o:["ので","のに","けれど","ても"]},
        {q:"日本に 来て から、もう 3年に___。", o:["なります","します","あります","います"]}]}
    ],
    listening:[
      {script:"お客様に お知らせします。本日は 雨のため、午後の バスツアーは 中止に なりました。チケットを お持ちの 方は、1階の カウンターで お金を 返して もらえます。",
       qs:[{q:"どうして ツアーは 中止に なりましたか。", o:["雨が 降って いるから","バスが 壊れたから","お客さんが 少ないから","午後が 休みだから"]},{q:"チケットを 持って いる 人は 何を しますか。", o:["1階の カウンターに 行く","バスに 乗る","電話を する","2階で 待つ"]}]},
      {script:"もしもし、田中です。すみません、電車が 止まって いて、会議に 30分ぐらい 遅れます。先に 始めて ください。",
       qs:[{q:"田中さんは どうして 遅れますか。", o:["電車が 止まって いるから","寝坊したから","道が 混んで いるから","会議を 忘れたから"]},{q:"田中さんは 何を お願いしましたか。", o:["先に 会議を 始めること","会議を 中止すること","30分 待つこと","駅に 迎えに 来ること"]}]}
    ]
  }
},
N3: {
  cert: "JLPT N3 · pass 95/180, about 3,700 words and 650 kanji",
  vocab: [["影響","えいきょう","eikyou","influence"],["比較","ひかく","hikaku","comparison"],["増加","ぞうか","zouka","increase"],["減少","げんしょう","genshou","decrease"],["努力","どりょく","doryoku","effort"],["機会","きかい","kikai","opportunity"],["結果","けっか","kekka","result"],["原因","げんいん","genin","cause"],["解決","かいけつ","kaiketsu","solution"],["確認","かくにん","kakunin","confirmation, check"],["慣れる","なれる","nareru","to get used to"],["任せる","まかせる","makaseru","to entrust"],["やっと","やっと","yatto","finally"],["なるべく","なるべく","narubeku","as much as possible"],["一方","いっぽう","ippou","on the other hand"]],
  grammar: [
    {title:"ようにする, ことにする, たばかり", notes:["〜ようにする: make a point of: 毎日野菜を食べるようにしています。","〜ことにする: decide to: 来月から自転車で通勤することにしました。","〜たばかり: have just done: 日本に来たばかりです。","〜ようになる: come to be able to: 日本語が話せるようになりました。"],
     drills:[
      {q:"健康のために、毎日 歩く___しています。", o:["ように","ことに","ために","ばかり"], why:"〜ようにする: make a habit of."},
      {q:"来月から 自転車で 通勤する___しました。", o:["ことに","ように","ばかりに","ために"], why:"〜ことにする: decide to."},
      {q:"日本に 来た___なので、まだ 生活に 慣れていません。", o:["ばかり","ように","ことに","ために"], why:"〜たばかり: just did."},
      {q:"練習して、漢字が 読める___なりました。", o:["ように","ことに","ために","ばかり"], why:"〜ようになる: became able to."},
      {q:"この 仕事は 田中さん___任せましょう。", o:["に","を","で","が"], why:"任せる takes the person with に."}
     ]},
    {title:"Passive and causative", notes:["Passive 〜られる: 先生に褒められました (I was praised by the teacher).","Suffering passive: 雨に降られました (I got caught in the rain).","Causative 〜させる: make or let: 子どもに野菜を食べさせます。","Causative-passive 〜させられる: be made to: 部長に残業をさせられました。"],
     drills:[
      {q:"電車の中で 足を___。(踏む, passive)", o:["踏まれました","踏ませました","踏みました","踏めました"], why:"Passive of 踏む: 踏まれる."},
      {q:"母は 子どもに 部屋を 掃除___。(causative)", o:["させました","されました","しました","できました"], why:"Causative of する: させる."},
      {q:"この 本は 多くの 国で 読まれて___。", o:["います","あります","おきます","みます"], why:"Passive + ている: is widely read."},
      {q:"先生___ 名前を 呼ばれました。", o:["に","を","で","が"], why:"The agent in a passive takes に."},
      {q:"部長に 残業を___。(する, causative-passive)", o:["させられました","させました","されました","しました"], why:"Causative-passive: させられる."}
     ]}
  ],
  order: [["I make a point of walking every day for my health.",["健康のために","毎日","歩くように","しています。"]],["I have just come to Japan.",["日本に","来た","ばかりです。"]],["My foot was stepped on in the train.",["電車の中で","足を","踏まれました。"]],["I decided to commute by bicycle.",["自転車で","通勤する","ことに","しました。"]]],
  exam: {
    minutes:{vocab:30, reading:70, listening:40},
    vocab:[{title:"文字・語彙", qs:[
      {q:"「影響」の読み方は？", o:["えいきょう","えいきょ","えいこう","けいきょう"]},
      {q:"「げんいん」を漢字で書くと？", o:["原因","元因","原院","源因"]},
      {q:"新しい 仕事にも、やっと（　）きた。", o:["慣れて","任せて","比べて","確認して"]},
      {q:"「なるべく」に 意味が 最も 近いものは？", o:["できるだけ","かならず","とくに","やっと"]}]}],
    reading:[
      {title:"スマートフォンと睡眠", text:"最近、寝る前にスマートフォンを使う人が増えている。ある調査によると、20代の約7割が、ベッドに入ってからも30分以上画面を見ているという。\n\n画面の光は脳を目覚めさせるため、なかなか眠れなくなる原因になる。専門家は、寝る1時間前にはスマートフォンを置くようにすることを勧めている。\n\n一方で、音楽や音声を聞いてリラックスする人もいる。大切なのは、画面を見続けないことだと言えるだろう。",
       qs:[{q:"画面の光には どんな 影響が ありますか。", o:["眠りにくくなる","目が悪くなる","音楽が聞けなくなる","早く眠くなる"]},
           {q:"専門家は 何を 勧めていますか。", o:["寝る1時間前にスマートフォンを置くこと","ベッドで音楽を聞くこと","30分だけ画面を見ること","朝早く起きること"]},
           {q:"筆者が 一番 言いたいことは 何ですか。", o:["寝る前に画面を見続けないことが大切だ","スマートフォンは使わないほうがいい","20代は寝る時間が短い","音楽を聞くと眠れない"]}]},
      {title:"文法", qs:[
        {q:"この 仕事が 終わった___、帰っても いいですよ。", o:["ら","のに","ても","ながら"]},
        {q:"彼は 忙しい___、毎日 ジムに 通っている。", o:["のに","ので","から","ために"]},
        {q:"日本語は 勉強すれば する___、おもしろくなる。", o:["ほど","だけ","まで","ばかり"]}]}
    ],
    listening:[
      {script:"店からの お知らせです。本日は 開店10周年のため、すべての 商品が 2割引きです。ただし、セール品は 対象外と なります。また、3000円以上 お買い上げの お客様には、次回 使える 500円券を 差し上げます。",
       qs:[{q:"今日、何が 2割引きですか。", o:["セール品以外の 商品","セール品だけ","3000円以上の 商品","すべての 商品と セール品"]},{q:"500円券を もらえるのは どんな 人ですか。", o:["3000円以上 買った 人","初めて 来た 人","セール品を 買った 人","10回目の 人"]}]},
      {script:"会社に 入った ばかりの ころ、私は 電話に 出るのが 苦手でした。相手の 話が 速くて、名前を 聞き取れないことが よく ありました。そこで、分からない ときは すぐに 聞き返すことに しました。そうしたら、だんだん 慣れて きました。",
       qs:[{q:"話している 人は どうして 電話が 苦手でしたか。", o:["相手の 話が 速くて 聞き取れなかったから","電話が 少なかったから","敬語が 使えなかったから","名前を 覚えられなかったから"]},{q:"話している 人は 何を することに しましたか。", o:["分からない ときは すぐに 聞き返す","電話に 出ない","メールを 使う","先輩に 代わって もらう"]}]}
    ]
  }
},
N2: {
  cert: "JLPT N2 · pass 90/180, about 6,000 words and 1,000 kanji",
  vocab: [["把握","はあく","haaku","grasp, understanding"],["妥協","だきょう","dakyou","compromise"],["維持","いじ","iji","maintenance, keeping"],["促進","そくしん","sokushin","promotion, acceleration"],["見直す","みなおす","minaosu","to review, reconsider"],["取り組む","とりくむ","torikumu","to tackle"],["至急","しきゅう","shikyuu","urgently"],["相変わらず","あいかわらず","aikawarazu","as usual"],["傾向","けいこう","keikou","tendency"],["需要","じゅよう","juyou","demand"],["供給","きょうきゅう","kyoukyuu","supply"],["負担","ふたん","futan","burden"],["効率","こうりつ","kouritsu","efficiency"],["柔軟","じゅうなん","juunan","flexible"],["いきなり","いきなり","ikinari","suddenly"]],
  grammar: [
    {title:"わけ and はず", notes:["〜わけだ: no wonder: 10年も住んでいたのだから、日本語が上手なわけだ。","〜わけではない: it's not that: 嫌いなわけではないが、あまり食べない。","〜わけにはいかない: cannot (for social reasons): 約束したので、行かないわけにはいかない。","〜はずだ / はずがない: should be / there's no way."],
     drills:[
      {q:"10年も 日本に 住んでいたのだから、日本語が 上手な___。", o:["わけだ","はずがない","わけにはいかない","ものか"], why:"わけだ: no wonder."},
      {q:"明日は 大事な 会議が あるので、休む___。", o:["わけにはいかない","わけだ","はずだ","ことだ"], why:"わけにはいかない: can't, because of obligation."},
      {q:"荷物は 昨日 送ったので、今日 届く___だ。", o:["はず","わけ","もの","こと"], why:"はずだ: should (expected)."},
      {q:"肉が 嫌いな___が、あまり 食べない。", o:["わけではない","はずだ","わけにはいかない","ことにする"], why:"わけではない: it's not that."},
      {q:"あんなに 練習したのだから、失敗する___。", o:["はずがない","わけだ","ことだ","ものだ"], why:"はずがない: there's no way."}
     ]},
    {title:"によって, に対して, をめぐって, にとって", notes:["〜によって: depending on / by means of: 国によって習慣が違う。","〜に対して: towards, in contrast to: 客に対して丁寧に話す。","〜をめぐって: over (a dispute): 新しい駅の建設をめぐって議論が続いている。","〜にとって: for (from the viewpoint of): 私にとって大切な人。"],
     drills:[
      {q:"国___ 習慣が 違う。", o:["によって","に対して","をめぐって","にとって"], why:"によって: depending on."},
      {q:"お客様___ 失礼な ことを 言ってはいけない。", o:["に対して","によって","をめぐって","にとって"], why:"に対して: towards someone."},
      {q:"新しい 空港の 建設___、住民の 意見が 分かれている。", o:["をめぐって","によって","に対して","にとって"], why:"をめぐって: over a dispute."},
      {q:"この 問題は 私___ 難しすぎる。", o:["にとって","に対して","によって","をめぐって"], why:"にとって: for me."},
      {q:"調査の 結果に___、計画を 見直した。", o:["基づいて","対して","とって","めぐって"], why:"に基づいて: based on."}
     ]}
  ],
  order: [["It's not that I dislike meat.",["肉が","嫌いな","わけでは","ありません。"]],["Customs differ depending on the country.",["国によって","習慣が","違います。"]],["The package should arrive today.",["荷物は","今日","届く","はずです。"]],["We reviewed the plan based on the data.",["データに基づいて","計画を","見直しました。"]]],
  exam: {
    minutes:{vocab:35, reading:70, listening:50},
    vocab:[{title:"文字・語彙", qs:[
      {q:"「把握」の読み方は？", o:["はあく","はおく","ぱあく","ばあく"]},
      {q:"「じゅよう」を漢字で書くと？", o:["需要","重要","需用","受要"]},
      {q:"作業の（　）を上げるため、手順を見直した。", o:["効率","負担","傾向","妥協"]},
      {q:"「いきなり」に 意味が 最も 近いものは？", o:["突然","相変わらず","至急","少しずつ"]}]}],
    reading:[
      {title:"働き方の見直し", text:"多くの企業で、働き方を見直す動きが広がっている。背景には、人手不足と、社員の生活を大切にしたいという考え方の変化がある。\n\nたとえば、ある会社では会議の時間を原則30分以内にし、資料は事前に共有することにした。その結果、会議の数が減り、社員一人一人が自分の仕事に集中できるようになったという。\n\nただし、制度を変えるだけでは十分ではない。管理職が率先して早く帰るなど、職場の雰囲気を変える努力も欠かせないだろう。",
       qs:[{q:"働き方を見直す動きの 背景として 述べられていないものは どれか。", o:["給料の上昇","人手不足","社員の生活を重視する考え方"]},
           {q:"ある会社の 取り組みの 結果、どうなったか。", o:["社員が自分の仕事に集中しやすくなった","会議の時間が長くなった","資料が不要になった","社員が増えた"]},
           {q:"筆者の 考えに 合うものは どれか。", o:["制度だけでなく職場の雰囲気を変えることも必要だ","会議はすべてなくすべきだ","管理職は遅くまで働くべきだ","制度を変えれば問題は解決する"]}]},
      {title:"文法", qs:[
        {q:"彼の 意見に 賛成する 人が いる___、反対する 人も いる。", o:["一方で","ばかりか","うちに","ついでに"]},
        {q:"お忙しい___、手伝って いただき ありがとう ございます。", o:["ところ","ものの","わりに","せいで"]},
        {q:"雨が 降り___ 前に、洗濯物を 取り込んだ。", o:["出す","出し","出した","出して"]}]}
    ],
    listening:[
      {script:"部長が 話しています。来月から、プロジェクトの 進め方を 少し 変えます。これまでは 毎週 月曜日に 全員で 会議を していましたが、これからは 各チームの リーダーだけが 集まります。その代わり、チーム内の 情報共有は チャットで 毎日 行って ください。",
       qs:[{q:"来月から、月曜日の 会議に 出るのは 誰ですか。", o:["各チームの リーダー","全員","部長だけ","新しい 社員"]},{q:"チームの メンバーは 何を しなければ なりませんか。", o:["毎日 チャットで 情報を 共有する","毎週 会議に 出る","部長に 報告書を 出す","リーダーを 選ぶ"]}]},
      {script:"私は 以前、何でも 一人で やろうとして、よく 失敗していました。人に 頼むのは 迷惑を かけることだと 思っていたんです。でも、ある 先輩に「頼るのも 仕事の うちだ」と 言われて、考え方が 変わりました。",
       qs:[{q:"話している 人は なぜ 以前 よく 失敗していましたか。", o:["何でも 一人で やろうとしたから","先輩に 頼りすぎたから","仕事が 少なかったから","人の 話を 聞かなかったから"]},{q:"先輩の 言葉の 意味に 近いものは？", o:["人に 助けを 求めることも 必要だ","一人で 頑張ることが 大切だ","迷惑を かけては いけない","仕事は 早く 終わらせるべきだ"]}]}
    ]
  }
},
N1: {
  cert: "JLPT N1 · pass 100/180, about 10,000 words and 2,000 kanji",
  vocab: [["顕著","けんちょ","kencho","remarkable, marked"],["懸念","けねん","kenen","concern, worry"],["是正","ぜせい","zesei","correction"],["踏襲","とうしゅう","toushuu","following (a precedent)"],["脆弱","ぜいじゃく","zeijaku","fragile, vulnerable"],["一概に","いちがいに","ichigaini","as a rule, sweepingly"],["頑なに","かたくなに","katakunani","stubbornly"],["目論む","もくろむ","mokuromu","to plan, to scheme"],["覆す","くつがえす","kutsugaesu","to overturn"],["ことごとく","ことごとく","kotogotoku","entirely, without exception"],["否めない","いなめない","inamenai","undeniable"],["拮抗","きっこう","kikkou","being evenly matched"],["措置","そち","sochi","measure, step"],["緩和","かんわ","kanwa","easing, relaxation"],["逸脱","いつだつ","itsudatsu","deviation"]],
  grammar: [
    {title:"ざるを得ない, 余儀なくされる, にほかならない", notes:["〜ざるを得ない: have no choice but to: 中止せざるを得ない。","〜を余儀なくされる: be forced to: 計画の変更を余儀なくされた。","〜にほかならない: is nothing other than: 成功は努力の結果にほかならない。","〜に難くない: easy to (imagine): 想像に難くない。"],
     drills:[
      {q:"台風の 影響で、イベントは 中止せ___。", o:["ざるを得なかった","ずにはいられなかった","ないではすまなかった","るべくもなかった"], why:"せざるを得ない: no choice but to."},
      {q:"資金不足により、計画の 変更を___。", o:["余儀なくされた","余儀なくした","得なかった","禁じ得なかった"], why:"〜を余儀なくされる: be forced to."},
      {q:"今回の 成功は、チーム全員の 努力の 結果に___。", o:["ほかならない","かぎらない","たえない","あたらない"], why:"〜にほかならない: nothing other than."},
      {q:"彼の 悔しさは 想像に___。", o:["難くない","ほかならない","足りない","及ばない"], why:"想像に難くない: easy to imagine."}
     ]},
    {title:"をもって, いかんによらず, ともなると, たりとも", notes:["〜をもって: as of (formal): 本日をもって閉店いたします。","〜いかんによらず: regardless of: 理由のいかんによらず、返金はできません。","〜ともなると: when it comes to: 社長ともなると、責任も重い。","〜たりとも: not even one: 一日たりとも休まなかった。"],
     drills:[
      {q:"本日___ 営業を 終了いたします。", o:["をもって","にあって","とあって","をおいて"], why:"をもって: as of."},
      {q:"理由の___、キャンセル料を いただきます。", o:["いかんによらず","いかんで","かぎりで","ことなしに"], why:"いかんによらず: regardless of."},
      {q:"大企業の 社長___、休日も ほとんど ない。", o:["ともなると","とあれば","ながらも","たりとも"], why:"ともなると: once you are at that level."},
      {q:"試験まで、一日___ 無駄に できない。", o:["たりとも","ともなると","をもって","にして"], why:"たりとも: not even one."},
      {q:"この 件は、彼___ ほかに 任せられる 人は いない。", o:["をおいて","をもって","にあって","とあって"], why:"をおいてほかに: nobody except."}
     ]}
  ],
  order: [["Due to the typhoon, we had no choice but to cancel.",["台風のため","中止","せざるを","得なかった。"]],["The store closes as of today.",["本日をもって","閉店","いたします。"]],["Regardless of the reason, we cannot give refunds.",["理由のいかんによらず","返金は","できません。"]],["Not even one day can be wasted.",["一日たりとも","無駄には","できない。"]]],
  exam: {
    minutes:{vocab:35, reading:75, listening:55},
    vocab:[{title:"文字・語彙", qs:[
      {q:"「脆弱」の読み方は？", o:["ぜいじゃく","きじゃく","ぜじゃく","せいじゃく"]},
      {q:"「くつがえす」を漢字で書くと？", o:["覆す","翻す","返す","崩す"]},
      {q:"両チームの 実力は（　）しており、結果は 予想できない。", o:["拮抗","是正","踏襲","逸脱"]},
      {q:"「一概に」の 使い方として 最も 適切なものは？", o:["一概に悪いとは言えない","一概に来てください","一概に食べた","一概にうれしい"]}]}],
    reading:[
      {title:"テレワークの功罪", text:"テレワークの普及は、通勤という長年の負担から多くの人を解放した。育児や介護と仕事を両立しやすくなったという声も少なくない。\n\nしかし、その利点ばかりが強調されることには懸念を覚える。対面での偶然の会話から生まれる発想や、若手社員が先輩の仕事ぶりを見て学ぶ機会は、画面越しでは得がたい。組織の知識が静かに失われていく危険性は否めない。\n\n問われているのは、出社か在宅かという二者択一ではない。何のために集まるのかを組織が改めて定義し、その目的に応じて働く場所を選ぶ柔軟さこそが求められているのではないか。",
       qs:[{q:"筆者が テレワークについて 懸念しているのは 何か。", o:["偶然の会話や若手が学ぶ機会が失われること","通勤の負担が増えること","育児との両立が難しくなること","画面の質が低いこと"]},
           {q:"「得がたい」の 意味に 最も 近いものは？", o:["手に入れにくい","得をしない","簡単に得られる","手放したくない"]},
           {q:"筆者の 主張として 最も 適切なものは？", o:["集まる目的を定め、それに応じて働く場所を選ぶべきだ","全員が出社に戻るべきだ","テレワークをさらに拡大すべきだ","若手社員だけ出社すべきだ"]}]},
      {title:"文法", qs:[
        {q:"彼の 努力は 称賛に___ ものだ。", o:["値する","至る","堪えない","及ぶ"]},
        {q:"この 景色は 京都___の 美しさだ。", o:["ならでは","ばかり","までも","ずくめ"]},
        {q:"一流の 選手___、毎日の 練習を 欠かさない。", o:["ともなると","とあって","ながらも","ならでは"]}]}
    ],
    listening:[
      {script:"大学で 教授が 話しています。本日は、なぜ 人は 計画どおりに 行動できないのかを 考えます。多くの 人は、将来の 大きな 利益よりも、目の前の 小さな 満足を 選びがちです。これを 避けるには、意志の 力に 頼るのではなく、望ましい 行動を 自然に 選べる 環境を あらかじめ 整えておくことが 有効だと 言われています。",
       qs:[{q:"人が 計画どおりに 行動できない 理由として、教授は 何を 挙げていますか。", o:["目の前の 満足を 優先しがちだから","将来の 利益が 小さいから","計画が 複雑すぎるから","意志が 強すぎるから"]},{q:"教授が 勧めている 方法は どれですか。", o:["望ましい 行動を 選びやすい 環境を 先に 作る","意志の 力を 鍛える","計画を 細かく 書く","目の前の 満足を すべて 我慢する"]}]},
      {script:"市の 担当者が 話しています。駅前の 再開発計画について、住民の 皆様から 多くの ご意見を いただきました。中でも、商店街の 雰囲気を 残してほしいという 声が 最も 多く 寄せられました。そこで 市としては、建物の 高さに 制限を 設けたうえで、今の 店舗が 引き続き 営業できるよう 支援することを 決めました。",
       qs:[{q:"住民から 最も 多かった 意見は 何ですか。", o:["商店街の 雰囲気を 残してほしい","高い 建物を 建ててほしい","駅を 新しくしてほしい","店を 減らしてほしい"]},{q:"市が 決めたことは どれですか。", o:["建物の 高さを 制限し、今の 店を 支援する","再開発を 中止する","商店街を 移転させる","新しい 店だけを 呼ぶ"]}]}
    ]
  }
}
};
