<script setup lang="ts">
import DataLoader from '@/components/DataLoader.vue'
import TheMap from '@/components/TheMap.vue'
import { useBoundaries } from '@/stores/boundaries.ts'

const boundaries = useBoundaries()
</script>

<template>
    <aside>
        <DataLoader/>
        <hr>
        {{ boundaries.name }}
        <section>// Select names (regexes) and adjust colors // suggest names</section>
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
