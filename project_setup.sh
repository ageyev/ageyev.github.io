
# npx create-docusaurus@latest [name] [template] [rootDir]
name="docusaurus";
tempDir="${HOME}/TEMP/";

npx create-docusaurus@latest $name classic "${tempDir}" --typescript
mv "${tempDir}${name}"/* . # all except .gitignore
rm -r "${tempDir}${name}"

# types for react-dom
# for:
# import {renderToStaticMarkup} from "react-dom/server";
# https://react.dev/reference/react-dom/server/renderToStaticMarkup
npm install -S @types/react-dom


# YouTube embed videos
# see: https://github.com/facebook/docusaurus/blob/main/website/src/pages/index.tsx
# https://www.npmjs.com/package/react-lite-youtube-embed
npm install -S react-lite-youtube-embed

# Font Awesome
# see: https://docusaurus.community/knowledge/design/icons/fontawesome/
#
# https://fontawesome.com/docs/web/use-with/react/
# https://fontawesome.com/docs/web/use-with/react/style
#
# https://fontawesome.com/search?o=r&m=free&s=solid (1390 icons)
# https://fontawesome.com/search?o=r&m=free&s=regular (163 icons)
# https://fontawesome.com/search?o=r&f=brands (484 icons)
npm install -S @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome@latest @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons