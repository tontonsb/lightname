<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import type { Feature, Geometry } from 'geojson'
import type { PathOptions, Layer } from 'leaflet'
import { ref, watch, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'
import { LMap, LTileLayer, LGeoJson } from '@vue-leaflet/vue-leaflet'
import { useBoundaries } from '@/stores/boundaries.ts'
import { useHighlitables } from '@/stores/highlitables.ts'

const map = useTemplateRef('map')
const lGeojson = useTemplateRef('lgeojson')
const boundaries = useBoundaries()
const { name, geodata } = storeToRefs(boundaries)
const highlitables = useHighlitables()
const { list: hLightList } = storeToRefs(highlitables)

watch(geodata, (newGeodata) => {
    if (!newGeodata || !map.value)
        return

    const layer = L.geoJSON(newGeodata)
    const bounds = layer.getBounds()
    map.value.leafletObject?.fitBounds(bounds)
})

watch(hLightList, () => {
    if (lGeojson.value) {
        patterns.value.clear() // remove old patterns
        lGeojson.value.leafletObject?.setStyle(style)
    }
}, { deep: true })

const patterns = ref(new Map<string, {id: string, colors: string[]}>())
function getPattern(colors: string[]) {
    const key = colors.sort((a, b) => a.localeCompare(b)).join()

    if (patterns.value.has(key)) {
        return patterns.value.get(key)!.id
    }

    const id = crypto.randomUUID()

    patterns.value.set(key, {id, colors})

    return id
}

function style(feature: Feature<Geometry>|undefined): PathOptions {
    if (!feature)
        return {}

    const name = (feature.properties?.name || feature.properties?.['name:en'] || '').toLowerCase()
    const matches = name ? hLightList.value.filter(highlitable => {
        // TODO: support regex or other more "controllable" matcher
        if (name.includes(highlitable.term.toLowerCase()))
            return true

        return false
    }) : []

    if (!matches.length)
        return {
            fillOpacity: 0.1,
            weight: 1,
            color: '#033',
            fillColor: '#033',
        }

    if (1 === matches.length)
        return {
            fillOpacity: 0.5,
            weight: 1,
            color: '#033',
            fillColor: matches[0].color,
        }

    const id = getPattern(matches.map(m => m.color))

    return {
        fillOpacity: 0.7,
        weight: 1,
        color: '#033',
        fillColor: 'url(#' + id + ')',
    }
}

function onEachFeature(feature: Feature<Geometry>, layer: Layer) {
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
                ref="lgeojson"
                :geojson="geodata"
                :options-style="style"
                :options="{ onEachFeature }"
            />
        </LMap>
    </div>

    <svg>
        <defs>
            <pattern
                v-for="[key, pattern] in patterns"
                :id="pattern.id"
                :key="key"
                :width="3 * pattern.colors.length"
                height="6"
                patternTransform="rotate(45)"
                patternUnits="userSpaceOnUse"
            >
                <rect
                    v-for="(color, index) in pattern.colors"
                    :key="color"
                    :x="3 * index"
                    width="3"
                    height="6"
                    :fill="color"
                />
            </pattern>
        </defs>
    </svg>
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
