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
      remember.async("payment-methods" + key, 3600 * 3, () => {
        return http.get(config('api.api_url') + '/icommerce/v3/payment-methods', {
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

  orderMethod(method, orderId) {
    let key = ":" + JSON.stringify(orderId);
    key = key == ":null" ? "" : key;

    return new Promise((resolve, reject) => {
      remember.async("payment-methods" + key, 3600 * 3, () => {
        return http.get(config('api.api_url') + '/' + method, {
          params: {
            orderID: orderId,
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
  
}