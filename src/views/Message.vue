<template>
  <div>
    <h2>Pilih User</h2>
    <select v-model="selectedUserId" @change="fetchMessages">
      <option value>Pilih User</option>
      <option v-for="user in userList" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <div v-if="selectedUserId">
      <h2>Chat dengan {{ selectedUserName }}</h2>
      <div class="chat-box">
        <div
          v-for="message in messageList"
          :key="message.id"
          :class="{ 'sent-message': message.sender_id == userId, 'received-message': message.receiver_id == userId }"
        >
          <div>{{ message.message }}</div>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input type="text" v-model="message" placeholder="Ketik pesan" />
        <button type="submit">Kirim</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userId: 1, // ID user saat ini (diganti dengan ID user yang sedang login)
      selectedUserId: '',
      selectedUserName: '',
      message: '',
      messageList: [],
      userList: []
    }
  },
  mounted() {
    this.fetchUserList()
  },
  methods: {
    fetchUserList() {
      axios
        .get('http://127.0.0.1:8000/api/admin/list-user')
        .then((response) => {
          this.userList = response.data.users
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchMessages() {
      axios
        .get(
          `http://127.0.0.1:8000/api/message/get-message?sender_id=${this.userId}&receiver_id=${this.selectedUserId}`
        )
        .then((response) => {
          this.messageList = response.data.messages
        })
        .catch((error) => {
          console.log(error)
        })

      // Ambil nama user yang dipilih
      const selectedUser = this.userList.find((user) => user.id == this.selectedUserId)
      if (selectedUser) {
        this.selectedUserName = selectedUser.name
      }
    },
    sendMessage() {
      axios
        .post('http://127.0.0.1:8000/api/message/add-message', {
          sender_id: this.userId,
          receiver_id: this.selectedUserId,
          message: this.message
        })
        .then((response) => {
          console.log(response.data)
          this.message = ''
          this.fetchMessages()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.chat-box {
  border: 1px solid #ccc;
  height: 400px;
  margin: 10px 0;
  overflow-y: scroll;
}

.sent-message {
  text-align: right;
  color: white;
  background-color: blue;
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
}
</style >
