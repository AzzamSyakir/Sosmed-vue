<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">{{ formTitle }}</div>
          <div class="form-group">
            <label for="photo">photo profile:</label>
            <input type="file" id="photo" name="photo" @change="handleMediaChange" />
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="form-group row">
                <label for="username" class="col-md-4 col-form-label text-md-right">username</label>

                <div class="col-md-6">
                  <input
                    id="username"
                    type="text"
                    class="form-control"
                    name="username"
                    v-model="form.username"
                    required
                    autofocus
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    v-model="form.email"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    v-model="form.password"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="password_confirmation"
                  class="col-md-4 col-form-label text-md-right"
                >Confirm Password</label>

                <div class="col-md-6">
                  <input
                    id="password_confirmation"
                    type="password"
                    class="form-control"
                    name="password_confirmation"
                    v-model="form.password_confirmation"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="no_hp" class="col-md-4 col-form-label text-md-right">no_hp</label>

                <div class="col-md-6">
                  <input
                    id="no_hp"
                    type="integer"
                    class="form-control"
                    name="no_hp"
                    v-model="form.no_hp"
                    required
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">{{ submitButton }}</button>
                </div>
              </div>
            </form>
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
      form: {
        username: '',
        email: '',
        password: '',
        no_hp: '',
        photo: ''
      },
      formTitle: 'Register',
      submitButton: 'Register'
    }
  },

  methods: {
    async register() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', this.form)
        console.log(response)
        alert('Registration successful!')
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style>
</style>
