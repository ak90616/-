import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project at https://<owner>.github.io/-/portfolio/,
// so built asset URLs need the sub-path as the base path.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/-/portfolio/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
}))
