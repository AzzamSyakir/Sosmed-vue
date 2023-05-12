<template>
  <div class="conversation-container">
    <!-- List of conversations -->
    <div v-show="conversations.length > 0">
      <div v-for="(conversation, index) in conversations" :key="index">
        <div class="card conversation-card" @click="getMessage(conversation)">
          <div class="card-body d-flex align-items-center">
            <img
              :src="`${baseUrl}${conversation.user.profile_picture}`"
              class="rounded-circle me-3 profile-picture"
              width="50"
              height="50"
              alt="Profile Picture"
            />

            <div>
              <h5 class="card-title mb-0 username">{{ conversation.user.username }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="conversations.length === 0">
      <p>No conversations found.</p>
    </div>

    <!-- Conversation detail -->
    <div v-if="selectedConversation">
      <h3>
        <img
          :src="`${baseUrl}${selectedConversation.user.profile_picture}`"
          class="rounded-circle me-3 profile-picture"
          width="50"
          height="50"
          alt="Profile Picture"
        />
        {{ selectedConversation.user.username }}
      </h3>
      <div class="message-container">
        <div v-for="(message, index) in messages.messages" :key="index">
          <div class="message-text">{{ message.message }}</div>
        </div>
      </div>

      <form class="message-form" @submit.prevent="sendMessage">
        <input type="text" v-model="newMessage" placeholder="kirim pesan..." />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      conversations: [],
      isLoading: false,
      error: '',
      baseUrl: 'http://127.0.0.1:8000',
      selectedConversation: null,
      messages: null // tambahkan property messages
    }
  },

  methods: {
    getMessage(conversation) {
      axios
        .get(
          `http://127.0.0.1:8000/api/message/get-message/${conversation.conversation.user_id_2}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }
        )
        .then((response) => {
          this.messages = response.data
          this.selectedConversation = conversation
        })
        .catch((error) => {
          console.log(error)
        })
    },

    sendMessage(user) {
      // implement your send message logic here
    },

    deselectConversation() {
      // implement your deselect conversation logic here
    }
  },
  mounted() {
    this.isLoading = true
    axios
      .get(`http://127.0.0.1:8000/api/conversation`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then((response) => {
        this.conversations = response.data
        this.isLoading = false
        this.error = ''
        console.log(this.conversations.conversation[0].user_id_2)
      })
      .catch((error) => {
        this.isLoading = false
        this.error = 'Something went wrong. Please try again later.'
      })
  }
}
</script>
<style scoped>
.message-container {
  overflow-y: scroll;
  height: 400px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 10px;
}

/* Style untuk setiap pesan */
.message-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}

/* Style untuk pesan yang dikirim pengguna saat ini */
.sent {
  align-items: flex-end;
}

/* Style untuk pesan yang diterima oleh pengguna saat ini */
.received {
  align-items: flex-start;
}

/* Style untuk teks pesan */
.message-text {
  background-color: #f1f0f0;
  padding: 8px;
  border-radius: 5px;
  word-wrap: break-word;
  max-width: 70%;
}

/* Style untuk waktu pesan */
.message-time {
  font-size: 12px;
  color: #8e8e8e;
  margin-top: 5px;
}

/* Style untuk form pesan */
.message-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

/* Style untuk input pesan */
input[type='text'] {
  border: none;
  border-radius: 999px;
  padding: 10px;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
}

/* Style untuk tombol kirim pesan */
button[type='submit'] {
  background-color: #0088cc;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type='submit']:hover {
  background-color: #00669d;
}
.message-container {
  display: flex;
  flex-direction: column;
}

.message-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.message-text {
  background-color: #dbedff;
  color: #1d2129;
  padding: 8px 12px;
  border-radius: 20px;
  max-width: 75%;
  margin: 8px;
}

.message-time {
  font-size: 12px;
  color: #8e8e8e;
  margin: 0 8px;
}

.message-row.sent .message-text {
  background-color: #f0f0f0;
  color: #1d2129;
}

.message-row.sent .message-time {
  text-align: right;
}

.message-row.sent .message-text {
  margin-left: auto;
  margin-right: 8px;
}

.message-row.received .message-text {
  margin-left: 8px;
  margin-right: auto;
}

.conversation-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.conversation-list {
  width: 30%;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.conversation-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}

.conversation-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.conversation-info {
  display: flex;
  flex-direction: column;
}

.conversation-username {
  font-weight: bold;
  font-size: 16px;
}

.conversation-last-message {
  color: #888;
  font-size: 14px;
}

.conversation-detail {
  width: 70%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.conversation-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  cursor: pointer;
  margin-right: 10px;
}

.conversation-header-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.conversation-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.conversation-messages {
  flex-grow: 1;
  overflow: auto;
}

.conversation-message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  max-width: 80%;
}

.my-message {
  background-color: #007aff;
  color: #fff;
  align-self: flex-end;
}

.conversation-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
}

.conversation-input input[type='text'] {
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
}

.send-button {
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
}
</style>