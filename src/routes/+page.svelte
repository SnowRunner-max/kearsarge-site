<script lang="ts">
  import { tundraKarsvaldr as character } from '$lib/data/characters/tundra-karsvaldr';
  import { renderMarkdown } from '$lib/utils/markdown';

  type Tab = 'overview' | 'dossier' | 'profile' | 'logs';
  let active: Tab = 'overview';
  const setActive = (id: Tab) => (active = id);

  const aliases = character.dossier.identification.aliases.join(', ');
  const height = character.dossier.identification.appearance.height;
  const weight = character.dossier.identification.appearance.weight;
  const traits = 'Tyrium enhancements, cryo-kinetics'; // summarize from existing content
  const heroImg = '/images/tundra-karsvaldr.png'; // optional image
</script>

<svelte:head>
  <title>Seyfert Index // TUNDRA</title>
</svelte:head>

<header>
  <div class="bar">
    <div class="brand">
      <div class="glyph" aria-hidden="true"></div>
      <div class="title">Seyfert Index // TUNDRA</div>
    </div>
    <div class="actions">
      <div class="chip">Classification: {character.dossier.classificationLevel}</div>
      <div class="chip">Last Update: {character.dossier.lastUpdate}</div>
    </div>
  </div>
  <nav class="tabs" role="tablist" aria-label="Sections">
    <button class="tab" role="tab" aria-selected={active === 'overview'} aria-controls="overview" id="tab-overview" on:click={() => setActive('overview')}>Overview</button>
    <button class="tab" role="tab" aria-selected={active === 'dossier'} aria-controls="dossier" id="tab-dossier" on:click={() => setActive('dossier')}>Dossier</button>
    <button class="tab" role="tab" aria-selected={active === 'profile'} aria-controls="profile" id="tab-profile" on:click={() => setActive('profile')}>Profile</button>
    <button class="tab" role="tab" aria-selected={active === 'logs'} aria-controls="logs" id="tab-logs" on:click={() => setActive('logs')}>Logs</button>
  </nav>
</header>

