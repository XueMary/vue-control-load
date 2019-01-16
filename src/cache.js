let cache = {}
const getRequestName = require('./getRequestName')

function cacheFn(config, callback) {
  let { url } = config;
  let {key, name} = getRequestName(url)
  name = 'lo_' + name

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