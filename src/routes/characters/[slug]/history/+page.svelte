<script lang="ts">
  export let data: { character: import('$lib/types/character').CharacterPageData };
  const { character } = data;
</script>

<h2 class="text-2xl font-semibold">History</h2>
<div class="history-grid">
  <article class="copy">
    {#each character.history as section}
      <h3 class="mt-4 text-lg font-semibold">{section.title}</h3>
      {#each section.body.split('\n\n') as para}
        <p>{para}</p>
      {/each}
    {/each}
  </article>
  <aside class="timeline" aria-labelledby="timeline-heading">
    <h3 id="timeline-heading">Timeline</h3>
    <ol>
      {#each character.timeline as entry}
        <li>
          <h4>{entry.title}</h4>
          <ul>
            {#each entry.body as item}
              <li>{item}</li>
            {/each}
          </ul>
        </li>
      {/each}
    </ol>
  </aside>
</div>

<style>
  .history-grid{display:grid;gap:2rem;align-items:start}
  @media(min-width:50rem){.history-grid{grid-template-columns:2fr 1fr}}
  .copy{line-height:1.7;font-size:1.05rem;max-width:75ch}
  .copy p{margin:0}
  .copy p + p{margin-top:.6rem}
  .copy h3{margin-top:1rem}
  .timeline{background:#121212;border-radius:1rem;padding:1.5rem;color:#f3f3f3}
  .timeline h3{margin:0 0 1rem;font-size:1.1rem;text-transform:uppercase;letter-spacing:.08em}
  .timeline ol{list-style:none;padding:0 0 0 1.5rem;margin:0;border-left:1px solid rgba(210,125,45,.45);display:flex;flex-direction:column;gap:1.5rem}
  .timeline li{position:relative;padding-left:1rem}
  .timeline li::before{content:"";position:absolute;left:-1.23rem;top:.35rem;width:.5rem;height:.5rem;border-radius:50%;background:#d27d2d}
  .timeline h4{margin:0;font-size:1rem;font-weight:600}
  .timeline ul{margin:.5rem 0 0 0;padding-left:1rem;font-size:.95rem;line-height:1.5}
  .timeline ul li{list-style:disc}
  .timeline ul li + li{margin-top:.4rem}
</style>
