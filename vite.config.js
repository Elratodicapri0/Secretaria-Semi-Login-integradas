import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // --- ADICIONE ESTE BLOCO ---
  server: {
    proxy: {
      // Qualquer requisição que comece com '/api'
      '/api': {
        // Será encaminhada para o seu servidor Django
        target: 'http://localhost:8000',
        
        // Importante: muda a "origem" da requisição para o backend
        changeOrigin: true, 
        
        // 'rewrite' não é necessário aqui porque suas URLs do Django
        // (em urls.py) já esperam o prefixo /api.
      },
    },
  },
  // --- FIM DO BLOCO ---

  // P.S.: O seu bloco 'resolve' deve estar DENTRO do 'defineConfig'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
