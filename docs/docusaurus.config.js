module.exports = {
  title: 'Spectator',
  tagline: '🦊 🚀 A Powerful Tool to Simplify Your Angular Tests ',
  url: 'https://github.com/ngneat',
  baseUrl: '/spectator/',
  favicon: 'img/favicon.ico',
  organizationName: 'ngneat',
  projectName: 'spectator',
  themeConfig: {
    algolia: {
      appId: 'BH4D9OD16A', //TODO
      apiKey: '0fe261e8a7d089862d9a959da892561f', //TODO
      indexName: 'spectator'
    },
    navbar: {
      title: 'Home',
      logo: {
        alt: 'Spectator',
        src: 'img/banner.svg'
      },
      links: [
        {
          to: 'docs/installation',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left'
        },
        {
          href: 'https://stackblitz.com/edit/angular-testing-spectatoro',
          label: 'Playground',
          position: 'right'
        },
        {
          href: 'https://github.com/ngneat/specatator/',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/installation'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/spectator'
            },
            {
              label: 'FAQ',
              href: 'docs/faq'
            }
          ]
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ngneat/spectator/'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/NetanelBasal'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Spectator, Inc. Built with Docusaurus.`
    },
    prism: {
      theme: require('prism-react-renderer/themes/nightOwlLight')
    },
    sidebarCollapsible: false
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/ngneat/spectator/edit/master/docs'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
