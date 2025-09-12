<script lang="ts">
  export let data: { character: import('$lib/types/character').CharacterPageData };
  const { character } = data;
</script>

<section class="max-w-prose">
  <h2 class="text-2xl font-semibold">Dossier</h2>
  <p class="mt-2 text-slate-700">
    <strong>Classification:</strong> {character.dossier.classificationLevel} ·
    <strong>Subject:</strong> {character.dossier.subject}
  </p>
  <p class="text-slate-700">
    <strong>Origin:</strong> {character.dossier.fileOrigin} ·
    <strong>Last Update:</strong> {character.dossier.lastUpdate}
  </p>

  <h3 class="mt-6 text-xl font-semibold">Identification</h3>
  <ul class="list-disc pl-6">
    <li><strong>Aliases:</strong> {character.dossier.identification.aliases.join(', ')}</li>
    <li><strong>Species/Origin:</strong> {character.dossier.identification.speciesOrigin}</li>
    <li><strong>Age:</strong> {character.dossier.identification.ageRange}</li>
    <li><strong>Gender:</strong> {character.dossier.identification.gender}</li>
    <li><strong>Appearance:</strong>
      <ul class="list-[square] pl-6 mt-1">
        <li>Height: {character.dossier.identification.appearance.height}</li>
        <li>Weight: {character.dossier.identification.appearance.weight}</li>
        <li>Build: {character.dossier.identification.appearance.build}</li>
        <li>Fur Pattern: {character.dossier.identification.appearance.furPattern}</li>
        <li>Augmentations: {character.dossier.identification.appearance.augmentations}</li>
        <li>Cybernetics: {character.dossier.identification.appearance.cybernetics}</li>
        <li>Attire: {character.dossier.identification.appearance.attire}</li>
      </ul>
    </li>
  </ul>

  <h3 class="mt-6 text-xl font-semibold">Vessel</h3>
  <ul class="list-disc pl-6">
    <li><strong>Ship Class:</strong> {character.dossier.vessel.shipClass}</li>
    <li><strong>Designation:</strong> {character.dossier.vessel.designation}</li>
    <li><strong>Registry:</strong> {character.dossier.vessel.registryStatus}</li>
    <li><strong>FTL Status:</strong> {character.dossier.vessel.capabilities.ftlStatus}</li>
    <li><strong>Weapons:</strong> {character.dossier.vessel.capabilities.weapons.join(', ')}</li>
    <li><strong>Systems:</strong> {character.dossier.vessel.capabilities.systems.join(', ')}</li>
    <li><strong>Condition:</strong> {character.dossier.vessel.maintenanceCondition}</li>
  </ul>

  <h3 class="mt-6 text-xl font-semibold">Affiliations</h3>
  <ul class="list-disc pl-6">
    <li><strong>Employers:</strong> {character.dossier.affiliations.employersOfRecord.join(', ')}</li>
    <li><strong>Contacts:</strong> {character.dossier.affiliations.contacts.join(', ')}</li>
    <li><strong>Faction Relations:</strong>
      <ul class="list-[square] pl-6 mt-1">
        {#each character.dossier.affiliations.factionRelations as fr}
          <li>{fr.faction} — {fr.relation}</li>
        {/each}
      </ul>
    </li>
  </ul>

  <h3 class="mt-6 text-xl font-semibold">Operational</h3>
  <ul class="list-disc pl-6">
    <li><strong>Notable Engagements:</strong> {character.dossier.operational.notableEngagements}</li>
    <li><strong>Specializations:</strong> {character.dossier.operational.specializations.join(', ')}</li>
    <li><strong>Confirmed Kills:</strong> {character.dossier.operational.confirmedKills}</li>
    <li><strong>Reputation:</strong> {character.dossier.operational.reputationMarkers.join(', ')}</li>
  </ul>

  <h3 class="mt-6 text-xl font-semibold">Psych / Behavioral</h3>
  <ul class="list-disc pl-6">
    <li><strong>Temperament:</strong> {character.dossier.psych.temperament.join(', ')}</li>
    <li><strong>Motivations:</strong> {character.dossier.psych.motivations.join(', ')}</li>
    <li><strong>Weaknesses:</strong> {character.dossier.psych.weaknesses.join(', ')}</li>
    <li><strong>Evaluation:</strong> {character.dossier.psych.evaluation}</li>
  </ul>

  <h3 class="mt-6 text-xl font-semibold">Threat Assessment</h3>
  <ul class="list-disc pl-6">
    <li><strong>Combat Rating:</strong> {character.dossier.threat.combatRating}</li>
    <li><strong>Risk to Corporate Assets:</strong> {character.dossier.threat.riskToAssets}</li>
    <li><strong>Containment Options:</strong> {character.dossier.threat.containmentOptions.join(', ')}</li>
    <li><strong>Recommendation:</strong> {character.dossier.threat.recommendation}</li>
  </ul>

  {#if character.dossier.additionalNotes}
    <blockquote class="mt-4 italic text-slate-700">{character.dossier.additionalNotes}</blockquote>
  {/if}
</section>

