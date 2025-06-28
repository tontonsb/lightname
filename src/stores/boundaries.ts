import { defineStore } from 'pinia'
import osmtogeojson from 'osmtogeojson'

type boundaryState = {name: null|string, geodata: null|Object}

export const useBoundaries = defineStore('boundaries', {
    state: (): boundaryState => ({
        name: null,
        geodata: null,
    }),
    actions: {
        async load(name: string, filter: string, level: Number) {
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

            this.geodata = osmtogeojson(osmData)
            this.name = name
        },
    },
})
