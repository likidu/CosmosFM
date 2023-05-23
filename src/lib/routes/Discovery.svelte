<script lang="ts">
  import Button from '@/ui/components/buttons/Button.svelte';
  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';

  import Banner from '@/lib/components/Banner.svelte';
  import EditorPickList from '@/lib/components/EditorPickList.svelte';
  import TopList from '@/lib/components/TopList.svelte';
  import { useDiscoveryList } from '@/lib/services';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import DiscoveryLoadMoreList from '../components/DiscoveryLoadMoreList.svelte';

  let loadMoreTitle: string;

  const discoveryList = useDiscoveryList();

  $: if ($discoveryList.isFetching) {
    loadMoreTitle = 'Loading more...';
  } else if ($discoveryList.hasNextPage) {
    loadMoreTitle = 'Load more';
  } else {
    loadMoreTitle = 'End of list';
  }
</script>

<View>
  <ViewHeader title="Discovery" />
  <ViewContent>
    {#if $discoveryList.isLoading}
      <Typography align="center">Loading...</Typography>
    {:else if $discoveryList.isError}
      <Typography align="center">{$discoveryList.error}</Typography>
    {:else if $discoveryList.isSuccess}
      {#each $discoveryList.data.pages as page, i}
        {#each page.data as list}
          {#if list.type === 'DISCOVERY_BANNER'}
            <Banner content={list} />
          {:else if list.type === 'EDITOR_PICK'}
            <EditorPickList {list} />
          {:else if list.type === 'TOP_LIST'}
            <TopList {list} />
          {:else if list.type === 'DISCOVERY_COLLECTION'}
            <DiscoveryLoadMoreList {list} />
          {/if}
        {/each}
      {/each}
      <Button
        title={loadMoreTitle}
        disabled={!$discoveryList.hasNextPage || $discoveryList.isFetchingNextPage}
        navi={{
          itemId: 'DISCOVERY_LOAD_MORE',
          onSelect: () => $discoveryList.fetchNextPage(),
        }}
      />
    {/if}
  </ViewContent>
</View>
