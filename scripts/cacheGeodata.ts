import fs from 'fs'
import presets from '../src/lists/data_presets.ts'
import { fetchGeodata, filename, simplificationTolerance } from '../src/lib/geodata.ts'

async function cacheGeodata(filter: string, level: number) {
    fs.writeFileSync(
        './public' + await filename(filter, level, simplificationTolerance),
        JSON.stringify(await fetchGeodata(filter, level, simplificationTolerance)),
    )
}

presets.forEach(preset => cacheGeodata(preset.filter, preset.admin_level))
