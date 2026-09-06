import { cpSync, rmSync, mkdirSync, writeFileSync, cp } from 'fs'

rmSync('dist', { recursive: true, force: true })
mkdirSync('dist', { recursive: true })
mkdirSync('dist/dashboard', { recursive: true })

cpSync('NeuraBot/dist', 'dist', { recursive: true })
cpSync('DashBoard/dist', 'dist/dashboard', { recursive: true })
cpSync('GerarEmbed/dist', 'dist/GeradorEmbed', { recursive: true })

writeFileSync('dist/CNAME', 'neurabot.com.br')

console.log('✅ dist pronto para deploy!')