<template>
    <div id="profile">

      <span v-if="error" class="error">{{error}}</span>

      <div class="container">

        <div v-if="user" class="content">

          <span class="title">Hello, {{user.username}}!</span>

          <span class="sub">Congratulations, you successfully logged in. Now all you can do, is:</span>

          <div @click="logout()" class="button">Log out</div>

        </div>
      </div>

    </div>
</template>

<style scoped src="../assets/css/profile.css"></style>

<script>

export default {
  name: 'Profile',
  data() {
    return {
      user: this.$store.getters.getUser,
      error: null
    }
  },
  watch: {
    '$store.getters.getUser': function() {
      this.user = this.$store.getters.getUser
    }
  },
  methods: {

    // Logout
    logout() {

      // Reset error
      this.error = null;

      // Call post request with corresponding body model
      this.$axios.get(`${this.$api}/user/logout`, { withCredentials: true })
      .then((response) => {

        // Map response
        let data = response.data;

        // Error handling and visualizing
        if(data.error)
          return this.error = data.error.message;

        // Push to store (reset)
        this.$store.commit('setUser', null);

        // Succeeded
        this.$router.push('/login');

      });

    },

    // Get user
    getUser() {

      // Call get request with cookies
      this.$axios.get(`${this.$api}/user`, { withCredentials: true })
      .then((response) => {

        // Map response
        let data = response.data;

        // If not logged in, redirect to login
        if(data.error && data.error.message == "Unauthorized") 
          return this.$router.push('/login');

        // Push to store
        this.$store.commit('setUser', data);

      });

    }
  },
  created() {

    this.getUser();

  }
}
</script>
