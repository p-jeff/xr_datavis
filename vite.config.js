import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    base: '/xr_datavis/', // Set your base path here
    plugins: [react()],
    server: {
      https: isDevelopment
        ? {
            key: fs.readFileSync('./localhost-key.pem'),
            cert: fs.readFileSync('./localhost.pem')
          }
        : false,
      host: true, // Expose to local network
      port: 5173  // You can change this to your desired port
    }
  };
});
