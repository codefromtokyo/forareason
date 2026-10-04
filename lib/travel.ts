/* Ported from the vanilla app. Content data for the Travel topic. */
/* Practical travel guides. Facts checked September 2026; details change, so each links to official/useful sources. */
export const TRAVEL: Record<string, any> = {
jp: {
  country:"Japan", authority:[["Japan National Tourism Org","https://www.japan.travel/en/"],["Emergencies: 110 police, 119 ambulance/fire",""]],
  intro:"Japan is safe, punctual and cash-friendlier than you'd think. Get an IC card and an eSIM, learn a few phrases, and the rest is easy.",
  hub:"Tokyo Station",
  spots:[
    { name:"Senso-ji Temple", area:"Asakusa", station:"Asakusa Station (Ginza/Asakusa lines)", city:"Tokyo", cat:"history", why:"Tokyo's oldest temple, lively market street" },
    { name:"Shibuya Crossing", area:"Shibuya", station:"Shibuya Station", city:"Tokyo", cat:"landmark", why:"The famous scramble crossing" },
    { name:"Meiji Shrine & Harajuku", area:"Harajuku", station:"Harajuku Station (JR Yamanote)", city:"Tokyo", cat:"nature", why:"Forest shrine beside youth-fashion streets" },
    { name:"teamLab Planets", area:"Toyosu", station:"Shin-Toyosu Station (Yurikamome)", city:"Tokyo", cat:"art", why:"Immersive digital art you walk through" },
    { name:"Tokyo Skytree", area:"Sumida", station:"Tokyo Skytree Station", city:"Tokyo", cat:"view", why:"City views from the tallest tower" },
    { name:"Tsukiji Outer Market", area:"Tsukiji", station:"Tsukiji Station (Hibiya line)", city:"Tokyo", cat:"food", why:"Street food and fresh seafood" },
    { name:"Fushimi Inari Shrine", area:"Kyoto", station:"Inari Station (JR Nara line)", city:"Kyoto", trip:true, cat:"history", why:"Thousands of vermilion torii gates" },
    { name:"Arashiyama Bamboo Grove", area:"Kyoto", station:"Saga-Arashiyama Station", city:"Kyoto", trip:true, cat:"nature", why:"Walk through towering bamboo" },
    { name:"Nara Park (deer & Great Buddha)", area:"Nara", station:"Nara Station", city:"Nara", trip:true, cat:"family", why:"Bowing deer and a giant Buddha" },
    { name:"Dotonbori", area:"Osaka", station:"Namba Station", city:"Osaka", trip:true, cat:"food", why:"Osaka's neon food street" },
    { name:"Hakone (Mt Fuji & onsen)", area:"Hakone", station:"Hakone-Yumoto Station", city:"Hakone", trip:true, cat:"nature", why:"Hot springs and Mt Fuji views" },
    { name:"Kamakura (Great Buddha)", area:"Kamakura", station:"Hase Station", city:"Kamakura", trip:true, cat:"history", why:"Seaside temples and the Great Buddha" }
  ],
  essentials:[
    { title:"Getting around", body:"Get an IC card: add Suica or Pasmo to Apple/Google Wallet in minutes and tap trains, buses, konbini and vending machines. No phone chip? Buy a Welcome Suica or Tourist Pasmo at the airport (28 days, no deposit, no refund on balance). Bullet trains (shinkansen) need a separate ticket; compare a JR Pass only if you're covering long distances." },
    { title:"Money", body:"Cards are widely accepted now, but shrines, small izakaya, older ryokan and some taxis are still cash-only. Carry ¥10,000–20,000. 7-Eleven and Japan Post ATMs take foreign cards 24/7." },
    { title:"Connectivity", body:"Buy an eSIM before you land (from ~¥1,000 for a week) for instant data. Free wifi exists but is patchy; your own data saves you." },
    { title:"Etiquette", body:"No tipping, ever; it can offend. Be quiet on trains, don't eat while walking, queue neatly, carry your rubbish until you find a bin. Take your shoes off where you see a raised floor or slippers." },
    { title:"Safety and health", body:"Very low crime; lost items usually come back. Police boxes (koban) help with directions. Pharmacies (yakkyoku) cover minor needs. Emergency: 110 police, 119 ambulance and fire." }
  ],
  food:["Sushi and sashimi, and conveyor-belt sushi (kaiten-zushi) for a cheap, fun version.","Ramen, udon and soba; tonkatsu; tempura.","Osaka street food: takoyaki (octopus balls), okonomiyaki, kushikatsu in Shinsekai.","Konbini gold: onigiri, egg sandwiches, and hot food at 7-Eleven, Lawson, FamilyMart.","A kaiseki multi-course meal or a ryokan dinner for a splurge."],
  stay:["Tokyo: Shinjuku or Shibuya for convenience and nightlife; Asakusa for old-town atmosphere.","Kyoto: near Kyoto Station or Gion for temples and walkability.","Osaka: Namba/Shinsaibashi, steps from Dotonbori's food.","Budget: capsule hotels and business hotels; culture: a night in a ryokan."],
  dayTrips:["From Tokyo: Nikko, Kamakura, Hakone (Mt Fuji and onsen), Kawaguchiko.","From Kyoto: Nara (deer and the Great Buddha), Osaka, Uji.","Miyajima from Hiroshima; Kinosaki Onsen for hot springs."],
  apps:["Google Maps for trains and walking; Japan Transit Planner (Jorudan) as a backup.","Your IC card in Apple/Google Wallet (Suica/Pasmo).","Google Translate with the camera for menus and signs.","A weather app; typhoons and heat matter in summer."],
  transit:{
    setup:["Easiest: add Suica or Pasmo to Apple Wallet (iPhone 8+) or Google Wallet (Android with the right chip) and top up with a foreign Visa/Mastercard.","No compatible phone? Buy a Welcome Suica or Tourist Pasmo at the airport: 28 days, no deposit, no refund on the leftover balance, so load small (¥2,000–3,000) and top up as you go.","All three brands (Suica/Pasmo/ICOCA) work on each other's networks nationwide."],
    tap:["Trains and metro: tap IN at the gate and tap OUT at your destination; the fare is worked out by distance.","Buses vary: some you tap when you board (flat fare), others you take a ticket and tap when you get off (distance fare). Watch what locals do.","If a gate beeps red, your balance is low: top up at a machine before exiting."],
    passes:["City sightseeing: a Tokyo Subway 24/48/72-hour pass can beat pay-as-you-go on heavy days.","Long distance: a JR Pass only pays off if you're covering big distances (e.g. Tokyo–Kyoto–Hiroshima) in a short window; otherwise single shinkansen tickets are cheaper.","Regional JR passes (Kansai, JR East) are often better value than the nationwide pass."],
    modes:[["Trains & shinkansen","Local and metro fares come off your IC card. Bullet trains need a separate ticket (reserved or non-reserved); your IC card does not cover them."],["Metro","Tokyo has two operators (Tokyo Metro and Toei); a through-fare applies. Just tap in and out."],["Bus","Cheap and useful in Kyoto; pay by IC card. Flat-fare cities tap on entry, distance-fare cities take a ticket."],["Tram","A few cities (Hiroshima, Nagasaki) have trams; tap or pay a flat fare."]],
    hacks:["Use your IC card at konbini, vending machines and lockers, not just transport.","Ride local/rapid trains instead of the shinkansen for short hops to save a lot.","Google Maps shows the exact platform, car and fare; Jorudan is a good backup."]
  },
  whenBudget:[
    ["Best time","Spring (late Mar–Apr, cherry blossom) and autumn (Oct–Nov, colours). Summer is hot and humid; winter is great for snow and fewer crowds."],
    ["Rough daily budget","Budget ~€55–75/day, mid-range ~€90–150/day, before big shinkansen trips. Costs jump for long-distance rail."]
  ],
  top:["Tokyo: Shibuya, Asakusa's Senso-ji, a day trip to Nikko or Kamakura.","Kyoto: temples, Fushimi Inari's torii gates, Arashiyama.","Osaka for food; Hiroshima and Miyajima; Hakone or the Japan Alps for onsen and views."]
},
nl: {
  country:"the Netherlands", authority:[["Holland tourism","https://www.holland.com/global/tourism.htm"],["Emergency: 112",""]],
  intro:"Compact, flat and easy: tap your bank card on any train or tram, watch for bikes, and you can see the whole country by rail in day trips.",
  hub:"Amsterdam Centraal",
  spots:[
    { name:"Rijksmuseum", area:"Museumkwartier", station:"Tram to Rijksmuseum stop", city:"Amsterdam", cat:"art", why:"Vermeer, Rembrandt and the Dutch masters" },
    { name:"Van Gogh Museum", area:"Museumkwartier", station:"Tram to Van Baerlestraat", city:"Amsterdam", cat:"art", why:"The world's largest Van Gogh collection" },
    { name:"Anne Frank House", area:"Jordaan", station:"Tram to Westermarkt", city:"Amsterdam", cat:"history", why:"The wartime hiding place (book ahead)" },
    { name:"Vondelpark", area:"Oud-West", station:"Tram to Vondelpark", city:"Amsterdam", cat:"nature", why:"Amsterdam's green heart to slow down" },
    { name:"Albert Cuyp Market", area:"De Pijp", station:"Tram to Albert Cuypstraat", city:"Amsterdam", cat:"food", why:"Street food and stalls in De Pijp" },
    { name:"A'DAM Tower & Eye Film", area:"Noord", station:"Free ferry from Centraal", city:"Amsterdam", cat:"view", why:"Rooftop views and film across the IJ" },
    { name:"Zaanse Schans windmills", area:"Zaandam", station:"Zaandijk Zaanse Schans Station (train)", city:"Zaandam", trip:true, cat:"landmark", why:"Working windmills and wooden houses" },
    { name:"Keukenhof gardens (spring)", area:"Lisse", station:"Bus 858 from Schiphol", city:"Lisse", trip:true, cat:"nature", why:"Tulip gardens, spring only" },
    { name:"Haarlem old town", area:"Haarlem", station:"Haarlem Station (15 min train)", city:"Haarlem", trip:true, cat:"history", why:"Pretty old town, quick escape" },
    { name:"Utrecht & Dom Tower", area:"Utrecht", station:"Utrecht Centraal", city:"Utrecht", trip:true, cat:"history", why:"Canals and the Dom Tower" },
    { name:"Rotterdam & Delft", area:"Rotterdam", station:"Rotterdam Centraal", city:"Rotterdam", trip:true, cat:"landmark", why:"Bold architecture and Delft charm" }
  ],
  essentials:[
    { title:"Getting around", body:"Just tap a contactless bank card, phone or watch to check in and out on trains, trams, buses and metro (OVpay). Always tap out or you pay a flat fare. Trains need about €20 available; bus/tram/metro about €4. Amex isn't accepted. The NS app plans train trips; 9292 covers all transit." },
    { title:"Bikes", body:"Bikes rule. Don't walk or stand on the red bike paths; look both ways for cyclists before you step off a kerb. Rent a bike to feel like a local, and use hand signals." },
    { title:"Money", body:"Card and contactless everywhere; some places are card-only. Carry a little cash for markets. Tipping is not expected; rounding up or ~5–10% for great service is plenty." },
    { title:"Connectivity", body:"An EU SIM or eSIM works nationwide; if you have an EU plan, roaming is free. Wifi is common in cafés and stations." },
    { title:"Safety and health", body:"Very safe; watch for bike-lane mishaps and pickpockets in tourist crowds. Pharmacies (apotheek) and the GP (huisarts) cover health. Emergency: 112." }
  ],
  food:["Herring (haring) with onions from a street stall; kibbeling (fried fish).","Bitterballen with mustard, best with a beer.","Stroopwafels warm off the griddle; Dutch apple pie (try Winkel 43).","Dutch fries (patat) with mayo or joppiesaus; poffertjes (mini pancakes).","Indonesian rijsttafel and Surinamese roti reflect the Dutch mix."],
  stay:["Amsterdam: Jordaan (charming, central), De Pijp (foodie, buzzy), Oud-West (calmer).","Cheaper and creative: Amsterdam Noord (free ferry across the IJ).","Skip Amsterdam entirely and base in Rotterdam, Utrecht or Haarlem, all a short train away."],
  dayTrips:["Zaanse Schans windmills (17 min from Amsterdam Centraal).","Haarlem, Utrecht, Delft, The Hague and Rotterdam by frequent trains.","Keukenhof tulip gardens (spring only), Kinderdijk windmills."],
  apps:["NS app for trains; 9292 for all public transport; Google Maps.","OVpay to check journeys; no separate transit card needed.","A bike-rental app if you want to ride like a local."],
  transit:{
    setup:["Just use a contactless bank card, phone or smartwatch: no separate card needed (this is OVpay).","Make sure your card allows contactless and has funds: trains need about €20 available, bus/tram/metro about €4.","American Express is not accepted. The old OV-chipkaart is being retired by end of 2027."],
    tap:["ALWAYS tap in when you start and tap OUT when you finish, on trains, trams, buses and metro. Forget to tap out and you're charged a high flat fare.","Use the SAME card/device for check-in and check-out so the fare is calculated correctly.","Trains: tap at the gates or the free-standing posts on the platform. Trams/buses: tap the reader by the door."],
    passes:["Short visit: OVpay pay-as-you-go is simplest and needs no pass.","Contactless only gives second class and full price. First class or discounts (off-peak, weekend) need an OV-chipkaart or an NS subscription.","Groups and families travelling together can be cheaper with an NS day ticket or group ticket."],
    modes:[["Trains (NS)","Fast and frequent between cities. Tap in and out; check the NS app for platforms and delays."],["Tram","Common in Amsterdam, Rotterdam and The Hague. Tap in on boarding and tap out when you leave."],["Bus","Covers where trams and trains don't; same tap in/out."],["Metro","Amsterdam and Rotterdam have metros; tap at the gates or posts."]],
    hacks:["Forgot to tap out? Request a refund on the OVpay website.","Off-peak and weekend day tickets can be much cheaper if you have an OV-chipkaart.","For lots of intercity travel, an NS Dal Voordeel subscription gives 40% off outside rush hour."]
  },
  whenBudget:[
    ["Best time","Apr–May for tulips (Keukenhof), and Jun–Sep for long, mild days. Winter is grey but cosy and cheaper."],
    ["Rough daily budget","Budget ~€70–100/day, mid-range ~€130–200/day. Amsterdam is pricier; Rotterdam, Utrecht and The Hague are gentler."]
  ],
  top:["Amsterdam: canals, Rijksmuseum, Van Gogh Museum, Jordaan.","Day trips by train: Haarlem, Utrecht, The Hague, Rotterdam, Delft.","Kinderdijk windmills, and the tulip fields in spring."]
},
fr: {
  country:"France", authority:[["France tourism (Atout France)","https://www.france.fr/en"],["Emergency: 112 (or 15 medical, 17 police, 18 fire)",""]],
  intro:"World-class food, art and rail. Say bonjour, tap into the metro, and let the TGV whisk you between cities in a couple of hours.",
  hub:"Paris Gare de Lyon",
  spots:[
    { name:"Louvre Museum", area:"1st arr.", station:"Palais Royal-Musee du Louvre (M1/M7)", city:"Paris", cat:"art", why:"The world's largest art museum" },
    { name:"Eiffel Tower", area:"7th arr.", station:"Bir-Hakeim (M6) / Trocadero (M9)", city:"Paris", cat:"landmark", why:"Paris's iron icon" },
    { name:"Notre-Dame & Ile de la Cite", area:"4th arr.", station:"Cite (M4)", city:"Paris", cat:"history", why:"Gothic cathedral on the Seine island" },
    { name:"Sacre-Coeur & Montmartre", area:"18th arr.", station:"Anvers (M2) / Abbesses (M12)", city:"Paris", cat:"view", why:"Hilltop basilica and artist quarter" },
    { name:"Musee d'Orsay", area:"7th arr.", station:"Solferino (M12) / RER C Musee d'Orsay", city:"Paris", cat:"art", why:"Impressionist masterpieces in a station" },
    { name:"Le Marais", area:"3rd/4th arr.", station:"Saint-Paul (M1)", city:"Paris", cat:"food", why:"Historic lanes, falafel and boutiques" },
    { name:"Versailles", area:"Versailles", station:"Versailles Chateau Rive Gauche (RER C)", city:"Versailles", trip:true, cat:"history", why:"The palace and gardens of the kings" },
    { name:"Giverny (Monet's garden)", area:"Giverny", station:"Vernon-Giverny Station (train + shuttle)", city:"Vernon", trip:true, cat:"nature", why:"Monet's garden and water lilies" },
    { name:"Reims & Champagne", area:"Reims", station:"Reims Station (TGV ~45 min)", city:"Reims", trip:true, cat:"food", why:"Cathedral city and Champagne houses" },
    { name:"Mont Saint-Michel", area:"Normandy", station:"via Rennes (TGV) + bus", city:"Mont Saint-Michel", trip:true, cat:"landmark", why:"The island abbey rising from the bay" }
  ],
  essentials:[
    { title:"Getting around", body:"In Paris, tap a contactless bank card or phone on the metro/RER/bus, or load a Navigo Easy/Liberté+ pass. Between cities, book TGV trains early on SNCF Connect for the best fares. Validate paper tickets before boarding regional trains." },
    { title:"Money", body:"Cards and contactless everywhere; carry some cash for small bakeries and markets. Service is included by law (service compris); leaving a euro or two, or rounding up, is a nice gesture, not required." },
    { title:"Etiquette", body:"Always open with 'Bonjour' before asking anything; skipping it reads as rude. A little French earns a lot of goodwill. Dress a touch smarter in cities." },
    { title:"Connectivity", body:"An EU SIM or eSIM covers you; EU plans roam free. Cafés and stations have wifi." },
    { title:"Safety and health", body:"Generally safe; watch for pickpockets around Paris stations and tourist sites. Pharmacies (green cross) help with minor issues. Emergency: 112, or 15 medical, 17 police, 18 fire." }
  ],
  food:["A fresh baguette, croissants and pain au chocolat from a boulangerie.","Cheese and charcuterie; steak-frites; a proper café crème.","Regional stars: crêpes and galettes, cassoulet, ratatouille, bouillabaisse in Marseille.","Macarons and pâtisserie; a market picnic with bread, cheese and fruit.","Wine by region: Bordeaux, Burgundy, the Rhône, Champagne."],
  stay:["Paris: Le Marais (3rd/4th) for charm, Saint-Germain (6th) for classic, the 11th for nightlife and value.","Near a metro line matters more than the exact arrondissement.","Elsewhere: base in Lyon, Bordeaux or Nice and day-trip out."],
  dayTrips:["From Paris: Versailles, Giverny (Monet's garden), Champagne (Reims).","The Loire châteaux; Mont Saint-Michel; Normandy's D-Day beaches.","From Nice: Monaco, Èze, Antibes along the Riviera."],
  apps:["SNCF Connect to book TGV trains early; Bonjour RATP for Paris metro.","Your contactless card or phone for the metro; Citymapper in big cities.","Google Translate for menus; TheFork for restaurant bookings."],
  transit:{
    setup:["Paris went fully digital: paper tickets end in 2026. Load tickets onto a €2 Navigo Easy card (from any machine) or onto your phone via the Bonjour RATP or Île-de-France Mobilités app (Apple Wallet now; Google Wallet expected late 2026).","One card or phone per person: you cannot tap two people through on one.","You canNOT tap a bank card directly at metro gates (unlike London); open payment is only live at a couple of spots and rolls out slowly to 2030."],
    tap:["Metro/RER/train: tap your Navigo Easy or phone at the purple reader on the gate to enter.","Buses and trams have no gates: you must still tap the on-board reader every time. Inspectors fine around €100 for not validating.","Phone tickets work even with a dead battery for up to ~6 hours after the last charge."],
    passes:["Metro–Train–RER tickets and Bus–Tram tickets are SEPARATE; you can't transfer between them on one ticket. Follow 'Correspondance' signs to change lines without exiting.","Single ticket ~€2.55 (metro/RER) or ~€2.05 (bus/tram). A Navigo Jour day pass (~€12.30) pays off from about 5 rides a day.","Staying a week? A Navigo Semaine (Mon–Sun) on a Navigo Découverte card (needs a photo) is great value. Airport trips need a special ~€14 flat-fare ticket."],
    modes:[["Metro","Fast and dense in Paris. Pick the right direction by the line's final station (terminus)."],["RER / trains","RER reaches the suburbs and airports; regional TER trains need their paper ticket validated (yellow machine) before boarding."],["Bus & tram","Tap every time you board, even without gates. Great for seeing the city above ground."],["TGV (intercity)","High-speed between cities. Book early on SNCF Connect for cheap fares; seats are reserved, no validation needed."]],
    hacks:["A day pass beats singles once you're doing ~5 trips; a week pass beats days from ~3 days.","Book TGV weeks ahead for the lowest fares; last-minute is expensive.","Line 14 links Orly airport to the centre; the RER B links CDG. Both beat taxis in traffic."]
  },
  whenBudget:[
    ["Best time","Late spring (May–Jun) and early autumn (Sep–Oct): warm, lively, fewer crowds than July–August. Paris is quiet but many places close in August."],
    ["Rough daily budget","Budget ~€70–100/day, mid-range ~€130–220/day. Paris and the Riviera cost more; the countryside is cheaper."]
  ],
  top:["Paris: Louvre, Eiffel Tower, Montmartre, a day at Versailles.","The south: Nice, Provence's lavender and markets, the Riviera.","Bordeaux and wine country; Mont Saint-Michel; the châteaux of the Loire."]
}
};

