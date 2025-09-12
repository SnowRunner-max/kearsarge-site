<script lang="ts">
  import '../app.css';
  export let data;
</script>

<svelte:head>
  <title>{data?.title ?? 'Tundra Karsvaldr'}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="The official page for Tundra Karsvaldr, an anthropomorphic malamute." />
</svelte:head>

<div class="min-h-dvh flex flex-col">
  <header class="border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-10">
    <div class="container-default py-3 flex items-center justify-between">
      <a href="/" class="text-lg font-semibold tracking-tight text-slate-900">Tundra Karsvaldr</a>
      <nav class="text-sm text-slate-600">
        <a class="hover:text-slate-900" href="/tundra-karsvaldr">Character</a>
      </nav>
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
