let ControlLoad = {}
const _interceptors = require('./interceptors') 

ControlLoad.install = function (Vue) {

  let loads = {}

  Vue.directive('partLoad', {
    bind(el, binding, vnode) {
      const value = binding.value
      if (value instanceof Array) {
        loads[value[0]] = vnode.context
        for (let index = 1; index < value.length; index++) {
          loads[value[index]] = value[0]
        }
      }
      else {
        loads[binding.expression] = vnode.context
      }
    },
    unbind(el, binding) {
      let value = binding.value
      if (value instanceof Array) {
        for (let item of value) {
          delete loads[item]
        }
      }
      else {
        delete loads[binding.expression]
      }
    }
  })

  _interceptors({ loads })

}

module.exports = ControlLoad