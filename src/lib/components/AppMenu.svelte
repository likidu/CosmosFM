<script lang="ts">
  import { push } from 'svelte-spa-router';

  import Icon from '@/ui/components/icon/Icon.svelte';
  import ListItem from '@/ui/components/list/ListItem.svelte';
  import NavGroup from '@/ui/components/nav/NavGroup.svelte';
  import { IconSize } from '@/ui/enums';
  import { IconDiscover, IconInbox, IconPlayer, IconSearch, IconUser } from '@/ui/icons';
  import { Onyx } from '@/ui/services';
  import { getShortcutFromIndex } from '@/ui/utils/getShortcutFromIndex';

  import { IconCosmos } from '@/assets/icons';
  import { user } from '@/lib/stores/user';

  type MenuItem = {
    id: string;
    text: string;
    route: string;
    icon: any | null;
  };
  const menuItems: MenuItem[] = [
    { id: 'discovery', text: 'Discovery', route: '#/', icon: IconDiscover },
    { id: 'inbox', text: 'Inbox', route: '/inbox', icon: IconInbox },
    { id: 'search', text: 'Search', route: '/search', icon: IconSearch },
    { id: 'player', text: 'Player', route: '/player', icon: IconPlayer },
    { id: 'user', text: 'User', route: '/user', icon: IconUser },
  ];
</script>

<NavGroup groupId="app-menu">
  <div class="header">
    <div class="flex items-center">
      <Icon><IconCosmos /></Icon>
      <strong class="text-sm">Cosmos.FM</strong>
    </div>
    {#if $user}
      <img src={$user.avatar.picture.thumbnailUrl} class="rounded-full w-8 h-8" alt="CosmosFM" />
    {/if}
  </div>
  <div class="scroller" data-nav-scroller>
    {#each menuItems as item, i}
      <ListItem
        icon={item.icon}
        imageSize={IconSize.Small}
        primaryText={item.text}
        navi={{
          itemId: item.id,
          shortcutKey: getShortcutFromIndex(i),
          onSelect: () => {
            Onyx.appMenu.close();
            if (location.hash.startsWith(`#${item.route}`)) {
              return;
            }
            push(item.route);
          },
        }}
      />
    {/each}
  </div>
</NavGroup>

<style lang="postcss">
  :global([data-onyx-group-id='app-menu']) {
    border-radius: var(--radius) var(--radius) 0 0;
    background-color: var(--card-color);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .header {
    @apply flex items-center justify-between p-4 text-accent;
  }
  .scroller {
    overflow-y: auto;
    flex: 1;
  }
</style>
