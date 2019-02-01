import moment from 'moment';
import "moment/min/moment-with-locales";
import DeviceInfo from 'react-native-device-info';

//moment.locale(DeviceInfo.getDeviceLocale());
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
      'waterpolo': 'waterpolo',
      'hockey': 'hockey',
    };

    return map[slug] || null;

  },

  formattedEventDate(datetime, format = "D MMM HH:mm") {

    return moment(datetime).format(format);

  }


}



export default helpers;