// filter should be something valid for the Overpass API
// id is for internal use, there are no rules, but they should be distinct
export default [
    // TODO: Need moar areas
    {id: 'indo', label: 'Indonesia', filter: '[admin_level=2]["ISO3166-1:alpha2"=ID]'},
    {id: 'lv', label: 'Latvija', filter: '[admin_level=2]["ISO3166-1:alpha2"=LV]'},
    {id: 'malaysia', label: 'Malaysia', filter: '[admin_level=2]["ISO3166-1:alpha2"=MY]'},
    {id: 'nl', label: 'Nederland', filter: '[admin_level=3][name=Nederland]'},
    {id: 'phillies', label: 'Philippines', filter: '[admin_level=2]["ISO3166-1:alpha2"=PH]'},
    {id: 'vietnam', label: 'Việt Nam', filter: '[admin_level=2]["ISO3166-1:alpha2"=VN]'},
]
