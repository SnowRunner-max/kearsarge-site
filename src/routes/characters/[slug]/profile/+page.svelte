<script lang="ts">
  export let data: { character: import('$lib/types/character').CharacterPageData };
  const { character } = data;
  const paragraphs = (s: string) => s.split('\n\n');
</script>

<section class="max-w-prose">
  <h2 class="text-2xl font-semibold">Profile</h2>
  {#each character.profile as section}
    <article class="mt-4">
      <h3 class="text-xl font-semibold">{section.title}</h3>
      {#each paragraphs(section.body) as para}
        <p class="mt-2 text-slate-800">{para}</p>
      {/each}
    </article>
  {/each}
</section>

