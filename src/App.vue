<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  --vue-green: #42b983;
  --vue-darkgreen: #2c3e50;
  color: var(--vue-darkgreen);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: var(--vue-darkgreen);
}

#nav a.router-link-exact-active {
  color: var(--vue-green);
}

button {
  padding: 3px 5px;
  border: none;
  background-color: var(--vue-green);
  color: var(--vue-darkgreen);
  transition: color 250ms;
}

button:hover {
  background-color: var(--vue-darkgreen);
  color: white;
}

button:active {
  background-color: var(--vue-green);
  color: var(--vue-darkgreen);
}
</style>
