<script lang="ts">
  import '../app.css';
  export let data;
</script>

<svelte:head>
  <title>{data?.title ?? 'Seyfert Systems'}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Seyfert Systems — characters, worlds, and histories." />
</svelte:head>

<div class="min-h-dvh flex flex-col">
  <header class="border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-10">
    <div class="container-default py-3 flex items-center justify-between">
      <a href="/" class="text-lg font-semibold tracking-tight text-slate-900">Seyfert Systems</a>
      <div></div>
    </div>
  </header>

  <main class="flex-1">
    <div class="container-default py-6">
      <slot />
    </div>
  </main>

  <footer class="border-t border-slate-200 bg-slate-50">
    <div class="container-default py-6 text-sm text-slate-600">&copy; {new Date().getFullYear()} Tundra Karsvaldr</div>
  </footer>
</div>
