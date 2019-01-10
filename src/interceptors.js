
import axios from 'axios'
import cacheFn from './cache'

function interceptors(Vue, options={post:false}) {

  let count = 0

  let openPost = options.post ? true : false

  // Add a request interceptor
  axios.interceptors.request.use(config => {

    if(openPost && config.data.cache){
      delete config.data.cache
    }
    else {
      openPost = false
    }
    
    cacheFn(config, openPost, () => {
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

    cacheFn(config, openPost, (cache,key) => {
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