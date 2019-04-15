import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

  index(filter, take, page, fields, include, refresh) {
    filter = JSON.stringify(filter);
    let key = ":" + JSON.stringify(filter + take + page + fields + include);
    key = key == ":null" ? "" : key;

    return new Promise((resolve, reject) => {
      remember.async("orders" + key, 3600 * 3, () => {
        return http.get(config('api.api_url') + '/icommerce/v3/orders', {
          params: {
            filter: filter,
            take: take,
            page: page,
            fields: fields,
            include: include
          }
        })
      }, true).then(response => {
        resolve(response);
      })
        .catch(error => {
          reject(error);
        });
    });
  },

  show(id) {
    let key = JSON.stringify(id);
    return new Promise((resolve, reject) => {
      //remember.async(key, 3600 * 3, () => {
      return http.get(config('api.api_url') + '/icommerce/v3/orders/' + id, {
        params: {
        }
        /* })*/
      }).then(response => {
        resolve(response.data);
      })
        .catch(error => {
          reject(error);
        });
    });
  },

  create(data) {  
    return new Promise((resolve, reject) => {
      http.post(config('api.api_url') + '/icommerce/v3/orders', data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

}

