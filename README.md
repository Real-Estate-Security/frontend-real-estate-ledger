# Real Estate Ledger Frontend

This repository contains the frontend application for the Real Estate Ledger project, a comprehensive platform for managing real estate property transactions and investments with ease and security.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Real-Estate-Security/frontend-real-estate-ledger.git
cd frontend-real-estate-ledger
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Runs the linter to check for code quality issues.

### `npm run preview`

Locally preview the production build after running `npm run build`.

### `npm run refresh-api-types`

**Important**: Run this command to pull the latest API schemas and generate TypeScript types from the backend.

This ensures your frontend code is in sync with the latest backend API changes. You should run this command:

- After pulling new changes from the repository
- When the backend API changes
- Before starting development on a new feature

## Project Structure

- `src/`: Source files
  - `components/`: Reusable UI components
  - `pages/`: Page components
  - `api/`: API related files, including generated types
  - `store/`: State management
  - `utils/`: Utility functions
  - `lib/`: Library code
  - `components/ui/`: Shared UI components

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui components

## Best Practices

- Run `npm run refresh-api-types` regularly to stay in sync with the backend
- Follow the established patterns for components and state management
- Use the available UI components from the `components/ui` directory
- Keep components modular and reusable
- Follow TypeScript best practices and maintain type safety

## Deployment

The application is configured to be deployed to a path: `/frontend-real-estate-ledger/`.

## License

[MIT](https://choosealicense.com/licenses/mit/)
