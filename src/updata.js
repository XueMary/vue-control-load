let vms = []

function _updata(isBool) {
  let vm = this
  vm.$myLoading = isBool
  vm.$forceUpdate()
  vms.push(vm)
  
  if(vm.$parent === undefined && isBool === false && vms.length){
    for(let _this of vms){
      _this.$myLoading = isBool
      _this.$forceUpdate()
    }
    vms.length = 0
  }
}

module.exports = _updata