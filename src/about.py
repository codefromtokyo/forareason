import html, json, os
exec(open("build.py").read().split("# static crawlable content")[0])
from about_content import ABOUT
LOGO = open("logo.svg").read().replace('<svg ', '<svg class="logo" width="28" height="28" ').replace("\n", "")
CITIES = json.load(open("cities.json"))
UI_LOCALES = ["en", "hi", "fr", "ja", "nl"]
HERO_H0 = {"en":"Start learning","hi":"सीखना शुरू करें","fr":"Commencer","ja":"学び始める","nl":"Begin met leren"}
def learning_line(lang, l):
    if not l: return ""
    return {"en":"Language: "+l+".","hi":"भाषा: "+l+"।","fr":"Langue : "+l+".","ja":"言語："+l+"。","nl":"Taal: "+l+"."}[lang]
def status_i18n(lang, s):
    T = {"en":{"Living here now":"Living here now","Travelled":"Travelled","Where it started":"Where it started"},
         "hi":{"Living here now":"अभी यहीं","Travelled":"यात्रा की","Where it started":"शुरुआत"},
         "fr":{"Living here now":"J'habite ici","Travelled":"Voyagé","Where it started":"Le début"},
         "ja":{"Living here now":"今ここ","Travelled":"訪れた","Where it started":"始まり"},
         "nl":{"Living here now":"Woon hier","Travelled":"Bezocht","Where it started":"Het begin"}}
    return T.get(lang, T["en"]).get(s, s)
def esc(x): return html.escape(x or "")
def about_page(lang):
    a = ABOUT[lang]
    prefix = "" if lang == "en" else "/" + lang
    paras = a.get("paras", [a.get("mission", "")])
    pull = a.get("pull"); facts = a.get("facts"); values = a.get("values")
    story = []
    if paras: story.append("<p>" + esc(paras[0]) + "</p>")
    if pull: story.append('<blockquote class="pull">' + esc(pull) + '</blockquote>')
    for p in paras[1:]: story.append("<p>" + esc(p) + "</p>")
    facts_html = ('<div class="facts">' + "".join('<div class="fact"><b>' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></div>' for f in facts) + '</div>') if facts else ""
    values_html = ('<section class="panel values"><h2>' + esc(a.get("valuesTitle","")) + '</h2><div class="valgrid">' + "".join('<span class="val">' + esc(v) + '</span>' for v in values) + '</div></section>') if values else ""
    who = "".join('<div><strong>' + esc(h) + '</strong>' + esc(x) + '</div>' for h, x in a["who"])
    stamps = "".join('<li><span class="tl-dot"></span><div><span class="when">' + esc(status_i18n(lang, c["status"])) + '</span><strong>' + esc((c["city"] + ", " if c["city"] else "") + c["country"]) + '</strong><span class="meta">' + esc(learning_line(lang, c["language"])) + " " + esc(c.get("note","") if lang == "en" else "") + '</span></div></li>' for c in CITIES)
    person = {"@context":"https://schema.org","@type":"AboutPage","name":a["title"],"inLanguage":lang,"url":SITE+prefix+"/about/","about":{"@type":"Organization","name":"For a Reason","founder":{"@type":"Person","name":"Sakshi"},"nonprofitStatus":"Nonprofit","url":SITE+"/","sameAs":["https://github.com/codefromtokyo/forareason"]}}
    crumbs = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"For a Reason","item":SITE+"/"},{"@type":"ListItem","position":2,"name":a["h1"],"item":SITE+prefix+"/about/"}]}
    home = prefix or "/"
    body = "".join([
      '<body>',
      '<header class="top"><div class="bar1"><a class="brand" href="', home, '">', LOGO, '<span>For a Reason</span></a></div></header>',
      '<main>',
      '<section class="hero about-hero"><p class="eyebrow">', esc(a.get("eyebrow","For a Reason")), '</p><h1>', esc(a["h1"]), '</h1><p class="lede">', esc(a["lede"]), '</p></section>',
      facts_html,
      '<section class="editorial">', "".join(story), '</section>',
      values_html,
      '<section class="panel"><h2>', esc(a["whoTitle"]), '</h2><div class="who">', who, '</div></section>',
      '<section class="panel"><h2>', esc(a["mapTitle"]), '</h2><p class="meta">', esc(a["mapIntro"]), '</p><ol class="tl">', stamps, '</ol></section>',
      '<section class="panel joincta"><h2>', esc(a["joinTitle"]), '</h2><p>', esc(a["join"]), '</p>',
      '<div class="row"><a class="btn" href="https://github.com/codefromtokyo/forareason/discussions">GitHub</a> <a class="btn ghost" href="/community/">Community</a> <a class="btn ghost" href="', home, '">', esc(HERO_H0[lang]), '</a></div></section>',
      '</main>',
      '<footer class="foot"><p>Non-profit and open source. AI-assisted content can contain mistakes. Not affiliated with the JLPT, DELF, Staatsexamen NT2, CBR or any authority.</p></footer>',
      '</body></html>'])
    page = head(a["title"], a["meta"], prefix + "/about/", extra_ld=[person, crumbs]) + body
    d = OUT + prefix + "/about"; os.makedirs(d, exist_ok=True); open(d + "/index.html", "w").write(page)
for lang in UI_LOCALES: about_page(lang)
print("editorial about pages built")
