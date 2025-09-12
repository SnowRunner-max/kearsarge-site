<script lang="ts">
  const links = [
    {
      title: 'Character Page',
      desc: 'Explore Tundra Karsvaldr — dossier, profile, and logs.',
      href: '/characters/tundra-karsvaldr/overview'
    }
  ];
  const siteTitle = 'Seyfert Systems';
  const siteTagline = '';
  // Keeping markup minimal and content-focused
</script>

<section class="py-6">
  <h1 class="text-3xl font-bold tracking-tight">{siteTitle}</h1>

  <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#each links as f}
      <li>
        <a href={f.href} class="block rounded-xl border border-slate-200 p-4 hover:shadow-md transition">
          <h2 class="text-lg font-semibold">{f.title}</h2>
          <p class="mt-1 text-sm text-slate-600">{f.desc}</p>
        </a>
      </li>
    {/each}
  </ul>
</section>
