const helpers = {

    sportSlugIconMap(slug) {
        const map = {
            'football': 'soccer',
            'tennis': 'tennis',
            'basket': 'basket',
            'baseball': 'baseball',
            'swimming': 'pool',
            'american-football': 'football',
            //'motori': 'motori',
            'volley': 'volley',
            'martial-arts': 'martial',
            'golf': 'golf',
            'rugby': 'rugby',
            'formula-1': 'formula',
        };

        return map[slug] || null;

    },


}



export default helpers;