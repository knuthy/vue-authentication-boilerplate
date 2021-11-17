<template>
    <div id="signup">

      <span v-if="error" class="error">{{error}}</span>

      <div class="container">

        <div class="content">

          <span class="title">Sign Up</span>

          <b-form-input v-model="username" placeholder="Username"></b-form-input>

          <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
          <b-form-input v-model="password_verify" type="password" placeholder="Confirm password"></b-form-input>

          <div @click="signup()" class="button">Sign up</div>

          <router-link to="/login"><span class="sub">Login</span></router-link>

        </div>

      </div>

    </div>
</template>

<style scoped src="../assets/css/signup.css"></style>

<script>

export default {
  name: 'Signup',
  data() {
    return {
      username: '',
      password: '',
      password_verify: '',
      error: null
    }
  },
  methods: {

    // Sign up
    signup() {

      // Check passwords match
      if(this.password !== this.password_verify)
        return this.error = 'Passwords dont match';

      // Reset error
      this.error = null;

      // Call post request with corresponding body model
      this.$axios.post(`${this.$api}/user/signup`, {
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
        this.$router.push('/login');

      });

    }
  }
}
</script>
