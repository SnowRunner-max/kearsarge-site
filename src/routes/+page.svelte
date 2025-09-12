<script lang="ts">
  const features = [
    {
      title: 'Character Page',
      desc: 'See Tundra’s portrait, name, and backstory.',
      href: '/tundra-karsvaldr'
    }
  ];
</script>

<section class="py-6">
  <h1 class="text-3xl font-bold tracking-tight">Welcome</h1>
  <p class="mt-2 text-slate-600">This site showcases Tundra Karsvaldr, an anthropomorphic malamute. Built with SvelteKit, TypeScript, and Tailwind CSS. Mobile-first and static.</p>

  <ul class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#each features as f}
      <li>
        <a href={f.href} class="block rounded-xl border border-slate-200 p-4 hover:shadow-md transition">
          <h2 class="text-lg font-semibold">{f.title}</h2>
          <p class="mt-1 text-sm text-slate-600">{f.desc}</p>
        </a>
      </li>
    {/each}
  </ul>
</section>
