# new blog post

#BLOG="blog"
RU_BLOG="./i18n/ru/docusaurus-plugin-content-blog/"
UK_BLOG="./i18n/uk/docusaurus-plugin-content-blog/"

#NEW_BLOG_POST="./blog/2025-05-26-Jerusalem-Day"
NEW_BLOG_POST="./blog/2025-07-16_prayer_of_a_warrior"
cp -r $NEW_BLOG_POST $RU_BLOG && echo "coping" $NEW_BLOG_POST "to" $RU_BLOG
cp -r $NEW_BLOG_POST $UK_BLOG && echo "coping" $NEW_BLOG_POST "to" $UK_BLOG
