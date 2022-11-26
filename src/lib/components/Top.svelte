<script lang="ts">
  import { push } from 'svelte-spa-router';

  import ListItem from '@/ui/components/list/ListItem.svelte';
  import ListHeader from '@/ui/components/list/ListHeader.svelte';

  import type { TopList } from '@/lib/models';

  export let list: TopList;

  const { data } = list;
</script>

{#each data as topList}
  <ListHeader title={topList.title} />
  {#each topList.items as list, i}
    <ListItem
      imageUrl={list.item.podcast.image.thumbnailUrl}
      primaryText={list.item.title}
      secondaryText={list.item.podcast.title}
      navi={{ itemId: `${topList.category}_${i + 1}`, onSelect: () => push(`/episode/${list.item.eid}`) }}
    />
  {/each}
{/each}
