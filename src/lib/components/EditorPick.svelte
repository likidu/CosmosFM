<script lang="ts">
  import { push } from 'svelte-spa-router';

  import ListItem from '@/ui/components/list/ListItem.svelte';
  import ListHeader from '@/ui/components/list/ListHeader.svelte';

  import type { EditorPickList } from '@/lib/models';

  export let list: EditorPickList;

  const { data } = list;

  // TODO: line clamp is not working on KaiOS 2.5
</script>

<ListHeader title={data.date} />
{#each data.picks as pick, i}
  <ListItem
    imageUrl={pick.episode.podcast.image.thumbnailUrl}
    primaryText={pick.episode.title}
    secondaryText={pick.episode.podcast.title}
    navi={{ itemId: `EDITOR_PICK_${i + 1}`, onSelect: () => push(`/episode/${pick.episode.eid}`) }}
  >
    <div slot="bottom" class="comment">
      <p class="line-clamp-3 text-lg pl-2 border-l border-divider">
        <strong>{pick.comment.author.nickname}: </strong>{pick.comment.text}
      </p>
    </div>
  </ListItem>
{/each}

<style lang="postcss" type="text/postcss">
  .comment {
    @apply p-1;
  }
</style>
