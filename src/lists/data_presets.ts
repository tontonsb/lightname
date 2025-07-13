import areas from './area_presets.ts'

const filter = (id: string) => areas.find(a => id === a.id)?.filter ?? null

export type highlightPreset = {name: string, terms: string[]}
export type dataPreset = {label: string, filter: string, admin_level: number, highlights: highlightPreset[]}

// filter should be something valid for the Overpass API
export default [
    // TODO: Curate a list of useful presets
    {
        label: 'Indonesia kabupaten & kotas',
        filter: filter('indo'),
        admin_level: 5,
        highlights: [],
    },
    {
        label: 'Latvia municipalities',
        filter: filter('lv'),
        admin_level: 5,
        highlights: [],
    },
    {
        label: 'Philippines provinces',
        filter: filter('phillies'),
        admin_level: 4,
        highlights: [
            {
                name: 'Directions',
                terms: ['oriental', 'occidental', 'norte', 'sur'],
            },
            {
                name: 'Regions',
                terms: ['Davao', 'Surigao', 'Zamboanga', 'Agusan', 'Cotabato', 'Misamis', 'Lanao', 'Negros', 'Samara', 'Leyte', 'Mindoro', 'Camarines', 'Ilocos']
            },
        ],
    },
    {
        label: 'Viet Nam provinces',
        filter: filter('vietnam'),
        admin_level: 4,
        highlights: [],
    },

    // thailand
    // england (shires & folks)
]
