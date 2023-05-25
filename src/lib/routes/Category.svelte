<script lang="ts">
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';

  import Icon from '@/ui/components/icon/Icon.svelte';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { IconSize } from '@/ui/enums';
  import { IconInbox, IconMenu } from '@/ui/icons';

  const keyMan = OnyxKeys.subscribe(
    {
      onSoftLeft: async () => {},
      onSoftRight: async () => {},
    },
    { priority: 4 },
  );

  onDestroy(() => keyMan.unsubscribe());
</script>

<View>
  <ViewHeader back={true} title="Categories" />
  <ViewContent>
    <p>All categories</p>
  </ViewContent>
  <ViewFooter>
    <SoftKey>
      <div><Icon size={IconSize.Small}><IconMenu /></Icon></div>
      <div><Icon size={IconSize.Small}><IconInbox /></Icon></div>
    </SoftKey>
  </ViewFooter>
</View>
