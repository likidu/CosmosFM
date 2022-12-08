<script lang="ts">
  import { push } from 'svelte-spa-router';

  import LineClamp from '@/lib/components/LineClamp.svelte';
  import type { DiscoveryCollectionList } from '@/lib/models';

  import ListHeader from '@/ui/components/list/ListHeader.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import { Alignment } from '@/ui/enums';

  export let list: DiscoveryCollectionList;

  const { data } = list;
</script>

{#each data as collectionList}
  <!-- Skip the HPR_MULTI_RECALL list -->
  {#if collectionList.targetType !== 'PODCAST'}
    <ListHeader title={collectionList.title} />
    {#each collectionList.target as item, i}
      <!-- Only show 3 items as some list has about 10... -->
      {#if i < 3}
        <ListItem
          imageUrl={item.episode.podcast.image.thumbnailUrl}
          align={Alignment.Top}
          secondaryText={item.recommendation}
          accentText={item.episode.podcast.title}
          navi={{
            itemId: `${collectionList.moduleType}_${i + 1}`,
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
