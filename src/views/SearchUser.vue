<template>
  <div>
    <div class="search-bar">
      <input type="text" v-model="query" placeholder="Search" />
      <button class="clear-button" v-if="query" @click="clearSearch">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="user-list">
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <div
          class="user-card"
          v-for="user in users"
          :key="user.id"
          @click="goToProfile(user.username)"
        >
          <div class="user-avatar">
            <img :src="`${baseUrl}${user.profile_picture}`" />
          </div>
          <div class="user-info">
            <div class="user-username">{{ user.username }}</div>
            <div class="user-name">{{ user.name }}</div>
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
      query: '',
      users: [],
      isLoading: false,
      error: '',
      baseUrl: 'http://127.0.0.1:8000'
    }
  },

  methods: {
    searchUsers() {
      if (this.query.length > 0) {
        this.isLoading = true
        axios
          .get(`http://127.0.0.1:8000/api/user/searchUser/${this.query}`, {})
          .then((response) => {
            this.users = response.data
            this.isLoading = false
            this.error = ''
          })
          .catch((error) => {
            this.isLoading = false
            this.error = 'Something went wrong. Please try again later.'
          })
      } else {
        this.users = []
      }
    },

    clearSearch() {
      this.query = ''
      this.users = []
    },

    goToProfile(username) {
      this.$router.push({ name: 'ProfilePage', params: { username: username } })
    }
  },

  watch: {
    query(newQuery) {
      if (newQuery.length === 0) {
        this.users = []
      } else {
        this.searchUsers()
      }
    }
  }
}
</script>

<style scoped>
.user-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
}

.search-bar input[type='text'] {
  border: none;
  border-bottom: 1px solid #dbdbdb;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  width: 100%;
  max-width: 400px;
  background-color: #fafafa;
}

.clear-button {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.clear-button i {
  color: #999;
  font-size: 1.2rem;
}

.clear-button:hover i {
  color: #000;
}

.clear-button:focus {
  outline: none;
}

.search-bar input[type='text']:focus + .clear-button i {
  color: #000;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  margin-top: 1rem;
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #dbdbdb;
  margin: 0.5rem;
  width: 200px;
  height: 250px;
}

.user-card:hover {
  cursor: pointer;
  background-color: #fafafa;
}

.user-info {
  margin-top: 1rem;
  text-align: center;
}

.user-username {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.user-name {
  color: #999;
  font-size: 1rem;
}
</style>
