<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['doRegister']),

    registerHandler() {
      const dataRegister = {
        email: this.email,
        password: this.password
      }
      this.doRegister(dataRegister)
    },

    loginPage() {
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <section class="container-fluid">
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="row border rounded-5 p-3 bg-white shadow box-area">
        <div
          class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
          style="background: #eeeeee"
        >
          <div class="featured-image mb-3">
            <img src="@/assets/hitam.png" class="img-fluid" style="width: 180px" />
          </div>
        </div>
        <div class="col-md-6 right-box">
          <div class="row align-items-center">
            <div class="header-text mb-4 text-center">
              <h2>Hi there.</h2>
              <p>Here to register.</p>
            </div>
            <form id="register-form" @submit.prevent="registerHandler">
              <div class="input-group mb-3">
                <input
                  v-model="email"
                  type="email"
                  class="form-control form-control-lg bg-light fs-6"
                  placeholder="Email address"
                />
              </div>
              <div class="input-group mb-3">
                <input
                  v-model="password"
                  type="password"
                  class="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                />
              </div>
              <div class="input-group mb-3 mt-5">
                <button class="btn btn-lg btn-dark w-100 fs-6">Register</button>
              </div>
            </form>
            <div class="row">
              <small>Already have account? <a @click.prevent="loginPage" href="#">Log in</a></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
