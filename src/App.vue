<script setup lang="ts">
import DataLoader from '@/components/DataLoader.vue'
import HighlightEditor from '@/components/HighlightEditor.vue'
import NameStats from '@/components/NameStats.vue'
import TheMap from '@/components/TheMap.vue'
</script>

<template>
    <aside>
        <DataLoader />
        <hr>
        <HighlightEditor />
        <hr>
        <NameStats />
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
