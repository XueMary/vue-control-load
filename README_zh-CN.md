## 概述
vue的自动加载插件 你不需要编写showLoading hideLoading。

支持 axios 和 fetch, 并且提供 fetch 拦截器的生命周期

### 使用方式

```
npm i vue-control-load

import ControlLoad from 'vue-control-load'

Vue.use(ControlLoad)  // 默认拦截 fetch

or

Vue.use(ControlLoad,{
  axios
})
```



### 示例

#### 局部绑定

app.vue
```
<template>
  <el-button type="primary" 
    :loading="lo_in_theaters" 
    v-partLoad="lo_in_theaters">
    加载中
  </el-button>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      lo_in_theaters: false
    }
  }
  methods:{
    posts(){
      axios.post('/v2/movie/in_theaters')
    }
  },
  mounted(){
    this.posts()
  }
}
</script>
```

### 效果图

![loading](https://github.com/XueMary/vue-control-load/blob/master/src/img/loading.gif)


#### 多参数绑定
```
<template>
  <el-button type="primary" 
    @click="posts"
    :loading="in_theaters_btn" 
    v-partLoad="['in_theaters_btn', 'search_btn']">
    加载中
  </el-button>
</template>

<script>
export default {
  data(){
    return{
      in_theaters_btn: false, //多参数只需要设置第一个参数值就可以
    }
  },
  methods:{
    posts(){
      axios.post('/v2/movie/in_theaters')
    },
    gets(){
      axios.post('/v2/movie/search?q=张艺谋')
    }
  },
  mounted(){
    this.gets()
  }
}
</script>
```

#### cache 参数使用

app.vue
```
<template>
  <div type="primary" 
    :loading="lo_in_theaters" 
    v-partLoad="lo_in_theaters">
    加载中
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      lo_in_theaters: false
    }
  }
  methods:{
    posts(){
      axios.post('/v2/movie/in_theaters'，{
        cache: true
      })
      <!-- axios.get(url,{
        params: {
          cache: true
        }
      }) ,
      fetch(url,{
        cache: true
      }) -->
    }
  },
  mounted(){
    this.posts()
  }
}
</script>
```

#### 新增的fetch 生命周期

```
import { fetchIntercept } from 'vue-control-load'

fetchIntercept.register({
  request: function (url, config) {
      // Modify the url or config here
      return [url, config];
  },

  requestError: function (error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
  },

  response: function (response) {
      // Modify the reponse object
      return response;
  },

  responseError: function (error) {
      // Handle an fetch error
      return Promise.reject(error);
  }
});
```

## 详情

v-partLoad 指令

| 绑定对象     |   绑定类型  | 命名         | 请求示例  |
| :--------  | --------:   | :---------: |  :------------: |
| 普通Html   |   Boolean/Array      |  lo_search  | /v2/movie/search?q=张艺谋 |
| 按钮       |   Boolean/Array    |  in_theaters_btn | /v2/movie/in_theaters |

| 请求参数     |   类型   | 请求类型        | 作用  |
| :--------  | --------:   | :---------: |  :------------: |
| cache       |   Boolean    |  get / post  | true 之后该请求不在改变绑定属性值， 默认为false, 对按钮无效 |



### 版本

1.0.35 第一版

1.0.36 请求失败后未修改状态

1.1.1 添加局部绑定，优化监听方式

1.1.2 优化数据更新方式

1.1.7 添加按钮绑定

1.1.9 稳定版

1.1.10 去除全属性

1.2.1 新增多参数绑定

1.2.4 修复nuxt框架下插件报错

1.2.8 es6转义

2.0.0 新增对fetch的支持