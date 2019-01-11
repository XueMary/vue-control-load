let cache = {}

function cacheFn(config, callback) {
  
  if(!config){
    callback()
    return
  }
  
  let { method, url } = config;
  const key = url.split('?')[0]
  let fragment = key.split('/')
  const name = fragment[fragment.length-1]
  
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