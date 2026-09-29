const DATA = {
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
