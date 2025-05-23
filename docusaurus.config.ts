import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        // quality: 70,
        // max: 1030, // max resized image's size.
        // min: 640, // min resized image's size, if the original is lower, use that size.
        // steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
  ],
  title: 'International Law etc.', // 'My Site', // "title" is not allowed to be empty
  // tagline: 'by Viktor Ageyev',
  favicon: 'img/favicon/favicon.ico',

  // Set the production url of your site here
  url: 'https://international-law.info',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ageyev', // Usually your GitHub org/username.
  projectName: 'ageyev.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like HTML lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    // locales: ['en', 'ru', 'uk'], //
    locales: ['en', 'ru', 'uk']
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // see: https://docusaurus.io/docs/docs-introduction#docs-only-mode
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/ageyev/ageyev.github.io/tree/master/',
          showLastUpdateAuthor: true, // git username from the last commit
          showLastUpdateTime: true, // git last commit time
        },

        blog: {
          // see: https://docusaurus.io/docs/blog#blog-only-mode
          // routeBasePath: '/', // Serve the blog at the site's root
          blogTitle: 'International Law etc.',
          blogDescription: 'Ubi societas, ibi ius',
          postsPerPage: 5,
          // (!) feeds are only generated in production, see https://github.com/facebook/docusaurus/issues/6523#issuecomment-1025743866
          // https://docusaurus.io/blog/releases/3.5#blog-feeds-styling
          // https://darekkay.com/blog/rss-styling/
          // https://github.com/facebook/docusaurus/blob/main/website/docusaurus.config.ts#L488
          feedOptions: {
            type: 'all',
            description: 'Keep up to date with upcoming blog posts by following our feed!',
            copyright: `Copyright © ${new Date().getFullYear()} Viktor Ageyev`,
            xslt: true,
          },
          showReadingTime: false, // default: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links. // TODO: change links text
          // editUrl: 'https://github.com/ageyev/ageyev.github.io/tree/master/',
          showLastUpdateAuthor: true, // git username from the last commit
          showLastUpdateTime: true, // git last commit time
          //
          blogSidebarCount: 12, // Set the number of recent posts
        },

        theme: {
          customCss: './src/css/custom.css',
        },

        // see: https://github.com/facebook/docusaurus/pull/5832
        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag
        // This plugin is always inactive in development and only active in production
        // to avoid polluting the analytics statistics.
        gtag: {
          trackingID: 'G-H9H0GL30GY',
          // anonymizeIP: true,
        },

        // Sitemap
        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-sitemap#ex-config
        // https://www.sitemaps.org/protocol.html#xmlTagDefinitions
        // for i18n see:
        // https://stackoverflow.com/questions/77479158/not-all-locales-are-generated-in-sitemap-xml-of-a-docusaurus-website
        // Docusaurus generates a separate sitemap.xml for each local
        // https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview 
        sitemap: {
          lastmod: 'date',
          changefreq: 'daily', // 'weekly',
          priority: 0.5,
          ignorePatterns: [], // ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },

      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace it with your project's social card
    // image: 'img/docusaurus-social-card.jpg', // TODO: change

    colorMode: {
      defaultMode: 'dark', // 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true, // false,
    },

    navbar: {
      // --- Navbar Title
      title: 'International Law etc.',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },

      // --- Navbar Links
      items: [
        { // --- Link to docs
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Texts', // 'Tutorial',
        },
        { // --- Link to blog
          to: '/blog', // > '/' , see https://docusaurus.io/docs/blog#blog-only-mode
          label: 'Blog',
          position: 'left'
        },
        { // i18n
          type: 'localeDropdown',
          position: 'left',
        },
        { // --- Link to GitHub
          href: 'https://github.com/ageyev/ageyev.github.io/',
          label: 'GitHub',
          position: 'right',
        },
        // TODO: repair RSS
        { // --- RSS
          href: 'https://international-law.info/blog/rss.xml',
          label: 'RSS',
          position: 'right',
        },
      ],
    },

    // --- Footer
    // see:
    // https://github.com/facebook/docusaurus/blob/7be1feaa0a6fbfd18faec8fe0488d24a61b15596/website/docusaurus.config.ts#L704
    footer: {
      style: 'dark',
      links: [
        {
          label: '[Texts]',
          to: '/', // '/docs/intro',
        },
        {
          label: '[Blog]',
          to: '/blog', // '/',
        },
        { // Youtube
          html: `
                <a href="https://www.youtube.com/@international-law-info" target="_blank" title="YouTube" class="footer_icon">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="youtube icon"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>
                </a>
              `,
        },
        { // X.com
          html: `
                <a href="https://x.com/ageyev" target="_blank" title="X.com" class="footer_icon">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="twitter icon"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                </a>
              `,
        },
        { // Facebook
          html: `
                <a href="https://www.facebook.com/viktor.ageyev" target="_blank" title="Facebook" class="footer_icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="facebook icon"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
                </a>
              `,
        },
      ],
      // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      copyright: `Copyright © 2025, Viktor Ageyev`,
      // copyright: ` // html works:
      //           <a href="https://www.facebook.com/viktor.ageyev" target="_blank" title="Facebook" class="footer_icon">
      //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="facebook icon"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
      //           </a>
      //         `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
