<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { push } from 'svelte-spa-router';

  import LineClamp from '@/lib/components/LineClamp.svelte';
  import type { Category, CategoryRequest } from '@/lib/models';
  import { client } from '@/lib/services';
  import { COSMOS_FM_CONFIG } from '@/lib/utils';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import Typography from '@/ui/components/text/Typography.svelte';
  import { Alignment } from '@/ui/enums';

  export let key: string;
  export let categoryId: string;

  const request: CategoryRequest = {
    omitSubscribed: false,
    tab: 'HOT',
    categoryId,
  };

  const query = createQuery<Category[]>({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await client.post('/category/podcast/list-by-tab', request);
      return data.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
</script>

{#if $query.isLoading}
  <Typography align="center">Loading...</Typography>
{:else if $query.isError}
  <Typography align="center">{$query.error}</Typography>
{:else if $query.isSuccess}
  {#each $query.data as item, i}
    <ListItem
      imageUrl={`${item.podcast.image.thumbnailUrl}${COSMOS_FM_CONFIG.MEDIA_FRAGMENTS_8}`}
      align={Alignment.Top}
      secondaryText={item.podcast.brief}
      navi={{ itemId: `CATEGORY_GAME_${i + 1}`, onSelect: () => push(`/episode/${item.episode.eid}`) }}
    >
      <svelte:fragment slot="primaryText">
        <LineClamp><span>{item.podcast.title}</span></LineClamp>
      </svelte:fragment>
      <svelte:fragment slot="bottom">
        <LineClamp class="list-item-comment ">
          <p class="text-sm pl-2 border-l border-divider">
            {item.episode.title}
          </p>
        </LineClamp>
      </svelte:fragment>
    </ListItem>
  {/each}
  <Typography type="titleSmall" align="center" color="secondary">End of list</Typography>
{/if}
