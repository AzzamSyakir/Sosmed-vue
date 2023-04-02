<template>
  <div class="container">
    <h1 class="text-center my-5">List Postingan</h1>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <ul class="list-group" v-if="posts && posts.length > 0">
          <li v-for="post in posts" :key="post.id" class="list-group-item">
            <h2 class="mb-3">{{ post.caption }}</h2>
            <img :src="baseUrl + post.media" alt="post image" class="img-fluid mb-3" />
            <p>Diunggah oleh {{ post.username}}</p>
            <form @submit.prevent="submitComment(post.id)">
              <div class="form-group">
                <label for="commentInput">Komentar</label>
                <textarea class="form-control" id="commentInput" rows="3" v-model="comment"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Kirim</button>
            </form>
            <div class="mt-3">
              <h4>Komentar</h4>
              <ul v-if="comments[post.id] && comments[post.id].length > 0">
                <li
                  v-for="comment in comments[post.id]"
                  :key="comment.id"
                  class="comment-container"
                >
                  <p class="username">{{ comment.username }}</p>
                  <p>{{ comment.comment }}</p>
                </li>
              </ul>
              <p v-else>belum ada komentar, jadilah yang pertama berkomentar</p>
            </div>
          </li>
        </ul>
        <p v-else>belum ada postingan,jadilah yang pertama membuat postingan</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as Vue from 'vue'
export default {
  data() {
    return {
      posts: [],
      comments: {},
      baseUrl: 'https://58ce-36-69-89-194.ap.ngrok.io',
      comment: ''
    }
  },

  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch('https://58ce-36-69-89-194.ap.ngrok.io/api/post/getallposts')
        const data = await response.json()
        this.posts = data.posts
        for (let post of this.posts) {
          await this.fetchComments(post.id)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async fetchComments(postId) {
      try {
        const response = await fetch(
          `https://58ce-36-69-89-194.ap.ngrok.io/api/post/comments/get-comment/${postId}`,
          {
            method: 'GET',
            mode: 'no-cors'
          }
        )
        const data = await response.json()
        if (data.comments.length > 0) {
          // Jika ada komentar yang ditemukan, ubah nilai variabel comments
          this.comments[postId] = data.comments
        } else {
          // Jika tidak ada komentar yang ditemukan, atur variabel comments sebagai array kosong
          this.comments[postId] = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submitComment(postId) {
      try {
        const token = localStorage.getItem('access_token')
        if (!token) {
          // Show warning message and redirect to login page
          Vue.notify({
            group: 'notifications',
            title: 'Anda harus login untuk menambahkan komentar',
            type: 'warning'
          })
          window.location.href = '/login'
          return
        }
        const response = await fetch(
          `https://58ce-36-69-89-194.ap.ngrok.io/api/post/comments/add-comment/${postId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              comment: this.comment,
              post_id: postId
            })
          }
        )
        const data = await response.json()
        if (data.success) {
          this.comment = ''
          this.comments[postId] = [...this.comments[postId], data.comment]
          Vue.notify({
            group: 'notifications',
            title: 'Komentar berhasil ditambahkan',
            type: 'success'
          })
          // Redirect to current page to reload comments
          window.location.reload()
        } else {
          Vue.notify({
            group: 'notifications',
            title: 'Gagal menambahkan komentar',
            type: 'error'
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.comment-container {
  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 10px;
}
.comment-container p {
  margin: 0;
}

.comment-container .username {
  font-weight: bold;
}
</style>