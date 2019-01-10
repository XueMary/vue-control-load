
import axios from 'axios'
import cacheFn from './cache'

function interceptors(Vue) {
  let count = 0
  // Add a request interceptor
  axios.interceptors.request.use(config => {
    cacheFn(config, () => {
      ++count
      Vue.prototype.myLoading = true
    })

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(response => {
    const config = response.config

    cacheFn(config, (cache,key) => {
      --count
      if (count === 0) {
        Vue.prototype.myLoading = false
      }
      cache[key] = true
    })

    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
}

export default interceptors