<main>
  <!-- OVERVIEW -->
  <section id="overview" role="tabpanel" aria-labelledby="tab-overview" hidden={active !== 'overview'}>
    <h2 class="secthead">Overview</h2>
    <div class="grid">
      <div class="panel heroimg" aria-label="Main character image" style={`background-image:url('${heroImg}')`}></div>
      <aside class="panel facts">
        <h3 class="mb1" style="font-family:Oswald,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#fff">Quick Facts</h3>
        <dl>
          <dt>Name</dt><dd>{character.hero.name}</dd>
          <dt>Alias</dt><dd>{aliases}</dd>
          <dt>Height</dt><dd>{height}</dd>
          <dt>Weight</dt><dd>{weight}</dd>
          <dt>Class</dt><dd>Lorem ipsum</dd>
          <dt>Traits</dt><dd>{traits}</dd>
        </dl>
        <div class="badges">
          <span class="badge">Status: Lorem ipsum</span>
          <span class="badge">Tier: Lorem ipsum</span>
          <span class="badge">Region: Draumveil</span>
        </div>
      </aside>
    </div>
  </section>

  <!-- DOSSIER -->
  <section id="dossier" role="tabpanel" aria-labelledby="tab-dossier" hidden={active !== 'dossier'}>
    <h2 class="secthead">Dossier</h2>
    <div class="shell">
      <div class="panel block">
        <div class="head"><strong>Identity</strong></div>
        <div class="body twocol">
          <div class="kv"><div class="k">Name</div><div>{character.hero.name}</div></div>
          <div class="kv"><div class="k">Aliases</div><div>{aliases}</div></div>
          <div class="kv"><div class="k">Species/Origin</div><div>{character.dossier.identification.speciesOrigin}</div></div>
          <div class="kv"><div class="k">Gender</div><div>{character.dossier.identification.gender}</div></div>
        </div>
      </div>

      <div class="panel block">
        <div class="head"><strong>Clearance & File</strong></div>
        <div class="body twocol">
          <div class="kv"><div class="k">Classification</div><div>{character.dossier.classificationLevel}</div></div>
          <div class="kv"><div class="k">File Origin</div><div>{character.dossier.fileOrigin}</div></div>
          <div class="kv"><div class="k">Last Update</div><div>{character.dossier.lastUpdate}</div></div>
          <div class="kv"><div class="k">Subject</div><div>{character.dossier.subject}</div></div>
        </div>
      </div>

      <div class="panel block full">
        <div class="head"><strong>Physiology / Metrics</strong></div>
        <div class="body">
          <table class="metrics" aria-label="Metrics table">
            <thead>
              <tr><th>Metric</th><th>Value</th></tr>
            </thead>
            <tbody>
              <tr><td>Height</td><td>{height}</td></tr>
              <tr><td>Weight</td><td>{weight}</td></tr>
              <tr><td>Build</td><td>{character.dossier.identification.appearance.build}</td></tr>
              <tr><td>Condition</td><td>{character.dossier.vessel.maintenanceCondition}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="panel block full">
        <div class="head"><strong>Augments / Anomalies</strong></div>
        <div class="body">
          <ul class="mb2">
            <li>{character.dossier.identification.appearance.augmentations}</li>
            <li>Bio-illumination during heightened exertion</li>
            <li>Cryo-kinetic projection within limited range</li>
            <li>Weaponized channeling into melee implements</li>
            <li>Rapid hypertrophy, super-dense muscle tissue</li>
          </ul>
          <div class="quote">“Subject exceeds prior benchmarks. Physical evolution occurs in discrete, violent bursts—often after combat.”</div>
        </div>
      </div>
    </div>
  </section>

  <!-- PROFILE -->
  <section id="profile" role="tabpanel" aria-labelledby="tab-profile" hidden={active !== 'profile'}>
    <h2 class="secthead">Profile</h2>
    <div class="proset">
      <article class="panel copy">
        {#each character.profile as section}
          <h3 class="mb1" style="font-family:Oswald,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#fff">{section.title}</h3>
          {#each section.body.split('\n\n') as para}
            <p>{para}</p>
          {/each}
        {/each}
      </article>
      <aside class="panel aside">
        <h3 class="mb1" style="font-family:Oswald,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#fff">Timeline Highlights</h3>
        <ul class="muted">
          <li>Lorem ipsum — Lorem ipsum</li>
          <li>Lorem ipsum — Lorem ipsum</li>
          <li>Lorem ipsum — Lorem ipsum</li>
          <li>Lorem ipsum — Lorem ipsum</li>
        </ul>
      </aside>
    </div>
  </section>

  <!-- LOGS -->
  <section id="logs" role="tabpanel" aria-labelledby="tab-logs" hidden={active !== 'logs'}>
    <h2 class="secthead">Logs</h2>
    <div class="controls">
      <button class="control" type="button">Filter</button>
      <button class="control" type="button">Sort</button>
      <button class="control" type="button">Search</button>
    </div>
    <div class="accordion" id="loglist">
      {#each character.logs as log}
        <details class="item">
          <summary class="trigger">Log {String(log.id).padStart(2, '0')} — {log.title} <span class="caret">▶</span></summary>
          <div class="paneltext">
            {@html renderMarkdown(log.body)}
          </div>
        </details>
      {/each}
    </div>
  </section>
</main>

<style>
  :global(:root){
    --bg:#0b0b0b;         /* near-black */
    --panel:#121212;      /* dark panel */
    --panel-2:#171717;    /* alt panel */
    --ink:#ececec;        /* primary text (lighter for contrast) */
    --muted:#c4c4c4;      /* secondary text (legible on dark) */
    --gold:#d27d2d;       /* accent (burnt orange) */
    --gold-2:#b5651d;     /* darker accent */
    --line:rgba(210,125,45,.36); /* accent line */
    --danger:#ff5c5c;
    --ok:#7bd67b;
    --warn:#ffb84d;
    --maxw:1100px;
  }
  *{box-sizing:border-box}
  :global(html, body){height:100%}
  :global(body){margin:0;background:var(--bg);color:var(--ink);font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif}

  header{
    position:sticky;top:0;z-index:40;
    background:linear-gradient(180deg,var(--panel-2),rgba(23,23,23,.96));
    border-bottom:2px solid var(--gold);
    backdrop-filter:saturate(120%) blur(4px);
  }
  .bar{max-width:var(--maxw);margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem}
  .brand{display:flex;gap:.75rem;align-items:center}
  .glyph{width:26px;height:26px;border:2px solid var(--gold);transform:skewX(-12deg); position:relative}
  .glyph:after{content:"";position:absolute;right:-6px;top:-6px;width:0;height:0;border-left:12px solid transparent;border-bottom:12px solid transparent;border-top:12px solid var(--gold);filter:drop-shadow(0 0 6px rgba(226,176,7,.35))}
  .title{font-family:Oswald,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;font-weight:600}
  .actions{display:flex;gap:.75rem}
  .chip{border:1px solid var(--line);padding:.25rem .5rem;color:var(--muted);font-size:.8rem}

  .tabs{max-width:var(--maxw);margin:0 auto;padding:0 1.25rem 0.75rem;display:flex;gap:1rem;flex-wrap:wrap}
  .tab{appearance:none;border:none;background:transparent;color:var(--ink);font-family:Oswald,sans-serif;text-transform:uppercase;letter-spacing:.12em;padding:.6rem 1rem;cursor:pointer;position:relative}
  .tab:after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,transparent, var(--gold), transparent);transform:scaleX(0);transform-origin:center;transition:transform .18s ease}
  .tab[aria-selected="true"]{color:#fff}
  .tab[aria-selected="true"]:after{transform:scaleX(1)}

  main{max-width:var(--maxw);margin:0 auto;padding:1rem 1.25rem 3rem}

  .panel{background:linear-gradient(180deg,var(--panel-2),var(--panel));border:1px solid var(--line);position:relative}
  .panel:before{content:"";position:absolute;top:-1px;right:-1px;width:0;height:0;border-left:22px solid transparent;border-bottom:22px solid transparent;border-top:22px solid var(--gold);filter:drop-shadow(0 0 6px rgba(226,176,7,.3))}
  .secthead{font-family:Oswald,sans-serif;text-transform:uppercase;letter-spacing:.14em;color:var(--gold);margin:0 0 .75rem}
  .muted{color:var(--muted)}

  #overview .grid{display:grid;grid-template-columns: 2fr 1fr;gap:1rem}
  @media (max-width:940px){ #overview .grid{grid-template-columns:1fr} }
  .heroimg{aspect-ratio:4/5;background:#0f0f0f center/cover;border:1px solid var(--line)}
  .facts{padding:1rem}
  .facts dl{display:grid;grid-template-columns: 1fr 1fr;gap:.5rem 1rem;margin:0}
  .facts dt{color:var(--muted)}
  .facts dd{margin:0;color:#fff}
  .badges{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem}
  .badge{border:1px solid var(--line);padding:.25rem .5rem;font-size:.75rem;color:var(--gold)}

  #dossier .shell{display:grid;grid-template-columns:repeat(12,1fr);gap:1rem}
  .block{grid-column:span 6}
  .block.full{grid-column:span 12}
  @media (max-width:900px){ .block{grid-column:span 12} }
  .block .head{padding:.9rem 1rem;border-bottom:1px solid var(--line)}
  .block .body{padding:1rem}
  .twocol{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
  .kv{border-bottom:1px dashed rgba(226,176,7,.2);padding:.35rem 0;display:flex;justify-content:space-between;gap:1rem}
  .kv .k{color:var(--muted)}

  table.metrics{width:100%;border-collapse:collapse}
  table.metrics th, table.metrics td{border-bottom:1px solid rgba(226,176,7,.18);padding:.5rem;text-align:left}
  table.metrics th{color:#fff;font-weight:600}
  .ok{color:var(--ok)} .warn{color:var(--warn)} .crit{color:var(--danger)}

  #profile .proset{display:grid;grid-template-columns:2fr 1fr;gap:1rem}
  @media (max-width:980px){ #profile .proset{grid-template-columns:1fr} }
  .copy{padding:1.2rem; line-height:1.7; font-size:1.05rem; color:#dcdcdc; max-width:75ch}
  .aside{padding:1rem}
  .quote{border-left:3px solid var(--gold);padding:.5rem 1rem;color:#e9e1c2;font-style:italic}

  .controls{display:flex;gap:.5rem;flex-wrap:wrap;margin:.5rem 0 1rem}
  .control{border:1px solid var(--line);background:transparent;color:var(--ink);padding:.4rem .6rem}

  .accordion{border:1px solid var(--line)}
  .item + .item{border-top:1px solid var(--line)}
  .trigger{width:100%;text-align:left;background:transparent;border:0;color:#fff;padding:1rem;font-family:Oswald,sans-serif;letter-spacing:.08em;display:flex;justify-content:space-between;align-items:center}
  .trigger .caret{transition:transform .15s ease}
  .paneltext{padding:0 1rem 1rem;display:none;color:var(--muted)}
  .item[open] .paneltext{display:block}
  .item[open] .caret{transform:rotate(90deg)}

  .pad{padding:1rem}
  .mb1{margin-bottom:.5rem} .mb2{margin-bottom:1rem} .mb3{margin-bottom:1.5rem}
  .sr{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden}
</style>
