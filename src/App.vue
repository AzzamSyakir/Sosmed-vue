<template>
  <div>
    <h1>Selamat datang di Aplikasi saya</h1>
    <ul>
      <li>
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
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-color: white;
}
</style>
