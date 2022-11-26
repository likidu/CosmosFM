<script lang="ts">
  import { location, querystring, replace } from 'svelte-spa-router';

  import View from '@/ui/components/view/View.svelte';
  import ViewContent from '@/ui/components/view/ViewContent.svelte';
  import ViewHeader from '@/ui/components/view/ViewHeader.svelte';
  import Typography from '@/ui/components/Typography.svelte';

  import svelteLogo from '@/assets/svelte.svg';
  import Button from '@/ui/components/buttons/Button.svelte';
  import NumericRange from '@/ui/components/form/NumericRange.svelte';

  let params: URLSearchParams;
  let title = 'Step 1';

  const Step = {
    SendSMS: 'sendsms',
    Login: 'login',
  };

  $: params = new URLSearchParams($querystring);

  function login() {
    return true;
  }

  function next(step: Number = 1) {
    if (!params.get('step')) {
      title = 'Step 2';
      replace(`/login?step=${Step.SendSMS}`);
    }

    if (params.get('step') === Step.SendSMS) {
      title = 'Step 3';
      replace(`/login?step=${Step.Login}`);
    }

    if (params.get('step') === Step.Login) {
      if (step === -1) {
        title = 'Step 2';
        replace(`/login?step=${Step.SendSMS}`);
      } else {
        login();
      }
    }
  }
</script>

<View>
  <ViewHeader {title} />
  <ViewContent>
    {#if !params.get('step')}
      <div class="flex flex-col items-center justify-center">
        <h2>App for KaiOS</h2>
        <img src={svelteLogo} class="w-32 h-32" alt="Svelte Logo" />
      </div>
      <Button
        title="Login with SMS"
        navi={{
          itemId: 'START',
          onSelect: async () => next(),
        }}
      />
    {:else if params.get('step') === Step.SendSMS}
      <Typography align="center" padding="both">Enter your mobile phone</Typography>
      <Button
        title="Send Code"
        navi={{
          itemId: 'SEND',
          onSelect: async () => next(),
        }}
      />
    {:else if params.get('step') === Step.Login}
      <Typography align="center" padding="both">Enter your verification code</Typography>
      <Button
        title="Login"
        navi={{
          itemId: 'LOGIN',
          onSelect: async () => next(),
        }}
      />
      <Button
        title="Resend"
        navi={{
          itemId: 'RESEND',
          onSelect: async () => next(-1),
        }}
      />
    {/if}
  </ViewContent>
</View>
