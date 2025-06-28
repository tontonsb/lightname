<script setup lang="ts">
import DataLoader from '@/components/DataLoader.vue'
import TheMap from '@/components/TheMap.vue'
import { useBoundaries } from '@/stores/boundaries.ts'

const boundaries = useBoundaries()
</script>

<template>
    <aside>
        <DataLoader />
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

main {
    width: 100%;
    height: 100%;
}
</style>
