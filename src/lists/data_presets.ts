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
        highlights: [
            {
                name: 'Directions',
                terms: ['timur', 'barat', 'utara', 'selatan', 'tengah', 'pusat', 'tenggara'],
            },
            {
                name: 'Rivers',
                terms: ['Kapuas', 'Barito', 'Musi', 'Banyuasin', 'Ogan', 'Komering', 'Indragiri', 'Rokan'],
            },
        ],
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
                terms: ['oriental', 'occidental', 'norte', 'sur', 'east', 'west', 'north', 'south'],
            },
            {
                name: 'Regions',
                terms: ['Davao', 'Surigao', 'Zamboanga', 'Agusan', 'Cotabato', 'Misamis', 'Lanao', 'Negros', 'Samar', 'Leyte', 'Mindoro', 'Camarines', 'Ilocos', 'Maguindanao']
            },
        ],
    },
    {
        label: 'Viet Nam provinces',
        filter: filter('vietnam'),
        admin_level: 4,
        highlights: [
            {
                name: 'Directions',
                terms: ['Bắc', 'Nam', 'Trung', 'Đông', 'Tây'],
            },
            {
                name: 'Common Suffixes',
                terms: ['Giang', 'Hà', 'Sơn', 'Thủy', 'Lâm', 'Phú', 'Long', 'An', 'Bình'],
            },
        ],
    },

    // thailand
    // england (shires & folks)
]
