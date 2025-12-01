<script lang="ts">
  import Timeline from "$lib/components/Timeline.svelte";
  import TundraChat from "$lib/components/TundraChat.svelte";
  import Panel from "$lib/components/ui/Panel.svelte";
  import DataRow from "$lib/components/ui/DataRow.svelte";
  import TabButton from "$lib/components/ui/TabButton.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  $: character = data.character;
  import { tyriumFieldGuide } from "$lib/data/tyrium/field-guide";
  import { renderMarkdown } from "$lib/utils/markdown";
  import { sendChatMessage } from "$lib/client/chat";
  import type { ChatMessage } from "$lib/types/chat";

  type Tab = "overview" | "chat" | "dossier" | "history" | "tyrium" | "logs";
  type TyriumTab = "field-guide";
  let active: Tab = "overview";
  let tyriumActive: TyriumTab = "field-guide";
  const setActive = (id: string): void => {
    active = id as Tab;
  };
  const setTyriumActive = (id: TyriumTab): void => {
    tyriumActive = id;
  };

  $: aliases = character.dossier.identification.aliases.join(", ");
  $: height = character.dossier.identification.appearance.height;
  $: weight = character.dossier.identification.appearance.weight;
  $: combatClass = character.dossier.combatClass;
  $: currentStatus = character.dossier.currentStatus;
  $: vessel = character.dossier.vessel;
  const traits = "Tyrium enhancements, cryo-kinetics"; // summarize from existing content
  const heroImg = "/images/tundra-karsvaldr.png"; // optional image

  const MAX_CHAT_HISTORY = 50;

  interface Scenario {
    id: string;
    title: string;
    description: string;
    context: string;
    openingMessage: string;
  }

  const scenarios: Scenario[] = [
    {
      id: "sauna",
      title: "The Sauna",
      description: "Relaxing in the heat after a long day.",
      context: `Scene: The Sauna
- Tundra is lounging in the on-station sauna after a mission
- Mood: relaxation and recovery, flirtatious
- Tundra is alone
- The room is a dimly lit dry sauna with rich wood paneling and live coals with water dipper for steam
- Tundra is wearing a linen towel around his waist but is otherwise unclothed
- Open to activities: stretching, flirtation, banter, backstory exploration, character growth`,
      openingMessage:
        "Tundra leaned back in the sauna, arms stretched out over the heat-soaked wood. He looked like he didn't have a care in the world. That broad grin, an ever broader chest, and legs spread casually wide--that confidence dripped from him like sweat from his chin. His head tilted to the side as the door to the sauna opened, a stranger wandering in. The malamute's eyes caught the warm light of the heated room.",
    },
    {
      id: "gym",
      title: "The Gym",
      description: "Pushing limits and breaking sweats.",
      context: `Scene: The Gym
- Tundra is working out after hours in the Seyfert Orbital Station gym.
- Mood: stressed out from a difficult mission; aggressive; on edge
- Tundra is alone
- He is working out harder than usual
- He is wearing white compression shorts and black gym shorts; he is not wearing shoes or a shirt
- May be on the verge of a Tyrium Uplift for himself (empowerment and physical evolution)
- Open to activities: hard exercise, flirtation, sparring, competition`,
      openingMessage:
        "Tundra squeezed at the peak of the curl, both biceps straining against the weight. The pump pushed his muscles against his pelt, the fibers straining against the resistance. Sweat dripped off his chin to patter on the arm rest, but the canine was all smirks and smiles. He lived for this--the challenge. The fight. And, he's so focused on his own strength and training that he doesn't hear his comrade enter.",
    },
  ];

  let selectedScenario: Scenario | null = null;
  let chatMessages: ChatMessage[] = [];
  let chatProcessing = false;

  function selectScenario(scenario: Scenario): void {
    selectedScenario = scenario;
    chatMessages = [{ role: "assistant", content: scenario.openingMessage }];
  }

  function trimChatMessages(): void {
    const windowSize = MAX_CHAT_HISTORY * 2;
    if (chatMessages.length > windowSize) {
      chatMessages = chatMessages.slice(-windowSize);
    }
  }

  async function handleChatSend(
    event: CustomEvent<{ message: string }>,
  ): Promise<void> {
    const userMessage = event.detail.message;
    const history = chatMessages.slice(-MAX_CHAT_HISTORY);

    chatMessages = [...chatMessages, { role: "user", content: userMessage }];
    chatProcessing = true;

    try {
      const { response } = await sendChatMessage({
        message: userMessage,
        history,
        scenario: selectedScenario ? [selectedScenario.context] : [],
      });

      chatMessages = [
        ...chatMessages,
        { role: "assistant", content: response },
      ];
      trimChatMessages();
    } catch (error) {
      console.error("Chat request failed", error);
      chatMessages = [
        ...chatMessages,
        {
          role: "assistant",
          content:
            "*Shakes out my paws.* Something jammed in the relay. Say it again once more and I will make sure it gets through.",
        },
      ];
      trimChatMessages();
    } finally {
      chatProcessing = false;
    }
  }
