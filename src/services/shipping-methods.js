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
      remember.async("shipping" + key, 3600 * 3, () => {
        return http.get(config('api.base_url') + '/api/icommerce/v3/shipping-methods/calculations/all', {
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
  calculateShipping(params) {

    let get = '?options[countryCode]=' + params.options.countryCode + '&options[postalCode]=' + params.options.postalCode + '&products[total]=' + params.products.total + '&products[items]=' + JSON.stringify(params.products.items)

    return new Promise((resolve, reject) => {
        return http.get(config('api.base_url') + '/api/icommerce/v3/shipping-methods/calculations/all' + get, {
        params: {},
      }).then(response => {
        resolve(response.data);
      })
        .catch(error => {
          reject(error);
        });
    });
  },
}