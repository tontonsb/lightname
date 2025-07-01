<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { watch, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'
import { LMap, LTileLayer, LGeoJson } from '@vue-leaflet/vue-leaflet'
import { useBoundaries } from '@/stores/boundaries.ts'

const map = useTemplateRef('map')
const boundaries = useBoundaries()
const { name, geodata } = storeToRefs(boundaries)

watch(geodata, (newGeodata) => {
    if (!newGeodata || !map.value)
        return

    const layer = L.geoJSON(newGeodata)
    const bounds = layer.getBounds()
    map.value.leafletObject?.fitBounds(bounds)
})

function style(feature) {
    // console.log('st')

    return {}
}

function onEachFeature(feature, layer) {
    const name = feature.properties?.name || feature.properties?.['name:en']

    if (!name)
        return

    layer.bindTooltip(name, {
        direction: 'center',
        className: 'polygon-label',
        sticky: true,
        opacity: 0.75,
    })
}
</script>

<template>
    <div class="container">
        <span
            v-if="name"
            class="title"
        >{{ name }}</span>
        <span class="title">Latvia Municipalities</span>

        <LMap
            ref="map"
            :zoom="2"
            :center="[47.41322, -1.219482]"
        >
            <!-- TODO: add basemap switching -->
            <!-- TODO: one without labels might be very needed -->
            <!-- TODO: is the google one possible? -->
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            />
            <!--
                'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                    {
                    attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
                        &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
                    subdomains: 'abcd',
                    maxZoom: 14,
                    }
            -->
            <LGeoJson
                v-if="geodata"
                :geojson="geodata"
                :options-style="style"
                :options="{ onEachFeature }"
            />
        </LMap>
    </div>
</template>

<style scoped>
.container {
    height: 100%;
    width: 100%;
}

.title {
    position: absolute;
    right: 0;
    top: 0;
    padding: var(--space-base);
    z-index: 1000;
    color: var(--color-heading);
    text-shadow: 1px 1px 4px var(--color-background);
}

.container :deep(.polygon-label) {
    pointer-events: none;
    color: var(--color-text);
    background: var(--color-background-mute);
}
</style>
