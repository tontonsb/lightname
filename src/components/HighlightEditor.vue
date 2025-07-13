<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useHighlitables } from '@/stores/highlitables.ts'
import { useHighlightPresets } from '@/stores/presets.ts'

const presetSelector = useTemplateRef('presetSelector')

const highlitableStore = useHighlitables()
const { list } = storeToRefs(highlitableStore)

const presetStore = useHighlightPresets()
const { list: presets } = storeToRefs(presetStore)

const addable = ref({
    term: '',
    color: highlitableStore.nextColor,
})

watch(() => highlitableStore.nextColor, newColor => addable.value.color = newColor)

function add() {
    highlitableStore.add(addable.value.term, addable.value.color)

    addable.value.term = ''
    addable.value.color = highlitableStore.nextColor
}

function loadPreset(event: Event) {
    const index = Number((event.target as HTMLSelectElement).value)
    const terms = presets.value[index]?.terms ?? []
console.log(highlitableStore)
    highlitableStore.clear()
    highlitableStore.load(terms)

    if (presetSelector.value) {
        presetSelector.value.value = 'null'
    }
}
</script>

<template>
    <div v-if="presets.length" class="preset-selector">
        <select ref="presetSelector" @change="loadPreset">
            <option
                disabled
                selected
                value="null"
            >Load from preset...</option>
            <option
                v-for="(preset, index) in presets"
                :key="index"
                :value="index"
            >{{ preset.name }}</option>
        </select>
    </div>

    <table>
        <thead>
            <tr><th>Term</th> <th>Color</th><th /></tr>
        </thead>
        <tbody>
            <tr v-for="entry in list" :key="entry.term">
                <td>{{ entry.term }}</td>
                <td>
                    <input
                        v-model="entry.color"
                        readonly
                        type="color"
                    >
                </td>
                <td>
                    <button
                        type="button"
                        class="clear"
                        @click="() => highlitableStore.remove(entry.term)"
                    >
                        ✕
                    </button>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <input
                        v-model="addable.term"
                        required
                        @keyup.enter="add"
                    >
                </td>
                <td>
                    <input
                        v-model="addable.color"
                        type="color"
                        required
                    >
                </td>
                <td>
                    <form ref="form">
                        <button type="button" @click="add">
                            +
                        </button>
                    </form>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<style scoped>
div.preset-selector {
    padding: var(--space-base);
}

select {
    width: 100%;
    padding: var(--space-xs);
}

table {
    padding: var(--space-base);
    width: 100%;
}

th {
    text-align: left;
}

button.clear {
    border: none;
    padding: 0;
}
</style>
