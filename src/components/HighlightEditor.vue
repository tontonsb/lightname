<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useHighlitables } from '@/stores/highlitables.ts'

const highlitableStore = useHighlitables()
const { list } = storeToRefs(highlitableStore)

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
</script>

<template>
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
