# Kearsarge Site

Interactive dossier for Tundra Seyfert and Tyrium research. The site includes an in-browser chat terminal that relays messages to a local llama.cpp instance through a SvelteKit server route, with lore content managed via Supabase and local context files.

## Requirements

- Node.js 18+
- npm 9+
- A running [llama.cpp](https://github.com/ggerganov/llama.cpp) server with `/completion` and `/health` endpoints
- A [Supabase](https://supabase.com/) project for authentication and content storage (Optional if mocking data, but configured for prod)

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
   | `SUPABASE_ANON_KEY` | Supabase anon/public API key | — |
   | `SERVICE_ROLE` | Supabase service role key (for server-side data fetching/admin) | — |

3. Start llama.cpp. A helper script is included and defaults to the Cydonia model.

   ```bash
   ./scripts/start_llamacpp.sh
   ```

4. Run the SvelteKit dev server.

   ```bash
   npm run dev
   ```

## Chat & Lore System

This project uses a hybrid context system for RAG (Retrieval-Augmented Generation):

### 1. Database Lore
Static dossier content, logs, and history are stored in Supabase and fetched on load.

### 2. Scenario Contexts
Dynamic, scenario-specific lore is managed via local TypeScript files in `src/lib/data/lore`.
- **Global Context**: `tundra-context.ts` and `tundra-physical-context.ts` are always available as a baseline.
- **Scenario Slices**: Specific files like `tundra-sauna-context.ts` or `tundra-gym-context.ts` are injected solely when the user is in that scenario mode.

### How to Add New Scenarios
1.  **Create Context File**: key/value pair in `src/lib/data/lore` (e.g., `tundra-bar-context.ts`).
2.  **Export Slices**: Define `ContextSlice[]` with relevant tags (e.g., `['bar', 'social']`).
3.  **Register Scenario**:
    -   Update `src/lib/server/context/loreRepository.ts` to import the file and add it to `SCENARIO_CONTEXT_REGISTRY`.
    -   Update `src/routes/+page.svelte` to add the new Scenario object to the `scenarios` array. Ensure the `loreTags` includes the key used in the registry (e.g., `'bar'`).

## Architecture

- `src/routes/api/chat/+server.ts`: Chat endpoint. Handles proper tagging and context retrieval.
- `src/lib/server/context/loreRepository.ts`: **Core Logic**. Selects and prioritizes context slices. Enforces isolation between scenarios (e.g., Gym lore doesn't leak into Sauna chat).
- `src/lib/server/llm/llama.ts`: Client for llama.cpp.
- `src/lib/components/TundraChat.svelte`: Frontend chat UI.

## Development Notes

- **Styling**: CSS-based (Tailwind ready).
- **Tests**: Run `npm test` or `npx vitest` to verify context selection logic.
