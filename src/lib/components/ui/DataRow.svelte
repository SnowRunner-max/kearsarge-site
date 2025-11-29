<script lang="ts">
  export let label: string;
  export let value: string | number | undefined = undefined;
</script>

<div class="flex justify-between gap-4 border-b border-dashed border-[rgba(226,176,7,.2)] py-[0.35rem]">
  <div class="text-muted">{label}</div>
  <div>
    {#if value !== undefined}
      {value}
    {:else}
      <slot />
    {/if}
  </div>
</div>
