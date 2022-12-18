<script lang="ts">
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';
  import { push } from 'svelte-spa-router';

  import Icon from '@/ui/components/icon/Icon.svelte';
  import NavItem from '@/ui/components/nav/NavItem.svelte';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';
  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { IconSize } from '@/ui/enums';
  import { IconInbox, IconMenu } from '@/ui/icons';

  import { useSubscriptionList } from '@/lib/services';

  const subscriptions = useSubscriptionList();

  const keyMan = OnyxKeys.subscribe(
    {
      onSoftRight: async () => {
        push('/inbox');
      },
    },
    { priority: 4 },
  );

  onDestroy(() => keyMan.unsubscribe());
</script>

<View>
  <ViewHeader title="Subscriptions" />
  {#if $subscriptions.status === 'loading'}
    <Typography align="center">Loading...</Typography>
  {:else if $subscriptions.status === 'error'}
    <Typography align="center">Error!</Typography>
  {:else}
    <ViewContent>
      <div class="grid grid-cols-3">
        {#each $subscriptions.data.data as podcast, i}
          <NavItem
            navi={{
              itemId: `SUBSCRIPTION-${i + 1}`,
              onSelect: () => push(`/podcast/${podcast.pid}`),
            }}
          >
            <div class="p-2"><img src={podcast.image.smallPicUrl} alt="" /></div>
          </NavItem>
        {/each}
      </div>
    </ViewContent>
  {/if}
  <ViewFooter>
    <SoftKey>
      <div><Icon size={IconSize.Small}><IconMenu /></Icon></div>
      <div><Icon size={IconSize.Small}><IconInbox /></Icon></div>
    </SoftKey>
  </ViewFooter>
</View>
