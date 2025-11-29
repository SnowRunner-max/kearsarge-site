<script lang="ts">
  import { createEventDispatcher, afterUpdate } from 'svelte';
  import type { ChatMessage } from '$lib/types/chat';

  export let messages: ChatMessage[] = [];
  export let isProcessing = false;

  const dispatch = createEventDispatcher<{ sendMessage: { message: string } }>();

  let draft = '';
  let transcriptEl: HTMLDivElement | null = null;
  let textareaEl: HTMLTextAreaElement | null = null;

  function emitMessage(): void {
    const trimmed = draft.trim();
    if (!trimmed || isProcessing) {
      return;
    }

    dispatch('sendMessage', { message: trimmed });
    draft = '';
    queueMicrotask(resizeTextarea);
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      emitMessage();
    }
  }

  function resizeTextarea(): void {
    if (!textareaEl) return;
    textareaEl.style.height = 'auto';
    const maxHeight = 140;
    const nextHeight = Math.min(maxHeight, textareaEl.scrollHeight);
    textareaEl.style.height = `${Math.max(nextHeight, 48)}px`;
  }

  afterUpdate(() => {
    if (transcriptEl) {
      transcriptEl.scrollTo({ top: transcriptEl.scrollHeight, behavior: 'smooth' });
    }
    resizeTextarea();
  });
</script>

<div class="flex min-h-[460px] flex-col gap-0 rounded-[14px] border border-line bg-gradient-to-b from-[#0e0e14f0] to-[#0a0a0efb] shadow-[0_0_24px_rgba(13,162,255,.18)] md:min-h-[70vh]">
  <header class="flex items-center gap-4 border-b border-line bg-[rgba(226,176,7,.08)] px-5 py-4">
    <div class="h-[52px] w-[52px] rounded-full border-2 border-[rgba(226,176,7,.45)] bg-[url('/images/tundra-avatar-sm.gif')] bg-cover bg-center shadow-[0_0_12px_rgba(13,162,255,.4)]" aria-hidden="true"></div>
    <div class="identity">
      <h3 class="m-0 font-oswald text-[1.1rem] uppercase tracking-wide text-white">Tundra Seyfert</h3>
      <p class="mt-[0.1rem] text-[0.9rem] tracking-wide text-[rgba(196,196,196,.84)]">Tyrium-Enhanced Operative</p>
    </div>
  </header>

  <div class="flex flex-1 flex-col gap-[0.9rem] overflow-y-auto p-5 scroll-smooth" bind:this={transcriptEl}>
    {#each messages as message, index (index)}
      <article class={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div class={`max-w-[75%] break-words rounded-[14px] px-4 py-3 text-[0.95rem] leading-relaxed md:max-w-[88%] ${message.role === 'user' ? 'border border-[rgba(255,204,128,.65)] bg-gradient-to-br from-[rgba(210,125,45,.95)] to-[rgba(255,160,64,.9)] text-[#121212]' : 'border border-[rgba(13,162,255,.32)] bg-[rgba(24,24,32,.9)] text-[#dce8ff] shadow-[0_0_12px_rgba(13,162,255,.12)]'}`}>
          <p>{message.content}</p>
        </div>
      </article>
    {/each}

    {#if isProcessing}
      <article class="flex w-full justify-start">
        <div class="flex items-center gap-[0.35rem] rounded-[14px] border border-[rgba(13,162,255,.32)] bg-[rgba(24,24,32,.9)] px-4 py-3 shadow-[0_0_12px_rgba(13,162,255,.12)]">
          <span class="h-[9px] w-[9px] animate-[typing-bounce_1s_infinite_ease-in-out] rounded-full bg-[rgba(13,162,255,.7)]" aria-hidden="true"></span>
          <span class="h-[9px] w-[9px] animate-[typing-bounce_1s_infinite_ease-in-out_0.12s] rounded-full bg-[rgba(13,162,255,.7)]" aria-hidden="true"></span>
          <span class="h-[9px] w-[9px] animate-[typing-bounce_1s_infinite_ease-in-out_0.24s] rounded-full bg-[rgba(13,162,255,.7)]" aria-hidden="true"></span>
          <span class="sr-only">Tundra is composing a response</span>
        </div>
      </article>
    {/if}
  </div>

  <footer class="flex gap-3 border-t border-line bg-[rgba(14,14,20,.94)] px-5 py-4">
    <label class="sr-only" for="tundra-chat-input">Send a message</label>
    <textarea
      id="tundra-chat-input"
      bind:this={textareaEl}
      bind:value={draft}
      rows="1"
      placeholder="Send a prompt to Tundra"
      on:keydown={handleKeydown}
      on:input={resizeTextarea}
      disabled={isProcessing}
      class="flex-1 resize-none rounded-[10px] border border-[rgba(13,162,255,.28)] bg-[rgba(9,9,14,.94)] px-4 py-3 font-inherit text-[0.95rem] leading-normal text-[#f1f5ff] placeholder-[rgba(194,194,212,.6)] focus:outline-2 focus:outline-offset-2 focus:outline-[rgba(13,162,255,.55)] min-h-[48px] max-h-[140px]"
    ></textarea>
    <button
      type="button"
      on:click={emitMessage}
      disabled={isProcessing || draft.trim().length === 0}
      class="self-end rounded-full border border-[rgba(65,105,225,.5)] bg-gradient-to-br from-[rgba(13,162,255,.9)] to-[rgba(65,105,225,.95)] px-5 py-3 font-semibold tracking-wide text-white transition-transform duration-150 ease-out hover:shadow-[0_0_18px_rgba(13,162,255,.35)] active:scale-96 disabled:cursor-default disabled:opacity-55 disabled:shadow-none"
    >
      Send
    </button>
  </footer>
</div>
