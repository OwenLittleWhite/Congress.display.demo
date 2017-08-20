<template>
  <v-container>
    <v-layout row wrap class="mt-4">
      <v-flex xs12 sm12 md6 offset-md3>
        <v-layout row class="mt-4">
          <v-flex xs12>
            <v-text-field prepend-icon="email" name="email" label="Email" v-model="email"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row class="mt-4">
          <v-flex xs12>
            <v-text-field name="password" label="Password" v-model="password" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'text' : 'password'"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row class="mt-4">
          <v-flex xs12 sm12 md6 offset-md3>
            <v-btn @click="login()" v-if="loginShow">Login</v-btn>
            <v-progress-circular indeterminate v-if="progressShow"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      e1: false,
      loginShow: true,
      progressShow: false,
      password: '',
      email: ''
    }
  },
  methods: {
    login() {
      this.loginShow = false
      this.progressShow = true
      setTimeout(() => {
        this.$store.commit('updateLoginState', { email: this.email, isLogin: true })
        this.$router.back()
      }, 2000)
    }
  },
  mounted() {
    this.$store.commit('updateLoginState', { email: '', isLogin: false })
  }
}
</script>
<style scoped>

</style>
