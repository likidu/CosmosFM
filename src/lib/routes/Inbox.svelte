<script lang="ts">
  import Typography from '@/ui/components/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';

  import EpisodeItem from '@/lib/components/EpisodeItem.svelte';
  import { useInboxList } from '@/lib/services';

  const inbox = useInboxList();
</script>

<View>
  {#if $inbox.status === 'loading'}
    <Typography align="center">Loading...</Typography>
  {:else if $inbox.status === 'error'}
    <Typography align="center">Error!</Typography>
  {:else}
    <ViewHeader title="Inbox" />
    <ViewContent>
      <div>
        {#each $inbox.data.data as episode, i}
          <EpisodeItem {episode} idx={i} icon="podcast" />
        {/each}
      </div>
    </ViewContent>
  {/if}
</View>
