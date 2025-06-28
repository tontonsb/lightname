<script setup lang="ts">
import TheMap from './components/TheMap.vue'
</script>

<template>
  <aside>
    <section>
      // Load/select dataset
    </section>

    <section>
      // Select names (regexes) and adjust colors
      // suggest names
    </section>
  </aside>

  <main>
    <TheMap />
  </main>
</template>

<style scoped>
aside {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
