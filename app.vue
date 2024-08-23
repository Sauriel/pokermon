<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
     <!-- <WebSockets /> -->
  </div>
</template>

<script setup lang="ts">
import '~/styles/reset.css';
import '~/styles/fonts.css';
import '~/styles/base.css';
</script>