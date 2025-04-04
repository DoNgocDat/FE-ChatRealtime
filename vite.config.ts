import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Chỉ định thư mục build là 'dist'
  },
  server: {
    proxy: {
      '/auth': 'https://smartchat-fh2a.onrender.com', // Yêu cầu đến /auth sẽ được chuyển tiếp đến localhost:3000
    },
  },
});
