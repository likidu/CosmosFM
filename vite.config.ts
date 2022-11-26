import { resolve } from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only';
import del from 'rollup-plugin-delete';

const isLegacy = !!process.env.IS_LEGACY;

const legacyPlugins = [
  // we'll extract any component CSS out into
  // a separate file - better for performance
  css({ output: 'bundle.css' }),
  babel({
    extensions: ['.js', '.ts', '.html', '.svelte'],
    babelHelpers: 'runtime',
    exclude: ['node_modules/@babel/**'],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-transform-runtime',
        {
          useESModules: true,
          regenerator: false,
        },
      ],
    ],
  }),
  // vite transpire to es5:
  // https://github.com/vitejs/vite/issues/10981#issuecomment-1321383114
  getBabelOutputPlugin({
    allowAllFormats: true,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { firefox: '48' },
          exclude: ['@babel/plugin-transform-regenerator'],
        },
      ],
    ],
  }),
  del({ targets: ['dist/*.webmanifest'], hook: 'generateBundle' }),
];

const legacyExtraConfig = {
  css: {
    postcss: true,
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        format: 'iife',
        dir: resolve(__dirname, 'dist'),
        entryFileNames: `bundle.js`,
        chunkFileNames: `bundle.js`,
        assetFileNames: `bundle.[ext]`,
      },
      context: 'window',
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), ...(isLegacy ? legacyPlugins : [])],
  build: {
    rollupOptions: {
      output: {
        name: 'app',
        entryFileNames: `bundle.[hash].js`,
        chunkFileNames: `bundle.[hash].js`,
        assetFileNames: `bundle.[hash].[ext]`,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5000,
  },
  ...(isLegacy && legacyExtraConfig),
});
