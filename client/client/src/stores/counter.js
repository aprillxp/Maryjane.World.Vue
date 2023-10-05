import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    // BASE_URL: 'https://maryjane.gavril.my.id', // for production
    BASE_URL: 'http://localhost:3000', // for local or testing
    isLogin: false,
    movies: [],
    pagination: 1,
    favorites: [],
    detail: {},
    search: '',
    isSubscribed: '',
    user: '',
    customer: []
  }),
  getters: {
    //
  },
  actions: {
    //
    async doRegister(dataRegister) {
      try {
        const { data } = await axios({
          url: this.BASE_URL + '/register',
          method: 'post',
          data: {
            email: dataRegister.email,
            password: dataRegister.password
          }
        })

        this.router.push('/login')
      } catch (error) {
        const { message } = error.response.data
        Swal.fire({
          icon: 'error',
          title: `Poor kid!`,
          text: `${message}`,
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false
        })
      }
    },

    async doLogin(dataLogin) {
      try {
        const { data } = await axios({
          url: this.BASE_URL + '/login',
          method: 'post',
          data: {
            email: dataLogin.email,
            password: dataLogin.password
          }
        })

        localStorage.access_token = data.access_token

        this.router.push('/')

        this.isLogin = true

        Swal.fire({
          icon: 'success',
          title: 'Cool!',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        })
      } catch (error) {
        console.log(error.response.data.message)
      }
    },

    async fetchData() {
      try {
        const { data } = await axios({
          url: this.BASE_URL + '/movies',
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          },
          params: {
            search: this.search,
            page: this.pagination
          }
        })

        this.movies = data
      } catch (error) {
        const { message } = error.response.data
        Swal.fire({
          icon: 'error',
          title: `Poor kid!`,
          text: `${message}`,
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false
        })
      }
    },

    async fetchDataById(id) {
      try {
        const { data } = await axios({
          url: this.BASE_URL + `/movies/${id}`,
          method: 'get'
        })

        this.detail = data

        console.log(data)
      } catch (error) {
        const { message } = error.response.data
        Swal.fire({
          icon: 'error',
          title: `Poor kid!`,
          text: `${message}`,
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false
        })
      }
    },

    async favoriteHandler(id) {
      try {
        const { data } = await axios({
          url: this.BASE_URL + `/favorites/${id}`,
          method: 'post',
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.favorites = data

        Swal.fire({
          icon: 'success',
          title: 'Cool!',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        })
      } catch (error) {
        const { message } = error.response.data
        Swal.fire({
          icon: 'error',
          title: `Poor kid!`,
          text: `${message}`,
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false
        })
      }
    },

    async fetchFavorite() {
      try {
        const { data } = await axios({
          url: this.BASE_URL + '/favorites',
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.favorites = data
      } catch (error) {
        const { message } = error.response.data
        Swal.fire({
          icon: 'error',
          title: `Poor kid!`,
          text: `${message}`,
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false
        })
      }
    },

    async changeStatusPayment(id) {
      try {
        const { data } = await axios({
          url: this.BASE_URL + `/subscription`,
          method: 'patch',
          headers: {
            access_token: localStorage.access_token
          }
        })

      } catch (error) {
        const { message } = error.response.data
        Swal.fire({
          icon: 'error',
          title: `Poor kid!`,
          text: `${message}`,
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false
        })
      }
    },

    async subscribe(id) {
      console.log('subs')
      try {
        const { data } = await axios({
          url: this.BASE_URL + '/midtrans-token',
          method: 'post',
          headers: {
            access_token: localStorage.access_token
          }
        })

        console.log(data)

        const cb = this.favoriteHandler(id)

        window.snap.pay(data.token, {
          onSuccess: function (result) {
            cb()
          }
        })
      } catch (error) {
        const { message } = error.response.data
        Swal.fire({
          icon: 'error',
          title: `Poor kid!`,
          text: `${message}`,
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false
        })
      }
    },

    async doGoogleLoginHandler(response) {
      console.log(response);
      try {
        const { data } = await axios({
          url: this.BASE_URL + '/google-login',
          method: 'post',
          headers: {
            credential: response.credential
          }
        })
        
        Swal.fire({
          icon: 'success',
          title: 'Cool!',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false
        })
        localStorage.access_token = data.access_token

        localStorage.customer = data.email

        this.customer = data.email

        this.router.push('/')

        this.isLogin = true
      } catch (error) {
        const { message } = error.response.data
        Swal.fire({
          icon: 'error',
          title: `Poor kid!`,
          text: `${message}`,
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false
        })
      }
    },

    changePage(path) {
      this.router.push(path)
    }
  }
})
