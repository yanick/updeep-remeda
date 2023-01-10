import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  kit: {
    adapter: adapter({ strict: false, 
        pages: '../docs', assets: '../docs'}),
  },
};

export default config;
