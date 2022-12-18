<script lang="ts">
  import { useQueryClient } from '@sveltestack/svelte-query';
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';
  import { push } from 'svelte-spa-router';

  import Icon from '@/ui/components/icon/Icon.svelte';
  import ListHeader from '@/ui/components/list/ListHeader.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';
  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { Alignment, IconSize, RenderState } from '@/ui/enums';
  import { IconMenu, IconPodcast, IconSubscribeAdd, IconSubscribeRemove } from '@/ui/icons';
  import { Onyx } from '@/ui/services';
  import { appMenu, dialog } from '@/ui/stores';

  import LineClamp from '@/lib/components/LineClamp.svelte';
  import type { SubscriptionMode } from '@/lib/models';
  import { Cosmos, useEpisodeList, usePodcast } from '@/lib/services';

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
              left: { label: 'Cancel', fn: () => console.log('Cancel subscribe') },
              right: { label: 'Subscribe', fn: () => updateSubscription(pid, 'ON') },
            },
          });
        } else if ($podcast.data.subscriptionStatus === 'ON') {
          Onyx.dialog.show({
            title: 'Unsubscribe Podcast',
            body: `Do you want to unsubscribe to ${$podcast.data.title}?`,
            actions: {
              left: { label: 'Cancel', fn: () => console.log('Cancel unsubscribe') },
              right: { label: 'Unsubscribe', fn: () => updateSubscription(pid, 'OFF') },
            },
          });
        }
      },
    },
    { priority: 4 },
  );

  // Ensure podcast data is loaded
  $: pid = $podcast.data?.pid;

  // Prevent keyManager from working when the episode data is not loaded yet and dialog is opened
  $: {
    if (pid && $dialog.state === RenderState.Destroyed) keyMan.enable();
    else keyMan.disable();
  }

  // TODO: Do we need this?
  $: {
    if ($appMenu.state === RenderState.Destroyed) keyMan.enable();
    else keyMan.disable();
  }

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
          <LineClamp lines={4}><span>{podcast.description}</span></LineClamp>
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
            <p class="text-accent">Subscribed</p>
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
            align={Alignment.Top}
            navi={{ itemId: `EPISODE_${i + 1}`, onSelect: () => push(`/episode/${episode.eid}`) }}
          >
            <svelte:fragment slot="primaryText">
              <LineClamp><span>{episode.title}</span></LineClamp>
            </svelte:fragment>
            <svelte:fragment slot="bottom">
              <LineClamp><span class="text-sm text-secondary">{episode.description}</span></LineClamp>
            </svelte:fragment>
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
