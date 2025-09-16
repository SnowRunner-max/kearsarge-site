<script lang="ts">
  import Timeline from '$lib/components/Timeline.svelte';

  export let data: { character: import('$lib/types/character').CharacterPageData };
  const { character } = data;
</script>

<h2 class="text-2xl font-semibold">History</h2>
<div class="history-grid">
  <article class="copy">
    {#each character.history as section}
      <h3 class="mt-4 text-lg font-semibold">{section.title}</h3>
      {#each section.body as para}
        <p>{para}</p>
      {/each}
    {/each}
  </article>
  <aside class="timeline-panel" aria-labelledby="timeline-heading">
    <h3 id="timeline-heading">Timeline</h3>
    <Timeline entries={character.timeline} aria-labelledby="timeline-heading" />
  </aside>
</div>

<style>
  .history-grid{display:grid;gap:2rem;align-items:start}
  @media(min-width:50rem){.history-grid{grid-template-columns:2fr 1fr}}
  .copy{line-height:1.7;font-size:1.05rem;max-width:75ch}
  .copy p{margin:0}
  .copy p + p{margin-top:.6rem}
  .copy h3{margin-top:1rem}
  .timeline-panel{background:#121212;border-radius:1rem;padding:1.5rem;color:#f3f3f3}
  .timeline-panel h3{margin:0 0 1rem;font-size:1.1rem;text-transform:uppercase;letter-spacing:.08em}
</style>
