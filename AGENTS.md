# Repository Guidelines

This is a SvelteKit project written in TypeScript. Follow the conventions below to keep the codebase consistent and maintainable.

## Project Structure & Module Organization
- `src/routes/` – SvelteKit pages and endpoints (`+page.svelte`, `+layout.ts`, `+server.ts`, etc.).
- `src/lib/` – Shared libraries.
  - `components/` – Reusable Svelte components.
  - `data/` – Domain models, data access, and repositories.
  - `types/` – Shared TypeScript `type`/`interface` declarations.
  - `utils/` – Helper functions; each utility should have a matching `*.test.ts`.
- `static/` – Static assets served directly.
- `tests/` – Cross‑module or integration/e2e tests.
- `docs/` – Architecture notes, diagrams, ADRs.

Co‑locate styles and tests with their feature when it improves clarity.

## Build, Test, and Development Commands
- `npm run dev` – Start local dev server with HMR.
- `npm run build` – Build for production.
- `npm run preview` – Preview the production build.
- `npm run check` – Type and Svelte checking (`svelte-check`).
- `npm run lint` – ESLint.
- `npm run format` – Prettier.
- `npm test` – Run Vitest unit tests once.
- `npm run test:watch` – Run tests in watch mode.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for TS/Svelte/JSON; 4 for any Python scripts.
- Filenames: `kebab-case`; Svelte components use `PascalCase.svelte`.
- Identifiers: `camelCase` for variables/functions, `PascalCase` for classes/types, `SCREAMING_SNAKE_CASE` for env keys.
- Use Prettier and ESLint (`npm run format`, `npm run lint`).
- TypeScript:
  - Enable strict mode in `tsconfig.json`.
  - Prefer `type`/`interface` for contracts.
  - Use `private`, `protected`, and `readonly` modifiers where appropriate.
  - Favor `async/await` over raw Promises.

## OOP & Design Principles
- Encapsulate domain/business logic in classes or modules inside `src/lib`.
- Apply SOLID principles:
  - **S**ingle Responsibility: each class or module serves one purpose.
  - **O**pen/Closed: extend via composition/inheritance without modifying core behavior.
  - **L**iskov Substitution: subclasses must be substitutable for their base types.
  - **I**nterface Segregation: keep interfaces small and focused.
  - **D**ependency Inversion: depend on abstractions; inject dependencies via constructor parameters.
- Limit business logic in Svelte components; delegate to services or stores.
- Document exported classes and public methods with TSDoc (`/** */`).

## Testing Guidelines

### Unit Tests
- Framework: [Vitest](https://vitest.dev).
- Location: co‑locate `*.test.ts` next to the unit under test or in `tests/unit`.
- Naming: `file.test.ts`.
- Use mocks/fakes for external calls (network, file system, timers).
- Cover edge cases and failure paths.
- Run `npm test` before committing; `vitest --coverage` to check coverage (goal ≥ 80%).

### Integration / E2E Tests
- Tools: Playwright or SvelteKit test runner (if configured).
- Location: `tests/integration/` or `tests/e2e/`.
- Focus on real component/route interaction, not unit details.
- Reset state between tests (e.g., using fixtures or setup/teardown hooks).
- Keep tests deterministic and avoid reliance on real external services.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- One logical change per commit; include tests and docs with code changes.
- PRs should be small and focused, with a clear description and linked issues (`Closes #123`).
- Provide screenshots or gifs for UI changes.
- Ensure `npm run lint`, `npm test`, and any integration tests pass before requesting review.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` for local secrets and keep `.env.example` updated.
- Lock dependency versions; run `npm audit` regularly.
- For security-sensitive code (auth, storage, headers), request additional review.

## Documentation
- Update `README.md` or `docs/` when adding or altering features.
- Include usage examples and TSDoc for reusable utilities or classes.
