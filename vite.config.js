import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Remove apenas 'log' e 'debugger' no build de produção.
    // Mantém 'error' e 'warn' ativos para monitoramento seguro.
    drop: ['console', 'debugger']
  }
})
