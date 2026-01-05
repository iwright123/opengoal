# OpenGoal MVP

OpenGoal is an open-source football data platform. This MVP provides match schedules, live updates, league tables, and team details.

## Features

- **Match Schedule**: View today's interactive match list (Live, Upcoming, Finished).
- **Match Details**: Timeline of goals, cards, and events.
- **League Tables**: Standings for Premier League and Champions League.
- **Team Stats**: Basic team information.
- **Fast & Clean**: Built with Next.js and Vanilla CSS for speed and simplicity.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, CSS Modules
- **Backend**: Node.js, Express, TypeScript
- **Shared**: TypeScript Monorepo (npm workspaces)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start both the API and Web Client:

```bash
npm run dev
```

- Web Client: [http://localhost:3000](http://localhost:3000)
- API Server: [http://localhost:3001](http://localhost:3001)

## Architecture

- `apps/web`: Next.js frontend
- `apps/api`: Express backend with mock data service
- `packages/shared`: Shared TypeScript types

## Roadmap

- [ ] Connect to real Football Data API
- [ ] Add Player Statistics page
- [ ] Implement Dark Mode toggle (System preference supported)
- [ ] Add specific Match Lineups
