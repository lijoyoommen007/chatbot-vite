import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'; // For bundle analysis
import purgecss from 'vite-plugin-purgecss'; // For removing unused CSS
import viteImagemin from 'vite-plugin-imagemin'; // For optimizing images
import { terser } from 'rollup-plugin-terser'; // For advanced JavaScript minification

export default defineConfig({
  plugins: [
    react(),
    purgecss(), // Removes unused CSS
    visualizer({ open: true }), // Opens a visualizer report automatically
    viteImagemin({ // Optimizes images
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.65, 0.9], speed: 4 },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        format: 'es', // or 'umd' for universal format
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
      plugins: [
        terser({ // Use terser for additional JavaScript minification
          compress: {
            drop_console: true, // Remove console logs
          },
          mangle: true, // Mangle variable names for size reduction
        }),
      ],
    },
    minify: 'esbuild', // Default minification using esbuild
    sourcemap: false,  // Disable source maps in production for smaller bundle size
  },
  base: './',  // Makes the build relative, useful for CDN deployment
});
