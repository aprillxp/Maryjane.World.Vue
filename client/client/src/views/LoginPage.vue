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
    ...mapActions(useCounterStore, ['doLogin', 'doGoogleLoginHandler']),

    loginHandler() {
      const dataLogin = {
        email: this.email,
        password: this.password
      }
      this.doLogin(dataLogin)
    },

    registerPage() {
      this.$router.push('/register')
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
          style="background: #000000"
        >
          <div class="featured-image mb-3">
            <img src="@/assets/putih.png" class="img-fluid" style="width: 180px" />
          </div>
        </div>

        <div class="col-md-6 right-box">
          <div class="row align-items-center">
            <div class="header-text mb-4 text-center">
              <h2>Welcome home.</h2>
              <p>We are happy to have you back.</p>
            </div>
            <form id="login-form" @submit.prevent="loginHandler">
              <div class="input-group mb-3">
                <input
                  v-model="email"
                  type="text"
                  class="form-control form-control-lg bg-light fs-6"
                  placeholder="Email address"
                />
              </div>
              <div class="input-group mb-1">
                <input
                  v-model="password"
                  type="password"
                  class="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                />
              </div>
              <div class="input-group mb-3 mt-5">
                <button class="btn btn-lg btn-dark w-100 fs-6">Login</button>
              </div>

              <div class="text-center">
                <GoogleLogin class="m-5" :callback="doGoogleLoginHandler" prompt />
              </div>

            </form>
            <div class="row">
              <small
                >Don't have account? <a @click.prevent="registerPage" href="#">Sign Up</a></small
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
