<script lang="ts">
  export let data: { character: import('$lib/types/character').CharacterPageData };
  const { character } = data;
</script>

<h2 class="text-2xl font-semibold">History</h2>
<article class="copy">
  {#each character.history as section}
    <h3 class="mt-4 text-lg font-semibold">{section.title}</h3>
    {#each section.body.split('\n\n') as para}
      <p>{para}</p>
    {/each}
  {/each}
</article>

<style>
  .copy{line-height:1.7; font-size:1.05rem; max-width:75ch}
  .copy p{margin:0}
  .copy p + p{margin-top:.6rem}
  .copy h3{margin-top:1rem}
</style>
