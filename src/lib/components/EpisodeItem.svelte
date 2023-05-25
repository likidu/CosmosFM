<script lang="ts">
  import type { HighlightWords } from 'highlight-words';
  import highlightWords from 'highlight-words';
  import { push } from 'svelte-spa-router';

  import Icon from '@/ui/components/icon/Icon.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import { Alignment, Color, IconSize } from '@/ui/enums';
  import { IconComment, IconHeadphone } from '@/ui/icons';

  import LineClamp from '@/lib/components/LineClamp.svelte';
  import type { Episode } from '@/lib/models';
  import { COSMOS_FM_CONFIG, placeholderImage } from '@/lib/utils';

  export let episode: Episode;
  export let idx: number;
  export let icon: 'episode' | 'podcast' = 'episode';
  export let highlight: string = undefined;

  let chunks: HighlightWords.Chunk[];

  $: if (episode.title && highlight) {
    chunks = highlightWords({
      text: episode.title,
      query: highlight,
      matchExactly: true,
    });
  }
</script>

{#if episode.type === 'EPISODE'}
  {@const url = episode.image && icon === 'episode' ? episode.image.thumbnailUrl : episode.podcast.image.thumbnailUrl}

  <ListItem
    imageUrl={`${url}${COSMOS_FM_CONFIG.MEDIA_FRAGMENTS_1}` ?? placeholderImage}
    align={Alignment.Top}
    navi={{ itemId: `${episode.type}_${idx + 1}`, onSelect: () => push(`/episode/${episode.eid}`) }}
  >
    <svelte:fragment slot="primaryText">
      <LineClamp>
        <!-- We use slot to highligh the search keyword -->
        {#if chunks}
          {#each chunks as chunk (chunk.key)}
            <span class:highlight={chunk.match}>{chunk.text}</span>
          {/each}
        {:else}
          <span>{episode.title}</span>
        {/if}
      </LineClamp>
    </svelte:fragment>
    <div slot="bottom">
      <LineClamp><span class="text-sm text-secondary">{episode.description}</span></LineClamp>
      <section class="stats">
        <div class="item">
          <Icon size={IconSize.Smallest} color={Color.Secondary}><IconComment /></Icon>
          <span>{episode.commentCount}</span>
        </div>
        <div class="item">
          <Icon size={IconSize.Smallest} color={Color.Secondary}><IconHeadphone /></Icon>
          <span>{episode.playCount}</span>
        </div>
      </section>
    </div>
  </ListItem>
{/if}

<style lang="postcss">
  .stats {
    color: var(--secondary-text-color);
    @apply flex space-x-6 mt-1;
  }
  :global(.stats > .item) {
    @apply flex items-center space-x-1 text-xl;
  }
  .highlight {
    @apply text-accent font-bold;
  }
</style>
