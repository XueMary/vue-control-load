## 概述

配合vuex这类内存缓存使用,当然常用本地缓存也可以

get请求时自动将loading属性设置为true

在有缓存的情况下loading会为false不会变更

暴露在全局的属性是 this.$gLoading 不可被手动更改

### 使用方式

```
npm i vue-control-load

import 'controlLoad' from 'vue-control-load'

Vue.use(controlLoad)

new Vue({
  gLoading: false,
}).$mount('#app')
```


如果有post请求数据请按如下方法使用

```
Vue.use(controlLoad,{post: true})

axios.post('xxxx',{
  cache: true
})
```

###示例

main.js
```
import MyLoading from 'vue-control-load'
Vue.use(MyLoading)

new Vue({
  gLoading: false,
}).$mount('#app')

```

app.vue
```
<template>
  <div id="app" @click="gets">
    {{$gLoading}}
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