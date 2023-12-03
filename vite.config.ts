import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';

export default defineConfig({
  plugins: [mkcert(), react()],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  base: './',
  server: {
    https: false,
    port: 3000,
  },
  preview: {
    open: true,
    host: true,
    port: 8888,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]',
        entryFileNames: '[name].js',
      },
    },
    cssCodeSplit: true,
    target: 'es2015',
  },
});
