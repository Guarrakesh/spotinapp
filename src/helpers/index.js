const helpers = {

    sportSlugIconMap(slug) {
        const map = {
            'football': 'soccer',
            'tennis': 'tennis',
            'basket': 'basket',
            'baseball': 'baseball',
            'swimming': 'pool',
            'american-football': 'rugby',
            'formula-1': 'formula',
            'moto': 'moto',
            'volley': 'volley',
            'martial-arts': 'martial',
            'golf': 'golf'
        };

        return map[slug] || null;

    },


}



export default helpers;