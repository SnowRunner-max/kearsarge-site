import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({ postcss: true, typescript: true }),
  kit: {
    adapter: adapter({ pages: 'build', assets: 'build', fallback: undefined, precompress: false }),
    alias: {
      $components: 'src/lib/components',
      $lib: 'src/lib',
      $routes: 'src/routes'
    }
  }
};

export default config;

