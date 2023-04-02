<template>
  <div class="post-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="media">Select a file:</label>
        <input type="file" id="media" name="media" @change="handleMediaChange" />
      </div>
      <div class="form-group">
        <label for="caption">Caption:</label>
        <textarea id="caption" name="caption" v-model="caption"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  </div>
</template>
  
<script>
import axios from 'axios'

export default {
  data() {
    return {
      selectedMedia: null,
      caption: '',
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    handleMediaChange(event) {
      this.selectedMedia = event.target.files[0]
    },
    submitForm() {
      const formData = new FormData()
      formData.append('media', this.selectedMedia)
      formData.append('caption', this.caption)

      axios
        .post('http://127.0.0.1:8000/api/post/add-posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then((response) => {
          console.log(response.data)
          this.successMessage = 'Post successfully added!'
          this.errorMessage = ''
        })
        .catch((error) => {
          console.error(error)
          this.errorMessage = 'Failed to add post.'
          this.successMessage = ''
        })
    }
  }
}
</script>

<style scoped>
.post-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

textarea {
  display: block;
  width: 100%;
  height: 150px;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.25rem;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

button:hover {
  background-color: #0069d9;
}
</style>
