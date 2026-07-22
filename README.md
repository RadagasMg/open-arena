# Open Arena

Prototype React pour des compétitions produit par ville, accessibles sur invitation. La participation est gratuite ; les joueurs qualifiés reçoivent un droit temporaire d’acheter un produit à prix fixe.

## Stack

- React 19 + TypeScript + Vite
- Adaptateur Firebase Auth et Firestore
- Configuration SPA pour Vercel
- Icônes Lucide

## Développement local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Firebase est optionnel pour le prototype visuel. Ajoute la configuration publique d’une application web Firebase dans `.env.local` quand le projet est prêt.

## Garde-fous produit

- Aucun frais d’entrée ni tentative payante
- Aucun gagnant choisi au hasard
- Le paiement du produit arrive seulement après qualification
- Les participants publics utilisent des identifiants pseudonymes
- Le score et les départages doivent être gérés par un serveur fiable
