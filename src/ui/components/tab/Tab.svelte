<script lang="ts">
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy, onMount } from 'svelte';
  import { location, replace } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';

  import { RenderState } from '../../enums';
  import type { TabItem } from '../../models';
  import { appMenu, contextMenu } from '../../stores';

  export let items: TabItem[];

  const current = items.map((item) => item.url).indexOf($location);

  const keyMan = OnyxKeys.subscribe(
    {
      onArrowRight: async () => {
        if (current < items.length - 1) {
          replace(items[current + 1].url);
        }
      },
      onArrowLeft: async () => {
        if (current > 0) {
          replace(items[current - 1].url);
        }
      },
    },
    { priority: 4 },
  );

  let tab: HTMLUListElement;

  $: {
    if ($appMenu.state === RenderState.Destroyed) keyMan.enable();
    else keyMan.disable();
  }

  $: {
    if ($contextMenu.state === RenderState.Destroyed) keyMan.enable();
    else keyMan.disable();
  }

  onMount(() => {
    // 1rem = 10px, space-4 = 1rem
    const rem = 10;
    const headerWidth = tab.parentElement.offsetWidth;
    // current is -1 until DOM loaded
    if (current >= 0) {
      // Get width for each menu item
      const widths = [...tab.children].map((item) => (item as HTMLElement).offsetWidth);
      let offset = 0;
      if (current > 0) {
        for (let i = 0; i < current; i++) offset += widths[i] + rem;
      }
      tab.style.left = `${(headerWidth - widths[current]) / 2 - offset}px`;
    }
  });

  onDestroy(() => keyMan.unsubscribe());
</script>

<nav class="root">
  <ul bind:this={tab} class="tab-items">
    {#each items as item, i}
      <li use:active={item.url}>{item.label}</li>
    {/each}
  </ul>
  <ul class="dot">
    {#each items as item, i}
      <li use:active={item.url} />
    {/each}
  </ul>
</nav>

<style lang="postcss">
  .root {
    @apply w-full p-1;
  }

  .tab-items {
    @apply flex items-center relative space-x-4;
    transition: opacity 0.2s;
  }
  :global(.tab-items > li) {
    @apply inline-flex text-sm;
  }
  :global(.tab-items > li.active) {
    @apply text-base;
    color: var(--accent-color);
    font-weight: 600;
  }

  .dot {
    @apply flex justify-center space-x-1;
  }
  :global(.dot > li) {
    @apply inline-flex w-2 h-2 rounded-full;
    background-color: var(--accent-color);
  }
  :global(.dot > li.active) {
    @apply w-5;
  }
</style>
