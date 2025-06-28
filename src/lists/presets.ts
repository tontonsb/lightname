import areas from './areas.ts'

const filter = (id: string) => areas.find(a => id === a.id)?.filter

// filter should be something valid for the Overpass API
export default [
    // TODO: Curate a list of useful presets
    {label: 'Indonesia kabupaten & kotas', filter: filter('indo'), admin_level: 5},
    {label: 'Latvia municipalities', filter: filter('lv'), admin_level: 5},
    {label: 'Philippines provinces', filter: filter('phillies'), admin_level: 4},
    {label: 'Viet Nam provinces', filter: filter('vietnam'), admin_level: 4},
]
