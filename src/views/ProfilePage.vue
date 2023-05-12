<template>
  <div class="profile-page">
    <div class="header">
      <div class="profile-image">
        <img :src="`${baseUrl}${user.profile_picture}`" alt="Profile Image" />
      </div>
      <div class="profile-info">
        <div class="username">{{ user.username }}</div>
        <div class="name">{{ user.name }}</div>
        <div class="bio">{{ user.bio }}</div>
        <div class="counts">
          <div class="post-count">{{posts || 0 }} posts</div>
          <div class="follower-count">{{ follower_count || 0 }} followers</div>
          <div class="following-count">{{following_count || 0 }} following</div>
        </div>

        <div class="actions">
          <button @click="follow">{{ user.is_following ? 'Unfollow' : 'Follow' }}</button>
        </div>
      </div>
    </div>
    <div class="posts">
      <div v-for="post in posts" :key="post.id" class="post">
        <img :src="post.image_url" alt="Post Image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      user: {},
      follower_count: '',
      following_count: '',
      posts: [],
      baseUrl: 'http://127.0.0.1:8000'
    }
  },
  created() {
    this.fetchUserData(this.$route.params.username)
  },
  methods: {
    fetchUserData(username) {
      // Ambil data user dari API
      fetch(`http://127.0.0.1:8000/api/user/UserProfile/${username}`)
        .then((response) => response.json())
        .then((data) => {
          this.user = data.user
          this.posts = data.posts
          this.follower_count = data.follower_count
          this.following_count = data.following_count
        })
        .catch((error) => console.log(error))
    },
    follow() {
      // Kirim request follow/unfollow ke API
      fetch('http://127.0.0.1:8000/api/follow/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          receiver_id: this.user.id
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (this.user.is_following) {
            this.user.is_following = false
            this.follower_count -= 1
          } else {
            this.user.is_following = true
            this.follower_count += 1
          }
        })
        .catch((error) => console.log(error))
    }
  }
}
</script>
<style scoped>
/* Styling untuk komponen ProfilePage */
.profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  margin-left: 20px;
}

.username {
  font-size: 24px;
  font-weight: bold;
}

.name {
  font-size: 20px;
}

.bio {
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.counts {
  display: flex;
  margin-bottom: 20px;
}

.post-count,
.follower-count,
.following-count {
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.actions {
  display: flex;
}

.actions button {
  background-color: #3897f0;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.actions button:hover {
  background-color: #3b82f6;
}

.posts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.post {
  height: 0;
  padding-bottom: 100%;
  position: relative;
}

.post img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
