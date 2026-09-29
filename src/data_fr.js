const DATA_FR = {
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
