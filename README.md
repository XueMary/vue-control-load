## 概述

配合vuex这类内存缓存使用
get请求时自动将loading属性设置为true
在有缓存的情况下loading会为false
暴露在全局的属性是 myLoading

### 使用方式

```
npm i vue-control-load

import 'controlLoad' from 'vue-control-load'

Vue.use(controlLoad)
```