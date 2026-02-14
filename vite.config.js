import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Configuration de l'outil de build Vite.
 * Définit le plugin React, le port du serveur et la base de l'URL.
 */
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    allowedHosts: true,
  },
});
