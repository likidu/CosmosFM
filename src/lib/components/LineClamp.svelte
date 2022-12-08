<script lang="ts">
  import { onMount } from 'svelte';
  import { webkitLineClamp } from 'webkit-line-clamp';

  export let lines = 2;
  let className = '';
  export { className as class };

  let textBlock: HTMLElement;

  onMount(async () => {
    const slot = textBlock.firstElementChild as HTMLElement;
    // !!process.env.IS_LEGACY ? webkitLineClamp(slot, lines) : slot.classList.add(`line-clamp-${lines}`);
    webkitLineClamp(slot, lines);
  });
</script>

<div bind:this={textBlock} class={className}><slot /></div>
