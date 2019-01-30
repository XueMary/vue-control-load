## summarize
Auto loading plugin for vue. 👏 You don't need to write showLoading and hideLoading any more.

support axios and fetch.  default intercept fetch.  

Provide fetch intercept life cycle


[中文文档](https://github.com/XueMary/vue-control-load/blob/master/README_zh-CN.md)

### usage mode

```
npm i vue-control-load

import ControlLoad from 'vue-control-load'

Vue.use(ControlLoad)  // default intercept fetch

or

Vue.use(ControlLoad,{
  axios
})
```


### example

#### Local parameter binding

```
<template>
  <el-button type="primary" 
    :loading="lo_in_theaters" 
    v-partLoad="lo_in_theaters">
    loading
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

### result

![loading](https://github.com/XueMary/vue-control-load/blob/master/src/img/loading.gif)


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

#### cache Parameters using

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
      }),
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


#### newly increased fetch intercept

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

## particulars

v-partLoad 

| Binding     |   type  | name         | Sample request  |
| :--------  | --------:   | :---------: |  :------------: |
| Html teg   |   Boolean/Array      |  lo_search  | /v2/movie/search?q=张艺谋 |
| button teg       |   Boolean/Array    |  in_theaters_btn | /v2/movie/in_theaters |

| parameter    |   type   | Request type  | effect   |
| :--------  | --------:   | :---------: |  :------------: |
| cache       |   Boolean    |  get / post  | After true, the request does not change the value of the binding property, which defaults to false and is not valid for the button |



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

1.2.8 babel es6

2.0.0 Add support for fetch

2.1.0 newly increased fetch intercept life cycle