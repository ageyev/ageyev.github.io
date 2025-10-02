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

[Admonitions](https://docusaurus.io/docs/markdown-features/admonitions). 
You can use MDX inside admonitions too.

#### plugin-ideal-image 

[plugin-ideal-image](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-ideal-image) supports the PNG and JPG formats only. 

```shell
npm install --save @docusaurus/plugin-ideal-image 
```

Can be used like that: 


```mdxjs

```


### Doc pages

[Doc tags](https://docusaurus.io/docs/3.3.2/create-doc#doc-tags)

Optionally, you can add tags to your doc pages, which introduces another dimension of categorization in addition to the docs sidebar. Tags are passed in the front matter as a list of labels:

```md 

---
id: doc-with-tags
title: A doc with tags
tags:
- Demo
- Getting started
--- 

```
Tags can also be declared with tags: [Demo, Getting started].

### Blog 

[<!--truncate--> (.md) or {/* truncate */} (.mdx) marker](https://docusaurus.io/docs/blog#blog-list) 

[Blog front matter fields](https://docusaurus.io/docs/3.4.0/api/plugins/@docusaurus/plugin-content-blog#markdown-front-matter) 

### Images 

Illustrations for texts in 'docs' and 'blog' sections are stored in the corresponding folders in [/static/img/Illustrations](/static/img/Illustrations) 

In the output they will be placed in ```img/``` directory. 

To reference an image in the blog post, omit ```static```, for example: 

```markdown
![image description](/img/Illustrations/blog/2025-02-06-from_the_Nile_to_the_Euphrates/Bereshit_15-18.png) 
```

### Updating Docusaurus 

```shell
 npm i @docusaurus/core@latest @docusaurus/plugin-content-blog@latest @docusaurus/plugin-ideal-image@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest @docusaurus/tsconfig@latest @docusaurus/types@latest
```