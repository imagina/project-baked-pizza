import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'
import {helper} from "@imagina/qhelper/_plugins/helper";

export default {

  async index(filter, take, page, fields, include, refresh = true) {
    let token = await helper.storage.get.item('userToken')
    http.defaults.headers.common['Authorization'] = token

    http.defaults.params = {
      setting: {departmentId: 1, roleId: 1}
    }

    filter = JSON.stringify(filter);
    let key = ":" + JSON.stringify(filter + take + page + fields + include);
    key = key == ":null" ? "" : key;
    return new Promise((resolve, reject) => {
      remember.async("addresses" + key, 3600 * 3, () => {
        return http.get(config('apiRoutes.api.api_url') + '/profile/v1/addresses', {
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
      return http.get(config('apiRoutes.api.api_url') + '/profile/addresses/' + id, {
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


  async create(data) {
    let token = await helper.storage.get.item('userToken')
    http.defaults.headers.common['Authorization'] = token

    let userId = await helper.storage.get.item('userId')
    data.attributes.user_id = userId

    return new Promise((resolve, reject) => {
      http.post(config('apiRoutes.api.api_url') + '/profile/v1/addresses', data)
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
      http.put(config('apiRoutes.api.api_url') + '/profile/addresses/' + id, data)
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
      http.delete(config('apiRoutes.api.api_url') + '/profile/addresses/'+ id)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

}