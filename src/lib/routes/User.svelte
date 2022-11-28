<script lang="ts">
  import { replace } from 'svelte-spa-router';

  import Button from '@/ui/components/buttons/Button.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import Typography from '@/ui/components/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { Color } from '@/ui/enums';
  import { getShortcutFromIndex } from '@/ui/utils/getShortcutFromIndex';

  import { stop } from '@/lib/components/Audio.svelte';
  import { Cosmos, useUserStats } from '@/lib/services';
  import { user } from '@/lib/stores/user';
  import { formatSeconds } from '@/lib/utils';

  let items = new Array(3).fill(null);

  const userStats = useUserStats($user.uid);

  function logout() {
    // Stop current playing episode.
    stop();

    Cosmos.logout();
    replace('/');
  }
</script>

<View>
  <ViewHeader title="User" />
  <ViewContent>
    {#if $userStats.status === 'loading'}
      <Typography align="center">Loading...</Typography>
    {:else if $userStats.status === 'error'}
      <Typography align="center">Error!</Typography>
    {:else}
      {@const time = formatSeconds($userStats.data.totalPlayedSeconds, 'array')}
      {#if $user}
        <div class="user-stats">
          <section class="user-stats-header">
            <div>
              <h2>{$user.nickname}</h2>
              <figure>
                <h2>{time[0]}</h2>
                <span>hrs</span>
                <h2>{time[1]}</h2>
                <span>mins</span>
                <span>played</span>
              </figure>
            </div>
            <img src={$user.avatar.picture.smallPicUrl} class="rounded-full w-24 h-24" alt="Avatar" />
          </section>
          <section class="user-stats-numbers">
            <figure>
              <h2>{$userStats.data.subscriptionCount}</h2>
              <figcaption>Subscriptions</figcaption>
            </figure>
            <figure>
              <h2>{$userStats.data.followingCount}</h2>
              <figcaption>Followings</figcaption>
            </figure>
            <figure>
              <h2>{$userStats.data.followerCount}</h2>
              <figcaption>Followers</figcaption>
            </figure>
          </section>
        </div>
      {/if}
    {/if}
    {#each items as item, i}
      <ListItem
        imageUrl="https://place-hold.it/32x32&text="
        primaryText={`Primary Text ${i + 1}`}
        secondaryText="Secondary text"
        navi={{
          itemId: `${i + 1}`,
          shortcutKey: getShortcutFromIndex(i),
        }}
      />
    {/each}
    <Button
      title="Logout"
      color={Color.Primary}
      navi={{
        itemId: 'logout',
        onSelect: () => logout(),
      }}
    />
  </ViewContent>
</View>

<style lang="postcss">
  .user-stats {
    @apply px-3;
  }
  .user-stats-header {
    @apply flex justify-between;
  }
  .user-stats-header figure h2 {
    @apply inline text-accent m-0;
  }
  .user-stats-header figure span {
    @apply inline text-sm text-secondary;
  }
  .user-stats-numbers {
    @apply flex justify-between space-x-2 mt-3;
  }
  .user-stats-numbers h2 {
    @apply m-0;
  }
  .user-stats-numbers figcaption {
    @apply text-sm text-secondary;
  }
</style>
