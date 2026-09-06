import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig({
    plugins: [
        react(),
        {
            name: 'copy-404',
            closeBundle() {
                fs.copyFileSync(
                    resolve(__dirname, 'dist/index.html'),
                    resolve(__dirname, 'dist/404.html')
                )
            }
        }
    ],
    base: '/GeradorEmbed/',
    server: { open: true },
})