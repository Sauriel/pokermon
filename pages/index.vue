<template>
  <div id="welcome-screen">
    <Welcome />
    <UiButton @click="createNewArena">Create a new Arena</UiButton>
  </div>
</template>

<script lang="ts" setup>
function createNewArena() {
  $fetch('/api/arena/create', { method: 'POST' })
    .then((arenaId) => {
      navigateTo(`/arena/${arenaId}`);
    });
}
</script>

<style scoped>
#welcome-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>