/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  // tutorialSidebar: [
  //   'intro',
  //   'hello',
  //   {
  //     type: 'category',
  //     label: 'Tutorial',
  //     items: ['tutorial-basics/create-a-document'],
  //   },
  // ],
  tutorialSidebar: [
    'frontend',
      {
      label: 'mdn',
      type: 'category',
      collapsible: true,
      collapsed: true,
      // value: '<img src="girl.png" alt="girl"/>', 
      // defaultStyle: true,
      link: {
        type: 'doc',
        id: 'mdn/mdn',
      },
      items: ['mdn/html', 'mdn/css',
      {
      type: 'category',
      label: 'vue',
      items: ['vue/vue', 'vue/vuemd'],
    }],
      
    },
    'backend',
    {
      type: 'category',
      label: 'node',
      items: ['node/nodejs', 'node/npm'],
    },
    {
      type: 'category',
      label: 'express',
      items: ['express/expressnote'],
    },
    'framework',
    {
      type: 'category',
      label: 'vite',
      items: ['vite/viteapi', 'vite/viteasset', 'vite/viteconfigset', 'vite/viteerror', 'vite/vitefrontmatter', 'vite/vitehooks', 'vite/vitemdextension', 'vite/viteroute', 'vite/vitesidebar', 'vite/vitetheme'],
    },
    {
      type: 'category',
      label: 'vue',
      items: ['vue/vue', 'vue/vuemd'],
    }
    // {
    //   type: 'category',
    //   label: 'next',
    //   items: ['next/nexterror','next/nextlearn','next/nextroute'],
    //       }
    // ,
    // {
    //   "type": "category",
    //   "label": "react",
    //   "items": [
    //     "react/install",
    //     "react/ui",
    //     "react/interact",
    //     "react/state",
    //     "react/escape"
    //   ]
    // },
    // "loveRead",
    // {
    //   "type": "category",
    //   "label": "loveRead",
    //   "items": [
    //     "loveRead/grow1"
    //   ]
    // }
  ]
};

export default sidebars;
