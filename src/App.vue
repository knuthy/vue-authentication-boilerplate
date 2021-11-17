<template>

  <div id="app">

    <router-view />

  </div>

</template>

<script>
// Global styling
import '@/assets/css/reset.css';
import '@/assets/css/main.css';

// App export
export default {
  name: 'app',
  watch: {
      '$route' (to) {
        document.title = `${to.name}`;
      },
      token: function () {
        this.getUser();
      },
  },
  methods: {

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

        // Succeeded
        this.$router.push('/profile');

      });

    }

  },
  created() {

    this.getUser();

  }
}

</script>
