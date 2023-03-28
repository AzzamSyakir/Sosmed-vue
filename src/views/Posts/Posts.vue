<template>
  <div class="container">
    <h1 class="text-center my-5">List Postingan</h1>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <ul class="list-group">
          <li v-for="post in posts" :key="post.id" class="list-group-item">
            <h2 class="mb-3">{{ post.caption }}</h2>
            <img :src="baseUrl + post.media" alt="post image" class="img-fluid mb-3" />
            <p>Diunggah oleh {{ post.username}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      baseUrl: 'http://127.0.0.1:8000'
    }
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/post/getall-posts')
        const data = await response.json()
        this.posts = data.posts
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>