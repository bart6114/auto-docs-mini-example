import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  handbook: [
    {
      type: 'category',
      label: 'Play Click-a-Duck',
      collapsed: false,
      items: ['intro', 'product/click-a-duck'],
    },
    {
      type: 'category',
      label: 'Build and maintain',
      collapsed: false,
      items: ['architecture', 'development', 'documentation-automation'],
    },
  ],
};

export default sidebars;
