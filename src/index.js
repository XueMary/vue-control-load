let ControlLoad = {}
const _interceptors = require('./interceptors') 

ControlLoad.install = function (Vue, options) {

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

  _interceptors({loads, ...options})
}

module.exports = ControlLoad