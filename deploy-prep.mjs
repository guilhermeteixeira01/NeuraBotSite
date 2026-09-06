import { cpSync, rmSync, mkdirSync, writeFileSync } from 'fs'

rmSync('dist', { recursive: true, force: true })

mkdirSync('dist', { recursive: true })
mkdirSync('dist/dashboard', { recursive: true })

// Site principal
cpSync('NeuraBot/dist', 'dist', { recursive: true })

// Dashboard
cpSync('DashBoard/dist', 'dist/dashboard', { recursive: true })

// Gerador de Embed
cpSync('GerarEmbed/dist', 'dist/GeradorEmbed', { recursive: true })

// 404 personalizado da raiz
cpSync('404.html', 'dist/404.html')

// CNAME
writeFileSync('dist/CNAME', 'neurabot.com.br')

console.log('✅ dist pronto para deploy!')