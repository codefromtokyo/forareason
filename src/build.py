import json, os, re, subprocess, html
SITE = os.environ.get("SITE", "https://forareason.vercel.app")
OUT = os.environ.get("OUT", "..")
os.makedirs(OUT + "/icons", exist_ok=True); os.makedirs(OUT + "/api", exist_ok=True)
css = open("style.css").read()
js_data = open("i18n_ui.js").read() + open("data_nl.js").read() + open("data_fr.js").read() + open("data_ja.js").read() + open("roads.js").read() + open("visa.js").read() + open("nomad.js").read() + open("nomad_global.js").read() + open("travel.js").read() + open("visacheck.js").read() + open("cost.js").read() + open("packs.js").read() + open("docs.js").read() + open("tracks.js").read() + open("i18n.js").read() + "\nconst CITIES = " + open("cities.json").read() + ";\n"
app = open("app.js").read()
DESC = "Break the language gap, together. For a Reason is a free, non-profit, open-source community that learns the language, road rules and tests a new country asks of them, for a real reason, and helps each other land. Dutch, French and Japanese from zero to NT2 B2, DELF B2 and JLPT N1, plus 1-hour trip courses, road-rule guides for drivers and walkers, and visa-to-citizenship overviews for Japan, the Netherlands and France."
TITLE = "For a Reason · A community that breaks the language gap for people moving, working and travelling abroad"
ld = [{"@context":"https://schema.org","@type":"WebApplication","name":"For a Reason","url":SITE+"/","applicationCategory":"EducationalApplication","operatingSystem":"Any","inLanguage":"en","description":DESC,"offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"isAccessibleForFree":True},
      {"@context":"https://schema.org","@type":"Course","name":"Dutch for the Staatsexamen NT2 (A1 to B2)","description":"Step-by-step Dutch course from zero to B2 with mock tests in the Staatsexamen NT2 format.","url":SITE+"/learn-dutch/","provider":{"@type":"Organization","name":"For a Reason","sameAs":"https://github.com/codefromtokyo/forareason"},"inLanguage":"nl","isAccessibleForFree":True,"hasCourseInstance":{"@type":"CourseInstance","courseMode":"online","courseWorkload":"PT20M"}},
      {"@context":"https://schema.org","@type":"Course","name":"French for the DELF (A1 to B2)","description":"Step-by-step French course from zero to B2 with mock tests in the DELF format.","url":SITE+"/learn-french/","provider":{"@type":"Organization","name":"For a Reason","sameAs":"https://github.com/codefromtokyo/forareason"},"inLanguage":"fr","isAccessibleForFree":True,"hasCourseInstance":{"@type":"CourseInstance","courseMode":"online","courseWorkload":"PT20M"}},
      {"@context":"https://schema.org","@type":"Course","name":"Japanese for the JLPT (N5 to N1)","description":"Step-by-step Japanese course from kana to N1 with mock tests in the JLPT format.","url":SITE+"/learn-japanese/","provider":{"@type":"Organization","name":"For a Reason","sameAs":"https://github.com/codefromtokyo/forareason"},"inLanguage":"ja","isAccessibleForFree":True,"hasCourseInstance":{"@type":"CourseInstance","courseMode":"online","courseWorkload":"PT20M"}}]
UI_LOCALES = ["en","hi","fr","ja","nl"]
def strip_lang(path):
    for l in UI_LOCALES:
        if path == f"/{l}" or path.startswith(f"/{l}/"): return path[len(l)+1:] or "/"
    return path
def hreflangs(path):
    base = strip_lang(path)
    out = []
    for l in UI_LOCALES:
        href = SITE + ("" if l == "en" else f"/{l}") + (base if base != "/" else "/")
        out.append(f'<link rel="alternate" hreflang="{l}" href="{href}">')
    out.append(f'<link rel="alternate" hreflang="x-default" href="{SITE}{base}">')
    return "".join(out)
def head(title, desc, path, extra_ld=None, pwa=True):
    lds = "".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>\n' for x in (extra_ld or ld))
    pw = """<link rel="manifest" href="/manifest.webmanifest">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="icon" type="image/svg+xml" href="/logo.svg"><link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="For a Reason">
""" if pwa else ""
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(desc)}">
<link rel="canonical" href="{SITE}{path}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#1D4BA8">
<meta property="og:type" content="website"><meta property="og:site_name" content="For a Reason">
<meta property="og:title" content="{html.escape(title)}"><meta property="og:description" content="{html.escape(desc)}">
<meta property="og:url" content="{SITE}{path}"><meta property="og:image" content="{SITE}/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{html.escape(title)}"><meta name="twitter:description" content="{html.escape(desc)}"><meta name="twitter:image" content="{SITE}/og.png">
{hreflangs(path)}
{pw}<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Literata:opsz,wght@7..72,400;7..72,600;7..72,700&display=swap" rel="stylesheet">
{lds}<style>{css}</style>
</head>
"""
# static crawlable content for the app shell (replaced by JS on load)
def outline(pack_levels):
    return "".join(f"<li><strong>{L}</strong>: {html.escape(', '.join(g))}</li>" for L, g in pack_levels)
import tempfile
def runjs(code):
    f = tempfile.NamedTemporaryFile("w", suffix=".js", delete=False); f.write(code); f.close()
    return subprocess.run(["node", f.name], capture_output=True, text=True)
node = runjs(js_data + """
const o={}; for (const k of ["nl","fr","ja"]) { const p=PACKS[k]; o[k]={name:p.name,test:p.test,levels:p.levels.map(L=>[L,p.data[L].cert,p.data[L].grammar.map(g=>g.title),p.data[L].exam.minutes,p.sections.map(s=>s.en+" ("+s.nl+")")])}}; console.log(JSON.stringify(o));""")
print(node.stderr[:500]) if node.returncode else None
INFO = json.loads(node.stdout)
static_main = f"""<section class="panel hero"><h1>Break the language gap, together</h1>
<p class="lede">A non-profit, open-source community learning the language, travel, road rules, visas and remote-work a new country asks of them, for a real reason.</p>
<p class="trust">Non-profit · Open source · Built by the community · Everyone welcome, safe-first</p>
<div class="why"><div><b>All in one place</b><span>Travel, language, road rules, visas and remote-work, per country. Others do one slice; we get you arrive-ready.</span></div><div><b>For a real reason</b><span>A trip, a move, a job, an exam. Pick your reason and follow a path built for it.</span></div><div><b>A community, not a feed</b><span>Real people who have landed help you land: houses, books, meetups. Everyone welcome.</span></div></div>
<p><a href="/travel-japan/">Travel Japan</a> · <a href="/travel-netherlands/">Travel Netherlands</a> · <a href="/travel-france/">Travel France</a></p>
<h2><a href="/learn-dutch/">Dutch: Staatsexamen NT2, A1 to B2</a></h2><ul>{outline([(l[0], l[2]) for l in INFO['nl']['levels']])}</ul>
<h2><a href="/learn-french/">French: DELF, A1 to B2</a></h2><ul>{outline([(l[0], l[2]) for l in INFO['fr']['levels']])}</ul>
<h2><a href="/learn-japanese/">Japanese: JLPT, N5 to N1</a></h2><ul>{outline([(l[0], l[2]) for l in INFO['ja']['levels']])}</ul>
<p><a href="/driving-in-japan/">Driving in Japan: road rules and licence path</a> · <a href="/driving-in-the-netherlands/">Driving in the Netherlands: road rules and CBR theory</a> · <a href="/visa-japan/">Visa to residency in Japan</a> · <a href="/visa-netherlands/">Visa to Dutch citizenship</a> · <a href="/visa-france/">Visa to French citizenship</a> · <a href="/remote-work-japan/">Remote work in Japan</a> · <a href="/remote-work-netherlands/">Remote work in the Netherlands</a> · <a href="/remote-work-france/">Remote work in France</a> · <a href="/community/">Community & house shares</a></p>
<noscript><p>For a Reason needs JavaScript to run the exercises.</p></noscript></section>"""
body = lambda build: f"""<body>
<header class="top" id="top"></header>
<main id="main">{static_main if build == "pwa" else ""}</main>
<footer class="foot" id="foot"><p>The syllabus, exercises and mock tests are AI-generated and can contain mistakes. <a href="https://github.com/codefromtokyo/forareason/issues">Report issues on GitHub</a>.</p></footer>
<div id="toast" role="status" hidden></div>
<div id="install" hidden></div>
<script src="/config.js"></script>
<script>
const BUILD = "{build}";
{open("auth.js").read()}
{js_data}
{app}
</script>
</body>
</html>
"""
from about_content import ABOUT
UI_NAV = {"en":["Syllabus","Mock test","About"],"hi":["पाठ्यक्रम","मॉक टेस्ट","हमारे बारे में"],"fr":["Programme","Test blanc","À propos"],"ja":["カリキュラム","模擬試験","私たちについて"],"nl":["Lesstof","Proefexamen","Over ons"]}
HERO = {
 "en":("Break the language gap, together","A non-profit community learning the language, rules and tests a new country asks of them, for a real reason, and helping each other land."),
 "hi":("भाषा की दूरी मिटाएँ, साथ मिलकर","एक ग़ैर-लाभकारी समुदाय: नए देश की भाषा, नियम और परीक्षाएँ, एक असली वजह से, और एक-दूसरे की मदद।"),
 "fr":("Comblez le fossé linguistique, ensemble","Une communauté à but non lucratif qui apprend la langue, les règles et les examens d'un nouveau pays, pour une vraie raison, et s'entraide."),
 "ja":("言葉の壁を、みんなで越える","新しい国の言語・ルール・試験を、本当の理由があって学び、助け合う非営利コミュニティ。"),
 "nl":("Overbrug de taalkloof, samen","Een non-profitgemeenschap die de taal, regels en examens van een nieuw land leert, voor een echte reden, en elkaar helpt landen."),
}
HOME_DESC = {
 "en":"Break the language gap, together. A free, non-profit, open-source community learning the language, road rules and tests a new country asks of them, and helping each other land. Dutch, French and Japanese to NT2, DELF and JLPT.",
 "hi":"भाषा की दूरी मिटाएँ। एक मुफ़्त, ग़ैर-लाभकारी, ओपन-सोर्स समुदाय जो नए देश की भाषा, नियम और परीक्षाएँ सीखता है और एक-दूसरे की मदद करता है।",
 "fr":"Comblez le fossé linguistique, ensemble. Une communauté gratuite, à but non lucratif et open source qui apprend la langue, les règles et les examens d'un nouveau pays et s'entraide.",
 "ja":"言葉の壁を、みんなで越える。新しい国の言語・ルール・試験を学び、助け合う、無料・非営利・オープンソースのコミュニティ。",
 "nl":"Overbrug de taalkloof, samen. Een gratis, non-profit, open-source gemeenschap die de taal, regels en examens van een nieuw land leert en elkaar helpt.",
}
def home_page(lang):
    hero_h, hero_p = HERO[lang]; prefix = "" if lang == "en" else f"/{lang}"
    static = f"""<section class="panel hero"><h1>{html.escape(hero_h)}</h1><p class="lede">{html.escape(hero_p)}</p>
    <p class="trust">Non-profit · Open source · Built by the community · Self-declared, honest profiles</p>
    <div class="why"><div><b>All in one place</b><span>Language, travel, road rules, visas and remote-work, per country. Others do one slice; we get you arrive-ready.</span></div><div><b>For a real reason</b><span>A trip, a move, a job, an exam. Pick your reason and follow a path built for it.</span></div><div><b>A community, not a feed</b><span>Real people who've landed help you land: houses, books, meetups. Everyone welcome, safe-first.</span></div></div>
    <p><a href="/travel-japan/">Travel Japan</a> · <a href="/travel-netherlands/">Travel Netherlands</a> · <a href="/travel-france/">Travel France</a> · <a href="/learn-japanese/">Japanese (JLPT)</a> · <a href="/learn-dutch/">Dutch (NT2)</a> · <a href="/learn-french/">French (DELF)</a> · <a href="/remote-work-japan/">Remote work</a> · <a href="/visa-japan/">Visas</a> · <a href="/community/">Community</a> · <a href="{prefix}/about/">{html.escape(ABOUT[lang]['h1'])}</a></p>
    <noscript><p>For a Reason needs JavaScript to run the exercises.</p></noscript></section>"""
    title = f"For a Reason · {hero_h}"
    return head(title, HOME_DESC[lang], prefix + "/") + body_static(static, lang)
def body_static(inner, lang):
    return f"""<body>
