<script lang="ts">
  export let title: string | undefined = undefined;
  let className = '';
  export { className as class };
</script>

<div class={`relative border border-line bg-gradient-to-b from-panel-2 to-panel before:absolute before:-right-[1px] before:-top-[1px] before:h-0 before:w-0 before:border-b-[22px] before:border-l-[22px] before:border-t-[22px] before:border-b-transparent before:border-l-transparent before:border-t-gold before:drop-shadow-[0_0_6px_rgba(226,176,7,.3)] ${className}`}>
  {#if title}
    <div class="border-b border-line px-4 py-[0.9rem]"><strong>{title}</strong></div>
  {/if}
  <slot />
</div>
