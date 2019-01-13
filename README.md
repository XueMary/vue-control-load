## 概述
loading的显示隐藏是一个麻烦事，为了省事很多时候选择了全局loading，请求就显示。
现在你只管绑定局部loading其他的交给我，在有数据的情况下并不会显示loading

请求时自动改变局部绑定

### 使用方式

```
npm i vue-control-load

import ControlLoad from 'vue-control-load'

Vue.use(ControlLoad)
```


### 示例

app.vue
```
<template>
  <el-button type="primary" 
    @click="posts"
    :loading="in_theaters_btn" 
    v-partLoad="in_theaters_btn">
    加载中
  </el-button>
</template>

<script>
import axios from 'axios'
export default {
  methods:{
    posts(){
      axios.post('/v2/movie/in_theaters',{
        cache: true
      })
    }
  }
}
</script>
```

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
      in_theaters_btn: false, //只需设置绑定在 loading 上的参数就好 该参放在第一位置
    }
  }
}
</script>
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


### 效果图


![loading](https://github.com/XueMary/vue-control-load/blob/master/src/img/loading.gif)



### 版本

1.0.35 第一版

1.0.36 请求失败后未修改状态

1.1.1 添加局部绑定，优化监听方式

1.1.2 优化数据更新方式

1.1.7 添加按钮绑定

1.1.9 稳定版

1.1.10 去除全属性

1.2.1 新增多参数绑定