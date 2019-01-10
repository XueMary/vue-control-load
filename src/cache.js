let cache = {}

function cacheFn(config, options, callback) {
  
  const { method, url } = config;
  const key = url.split('?')[0]
  method = method.toUpperCase()

  if(cache[key]){
    return
  }

  if(options.post){
    callback(cache, key)
  }
  else if (method === 'GET') {
    callback(cache, key)
  }
}

export default cacheFn