<script lang="ts">
  import { replace } from 'svelte-spa-router';

  import ListItem from '@/ui/components/list/ListItem.svelte';
  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewFooter from '@/ui/components/view/ViewFooter.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import Button from '@/ui/components/buttons/Button.svelte';
  import Icon from '@/ui/components/icon/Icon.svelte';
  import { IconMenu, IconInfo } from '@/ui/icons';
  import { Color, IconSize } from '@/ui/enums';
  import { getShortcutFromIndex } from '@/ui/utils/getShortcutFromIndex';
  import SoftKey from '@/ui/components/softkey/SoftKey.svelte';

  let items = new Array(10).fill(null);

  function logout() {
    // Stop current playing episode.
    // stop();

    // Client.logout();
    replace('/');
  }
</script>

<View>
  <ViewHeader title="Hello" />
  <ViewContent>
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
  <ViewFooter>
    <SoftKey>
      <div><Icon size={IconSize.Small}><IconMenu /></Icon></div>
      <div>
        <Icon size={IconSize.Small}><IconInfo /></Icon>
      </div>
    </SoftKey>
  </ViewFooter>
</View>
