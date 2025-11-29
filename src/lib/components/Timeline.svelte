<script lang="ts">
  import type { TimelineEntry } from '$lib/types/character';

  export let entries: TimelineEntry[] = [];
  export let listClass = '';

  let restClass = '';
  let restProps: Record<string, unknown> = {};

  $: ({ class: restClass = '', ...restProps } = $$restProps);
  $: timelineClass = ['flex flex-col gap-5 border-l-2 border-line pl-4', listClass, restClass].filter(Boolean).join(' ');
</script>

<ol class={timelineClass} {...restProps}>
  {#each entries as entry}
    <li class="relative pl-4 before:absolute before:-left-[0.6rem] before:top-[0.35rem] before:h-[0.55rem] before:w-[0.55rem] before:rounded-full before:bg-line">
      <div class="m-0 font-semibold text-white">{entry.title}</div>
      {#if entry.body.length > 0}
        <ul class="mt-2 list-disc space-y-1.5 pl-4 text-[0.95rem] leading-normal text-muted">
          {#each entry.body as item}
            <li>{item}</li>
          {/each}
        </ul>
      {/if}
    </li>
  {/each}
</ol>