<header class="top" id="top"></header>
<main id="main">{inner}</main>
<footer class="foot" id="foot"></footer>
<div id="toast" role="status" hidden></div><div id="install" hidden></div>
<script src="/config.js"></script>
<script>
const BUILD = "pwa";
{open("auth.js").read()}
{js_data}
{app}
</script>
</body>
</html>"""
open(OUT + "/index.html", "w").write(head(TITLE, DESC, "/") + body("pwa"))
for lang in UI_LOCALES:
    if lang == "en": continue
    os.makedirs(f"{OUT}/{lang}", exist_ok=True)
    open(f"{OUT}/{lang}/index.html", "w").write(home_page(lang))
art = head(TITLE, DESC, "/", pwa=False) + body("artifact")
art = re.sub(r'<link rel="canonical"[^>]*>\n', "", art)
os.environ.get("ARTIFACT") and open(os.environ["ARTIFACT"], "w").write(art)

# landing pages
def landing(key, slug, title, desc, intro, faqs):
    p = INFO[key]
    lv = "".join(f"""<section class="panel"><h2>{L}</h2><p>{html.escape(cert)}</p><p><strong>Grammar in this level:</strong> {html.escape('; '.join(g))}</p>
<p><strong>Mock test parts:</strong> {html.escape(', '.join(f"{s} ({mins.get(k,'')} min)" for s, k in zip(secs, list(mins.keys()))))}</p>
<p><a class="btn" href="/?course=en-{key}&level={L}">Start {L}</a></p></section>""" for L, cert, g, mins, secs in p['levels'])
    faq_html = "".join(f"<h3>{html.escape(q)}</h3><p>{html.escape(a)}</p>" for q, a in faqs)
    faq_ld = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q, a in faqs]}
    crumbs = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"For a Reason","item":SITE+"/"},{"@type":"ListItem","position":2,"name":title,"item":f"{SITE}/{slug}/"}]}
    course = [x for x in ld if x.get("url") == f"{SITE}/{slug}/"]
    page = head(title, desc, f"/{slug}/", extra_ld=course + [faq_ld, crumbs]) + f"""<body>
