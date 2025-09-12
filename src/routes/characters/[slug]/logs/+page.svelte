<script lang="ts">
  export let data: { character: import('$lib/types/character').CharacterPageData };
  const { character } = data;
  import { renderMarkdown } from '$lib/utils/markdown';
  const md = renderMarkdown;
</script>

<section class="max-w-prose">
  <h2 class="text-2xl font-semibold">Logs</h2>
  <p class="mt-2 text-slate-700">Tap to expand individual log entries.</p>
  <div class="mt-4">
    {#each character.logs as log}
      <details class="mb-3 border rounded-md">
        <summary class="cursor-pointer px-3 py-2">
          <span class="font-semibold">Log {log.id} – {log.title}</span>
          <span class="ml-2 text-sm text-slate-600">{log.filedBy}</span>
        </summary>
        <div class="px-3 pb-3 text-slate-800">
          {@html md(log.body)}
        </div>
      </details>
    {/each}
  </div>
</section>
