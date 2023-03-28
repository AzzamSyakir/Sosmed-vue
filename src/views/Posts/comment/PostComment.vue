<template>
  <div>
    <form @submit.prevent="submitComment">
      <textarea v-model="newComment" placeholder="Tulis komentar..."></textarea>
      <button type="submit">Kirim</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      newComment: '',
      postId: 3 // Ganti dengan ID post yang diinginkan
    }
  },
  methods: {
    submitComment() {
      axios
        .post(`/api/post/comments/add-comment/${this.postId}`, {
          comment: this.newComment
        })
        .then((response) => {
          console.log(response.data.message)
          // Tambahkan kode untuk menampilkan pesan sukses
        })
        .catch((error) => {
          console.log(error.response.data.message)
          // Tambahkan kode untuk menampilkan pesan error
        })
    }
  }
}
</script>
