## summarize
Loading the display and hiding is a trouble, in order to save a lot of time choose the global loading, the request will be displayed.
Now you just bind the part loading and give the rest to me, and the loading will not be displayed when there is data

Changes the locality binding automatically on request


[中文文档](https://github.com/XueMary/vue-control-load/blob/master/README_zh-CN.md)

### usage mode

```
npm i vue-control-load

import ControlLoad from 'vue-control-load'

Vue.use(ControlLoad)
```


### example

app.vue
```
<template>
  <el-button type="primary" 
    @click="posts"
    :loading="in_theaters_btn" 
    v-partLoad="in_theaters_btn">
    loading...
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

#### Multiparameter binding
```
<template>
  <el-button type="primary" 
    @click="posts"
    :loading="in_theaters_btn" 
    v-partLoad="['in_theaters_btn', 'search_btn']">
    loading...
  </el-button>
</template>

<script>
export default {
  data(){
    return{
      in_theaters_btn: false, // Multi-parameter simply sets the value of the first parameter
    }
  }
}
</script>
```

## particulars

v-partLoad 

| Binding     |   type  | name         | Sample request  |
| :--------  | --------:   | :---------: |  :------------: |
| Html teg   |   Boolean/Array      |  lo_search  | /v2/movie/search?q=张艺谋 |
| button teg       |   Boolean/Array    |  in_theaters_btn | /v2/movie/in_theaters |

| parameter    |   type   | Request type  | effect   |
| :--------  | --------:   | :---------: |  :------------: |
| cache       |   Boolean    |  get / post  | After true, the request does not change the value of the binding property, which defaults to false and is not valid for the button |


### result


![loading](https://github.com/XueMary/vue-control-load/blob/master/src/img/loading.gif)



### versions

1.0.35 the front page

1.0.36 The status was not modified after the request failed

1.1.1 Add local binding to optimize listening mode

1.1.2 Optimize data update methods

1.1.7 Add button binding

1.1.9 Stable version

1.1.10 Remove all attributes

1.2.1 Parameter bindings have been added

1.2.4 Fixed bug reported by plugin under nuxt framework