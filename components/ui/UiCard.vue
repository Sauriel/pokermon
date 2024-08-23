<template>
  <div>
    <header v-if="hasHeader">
      <slot name="header" />
    </header>
    <slot />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  maxWidth?: string;
}
const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'auto',
});

const slots = useSlots();

const hasHeader = computed<boolean>(() => !!slots.header);
const maxWidth = computed<string>(() => props.maxWidth);
</script>

<style scoped>
div {
  border-radius: 1rem;
  background-color: var(--color-text-transparent-50);
  backdrop-filter: blur(4px);
  padding: 2rem;
  color: var(--color-backgrund);
  max-width: v-bind(maxWidth);
  box-shadow: 0.75rem 0.75rem 0.75rem var(--color-backgrund-transparent-50);
}
</style>