<template>
    <div id="login">

      <span v-if="error" class="error">{{error}}</span>

      <div class="container">

        <div class="content">

          <span class="title">Login</span>

          <b-form-input v-model="username" placeholder="Username"></b-form-input>

          <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>

          <div @click="login()" class="button">Log in</div>

          <router-link to="/signup"><span class="sub">Sign Up</span></router-link>

        </div>

      </div>

    </div>
</template>

<style scoped src="../assets/css/login.css"></style>

<script>

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {

    // Login
    login() {

      // Reset error
      this.error = null;

      // Call post request with corresponding body model
      this.$axios.post(`${this.$api}/user/login`, {
        username: this.username,
        password: this.password
      }, { withCredentials: true })
      .then((response) => {

        // Map response
        let data = response.data;

        // Error handling and visualizing
        if(data.error)
          return this.error = data.error.message;

        // Succeeded
        this.$router.push('/profile');

      });

    }
  }
}
</script>
