import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Fix for React Router: handle SPA routing in dev server
  server: {
    historyApiFallback: true,
  },
  // For production build
  preview: {
    historyApiFallback: true,
  },
})
