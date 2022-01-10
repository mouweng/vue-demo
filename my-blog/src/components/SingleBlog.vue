<template>
  <div id="single-blog">
      <h1>{{blog.title}}</h1>
      <article>{{blog.content}}</article>
      <p>作者 ：{{blog.author}}</p>
      <p>分类 ：</p>
      <ul>
          <li v-for="category in blog.categories" :key="category">
              {{category}}
          </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "single-blog",
    data() {
        return {
            id: this.$route.params.id,
            blog: {}
        }
    },
    created() {
        // this.$http.get('https://my-blog-a1af4-default-rtdb.firebaseio.com/posts/' + this.id + ".json").then(function(data){
        axios.get('/posts/' + this.id + ".json").then((data)=>{
            console.log(data.data)
            this.blog = data.data
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