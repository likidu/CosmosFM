<script lang="ts">
  import { replace } from 'svelte-spa-router';

  import Button from '@/ui/components/buttons/Button.svelte';
  import InputRow from '@/ui/components/form/InputRow.svelte';
  import ListHeader from '@/ui/components/list/ListHeader.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import Typography from '@/ui/components/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';

  import { useSearchPreset } from '@/lib/services';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';

  let keyword = '';

  const preset = useSearchPreset();

  function search(keyword: string) {
    replace(`/search/${encodeURIComponent(keyword)}`);
  }
</script>

<View>
  <ViewHeader title="Search" />
  <ViewContent>
    <InputRow label="Keyword" value={keyword} placeholder="Enter keyword..." onChange={(val) => (keyword = val)} />
    <Button
      title="Search"
      disabled={!!(keyword === '')}
      navi={{
        itemId: 'BUTTON_START',
        onSelect: async () => search(keyword),
      }}
    />
    {#if $preset.status === 'loading'}
      <Typography align="center">Loading</Typography>
    {:else if $preset.status === 'error'}
      <Typography align="center">Error!</Typography>
    {:else}
      <ListHeader title="Suggestions" />
      {#each $preset.data as suggest, i}
        <ListItem
          primaryText={suggest.text}
          navi={{
            itemId: `PRESET_${i + 1}`,
            onSelect: () => {
              const urlParams = new URLSearchParams(suggest.link);
              search(urlParams.get('keyword'));
            },
          }}
        />
      {/each}
    {/if}
  </ViewContent>
</View>
