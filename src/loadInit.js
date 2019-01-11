

function _loadInit() {

  const options = this.$options
  if (options.myLoading !== undefined) {
    
    this.$myLoading = options.myLoading

  } else if (options.parent && (options.parent.$myLoading !== undefined)) {

    this.$myLoading = options.parent.$myLoading
  }
}

module.exports = _loadInit