<header class="top"><div class="bar1"><a class="brand" href="/"><svg class="logo" width="28" height="28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="For a Reason">  <path d="M32 4C17.6 4 6 14.9 6 28.4c0 9.6 5.9 17.9 14.5 21.9L32 61l11.5-10.7C52.1 46.3 58 38 58 28.4 58 14.9 46.4 4 32 4z" fill="#1D4BA8"/>  <path d="M20 29.5l8 8 15-15" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>  <circle cx="51.5" cy="10.5" r="6" fill="#E4577A" stroke="#fff" stroke-width="2.5"/></svg><span>For a Reason</span></a></div></header>
<main><nav class="meta"><a href="/">For a Reason</a> › {html.escape(title.split(' · ')[0])}</nav>
<h1>{html.escape(title.split(' · ')[0])}</h1><p class="lede">{html.escape(intro)}</p>
<p><a class="btn big" href="/?course=en-{key}">Start free, no sign-up</a></p>
<h2>How the syllabus works</h2><ol><li>Learn the sounds{' and kana' if key=='ja' else ''} first.</li><li>Each level: core words with spaced repetition, two grammar topics, sentence building, listening and speaking.</li><li>Finish the level with a timed mock test in the {html.escape(p['test'])} format. Score 70% or more in every part to move up.</li></ol>
{lv}
<section><h2>Questions</h2>{faq_html}</section></main>
<footer class="foot"><p>The syllabus and mock tests are AI-generated and can contain mistakes. <a href="https://github.com/codefromtokyo/forareason/issues">Report issues on GitHub</a>. Not affiliated with {html.escape(p['test'])}.</p></footer>
</body></html>"""
    os.makedirs(f"{OUT}/{slug}", exist_ok=True); open(f"{OUT}/{slug}/index.html", "w").write(page)
landing("nl", "learn-dutch", "Learn Dutch for the Staatsexamen NT2 · A1 to B2 free course and mock tests",
  "Free step-by-step Dutch course from zero to B2 for the Staatsexamen NT2 Programma I and II. Audio, speaking practice, grammar drills and timed mock tests for Lezen, Luisteren, Schrijven and Spreken.",
  "Go from zero to B2 Dutch with a daily 20-minute path, then practise the four parts of the Staatsexamen NT2: Lezen, Luisteren, Schrijven and Spreken.",
  [("Is For a Reason free?","Yes. The course and mock tests are free and work in the browser or as an installed app."),
   ("Which Dutch exams does it prepare for?","The Staatsexamen NT2 Programma I (B1) and Programma II (B2), with A1 and A2 as building steps."),
   ("How long does it take to reach B1 or B2?","Most learners need several hundred hours in total. With about an hour a day, B1 usually takes around a year and B2 longer."),
   ("Can I practise speaking?","Yes. Every word and sentence can be played and repeated out loud, and speaking answers are scored.")])
landing("fr", "learn-french", "Learn French for the DELF · A1 to B2 free course and mock tests",
  "Free step-by-step French course from zero to B2 for the DELF. Audio, speaking practice, grammar drills and timed mock tests for reading, listening, writing and speaking, plus 1-hour courses for trips, daily life, students and tech workers.",
  "Go from zero to B2 French with a daily 20-minute path, then practise the four DELF parts: compréhension de l'oral, compréhension des écrits, production écrite and production orale.",
  [("Is it free?","Yes. The course and mock tests are free, open source and work in the browser or as an installed app."),
   ("Which French exams does it prepare for?","The DELF A1, A2, B1 and B2. Each is scored out of 100: you need 50 overall and at least 5 of 25 in each part."),
   ("Can I learn French just for a trip?","Yes. The Trip-ready course is four 15-minute units: basics, getting around, food and help."),
   ("Can I practise speaking?","Yes. Every word and sentence can be played and repeated out loud, and speaking answers are scored.")])
landing("ja", "learn-japanese", "Learn Japanese for the JLPT · N5 to N1 free course and mock tests",
  "Free step-by-step Japanese course from hiragana to JLPT N1. Kana, vocabulary with spaced repetition, grammar drills, listening and timed mock tests in the JLPT format.",
  "Start with hiragana and katakana, then climb from N5 to N1 with a daily 20-minute path and mock tests for vocabulary, grammar and reading, and listening.",
  [("Is For a Reason free?","Yes. The course and mock tests are free and work in the browser or as an installed app."),
   ("Which JLPT levels are covered?","All five: N5, N4, N3, N2 and N1."),
   ("What is the JLPT pass mark?","It depends on the level: 80 of 180 for N5 up to 100 of 180 for N1, plus a minimum in each section. For a Reason asks for 70% in every mock part to be safe."),
   ("Can I learn kana here?","Yes. The first step is a hiragana and katakana chart with audio and a quiz.")])

# community page (static, SEO)
def community_page():
    faqs=[("Is there a community?","Yes, run on WhatsApp for now. Fellow learners and travellers help each other arrive, find house shares and get around a new country."),
          ("Can I find a house share or flatmate?","People post rooms and short stays and match up on WhatsApp. For a Reason doesn't handle listings or money; you talk, plan and decide together."),
          ("How do you handle scammers?","Send screenshots to the admins. We block the person from the community so they can't reach anyone else here. Never pay for a room you haven't seen."),
          ("Who is welcome?","Everyone: women, men and non-binary people, LGBTQ+, every background, faith and first language. It is safe-first, with zero tolerance for harassment or discrimination."),("What can I share?","Houses and rooms, books and study resources, small meetups, language partners, and local know-how."),("Is it safe for women and LGBTQ+ people?","Yes: optional women-only and LGBTQ+-friendly rooms, zero tolerance for harassment, and admins who act on reports.")]
    faq_ld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in faqs]}
    faq_html="".join(f"<h3>{html.escape(q)}</h3><p>{html.escape(a)}</p>" for q,a in faqs)
    title="Community · For a Reason — fellow learners, house shares, women-tuned and safe"
    desc="An inclusive community of fellow learners and travellers, everyone welcome, helping each other land in a new country: house shares, books, small meetups and local tips, safe-first for women and LGBTQ+ people. Run on WhatsApp."
    page=head(title,desc,"/community/",extra_ld=[faq_ld])+"".join(["<body>",
      '<header class="top"><div class="bar1"><a class="brand" href="/">',open("logo.svg").read().replace('<svg ','<svg class="logo" width="28" height="28" ').replace(chr(10),""),'<span>For a Reason</span></a></div></header>',
      '<main>',
      '<section class="hero community-hero"><p class="eyebrow">For a Reason \u00b7 Community</p><h1>Learn together, land together</h1><p class="lede">',html.escape(desc),'</p><div class="row"><a class="btn big" href="/?course=en-nl#community">Open the community</a></div></section>',
      '<section class="panel feature"><div class="ficon">🌈</div><div><h2>Everyone is welcome</h2><p>A space for people finding their way into a new country: women, men and non-binary folks; LGBTQ+; every background, faith and first language. Safe-first and harassment-free. Come as you are, and help where you can.</p></div></section>',
      '<section class="panel"><h2>🤝 What we share</h2><ul><li>🏠 Houses and rooms — find a flatmate or a short stay.</li><li>📚 Books and resources — pass on the textbooks, apps and notes that worked.</li><li>☕ Small meetups — a language café, a walk, a study night.</li><li>🗣️ Language partners — swap an hour of your language for theirs.</li><li>🧭 Local know-how — the stuff guides never tell you.</li></ul></section>',
      '<section class="panel feature"><div class="ficon">🏠</div><div><h2>House shares</h2><p>Moving somewhere new is easier with a roof and a roommate. People post rooms, flat shares and short stays and match up on WhatsApp. We do not handle listings or money; you talk, you plan, you decide together.</p></div></section>',
      '<section class="panel safe"><div class="ficon">🛟</div><div><h2>Stay safe</h2><ol class="safelist"><li>Video-call or meet in a public place before you commit.</li><li>See the place and a real contract before you pay a deposit. Never wire money for a room you haven\'t seen.</li><li>Be careful with sublets: check the landlord actually allows it.</li><li>Keep it in the group chat and split costs in writing.</li></ol></div></section>',
      '<section class="panel report"><h2>Report a scammer</h2><p>If someone tries to scam you or acts shady, send the admins your screenshots. We block them from the community so they can\'t reach anyone else here. Reports are private.</p></section>',
      '<section class="panel feature"><div class="ficon">💛</div><div><h2>Safe-first, for real</h2><p>Built with women and LGBTQ+ people moving or travelling solo in mind: optional women-only and LGBTQ+-friendly rooms, zero tolerance for harassment or discrimination, and admins who act on reports. Everyone is welcome; safety comes first.</p></div></section>',
      '<section><h2>Questions</h2>',faq_html,'</section></main>',
      '<footer class="foot"><p>Non-profit and open source. Community runs on WhatsApp for now.</p></footer>',
      '</body></html>'])
    os.makedirs(OUT+"/community",exist_ok=True); open(OUT+"/community/index.html","w").write(page)
community_page()

# road landing pages
ROADS = json.loads(runjs(js_data + "console.log(JSON.stringify(ROAD))").stdout)
def road_landing(code, slug, course, title, desc, faqs):
    r = ROADS[code]
    guide = "".join(f"<section class=\"panel\"><h2>{html.escape(g['title'])}</h2><ul class=\"notes\">" + "".join(f"<li>{html.escape(x)}</li>" for x in g['points']) + "</ul></section>" for g in r['guide'])
    licj = r.get('journeys', {}).get('licence', [])
    conv = r.get('journeys', {}).get('convert', [])
    visit = r.get('visit', [])
    path = "<h3>Driving as a visitor</h3><ul>" + "".join(f"<li>{html.escape(x)}</li>" for x in visit) + "</ul><h3>Getting a licence</h3><ol>" + "".join(f"<li><strong>{html.escape(x['title'])}.</strong> {html.escape(x['body'])}</li>" for x in licj) + "</ol><h3>Converting a foreign licence</h3><ol>" + "".join(f"<li><strong>{html.escape(x['title'])}.</strong> {html.escape(x['body'])}</li>" for x in conv) + "</ol>"
    faq_ld = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q, a in faqs]}
    crumbs = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"For a Reason","item":SITE+"/"},{"@type":"ListItem","position":2,"name":title.split(" · ")[0],"item":f"{SITE}/{slug}/"}]}
    howto = {"@context":"https://schema.org","@type":"HowTo","name":f"How to get a driving licence in {r['country']} as a foreigner","step":[{"@type":"HowToStep","name":x['title'],"text":x['body']} for x in r.get('journeys', {}).get('licence', [])]}
    faq_html = "".join(f"<h3>{html.escape(q)}</h3><p>{html.escape(a)}</p>" for q, a in faqs)
    off = " · ".join(f'<a href="{u}">{html.escape(l)}</a>' for l, u in r['official'])
    page = head(title, desc, f"/{slug}/", extra_ld=[howto, faq_ld, crumbs]) + f"""<body>
