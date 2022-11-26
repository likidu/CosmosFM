<script lang="ts">
  import { useQueryClient } from '@sveltestack/svelte-query';
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';
  import { push } from 'svelte-spa-router';

  import Icon from '@/ui/components/icon/Icon.svelte';
  import ListHeader from '@/ui/components/list/ListHeader.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import Typography from '@/ui/components/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import { IconSize } from '@/ui/enums';
  import { IconMenu, IconPodcast, IconSubscribeAdd, IconSubscribeRemove } from '@/ui/icons';
  import { Onyx } from '@/ui/services';

  import type { SubscriptionMode } from '@/lib/models';
  import { Cosmos, useEpisodeList, usePodcast } from '@/lib/services';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';

  export let params: { pid: string };

  let pid: string;

  const podcast = usePodcast(params.pid);
  const episodeList = useEpisodeList(params.pid);

  const queryClient = useQueryClient();

  const keyMan = OnyxKeys.subscribe(
    {
      onSoftRight: async () => {
        if ($podcast.data.subscriptionStatus === 'OFF') {
          Onyx.dialog.show({
            title: 'Subscribe Podcast',
            body: `Do you want to subscribe to ${$podcast.data.title}?`,
            actions: {
              left: { label: 'Cancel', fn: () => console.log('Cancel') },
              right: { label: 'Subscribe', fn: () => updateSubscription(pid, 'ON') },
            },
          });
        } else if ($podcast.data.subscriptionStatus === 'ON') {
          Onyx.dialog.show({
            title: 'Unsubscribe Podcast',
            body: `Do you want to unsubscribe to ${$podcast.data.title}?`,
            actions: {
              left: { label: 'Cancel', fn: () => console.log('Cancel') },
              right: { label: 'Unsubscribe', fn: () => updateSubscription(pid, 'OFF') },
            },
          });
        }
      },
    },
    { priority: 3 },
  );

  function updateSubscription(pid: string, mode: SubscriptionMode) {
    Cosmos.updateSubscription(pid, mode);
    queryClient.invalidateQueries('podcast');
  }

  onDestroy(() => keyMan.unsubscribe());
</script>

<View>
  {#if $podcast.status === 'loading'}
    <Typography align="center">Loading...</Typography>
  {:else if $podcast.status === 'error'}
    <Typography align="center">Error!</Typography>
  {:else}
    {@const podcast = $podcast.data}
    {@const podcastColor = podcast.color.dark}
    <ViewHeader title={podcast.title} style={`color: ${podcastColor}`} />
    <ViewContent>
      <div class="flex flex-col space-y-2 px-3">
        <div class="flex space-x-2">
          <p class="line-clamp-4">{podcast.description}</p>
          <img src={podcast.image.thumbnailUrl} class="inline-box rounded-sm w-24 h-24" alt="Podcast" />
        </div>
        {#each podcast.podcasters as podcaster}
          <div class="flex items-center space-x-2">
            <img src={podcaster.avatar.picture.thumbnailUrl} class="rounded-full w-8" alt="Podcast" />
            <p class="text-sm text-secondary">{podcaster.nickname}</p>
          </div>
        {/each}
        <div class="flex items-center justify-between space-x-2">
          <p><strong>{podcast.subscriptionCount}</strong> subscribers</p>
          {#if podcast.subscriptionStatus === 'ON'}
            <p>Subscribed</p>
          {/if}
        </div>
      </div>
      {#if $episodeList.status === 'loading'}
        <Typography align="center">Loading...</Typography>
      {:else if $episodeList.status === 'error'}
        <Typography align="center">Error!</Typography>
      {:else}
        {@const list = $episodeList.data}
        <ListHeader title="Last 20 Episodes" />
        {#each list.data as episode, i}
          <ListItem
            icon={IconPodcast}
            primaryText={episode.title}
            navi={{ itemId: `EPISODE_${i + 1}`, onSelect: () => push(`/episode/${episode.eid}`) }}
          >
            <div slot="bottom">
              <p class="line-clamp-2 text-sm">{episode.description}</p>
            </div>
          </ListItem>
        {/each}
      {/if}
    </ViewContent>
    <ViewFooter>
      <SoftKey>
        <div><Icon size={IconSize.Small} color={podcastColor}><IconMenu /></Icon></div>
        <div>
          <Icon size={IconSize.Small} color={podcastColor}>
            {#if podcast.subscriptionStatus === 'ON'}
              <IconSubscribeRemove />
            {:else}
              <IconSubscribeAdd />
            {/if}
          </Icon>
        </div>
      </SoftKey>
    </ViewFooter>
  {/if}
</View>
