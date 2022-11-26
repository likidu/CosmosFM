<script lang="ts">
  import Button from '@/ui/components/buttons/Button.svelte';
  import Icon from '@/ui/components/icon/Icon.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';
  import Typography from '@/ui/components/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { IconSize } from '@/ui/enums';

  import { dayjs } from 'svelte-time';

  import { useCommentList } from '@/lib/services';
  import { IconInfo, IconMenu } from '@/ui/icons';

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
            imageStyle="circle"
            imageSize={IconSize.Small}
            primaryText={comment.author.nickname}
            secondaryText={dayjs().to(comment.createdAt)}
            navi={{ itemId: `${comment.type}_${i + 1}_${j + 1}` }}
          >
            <div slot="bottom" class="comment-content">
              <section class="line-clamp-4">{@html comment.text}</section>
              {#if comment.replies.length > 0}
                <div class="comment-reply">
                  {#each comment.replies as reply}
                    <div class="line-clamp-3">
                      <span class="text-secondary">{reply.author.nickname}&#58; </span>
                      <span>{reply.text}</span>
                    </div>
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
          <Icon size={IconSize.Small}><IconInfo /></Icon>
        </div>
      </SoftKey>
    </ViewFooter>
  {/if}
</View>
