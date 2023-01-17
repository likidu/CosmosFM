<script lang="ts">
  export let title: string = undefined;
  export let style = '';
</script>

<div class="root">
  {#if title}
    <h2 class="title" {style}>
      {title}
    </h2>
  {:else}
    <slot />
  {/if}
</div>

<style lang="postcss">
  .root {
    @apply flex items-center overflow-hidden whitespace-nowrap px-1 py-0.5;
  }
  .title {
    @apply flex-auto text-center overflow-hidden text-ellipsis px-2;
    color: var(--accent-color);
    font-weight: 600;
  }
</style>
