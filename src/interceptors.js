
import axios from 'axios'
import cacheFn from './cache' 
import getRequestName  from './getRequestName'

function _interceptors(options={}) {

  let loads = options.loads

  // Add a request interceptor
  axios.interceptors.request.use(config => {
    // 判断是否有cache，有cache下次请求不显示loading
    let {params, data} = config
    proxyData(params, config)
    proxyData(data, config)
    
    upBtn(config.url, true)

    //全局loading属性更新
    cacheFn(config, (conf) => {
      upData(conf.name, true)
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
      
      upData(name, false)

      if(config.cache){
        cache[key] = true
      }
    })

    return response;
  }, error => {

    for (let name in loads) {
      const context = loads[name]
      if (context[name] && typeof context !== 'string') {
        context[name] = false
      }
    }

    return Promise.reject(error);
  });

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