<script lang="ts">
  import { push } from 'svelte-spa-router';

  import ListHeader from '@/ui/components/list/ListHeader.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import { Alignment } from '@/ui/enums';

  import LineClamp from '@/lib/components/LineClamp.svelte';
  import type { EditorPickList } from '@/lib/models';

  export let list: EditorPickList;

  const { data } = list;
</script>

<ListHeader title={data.date} />
{#each data.picks as pick, i}
  <ListItem
    imageUrl={pick.episode.podcast.image.thumbnailUrl}
    align={Alignment.Top}
    secondaryText={pick.episode.podcast.title}
    navi={{ itemId: `EDITOR_PICK_${i + 1}`, onSelect: () => push(`/episode/${pick.episode.eid}`) }}
  >
    <svelte:fragment slot="primaryText">
      <LineClamp><span>{pick.episode.title}</span></LineClamp>
    </svelte:fragment>
    <svelte:fragment slot="bottom">
      <LineClamp class="pick-comment">
        <p class="text-sm pl-2 border-l border-divider">
          <strong>{pick.comment.author.nickname}: </strong>{pick.comment.text}
        </p>
      </LineClamp>
    </svelte:fragment>
  </ListItem>
{/each}

<style lang="postcss">
  :global(.pick-comment) {
    @apply p-1;
  }
</style>
