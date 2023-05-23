<svelte:options accessors />

<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { Alignment, Color, IconSize } from '../../enums';
  import type { Navigation } from '../../models';
  import Icon from '../icon/Icon.svelte';
  import NavItem from '../nav/NavItem.svelte';

  export let icon: typeof SvelteComponent = null;
  export let title: string;
  export let align: Alignment = Alignment.Middle;
  export let color: Color = Color.Primary;
  export let disabled = false;
  export let navi: Navigation;
</script>

<NavItem {navi} {disabled}>
  <button type="button" class="root" style={`color: ${color}; justify-content: ${align}`} {disabled}>
    {#if icon}
      <div class="icon">
        <Icon size={IconSize.Small} {color}><svelte:component this={icon} /></Icon>
      </div>
    {/if}
    {title}
  </button>
</NavItem>

<style lang="postcss">
  .root {
    @apply w-full uppercase font-bold flex items-center mx-0 border-0;
    outline: none;
    background: none;
    padding: 5px;
    margin: 5px 0;
    /* justify-content: center; */
  }
  .icon {
    margin-right: 5px;
  }
</style>
