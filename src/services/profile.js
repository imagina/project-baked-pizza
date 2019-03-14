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
      remember.async("profile" + key, 3600 * 3, () => {
        return http.get(config('api.api_url') + '/profile/users', {
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

  show(id, include, filter, take, page, fields) {
    let key = JSON.stringify(id);
    return new Promise((resolve, reject) => {
      //remember.async(key, 3600 * 3, () => {
      return http.get(config('api.api_url') + '/profile/users/' + id, {
        params: {
            filter: filter,
            take: take,
            page: page,
            fields: fields,
            include: include
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
      http.post(config('api.api_url') + '/profile/users', data)
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
      http.put(config('api.api_url') + '/profile/users/' + id, data)
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
      http.delete(config('api.api_url') + '/profile/users/'+id)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  createAddress(data) {  
    return new Promise((resolve, reject) => {
      http.post(config('api.api_url') + '/profile/addresses', data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
}