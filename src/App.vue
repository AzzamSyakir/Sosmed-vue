<template>
  <div>
    <h1>Selamat datang di Aplikasi saya</h1>
    <p v-if="loggedIn">Logged In</p>
    <p v-else>Not Logged In</p>
    <ul>
      <li v-if="!loggedIn">
        <router-link to="/login">Login</router-link>
      </li>
      <li>
        <router-link to="/register">Register</router-link>
      </li>
      <li>
        <router-link to="/">home</router-link>
      </li>
      <li>
        <router-link to="/posts">buat postingan</router-link>
      </li>
      <li>
        <router-link to="/chat">message</router-link>
      </li>
      <li v-if="loggedIn">
        <router-link to="/change-user">ganti akun</router-link>
      </li>
    </ul>
    <router-view @login-successful="loggedIn = true"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false
    }
  }
}
</script>

<style>
body {
  background-color: white;
}
</style>
