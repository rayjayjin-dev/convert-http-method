import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '서비스 매뉴얼',
  tagline: '서비스 사용을 위한 종합 가이드',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://service-manual.example.com',
  baseUrl: '/',

  organizationName: 'my-org',
  projectName: 'service-manual',

  customFields: {
    showNavbar: false, // false로 변경하면 Navbar 숨김 (포털 삽입 시)
  },

  onBrokenLinks: 'throw',

  headTags: [
    // Chrome 번역 팝업 억제
    {
      tagName: 'meta',
      attributes: { name: 'google', content: 'notranslate' },
    },
    // Edge (Chromium) 번역 팝업 억제
    {
      tagName: 'meta',
      attributes: { name: 'microsoft', content: 'notranslate' },
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'ja'],
    localeConfigs: {
      ko: { label: '한국어', direction: 'ltr' },
      en: { label: 'English', direction: 'ltr' },
      ja: { label: '日本語', direction: 'ltr' },
    },
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['ko', 'en', 'ja'],
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '서비스 매뉴얼',
      logo: {
        alt: '서비스 매뉴얼 로고',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/docs/getting-started',
          label: '시작하기',
          position: 'left',
        },
        {
          to: '/docs/user-guide',
          label: '사용자 가이드',
          position: 'left',
        },
        {
          to: '/docs/admin-guide',
          label: '관리자 가이드',
          position: 'left',
        },
        {
          to: '/docs/api-reference',
          label: 'API 레퍼런스',
          position: 'left',
        },
        {
          to: '/docs/troubleshooting',
          label: '문제 해결',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '서비스 매뉴얼',
              to: '/docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 서비스 매뉴얼. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
