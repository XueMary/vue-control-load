let cache = {}

function cacheFn(config, openPost, callback) {
  
  const { method, url } = config;
  const key = url.split('?')[0]
  let type = method
  type = type.toUpperCase()

  if(cache[key]){
    return
  }

  if(openPost){
    callback(cache, key)
  }
  else if (type === 'GET') {
    callback(cache, key)
  }
}

module.exports = cacheFn