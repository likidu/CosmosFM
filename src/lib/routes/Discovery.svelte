<script lang="ts">
  import Button from '@/ui/components/buttons/Button.svelte';
  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';

  import Banner from '@/lib/components/Banner.svelte';
  import EditorPick from '@/lib/components/EditorPick.svelte';
  import Top from '@/lib/components/Top.svelte';
  import { useDiscoveryList } from '@/lib/services';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';

  const discoveryList = useDiscoveryList();
</script>

<View>
  <ViewHeader title="Discovery" />
  <ViewContent>
    {#if $discoveryList.status === 'loading'}
      <Typography align="center">Loading...</Typography>
    {:else if $discoveryList.status === 'error'}
      <Typography align="center">Error!</Typography>
    {:else}
      {#each $discoveryList.data.data as list}
        {#if list.type === 'DISCOVERY_BANNER'}
          <Banner content={list} />
        {:else if list.type === 'EDITOR_PICK'}
          <EditorPick {list} />
        {:else if list.type === 'TOP_LIST'}
          <Top {list} />
        {/if}
      {/each}
      <Button
        title="Keep discovering"
        disabled={true}
        navi={{
          itemId: 'DISCOVERY_LOAD_MORE',
        }}
      />
    {/if}
  </ViewContent>
</View>
