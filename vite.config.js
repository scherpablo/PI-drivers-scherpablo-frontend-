import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        
      }
    }
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.{js,cjs,ts,jsx,tsx}'],
})
