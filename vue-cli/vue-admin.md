## Yarn是什么

### yarn和npm对比

- yarn是为了弥补npm install的缺陷而出现的
- yarn 速度快、并行安装、离线模式、安装版本统一、更简洁的输出、多注册来源处理、更好的语义化

### yarn命令

| npm                          | yarn                 |
| ---------------------------- | -------------------- |
| npm install                  | yarn                 |
| npm install react --save     | yarn add react       |
| npm uninstall react --save   | yarn remove react    |
| npm install react --save-dev | yarn add react --dev |
| npm update --save            | yarn update          |

## 初始化项目

```shell
vue create vue-cli
```

## 引入element-ui

```shell
npm i element-ui -S
```

```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

```html
<el-button>button</el-button>
```

也可以按需引入，详细看element-ui官方文档

## 路由

- main.js

```js
import router from './router'//导入

new Vue({
  router, // 引入
  store,
  render: h => h(App)
}).$mount('#app')
```

- /router/index.js

 ```js
 import Vue from 'vue'
 import VueRouter from 'vue-router'
 import Home from '../views/Home.vue'
 
 Vue.use(VueRouter)
 
 const routes = [
   {
     path: '/',
     name: 'Home',
     component: Home
   },
   {
     path: '/about',
     name: 'About',
     // route level code-splitting
     // this generates a separate chunk (about.[hash].js) for this route
     // which is lazy-loaded when the route is visited.
     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
   }
 ]
 
 const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
 })
 
 export default router
 ```

- App.vue

```html
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
```

## 首页UI的搭建

- 使用elementUI中的布局容器

```html
<template>
  <el-container style="height: 100%">
    <el-aside width="auto">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

```

- 使用less

```shell
npm i less
npm i less-loader@5.0.0
```

```css
<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>

```

## 左侧菜单栏的引入

- 找到NavMenu引入，把左侧导航栏定义成组件Component

```html
<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

```

- 引入组件并使用

```html
<common-aside></common-aside>
```

```script
import CommonAside from '../components/CommonAside.vue'
export default {
  name: 'Home',
  components: {
    CommonAside
  }
}
```

- 改造组件并调整样式

```html
<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>通用后台管理系统</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :index="item.label" :key="item.label">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="child in item.children" :key="child.path">
        <el-menu-item :index="child.path">{{child.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
    height: 50%;
    border: none;
    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px
    }
}
</style>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      menu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            },
            {
              path: '/page3',
              name: 'page3',
              label: '页面3',
              icon: 'setting',
              url: 'Other/PageThree'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    clickMenu (item) {
      this.$router.push({
        name: item.name
      })
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    noChildren () {
      return this.menu.filter(item => !item.children)
    },
    hasChildren () {
      return this.menu.filter(item => item.children)
    }
  }
}
</script>

```

- 更改App.vue样式

```html
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
</style>
```

- 新建路由

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
```

views/home/index.vue(其他的也同理)

```html
<template>
  <div>我是Home界面</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  }
}
</script>

<style>
</style>

```

- Main.vue更改内容

```html
<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
```

## Header导航栏

使用了el-dropdown组件

```html
<el-header>
	<common-header></common-header>
</el-header>
```

```html
<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini"></el-button>
      <h3 style="color: #fff">首页</h3>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
            <img class="user" :src="userImg" alt="" />
        </span>
        <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: 'CommonHeader',
  data () {
    return {
      userImg: require('../assets/logo.png')
    }
  }
}
</script>
<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 10%;
  }
}
</style>
```

## 左侧展开/收起按钮设置

需要两个兄弟组件间的相互通信，使用vuex进行事件通信

 ```shell
 yarn add vuex
 
 import store from './store'
 new Vue({
   store,
   render: h => h(App)
 }).$mount('#app')
 ```

store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

```
