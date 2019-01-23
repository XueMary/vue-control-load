let cache = {}
import getRequestName from './getRequestName'

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
export default cacheFn