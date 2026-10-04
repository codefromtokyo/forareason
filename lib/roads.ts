/* Ported: road rules, licence journeys, theory quiz. */
/* Road rules guides and driving licence paths. Facts checked September 2026; laws change, so each guide links to the official source. */
export const ROAD: Record<string, any> = {
jp: {
  country:"Japan", side:"left", official:[["National Police Agency","https://www.npa.go.jp/english/"],["JAF (IDP and licence translations)","https://english.jaf.or.jp/"]],
  guide:[
    { title:"Before you drive", points:["Japan drives on the left. The driver's seat is on the right.","Visitors can drive with an International Driving Permit (1949 Geneva Convention) plus their home licence, for up to one year from entering Japan. Licences from a few countries use an official Japanese translation instead of a permit.","Your home licence alone is not enough. Always carry the licence and the permit or translation.","Alcohol: treat it as zero. Passengers who ride with a drunk driver and people who serve alcohol to a driver can be punished too."] },
    { title:"Rules that surprise visitors", points:["No turning on red. Only a green arrow lets you go.","Stop completely before every railway crossing, even with no train or signal in sight. Look and listen, then cross.","The stop sign is a red inverted triangle with 止まれ (tomare).","Speed limits without signs: 30 km/h on roads with no centre line (since 1 September 2026), 60 km/h on other ordinary roads, 100 km/h on expressways.","If a pedestrian is crossing or about to cross at a crosswalk, you must stop.","No hand-held phone use while driving, including looking at a map on it.","Seat belts in every seat. Children under 6 need a child seat."] },
    { title:"Walking (what's expected)", points:["Walk on the right side of the road where there's no pavement, facing oncoming traffic.","Cross at crossings and wait for the green man, even on an empty street at night. Locals do, and drivers expect it.","At a crossing with no lights, catch the driver's eye and cross when they stop. Many drivers now stop by law.","Stand on one side of the escalator so people can pass (side varies by city).","Don't cross while looking at your phone; don't jaywalk mid-block on busy roads."] },
    { title:"Cycling", points:["Bicycles are vehicles: ride on the left side of the road. Pavements only where signs allow.","Since 1 April 2026, cyclists aged 16 and over get on-the-spot fines (blue tickets). Phone use while riding: ¥12,000.","No riding with an umbrella or with earphones that block sound. No riding two on one bike.","Helmets are expected for every cyclist."] },
    { title:"Emergencies", points:["Police 110. Ambulance and fire 119.","After any accident, even a small one, the driver must call the police and help anyone injured.","Police boxes (交番, koban) help with directions and lost items."] }
  ],
  hasWritten:true,
  visit:["Visitors can drive for up to one year from entering Japan with an International Driving Permit (1949 Geneva Convention) plus their home licence.","A few countries (e.g. Switzerland, Germany, France, Belgium, Taiwan, Monaco) use an official Japanese translation (JAF) instead of an IDP.","Rent from a counter at the airport or in town; you'll show the permit/translation and your licence. Most cars are automatic.","Toll roads use ETC cards; rentals usually include one. Drive on the left and keep to 30 km/h on small streets.","Your home licence alone is never enough; always carry the permit or translation with it."],
  journeys:{
    licence:[
      { title:"1. Go through a driving school (教習所)", body:"Most first-time drivers enrol in an accredited school. It's the smoothest route and prepares you for both the theory and the driving test." },
      { title:"2. Provisional theory test", body:"A written test of 50 questions; you need 45 correct (90%). Then you practise on the road with a provisional licence." },
      { title:"3. Final theory test at the licensing centre", body:"95 questions, and you need 90 of 100 points. Some centres offer it in English and other languages. Bring ID and your documents." },
      { title:"4. Driving test and licence", body:"Pass the practical test to get your licence. New drivers display the beginner mark (初心者マーク) for one year." }
    ],
    convert:[
      { title:"1. Check you're eligible (外免切替)", body:"Since October 2025 you need a residence record (住民票): short-term tourists can no longer convert. You must show you lived in the issuing country for at least 3 months after the licence was issued." },
      { title:"2. Document check at the licensing centre", body:"Bring your foreign licence, an official translation (JAF), passport showing your stay, and residence documents. Booking and waits can take weeks to months." },
      { title:"3. Knowledge test (50 questions)", body:"A written test of Japanese traffic law; 45 correct to pass (90%). Available in about 20 languages at many centres." },
      { title:"4. Driving test", body:"Most countries also take a practical test. Licences from some countries skip the tests entirely. Pass, and you get a Japanese licence." }
    ]
  },
  answers:["Correct","Incorrect"],
  quiz:[
    ["In Japan you drive on the left side of the road.",true,"Japan drives on the left."],
    ["You may turn left on a red light if the road is clear.",false,"No turning on red. Only a green arrow allows it."],
    ["At a railway crossing without signals, you must stop before crossing and check both ways.",true,"Every railway crossing needs a full stop."],
    ["The stop sign in Japan is a red inverted triangle that says 止まれ.",true,"Tomare means stop."],
    ["On a road with no centre line and no speed sign, the limit is 60 km/h.",false,"Since 1 September 2026 it is 30 km/h."],
    ["On an ordinary road with a centre line and no speed sign, the limit is 60 km/h.",true,"60 km/h stays the default on roads with a centre line."],
    ["If a pedestrian is about to cross at a crosswalk without lights, you must stop and let them cross.",true,"Pedestrians at crosswalks have priority."],
    ["Holding your phone to check the map is fine at low speed.",false,"Hand-held phone use while driving is banned."],
    ["Passengers in the back seats must wear seat belts.",true,"Seat belts are required in every seat."],
    ["Children under 6 must use a child seat.",true,"Child seats are required under 6."],
    ["A tourist can drive with only their home country licence.",false,"You also need an International Driving Permit or an official translation."],
    ["An International Driving Permit lets a visitor drive for up to one year from entering Japan.",true,"One year from entry, if the permit is still valid."],
    ["Since October 2025, short-term tourists can convert a foreign licence to a Japanese one.",false,"A residence record (住民票) is now required."],
    ["The licence conversion knowledge test has 50 questions and you need 45 correct.",true,"90% is the pass mark."],
    ["After a minor accident with no injuries, you don't need to call the police.",false,"Every accident must be reported to the police."],
    ["Bicycles are vehicles and normally ride on the left side of the road.",true,"Cyclists ride on the left."],
    ["Since April 2026, cyclists aged 16 and over can be fined for using a phone while riding.",true,"Blue tickets: ¥12,000 for phone use."],
    ["Riding a bicycle while holding an umbrella is fine if you ride slowly.",false,"Umbrella riding is a finable offence."],
    ["A driver in their first year must display the beginner mark.",true,"初心者マーク for one year."],
    ["Serving alcohol to someone you know will drive can be punished.",true,"Providers and passengers can be punished too."],
    ["As a pedestrian, you should cross only at crossings and wait for the green man, even on an empty street.",true,"Locals do, and drivers expect it."],
    ["Where there is no pavement, you should walk on the right, facing oncoming traffic.",true,"Walk facing traffic so you can see it."],
    ["It's fine to cross a quiet road mid-block while looking at your phone.",false,"Cross at crossings and keep your eyes up."]
  ],
  test:{ name:"Licence conversion knowledge test (外免切替)", short:"知識確認", official:"50 questions · 45 correct to pass", sample:20, minutes:12, pass:90 }
},
nl: {
  country:"the Netherlands", side:"right", official:[["CBR (driving exams)","https://www.cbr.nl/en"],["RDW (licences and exchange)","https://www.rdw.nl/"]],
  guide:[
    { title:"Before you drive", points:["The Netherlands drives on the right.","EU and EEA licences are valid as they are.","With a non-EU licence you can drive as a visitor. Once you register at the municipality, you can keep using it for 185 days. After that you need a Dutch licence: some licences can be exchanged (also for holders of the 30% tax ruling); otherwise you take the CBR exams.","Alcohol limit: 0.5‰, or 0.2‰ in your first five years of driving."] },
    { title:"Rules that surprise visitors", points:["Bikes are everywhere. When turning right, check the bike lane for cyclists going straight: they have priority.","At a junction with no signs or lines, traffic from the right goes first, including cyclists. Trams have priority over other traffic.","White triangles on the road (haaientanden, 'shark teeth') mean give way.","Speed limits: 50 km/h in built-up areas (30 km/h on most Amsterdam streets), 80 km/h outside, 100 km/h on most motorways between 06:00 and 19:00, higher at night where signed.","No hand-held phone while driving, even when waiting at a red light.","Stop for pedestrians waiting at a zebra crossing."] },
    { title:"Walking (what's expected)", points:["Bike paths are often red asphalt. Don't walk on them: cyclists come fast and won't expect you.","Cross at zebra crossings; drivers must stop for you there. Watch the bike lane as well as the road.","Look both ways for bikes, which can come from either side and quietly.","Trams have priority: never step onto tram tracks without looking.","Don't walk on the red cycle path even if the pavement is busy."] },
    { title:"Cycling", points:["A round blue sign with a white bicycle means a mandatory bike path.","No hand-held phone while riding. Lights are required front and back after dark.","Give clear hand signals before turning.","Ride on the right, overtake on the left, and use a bell to warn."] },
    { title:"Emergencies", points:["Emergency: 112. Police non-emergency: 0900 8844.","After an accident, fill in a European accident statement form with the other driver if there are no injuries; call 112 if anyone is hurt."] }
  ],
  hasWritten:true,
  visit:["EU/EEA and Swiss licences are valid as they are. With another licence you can drive as a visitor; an International Driving Permit helps if your licence isn't in Latin script.","Rent from the airport or a city branch. Most cars are manual, so book automatic if you need it.","Watch for cyclists everywhere and give way to traffic and bikes from the right at unmarked junctions.","Motorway daytime limit is 100 km/h (06:00–19:00); 130 at night where signed. No hand-held phone, even at a red light.","Parking in cities is paid and strict; use an app and mind the bike lanes."],
  journeys:{
    licence:[
      { title:"1. Register and get a BSN", body:"Register your address at the municipality (BRP). You'll need the BSN for lessons, the exam booking and everything else." },
      { title:"2. CBR theory exam", body:"Book via CBR: 50 questions in 30 minutes, 44 correct to pass (since 7 April 2025). It's available in English. The certificate is valid for a set time." },
      { title:"3. Driving lessons and practical exam", body:"Take lessons with a driving school, then sit the CBR practical exam. Pass both and you get a Dutch category-B licence." },
      { title:"4. First five years", body:"As a novice driver you have a stricter alcohol limit (0.2‰) and a points system for serious offences." }
    ],
    convert:[
      { title:"1. Check if you can exchange", body:"After registering (BRP) you can drive on a non-EU licence for 185 days. Ask RDW whether your licence can be exchanged; holders of the 30% tax ruling can also exchange." },
      { title:"2. Apply to RDW", body:"If eligible, apply to exchange your foreign licence for a Dutch one through RDW and your municipality, with a health declaration." },
      { title:"3. If you can't exchange", body:"You take the CBR theory exam (50 questions, 44 to pass) and the practical exam, like a new driver." }
    ]
  },
  answers:null,
  quiz:[
    ["Which side of the road do you drive on in the Netherlands?",["Right","Left"],"Right-hand traffic."],
    ["At a junction with no signs or lines, who goes first?",["Traffic from the right, including cyclists","Traffic from the left","The bigger vehicle","Whoever arrives first"],"Right before left, bikes included."],
    ["What do white 'shark teeth' on the road mean?",["Give way to crossing traffic","Stop line for trams","Speed bump ahead","Parking allowed"],"Haaientanden mean give way."],
    ["Default speed limit inside built-up areas?",["50 km/h","30 km/h","60 km/h","70 km/h"],"50 unless signed (many cities use 30)."],
    ["Default speed limit outside built-up areas, not on a motorway?",["80 km/h","60 km/h","100 km/h","90 km/h"],"80 km/h."],
    ["Limit on most motorways between 06:00 and 19:00?",["100 km/h","120 km/h","130 km/h","80 km/h"],"Daytime limit is 100 on most motorways."],
    ["Alcohol limit for an experienced driver?",["0.5‰","0.2‰","0.8‰","0.0‰"],"0.5 per mille."],
    ["Alcohol limit in your first five years of driving?",["0.2‰","0.5‰","0.8‰","0.0‰"],"Novice drivers: 0.2 per mille."],
    ["You turn right at a junction. What do you check first?",["The bike lane on your right for cyclists going straight","Only the traffic light","The car behind you","Nothing: cyclists must wait"],"Cyclists going straight have priority."],
    ["Can you hold your phone while cycling?",["No, it's banned","Yes, if you ride slowly","Yes, for navigation","Only on bike paths"],"Hand-held phone use is banned on bikes too."],
    ["A tram approaches a junction with no signs. Who has priority?",["The tram","You, if you come from the right","Whoever is faster","Nobody"],"Trams have priority."],
    ["The CBR car theory exam since April 2025 has…",["50 questions, 44 correct to pass","65 questions in three parts","40 questions, 35 correct to pass","50 questions, 40 correct to pass"],"50 questions, 30 minutes, 44 correct."],
    ["You registered at the municipality with a non-EU licence. How long can you drive on it?",["185 days","1 year","30 days","As long as it's valid"],"185 days after registration."],
    ["Emergency number in the Netherlands?",["112","911","110","999"],"112."],
    ["A pedestrian is waiting at a zebra crossing. What do you do?",["Stop and let them cross","Honk and continue","Stop only if a light is red","Speed up to pass first"],"Pedestrians waiting at a zebra have priority."],
    ["Can you hold your phone while stopped at a red light in your car?",["No","Yes","Only for calls","Only for navigation"],"You're still in traffic: no hand-held use."],
    ["A round blue sign with a white bicycle means…",["Mandatory bike path","No bikes allowed","Bike parking","Bikes may use the road"],"Verplicht fietspad."],
    ["As a pedestrian, is it OK to walk on the red cycle path when the pavement is busy?",["No, cyclists come fast and won't expect you","Yes, if you keep to one side","Yes, cycle paths are shared","Only after dark"],"Stay off the fietspad."],
    ["Before stepping onto the road as a pedestrian, what should you check besides cars?",["The bike lane, where bikes come quietly from both sides","Nothing else","Only the traffic light","The tram timetable"],"Bikes are the thing that catches visitors out."]
  ],
  test:{ name:"CBR theory exam (car, B)", short:"Theorie-examen", official:"50 questions · 30 min · 44 correct to pass", sample:20, minutes:12, pass:88 }
}
};
