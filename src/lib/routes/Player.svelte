<script lang="ts">
  import KaiOS from 'kaios-lib';
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy, onMount } from 'svelte';
  import { push } from 'svelte-spa-router';

  import Progressbar from '@/ui/components/form/Progressbar.svelte';
  import Icon from '@/ui/components/icon/Icon.svelte';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';
  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { IconSize } from '@/ui/enums';
  import { IconBackward, IconComment, IconForward, IconInfo, IconPause, IconPlay } from '@/ui/icons';

  import { formatSeconds } from '@/lib/utils';

  import { pause, play, reload, skip, src } from '@/lib/components/Audio.svelte';
  import LineClamp from '@/lib/components/LineClamp.svelte';
  import { client, useEpisode } from '@/lib/services';
  import { player } from '@/lib/stores/player';
  import { settings } from '@/lib/stores/settings';
  import { COSMOS_FM_CONFIG } from '@/lib/utils';
  import type { PlaybackProgress } from '../models';

  let eid: string;
  let progress = 0;
  let buffered = 0;
  let hasComment = true;

  const imageSize = 144;

  // Episode id always load from local storage
  const episode = useEpisode($player.eid);

  const keyMan = OnyxKeys.subscribe(
    {
      onEnter: async () => {
        // $player.playing ? pause() : play();
        if (!$player.playing) {
          // Only play when buffered
          if ($player.buffered > $player.progress) play();
        } else {
          // Try rewind 1s for audio to load up
          pause();
          skip(-3);
          // Update playback progress if pid has been returned from getting playback progress ever.
          playerbackProgressUpdate();
        }
      },
      onSoftLeft: async () => {
        push(`/episode/${eid}`);
      },
      onSoftRight: async () => {
        push(`/comment/${eid}`);
      },
      onArrowLeft: async () => {
        // Rewind 15s
        skip(-15);
      },
      onArrowLeftLong: async () => {
        // skipTo(0);
        skip(-60);
      },
      onArrowRight: async () => {
        // Wind 30s
        skip(30);
      },
      onArrowRightLong: async () => {
        // skipTo($player.duration - 10);
        skip(120);
      },
      onArrowUp: async () => {
        new KaiOS.Volume().up().catch(() => {});
      },
      onArrowDown: async () => {
        new KaiOS.Volume().down().catch(() => {});
      },
    },
    { priority: 3 },
  );

  // Ensure episode data is loaded
  $: eid = $episode.data?.eid;

  // Load this episode if it's not from the saved Storage
  $: if (eid && src() === '') {
    reload($episode.data.mediaKey, $player.progress);
  }

  $: if (eid) {
    hasComment = $episode.data.commentCount > 0;
  }

  // Set progress bar percent and reserve 3 fraction values (100,000 / 1,000).
  $: progress = Math.round(($player.progress / $player.duration) * 100000) / 1000;
  $: buffered = Math.round(($player.buffered / $player.duration) * 100000) / 1000;

  $: {
    if ($player.eid) keyMan.enable();
    else keyMan.disable();
  }

  async function playbackProgressList(eid: string): Promise<PlaybackProgress[]> {
    const { data } = await client.post('/playback-progress/list', { eids: [eid] });
    return data.data;
  }

  async function playerbackProgressUpdate() {
    const now = new Date().toISOString();
    const resp = await client.post('/playback-progress/update', {
      now,
      data: [{ eid, pid: $player.pid, progress: Math.floor($player.progress), playedAt: now }],
    });
    console.log(resp.data);
  }

  onMount(async () => {
    if ($player.eid) {
      const playback: PlaybackProgress[] = await playbackProgressList($player.eid);
      console.log(playback);
      // Playback is not empty array
      if (playback.length > 0) {
        // And saved progress is behind the service progress
        if ($player.progress < playback[0]['progress']) {
          player.update({ progress: playback[0]['progress'] });
        }
      }
    }
  });

  onDestroy(() => keyMan.unsubscribe());
</script>

<View>
  {#if !$player.eid}
    <ViewHeader title="Player" />
    <ViewContent>
      <Typography align="center">Nothing is playing...</Typography>
    </ViewContent>
  {:else if $episode.isLoading}
    <Typography align="center">Loading...</Typography>
  {:else if $episode.isError}
    <Typography align="center">{$episode.error}</Typography>
  {:else if $episode.isSuccess}
    {@const episode = $episode.data}
    {@const podcastColor = $settings.themeId.toLowerCase().includes('light')
      ? episode.podcast.color.dark
      : episode.podcast.color.light}
    <ViewHeader title={episode.podcast.title} style={`color: ${podcastColor}`} />
    <ViewContent>
      <div class="player-content">
        {#if episode.image}
          <img
            src={`${episode.image.smallPicUrl}${COSMOS_FM_CONFIG.MEDIA_FRAGMENTS_4}`}
            alt="Episode Cover"
            width={imageSize}
          />
        {:else}
          <img
            src={`${episode.podcast.image.smallPicUrl}${COSMOS_FM_CONFIG.MEDIA_FRAGMENTS_4}`}
            alt="Podcast Cover"
            width={imageSize}
          />
        {/if}
        <LineClamp><h1>{episode.title}</h1></LineClamp>
      </div>
    </ViewContent>
    <ViewFooter>
      <div id="time-tracker" class="flex justify-between">
        <span class="text-sm">{formatSeconds($player.progress)}</span>
        <span class="text-sm">{formatSeconds($player.duration - $player.progress)}</span>
      </div>
      <Progressbar value={progress} shade={buffered} />
      <SoftKey>
        <div><Icon size={IconSize.Small} color={podcastColor}><IconInfo /></Icon></div>
        <div class="player-controller">
          <Icon size={IconSize.Small} color={podcastColor}><IconBackward /></Icon>
          {#if $player.playing}
            <Icon size={IconSize.Large} color={podcastColor}><IconPause /></Icon>
          {:else}
            <Icon size={IconSize.Large} color={podcastColor}><IconPlay /></Icon>
          {/if}
          <Icon size={IconSize.Small} color={podcastColor}><IconForward /></Icon>
        </div>
        <div class="flex items-center">
          <Icon size={IconSize.Small} color={podcastColor}><IconComment /></Icon>
          {#if hasComment}
            <span class="text-sm" style={`color: ${podcastColor}`}>{episode.commentCount}</span>
          {/if}
        </div>
      </SoftKey>
    </ViewFooter>
  {/if}
</View>

<style global lang="postcss">
  .player-content {
    @apply flex flex-col items-center px-4;
  }
  .player-content > img {
    @apply rounded-md drop-shadow-xl;
  }
  .player-controller {
    @apply flex justify-center items-center space-x-6;
  }
</style>