/* Pre-written self-guides per place (AI-assisted, checked for the well-known basics). Keyed by spot name. */
export const GUIDES: Record<string, any> = {
"Senso-ji Temple":{about:"Tokyo's oldest temple, founded in 645, at the heart of old Asakusa. Its approach, Nakamise street, has sold snacks and souvenirs for centuries.",seeDo:["Walk Nakamise street up to the Kaminarimon lantern","Waft incense smoke over yourself for luck","Draw an omikuji paper fortune"],bestTime:"Early morning or evening, when it's lit and quiet",tip:"It's free; the five-story pagoda and main hall are the highlights."},
"Shibuya Crossing":{about:"The world's busiest pedestrian scramble, where hundreds cross at once beneath giant screens. It's the beating heart of youthful Tokyo.",seeDo:["Cross with the crowd, then watch it from above","Meet at the loyal Hachiko dog statue","Explore Shibuya's lanes for food and shops"],bestTime:"After dark, for the neon",tip:"Shibuya Sky gives the best overhead view of the scramble."},
"Meiji Shrine & Harajuku":{about:"A serene forest shrine to Emperor Meiji, right beside the fashion streets of Harajuku. City calm and youthful buzz, side by side.",seeDo:["Walk the wooded path under the great torii","See the wall of sake-barrel offerings","Wander Takeshita street for crepes and fashion"],bestTime:"Morning for the shrine, afternoon for Harajuku",tip:"Bow as you pass through the torii; the shrine is free."},
"teamLab Planets":{about:"An immersive digital-art museum you walk through barefoot, wading through water and infinite light.",seeDo:["Wade through the mirrored water room","Stand inside the endless light installations","Visit the floating moss garden"],bestTime:"Book a timed slot ahead; weekdays are quieter",tip:"Wear shorts or roll up your trousers, you'll get wet to the knee."},
"Tokyo Skytree":{about:"At 634m, the tallest tower in Japan, with observation decks that take in the whole sprawl of the city.",seeDo:["Ride to the Tembo Deck for the view","On a clear day, spot Mt Fuji","Eat and shop in the base mall"],bestTime:"Sunset, for day-to-night views",tip:"Buy tickets online to skip the queue."},
"Tsukiji Outer Market":{about:"The lively market streets that stayed after the wholesale fish market moved, now a paradise of street food.",seeDo:["Try tamagoyaki, grilled seafood and sushi","Browse knives, tea and kitchenware","Have a fresh sushi breakfast"],bestTime:"Before 10am, when it's freshest",tip:"Come hungry and carry cash."},
"Fushimi Inari Shrine":{about:"A mountain shrine famous for thousands of vermilion torii gates winding up the hillside, dedicated to the god of rice.",seeDo:["Walk the tunnel of torii gates","Climb toward the summit for city views","Spot the fox (kitsune) statues"],bestTime:"Early morning or dusk, to beat the crowds",tip:"The full loop is 2-3 hours; turn back at the Yotsutsuji viewpoint if short on time."},
"Arashiyama Bamboo Grove":{about:"A path through soaring bamboo on Kyoto's western edge, beside old temples and the Katsura river.",seeDo:["Walk the bamboo grove at first light","Visit Tenryu-ji temple and its garden","Cross the Togetsukyo bridge"],bestTime:"Dawn, before the tour groups arrive",tip:"Combine it with the monkey park across the river."},
"Nara Park (deer & Great Buddha)":{about:"A large park where wild sika deer roam freely, home to the Great Buddha at Todai-ji temple.",seeDo:["Feed and bow to the deer","See the giant bronze Buddha at Todai-ji","Walk to Kasuga Taisha's lantern paths"],bestTime:"Morning; an easy day trip from Kyoto or Osaka",tip:"Buy deer crackers, the deer will bow for them."},
"Dotonbori":{about:"Osaka's neon-lit canal district, the beating heart of the city's famous street-food scene.",seeDo:["Eat takoyaki and okonomiyaki","Photograph the Glico running-man sign","Ride a canal boat after dark"],bestTime:"Evening, when the neon lights up",tip:"Osaka is Japan's kitchen, graze rather than sit down."},
"Hakone (Mt Fuji & onsen)":{about:"A mountain hot-spring town near Mt Fuji, with lakes, ropeways and open-air art.",seeDo:["Soak in an onsen","Ride the ropeway over the volcanic valley","See Fuji across Lake Ashi"],bestTime:"Autumn for colour, clear winter days for Fuji",tip:"The Hakone Free Pass covers the loop of trains, cable cars and boats."},
"Kamakura (Great Buddha)":{about:"A seaside town of temples and a giant bronze Buddha, an easy hour from Tokyo.",seeDo:["See the Great Buddha at Kotoku-in","Visit Hase-dera temple and its sea views","Walk down to the beach"],bestTime:"Late spring for hydrangeas; avoid weekends",tip:"The old Enoden tram is a scenic ride between the sights."},
"Rijksmuseum":{about:"The national museum of the Netherlands, home to Rembrandt's Night Watch and Vermeer's quiet masterpieces.",seeDo:["Stand before the Night Watch","See Vermeer's Milkmaid","Wander the Golden Age galleries"],bestTime:"Right at opening, or late afternoon",tip:"Book a timed ticket online."},
"Van Gogh Museum":{about:"The world's largest collection of Van Gogh's paintings and letters, tracing his short, brilliant life.",seeDo:["Follow the galleries in order","See the Sunflowers and self-portraits","Read his letters"],bestTime:"First or last slot of the day",tip:"Timed tickets only, so book ahead."},
"Anne Frank House":{about:"The canal house where Anne Frank and her family hid during the war, now a moving, understated museum.",seeDo:["Climb behind the bookcase into the secret annex","Read Anne's own words on the walls","See the original diary"],bestTime:"Book weeks ahead; evening slots are calmer",tip:"Tickets are online only and sell out fast."},
"Vondelpark":{about:"Amsterdam's beloved green park, made for a slow afternoon of cycling and people-watching.",seeDo:["Rent a bike and loop the paths","Picnic on the grass","Catch a free summer concert"],bestTime:"Sunny afternoons, spring to autumn",tip:"A good breather between the nearby museums."},
"Albert Cuyp Market":{about:"The country's largest street market, in the lively De Pijp neighbourhood.",seeDo:["Eat a warm stroopwafel","Try herring or kibbeling","Browse cheese, flowers and clothes"],bestTime:"Mornings, Monday to Saturday",tip:"Bring cash for the stalls."},
"A'DAM Tower & Eye Film":{about:"A rooftop lookout and film museum across the IJ river, reached by a free ferry behind Centraal.",seeDo:["Take the free ferry across","Swing on Europe's highest rooftop swing","Visit the Eye Film Museum"],bestTime:"Sunset, for the skyline",tip:"The ferry behind Centraal is free and runs constantly."},
"Zaanse Schans windmills":{about:"An open-air village of working windmills and green wooden houses on the Zaan, 17 minutes from Amsterdam.",seeDo:["Step inside a turning windmill","Watch clogs and cheese being made","Walk the riverside"],bestTime:"Weekday mornings, to beat the crowds",tip:"An easy half-day trip by train."},
"Keukenhof gardens (spring)":{about:"One of the world's largest flower gardens, a spring-only riot of tulips near Lisse.",seeDo:["Walk the tulip displays","Cycle through the bulb fields","See the indoor flower shows"],bestTime:"Mid-March to mid-May only",tip:"Combined bus-and-entry tickets from Schiphol save time."},
"Haarlem old town":{about:"A pretty, walkable old town 15 minutes by train from Amsterdam, built around a grand market square.",seeDo:["See the Grote Markt and St Bavo church","Visit the Frans Hals Museum","Find the hidden hofjes courtyards"],bestTime:"Any day; the Saturday market is lively",tip:"A calmer place to stay than Amsterdam."},
"Utrecht & Dom Tower":{about:"A canal city with wharf-side cafes and the Dom Tower, the tallest church tower in the country.",seeDo:["Climb the Dom Tower","Stroll the two-level canals","Visit the Miffy museum with kids"],bestTime:"Warm afternoons for the canal terraces",tip:"Central and quick from most Dutch cities."},
"Rotterdam & Delft":{about:"Bold modern architecture in Rotterdam and postcard-perfect old Delft, a few minutes apart by train.",seeDo:["See the Cube Houses and Markthal","Tour Delft's canals and Vermeer sights","Ride up the Euromast"],bestTime:"Clear days, for the architecture",tip:"Do both in one day, they're minutes apart."},
"Louvre Museum":{about:"The world's largest art museum, set in a former royal palace, home to the Mona Lisa and Venus de Milo.",seeDo:["Head straight to the Mona Lisa at opening","Walk the Egyptian and Greek galleries","Admire the glass pyramid"],bestTime:"Opening time, or Wednesday and Friday evenings",tip:"Book timed tickets; enter via the Carrousel to skip the pyramid queue."},
"Eiffel Tower":{about:"Paris's 330m iron icon, built for the 1889 World's Fair, with viewing levels and a nightly sparkle.",seeDo:["Go up to the summit","Watch the hourly evening sparkle","Picnic on the Champ de Mars"],bestTime:"Sunset, then the light show on the hour after dark",tip:"Book lift tickets ahead, or take the stairs for a shorter queue."},
"Notre-Dame & Ile de la Cite":{about:"The Gothic cathedral on the Seine's island, reopened after the 2019 fire, at the historic heart of Paris.",seeDo:["See the restored facade and interior","Wander the island's old streets","Visit nearby Sainte-Chapelle's windows"],bestTime:"Morning, before the crowds",tip:"Sainte-Chapelle's stained glass is a stunning add-on."},
"Sacre-Coeur & Montmartre":{about:"A white hilltop basilica above Paris, ringed by the old artists' quarter of Montmartre.",seeDo:["Climb to the basilica for the view","Watch painters at Place du Tertre","Find the vineyard and the Amelie cafe"],bestTime:"Early morning or sunset",tip:"Take the funicular up, and mind pickpockets on the steps."},
"Musee d'Orsay":{about:"Impressionist masterpieces by Monet, Renoir and Van Gogh, in a grand former railway station.",seeDo:["See the Impressionist galleries upstairs","Photograph the giant station clock","Compare Monet and Van Gogh"],bestTime:"Late afternoon, or Thursday evening",tip:"Smaller and calmer than the Louvre."},
"Le Marais":{about:"A historic district of medieval lanes, falafel counters, museums and boutiques, lively day and night.",seeDo:["Eat falafel on Rue des Rosiers","Sit in the Place des Vosges","Browse the boutiques and galleries"],bestTime:"Afternoons; Sunday, when much of Paris is shut",tip:"Perfect for a rainy day of wandering."},
"Versailles":{about:"The vast palace and gardens of France's kings, a short train ride from Paris.",seeDo:["Walk the Hall of Mirrors","Explore the gardens and fountains","See the Trianon and the hamlet"],bestTime:"Weekday mornings; fountain shows on some days",tip:"Take RER C to Versailles Chateau and book a timed palace slot."},
"Giverny (Monet's garden)":{about:"Monet's house and water-lily garden, the living source of his most famous paintings.",seeDo:["Cross the Japanese bridge over the lily pond","See Monet's pink house and studio","Wander the flower garden"],bestTime:"April to October, when it blooms (closed in winter)",tip:"Train to Vernon, then a shuttle or rental bike to Giverny."},
"Reims & Champagne":{about:"A cathedral city where French kings were crowned, and the gateway to the Champagne houses.",seeDo:["Tour a Champagne cellar and taste","See the coronation cathedral","Walk the old centre"],bestTime:"Spring to autumn; book tastings ahead",tip:"Under an hour from Paris by TGV."},
"Mont Saint-Michel":{about:"A medieval abbey rising from a tidal island off the Normandy coast, one of France's most striking sights.",seeDo:["Climb to the abbey at the top","Time your visit with the tides","Walk the ramparts"],bestTime:"Check the tide times; sunrise and sunset are magical",tip:"It's a long trip from Paris, so consider staying nearby overnight."}
};

