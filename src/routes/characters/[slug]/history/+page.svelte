<script lang="ts">
  export let data: { character: import('$lib/types/character').CharacterPageData };
  const { character } = data;
</script>

<h2 class="text-2xl font-semibold">History</h2>
{#each character.history as section}
  <h3 class="mt-4 text-lg font-semibold">{section.title}</h3>
  {@html section.body.split('\n\n').map(p=>`<p>${p}</p>`).join('')}
{/each}

