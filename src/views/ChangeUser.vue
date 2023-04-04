<template>
  <div>
    <h2>Ganti User</h2>
    <form @submit.prevent="changeUser">
      <div class="form-group">
        <label for="usernameInput">Username</label>
        <input type="text" class="form-control" id="usernameInput" v-model="username" />
      </div>
      <div class="form-group">
        <label for="passwordInput">Password</label>
        <input type="password" class="form-control" id="passwordInput" v-model="password" />
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
        {{ isLoading ? 'Loading...' : 'Ganti User' }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false
    }
  },
  created() {
    const token = localStorage.getItem('access_token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  },
  methods: {
    changeUser() {
      axios
        .post('http://127.0.0.1:8000/api/ChangeUser', {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          localStorage.setItem('access_token', response.data.access_token)
          alert('User changed successfully!')
          this.errorMessage = ''
          this.$emit('loggedInChanged', true)
          this.$router.push('/feed')
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message) {
            this.error = error.response.data.message
          } else {
            this.error = 'Oops! Something went wrong.'
          }
        })
    }
  }
}
</script>
