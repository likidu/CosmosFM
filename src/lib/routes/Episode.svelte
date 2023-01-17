<script context="module" lang="ts">
  import dayjs from 'dayjs/esm';
  import 'dayjs/esm/locale/zh';

  // Day.js use Chinese locale
  dayjs.locale('zh');
</script>

<script lang="ts">
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';
  import { push } from 'svelte-spa-router';
  import Time from 'svelte-time';

  import Icon from '@/ui/components/icon/Icon.svelte';
  import NavItem from '@/ui/components/nav/NavItem.svelte';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';
  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { IconSize, RenderState } from '@/ui/enums';
  import { IconChevronRight, IconComment, IconMenu } from '@/ui/icons';
  import { appMenu } from '@/ui/stores';

  import { load, play } from '@/lib/components/Audio.svelte';
  import { Cosmos, useEpisode } from '@/lib/services';
  import { player } from '@/lib/stores/player';
  import { formatSeconds } from '@/lib/utils';

  export let params: { eid: string };

  let eid: string;
  let hasComment = true;

  const episode = useEpisode(params.eid);

  const keyMan = OnyxKeys.subscribe(
    {
      onEnter: async () => {
        if (eid && eid !== $player.eid) {
          // Stop current playing episode.
          stop();
          // Load this episode.
          const { mediaKey, duration } = $episode.data;
          load(eid, mediaKey, duration);
          // Immediate play the episode once loaded.
          play();
          // TODO: Update playlist, remove from inbox and create episode-played
          Cosmos.removeInbox(eid);
        }
        push('/player');
      },
      onSoftRight: async () => {
        if (hasComment) push(`/comment/${eid}`);
      },
    },
    { priority: 3 },
  );

  // Ensure episode data is loaded
  $: eid = $episode.data?.eid;

  $: if (eid) {
    hasComment = !!($episode.data.commentCount > 0);
  }

  // Prevent keyManager from working when the episode data is not loaded yet
  $: {
    if (eid && $appMenu.state === RenderState.Destroyed) keyMan.enable();
    else keyMan.disable();
  }

  onDestroy(() => keyMan.unsubscribe());
</script>

<View>
  {#if $episode.status === 'loading'}
    <Typography align="center">Loading...</Typography>
  {:else if $episode.status === 'error'}
    <Typography align="center">Error!</Typography>
  {:else}
    {@const episode = $episode.data}
    {@const podcastColor = episode.podcast.color.dark}
    {@const time = formatSeconds(episode.duration, 'array')}
    <ViewHeader title={episode.podcast.title} style={`color: ${podcastColor}`} />
    <ViewContent>
      <div class="episode-content">
        <img src={episode.podcast.image.thumbnailUrl} alt="Podcast Cover" class="rounded-sm w-20 h-20" />
        <h1>{episode.title}</h1>
        <NavItem
          navi={{
            itemId: 'EPISODE-SECTION-1',
            onFocus: () => keyMan.disable(),
            onBlur: () => keyMan.enable(),
            onSelect: () => push(`/podcast/${episode.podcast.pid}`),
          }}
        >
          <div class="flex items-center">
            <p><strong>{episode.podcast.title}</strong></p>
            <Icon size={IconSize.Small}><IconChevronRight /></Icon>
          </div>
        </NavItem>
        <!-- Wrap below in NavItem just for the focus move away from the podcast link -->
        <NavItem navi={{ itemId: 'EPISODE-SECTION-2' }} nofocus={true}>
          <div class="flex space-x-2 text-secondary mb-4">
            <span>{time[0] ? `${time[0]}hrs` : ''} {`${time[1]}mins`}</span>
            <span>/</span>
            <span><Time relative timestamp={episode.pubDate} /></span>
          </div>
        </NavItem>
        <section class="shownotes">{@html episode.shownotes}</section>
      </div>
    </ViewContent>
    <ViewFooter>
      <SoftKey>
        <div><Icon size={IconSize.Small} color={podcastColor}><IconMenu /></Icon></div>
        <div style={`color: ${podcastColor}`}>Play</div>
        <div class="flex items-center">
          <Icon size={IconSize.Small} color={podcastColor} disabled={!hasComment}><IconComment /></Icon>
          {#if hasComment}
            <span class="text-sm" style={`color: ${podcastColor}`}>{episode.commentCount}</span>
          {/if}
        </div>
      </SoftKey>
    </ViewFooter>
  {/if}
</View>

<style global lang="postcss">
  .episode-content {
    @apply px-2;
  }

  .shownotes {
    @apply flex flex-col;
  }
  .shownotes > p {
    @apply mb-4;
  }
</style>
