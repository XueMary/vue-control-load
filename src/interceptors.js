
const axios = require('axios') 
const cacheFn = require('./cache') 
const getRequestName  = require('./getRequestName')

let insatll = false

function _interceptors(options = { post: false }) {
  if (insatll) {
    return
  }
  insatll = true

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

    upBtn(config.url, true)

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

    upBtn(config.url, false)

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

      cache[key] = true
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

  function upBtn(url, isBool){
    let {name} = getRequestName(url)
    
    let btn = name + '_btn'
    if(loads[btn]){
      loads[btn][btn] = isBool
    }
  }
}

module.exports = _interceptors