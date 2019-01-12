

function _loadInit() {
  //挂在全局loading属性到当前页面所有组件
  const options = this.$options
  if (options.gLoading !== undefined) {

    this.$gLoading = options.gLoading.state

  } else if (options.parent && (options.parent.$gLoading !== undefined)) {

    this.$gLoading = options.parent.$gLoading
  }
}

module.exports = _loadInit