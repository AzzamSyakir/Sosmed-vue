<template>
  <div>
    <form>
      <div class="form-group">
        <label for="media">Select a file:</label>
        <input type="file" id="media" name="media" @change="handleMediaChange" />
      </div>
      <div class="form-group">
        <label for="caption">Caption:</label>
        <input type="text" id="caption" name="caption" v-model="caption" />
      </div>
      <button type="button" class="btn btn-primary" @click="submitForm">Submit</button>
    </form>
    <div v-if="successMessage" class="alert alert-success" role="alert">{{ successMessage }}</div>
  </div>
</template>
 
<script>
import axios from 'axios'
export default {
  data() {
    return {
      media: null,
      caption: '',
      successMessage: ''
    }
  },
  methods: {
    handleMediaChange(event) {
      this.media = event.target.files[0]
    },
    handleCaptionChange(event) {
      this.caption = event.target.value
    },
    submitForm() {
      if (!localStorage.getItem('access_token')) {
        alert('You need to login to create a post!')
        return
      }
      const formData = new FormData()
      formData.append('media', this.media)
      formData.append('caption', this.caption)
      axios
        .post('http://127.0.0.1:8000/api/post/add-posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then((response) => {
          this.successMessage = 'Post created successfully!'
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>