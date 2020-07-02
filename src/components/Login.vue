<template>
  <div class="login">
    <form @submit.prevent="joinChat">
      <div class="field">
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" />
      </div>
      <button type="submit">join</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    joinChat() {
      this.$store.commit("setUsername", this.username);
      this.$router.push({ path: "/chat" });
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form > :not(:last-child) {
  margin-bottom: 10px;
}

.field > :not(:last-child) {
  margin-right: 5px;
}
</style>
