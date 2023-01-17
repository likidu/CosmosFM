<script lang="ts">
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';

  import { IconArrowsDown, IconArrowsUp } from '@/ui/icons';

  import { Onyx } from '@/ui/services';

  export let groupId: string;
  export let style = '';
  export let flex = true;

  let scroller: HTMLDivElement;

  const keyMan = OnyxKeys.subscribe(
    {
      onArrowUpLong: async () => {
        if (scroller && scroller.scrollTop !== 0) {
          scroller.scrollTop = 0;
          Onyx.toaster.show({ type: 'success', icon: IconArrowsUp, title: 'Scroll to top...' });
        }
      },
      onArrowDownLong: async () => {
        if (scroller && scroller.scrollTop !== scroller.scrollHeight) {
          scroller.scrollTop = scroller.scrollHeight;
          Onyx.toaster.show({ type: 'success', icon: IconArrowsDown, title: 'Scroll to bottom...' });
        }
      },
    },
    { priority: 1 },
  );

  onDestroy(() => keyMan.unsubscribe());
</script>

<div class="root" class:flex {style} data-onyx-group-id={groupId}>
  <div bind:this={scroller} class="scroller" data-onyx-scroller>
    <slot />
  </div>
</div>

<style>
  .root {
    height: 100%;
  }
  .flex {
    flex: 1;
    min-height: 0;
  }
  .scroller {
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }
</style>
