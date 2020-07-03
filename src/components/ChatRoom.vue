<template>
  <div class="chat-room">
    <div class="messages">
      <p v-for="(message, index) in messages" :key="index">
        <span class="username">{{ message.username }}</span>
        <span>：</span>
        <span class="message">{{ message.message }}</span>
      </p>
    </div>
    <form class="message-form" @submit.prevent="sendMessage">
      <input class="message-input" type="text" v-model="messageInput" />
      <button type="submit">send</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import io from "socket.io-client";

interface Message {
  username: string;
  message: string;
}

interface Data {
  messageInput: string;
  messages: Array<Message>;
  socket: SocketIOClient.Socket;
}

export default Vue.extend({
  name: "ChatRoom",
  data(): Data {
    return {
      messageInput: "",
      messages: [],
      socket: io(process.env.VUE_APP_SOCKET_IO || "localhost:8000"),
    };
  },
  methods: {
    sendMessage() {
      if (!this.messageInput.trim()) return;

      const newMessage: Message = {
        username: this.$store.state.username || "anonymous",
        message: this.messageInput,
      };

      this.socket.emit("message-send", newMessage);

      this.clearInput();
      this.focusInput();
    },
    clearInput() {
      this.messageInput = "";
    },
    focusInput() {
      const input = document.querySelector(
        ".message-input"
      ) as HTMLInputElement;
      input.focus();
    },
    toBottom() {
      const messages = document.querySelector(".messages") as HTMLDivElement;
      messages.scrollTop = messages.scrollHeight;
    },
  },
  mounted() {
    this.focusInput();

    this.socket.on("connect", () => {
      this.socket.emit("user-join", this.$store.state.username);
    });

    this.socket.on("message-load", (data: Array<Message>) => {
      this.messages = data;
    });

    this.socket.on("message-send", (data: Message) => {
      this.messages.push(data);
    });

    this.socket.on("disconnect", () => {
      this.socket.emit("user-left", this.$store.state.username);
    });
  },
  updated() {
    this.toBottom();
  },
  beforeDestroy() {
    this.socket.emit("user-left", this.$store.state.username);
  },
});
</script>

<style scoped>
.chat-room {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.messages {
  height: 300px;
  margin-bottom: 10px;
  overflow-y: scroll;
  text-align: left;
}

.message-form {
  display: flex;
  justify-content: center;
}

.message-input {
  flex-grow: 1;
  margin-right: 3px;
}
</style>
