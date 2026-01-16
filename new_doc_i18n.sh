# new document

DOCS="docs/";
RU_DOCS='i18n/ru/docusaurus-plugin-content-docs/current/';
UK_DOCS='i18n/uk/docusaurus-plugin-content-docs/current/';

#NEW_DOC='Holy-Land/test.mdx'
#NEW_DOC='Holy-Land/palestinian_people.md'
#NEW_DOC='Holy-Land/belligerent_occupation.md'
#NEW_DOC='Holy-Land/the_term_palestine.md'
#NEW_DOC='theology/theology.md'
NEW_DOC='theology/al-aqsa.md'
cp -r $DOCS$NEW_DOC $RU_DOCS$NEW_DOC && cp -r $DOCS$NEW_DOC $UK_DOCS$NEW_DOC
