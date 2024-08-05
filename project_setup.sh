# npx create-docusaurus@latest [name] [template] [rootDir]
name="docusaurus";
tempDir="${HOME}/TEMP/";
npx create-docusaurus@latest $name classic $tempDir --typescript 
mv ${tempDir}${name}/* . # all except .gitignore
rm -r "${tempDir}${name}"