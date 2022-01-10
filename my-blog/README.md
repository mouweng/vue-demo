# my-blog

[通俗易懂的Vue实战项目-搭建个人博客](https://www.bilibili.com/video/BV11i4y177ku?p=14&spm_id_from=pageDriver)

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 学习过程记录
### 环境搭建
```shell
npm install --global vue-cli
vue init web my-blog # 全部选no
cd my-blog
npm install
npm run dev
```

### 安装vue-resource
- 安装
```shell
npm install vue-resource --save
```
- 引入
```js
import VueResource from 'vue-resource'
Vue.use(VueResource)
```
- 使用
```js
methods: {
    post:function() {
        // https://jsonplaceholder.typicode.com/posts
        this.$http.post("https://jsonplaceholder.typicode.com/posts", {
            title: this.blog.title,
            body: this.blog.content,
            userId:1
        }).then(function(data){
            console.log(data);
            this.submitted = true;
        })
    }
}
```
### v-for出现的问题
- 解决方案
https://www.cnblogs.com/zdz8207/p/vue-for-v-bind-key.html
key的值不能为对象，可以找一个String来替换
```html
<div v-for="blog in filteredBlogs" :key="blog.title" class="single-blog">
```


### 请求本地/网络数据
- 当前目录在src下面
```js
this.$http.get('./../static/posts.json')
    .then(function(data){
        this.blogs = data.body.slice(0,10);
        console.log(this.blogs)
    })
```

```js
this.$http.get('https://jsonplaceholder.typicode.com/posts')
    .then(function(data){
        this.blogs = data.body.slice(0,10);
        console.log(this.blogs)
    })
```

### 钩子函数
- 在main.js里面定义钩子函数
```js
// 定义随机颜色
Vue.directive('rainbow', {
  bind(element, binding, vnode) {
    element.style.color = "#" + Math.random().toString(16).slice(2,8);
  }
})
// 定义主题
Vue.directive('theme', {
  bind(element, binding, vnode) {
    if (binding.value == 'wide') {
      element.style.maxWidth = "1260px";
    } else if (binding.value == 'narrow'){
      element.style.maxWidth = "560px";
    }
    if (binding.arg = 'column') {
      element.style.background = "#6677cc"
      element.style.padding = "20px"
    }
  }
})
```
- 在局部文件里面定义钩子函数
```js
directives:{
    // 定义随机颜色
    "rainbow": {
        bind(element, binding, vnode) {
            element.style.color = "#" + Math.random().toString(16).slice(2,8);
        }
    }
}
```
- 使用
```html
<div v-theme:column="'narrow'" id="show-blogs">
    <h1>博客总览</h1>
    <div v-for="blog in blogs" :key="blog" class="single-blog">
        <h2 v-rainbow>{{blog.title}}</h2>
        <article>
            {{blog.body}}
        </article>
    </div>
</div>
```

### 自定义过滤器
- 在main.js里面定义
```js
// 自定义过滤器
Vue.filter("to-uppercase", function(value){
  return value.toUpperCase();
})
```
- 在局部文件里面定义过滤器
```js
filters:{
    "to-uppercase":function(value) {
        return value.toUpperCase();
    }
}
```
- 使用
```html
<h2 v-rainbow>{{blog.title|to-uppercase}}</h2>
```


### 搜索功能的实现
- data里面新增search，并绑定在input里面
```html
<input type="text" v-model="search" placeholder="search">
```
```js
data() {
    return {
        blogs: [],
        search:""
    }
}
```
- 定义computed进行过滤
```js
computed: {
    filteredBlogs:function(){
        return this.blogs.filter((blog)=>{
            return blog.title.match(this.search);
        })
    }
}
```
- for循环更改为filteredBlogs
```html
<div v-for="blog in filteredBlogs" :key="blog" class="single-blog">
    <h2 v-rainbow>{{blog.title|to-uppercase}}</h2>
    <article>
        {{blog.body|snippet}}
    </article>
</div>
```

### 路由的实现
- 安装
```shell
npm install vue-router --save
```
- 引入
```js
import VueRouter from 'vue-router'
Vue.use(VueRouter)
```
- 创建路由文件routes.js
```js
import ShowBlogs from './../components/ShowBlogs.vue'
import AddBlog from './../components/AddBlog.vue'

export default [
    {path:"/", component:ShowBlogs},
    {path:"/add", component:AddBlog},
]
```
- 在main.js里面使用新创建好的路由
```js
import Routes from './routes/routes'

// 使用路由
const router = new VueRouter({
  routes : Routes,
  mode: "history" //  删除#
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router
})
```
- 更改App.vue
```html
<template>
  <div id="app">
    <!-- <add-blog></add-blog> -->
    <!-- <show-blogs></show-blogs> -->
    <router-view></router-view>
  </div>
</template>
```


### 样式只针对当前 
```css
<style scoped>
```

### 导航功能实现
- 新建一个component，在App.vue中引入,并使用
```js
<template>
    <nav>
        <ul>
            <li>
                <router-link to="/" exact>博客</router-link>
                <router-link to="/add" exact>写博客</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
     name: "blog-header"
}
</script>

<style scoped>
</style>
```

### 路由参数
- 定义路由
```js
import ShowBlogs from './../components/ShowBlogs.vue'
import AddBlog from './../components/AddBlog.vue'
import SingleBlog from './../components/SingleBlog.vue'

export default [
    {path:"/", component:ShowBlogs},
    {path:"/add", component:AddBlog},
    {path:"/blog/:id", component:SingleBlog},
]
```

- 编写component文件
```js
<template>
  <div id="single-blog">
      <h1>{{blog.title}}</h1>
      <article>{{blog.body}}</article>
  </div>
</template>

<script>
export default {
    name: "single-blog",
    data() {
        return {
            id: this.$route.params.id,
            blog: {}
        }
    },
    created() {
        this.$http.get('https://jsonplaceholder.typicode.com/posts/' + this.id).then(function(data){
            this.blog = data.body
        })
    }
}
</script>

<style>
#single-blog {
    max-width: 560px;
    margin: 0 auto;
    padding: 20px;
    background: #eee;
    border: 1px dotted #aaa;

}
</style>
```

- 编写链接
```html
<router-link v-bind:to="'/blog/' + blog.id">
    <h2 v-rainbow>{{blog.title|to-uppercase}}</h2>
</router-link>
```

### 打包上传部署
```
npm run build

// 出现一个dist,修改index.html,把static前面斜杠删掉，并放到服务器上
```
### 几种npm的区别
```shell
npm install packageName //本地安装，安装到项目目录下，不在package.json中写入依赖
npm install packageName -g //全局安装，安装在Node安装目录下的node_modules下
npm install packageName --save //安装到项目目录下，并在package.json文件的dependencies中写入依赖，简写为-S
npm install packageName --save-dev //安装到项目目录下，并在package.json文件的devDependencies中写入依赖，简写为-D
```


### axios替换vue-resource
- 安装
```shell
npm install axios --save
```
- 引入
```js
import axios from 'axios'
```
- 使用，为了this可以正常指向，function改为箭头函数
```js
// 原先的方法vue-resource
// this.$http.post("https://my-blog-a1af4-default-rtdb.firebaseio.com/posts.json", this.blog)
axios.post("https://my-blog-a1af4-default-rtdb.firebaseio.com/posts.json", this.blog)
    .then((data)=>{
    console.log(data);
    this.submitted = true;
})
```

### axios优化-全局配置
在main.js里面
```js
import axios from 'axios'
// 全局配置
axios.defaults.baseURL = "https://my-blog-a1af4-default-rtdb.firebaseio.com"

```