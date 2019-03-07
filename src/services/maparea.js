import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

  index(address ,filter, take, page, fields, include, refresh) {
    filter = JSON.stringify(filter);
    let key = ":" + JSON.stringify(filter + take + page + fields + include);
    key = key == ":null" ? "" : key;

    return new Promise((resolve, reject) => {
      remember.async("mapareas" + key, 3600 * 3, () => {
        return http.get(config('api.api_url') + '/icommerce/v3/mapareas', {
          params: {
            filter: filter,
            take: take,
            page: page,
            fields: fields,
            include: include
          }
        })
      }, true).then(response => {

        // START - IF EXISTE LATLNG IN POLYGON ZONE


        //let localitation = new google.maps.LatLng({"lng": -74.12835, "lat": 4.63883})

        response.data.forEach( el => {
          let poligon = new google.maps.Polygon({paths: el.polygon})
          
          setTimeout(function() {
            let  result = google.maps.geometry.poly.containsLocation(address, poligon);

            if (result) {
              
              console.log(result, el);
              resolve(result,el)
            } else {
              resolve(result)
            }


          }, 2000);
        })
        // END - IF EXISTE LATLNG IN POLYGON ZONE

      })
        .catch(error => {
          reject(error);
        });
    });
  },

  getLatLng(address){
    http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'+bogota,CO&key='+env('KEY_GOOGLE_MAPS'))
    .then(response=>{
      return response
    })
  }




}


