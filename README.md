## 概述
loading的显示隐藏是一个麻烦事，为了省事很多时候选择了全局loading，请求就显示
现在你只管绑定局部loading其他的交给我，在有数据的情况下并不会显示loading

请求时自动将loading属性设置为true

在有缓存的情况下loading会为false不会变更

配合vuex这类内存缓存使用,当然常用本地缓存也可以


### 使用方式
暴露在全局的对象是 this.$gLoading 

/v2/movie/search?q=张艺谋

局部绑定 v-partLoad="lo_search"  ( lo_  +  request name )

按钮绑定 v-partLoad="search_btn"

```
npm i vue-control-load

import {ControlLoad,state} from 'vue-control-load'

Vue.use(ControlLoad)
let gLoading = new state(Vue)

new Vue({
  gLoading,
}).$mount('#app')
```


如果获取数据采用 POST 请按如下方法使用

```
Vue.use(ControlLoad,{post: true})

axios.post('xxxx',{
  cache: true
})
```

###示例

main.js
```
import {ControlLoad, state} from 'vue-control-load'
Vue.use(ControlLoad)
let gLoading = new state(Vue)

new Vue({
  gLoading,
}).$mount('#app')

```

app.vue
```
<template>
  <div id="app" @click="gets">
    {{$gLoading.loading}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods:{
    gets(){
      axios.get('/v2/movie/search?q=张艺谋')
    }
  },
  created(){
    this.gets()
  }
}
</script>
```

![loading](https://github.com/XueMary/vue-control-load/blob/master/src/img/loading.gif)



### 版本

1.0.35 第一版

1.0.36 请求失败后未修改状态

1.1.1 添加局部绑定，优化监听方式

1.1.2 优化数据更新方式

1.1.7 添加按钮绑定

1.1.9 稳定版