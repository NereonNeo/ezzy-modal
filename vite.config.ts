import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    tsconfigPath: './tsconfig.build.json',
    entryRoot: 'src/main/ezzy-modal',
    outDir: 'dist',
  })],

  resolve: {
    dedupe: ['react', 'react-dom'],
    preserveSymlinks: true
  },


  build: {
    lib: {
      entry: 'src/main/ezzy-modal/index.ts',
      name: 'EzzyModal',
      fileName: (format) => `ezzy-modal.${format}.js`,
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'JSX',
        }
      },
    },

  },
  server: {
    port: 3000
  }
})
