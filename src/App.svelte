<script lang="ts">
  import Router, { location, replace, pop } from 'svelte-spa-router';

  import { OnyxKeys } from 'onyx-keys';
  import { Onyx } from '@/ui/services';
  import OnyxApp from '@/ui/components/app/OnyxApp.svelte';

  import AppMenu from '@/lib/components/AppMenu.svelte';

  import { Login, Home, User, NotFound } from '@/lib/routes';
  import { settings } from '@/lib/stores/settings';

  const routes = {
    '/': Home,
    '/login': Login,
    '/user': User,
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
</script>

<OnyxApp>
  <AppMenu slot="app-menu" />
  <Router {routes} />
</OnyxApp>
