let MyLoading = {}
const _interceptors = require('./interceptors') 
const _loadInit = require('./loadInit') 
const _updata = require('./updata') 

MyLoading.install = function (Vue, options) {

  let loads = {}

  Vue.directive('partLoad', {
    bind (el, binding, vnode) {
      loads[binding.expression] = vnode.context
    },
    unbind(el, binding){
      if(loads[binding.expression]){
        delete loads[binding.expression]
      }
    }
  })

  Vue.mixin({
    methods: {
      _loadInit,
      _interceptors,
      _updata
    },
    created() {
      this._loadInit()
      this._interceptors({loads, ...options})
    },
  })
}
module.exports = MyLoading