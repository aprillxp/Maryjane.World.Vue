<script>
import { mapWritableState } from 'pinia';
import { useCounterStore } from './stores/counter';
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapWritableState(useCounterStore, ['isLogin'])
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = true
    }
  }
}
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
