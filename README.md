# International Law etc. 

[International Law etc.](https://international-law.info) website code 

## How to use 

### MDX features

[React Lite YouTube Embed](https://www.npmjs.com/package/react-lite-youtube-embed) can be used to insert a video from YouTube to .mdx file. 

An example: 

```mdxjs

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

<LiteYouTubeEmbed
    id="WcPJUgz_bq4"
    title='Viktor Ageyev: How to overcome the "veto power" in the UN Security Council'
    noCookie={false}
/>

```

[Importing Markdown ("partials")](https://docusaurus.io/docs/markdown-features/react#importing-markdown)

[<Tabs> component](https://docusaurus.io/docs/markdown-features/tabs)

[Importing code snippets](https://docusaurus.io/docs/markdown-features/react#importing-code-snippets)

[link to assets (e.g. docx files, images...)](https://docusaurus.io/docs/markdown-features/assets)

### Blog 

[<!--truncate--> (.md) or {/* truncate */} (.mdx) marker](https://docusaurus.io/docs/blog#blog-list) 

[Blog front matter fields](https://docusaurus.io/docs/3.4.0/api/plugins/@docusaurus/plugin-content-blog#markdown-front-matter) 

### Images 

Illustrations for texts in 'docs' and 'blog' sections are stored in the corresponding folders in [static/img/Illustrations](static/img/Illustrations)
