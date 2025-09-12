<script lang="ts">
  export let data: { character: import('$lib/types/character').CharacterPageData };
  const { character } = data;
  const hasImage = true;
  const imgSrc = '/images/tundra-karsvaldr.png';
  const imgAlt = `Portrait of ${character.hero.name}`;
</script>

{#if hasImage}
  <figure class="mx-auto max-w-md">
    <img src={imgSrc} alt={imgAlt} class="w-full rounded-2xl shadow-xl ring-1 ring-slate-200" loading="eager" decoding="async" />
    <figcaption class="mt-2 text-center text-sm text-slate-500">Image to be provided</figcaption>
  </figure>
{/if}

<article class="mt-6 max-w-prose">
  <h2 class="text-xl font-semibold">Quick Facts</h2>
  <ul class="mt-2 list-disc pl-6 text-slate-800">
    <li><strong>Aliases:</strong> {character.dossier.identification.aliases.join(', ')}</li>
    <li><strong>Species:</strong> {character.dossier.identification.speciesOrigin}</li>
    <li><strong>Vessel:</strong> {character.dossier.vessel.designation} ({character.dossier.vessel.shipClass})</li>
    <li><strong>Affiliations:</strong> {character.dossier.affiliations.factionRelations.map(fr=>`${fr.faction} (${fr.relation})`).join(', ')}</li>
  </ul>
</article>

