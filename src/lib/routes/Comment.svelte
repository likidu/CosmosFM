<script lang="ts">
  import Button from '@/ui/components/buttons/Button.svelte';
  import Icon from '@/ui/components/icon/Icon.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';
  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { Alignment, IconSize } from '@/ui/enums';

  import { dayjs } from 'svelte-time';

  import LineClamp from '@/lib/components/LineClamp.svelte';
  import { useCommentList } from '@/lib/services';
  import { IconMenu, IconPencil } from '@/ui/icons';

  export let params: { eid: string };

  let load: string;

  const comments = useCommentList(params.eid);

  $: if ($comments.isFetching) {
    load = 'Loading more...';
  } else if ($comments.hasNextPage) {
    load = 'Load more';
  } else {
    load = 'End of list';
  }
</script>

<View>
  {#if $comments.status === 'loading'}
    <Typography align="center">Loading</Typography>
  {:else if $comments.status === 'error'}
    <Typography align="center">Error!</Typography>
  {:else}
    <ViewHeader title={`Comments ${$comments.data.pages[0].totalCount.toString()}`} />
    <ViewContent>
      {#each $comments.data.pages as page, i}
        {#each page.data as comment, j}
          <ListItem
            imageUrl={comment.author.avatar.picture.thumbnailUrl}
            align={Alignment.Top}
            imageStyle="circle"
            imageSize={IconSize.Small}
            primaryText={comment.author.nickname}
            secondaryText={dayjs().to(comment.createdAt)}
            navi={{ itemId: `${comment.type}_${i + 1}_${j + 1}` }}
          >
            <div slot="bottom" class="comment-content">
              <LineClamp lines={5}>
                <p>{@html comment.text}</p>
              </LineClamp>
              {#if comment.replies.length > 0}
                <div class="comment-reply text-sm">
                  {#each comment.replies as reply}
                    <LineClamp lines={3}>
                      <span class="text-secondary">{reply.author.nickname}&#58; </span>
                      <span>{reply.text}</span>
                    </LineClamp>
                  {/each}
                </div>
              {/if}
            </div>
          </ListItem>
        {/each}
      {/each}
      <Button
        title={load}
        disabled={!$comments.hasNextPage || $comments.isFetchingNextPage}
        navi={{
          itemId: 'LOAD_MORE',
          onSelect: () => $comments.fetchNextPage(),
        }}
      />
    </ViewContent>
    <ViewFooter>
      <SoftKey>
        <div><Icon size={IconSize.Small}><IconMenu /></Icon></div>
        <div>
          <Icon size={IconSize.Small}><IconPencil /></Icon>
        </div>
      </SoftKey>
    </ViewFooter>
  {/if}
</View>

<style lang="postcss">
  /* Route: Comment */
  .comment-content {
    @apply my-2;
  }
  .comment-reply {
    @apply p-2;
  }
</style>
