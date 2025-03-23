# new document

DOCS="docs/";
RU_DOCS='i18n/ru/docusaurus-plugin-content-docs/current/';
UK_DOCS='i18n/uk/docusaurus-plugin-content-docs/current/';

#NEW_DOC='Holy-Land/test.mdx'
NEW_DOC='Holy-Land/palestinian_people.md'
cp -r $DOCS$NEW_DOC $RU_DOCS$NEW_DOC && cp -r $DOCS$NEW_DOC $UK_DOCS$NEW_DOC
