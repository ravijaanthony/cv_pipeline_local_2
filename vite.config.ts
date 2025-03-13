import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000, // Replace with your desired port number
    // strictPort: true, // Exit if port is already in use
    proxy: {
      "/api": {
        target: "https://cvpipeline2.up.railway.app:8080",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
