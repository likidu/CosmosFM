<script lang="ts">
  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';

  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';
  import { replace } from 'svelte-spa-router';

  import EpisodeItem from '@/lib/components/EpisodeItem.svelte';
  import { useSearchResultList } from '@/lib/services';

  export let params: { keyword: string };

  const result = useSearchResultList(params.keyword);

  const keyMan = OnyxKeys.subscribe(
    {
      onBackspace: async () => {
        replace('/search');
      },
      onSoftLeft: async () => {},
    },
    { priority: 3 },
  );

  onDestroy(() => keyMan.unsubscribe());
</script>

<View>
  <ViewHeader back={true} title={params.keyword} />
  <ViewContent>
    {#if $result.status === 'loading'}
      <Typography align="center">Loading</Typography>
    {:else if $result.status === 'error'}
      <Typography align="center">Error!</Typography>
    {:else}
      {#each $result.data.data as episode, i}
        <EpisodeItem {episode} idx={i} highlight={params.keyword} />
      {/each}
    {/if}
  </ViewContent>
</View>
