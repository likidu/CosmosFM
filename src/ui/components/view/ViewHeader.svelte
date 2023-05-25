<script lang="ts">
  import { IconChevronLeft } from '@/ui/icons';
  import { Color, IconSize } from '../../enums';
  import Icon from '../icon/Icon.svelte';

  export let title: string = undefined;
  export let back = false;
  export let style = '';
</script>

<div class="root">
  {#if back}
    <div class="icon">
      <Icon size={IconSize.Smallest} color={Color.Accent}><IconChevronLeft /></Icon>
    </div>
  {/if}
  {#if title}
    <h2 class="title" {style}>
      {title}
    </h2>
  {:else}
    <slot />
  {/if}
  {#if back}
    <div class="icon" />
  {/if}
</div>

<style lang="postcss">
  .root {
    @apply flex items-center overflow-hidden whitespace-nowrap px-1 py-0.5;
  }
  .icon {
    @apply flex justify-start w-full;
  }
  .title {
    @apply flex-auto justify-center text-center text-accent font-bold overflow-hidden text-ellipsis px-2;
    min-width: 160px;
  }
</style>
