# source ./create_dirs_and_docs.sh

DOCS="docs";
RU_DOCS='i18n/ru/docusaurus-plugin-content-docs/current';
UK_DOCS='i18n/uk/docusaurus-plugin-content-docs/current';

BLOG="blog"
RU_BLOG="i18n/ru/docusaurus-plugin-content-blog";
UK_BLOG="i18n/uk/docusaurus-plugin-content-blog";

# mkdir -p $RU_DOCS/ECHR/ && cp docs/ECHR/echr.mdx $RU_DOCS/ECHR/echr.mdx
# mkdir -p $UK_DOCS/ECHR/ && cp docs/ECHR/echr.mdx $UK_DOCS/ECHR/echr.mdx

# mkdir -p docs/Israel/ && touch docs/Israel/israel.mdx
# mkdir -p $RU_DOCS/Israel/ && cp docs/Israel/israel.mdx $RU_DOCS/Israel/israel.mdx
# mkdir -p $UK_DOCS/Israel/ && cp docs/Israel/israel.mdx $UK_DOCS/Israel/israel.mdx

# mkdir -p docs/Israel/ && touch docs/Israel/territory.mdx
# mkdir -p $RU_DOCS/Israel/ && cp docs/Israel/territory.mdx $RU_DOCS/Israel/territory.mdx
# mkdir -p $UK_DOCS/Israel/ && cp docs/Israel/territory.mdx $UK_DOCS/Israel/territory.mdx

#mkdir -p docs/software/ && touch docs/software/software.mdx
#mkdir -p $RU_DOCS/software/ && cp docs/software/* $RU_DOCS/software/
#mkdir -p $UK_DOCS/software/ && cp docs/software/* $UK_DOCS/software/

mkdir -p $RU_DOCS/ECHR/ && cp docs/ECHR/* $RU_DOCS/ECHR/
mkdir -p $UK_DOCS/ECHR/ && cp docs/ECHR/* $UK_DOCS/ECHR/