<header class="top"><div class="bar1"><a class="brand" href="/">LOGO_SVG<span>For a Reason</span></a></div></header>
<main><nav class="meta"><a href="/">For a Reason</a> › {html.escape(title.split(' · ')[0])}</nav>
<h1>{html.escape(title.split(' · ')[0])}</h1><p class="lede">{html.escape(desc)}</p>
<p><a class="btn big" href="/?course={course}">Start the road path, free</a></p>
{guide}
<section class="panel"><h2>Driving here: visit, get a licence, or convert one</h2>{path}<p>Mock theory test: {html.escape(r['test']['name'])}, official format {html.escape(r['test']['official'])}.</p></section>
<section><h2>Questions</h2>{faq_html}</section>
<p class="meta">A guide, not legal advice. Check the official sources: {off}</p></main>
<footer class="foot"><p>Non-profit and open source. AI-assisted content can contain mistakes: <a href="https://github.com/codefromtokyo/forareason/issues">report them on GitHub</a>.</p></footer>
</body></html>""".replace("LOGO_SVG", open("logo.svg").read().replace('<svg ','<svg class="logo" width="28" height="28" ').replace(chr(10),""))
    os.makedirs(f"{OUT}/{slug}", exist_ok=True); open(f"{OUT}/{slug}/index.html", "w").write(page)
road_landing("jp", "driving-in-japan", "road-jp", "Driving in Japan as a foreigner · Road rules, IDP and licence conversion (外免切替)",
  "Japanese road rules for travellers and residents, the International Driving Permit, converting a foreign licence (50-question knowledge test, 45 to pass) and a free mock theory test.",
  [("Can tourists drive in Japan?","Yes, with an International Driving Permit (1949 Geneva Convention) or an official Japanese translation for some countries, plus the home licence, for up to one year from entry."),
   ("Can tourists convert a foreign licence in Japan?","Not since October 2025. Conversion (外免切替) now requires a residence record (住民票)."),
   ("What is the licence conversion knowledge test?","50 two-choice questions on Japanese traffic law; 45 correct (90%) to pass. Most countries also need a driving test."),
   ("What is the speed limit on small residential roads?","Since 1 September 2026, 30 km/h on roads without a centre line unless signs say otherwise.")])
road_landing("nl", "driving-in-the-netherlands", "road-nl", "Driving in the Netherlands as an expat · Road rules, licence exchange and CBR theory",
  "Dutch road rules for travellers, cyclists and residents, the 185-day rule for non-EU licences, licence exchange, and a free mock of the CBR car theory exam (50 questions, 44 to pass).",
  [("How long can I drive on a non-EU licence in the Netherlands?","185 days after registering at the municipality. Then exchange it if eligible, or pass the CBR exams."),
   ("What does the CBR car theory exam look like?","Since 7 April 2025: 50 questions in 30 minutes, 44 correct to pass. It is available in English."),
   ("Who has priority at a Dutch junction without signs?","Traffic from the right, including cyclists. Trams have priority over other traffic."),
   ("What is the alcohol limit?","0.5 per mille, or 0.2 per mille in your first five years of driving.")])

# visa landing pages
VISAS = json.loads(runjs(js_data + "console.log(JSON.stringify(VISA))").stdout)
def visa_landing(code, slug, course, title, desc, faqs):
    v = VISAS[code]
    types = "".join(f"<section class=\"panel\"><h2>{html.escape(x['title'])}</h2><p>{html.escape(x['body'])}</p></section>" for x in v['types'])
    journey = "".join(f"<li><strong>{html.escape(x['title'])}.</strong> {html.escape(x['body'])}</li>" for x in v['journey'])
    faq_ld = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in faqs]}
    crumbs = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"For a Reason","item":SITE+"/"},{"@type":"ListItem","position":2,"name":title.split(" · ")[0],"item":f"{SITE}/{slug}/"}]}
    faq_html = "".join(f"<h3>{html.escape(q)}</h3><p>{html.escape(a)}</p>" for q,a in faqs)
    off = " · ".join(f'<a href="{u}">{html.escape(l)}</a>' for l,u in v['authority'])
    page = head(title, desc, f"/{slug}/", extra_ld=[faq_ld, crumbs]) + f"""<body>
