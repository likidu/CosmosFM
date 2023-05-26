<script lang="ts">
  import Icon from '@/ui/components/icon/Icon.svelte';
  import { Color, IconSize } from '@/ui/enums';

  import { IconChevronLeft } from '@/ui/icons';

  export let title: string = undefined;
  export let style = '';
  export let back = false;
</script>

<div class="root">
  <div class="box">
    {#if back}
      <Icon size={IconSize.Small} color={Color.Accent}><IconChevronLeft /></Icon>
    {/if}
  </div>
  <div class="box">
    {#if title}
      <h2 class="title" {style}>
        {title}
      </h2>
    {:else}
      <slot />
    {/if}
  </div>
  <div class="box" />
</div>

<style lang="postcss">
  .root {
    @apply flex items-center overflow-hidden whitespace-nowrap px-1 py-0.5;
  }
  .box {
    @apply flex flex-1 justify-between;
  }
  .title {
    @apply flex-auto text-center overflow-hidden text-ellipsis px-3;
    color: var(--accent-color);
    font-weight: 600;
  }
</style>
