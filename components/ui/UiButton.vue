<template>
  <button>
    <slot />
  </button>
</template>

<script lang="ts" setup>

</script>

<style scoped>
button {
  border-radius: 0.5rem;
  background-color: var(--color-backgrund);
  padding: 0.5em 1em;
  box-shadow: 0.5rem 0.5rem 0.5rem var(--color-backgrund-transparent-50);
  backdrop-filter: blur(4px);
  border: 2px solid var(--color-backgrund-transparent-50);
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 0.05ch;
  transition: background-color ease-in-out 0.3s;
}

button:hover {
  background-color: var(--color-backgrund-transparent-75);
}
</style>