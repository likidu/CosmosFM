<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { onMount } from 'svelte';
  import Router, { location, pop, replace } from 'svelte-spa-router';

  import OnyxApp from '@/ui/components/app/OnyxApp.svelte';
  import { Onyx } from '@/ui/services';
  import { OnyxKeys } from 'onyx-keys';

  import AppMenu from '@/lib/components/AppMenu.svelte';
  import Audio from '@/lib/components/Audio.svelte';
  import StripShade from '@/lib/components/StripShade.svelte';
  import { player } from '@/lib/stores/player';

  import {
    Category,
    Comment,
    Discovery,
    DiscoveryHistory,
    Episode,
    Inbox,
    Login,
    NotFound,
    Player,
    Podcast,
    Search,
    SearchResult,
    Subscription,
    User,
  } from '@/lib/routes';
  import { settings } from '@/lib/stores/settings';
  import { user } from '@/lib/stores/user';

  const queryClient = new QueryClient();

  const routes = {
    '/': Discovery,
    '/discovery-history': DiscoveryHistory,
    '/login': Login,
    '/inbox': Inbox,
    '/episode/:eid': Episode,
    '/podcast/:pid': Podcast,
    '/player': Player,
    '/search/': Search,
    '/subscription': Subscription,
    '/category': Category,
    '/category/story': Category,
    '/category/game': Category,
    '/category/talk-show': Category,
    '/category/social': Category,
    '/search/:keyword': SearchResult,
    '/user': User,
    '/comment/:eid': Comment,
    '*': NotFound,
  };

  const keyMan = OnyxKeys.subscribe(
    {
      onBackspace: async () => {
        // If on the main screen, let KaiOS minimize the app
        if ($location === '/') {
          console.log('exit app');
          return;
        }

        pop();
      },
    },
    { priority: 1 },
  );

  $: Onyx.settings.update($settings);

  $: if (!$user) replace('/login');

  onMount(() => {
    // TODO: Fix this in a better way
    document.addEventListener(
      'keydown',
      (ev) => {
        if (
          ev.key === 'Backspace' &&
          $location !== '/' &&
          ev.target['tagName'] !== 'TEXTAREA' &&
          ev.target['tagName'] !== 'INPUT'
        ) {
          ev.preventDefault();
        }
      },
      false,
    );
  });
</script>

<OnyxApp>
  {#if $user && $player.eid}
    <Audio />
  {/if}
  <AppMenu slot="app-menu" />
  <QueryClientProvider client={queryClient}>
    <Router {routes} restoreScrollState={true} />
  </QueryClientProvider>
  {#if !process.env.IS_LEGACY && $settings.themeId.toLowerCase().includes('light')}
    <StripShade />
  {/if}
</OnyxApp>
