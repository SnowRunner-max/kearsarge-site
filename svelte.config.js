import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({ postcss: true, typescript: true }),
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $lib: 'src/lib',
      $routes: 'src/routes'
    }
  }
};

export default config;
