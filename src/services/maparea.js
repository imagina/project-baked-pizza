import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'
import {alert} from '@imagina/qhelper/_plugins/alert'

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
        // >> START <<
        response.data.forEach( el => {
          let poligon = new google.maps.Polygon({paths: el.polygon})
          setTimeout(function() {
            let  result = google.maps.geometry.poly.containsLocation(address, poligon);
            if (result) {
              alert.success('La direccion indicada ha sido encontrada y cuenta con cobertura para envio a domicilio')
              console.log(result, el);
              resolve(result,el)
              return false
            }
          }, 1000);
          return false
        })
        // >> END <<
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  mapareas(filter, take, page, fields, include, refresh) {
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
      }, refresh).then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  latLng(address){
    let addressFormated = address.replace(/ /g, "+")
    let resulsEval = {'status': false, 'data': []}
    return new Promise((resolve, reject) => {
      http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+addressFormated+'+,Bogotá,CO&key='+env('KEY_GOOGLE_MAPS'))
      .then(response=>{
        resolve(
          {
            coordenades: new google.maps.LatLng(response.data.results[0].geometry.location), 
            result: response.data.results[0].geometry.location
          }
        ); // >>>THIS IS TE ADDRES IN LATLNG FORMAT
      })
      .catch(error => {
        reject(error);
      })
    });
  },

  // ... More functionss
}