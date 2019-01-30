
import _interceptors from './interceptors'
import fetchIntercept from 'fetch-intercept';

function install(Vue, options = {}) {
  if (install.installed) return;
	install.installed = true;

  let loads = {}
  options.loads = loads

  Vue.directive('partLoad', {
    bind(el, binding, vnode) {
      const value = binding.value
      if (value instanceof Array) {
        loads[value[0]] = vnode.context
        let len = value.length
        for (let index = 1; index < len; index++) {
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
        for (let index in value) {
          let item = value[index]
          delete loads[item]
        }
      }
      else {
        delete loads[binding.expression]
      }
    }
  })

  _interceptors(options)

}

let plugin = {
  install
}

// To allow use as module (npm/webpack/etc.) export component
export default plugin;
export { fetchIntercept }