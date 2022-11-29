<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Onyx } from '../../services';

  export let backgroundImageUrl: string = null;

  const style = backgroundImageUrl ? `background-image: url('${backgroundImageUrl}'); background-size: cover;` : '';

  // onMount(() => OnyxNavigation.restoreFocusedItems());
  onDestroy(() => {
    Onyx.contextMenu.reset();
    Onyx.appMenu.close();
  });
</script>

<div class="root absolute inset-0 z-10" {style}>
  <slot />
</div>

<style lang="postcss">
  .root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* background-color: var(--card-color); */
    color: var(--text-color);
    border-radius: var(--radius) var(--radius) var(--radius) var(--radius);
  }
</style>
