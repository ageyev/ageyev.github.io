
# https://docusaurus.io/docs/i18n/git

npm run write-translations -- --locale ru

mkdir -p i18n/ru/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/ru/docusaurus-plugin-content-docs/current

mkdir -p i18n/ru/docusaurus-plugin-content-blog
cp -r blog/** i18n/ru/docusaurus-plugin-content-blog

mkdir -p i18n/ru/docusaurus-plugin-content-pages
cp -r src/pages/**.md i18n/ru/docusaurus-plugin-content-pages
cp -r src/pages/**.mdx i18n/ru/docusaurus-plugin-content-pages

# ----- UK

npm run write-translations -- --locale uk

mkdir -p i18n/uk/docusaurus-plugin-content-docs/current
cp -ur docs/** i18n/uk/docusaurus-plugin-content-docs/current

mkdir -p i18n/uk/docusaurus-plugin-content-blog
cp -ur blog/** i18n/uk/docusaurus-plugin-content-blog

mkdir -p i18n/ru/docusaurus-plugin-content-pages
cp -ur src/pages/**.md i18n/uk/docusaurus-plugin-content-pages
cp -ur src/pages/**.mdx i18n/uk/docusaurus-plugin-content-pages

# ----- HE

# npm run write-translations -- --locale he

