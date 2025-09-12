<script lang="ts">
  export let data: { slug: string; character: import('$lib/types/character').CharacterPageData };
  const { character, slug } = data;
</script>

<svelte:head>
  <title>{character.hero.name}</title>
</svelte:head>

<section class="py-2">
  <header class="mb-4">
    <h1 class="text-3xl font-bold tracking-tight">{character.hero.name}</h1>
    {#if character.hero.tagline}
      <p class="mt-2 text-slate-700">{character.hero.tagline}</p>
    {/if}
  </header>

  <nav class="text-sm flex gap-4">
    <a class="underline" href={`/characters/${slug}/overview`}>Overview</a>
    <a class="underline" href={`/characters/${slug}/dossier`}>Dossier</a>
    <a class="underline" href={`/characters/${slug}/profile`}>Profile</a>
    <a class="underline" href={`/characters/${slug}/logs`}>Logs</a>
  </nav>

  <hr class="my-4" />
  <slot />
</section>

