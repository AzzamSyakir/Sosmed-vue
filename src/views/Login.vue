<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-sm-8 col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" id="username" v-model="username" />
              </div>

              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" v-model="password" />
              </div>

              <button type="submit" class="btn btn-primary btn-block">Login</button>
            </form>

            <p v-if="error" class="text-danger mt-3">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      loggedIn: false
    }
  },
  methods: {
    login() {
      axios
        .post('http://127.0.0.1:8000/api/login', {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          localStorage.setItem('access_token', response.data.access_token)
          this.$emit('login-successful')
          this.loggedIn = true // set loggedIn menjadi true
          alert('login successful!')
          this.errorMessage = ''
          this.$router.push('/')
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
