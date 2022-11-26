<script lang="ts">
  import IconCheck from '@/ui/icons/IconCheck.svelte';
  import { Color } from '../../enums';
  import Icon from '../icon/Icon.svelte';

  export let checked: boolean;
</script>

<div class="root">
  {#if checked}
    <Icon color={Color.Accent}><IconCheck /></Icon>
  {:else}
    <Icon color={Color.Tertiary}><IconCheck /></Icon>
  {/if}
</div>
