import type { FeatureCollection } from 'geojson'
import { defineStore } from 'pinia'
import { getGeodata } from '@/lib/geodata.ts'

export const useBoundaries = defineStore('boundaries', {
    state: () => ({
        name: null as string|null,
        geodata: null as FeatureCollection|null,
    }),
    actions: {
        async load(name: string, filter: string, level: number) {
            this.geodata = await getGeodata(filter, level)
            this.name = name
        },
    },
})
