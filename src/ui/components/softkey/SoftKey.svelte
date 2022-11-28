<footer class="softkey">
  <slot />
</footer>

<style global lang="postcss">
  .softkey {
    @apply flex items-center;
  }
  .softkey > div:first-child {
    @apply flex justify-start w-full;
  }
  .softkey > div:nth-child(2) {
    @apply flex justify-center font-bold text-center uppercase mx-auto;
  }
  .softkey > div:last-child {
    @apply flex justify-end w-full;
  }
</style>
