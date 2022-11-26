import sveltePreprocess from 'svelte-preprocess';

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    postcss: true,
    replace: [[/process\.env\.(\w+)/g, (_, prop) => JSON.stringify(process.env[prop])]],
  }),
  // we'll extract any component CSS out into
  // a separate file — better for performance
  css: (css) => {
    css.write('bundle.css');
  },
};
