<script lang="ts">
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';
  import { push } from 'svelte-spa-router';

  import Icon from '@/ui/components/icon/Icon.svelte';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';
  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { IconSize } from '@/ui/enums';
  import { IconMenu, IconSubscriptions } from '@/ui/icons';

  import EpisodeItem from '@/lib/components/EpisodeItem.svelte';
  import { useInboxList } from '@/lib/services';

  const inbox = useInboxList();

  const keyMan = OnyxKeys.subscribe(
    {
      onSoftRight: async () => {
        push('/subscription');
      },
    },
    { priority: 4 },
  );

  onDestroy(() => keyMan.unsubscribe());
</script>

<View>
  <ViewHeader title="Inbox" />
  <ViewContent>
    {#if $inbox.isLoading}
      <Typography align="center">Loading...</Typography>
    {:else if $inbox.isError}
      <Typography align="center">{$inbox.error}</Typography>
    {:else if $inbox.isSuccess}
      <div>
        {#each $inbox.data.data as episode, i}
          <EpisodeItem {episode} idx={i} icon="podcast" />
        {/each}
      </div>
    {/if}
  </ViewContent>
  <ViewFooter>
    <SoftKey>
      <div><Icon size={IconSize.Small}><IconMenu /></Icon></div>
      <div><Icon size={IconSize.Small}><IconSubscriptions /></Icon></div>
    </SoftKey>
  </ViewFooter>
</View>
