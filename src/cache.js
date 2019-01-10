let cache = {}

function cacheFn(config, callback) {
  const { method, url } = config;
  const key = url.split('?')[0]

  if ((method === 'get' || method === 'GET') && !cache[key]) {
    callback(cache, key)
  }
}

export default cacheFn