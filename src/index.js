let MyLoading = {}
import interceptors from './interceptors'

MyLoading.install = function (Vue) {
  Vue.prototype.myLoading = false
  // 监听全局请求，get请求更新全局 myLoading 属性
  interceptors(Vue)
}

export default MyLoading