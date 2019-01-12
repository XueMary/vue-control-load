function getRequestName(url){
  const key = url.split('?')[0]
  let fragment = key.split('/')
  const name = fragment[fragment.length-1]

  return {
    key,
    name
  }
}

module.exports = getRequestName