</script>

<svelte:head>
  <title>Seyfert Index // TUNDRA</title>
</svelte:head>

<header
  class="sticky top-0 z-40 border-b-2 border-gold bg-gradient-to-b from-panel-2 to-[#171717f5] backdrop-blur-[4px] backdrop-saturate-[1.2]"
>
  <div class="mx-auto flex max-w-site items-center justify-between px-5 py-4">
    <div class="flex items-center gap-3">
      <div
        class="relative h-[26px] w-[26px] -skew-x-12 border-2 border-gold after:absolute after:-right-[6px] after:-top-[6px] after:h-0 after:w-0 after:border-b-[12px] after:border-l-[12px] after:border-t-[12px] after:border-b-transparent after:border-l-transparent after:border-t-gold after:drop-shadow-[0_0_6px_rgba(226,176,7,.35)]"
        aria-hidden="true"
      ></div>
      <div class="font-oswald font-semibold uppercase tracking-[0.12em]">
        Seyfert Index // TUNDRA
      </div>
    </div>
    <div class="flex gap-3">
      <div class="border border-line px-2 py-1 text-[0.8rem] text-muted">
        Classification: {character.dossier.classificationLevel}
      </div>
      <div class="border border-line px-2 py-1 text-[0.8rem] text-muted">
        Last Update: {character.dossier.lastUpdate}
      </div>
    </div>
  </div>
  <div
    class="mx-auto flex max-w-site flex-wrap gap-4 px-5 pb-3"
    role="tablist"
    aria-label="Sections"
  >
    <TabButton
      id="overview"
      label="Overview"
      active={active === "overview"}
      on:click={(e) => setActive(e.detail)}
    />
    <TabButton
      id="chat"
      label="Chat"
      active={active === "chat"}
      on:click={(e) => setActive(e.detail)}
    />
    <TabButton
      id="dossier"
      label="Dossier"
      active={active === "dossier"}
      on:click={(e) => setActive(e.detail)}
    />
    <TabButton
      id="history"
      label="History"
      active={active === "history"}
      on:click={(e) => setActive(e.detail)}
    />
    <TabButton
      id="tyrium"
      label="Tyrium"
      active={active === "tyrium"}
      on:click={(e) => setActive(e.detail)}
    />
    <TabButton
      id="logs"
      label="Logs"
      active={active === "logs"}
      on:click={(e) => setActive(e.detail)}
    />
  </div>
</header>

