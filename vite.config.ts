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


  build: {
    lib: {
      entry: 'src/main/ezzy-modal/index.ts',
      name: 'EzzyModal',
      fileName: (format) => `ezzy-modal.${format}.js`,
    },
    cssCodeSplit: true,
    rollupOptions: {
      // Не включать React и ReactDOM в сборку, чтобы библиотека была "легкой"
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
    },

  },
  server: {
    port: 3000
  }
})
