<script lang="ts">
  import { push } from 'svelte-spa-router';

  import ListHeader from '@/ui/components/list/ListHeader.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import { Alignment } from '@/ui/enums';

  import LineClamp from '@/lib/components/LineClamp.svelte';
  import type { TopList } from '@/lib/models';

  export let list: TopList;

  const { data } = list;
</script>

{#each data as topList}
  <ListHeader title={topList.title} />
  {#each topList.items as list, i}
    <ListItem
      imageUrl={list.item.podcast.image.thumbnailUrl}
      align={Alignment.Top}
      secondaryText={list.item.podcast.title}
      navi={{ itemId: `${topList.category}_${i + 1}`, onSelect: () => push(`/episode/${list.item.eid}`) }}
    >
      <svelte:fragment slot="primaryText">
        <LineClamp><span>{list.item.title}</span></LineClamp>
      </svelte:fragment>
    </ListItem>
  {/each}
{/each}
