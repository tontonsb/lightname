<script setup lang="ts">
import { ref, watch, computed, useTemplateRef } from 'vue'
import { useBoundaries } from '@/stores/boundaries.ts'
import adminLevels from '@/lists/admin_levels.ts'
import areas from '@/lists/areas.ts'
import presets from '@/lists/presets.ts'

const boundaries = useBoundaries()
const form = useTemplateRef('form')
const loading = ref(false)
const preset = ref<'custom'|{label: string, filter: string, admin_level: number}>()
const area = ref<string>()
const adminLevel = ref<number>()

const isCustom = computed(() => 'custom' === preset.value)

watch(preset, newPreset => {
    if ('custom' === newPreset || !newPreset)
        return

    area.value = newPreset?.filter
    adminLevel.value = newPreset?.admin_level
})

// TODO: handle & display loading errors
async function load() {
    if (!preset.value)
        return

    if (!area.value || !adminLevel.value) {
        alert('Something\'s not quite right.')

        form.value?.reportValidity()

        return
    }

    loading.value = true

    await boundaries.load(
        'custom' === preset.value ? area.value + ': ' + adminLevel.value.toString() : preset.value.label,
        area.value,
        adminLevel.value,
    )

    loading.value = false
}
</script>

<template>
    <form ref="form">
        <label>
            Dataset
            <select
                v-model="preset"
                required
            >
                <option
                    v-for="presetOption in presets"
                    :key="presetOption.label"
                    :value="presetOption"
                >
                    {{ presetOption.label }}
                </option>
                <option value="custom">Custom</option>
            </select>
        </label>

        <label v-if="isCustom">
            Area
            <!-- TODO: implement an option for completely custom filter string -->
            <select v-model="area" required>
                <option
                    v-for="areaOption in areas"
                    :key="areaOption.filter"
                    :value="areaOption.filter"
                >
                    {{ areaOption.label }}
                </option>
            </select>
        </label>

        <label v-if="isCustom">
            Administrative level (& common examples)
            <select v-model="adminLevel" required>
                <option
                    v-for="level in adminLevels"
                    :key="level.value"
                    :value="level.value"
                >
                    {{ level.value }} — {{ level.examples.join("/") }}
                </option>
            </select>

            <small>
                See
                <a href="https://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative#Country_specific_values_%E2%80%8B%E2%80%8Bof_the_key_admin_level=*">OSM wiki</a>
                for the accuratest explanation.
            </small>
        </label>

        <button
            type="button"
            :disabled="loading"
            @click="load"
        >{{ loading ? "Loading..." : "Load" }}</button>

        <small>
            Thank Mr. <a href="https://www.openstreetmap.org/about">OSM</a> and Mr.
            <a href="https://wiki.openstreetmap.org/wiki/Overpass_API">Overpass</a> for data.
        </small>
    </form>
</template>

<style scoped>
form {
    padding: 1rem;
}

label {
    display: block;
    margin-bottom: var(--space-base);
}

select {
    display: block;
    width: 100%;
    padding: var(--space-xs);
}

small {
    display: block;
}
</style>
