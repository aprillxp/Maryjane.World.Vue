<script>
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    ...mapWritableState(useCounterStore, ['isLogin'])
  },
  methods: {
    favoritePage() {
      this.$router.push('/favorites')
    },
    doLogout() {
      localStorage.clear()
      this.$router.push('/login')
      this.isLogin = false
    },

    homePage() {
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-white shadow">
    <div class="container">
      <a @click.prevent="homePage" class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
        <img src="@/assets/mj-2.png" width="180" alt="Maryjane"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a @click.prevent="favoritePage" class="nav-link" href="#" style="color: black"
              >My Favorites</a
            >
          </li>
          <li class="nav-item">
            <a @click.prevent="doLogout" class="nav-link" href="#" style="color: black">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