<main class="mx-auto max-w-site px-5 py-4 pb-12">
  <!-- OVERVIEW -->
  <div
    id="overview"
    role="tabpanel"
    aria-labelledby="tab-overview"
    hidden={active !== "overview"}
  >
    <h2 class="mb-3 font-oswald text-gold uppercase tracking-[0.14em]">
      Overview
    </h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
      <div
        class="relative aspect-[4/5] border border-line bg-[#0f0f0f] bg-cover bg-center before:absolute before:-right-[1px] before:-top-[1px] before:h-0 before:w-0 before:border-b-[22px] before:border-l-[22px] before:border-t-[22px] before:border-b-transparent before:border-l-transparent before:border-t-gold before:drop-shadow-[0_0_6px_rgba(226,176,7,.3)]"
        aria-label="Main character image"
        style={`background-image:url('${heroImg}')`}
      ></div>
      <Panel class="p-4">
        <h3 class="mb-2 font-oswald tracking-[0.1em] text-white uppercase">
          Quick Facts
        </h3>
        <dl class="m-0 grid grid-cols-2 gap-x-4 gap-y-2">
          <dt class="text-muted">Name</dt>
          <dd class="m-0 text-white">{character.hero.name}</dd>
          <dt class="text-muted">Alias</dt>
          <dd class="m-0 text-white">{aliases}</dd>
          <dt class="text-muted">Height</dt>
          <dd class="m-0 text-white">{height}</dd>
          <dt class="text-muted">Weight</dt>
          <dd class="m-0 text-white">{weight}</dd>
          <dt class="text-muted">Class</dt>
          <dd class="m-0 text-white">{combatClass}</dd>
          <dt class="text-muted">Traits</dt>
          <dd class="m-0 text-white">{traits}</dd>
        </dl>
        <div class="mt-4 flex flex-wrap gap-2">
          <span class="border border-line px-2 py-1 text-[0.75rem] text-gold"
            >Status: {currentStatus.status}</span
          >
          <span class="border border-line px-2 py-1 text-[0.75rem] text-gold"
            >Classification: {currentStatus.classification}</span
          >
          <span class="border border-line px-2 py-1 text-[0.75rem] text-gold"
            >Region: {currentStatus.region}</span
          >
        </div>
      </Panel>
    </div>
  </div>

  <!-- CHAT -->
  <div
    id="chat"
    role="tabpanel"
    aria-labelledby="tab-chat"
    hidden={active !== "chat"}
  >
    <h2 class="mb-3 font-oswald text-gold uppercase tracking-[0.14em]">
      Tundra Link
    </h2>

    {#if !selectedScenario}
      <div class="mx-auto my-6 max-w-[840px] grid gap-4 md:grid-cols-2">
        {#each scenarios as scenario}
          <button
            class="text-left p-6 border border-line bg-panel hover:border-gold transition-colors group"
            on:click={() => selectScenario(scenario)}
          >
            <h3
              class="text-xl font-oswald text-white mb-2 group-hover:text-gold"
            >
              {scenario.title}
            </h3>
            <p class="text-muted text-sm">{scenario.description}</p>
          </button>
        {/each}
      </div>
    {:else}
      <div class="mx-auto my-6 max-w-[840px]">
        <TundraChat
          messages={chatMessages}
          isProcessing={chatProcessing}
          on:sendMessage={handleChatSend}
        />
      </div>
    {/if}
  </div>

  <!-- DOSSIER -->
  <div
    id="dossier"
    role="tabpanel"
    aria-labelledby="tab-dossier"
    hidden={active !== "dossier"}
  >
    <h2 class="mb-3 font-oswald text-gold uppercase tracking-[0.14em]">
      Dossier
    </h2>
    <div class="grid grid-cols-12 gap-4">
      <Panel class="col-span-12" title="Identity">
        <div class="grid grid-cols-2 gap-3 p-4">
          <DataRow label="Name" value={character.hero.name} />
          <DataRow label="Aliases" value={aliases} />
          <DataRow
            label="Species/Origin"
            value={character.dossier.identification.speciesOrigin}
          />
          <DataRow
            label="Gender"
            value={character.dossier.identification.gender}
          />
          <DataRow
            label="Classification"
            value={character.dossier.classificationLevel}
          />
          <DataRow label="File Origin" value={character.dossier.fileOrigin} />
          <DataRow label="Last Update" value={character.dossier.lastUpdate} />
          <DataRow label="Subject" value={character.dossier.subject} />
        </div>
      </Panel>

      <Panel class="col-span-12" title="Physiology / Metrics">
        <div class="p-4">
          <table
            class="w-full min-w-[560px] border-collapse"
            aria-label="Metrics table"
          >
            <thead>
              <tr
                ><th
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top font-semibold text-white"
                  >Metric</th
                ><th
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top font-semibold text-white"
                  >Value</th
                ></tr
              >
            </thead>
            <tbody>
              <tr
                ><td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                  >Height</td
                ><td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                  >{height}</td
                ></tr
              >
              <tr
                ><td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                  >Weight</td
                ><td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                  >{weight}</td
                ></tr
              >
              <tr
                ><td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                  >Build</td
                ><td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                  >{character.dossier.identification.appearance.build}</td
                ></tr
              >
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel class="col-span-12" title="Known Affiliations">
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3">
            <DataRow
              label="Employers of Record"
              value={character.dossier.affiliations.employersOfRecord.join(
                ", ",
              )}
            />
            <DataRow
              label="Contacts"
              value={character.dossier.affiliations.contacts.join(", ")}
            />
          </div>
          <table
            class="w-full min-w-[560px] border-collapse"
            aria-label="Faction relations"
          >
            <thead>
              <tr
                ><th
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top font-semibold text-white"
                  >Faction</th
                ><th
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top font-semibold text-white"
                  >Relation</th
                ></tr
              >
            </thead>
            <tbody>
              {#each character.dossier.affiliations.factionRelations as fr}
                <tr
                  ><td
                    class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                    >{fr.faction}</td
                  ><td
                    class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                    >{fr.relation}</td
                  ></tr
                >
              {/each}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel class="col-span-12" title="Operational History">
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3">
            <DataRow
              label="Notable Engagements"
              value={character.dossier.operational.notableEngagements}
            />
            <DataRow
              label="Confirmed Kills"
              value={character.dossier.operational.confirmedKills}
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <h3 class="mb-2 text-muted">Specializations</h3>
              <ul class="m-0 list-none p-0">
                {#each character.dossier.operational.specializations as s}
                  <li class="mt-1">{s}</li>
                {/each}
              </ul>
            </div>
            <div>
              <h3 class="mb-2 text-muted">Reputation Markers</h3>
              <ul class="m-0 list-none p-0">
                {#each character.dossier.operational.reputationMarkers as r}
                  <li class="mt-1">{r}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      </Panel>

      <Panel class="col-span-12" title="Psychological / Behavior Profile">
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <h3 class="mb-2 text-muted">Temperament</h3>
              <ul class="m-0 list-none p-0">
                {#each character.dossier.psych.temperament as t}
                  <li class="mt-1">{t}</li>
                {/each}
              </ul>
            </div>
            <div>
              <h3 class="mb-2 text-muted">Motivations</h3>
              <ul class="m-0 list-none p-0">
                {#each character.dossier.psych.motivations as m}
                  <li class="mt-1">{m}</li>
                {/each}
              </ul>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <h3 class="mb-2 text-muted">Weaknesses</h3>
              <ul class="m-0 list-none p-0">
                {#each character.dossier.psych.weaknesses as w}
                  <li class="mt-1">{w}</li>
                {/each}
              </ul>
            </div>
            <div>
              <h3 class="mb-2 text-muted">Evaluation</h3>
              <div class="text-muted">
                {@html renderMarkdown(character.dossier.psych.evaluation)}
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <Panel class="col-span-12" title="Threat Assessment">
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3">
            <DataRow
              label="Combat Rating"
              value={character.dossier.threat.combatRating}
            />
            <DataRow
              label="Risk to Assets"
              value={character.dossier.threat.riskToAssets}
            />
          </div>
          <div class="p-4">
            <h3 class="mb-2 text-muted">Containment Options</h3>
            <ul class="m-0 list-none p-0">
              {#each character.dossier.threat.containmentOptions as c}
                <li class="mt-1">{c}</li>
              {/each}
            </ul>
            <DataRow
              label="Recommendation"
              value={character.dossier.threat.recommendation}
            />
          </div>
        </div>
      </Panel>

      <Panel class="col-span-12" title="Augments / Anomalies">
        <div class="p-4">
          <ul class="mb-4">
            <li>{character.dossier.identification.appearance.augmentations}</li>
            <li>Bio-illumination during heightened exertion</li>
            <li>Cryo-kinetic projection within limited range</li>
            <li>Weaponized channeling into melee implements</li>
            <li>Rapid hypertrophy, super-dense muscle tissue</li>
          </ul>
          <div
            class="border-l-[3px] border-gold px-4 py-2 italic text-[#e9e1c2]"
          >
            “Subject exceeds prior benchmarks. Physical evolution occurs in
            discrete, violent bursts—often after combat.”
          </div>
        </div>
      </Panel>

      <Panel class="col-span-12" title="Transport / Vessel">
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3">
            <DataRow label="Ship Class" value={vessel.shipClass} />
            <DataRow label="Designation" value={vessel.designation} />
            <DataRow label="Registration" value={vessel.registryStatus} />
            <DataRow
              label="Maintentance Condition"
              value={vessel.maintenanceCondition}
            />
          </div>
          <table
            class="w-full min-w-[560px] border-collapse"
            aria-label="Metrics table"
          >
            <thead>
              <tr
                ><th
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top font-semibold text-white"
                  >Capability</th
                ><th
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top font-semibold text-white"
                  >Value</th
                ></tr
              >
            </thead>
            <tbody>
              <tr
                ><td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                  >FTL Drive</td
                ><td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                  >{vessel.capabilities.ftlStatus}</td
                ></tr
              >
              <tr>
                <td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                  >Weapons</td
                >
                <td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                >
                  <ul class="m-0 list-none p-0">
                    {#each vessel.capabilities.weapons as w}
                      <li class="mt-1">{w}</li>
                    {/each}
                  </ul>
                </td>
              </tr>
              <tr>
                <td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                  >On-board Systems</td
                >
                <td
                  class="border-b border-[rgba(226,176,7,.18)] p-2 text-left align-top"
                >
                  <ul class="m-0 list-none p-0">
                    {#each vessel.capabilities.systems as s}
                      <li class="mt-1">{s}</li>
                    {/each}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  </div>

  <!-- HISTORY -->
  <div
    id="history"
    role="tabpanel"
    aria-labelledby="tab-history"
    hidden={active !== "history"}
  >
    <h2 class="mb-3 font-oswald text-gold uppercase tracking-[0.14em]">
      History
    </h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
      <Panel class="p-[1.2rem] text-[1.05rem] leading-[1.7] text-[#dcdcdc]">
        {#each character.history as section}
          <h3
            class="mb-2 mt-4 font-oswald tracking-[0.1em] text-white uppercase first:mt-0"
          >
            {section.title}
          </h3>
          {#each section.body as para}
            <p class="mb-0 mt-[0.6rem] first:mt-0">{para}</p>
          {/each}
        {/each}
      </Panel>
      <Panel class="p-4">
        <h3 class="mb-2 font-oswald tracking-[0.1em] text-white uppercase">
          Timeline Highlights
        </h3>
        <Timeline entries={character.timeline} listClass="text-muted" />
      </Panel>
    </div>
  </div>

  <!-- TYRIUM -->
  <div
    id="tyrium"
    role="tabpanel"
    aria-labelledby="tab-tyrium"
    hidden={active !== "tyrium"}
  >
    <h2 class="mb-3 font-oswald text-gold uppercase tracking-[0.14em]">
      Tyrium
    </h2>
    <div
      class="mt-1 flex gap-3 pb-2"
      role="tablist"
      aria-label="Tyrium Reference"
    >
      <button
        class="relative cursor-pointer bg-transparent px-[0.8rem] py-2 font-oswald text-[0.85rem] uppercase tracking-[0.1em] text-ink after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:origin-center after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:via-gold after:to-transparent after:transition-transform after:duration-[0.18s] after:ease-out aria-selected:text-white aria-selected:after:scale-x-100"
        role="tab"
        id="tab-tyrium-field-guide"
        aria-controls="tyrium-field-guide"
        aria-selected={tyriumActive === "field-guide"}
        on:click={() => setTyriumActive("field-guide")}>Field Guide</button
      >
    </div>
    <div
      id="tyrium-field-guide"
      class="mt-4"
      role="tabpanel"
      aria-labelledby="tab-tyrium-field-guide"
      hidden={tyriumActive !== "field-guide"}
    >
      <Panel
        class="mx-auto max-w-[80ch] overflow-x-auto p-6 text-[1.05rem] leading-[1.7] text-[#e4e4e4]"
      >
        <div class="guide">
          {@html renderMarkdown(tyriumFieldGuide)}
        </div>
      </Panel>
    </div>
  </div>

  <!-- LOGS -->
  <div
    id="logs"
    role="tabpanel"
    aria-labelledby="tab-logs"
    hidden={active !== "logs"}
  >
    <h2 class="mb-3 font-oswald text-gold uppercase tracking-[0.14em]">Logs</h2>
    <div class="border border-line" id="loglist">
      {#each character.logs as log}
        <details class="group border-t border-line first:border-t-0">
          <summary
            class="flex w-full cursor-pointer items-center justify-between bg-transparent p-4 text-left font-oswald tracking-[0.08em] text-white"
            >Log {String(log.id).padStart(2, "0")} — {log.title}
            <span
              class="transition-transform duration-150 ease-out group-open:rotate-90"
              >▶</span
            ></summary
          >
          <div class="hidden px-4 pb-4 text-muted group-open:block">
            {@html renderMarkdown(log.body)}
          </div>
        </details>
      {/each}
    </div>
  </div>
</main>

<style>
  /* Markdown content styles that are hard to utility-ify without @tailwindcss/typography */
  #tyrium .guide :global(h1) {
    font-family: Oswald, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: #fff;
    margin: 0 0 1rem;
    font-size: 1.85rem;
  }
  #tyrium .guide :global(h2) {
    font-family: Oswald, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--gold);
    margin: 1.5rem 0 0.75rem;
    font-size: 1.3rem;
    clear: both;
  }
  #tyrium .guide :global(h3) {
    font-family: Oswald, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #fff;
    margin: 1.25rem 0 0.5rem;
    font-size: 1.05rem;
    clear: both;
  }
  #tyrium .guide :global(h4) {
    font-family: Oswald, sans-serif;
    letter-spacing: 0.08em;
    color: #fff;
    margin: 1rem 0 0.5rem;
    clear: both;
  }
  #tyrium .guide :global(p) {
    margin: 0 0 0.85rem;
  }
  #tyrium .guide :global(ul),
  #tyrium .guide :global(ol) {
    margin: 0 0 0.85rem 1.25rem;
    padding: 0;
  }
  #tyrium .guide :global(li) {
    margin: 0.35rem 0;
  }
  #tyrium .guide :global(hr) {
    border: none;
    border-top: 1px solid var(--line);
    margin: 1.75rem 0;
  }
  #tyrium .guide :global(strong) {
    color: #fff;
  }
  #tyrium .guide :global(em) {
    color: var(--gold);
  }
  #tyrium .guide :global(img.md-image) {
    width: 100%;
    max-width: 320px;
    height: auto;
    display: block;
    margin: 0.75rem auto 1rem;
    border: 1px solid rgba(226, 176, 7, 0.25);
    background: rgba(226, 176, 7, 0.08);
    border-radius: 6px;
    box-shadow: 0 0 18px rgba(13, 162, 255, 0.12);
  }
  #tyrium .guide :global(img.md-image.md-image-right) {
    float: right;
    width: 48%;
    max-width: 320px;
    min-width: 180px;
    margin: 0.25rem 0 1rem 1.25rem;
  }
  @media (max-width: 700px) {
    #tyrium .guide :global(img.md-image.md-image-right) {
      float: none;
      width: 100%;
      max-width: 320px;
      margin: 0.75rem auto 1rem;
    }
  }
  #tyrium .guide :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.25rem 0;
    min-width: 560px;
  }
  #tyrium .guide :global(th),
  #tyrium .guide :global(td) {
    border: 1px solid rgba(226, 176, 7, 0.24);
    padding: 0.55rem;
    text-align: left;
  }
  #tyrium .guide :global(thead th) {
    background: rgba(226, 176, 7, 0.14);
    color: #fff;
    font-weight: 600;
  }
  #tyrium .guide :global(tbody tr:nth-child(even) td) {
    background: rgba(255, 255, 255, 0.02);
  }
  #tyrium .guide :global(code) {
    background: rgba(226, 176, 7, 0.12);
    padding: 0.1rem 0.35rem;
    border-radius: 3px;
    color: #fff;
    font-size: 0.95em;
  }
</style>
