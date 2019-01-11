
const axios = require('axios') 
const cacheFn = require('./cache') 

let insatll = false

function _interceptors(options={post:false}) {
  if(insatll){
    return
  }
  if(this !== this.$root){
    insatll = true
    return
  }
  
  let count = 0

  let openPost = options.post ? true : false

  // Add a request interceptor
  axios.interceptors.request.use(config => {
    // console.log(config.url.split)
    // post请求是否更新loading状态判断
    if(openPost && config.data.cache){
      delete config.data.cache
    }
    else {
      openPost = false
    }
    
    //全局loading属性更新
    cacheFn({openPost,...config}, () => {
      ++count
      this._updata(true)
    })

    return config;
  }, error => {
    
    cacheFn(null, () => {
      --count
      if (count === 0) {
        this._updata(false)
      }
    })
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(response => {
    const config = response.config

    //全局loading属性更新
    cacheFn({openPost, ...config}, (conf) => {
      let {cache,key} = conf
      --count
      if (count === 0) {
        this._updata(false)
      }
      if(response.data.total){
        cache[key] = true
      }
    })

    return response;
  }, error => {
    // Do something with response error
    cacheFn(null, () => {
      --count
      if (count === 0) {
        this._updata(false)
      }
    })
    return Promise.reject(error);
  });
}

module.exports = _interceptors