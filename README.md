# Unitel Basket Stats

Plataforma web de estatísticas de basquetebol para o campeonato angolano Unitel Basket.

Tecnologias:
- Next.js + React + TailwindCSS
- Node.js + Express
- MongoDB + Mongoose
- Socket.io para atualizações em tempo real

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run seed`

## Ambiente

Copie `.env.example` para `.env` e ajuste a URL do MongoDB.

## Estrutura

- `server/` - backend Express, Socket.io, MongoDB, seed de dados
- `pages/` - frontend Next.js
- `components/` - componentes UI reutilizáveis
- `styles/` - estilos Tailwind

## Execução

1. Instale dependências:
```bash
npm install
```
2. Suba MongoDB localmente.
3. Rode o seed:
```bash
npm run seed
```
4. Inicie a aplicação:
```bash
npm run dev
```

A aplicação será acessível em `http://localhost:3000`.
