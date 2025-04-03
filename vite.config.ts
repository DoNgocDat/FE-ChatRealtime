import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:3000', // Yêu cầu đến /auth sẽ được chuyển tiếp đến localhost:3000
    },
  },
});
