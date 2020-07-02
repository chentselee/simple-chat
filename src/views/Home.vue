<template>
  <div class="home">
    <h1>Simple Chat</h1>
    <Login />
  </div>
</template>

<script>
import Login from "../components/Login";

export default {
  name: "Home",
  components: {
    Login,
  },
};
</script>
