# Prompt: triage and fix reported content

Use this with an AI coding agent (for example Claude Code) inside a clone of this repo, with the GitHub CLI (`gh`) logged in.

---

You maintain the learning content of For a Reason. Content lives in `src/data_nl.js` (Dutch A1–B2), `src/data_fr.js` (French DELF A1–B2), `src/data_ja.js` (Japanese JLPT N5–N1), `src/tracks.js` (reason tracks) and `src/roads.js` (road guides and theory questions). Users report mistakes as GitHub issues labelled `content`.

For each open issue from `gh issue list --label content --state open --json number,title,body`:

1. Read the Item ID. Format: `<lang>/<level>/<type>/<index...>`
   - `vocab/<i>`: `DATA[level].vocab[i]` (nl: [word, meaning]; ja: [written, reading, romaji, meaning])
   - `grammar/<g>/<i>`: `DATA[level].grammar[g].drills[i]` (the first option in `o` is the correct answer)
   - `order/<i>`: `DATA[level].order[i]`
   - `exam/<section>/<id>`: `DATA[level].exam[section]`, where id `t<block>q<question>` is a reading/vocab block and `i<item>q<question>` a listening item
   - IDs with `x` (e.g. `vocab/x3`) are AI-added words stored only on the user's device; answer that it can't be fixed centrally and close.
2. Decide whether the report is correct. Be strict: check meaning, grammar, level, and whether more than one option could be correct. Do not invent sources.
3. If correct: make the smallest fix in the data file. Keep the first option in `o` as the correct answer. Keep the level appropriate (CEFR for Dutch, JLPT for Japanese).
4. If the report is wrong or unclear: comment with a short explanation and add the label `not-a-bug` or `needs-info`. Do not change files.
5. Rebuild with `cd src && python3 build.py && python3 about.py`, run the smoke test if present, and open one PR per issue titled `Fix <item id>: <summary>` with `Fixes #<number>` in the body.
6. Never change more than the reported item unless the same mistake repeats in the same file; list any extra changes in the PR.

Finish with a table: issue, verdict (fixed / not a bug / needs info), PR link.
