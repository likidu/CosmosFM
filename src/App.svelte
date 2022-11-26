<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import Router, { location, pop, replace } from 'svelte-spa-router';

  import OnyxApp from '@/ui/components/app/OnyxApp.svelte';
  import { Onyx } from '@/ui/services';
  import { OnyxKeys } from 'onyx-keys';

  import AppMenu from '@/lib/components/AppMenu.svelte';
  import Audio from '@/lib/components/Audio.svelte';
  import { player } from '@/lib/stores/player';

  import { Comment, Discovery, Episode, Inbox, Login, NotFound, Player, User } from '@/lib/routes';
  import { settings } from '@/lib/stores/settings';
  import { user } from '@/lib/stores/user';

  const queryClient = new QueryClient();

  const routes = {
    '/': Discovery,
    '/login': Login,
    '/inbox': Inbox,
    '/episode/:eid': Episode,
    '/player': Player,
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
    { priority: 4 },
  );

  $: Onyx.settings.update($settings);

  $: if (!$user) replace('/login');
</script>

<OnyxApp>
  {#if $user && $player.eid}
    <Audio />
  {/if}
  <AppMenu slot="app-menu" />
  <AppMenu slot="app-menu" />
  <QueryClientProvider client={queryClient}>
    <Router {routes} />
  </QueryClientProvider>
</OnyxApp>
