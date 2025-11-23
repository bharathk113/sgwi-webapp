import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: Cast process to any to avoid type error 'cwd does not exist on type 'Process''
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    base: '/sgwi-webapp/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env': {} 
    }
  }
})