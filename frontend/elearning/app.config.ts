export default defineAppConfig({
  ui: {
    card: {
      slots: {
        root: 'rounded-[calc(var(--ui-radius)*2)]',
        header: 'p-4 sm:px-6 !border-none',
        body: 'py-0 sm:py-0 !border-none flex-1',
        footer: 'p-4 sm:px-6 !border-none mt-auto'
      }
    },
    container: {
      base: 'max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-4'
    },
    skeleton: {
      base: 'animate-pulse rounded-sm bg-(--ui-bg-elevated)'
    }
  }
});
