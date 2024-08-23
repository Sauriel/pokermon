<template>
  <UiCard max-width="max(50vw, 500px)">
    <template #header>
      <h1>
        <span>Pokermon</span>
        <span>Pokermon</span>
      </h1>
    </template>
    <p>Welcome to Pokermon, where your cards are your superpowers! Get ready to unleash your inner Pokermaster as you estimate with style, flair, and a sprinkle of fun. May the best story point win, and remember—gotta catch 'em all (the estimates, that is)!</p>
  </UiCard>
</template>

<script lang="ts" setup>

</script>

<style scoped>
  h1 {
    display: grid;
    grid-template-areas: "logo";
    justify-content: center;
    align-items: center;
    font-size: 5rem;
  }

  h1 > span:first-child {
    grid-area: logo;
    font-family: "Pokemon Solid";
    color: #ffcb05;
  }

  h1 > span:last-child {
    grid-area: logo;
    font-family: "Pokemon Hollow";
    color: #2a75bb;
  }

  p {
    text-align: center;
  }
</style>