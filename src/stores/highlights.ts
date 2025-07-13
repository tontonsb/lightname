import { defineStore } from 'pinia'

// Tableau 20
const palette = [
    '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
    '#edc948', '#b07aa1', '#ff9da7', '#9c755f', '#bab0ac',
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
]

export const useHighlights = defineStore('highlights', {
    state: () => ({
        list: [] as {term: string, color: string}[],
    }),
    getters: {
        nextColor: state => palette[state.list.length] ?? '#aaa',
        has: state => (term: string) => state.list.some(entry => term === entry.term),
    },
    actions: {
        add(term: string, color: string|null = null) {
            if (this.has(term))
                return

            if (!color)
                color = this.nextColor

            this.list.push({term, color})
        },
        remove(term: string) {
            const index = this.list.findIndex(item => term === item.term)

            if (-1 === index)
                return

            this.list.splice(index, 1)
        },
        update(term: string, patch: object) {
            const index = this.list.findIndex(item => term === item.term)

            if (-1 === index)
                return

            this.list[index] = {
                ...this.list[index],
                ...patch,
            }
        },
        clear() {
            this.list = []
        },
        load(terms: string[]) {
            terms.forEach(term => this.add(term))
        },
    },
})
