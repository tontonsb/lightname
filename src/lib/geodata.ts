import osmtogeojson from 'osmtogeojson'
import simplify from '@turf/simplify'

export const simplificationTolerance = 0.002

async function hash(payload: string): Promise<string> {
    const message = new TextEncoder().encode(payload)
    const hash = await crypto.subtle.digest('SHA-256', message)

    return btoa(String.fromCharCode(...new Uint8Array(hash)))
        .replaceAll('+', '-')
        .replaceAll('/', '_')
        .replaceAll('=', '')
}

function cacheKey(filter: string, level: number, tolerance: number|null): Promise<string> {
    let key = filter + '_' + level.toString()

    if (tolerance)
        key += '_' + tolerance

    return hash(key)
}

export async function filename(filter: string, level: number, tolerance: number|null) {
    const key = await cacheKey(filter, level, tolerance)

    return '/cached/' + key + '.json'
}

export async function fetchGeodata(filter: string, level: number, tolerance: number|null) {
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

    if (!tolerance)
        return geodata

    return simplify(geodata, {
        tolerance,
        highQuality: false,
        mutate: true,
    })
}

export async function getGeodata(filter: string, level: number) {
    const cachedFile = await filename(filter, level, simplificationTolerance)

    try {
        const response = await fetch(cachedFile)
        if (response.ok)
            return await response.json()
    } catch {}

    return fetchGeodata(filter, level, simplificationTolerance)
}
