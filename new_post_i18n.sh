# source ./create_dirs_and_docs.sh

DOCS="docs";
RU_DOCS='i18n/ru/docusaurus-plugin-content-docs/current';
UK_DOCS='i18n/uk/docusaurus-plugin-content-docs/current';

BLOG="blog"
RU_BLOG="i18n/ru/docusaurus-plugin-content-blog/";
UK_BLOG="i18n/uk/docusaurus-plugin-content-blog/";

NEW_BLOG_POST=$BLOG/2025-02-06-from_the_Nile_to_the_Euphrates
cp -r $NEW_BLOG_POST $RU_BLOG
cp -r $NEW_BLOG_POST $UK_BLOG


