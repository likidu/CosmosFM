<script lang="ts">
  import { push, replace } from 'svelte-spa-router';

  import Button from '@/ui/components/buttons/Button.svelte';
  import SelectRow from '@/ui/components/form/SelectRow.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import Typography from '@/ui/components/text/Typography.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import { Color, IconSize } from '@/ui/enums';
  import { IconSubscriptions } from '@/ui/icons';
  import { getShortcutFromIndex } from '@/ui/utils/getShortcutFromIndex';
  import type { Settings } from '../models';

  import { stop } from '@/lib/components/Audio.svelte';
  import { themes } from '@/lib/configs/themes';
  import { Cosmos, useUserStats } from '@/lib/services';
  import { settings } from '@/lib/stores/settings';
  import { user } from '@/lib/stores/user';
  import { formatSeconds } from '@/lib/utils';
  import Divider from '@/ui/components/divider/Divider.svelte';

  let items = new Array(3).fill(null);

  console.log(themes);

  const userStats = useUserStats($user.uid);

  function logout() {
    // Stop current playing episode.
    stop();

    Cosmos.logout();
    replace('/');
  }

  function handleChange(key: keyof Settings, val: any) {
    settings.updateOne(key, val);

    if (key === 'themeId') {
      const theme = themes.find((a) => a.id === $settings.themeId) ?? themes[2];
      settings.update({
        accentColorH: theme.values.accentColorH,
        accentColorS: theme.values.accentColorS,
        accentColorL: theme.values.accentColorL,
        cardColorH: theme.values.cardColorH,
        cardColorS: theme.values.cardColorS,
        cardColorL: theme.values.cardColorL,
        textColorH: theme.values.textColorH,
        textColorS: theme.values.textColorS,
        textColorL: theme.values.textColorL,
        focusColorA: theme.values.focusColorA,
        dividerColorA: theme.values.dividerColorA,
      });
    }
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
    <ListItem
      icon={IconSubscriptions}
      imageSize={IconSize.Small}
      primaryText="Subscriptions"
      navi={{
        itemId: 'SETTINGS_SUBSCRIPTION',
        onSelect: () => push('/subscription'),
      }}
    />
    <Divider />
    <SelectRow
      label="Theme"
      value={$settings.themeId}
      options={[
        { id: 'cosmos', label: 'Cosmos' },
        { id: 'light', label: 'Light' },
      ]}
      onChange={(val) => handleChange('themeId', val)}
    />
    {#each items as item, i}
      <ListItem
        imageUrl="https://place-hold.it/32x32&text="
        primaryText={`Primary Text ${i + 1}`}
        secondaryText="Secondary text"
        navi={{
          itemId: `${i + 1}`,
          shortcutKey: getShortcutFromIndex(i),
          onSelect: () => {},
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
  <ViewFooter />
</View>

<style global lang="postcss">
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
