import type { highlightPreset } from '@/lists/data_presets.ts'
import { defineStore } from 'pinia'

export const useHighlightPresets = defineStore('highlightPresets', {
    state: () => ({
        list: [] as highlightPreset[],
    }),
    actions: {
        clear() {
            this.list = []
        },
        load(list: highlightPreset[]) {
            this.list = list
        }
    },
})
