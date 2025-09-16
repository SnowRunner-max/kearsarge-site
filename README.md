# Seyfert Index – Tundra Karsvaldr

This repository contains a SvelteKit-powered dossier for the Seyfert Systems universe, focused on the operative known as **Tundra Karsvaldr**. The app renders lore-rich data across overview, dossier, history, and log sections, drawing from structured TypeScript sources as well as long-form narrative notes kept under `kearsarge-vault/`.

## Key Features
- **Tabbed dossier interface** that routes to overview, detailed dossier, history, and log pages for each character (`/characters/[slug]/…`).
- **Data-driven character model** defined in `src/lib/types/character.ts` and populated via `src/lib/data/characters/`, enabling additional characters to be added by registering their data module.
- **Lore timeline support** that pairs long-form history prose with timestamped bullet highlights.
- **Custom Markdown renderer** (`src/lib/utils/markdown.ts`) for controlled rich text inside log entries.
- **Accessible UI scaffolding** including keyboard focusable tabs, semantic tables, definition lists, and detail accordions.

## Latest Updates (branch `add-timeline`)
- Added a `timeline` field to the character schema and supplied canonical timeline data for Tundra (`src/lib/data/characters/tundra-karsvaldr.ts`).
- Extended the History view (`src/routes/characters/[slug]/history/+page.svelte`) to display a vertical timeline alongside narrative sections.
- Hardened the character registry with **new Vitest coverage** (`src/lib/data/characters/index.test.ts`) validating timeline entries in addition to registry lookups.
- Updated styles across the primary landing page (`src/routes/+page.svelte`) so the new timeline and vessel data render within tab content.

## Getting Started
1. Install dependencies with `npm install` (Node 18+ recommended).
2. Run `npm run dev` to start the local Vite dev server with hot module replacement.
3. Visit the Seyfert Index at the URL printed in the terminal (defaults to http://localhost:5173).

### Common Scripts
- `npm run dev` – Start the dev server.
- `npm run build` – Produce a production build (adapter-static).
- `npm run preview` – Serve the production build locally.
- `npm run check` – Run Svelte type and lint checks.
- `npm run lint` – Execute ESLint across the repo.
- `npm run format` – Format files with Prettier.
- `npm test` / `npm run test:watch` – Execute Vitest once or in watch mode.

## Project Structure
```
├─ src/
│  ├─ lib/
│  │  ├─ data/characters/    # Typed character data + registry tests
│  │  ├─ types/              # Shared TypeScript models
│  │  └─ utils/              # Markdown renderer + tests
│  └─ routes/                # SvelteKit pages (overview, dossier, history, logs)
├─ static/images/            # Character artwork served statically
└─ kearsarge-vault/          # Narrative source material and reference dossiers
```

## Content & Data Notes
- Character information is sourced from strongly typed modules; adding a new character involves exporting a `CharacterPageData` object and registering it inside `src/lib/data/characters/index.ts`.
- Long-form lore artifacts (logs, dossier notes, etc.) are preserved in Markdown files under `kearsarge-vault/Tundra Seyfert/` for reference and future import.
- The custom Markdown renderer intentionally supports a narrow subset (headings, emphasis, unordered lists, paragraphs) to keep rendered logs safe and styled.

## Testing
Vitest is configured for unit coverage:
- `src/lib/data/characters/index.test.ts` exercises the registry helpers and validates timeline completeness.
- `src/lib/utils/markdown.test.ts` ensures the Markdown renderer outputs expected HTML fragments and escapes unsafe input.

Run `npm test` to execute the suite, or `npm run test:watch` while iterating.

## Contributing
Follow the repository guidelines in `AGENTS.md` for coding standards, commit conventions, and testing expectations. When extending the lore or adding characters, keep tests updated so new structures remain type-safe and renderable within the dossier views.
