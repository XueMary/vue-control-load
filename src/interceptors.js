
const axios = require('axios') 
const cacheFn = require('./cache') 
const getRequestName  = require('./getRequestName')


function _interceptors(options={}) {

  let loads = options.loads

  // Add a request interceptor
  axios.interceptors.request.use(config => {
    // 判断是否有cache，有cache下次请求不显示loading
    if(config.params && config.params.cache){
      config.cache = config.params.cache
      delete config.params.cache
    }
    else if (config.data && config.data.cache) {
      config.cache = config.data.cache
      delete config.data.cache
    }
    

    upBtn(config.url, true)

    //全局loading属性更新
    cacheFn(config, (conf) => {
      let { name } = conf
      name = 'lo_' + name
      
      upData(name, true)

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
    cacheFn(config, (conf) => {
      let { name, cache, key } = conf
      name = 'lo_' + name
      
      upData(name, false)

      if(config.cache){
        cache[key] = true
      }

    })

    return response;
  }, error => {

    cacheFn(null, () => {

      for (let name in loads) {
        const context = loads[name]
        if (typeof context !== 'string' && context[name]) {
          context[name] = false
        }
      }

    })
    return Promise.reject(error);
  });

  function upData (name, isBool){
    if (loads[name]) {
      if(typeof loads[name] === 'string'){
        name = loads[name]
      }
      loads[name][name] = isBool
    }
  }

  function upBtn(url, isBool){
    let {name} = getRequestName(url)
    let btn = name + '_btn'

    upData(btn, isBool)
  }
}

module.exports = _interceptors