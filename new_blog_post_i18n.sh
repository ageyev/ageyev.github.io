# new blog post

BLOG="blog"
RU_BLOG="i18n/ru/docusaurus-plugin-content-blog/"
UK_BLOG="i18n/uk/docusaurus-plugin-content-blog/"

NEW_BLOG_POST=$BLOG/2025-04-18-What_Gaza_was_counting_on
cp -r $NEW_BLOG_POST $RU_BLOG
cp -r $NEW_BLOG_POST $UK_BLOG
