<script lang="ts">
  import { tundraKarsvaldr } from "$lib/data/tundraKarsvaldr";
  const data = tundraKarsvaldr;
  const paragraphs = (s: string) => s.split("\n\n");
  const hasImage = true;
  const imgSrc = "/images/tundra-karsvaldr.png";
  const imgAlt = "Portrait of Tundra Karsvaldr";
</script>

<svelte:head>
  <title>{data.hero.name}</title>
</svelte:head>

<section class="py-2">
  <header class="mb-4">
    <h1 class="text-4xl font-extrabold tracking-tight">{data.hero.name}</h1>
    {#if data.hero.tagline}
      <p class="mt-2 text-slate-600">{data.hero.tagline}</p>
    {/if}
  </header>

  {#if hasImage}
    <figure class="mx-auto max-w-md">
      <img src={imgSrc} alt={imgAlt} class="w-full rounded-2xl shadow-xl ring-1 ring-slate-200" loading="eager" decoding="async" />
      <figcaption class="mt-2 text-center text-sm text-slate-500">Image to be provided</figcaption>
    </figure>
  {/if}

  <nav class="mt-6 text-sm">
    <a href="#dossier" class="mr-3 underline">Dossier</a>
    <a href="#profile" class="mr-3 underline">Profile</a>
    <a href="#logs" class="underline">Logs</a>
  </nav>

  <section id="dossier" class="mt-8">
    <h2 class="text-2xl font-semibold">Dossier</h2>
    <p class="mt-2 text-slate-700">
      <strong>Classification:</strong> {data.dossier.classificationLevel} ·
      <strong>Subject:</strong> {data.dossier.subject}
    </p>
    <p class="text-slate-700">
      <strong>Origin:</strong> {data.dossier.fileOrigin} ·
      <strong>Last Update:</strong> {data.dossier.lastUpdate}
    </p>

    <h3 class="mt-6 text-xl font-semibold">Identification</h3>
    <ul class="list-disc pl-6">
      <li><strong>Aliases:</strong> {data.dossier.identification.aliases.join(", ")}</li>
      <li><strong>Species/Origin:</strong> {data.dossier.identification.speciesOrigin}</li>
      <li><strong>Age:</strong> {data.dossier.identification.ageRange}</li>
      <li><strong>Gender:</strong> {data.dossier.identification.gender}</li>
      <li><strong>Appearance:</strong>
        <ul class="list-[square] pl-6 mt-1">
          <li>Height: {data.dossier.identification.appearance.height}</li>
          <li>Weight: {data.dossier.identification.appearance.weight}</li>
          <li>Build: {data.dossier.identification.appearance.build}</li>
          <li>Fur Pattern: {data.dossier.identification.appearance.furPattern}</li>
          <li>Augmentations: {data.dossier.identification.appearance.augmentations}</li>
          <li>Cybernetics: {data.dossier.identification.appearance.cybernetics}</li>
          <li>Attire: {data.dossier.identification.appearance.attire}</li>
        </ul>
      </li>
    </ul>

    <h3 class="mt-6 text-xl font-semibold">Vessel</h3>
    <ul class="list-disc pl-6">
      <li><strong>Ship Class:</strong> {data.dossier.vessel.shipClass}</li>
      <li><strong>Designation:</strong> {data.dossier.vessel.designation}</li>
      <li><strong>Registry:</strong> {data.dossier.vessel.registryStatus}</li>
      <li><strong>FTL Status:</strong> {data.dossier.vessel.capabilities.ftlStatus}</li>
      <li><strong>Weapons:</strong> {data.dossier.vessel.capabilities.weapons.join(", ")}</li>
      <li><strong>Systems:</strong> {data.dossier.vessel.capabilities.systems.join(", ")}</li>
      <li><strong>Condition:</strong> {data.dossier.vessel.maintenanceCondition}</li>
    </ul>

    <h3 class="mt-6 text-xl font-semibold">Affiliations</h3>
    <ul class="list-disc pl-6">
      <li><strong>Employers:</strong> {data.dossier.affiliations.employersOfRecord.join(", ")}</li>
      <li><strong>Contacts:</strong> {data.dossier.affiliations.contacts.join(", ")}</li>
      <li><strong>Faction Relations:</strong>
        <ul class="list-[square] pl-6 mt-1">
          {#each data.dossier.affiliations.factionRelations as fr}
            <li>{fr.faction} — {fr.relation}</li>
          {/each}
        </ul>
      </li>
    </ul>

    <h3 class="mt-6 text-xl font-semibold">Operational</h3>
    <ul class="list-disc pl-6">
      <li><strong>Notable Engagements:</strong> {data.dossier.operational.notableEngagements}</li>
      <li><strong>Specializations:</strong> {data.dossier.operational.specializations.join(", ")}</li>
      <li><strong>Confirmed Kills:</strong> {data.dossier.operational.confirmedKills}</li>
      <li><strong>Reputation:</strong> {data.dossier.operational.reputationMarkers.join(", ")}</li>
    </ul>

    <h3 class="mt-6 text-xl font-semibold">Psych / Behavioral</h3>
    <ul class="list-disc pl-6">
      <li><strong>Temperament:</strong> {data.dossier.psych.temperament.join(", ")}</li>
      <li><strong>Motivations:</strong> {data.dossier.psych.motivations.join(", ")}</li>
      <li><strong>Weaknesses:</strong> {data.dossier.psych.weaknesses.join(", ")}</li>
      <li><strong>Evaluation:</strong> {data.dossier.psych.evaluation}</li>
    </ul>

    <h3 class="mt-6 text-xl font-semibold">Threat Assessment</h3>
    <ul class="list-disc pl-6">
      <li><strong>Combat Rating:</strong> {data.dossier.threat.combatRating}</li>
      <li><strong>Risk to Corporate Assets:</strong> {data.dossier.threat.riskToAssets}</li>
      <li><strong>Containment Options:</strong> {data.dossier.threat.containmentOptions.join(", ")}</li>
      <li><strong>Recommendation:</strong> {data.dossier.threat.recommendation}</li>
    </ul>

    {#if data.dossier.additionalNotes}
      <blockquote class="mt-4 italic text-slate-700">{data.dossier.additionalNotes}</blockquote>
    {/if}
  </section>

  <section id="profile" class="mt-10">
    <h2 class="text-2xl font-semibold">Profile</h2>
    {#each data.profile as section}
      <article class="mt-4">
        <h3 class="text-xl font-semibold">{section.title}</h3>
        {#each paragraphs(section.body) as para}
          <p class="mt-2 text-slate-800">{para}</p>
        {/each}
      </article>
    {/each}
  </section>

  <section id="logs" class="mt-10">
    <h2 class="text-2xl font-semibold">Logs</h2>
    <p class="mt-2 text-slate-700">Tap to expand individual log entries.</p>
    <div class="mt-4">
      {#each data.logs as log}
        <details class="mb-3 border rounded-md">
          <summary class="cursor-pointer px-3 py-2">
            <span class="font-semibold">Log {log.id} – {log.title}</span>
            <span class="ml-2 text-sm text-slate-600">{log.filedBy}</span>
          </summary>
          <div class="px-3 pb-3 text-slate-800 whitespace-pre-line">
            {log.body}
          </div>
        </details>
      {/each}
    </div>
  </section>
</section>
