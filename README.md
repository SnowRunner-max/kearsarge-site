# Kearsarge Site

Interactive dossier for Tundra Seyfert and Tyrium research. The site now includes an in-browser chat terminal that relays messages to a local llama.cpp instance through a SvelteKit server route.

## Requirements

- Node.js 18+
- npm 9+
- A running [llama.cpp](https://github.com/ggerganov/llama.cpp) server with `/completion` and `/health` endpoints

## Setup

1. Install dependencies.

   ```bash
   npm install
   ```

2. Copy the environment template and adjust values as needed.

   ```bash
   cp .env.example .env
   ```

   Environment variables:

   | Variable | Description | Default |
   | --- | --- | --- |
   | `LLAMA_CPP_URL` | Base URL for the llama.cpp HTTP server | `http://localhost:8080` |
   | `SUPABASE_URL` | Supabase project URL from Project Settings → API | — |
   | `SUPABASE_ANON_KEY` | Supabase anon/public API key from the same page | — |

3. Start llama.cpp. A helper script is included and defaults to the Cydonia model stored at `/home/tjb/Models/TheDrummer_Cydonia-24B-v4.1-Q5_K_M.gguf`.

   ```bash
   ./scripts/start_llamacpp.sh
   ```

   Provide a custom model path if you keep GGUF files elsewhere.

   ```bash
   ./scripts/start_llamacpp.sh /absolute/path/to/your-model.gguf
   ```

4. Run the SvelteKit dev server.

   ```bash
   npm run dev
   ```

## Supabase Authentication

Supabase backs the login/signup flow and guards the chat API. Configure it before attempting to access the dossier outside of `/login`:

1. Create or sign into [Supabase](https://supabase.com/), then create a new project. Follow the “Create a project” steps in Supabase docs if you need a refresher on organization/billing requirements.
2. In Supabase Studio open **Project Settings → API** and copy the **Project URL** and **anon public** key. Paste them into `SUPABASE_URL` and `SUPABASE_ANON_KEY` in your `.env`, then restart the dev server so SvelteKit sees the new variables.
3. Go to **Authentication → Providers → Email**. Enable the provider, ensure “Disable email signups” is off, and (for dev) disable email confirmations so `/auth/v1/signup` returns a session immediately. Re-enable confirmation later if you need verified accounts.
4. In **Authentication → URL Configuration** add your dev origin `http://localhost:5173` (and any production hosts) to the redirect allow-list.
5. Optional but recommended: check **Authentication → Providers → Email → Advanced** to confirm hCaptcha/recaptcha are disabled unless you plan to supply tokens from the frontend.

### How the site uses Supabase

- `src/routes/login/+page.svelte` posts to `/api/auth/signup` and `/api/auth/login`, which proxy to Supabase’s REST API (`src/routes/api/auth/*`).
- `src/hooks.server.ts` resolves cookies issued by Supabase so authenticated users populate `event.locals` on every request.
- `src/routes/+layout.server.ts` redirects unauthenticated visitors to `/login`, and the chat endpoint at `src/routes/api/chat/+server.ts` rejects requests unless a Supabase user is present.

If you change Supabase policies or introduce additional tables, update the auth helper in `src/lib/server/auth/supabase.ts` and the client-side form accordingly.

## Chat Architecture

- `src/routes/api/chat/+server.ts` – SvelteKit endpoint that sanitises conversation history, assembles the prompt, and forwards it to llama.cpp.
- `src/lib/server/chat/prompt.ts` – Handles prompt construction and will be the anchor point for future lore/context enrichment.
- `src/lib/server/llm/llama.ts` – Thin client responsible for making HTTP requests to llama.cpp.
- `src/lib/components/TundraChat.svelte` – Frontend chat UI without Tailwind, styled to match the dossier aesthetic.

Conversation history is kept in-memory on the client; the server caps history to the most recent turns before building prompts. Future persistence or multi-character support can be layered over the same interfaces.

## Development Notes

- With the move to server routes, the project now uses `@sveltejs/adapter-auto`. Static-only builds are no longer supported without additional backend hosting for the chat API.
- Styling remains CSS-based; Tailwind can be introduced later if we decide to move in that direction.
- Additional lore ingestion will plug into the `contextSlices` parameter in `buildChatPrompt`.

## Lore Content Pipeline

- Author editable lore inside `content/` (e.g. `content/characters/tundra`). Each section lives in Markdown with YAML front matter.
- Run `npm run lore:build` to regenerate TypeScript bundles in `src/lib/generated/`. This now happens automatically before `dev`/`build`.
- Use `npm run lore:seed` once if you need to regenerate the Markdown files from the legacy TypeScript source.
- Generated bundles expose characters and context slices which power both the dossier UI and chat grounding.
