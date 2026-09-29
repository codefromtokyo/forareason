#!/bin/sh
# Usage: sh set-site.sh https://langcheck.app
# Replaces the site URL used in canonical links, Open Graph tags, sitemap and robots.txt.
[ -z "$1" ] && echo "Usage: sh set-site.sh https://your-domain" && exit 1
OLD="https://forareason.vercel.app"
for f in index.html learn-dutch/index.html learn-japanese/index.html learn-french/index.html driving-in-japan/index.html driving-in-the-netherlands/index.html about/index.html sitemap.xml robots.txt; do
  sed -i.bak "s#$OLD#$1#g" "$f" && rm -f "$f.bak"
done
echo "Site URL set to $1"