<header class="top"><div class="bar1"><a class="brand" href="/">LOGO_SVG<span>For a Reason</span></a></div></header>
<main><nav class="meta"><a href="/">For a Reason</a> › {html.escape(title.split(' · ')[0])}</nav>
<h1>{html.escape(title.split(' · ')[0])}</h1><p class="lede">{html.escape(desc)}</p>
<p><a class="btn big" href="/?course={course}">Open the visa path, free</a></p>
<p style="color:#8a4b00"><strong>This is a plain-English overview, not legal or immigration advice.</strong> Rules change often and depend on your situation. Always check the official sources.</p>
<h2>Visa types</h2>{types}
<section class="panel"><h2>From arrival to citizenship</h2><ol>{journey}</ol></section>
<section><h2>Questions</h2>{faq_html}</section>
<p class="meta">Official sources: {off}</p></main>
<footer class="foot"><p>Non-profit and open source. Not affiliated with any government or immigration authority.</p></footer>
</body></html>""".replace("LOGO_SVG", open("logo.svg").read().replace('<svg ','<svg class="logo" width="28" height="28" ').replace(chr(10),""))
    os.makedirs(f"{OUT}/{slug}", exist_ok=True); open(f"{OUT}/{slug}/index.html","w").write(page)
visa_landing("jp","visa-japan","visa-jp","Visa to residency in Japan · Work, PR and naturalisation explained",
  "A plain-English overview of Japan's visa journey: work and student statuses, the residence card, permanent residence (about 10 years) and naturalisation (5-year statute, ~10-year screening from 2026). Not legal advice.",
  [("How long until permanent residence in Japan?","Generally about 10 years in Japan, at least 5 on a work status; shorter for spouses of Japanese nationals or Highly Skilled Professionals."),
   ("How long until Japanese citizenship?","The statute says 5 continuous years, but from April 2026 screening generally expects around 10 years and real Japanese ability. Japan requires renouncing your other nationality."),
   ("Does Japan use a points visa for workers?","Most workers hold a purpose-based Status of Residence. The points system is a separate Highly Skilled Professional track.")])
visa_landing("nl","visa-netherlands","visa-nl","Visa to Dutch citizenship · Permits, permanent residence and naturalisation",
  "A plain-English overview of the Netherlands' path: highly skilled migrant and other permits, the BSN and BRP, civic integration (A2), permanent residence after 5 years and naturalisation (5 years, or 3 with a Dutch partner). Not legal advice.",
  [("How long until permanent residence in the Netherlands?","Usually 5 uninterrupted years on a valid permit, with steady income and the civic integration diploma."),
   ("How long until Dutch citizenship?","Naturalisation after 5 years of lawful residence, or 3 if you live with a Dutch partner. A proposal to raise it to 10 years is not law as of 2026."),
   ("Do EU citizens need a permit?","No. EU/EEA and Swiss citizens can live and work freely; others need a residence permit.")])
visa_landing("fr","visa-france","visa-fr","Visa to French citizenship · Long-stay visa, resident card and naturalisation",
  "A plain-English overview of France's path: the long-stay visa (VLS-TS), the titre de séjour, multi-year and 10-year resident cards, and naturalisation (generally 5 years, B1 French). Not legal advice.",
  [("How long until the 10-year resident card in France?","Usually about 5 years of stable residence, with a French-language level and steady income."),
   ("How long until French citizenship?","Naturalisation generally after 5 years of residence (2 if you graduated from a French university), with French at B1 or above."),
   ("Is there a French language requirement for permits?","From 2026, some multi-year cards require B1-level French.")])

# human-readable HTML sitemap
def sitemap_page():
    groups = [
      ("Start", [("Home", "/"), ("About", "/about/"), ("Community & house shares", "/community/")]),
      ("Travel", [("Travel Japan", "/travel-japan/"), ("Travel Netherlands", "/travel-netherlands/"), ("Travel France", "/travel-france/")]),
      ("Languages", [("Dutch (Staatsexamen NT2)", "/learn-dutch/"), ("French (DELF)", "/learn-french/"), ("Japanese (JLPT)", "/learn-japanese/")]),
      ("Driving & walking", [("Driving in Japan", "/driving-in-japan/"), ("Driving in the Netherlands", "/driving-in-the-netherlands/")]),
      ("Visa & residency", [("Visa to Japan", "/visa-japan/"), ("Visa to the Netherlands", "/visa-netherlands/"), ("Visa to France", "/visa-france/")]),
      ("Remote & nomad", [("Remote work in Japan", "/remote-work-japan/"), ("Remote work in the Netherlands", "/remote-work-netherlands/"), ("Remote work in France", "/remote-work-france/")]),
      ("Languages of the site", [("English", "/"), ("हिन्दी", "/hi/"), ("Français", "/fr/"), ("日本語", "/ja/"), ("Nederlands", "/nl/")]),
    ]
    body = "".join("<section><h2>" + g[0] + "</h2><ul>" + "".join('<li><a href="' + u + '">' + html.escape(n) + "</a></li>" for n, u in g[1]) + "</ul></section>" for g in groups)
    script = ('<section><h2>Community members</h2><p class="meta">Public profiles from people learning for a reason. Loaded live.</p>'
      '<ul id="pplist"><li class="meta">Loading...</li></ul></section>'
      '<script src="/config.js"></script>'
      '<script type="module">'
      'const cfg=window.FR_CONFIG||{};if(cfg.SUPABASE_URL){'
      'const m=await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");'
      'const sb=m.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);'
      'const {data}=await sb.from("public_profiles").select("id,display_name,updated_at").order("updated_at",{ascending:false}).limit(500);'
      'const ul=document.getElementById("pplist");'
      'if(!data||!data.length){ul.innerHTML="<li class=\'meta\'>No public profiles yet. Be the first.</li>";}'
      'else{ul.innerHTML=data.map(p=>`<li><a href="/?u=${p.id}">${(p.display_name||"A member").replace(/[<>&]/g,"")}</a></li>`).join("");}'
      '}else{document.getElementById("pplist").innerHTML="<li class=\'meta\'>Profiles appear here once sign-in is configured.</li>";}'
      '</script>')
    title = "Sitemap · For a Reason — all pages and public members"
    desc = "Every page on For a Reason: language courses, driving and walking guides, visa journeys, the community, and public member profiles."
    page = head(title, desc, "/sitemap/", extra_ld=None) + "".join(["<body>",
      '<header class="top"><div class="bar1"><a class="brand" href="/">', open("logo.svg").read().replace('<svg ','<svg class="logo" width="28" height="28" ').replace(chr(10),""), '<span>For a Reason</span></a></div></header>',
      '<main><nav class="meta"><a href="/">For a Reason</a> \u203a Sitemap</nav><h1>Sitemap</h1>',
      '<div class="sitemap">', body, script, '</div></main>',
      '<footer class="foot"><p>Machine sitemap: <a href="/sitemap.xml">/sitemap.xml</a>. Non-profit and open source.</p></footer>',
      '</body></html>'])
    open(OUT + "/sitemap/index.html".replace("/index.html", "") + "/index.html", "w") if False else None
    os.makedirs(OUT + "/sitemap", exist_ok=True); open(OUT + "/sitemap/index.html", "w").write(page)
sitemap_page()

# nomad landing pages
NOMADS = json.loads(runjs(js_data + "console.log(JSON.stringify(NOMAD))").stdout)
NWORLD = json.loads(runjs(js_data + "console.log(JSON.stringify(NOMAD_WORLD))").stdout)
def nomad_landing(code, slug, course, title, desc, faqs):
    n = NOMADS[code]
    types = "".join(f"<section class=\"panel\"><h2>{html.escape(x['title'])}</h2><p>{html.escape(x['body'])}</p></section>" for x in n['types'])
    setup = "".join(f"<li><strong>{html.escape(x['title'])}.</strong> {html.escape(x['body'])}</li>" for x in n['setup'])
    cities = "".join(f"<li><strong>{html.escape(c[0])}</strong> — {html.escape(c[1])} <em>({html.escape(c[2])} rough monthly, varies)</em></li>" for c in n.get('cities', []))
    jobs = "".join(f'<li><a href="{j[1]}">{html.escape(j[0])}</a> — {html.escape(j[2])}</li>' for j in n.get('jobs', []))
    faq_ld = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in faqs]}
    faq_html = "".join(f"<h3>{html.escape(q)}</h3><p>{html.escape(a)}</p>" for q,a in faqs)
    off = " · ".join(f'<a href="{u}">{html.escape(l)}</a>' for l,u in n['authority'])
    page = head(title, desc, f"/{slug}/", extra_ld=[faq_ld]) + "".join(["<body>",
      '<header class="top"><div class="bar1"><a class="brand" href="/">', open("logo.svg").read().replace('<svg ','<svg class="logo" width="28" height="28" ').replace(chr(10),""), '<span>For a Reason</span></a></div></header>',
      '<main><nav class="meta"><a href="/">For a Reason</a> \u203a ', html.escape(title.split(" \u00b7 ")[0]), '</nav><h1>', html.escape(title.split(" \u00b7 ")[0]), '</h1><p class="lede">', html.escape(desc), '</p>',
      '<p><a class="btn big" href="/?course=', course, '">Open the remote-work path</a></p>',
      '<p style="color:#8a4b00"><strong>A plain-English overview, not legal or tax advice.</strong> Digital-nomad rules change fast. Always check the official sources.</p>',
      '<h2>Options for remote workers</h2>', types,
      '<section class="panel"><h2>Setting up</h2><ol>', setup, '</ol></section>',
      '<h2>Best bases for remote workers</h2><ul>', cities, '</ul>',
      '<h2>Where nomads find remote jobs</h2><p>We are not a job board; these are where remote work actually gets found, and the community shares leads.</p><ul>', jobs, '</ul>',
      '<p><a class="btn" href="/community/">Join the nomad crew</a></p>',
      '<h2>Digital-nomad visas worldwide (', NWORLD["updated"], ')</h2>',
      '<p>50+ countries offer a remote-work visa. Rough figures below; thresholds change yearly, so confirm on the official page.</p>',
      '<div style="overflow-x:auto"><table border="0" cellpadding="6" style="border-collapse:collapse;min-width:520px"><thead><tr><th align="left">Country</th><th align="left">Visa</th><th align="left">Income / savings</th><th align="left">Stay</th></tr></thead><tbody>',
      "".join('<tr><td>'+html.escape(r[0])+'</td><td>'+html.escape(r[1])+'</td><td>'+html.escape(r[2])+'</td><td>'+html.escape(r[3])+'</td></tr>' for r in NWORLD["visas"]),
      '</tbody></table></div>',
      '<h2>By passport</h2>',
      "".join('<h3>'+html.escape(v["label"])+'</h3><ul>'+"".join('<li>'+html.escape(n)+'</li>' for n in v["notes"])+'</ul>' for v in NWORLD["passports"].values()),
      '<p class="meta">Sources: ', " · ".join('<a href="'+u+'">'+html.escape(l)+'</a>' for l,u in NWORLD["sources"]), '</p>',
      '<section><h2>Questions</h2>', faq_html, '</section>',
      '<p class="meta">Official sources: ', off, '</p></main>',
      '<footer class="foot"><p>Non-profit and open source. Not affiliated with any government or immigration authority.</p></footer>',
      '</body></html>'])
    os.makedirs(f"{OUT}/{slug}", exist_ok=True); open(f"{OUT}/{slug}/index.html","w").write(page)
nomad_landing("jp","remote-work-japan","nomad-jp","Remote work & digital nomad in Japan \u00b7 The 6-month visa and how to set up",
  "Japan's digital-nomad visa (6 months, ¥10M income, ~50 eligible countries), the tourist alternative, plus connectivity, coworking, money and tax basics. Not legal or tax advice.",
  [("Does Japan have a digital-nomad visa?","Yes, since 2024: up to 6 months for remote workers earning about ¥10 million a year from non-Japanese employers or clients, from ~50 eligible countries. It's not renewable and gives no residence card."),
   ("Can I work for Japanese companies on it?","No. Only for employers or clients outside Japan."),
   ("Is foreign income taxed?","Generally not for stays under 183 days in a year; you still owe tax at home.")])
nomad_landing("nl","remote-work-netherlands","nomad-nl","Remote work & digital nomad in the Netherlands \u00b7 DAFT and the alternatives",
  "The Netherlands has no simple nomad visa. Americans use DAFT (€4,500, 2 years, renewable); others use the self-employed permit or a sponsored job. Plus BSN, banking and coworking. Not legal advice.",
  [("Does the Netherlands have a digital-nomad visa?","No general one. Americans use the DAFT treaty; non-Americans use the harder self-employed permit or a sponsored highly-skilled job."),
   ("What does DAFT require?","US citizenship, a registered Dutch business (KVK) and about €4,500 kept in a business account. Two years, renewable, and it counts towards permanent residence after 5 years."),
   ("Where do nomads live?","Amsterdam housing is very tight; Rotterdam, Utrecht and The Hague are realistic bases.")])
nomad_landing("fr","remote-work-france","nomad-fr","Remote work & digital nomad in France \u00b7 Visitor, freelance and Talent routes",
  "France has no dedicated nomad visa. The visitor permit (since June 2026 usable while keeping a foreign job), the profession libérale route for freelancers, and the Talent passport. Plus setup and tax basics. Not legal advice.",
  [("Does France have a digital-nomad visa?","No. Remote workers use the long-stay visitor visa, the entrepreneur/profession libérale route, or the Talent passport."),
   ("Can I keep my foreign job on the visitor permit?","Since June 2026, yes under conditions, but you cannot work for French clients."),
   ("Do EU citizens need a visa?","No. EU/EEA and Swiss citizens live and work freely.")])

# travel landing pages
TRAVELS = json.loads(runjs(js_data + "console.log(JSON.stringify(TRAVEL))").stdout)
def travel_landing(code, slug, course, title, desc):
    tv = TRAVELS[code]
    ess = "".join(f"<section class=\"panel\"><h2>{html.escape(x['title'])}</h2><p>{html.escape(x['body'])}</p></section>" for x in tv['essentials'])
    wb = "".join(f"<p><strong>{html.escape(w[0])}:</strong> {html.escape(w[1])}</p>" for w in tv['whenBudget'])
    top = "".join(f"<li>{html.escape(x)}</li>" for x in tv['top'])
    faqs=[("When is the best time to visit "+tv['country'].replace('the ','')+"?", tv['whenBudget'][0][1]),
          ("How much does a day cost?", tv['whenBudget'][1][1]),
          ("How do I get around?", tv['essentials'][0]['body'][:180]),
          ("Do I need a pass or single tickets?", tv['transit']['passes'][0]),
          ("Where do I tap in and out?", tv['transit']['tap'][0])]
    faq_ld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in faqs]}
    faq_html="".join(f"<h3>{html.escape(q)}</h3><p>{html.escape(a)}</p>" for q,a in faqs)
    page = head(title, desc, f"/{slug}/", extra_ld=[faq_ld]) + "".join(["<body>",
      '<header class="top"><div class="bar1"><a class="brand" href="/">', open("logo.svg").read().replace('<svg ','<svg class="logo" width="28" height="28" ').replace(chr(10),""), '<span>For a Reason</span></a></div></header>',
      '<main><nav class="meta"><a href="/">For a Reason</a> \u203a ', html.escape(title.split(" \u00b7 ")[0]), '</nav>',
      '<section class="hero community-hero"><h1>', html.escape(title.split(" \u00b7 ")[0]), '</h1><p class="lede">', html.escape(tv['intro']), '</p><div class="row"><a class="btn big" href="/?course=', course, '">Open the travel guide</a></div></section>',
      '<h2>Essentials</h2>', ess,
      '<section class="panel"><h2>Getting around: metro, trains, bus & tram</h2>',
      '<h3>Set it up</h3><ul>', "".join("<li>"+html.escape(x)+"</li>" for x in tv['transit']['setup']), '</ul>',
      '<h3>Where to tap (check in & out)</h3><ul>', "".join("<li>"+html.escape(x)+"</li>" for x in tv['transit']['tap']), '</ul>',
      '<h3>Passes vs tickets</h3><ul>', "".join("<li>"+html.escape(x)+"</li>" for x in tv['transit']['passes']), '</ul>',
      '<h3>By mode</h3><dl>', "".join("<dt><strong>"+html.escape(m[0])+"</strong></dt><dd>"+html.escape(m[1])+"</dd>" for m in tv['transit']['modes']), '</dl>',
      '<h3>Cheap hacks</h3><ul>', "".join("<li>"+html.escape(x)+"</li>" for x in tv['transit']['hacks']), '</ul></section>',
      '<h2>When to go & budget</h2>', wb,
      '<h2>Top experiences</h2><ul>', top, '</ul>',
      '<h2>Food to try</h2><ul>', "".join("<li>"+html.escape(x)+"</li>" for x in tv.get('food', [])), '</ul>',
      '<h2>Where to stay</h2><ul>', "".join("<li>"+html.escape(x)+"</li>" for x in tv.get('stay', [])), '</ul>',
      '<h2>Day trips</h2><ul>', "".join("<li>"+html.escape(x)+"</li>" for x in tv.get('dayTrips', [])), '</ul>',
      '<h2>Useful apps</h2><ul>', "".join("<li>"+html.escape(x)+"</li>" for x in tv.get('apps', [])), '</ul>',
      '<section><h2>Questions</h2>', faq_html, '</section>',
      '<p class="meta">', " · ".join((f'<a href="{u}">'+html.escape(l)+'</a>') if u else html.escape(l) for l,u in tv['authority']), '</p></main>',
      '<footer class="foot"><p>Non-profit and open source. AI-assisted content can contain mistakes; check official sources before you travel.</p></footer>',
      '</body></html>'])
    os.makedirs(f"{OUT}/{slug}", exist_ok=True); open(f"{OUT}/{slug}/index.html","w").write(page)
travel_landing("jp","travel-japan","travel-jp","Japan travel guide \u00b7 IC cards, budget, etiquette and top experiences",
  "Everything a first-timer needs for Japan: IC cards (Suica/Pasmo), eSIM, cash vs card, no-tipping etiquette, best time to visit, daily budget and top experiences. Free and honest.")
travel_landing("nl","travel-netherlands","travel-nl","Netherlands travel guide \u00b7 OVpay tap-to-ride, bikes, budget and day trips",
  "How to travel the Netherlands: tap your bank card with OVpay, watch the bike lanes, when to go, daily budget, and easy train day trips. Free and honest.")
travel_landing("fr","travel-france","travel-fr","France travel guide \u00b7 Paris transport, TGV, etiquette and budget",
  "France for first-timers: Paris metro and Navigo, booking the TGV, the all-important bonjour, tipping, best time to visit and daily budget. Free and honest.")

# robots, sitemap, manifest
open(OUT + "/robots.txt", "w").write(f"User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: {SITE}/sitemap.xml\n")
from datetime import date
urls = ["/", "/travel-japan/", "/travel-netherlands/", "/travel-france/", "/learn-dutch/", "/learn-french/", "/learn-japanese/", "/driving-in-japan/", "/driving-in-the-netherlands/", "/visa-japan/", "/visa-netherlands/", "/visa-france/", "/remote-work-japan/", "/remote-work-netherlands/", "/remote-work-france/", "/community/", "/about/"]
urls += ["/sitemap/"]
for _l in ["hi","fr","ja","nl"]: urls += [f"/{_l}/", f"/{_l}/about/"]
open(OUT + "/sitemap.xml", "w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(f"  <url><loc>{SITE}{u}</loc><lastmod>{date.today()}</lastmod><changefreq>weekly</changefreq><priority>{'1.0' if u=='/' else '0.8'}</priority></url>\n" for u in urls) + "</urlset>\n")
json.dump({"name":"For a Reason: language, road rules and exams abroad","short_name":"For a Reason","description":DESC,"id":"/","start_url":"/","scope":"/","display":"standalone","orientation":"portrait","background_color":"#F1F4F9","theme_color":"#1D4BA8","lang":"en","categories":["education"],
  "icons":[{"src":"/icons/icon-192.png","sizes":"192x192","type":"image/png"},{"src":"/icons/icon-512.png","sizes":"512x512","type":"image/png"},{"src":"/icons/maskable-512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}],
  "shortcuts":[{"name":"Dutch","url":"/?course=en-nl"},{"name":"French","url":"/?course=en-fr"},{"name":"Japanese","url":"/?course=en-ja"},{"name":"Driving in Japan","url":"/?course=road-jp"},{"name":"Driving in the Netherlands","url":"/?course=road-nl"}]}, open(OUT + "/manifest.webmanifest", "w"), indent=2)
print("built", SITE)
