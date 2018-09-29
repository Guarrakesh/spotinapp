import moment from 'moment';


const helpers = {

  sportSlugIconMap(slug) {
    const map = {
      'football': 'soccer',
      'tennis': 'tennis',
      'basket': 'basket',
      'baseball': 'baseball',
      'swimming': 'pool',
      'american-football': 'football',
      'motori': 'motori',
      'volley': 'volley',
      'martial-arts': 'martial',
      'golf': 'golf',
      'rugby': 'rugby',
    };

    return map[slug] || null;

  },

  formattedEventDate(datetime, format = "D MMM HH:mm") {

    return moment(datetime).locale('it').format(format);

  }


}



export default helpers;