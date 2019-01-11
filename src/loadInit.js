

function _loadInit() {

  const options = this.$options
  if (options.gLoading !== undefined) {
    
    this.$gLoading = options.gLoading

  } else if (options.parent && (options.parent.$gLoading !== undefined)) {

    this.$gLoading = options.parent.$gLoading
  }
}

module.exports = _loadInit