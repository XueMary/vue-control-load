let MyLoading = {}
const _interceptors = require('./interceptors') 
const _loadInit = require('./loadInit') 
const _updata = require('./updata') 

MyLoading.install = function (Vue, options) {

  let loads = []

  Vue.directive('partLoad', {
    bind (el, binding) {
      loads.push(binding.expression)
    },
    unbind(el, binding){
      let index = loads.indexOf(binding.expression)
      loads.splice(index,1)
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