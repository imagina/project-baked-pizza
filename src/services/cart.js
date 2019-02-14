import config from 'src/config/index'
import http from "axios"

export default {

  /**
   * Send data to form
   */
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
}

