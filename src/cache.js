let cache = {}
const getRequestName = require('./getRequestName')

function cacheFn(config, callback) {
  
  if(!config){
    callback()
    return
  }
  
  let { method, url } = config;
  let {key, name} = getRequestName(url)
  
  method = method.toUpperCase()

  const conf = {
    cache,
    key,
    name
  }

  if(cache[key]){
    return
  }

  if(method === 'GET' || config.openPost){
    callback(conf)
  }
}

module.exports = cacheFn