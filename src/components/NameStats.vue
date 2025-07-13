<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoundaries } from '@/stores/boundaries.ts'
import { useHighlights } from '@/stores/highlights.ts'

const highlitableStore = useHighlights()
const boundaries = useBoundaries()
const { geodata } = storeToRefs(boundaries)

const toplist = computed(() => {
    if (!geodata.value)
        return []

    const stats = new Map()

    for (const feature of geodata.value.features) {
        const name = feature.properties?.name || feature.properties?.['name:en']

        if (!name)
            continue

        name.split(' ')
            .forEach((word: string) => stats.set(word, (stats.get(word) || 0) + 1))
    }

    return [...stats.entries()]
        .map(entry => ({
            word: entry[0],
            occurences: entry[1],
        }))
        .sort((a, b) => b.occurences - a.occurences)
})
</script>

<template>
    <table>
        <thead>
            <tr><th>Word</th> <th>Count</th> <th /></tr>
        </thead>
        <tbody>
            <tr v-for="entry in toplist.slice(0, 10)" :key="entry.word">
                <td>{{ entry.word }}</td>
                <td>{{ entry.occurences }}</td>
                <td>
                    <button
                        v-if="!highlitableStore.has(entry.word)"
                        type="button"
                        @click="() => highlitableStore.add(entry.word)"
                    >
                        +
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    padding: var(--space-base);
    width: 100%;
}

th {
    text-align: left;
}
</style>
