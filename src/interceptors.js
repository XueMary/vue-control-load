
const axios = require('axios') 
const cacheFn = require('./cache') 

let insatll = false

function _interceptors(options = { post: false }) {
  if (insatll) {
    return
  }
  if (this !== this.$root) {
    insatll = true
    return
  }

  let count = 0

  let openPost = options.post ? true : false

  let loads = options.loads

  // Add a request interceptor
  axios.interceptors.request.use(config => {
    // post请求是否更新loading状态判断
    if (openPost && config.data.cache) {
      delete config.data.cache
    }
    else {
      openPost = false
    }

    //全局loading属性更新
    cacheFn({ openPost, ...config }, (conf) => {
      ++count
      const name = 'lo_' + conf.name
      if (loads[name]) {
        loads[name][name] = true
      }
      this._updata(true)
    })

    return config;
  }, error => {
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(response => {
    const config = response.config

    //全局loading属性更新
    cacheFn({ openPost, ...config }, (conf) => {
      
      --count
      let { cache, key, name } = conf
      name = 'lo_' + name
      if (loads[name]) {
        loads[name][name] = false
      }
      
      if (count === 0) {
        this._updata(false)
      }
      if (response.data.total) {
        cache[key] = true
      }
    })

    return response;
  }, error => {

    cacheFn(null, () => {
      --count

      for (let name in loads) {
        const context = loads[name]
        if (context[name]) {
          context[name] = false
        }
      }

      if (count === 0) {
        this._updata(false)
      }
    })
    return Promise.reject(error);
  });
}

module.exports = _interceptors