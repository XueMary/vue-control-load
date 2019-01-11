let cache = {}

function cacheFn(config, callback) {
  
  if(!config){
    callback()
    return
  }
  
  let { method, url } = config;
  const key = url.split('?')[0]
  console.log(key)
  method = method.toUpperCase()

  const conf = {
    cache,
    key
  }

  if(cache[key]){
    return
  }

  if(method === 'GET' || config.openPost){
    callback(conf)
  }
}

module.exports = cacheFn