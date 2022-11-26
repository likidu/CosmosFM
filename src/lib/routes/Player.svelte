<script lang="ts">
  import { pause, play, reload, skip, skipTo, src } from '@/lib/components/Audio.svelte';
  import { useEpisode } from '@/lib/services';
  import { player } from '@/lib/stores/player';
  import { OnyxKeys } from 'onyx-keys';

  import KaiOS from 'kaios-lib';
  import { onDestroy } from 'svelte';
  import { push } from 'svelte-spa-router';

  import Progressbar from '@/ui/components/form/Progressbar.svelte';
  import Icon from '@/ui/components/icon/Icon.svelte';
  import Typography from '@/ui/components/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { IconSize } from '@/ui/enums';
  import { IconBackward, IconComment, IconForward, IconInfo, IconPause, IconPlay } from '@/ui/icons';

  import { formatSeconds } from '@/lib/utils';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';

  let eid: string;
  let progress = 0;
  let buffered = 0;

  const imageSize = 144;

  const episode = useEpisode($player.eid);

  const keyMan = OnyxKeys.subscribe(
    {
      onEnter: async () => {
        // $player.playing ? pause() : play();
        if (!$player.playing) {
          // Only play when buffered
          if ($player.buffered > $player.progress) play();
        } else {
          pause();
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
        skipTo(0);
      },
      onArrowRight: async () => {
        // Wind 30s
        skip(30);
      },
      onArrowRightLong: async () => {
        skipTo($player.duration - 10);
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

  $: if (eid && src() === '') {
    // Load this episode.
    reload($episode.data.mediaKey, $player.progress);
  }

  // Set progress bar percent and reserve 3 fraction values (100,000 / 1,000).
  $: progress = Math.round(($player.progress / $player.duration) * 100000) / 1000;
  $: buffered = Math.round(($player.buffered / $player.duration) * 100000) / 1000;

  $: {
    if ($player.eid) keyMan.enable();
    else keyMan.disable();
  }

  onDestroy(() => keyMan.unsubscribe());
</script>

<View>
  {#if !$player.eid}
    <ViewHeader title="Player" />
    <ViewContent>
      <Typography align="center">Nothing is playing...</Typography>
    </ViewContent>
  {:else if $episode.status === 'loading'}
    <Typography align="center">Loading...</Typography>
  {:else if $episode.status === 'error'}
    <Typography align="center">Error!</Typography>
  {:else}
    {@const episode = $episode.data}
    <ViewHeader title={episode.podcast.title} style={`color: ${episode.podcast.color.light}`} />
    <ViewContent>
      <div class="player-content">
        {#if episode.image}
          <img src={episode.image.smallPicUrl} alt="Episode Cover" width={imageSize} />
        {:else}
          <img src={episode.podcast.image.smallPicUrl} alt="Podcast Cover" width={imageSize} />
        {/if}
        <h2 class="line-clamp-2">{episode.title}</h2>
      </div>
    </ViewContent>
    <ViewFooter>
      <div id="time-tracker" class="flex justify-between">
        <span class="text-sm">{formatSeconds($player.progress)}</span>
        <span class="text-sm">{formatSeconds($player.duration - $player.progress)}</span>
      </div>
      <Progressbar value={progress} shade={buffered} />
      <SoftKey>
        <div><Icon size={IconSize.Small}><IconInfo /></Icon></div>
        <div class="player-controller">
          <Icon size={IconSize.Small}><IconBackward /></Icon>
          {#if $player.playing}
            <Icon size={IconSize.Large}><IconPause /></Icon>
          {:else}
            <Icon size={IconSize.Large}><IconPlay /></Icon>
          {/if}
          <Icon size={IconSize.Small}><IconForward /></Icon>
        </div>
        <div><Icon size={IconSize.Small}><IconComment /></Icon></div>
      </SoftKey>
    </ViewFooter>
  {/if}
</View>

<style global lang="postcss" type="text/postcss">
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
