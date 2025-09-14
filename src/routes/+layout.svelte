<script lang="ts">
  import '../app.css';
  import type { LayoutData } from './$types';
  export let data: LayoutData;
  const title = data?.title ?? 'Seyfert Systems';
  const description = 'Seyfert Systems — Tundra dossier, history, and logs.';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content={description} />
</svelte:head>

<slot />
