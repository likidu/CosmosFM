<script lang="ts">
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';
  import { push } from 'svelte-spa-router';

  import Grid from '@/ui/components/grid/Grid.svelte';
  import GridItem from '@/ui/components/grid/GridItem.svelte';
  import Icon from '@/ui/components/icon/Icon.svelte';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';
  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { IconSize } from '@/ui/enums';
  import { IconInbox, IconMenu } from '@/ui/icons';

  import { useSubscriptionList } from '@/lib/services';
  import { COSMOS_FM_CONFIG } from '@/lib/utils';

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
  <ViewContent>
    {#if $subscriptions.isLoading}
      <Typography align="center">Loading...</Typography>
    {:else if $subscriptions.isError}
      <Typography align="center">{$subscriptions.error}</Typography>
    {:else if $subscriptions.isSuccess}
      <Grid>
        {#each $subscriptions.data.data as podcast, i}
          <GridItem
            navi={{
              itemId: `SUBSCRIPTION-${i + 1}`,
              onSelect: () => push(`/podcast/${podcast.pid}`),
            }}
          >
            <div class="p-2">
              <img src={`${podcast.image.smallPicUrl}${COSMOS_FM_CONFIG.MEDIA_FRAGMENTS_4}`} alt="" />
            </div>
          </GridItem>
        {/each}
      </Grid>
    {/if}
  </ViewContent>
  <ViewFooter>
    <SoftKey>
      <div><Icon size={IconSize.Small}><IconMenu /></Icon></div>
      <div><Icon size={IconSize.Small}><IconInbox /></Icon></div>
    </SoftKey>
  </ViewFooter>
</View>
