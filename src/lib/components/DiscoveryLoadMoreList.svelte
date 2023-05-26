<script lang="ts">
  import { push } from 'svelte-spa-router';

  import LineClamp from '@/lib/components/LineClamp.svelte';
  import type { DiscoveryCollection } from '@/lib/models';
  import { COSMOS_FM_CONFIG } from '@/lib/utils';

  import ListHeader from '@/ui/components/list/ListHeader.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import { Alignment } from '@/ui/enums';

  export let list: DiscoveryCollection[];
</script>

{#each list as collection}
  <!-- Skip the HPR_MULTI_RECALL list -->
  {#if collection.targetType !== 'PODCAST'}
    <ListHeader title={collection.title} />
    {#each collection.target as item, i}
      <!-- Only show 6 items as some list has about 10... -->
      {#if i < 6}
        <ListItem
          imageUrl={`${item.episode.podcast.image.thumbnailUrl}${COSMOS_FM_CONFIG.MEDIA_FRAGMENTS_8}`}
          align={Alignment.Top}
          secondaryText={item.recommendation}
          accentText={item.episode.podcast.title}
          navi={{
            itemId: `${collection.moduleType}_${i + 1}`,
            onSelect: () => push(`/episode/${item.episode.eid}`),
          }}
        >
          <svelte:fragment slot="primaryText">
            <LineClamp><span>{item.episode.title}</span></LineClamp>
          </svelte:fragment>
        </ListItem>
      {/if}
    {/each}
  {/if}
{/each}
