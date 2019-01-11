let gisBool

function _updata(isBool) {
  let vm = this
  gisBool = isBool
  
  vm.$gLoading = gisBool
  vm.$forceUpdate()

  if(vm.$children){
    mapChild(vm.$children)
  }
}


function mapChild(childs){
  for(let child of childs){
    child.$gLoading = gisBool
    child.$forceUpdate()
    if(child.$children){
      mapChild(child.$children)
    }
  }
}

module.exports = _updata