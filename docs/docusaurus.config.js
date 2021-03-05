module.exports = {
  title: 'Spectator',
  tagline: 'A Powerful Tool to <strong>Simplify</strong> Your <strong>Angular Tests</strong> 🦊 🚀',
  url: 'https://github.com/ngneat',
  baseUrl: '/spectator/',
  favicon: 'img/favicon.ico',
  organizationName: 'ngneat',
  projectName: 'spectator',
  themeConfig: {
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
          href: 'https://stackblitz.com/edit/angular-testing-spectator',
          label: 'Playground',
          position: 'right'
        },
        {
          href: 'https://github.com/ngneat/spectator/',
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
