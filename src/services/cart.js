import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

  sendItem(data) {
    return new Promise((resolve, reject) => {
      http.post(config('api.api_url') + '/icommerce/v3/carts', data)
        .then(response => {
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
      return http.get(config('api.api_url') + '/icommerce/v3/carts/' + id, {
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
      http.post(config('api.api_url') + '/icommerce/v3/carts', data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  update(data, id) {
    return new Promise((resolve, reject) => {
      http.put(config('api.api_url') + '/icommerce/v3/carts/' + id, data)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      http.delete(config('api.api_url') + '/icommerce/v3/carts/'+id)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

}

