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

<div class="chat-frame">
  <header class="chat-header">
    <div class="avatar" aria-hidden="true"></div>
    <div class="identity">
      <h3>Tundra Seyfert</h3>
      <p>Tyrium-Enhanced Operative</p>
    </div>
  </header>

  <div class="chat-transcript" bind:this={transcriptEl}>
    {#each messages as message, index (index)}
      <article class={`chat-line ${message.role}`}>
        <div class="bubble">
          <p>{message.content}</p>
        </div>
      </article>
    {/each}

    {#if isProcessing}
      <article class="chat-line assistant">
        <div class="bubble typing">
          <span class="dot" aria-hidden="true"></span>
          <span class="dot" aria-hidden="true"></span>
          <span class="dot" aria-hidden="true"></span>
          <span class="visually-hidden">Tundra is composing a response</span>
        </div>
      </article>
    {/if}
  </div>

  <footer class="chat-composer">
    <label class="visually-hidden" for="tundra-chat-input">Send a message</label>
    <textarea
      id="tundra-chat-input"
      bind:this={textareaEl}
      bind:value={draft}
      rows="1"
      placeholder="Send a prompt to Tundra"
      on:keydown={handleKeydown}
      on:input={resizeTextarea}
      disabled={isProcessing}
    ></textarea>
    <button type="button" on:click={emitMessage} disabled={isProcessing || draft.trim().length === 0}>
      Send
    </button>
  </footer>
</div>

<style>
  .chat-frame {
    display:flex;
    flex-direction:column;
    gap:0;
    border:1px solid rgba(210,125,45,.36);
    background:linear-gradient(180deg, rgba(14,14,20,.94), rgba(10,10,14,.92));
    border-radius:14px;
    min-height:460px;
    box-shadow:0 0 24px rgba(13,162,255,.18);
  }

  .chat-header {
    display:flex;
    align-items:center;
    gap:1rem;
    padding:1rem 1.25rem;
    background:rgba(226,176,7,.08);
    border-bottom:1px solid rgba(210,125,45,.36);
  }

  .avatar {
    width:52px;
    height:52px;
    border-radius:50%;
    background-image:url('/images/tundra-avatar-sm.gif');
    background-size:cover;
    background-position:center;
    box-shadow:0 0 12px rgba(13,162,255,.4);
    border:2px solid rgba(226,176,7,.45);
  }

  .identity h3 {
    margin:0;
    font-family:Oswald,sans-serif;
    letter-spacing:.08em;
    text-transform:uppercase;
    color:#fff;
    font-size:1.1rem;
  }

  .identity p {
    margin:.1rem 0 0;
    font-size:.9rem;
    color:rgba(196,196,196,.84);
    letter-spacing:.02em;
  }

  .chat-transcript {
    flex:1;
    overflow-y:auto;
    padding:1.25rem;
    display:flex;
    flex-direction:column;
    gap:.9rem;
    scroll-behavior:smooth;
  }

  .chat-line {
    display:flex;
    width:100%;
  }

  .chat-line.user {
    justify-content:flex-end;
  }

  .chat-line.assistant {
    justify-content:flex-start;
  }

  .bubble {
    max-width:75%;
    padding:.75rem 1rem;
    border-radius:14px;
    line-height:1.6;
    font-size:0.95rem;
    word-break:break-word;
  }

  .chat-line.user .bubble {
    background:linear-gradient(120deg, rgba(210,125,45,.95), rgba(255,160,64,.9));
    color:#121212;
    border:1px solid rgba(255,204,128,.65);
  }

  .chat-line.assistant .bubble {
    background:rgba(24,24,32,.9);
    border:1px solid rgba(13,162,255,.32);
    color:#dce8ff;
    box-shadow:0 0 12px rgba(13,162,255,.12);
  }

  .chat-composer {
    display:flex;
    gap:.75rem;
    padding:1rem 1.25rem;
    border-top:1px solid rgba(210,125,45,.36);
    background:rgba(14,14,20,.94);
  }

  textarea {
    flex:1;
    resize:none;
    min-height:48px;
    max-height:140px;
    padding:.75rem 1rem;
    background:rgba(9,9,14,.94);
    border:1px solid rgba(13,162,255,.28);
    border-radius:10px;
    color:#f1f5ff;
    font-size:0.95rem;
    line-height:1.5;
    font-family:inherit;
  }

  textarea::placeholder {
    color:rgba(194,194,212,.6);
  }

  textarea:focus {
    outline:2px solid rgba(13,162,255,.55);
    outline-offset:2px;
  }

  button {
    align-self:flex-end;
    padding:.75rem 1.25rem;
    background:linear-gradient(120deg, rgba(13,162,255,.9), rgba(65,105,225,.95));
    border:1px solid rgba(65,105,225,.5);
    color:#fff;
    border-radius:999px;
    font-weight:600;
    letter-spacing:.04em;
    cursor:pointer;
    transition:transform .15s ease, box-shadow .15s ease;
  }

  button:disabled {
    opacity:.55;
    cursor:default;
    box-shadow:none;
  }

  button:not(:disabled):hover {
    box-shadow:0 0 18px rgba(13,162,255,.35);
  }

  button:not(:disabled):active {
    transform:scale(0.96);
  }

  .typing {
    display:flex;
    align-items:center;
    gap:.35rem;
  }

  .dot {
    width:9px;
    height:9px;
    border-radius:50%;
    background:rgba(13,162,255,.7);
    animation:typing-bounce 1s infinite ease-in-out;
  }

  .dot:nth-child(2) {
    animation-delay:.12s;
  }

  .dot:nth-child(3) {
    animation-delay:.24s;
  }

  .visually-hidden {
    position:absolute;
    width:1px;
    height:1px;
    padding:0;
    margin:-1px;
    overflow:hidden;
    clip:rect(0,0,0,0);
    white-space:nowrap;
    border:0;
  }

  @keyframes typing-bounce {
    0%, 80%, 100% { transform:translateY(0); opacity:.6; }
    40% { transform:translateY(-6px); opacity:1; }
  }

  @media (max-width: 768px) {
    .chat-frame {
      min-height:70vh;
    }

    .bubble {
      max-width:88%;
    }
  }
</style>
