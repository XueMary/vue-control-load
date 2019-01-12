let cache = {}
const getRequestName = require('./getRequestName')

function cacheFn(config, callback) {
  
  if(!config){
    callback()
    return
  }
  
  let { url } = config;
  let {key, name} = getRequestName(url)

  const conf = {
    cache,
    key,
    name
  }

  if(cache[key]){
    return
  }

  callback(conf)
}

module.exports = cacheFn