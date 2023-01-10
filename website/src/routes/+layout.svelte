  <script>
  import '@svelteness/kit-docs/client/polyfills/index.js';
  import '@svelteness/kit-docs/client/styles/normalize.css';
  import '@svelteness/kit-docs/client/styles/fonts.css';
  import '@svelteness/kit-docs/client/styles/theme.css';
  import '@svelteness/kit-docs/client/styles/vars.css';

  import { KitDocs, KitDocsLayout } from '@svelteness/kit-docs';

  // ...

  /** @type {import('@svelteness/kit-docs').NavbarConfig} */
  const navbar = {
    links: [{ title: 'Get started', slug: '/latest/get-started', match:
    /\/latest\/get-started/} ,
    { title: 'API', slug: '/latest/api', match: /\/latest\/api/ }],
  };

  const sidebar = {
    links: {
        "": [
            { title: 'Get started', slug: "/latest/get-started"}
        ,
            { title: 'API', slug: "/latest/api"}
        ]
    }
  };

  export let data;

$: meta = data.meta;
  </script>

  <KitDocs {meta}>
  <KitDocsLayout {navbar} {sidebar} >
    <slot />
  </KitDocsLayout>
</KitDocs>
