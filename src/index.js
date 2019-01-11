let MyLoading = {}
const _interceptors = require('./interceptors') 
const _loadInit = require('./loadInit') 
const _updata = require('./updata') 

MyLoading.install = function (Vue, options) {
  Vue.mixin({
    methods: {
      _loadInit,
      _interceptors,
      _updata
    },
    created() {
      this._loadInit()
      this._interceptors(options)
    },
  })
}
module.exports = MyLoading