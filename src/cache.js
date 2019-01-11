let cache = {}

function cacheFn(config, openPost, callback) {
  
  let { method, url } = config;
  const key = url.split('?')[0]
  method = method.toUpperCase()

  if(cache[key]){
    return
  }

  if(openPost){
    callback(cache, key)
  }
  else if (method === 'GET') {
    callback(cache, key)
  }
}

module.exports = cacheFn