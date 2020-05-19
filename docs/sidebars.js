module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'installation'
    },
    {
      type: 'category',
      label: 'Use Cases',
      items: [
        'testing-components',
        'testing-directives',
        'testing-pipes',
        'testing-services',
        'testing-with-host',
        'testing-with-http',
        'testing-with-routing',
        'testing-modules'
      ]
    },
    {
      type: 'category',
      label: 'Tools',
      items: ['schematics', 'custom-matchers', 'global-injections', 'mocking-components']
    },
    {
      type: 'category',
      label: 'API Reference',
      items: ['events', 'helpers', 'queries']
    },
    {
      type: 'doc',
      id: 'jest-support'
    }
  ]
};
