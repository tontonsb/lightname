import type { FeatureCollection } from 'geojson'
import { defineStore } from 'pinia'
import osmtogeojson from 'osmtogeojson'

export const useBoundaries = defineStore('boundaries', {
    state: () => ({
        name: null as string|null,
        geodata: null as FeatureCollection|null,
    }),
    actions: {
        async load(name: string, filter: string, level: number) {
            const response = await fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                body: 'data='+ encodeURIComponent(`
                    [out:json][timeout:90];
                    area${filter}->.area;
                    relation[admin_level=${level}](area.area);
                    out body;
                    >;
                    out skel qt;
                `)
            })

            const osmData = await response.json()

            const geodata = osmtogeojson(osmData)
            geodata.features = geodata.features.filter(feature => 'Point' !== feature.geometry.type)

            this.geodata = geodata
            this.name = name
        },
    },
})
