# see:
# https://docusaurus.io/docs/migration

npm run clear
rm -rf node_modules yarn.lock package-lock.json
npm install
npm update

# update docusaurus
npm i @docusaurus/core@latest @docusaurus/plugin-content-blog@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest @docusaurus/tsconfig@latest @docusaurus/types@latest
