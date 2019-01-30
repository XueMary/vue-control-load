import fetchIntercept from 'fetch-intercept2';
import cacheFn from './cache' 
import getRequestName  from './getRequestName'

function _interceptors(options={}) {

  let loads = options.loads
  let type = 'fetch'
  let axios = null
  if (options.axios) {
    type = 'axios'
    axios = options.axios
  }

  const request = {
    succed: function (config){
      // 判断是否有cache，有cache下次请求不显示loading
      let url = null
      if (type === 'fetch') {
        url = config
        config = Array.prototype.slice.call(arguments)[1]
        config = config ? Object.assign({}, { url }, config) : { url }
      }
      else if(type === 'axios'){
        let {params, data} = config
        proxyData(params, config)
        proxyData(data, config)
      }
      
      upBtn(config.url, true)
  
      //全局loading属性更新
      cacheFn(config, (conf) => {
        let { cache, key } = conf

        if(cache[key]){
          return
        }

        if (type === 'fetch' && config.cache) {
          cache[key] = true
        }

        upData(conf.name, true)
      })

      if(type === 'fetch'){
        if (config.cache) {
          delete config.cache
        }
        return [url, config]
      }
  
      return config;
    },
    error: error => {
      return Promise.reject(error);
    }
  }

  const response = {
    succed: response => {
      let config = response.config
      if (type === 'fetch') {
        config = response

        let reg = /^[2|3]/
        if(!reg.test(config.status)){
          error(config)
        }
      }
  
      upBtn(config.url, false)
  
      //全局loading属性更新
      cacheFn(config, (conf) => {
        let { name, cache, key } = conf
        
        upData(name, false)
  
        if(config.cache){
          cache[key] = true
        }
      })
  
      return response;
    },
    error: error
  }

  if(type === 'axios'){
     // Add a request interceptor
    axios.interceptors.request.use(request.succed, request.error);
    // Add a response interceptor
    axios.interceptors.response.use(response.succed, response.error)
  }
  else {
    fetchIntercept.register({
      request: request.succed,

      requestError: request.error,

      response: response.succed,

      responseError: response.error
    });
  }

  function error(error){
    for (let name in loads) {
      const context = loads[name]
      if (context[name] && typeof context !== 'string') {
        context[name] = false
      }
    }

    return Promise.reject(error);
  }

  function proxyData(target, newTarget){
    if(target && target.cache){
      newTarget.cache = target.cache
      delete target.cache
    }
  }

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

export default _interceptors