/* Extra guide detail per place: how long to spend + what to eat nearby. Merged with GUIDES. */
export const GUIDE_EXTRA: Record<string, any> = {
"Senso-ji Temple":{howLong:"1-2 hours",eat:"Melonpan and ningyo-yaki cakes on Nakamise; kaminari-okoshi rice crackers"},
"Shibuya Crossing":{howLong:"1-2 hours",eat:"Ramen and izakaya in the backstreets; conveyor-belt sushi nearby"},
"Meiji Shrine & Harajuku":{howLong:"Half a day",eat:"Crepes on Takeshita street; calmer cafes in Omotesando"},
"teamLab Planets":{howLong:"About 2 hours",eat:"Fresh sushi at Toyosu market, a short ride away"},
"Tokyo Skytree":{howLong:"1-2 hours",eat:"Food floors in the Solamachi mall at the base"},
"Tsukiji Outer Market":{howLong:"1-2 hours, mornings",eat:"Tamagoyaki, grilled scallops and fresh sushi from the stalls"},
"Fushimi Inari Shrine":{howLong:"2-3 hours",eat:"Kitsune udon and inari sushi by the entrance"},
"Arashiyama Bamboo Grove":{howLong:"Half a day",eat:"Yudofu (hot tofu) and matcha sweets"},
"Nara Park (deer & Great Buddha)":{howLong:"Half-day trip",eat:"Kakinoha-zushi and fresh mochi near the park"},
"Dotonbori":{howLong:"An evening",eat:"Takoyaki, okonomiyaki and kushikatsu, the local trio"},
"Hakone (Mt Fuji & onsen)":{howLong:"A full day or overnight",eat:"Black eggs at Owakudani; local soba"},
"Kamakura (Great Buddha)":{howLong:"A day trip",eat:"Shirasu (whitebait) rice bowls and matcha"},
"Rijksmuseum":{howLong:"2-3 hours",eat:"The museum cafe, or head to De Pijp nearby"},
"Van Gogh Museum":{howLong:"About 2 hours",eat:"Cafes around Museum Square"},
"Anne Frank House":{howLong:"1-1.5 hours",eat:"Jordaan cafes; apple pie at Winkel 43"},
"Vondelpark":{howLong:"1-2 hours",eat:"The Blauwe Theehuis pavilion in the park"},
"Albert Cuyp Market":{howLong:"About an hour",eat:"Stroopwafels, herring and kibbeling from the stalls"},
"A'DAM Tower & Eye Film":{howLong:"About 2 hours",eat:"The rooftop restaurant, or the Eye museum cafe"},
"Zaanse Schans windmills":{howLong:"Half a day",eat:"Cheese tasting and Dutch pancakes on site"},
"Keukenhof gardens (spring)":{howLong:"Half a day",eat:"Garden pavilions, or bring a picnic"},
"Haarlem old town":{howLong:"Half a day",eat:"Cafes on the Grote Markt; local Jopen beer"},
"Utrecht & Dom Tower":{howLong:"Half a day",eat:"Wharf-side terraces along the Oudegracht"},
"Rotterdam & Delft":{howLong:"A full day",eat:"Food stalls in Rotterdam's Markthal"},
"Louvre Museum":{howLong:"3-4 hours",eat:"Cafe Marly overlooking the pyramid; Tuileries kiosks"},
"Eiffel Tower":{howLong:"About 2 hours",eat:"Rue Cler market street nearby for a picnic"},
"Notre-Dame & Ile de la Cite":{howLong:"1-2 hours",eat:"Berthillon ice cream on Ile Saint-Louis"},
"Sacre-Coeur & Montmartre":{howLong:"2-3 hours",eat:"Bistros around Abbesses metro"},
"Musee d'Orsay":{howLong:"About 2 hours",eat:"The museum's famous clock-window cafe"},
"Le Marais":{howLong:"Half a day",eat:"Falafel on Rue des Rosiers (L'As du Fallafel)"},
"Versailles":{howLong:"A full day",eat:"Picnic in the gardens, or bistros in the town"},
"Giverny (Monet's garden)":{howLong:"Half-day trip",eat:"Cafes in Giverny village"},
"Reims & Champagne":{howLong:"A day trip",eat:"Champagne tastings; the pink biscuit rose de Reims"},
"Mont Saint-Michel":{howLong:"A long day or overnight",eat:"Fluffy Mere Poulard omelettes; salt-marsh lamb"}
};
