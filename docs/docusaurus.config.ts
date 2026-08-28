import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Click-a-Duck Handbook',
  tagline: 'Click ducks. Grow the flock.',
  url: 'https://bart6114.github.io',
  baseUrl: '/auto-docs-mini-example/',
  organizationName: 'bart6114',
  projectName: 'auto-docs-mini-example',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  future: {
    v4: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    [
      'docusaurus-plugin-llms',
      {
        title: 'Click-a-Duck Handbook',
        description:
          'How to play Click-a-Duck, climb its ranks, understand the game rules, and contribute to the app.',
        docsDir: 'docs',
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        generateMarkdownFiles: true,
        preserveDirectoryStructure: true,
        includeOrder: [
          'intro.md',
          'product/**/*.md',
          'architecture.md',
          'development.md',
          'documentation-automation.md',
        ],
        includeUnmatchedLast: true,
        rootContent:
          'Start with the player overview and game guide. Architecture, local development, and documentation automation are supporting references for contributors.',
        fullRootContent:
          'This file contains the complete Click-a-Duck handbook as Markdown. The source pages in the repository remain the source of truth.',
      },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/bart6114/auto-docs-mini-example/edit/main/docs/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Click-a-Duck Handbook',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'handbook',
          position: 'left',
          label: 'Handbook',
        },
        {
          href: 'https://github.com/bart6114/auto-docs-mini-example',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Play',
          items: [
            {label: 'Overview', to: '/docs/intro'},
            {label: 'How to play', to: '/docs/product/click-a-duck'},
          ],
        },
        {
          title: 'Contribute',
          items: [
            {label: 'Game architecture', to: '/docs/architecture'},
            {label: 'Run locally', to: '/docs/development'},
            {label: 'Documentation automation', to: '/docs/documentation-automation'},
          ],
        },
      ],
      copyright: `Click-a-Duck ${new Date().getFullYear()} - keep an eye on the flock.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
