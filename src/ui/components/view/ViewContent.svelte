<script lang="ts">
  import { OnyxNavigation } from 'onyx-navigation';
  import { onDestroy, onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import NavGroup from '../nav/NavGroup.svelte';

  const groupId = uuidv4();

  onMount(() => OnyxNavigation.restoreFocusedItems());

  onDestroy(() => OnyxNavigation.unregisterGroup(groupId));
</script>

<div class="root">
  <NavGroup {groupId}>
    <slot />
  </NavGroup>
</div>

<style>
  .root {
    flex: 1;
    min-height: 0;
  }
</style>
