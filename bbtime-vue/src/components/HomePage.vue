<template>
  <div id="bbtime">
    <header id="header">
      <h1>废话连篇</h1>
    </header>
    <main id="app">
      <aside>
        <p id="describe">关你屁事</p>
      </aside>
      <p class="tip">现在总共 bb 了 {{ count }} 条</p>
      <section class="item" v-for="item in contents" :key="item.content">
        <p>{{item.content}}</p>
        <time v-bind:datetime="item.createdAt">{{item.createdAt | dateFormat('YYYY-MM-DD HH:mm')}}</time>
      </section>
      <div class="load-ctn">
        <button class="load-btn" v-on:click="loadMore" v-if="contents" v-cloak>
          再翻翻
        </button>
        <p class="tip" v-else>别急，加载呢</p>
      </div>
    </main>
    <footer>
      <p class="center-text">Copyright © 2022 Mouweng,All Rights Reserved</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "HomePage",
  data() {
    return {
      page: 1,
      count: 0,
      contents: [],
    };
  },
  methods: {
      getData: function(page = 1) {
          axios.get(`http://wengyifan.com:86/blog/getblog?pageIndex=${page}&pageSize=20`).then((data)=>{
            console.log(data.data.data);
            this.count = data.data.data.totalNum;
            // let contentList = data.data.data.content
            let contentList = JSON.parse(JSON.stringify(data.data.data))['content'];
            console.log(contentList);
            if (contentList.length == 0) {
                alert('之前没 bb 过了')
            } else {
                for(let i = 0; i < contentList.length; i ++) {
                  this.contents.push(contentList[i]);
                }
            }
          
        })
      },
      loadMore: function() {
        this.getData(++this.page);
      }
  },
  created() {
    this.getData(1)
  }

};


</script>

<style>
[v-cloak] {
  display: none;
}

html {
  font-size: 16px;
}

body,
button {
  font-family: "Noto Serif SC", serif;
}

aside {
  font-weight: 300;
  font-style: normal;
  line-height: 1.8rem;
}

#app,
header,
footer {
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  font-weight: 900;
}

footer {
  font-size: 0.8rem;
  clear: both;
}

.tip {
  color: #999;
}

.item {
  font-weight: 300;
  font-style: normal;
  line-height: 1.8rem;
  background: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  margin-top: 20px;
  border-top: 3px solid;
  border-top-color: #3d8fb8;
  text-align: justify;
}

.item a {
  text-decoration: none;
  color: #5dafd5;
}

time {
  font-weight: 200;
  color: #bbb;
}

.center-text {
  text-align: center;
}

.center-text a {
  text-decoration: none;
}

.load-ctn {
  width: 100%;
}

.load-btn {
  border: 2px solid #666;
  width: 100px;
  outline: none;
  font-size: 16px;
  border-radius: 100px;
  margin: 30px auto;
  color: #666;
  line-height: 30px;
  float: right;
  background: #fff;
}

.load-btn:hover:active {
  background: #666;
  color: #fff;
}

.type-0 {
  border-top-color: #3d8fb8;
}

.type-1 {
  border-top-color: #ff4081;
}

footer p {
  color: #666;
}

img {
  border-radius: 2%;
  width: 100%;
  height: 100%;
}

video {
  border-radius: 2%;
  width: 100%;
  height: 100%;
}
</style>