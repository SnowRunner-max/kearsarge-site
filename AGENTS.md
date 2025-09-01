# Repository Guidelines

## Project Structure & Module Organization
- `src/`: Application code (components, pages, utilities).
- `public/` or `static/`: Static assets served as-is (images, icons, fonts).
- `assets/`: Source assets (unoptimized images, styles) processed at build time.
- `tests/`: Unit/integration tests; mirrors `src/` structure.
- `scripts/`: Local developer scripts (build, release, tooling).
- `docs/`: Architecture notes, ADRs, diagrams.

If a framework is used, prefer its standard layout (e.g., Next.js `app/` or `pages/`). Co-locate tests and styles with features when it improves readability.

## Build, Test, and Development Commands
- `npm run dev` or `pnpm dev`: Start local dev server with HMR.
- `npm run build`: Produce production build to `dist/` or `.next/`.
- `npm test` (or `pnpm test`): Run unit tests once; `test:watch` for TDD.
- `npm run lint` / `npm run format`: Lint and auto-format the codebase.
- `make <target>`: If a `Makefile` exists, prefer its tasks (e.g., `make build`).

Check `package.json` and `Makefile` for the authoritative task list.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for JS/TS/JSON, 4 for Python scripts.
- Filenames: `kebab-case` for files, `PascalCase` for React/Vue components.
- Identifiers: `camelCase` for variables/functions; `SCREAMING_SNAKE_CASE` for env keys.
- Tools: Prefer Prettier for formatting and ESLint/TypeScript for linting if configured (`npm run lint:fix`, `npm run format`).

## Testing Guidelines
- Frameworks: Jest or Vitest for unit tests; Playwright/Cypress for e2e if present.
- Location: `tests/` or `src/**/__tests__/**`.
- Naming: `*.test.ts` or `*.spec.ts` (match project language).
- Coverage: Aim ≥ 80%; run `npm run test:coverage` when available.

## Commit & Pull Request Guidelines
- Commits: Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`). One logical change per commit.
- PRs: Small, focused; include description, linked issues (`Closes #123`), screenshots for UI, and notes on testing/impact.
- Checks: Ensure CI passes (build, test, lint) before requesting review.

## Security & Configuration Tips
- Secrets: Never commit secrets. Use `.env.local` and provide `.env.example`.
- Reviews: Flag security-relevant changes (auth, secrets, headers) for additional review.
- Dependencies: Prefer pinned versions; run `npm audit` periodically.

