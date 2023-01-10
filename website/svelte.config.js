import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
	kit: {
        adapter: adapter({ strict: false })
	}
};

export default config;
