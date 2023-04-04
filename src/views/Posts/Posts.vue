<template>
  <div class="container">
    <h1 class="text-center my-5">List Postingan</h1>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <ul class="list-group" v-if="posts">
          <li v-for="post in posts" :key="post.id" class="list-group-item">
            <h2 class="mb-3">{{ post.caption }}</h2>
            <img :src="baseUrl + post.media" alt="post image" class="img-fluid mb-3" />
            <p>Diunggah oleh {{ post.username}}</p>
            <form @submit.prevent="submitComment(post.id)">
              <div class="form-group">
                <label for="commentInput">Komentar</label>
                <textarea class="form-control" id="commentInput" rows="3" v-model="comment"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="!loading">Kirim</span>
                <span v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Mengirim...
                </span>
              </button>
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
      comments: {
        // initialize comments object with empty key-value pairs
        //...
      },
      baseUrl: 'http://127.0.0.1:8000',
      comment: '',
      loading: false
    }
  },

  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/post/getallposts')
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
          `http://127.0.0.1:8000/api/post/comments/get-comment/${postId}`
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
        const accessToken = localStorage.getItem('access_token') || ''
        if (!accessToken) {
          console.log('Anda belum login')
          return
        }

        // Mengatur nilai loading menjadi true
        this.loading = true

        // Menambahkan komentar ke dalam daftar komentar pada halaman web
        this.comments[postId] = [...this.comments[postId], { comment: this.comment }]

        // Memperbarui daftar komentar dari server
        await this.fetchComments(postId)

        // Mengirimkan data komentar ke server dan menyimpan ke dalam database
        const response = await fetch(
          `http://127.0.0.1:8000/api/post/comments/add-comment/${postId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              comment: this.comment
            })
          }
        )

        // Jika berhasil menyimpan data ke dalam database, perbarui daftar komentar dari server
        if (response.status === 201) {
          await this.fetchComments(postId)
          this.comment = ''
        }

        // Mengatur nilai loading menjadi false setelah selesai mengirim data
        this.loading = false
      } catch (error) {
        console.log(error)

        // Mengatur nilai loading menjadi false saat terjadi error
        this.loading = false
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