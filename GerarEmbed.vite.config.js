import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/GeradorEmbed/',
    server: {
        open: false,
        port: 5175,
    },
})