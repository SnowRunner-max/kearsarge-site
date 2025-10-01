<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { derived, get, writable } from 'svelte/store';

  const mode = writable<'login' | 'signup'>('login');
  const email = writable('');
  const password = writable('');
  const errorMessage = writable<string | null>(null);
  const isSubmitting = writable(false);

  const redirectTo = derived(page, ($page) => $page.url.searchParams.get('redirectTo') ?? '/');

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    errorMessage.set(null);

    const currentMode = get(mode);
    const currentEmail = get(email).trim();
    const currentPassword = get(password);

    if (!currentEmail || !currentPassword) {
      errorMessage.set('Email and password are required.');
      return;
    }

    isSubmitting.set(true);

    try {
      const endpoint = currentMode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ email: currentEmail, password: currentPassword })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({ error: 'Unable to authenticate.' }));
        const message = typeof payload?.error === 'string' ? payload.error : 'Unable to authenticate.';
        errorMessage.set(message);
        return;
      }

      const destination = get(redirectTo);
      await goto(destination);
    } catch (error) {
      console.error('Authentication request failed', error);
      errorMessage.set('Unable to reach the authentication service.');
    } finally {
      isSubmitting.set(false);
    }
  }

  function toggleMode(targetMode: 'login' | 'signup') {
    mode.set(targetMode);
    errorMessage.set(null);
  }
</script>

<svelte:head>
  <title>Access Control — Seyfert Systems</title>
</svelte:head>

<main class="auth-shell">
  <section class="panel">
    <header>
      <h1>Seyfert Systems</h1>
      <p class="subtitle">Secure access required</p>
    </header>

    <div class="mode-toggle" role="tablist" aria-label="Authentication mode">
      <button
        type="button"
        role="tab"
        class:active={$mode === 'login'}
        aria-selected={$mode === 'login'}
        on:click={() => toggleMode('login')}
      >
        Log in
      </button>
      <button
        type="button"
        role="tab"
        class:active={$mode === 'signup'}
        aria-selected={$mode === 'signup'}
        on:click={() => toggleMode('signup')}
      >
        Sign up
      </button>
    </div>

    {#if $errorMessage}
      <div class="alert" role="alert">{$errorMessage}</div>
    {/if}

    <form class="auth-form" on:submit={handleSubmit}>
      <label>
        <span>Email</span>
        <input type="email" bind:value={$email} autocomplete="email" required />
      </label>

      <label>
        <span>Password</span>
        <input type="password" bind:value={$password} minlength="8" autocomplete="current-password" required />
      </label>

      <button type="submit" disabled={$isSubmitting}>
        {#if $isSubmitting}
          Processing…
        {:else if $mode === 'login'}
          Log in
        {:else}
          Create account
        {/if}
      </button>
    </form>
  </section>
</main>

<style>
  .auth-shell {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 20% 20%, rgba(79, 209, 197, 0.1), transparent 60%),
      radial-gradient(circle at 80% 0%, rgba(79, 140, 209, 0.15), transparent 55%),
      #050914;
    color: #f1f5f9;
    padding: 2rem 1rem;
  }

  .panel {
    width: min(420px, 100%);
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(148, 163, 184, 0.25);
    border-radius: 18px;
    padding: 2.5rem 2rem;
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.45);
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 1.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: rgba(226, 232, 240, 0.75);
    font-size: 0.95rem;
  }

  .mode-toggle {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .mode-toggle button {
    border: 1px solid rgba(148, 163, 184, 0.3);
    background: rgba(30, 41, 59, 0.85);
    color: inherit;
    padding: 0.65rem 0.75rem;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .mode-toggle button:hover,
  .mode-toggle button:focus-visible {
    border-color: rgba(129, 140, 248, 0.65);
    outline: none;
  }

  .mode-toggle button.active {
    background: linear-gradient(135deg, rgba(129, 140, 248, 0.75), rgba(56, 189, 248, 0.75));
    border-color: transparent;
    color: #0f172a;
  }

  .alert {
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(248, 113, 113, 0.35);
    padding: 0.75rem 1rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }

  .auth-form {
    display: grid;
    gap: 1rem;
  }

  label {
    display: grid;
    gap: 0.4rem;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  input {
    background: rgba(15, 23, 42, 0.65);
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 10px;
    padding: 0.75rem 0.85rem;
    color: inherit;
    font-size: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  input:focus-visible {
    outline: none;
    border-color: rgba(129, 140, 248, 0.75);
    box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.35);
  }

  button[type='submit'] {
    margin-top: 0.5rem;
    padding: 0.9rem 1rem;
    border-radius: 999px;
    border: none;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: linear-gradient(135deg, rgba(129, 140, 248, 0.85), rgba(56, 189, 248, 0.9));
    color: #0f172a;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  button[type='submit']:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 25px rgba(56, 189, 248, 0.25);
  }

  button[disabled] {
    opacity: 0.6;
    cursor: wait;
    box-shadow: none;
  }
</style>
