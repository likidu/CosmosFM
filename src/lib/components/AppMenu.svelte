<script lang="ts">
  import { push } from 'svelte-spa-router';

  import ListItem from '@/ui/components/list/ListItem.svelte';
  import NavGroup from '@/ui/components/nav/NavGroup.svelte';
  import { Onyx } from '@/ui/services';
  import { getShortcutFromIndex } from '@/ui/utils/getShortcutFromIndex';

  import { IconDiscover, IconInbox, IconPlayer, IconSearch, IconUser } from '@/ui/icons';

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
  <div class="header">Cosmos.FM</div>
  <div class="scroller" data-nav-scroller>
    {#each menuItems as item, i}
      <ListItem
        icon={item.icon}
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

<style>
  :global([data-onyx-group-id='app-menu']) {
    border-radius: var(--radius) var(--radius) 0 0;
    background-color: var(--card-color);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .header {
    padding: 5px;
    font-weight: var(--bold-font-weight);
    color: var(--accent-color);
    text-align: center;
  }
  .scroller {
    overflow-y: auto;
    flex: 1;
  }
</style>
