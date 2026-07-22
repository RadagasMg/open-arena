# Open Arena

A React prototype for city-based, invitation-only product competitions. Participation is free; qualified players receive a temporary right to purchase a product at a fixed price.

## Stack

- React 19 + TypeScript + Vite
- Firebase Auth and Firestore adapter
- Vercel SPA configuration
- Lucide icons

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Firebase is optional for the visual prototype. Add a web application's public Firebase configuration to `.env.local` when a project is ready.

## Product guardrails

- No entry fee or paid attempts
- No random winner selection
- Product payment happens only after qualification
- Public participants use pseudonymous player IDs
- Scoring and tie-breaks belong on a trusted server
