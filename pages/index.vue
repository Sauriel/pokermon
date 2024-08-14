<template>
  <div id="welcome-screen">
    <UiButton @click="createNewRoom">Create Room</UiButton>
  </div>
</template>

<script lang="ts" setup>
function createNewRoom() {
  $fetch('/api/room/create', { method: 'POST' })
    .then((roomId) => {
      navigateTo(`/room/${roomId}`);
    });
}
</script>

<style scoped>
#welcome-screen {
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>