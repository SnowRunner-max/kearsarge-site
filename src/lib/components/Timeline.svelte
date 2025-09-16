<script lang="ts">
  import type { TimelineEntry } from '$lib/types/character';

  export let entries: TimelineEntry[] = [];
  export let listClass = '';

  let restClass = '';
  let restProps: Record<string, unknown> = {};

  $: ({ class: restClass = '', ...restProps } = $$restProps);
  $: timelineClass = ['timeline', listClass, restClass].filter(Boolean).join(' ');
</script>

<ol class={timelineClass} {...restProps}>
  {#each entries as entry}
    <li>
      <div class="timeline-title">{entry.title}</div>
      {#if entry.body.length > 0}
        <ul class="timeline-points">
          {#each entry.body as item}
            <li>{item}</li>
          {/each}
        </ul>
      {/if}
    </li>
  {/each}
</ol>

<style>
  .timeline {
    list-style: none;
    margin: 0;
    padding: 0 0 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    border-left: 2px solid var(--timeline-line, var(--line, rgba(210, 125, 45, 0.36)));
  }

  .timeline > li {
    position: relative;
    padding-left: 1rem;
  }

  .timeline > li::before {
    content: '';
    position: absolute;
    left: -1.23rem;
    top: 0.35rem;
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--timeline-marker, var(--line, rgba(210, 125, 45, 0.7)));
  }

  .timeline-title {
    margin: 0;
    font-weight: 600;
    color: var(--timeline-title-color, #fff);
  }

  .timeline-points {
    margin: 0.5rem 0 0 0;
    padding-left: 1rem;
    list-style: disc;
    color: var(--timeline-text-color, var(--muted, inherit));
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .timeline-points li + li {
    margin-top: 0.35rem;
  }
</style>
