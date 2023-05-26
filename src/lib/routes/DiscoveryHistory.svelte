<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';

  import PickList from '@/lib/components/PickList.svelte';
  import type { HistoryPickList } from '@/lib/models';
  import { client } from '@/lib/services';

  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';

  const histories = createQuery({
    queryKey: ['histories'],
    queryFn: async (): Promise<HistoryPickList> => {
      const { data } = await client.post('/editor-pick/list-history', {});
      return data;
    },
  });

  const keyMan = OnyxKeys.subscribe(
    {
      onSoftLeft: async () => {},
    },
    { priority: 3 },
  );

  onDestroy(() => keyMan.unsubscribe());
</script>

<View>
  <ViewHeader back={true} title="Discovery History" />
  <ViewContent>
    {#if $histories.isLoading}
      <Typography align="center">Loading...</Typography>
    {:else if $histories.isError}
      <Typography align="center">{$histories.error}</Typography>
    {:else if $histories.isSuccess}
      {#each $histories.data.data as list}
        <PickList {list} />
      {/each}
      <Typography type="titleSmall" align="center" color="secondary">End of list</Typography>
    {/if}
  </ViewContent>
</View>
