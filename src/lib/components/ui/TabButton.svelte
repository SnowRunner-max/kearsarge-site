<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let id: string;
  export let active: boolean;
  export let label: string;

  const dispatch = createEventDispatcher();
</script>

<button
  class="relative cursor-pointer bg-transparent px-4 py-[0.6rem] font-oswald uppercase tracking-[0.12em] text-ink after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:origin-center after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:via-gold after:to-transparent after:transition-transform after:duration-[0.18s] after:ease-out aria-selected:text-white aria-selected:after:scale-x-100"
  role="tab"
  aria-selected={active}
  aria-controls={id}
  id={`tab-${id}`}
  on:click={() => dispatch('click', id)}
>
  {label}
</button>
