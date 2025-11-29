# Kearsarge Site

Interactive dossier for Tundra Seyfert and Tyrium research. The site includes an in-browser chat terminal that relays messages to a local llama.cpp instance through a SvelteKit server route, with lore content managed via Supabase.

## Requirements

- Node.js 18+
- npm 9+
- A running [llama.cpp](https://github.com/ggerganov/llama.cpp) server with `/completion` and `/health` endpoints
- A [Supabase](https://supabase.com/) project for authentication and content storage

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

## Supabase Integration

This project uses Supabase for both Authentication and Content Management.

### Authentication
Supabase backs the login/signup flow and guards the chat API.
- **Login/Signup**: Handled via `src/routes/login/+page.svelte` proxying to Supabase REST API.
- **Session Management**: `src/hooks.server.ts` manages cookies and populates `event.locals`.
- **Protection**: Unauthenticated users are redirected to `/login`.

### Lore Content
Character data, history, timelines, and logs are stored in Supabase tables:
- `characters`
- `character_history`
- `character_timeline`
- `character_logs`

The application fetches this data server-side (`src/routes/+page.server.ts`) and passes it to the frontend.

## Chat Architecture

- `src/routes/api/chat/+server.ts`: SvelteKit endpoint that sanitizes history, retrieves context, builds the prompt, and forwards it to llama.cpp.
- `src/lib/server/context/loreRepository.ts`: Dynamically fetches character data from Supabase and generates context slices for RAG (Retrieval-Augmented Generation).
- `src/lib/server/llm/llama.ts`: Client for llama.cpp requests.
- `src/lib/components/TundraChat.svelte`: Frontend chat UI.

## Development Notes

- **Styling**: CSS-based (Tailwind ready but not fully adopted for all components).
- **Data Source**: All lore content is now database-driven. There are no local markdown files for content.
