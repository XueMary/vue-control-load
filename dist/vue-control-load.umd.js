(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
  typeof define === 'function' && define.amd ? define(['exports', 'axios'], factory) :
  (global = global || self, factory(global.MyComponent = {}, global.axios));
}(this, function (exports, axios) { 'use strict';

  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

  function getRequestName(url){
    var key = url.split('?')[0];
    var fragment = key.split('/');
    var name = fragment[fragment.length-1];

    return {
      key: key,
      name: name
    }
  }

  var cache = {};

  function cacheFn(config, callback) {
    var url = config.url;
    var ref = getRequestName(url);
    var key = ref.key;
    var name = ref.name;
    name = 'lo_' + name;

    var conf = {
      cache: cache,
      key: key,
      name: name
    };

    if(cache[key]){
      return
    }

    callback(conf);
  }

  function _interceptors(options) {
    if ( options === void 0 ) options={};


    var loads = options.loads;

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      // 判断是否有cache，有cache下次请求不显示loading
      var params = config.params;
      var data = config.data;
      proxyData(params, config);
      proxyData(data, config);
      
      upBtn(config.url, true);

      //全局loading属性更新
      cacheFn(config, function (conf) {
        upData(conf.name, true);
      });

      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      var config = response.config;

      upBtn(config.url, false);

      //全局loading属性更新
      cacheFn(config, function (conf) {
        var name = conf.name;
        var cache = conf.cache;
        var key = conf.key;
        
        upData(name, false);

        if(config.cache){
          cache[key] = true;
        }
      });

      return response;
    }, function (error) {

      for (var name in loads) {
        var context = loads[name];
        if (context[name] && typeof context !== 'string') {
          context[name] = false;
        }
      }

      return Promise.reject(error);
    });

    function proxyData(target, newTarget){
      if(target && target.cache){
        newTarget.cache = target.cache;
        delete target.cache;
      }
    }

    function upData (name, isBool){
      if (loads[name]) {
        if(typeof loads[name] === 'string'){
          name = loads[name];
        }
        loads[name][name] = isBool;
      }
    }

    function upBtn(url, isBool){
      var ref = getRequestName(url);
      var name = ref.name;
      var btn = name + '_btn';

      upData(btn, isBool);
    }
  }

  function install(Vue) {
    if (install.installed) { return; }
  	install.installed = true;

    var loads = {};

    Vue.directive('partLoad', {
      bind: function bind(el, binding, vnode) {
        var value = binding.value;
        if (value instanceof Array) {
          loads[value[0]] = vnode.context;
          var len = value.length;
          for (var index = 1; index < len; index++) {
            loads[value[index]] = value[0];
          }
        }
        else {
          loads[binding.expression] = vnode.context;
        }
      },
      unbind: function unbind(el, binding) {
        var value = binding.value;
        if (value instanceof Array) {
          for (var index in value) {
            var item = value[index];
            delete loads[item];
          }
        }
        else {
          delete loads[binding.expression];
        }
      }
    });

    _interceptors({ loads: loads });

  }

  var plugin = {
    install: install
  };

  exports.default = plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
