<script>
import Card from '../components/Card.vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
    Card
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchData']),

    changePagination(value) {
      this.pagination = this.pagination + value
      this.fetchData()
    }
  },
  computed: {
    ...mapState(useCounterStore, ['movies', 'favorites']),
    ...mapWritableState(useCounterStore, ['pagination', 'search'])
  },
  created() {
    this.fetchData()
  }
}
</script>

<template>
  <div class="container mt-4 text-center shadow">
    <div class="row">
      <div class="col-sm-8 mt-3 d-flex">
        <img
          src="@/assets/background-movie.png"
          alt="mrjn"
          style="width: 100%; height: 100%; object-fit: cover"
          class="d-block m-auto"
        />
      </div>
      <div class="col-sm-4 mt-3 d-flex">
        <div class="text-center d-block m-auto">
          <div class="container">
            <h2 class="fw-bold">Welcome to da club</h2>
            <h6>the best or nothing.</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 mt-5">
          <form role="search" @submit.prevent="fetchData">
            <input
              v-model="search"
              class="form-control me-2"
              type="search"
              placeholder="search here."
              aria-label="Search"
            />
            <div class="d-grid mt-3 col-4 mx-auto">
              <button class="btn btn-outline-dark btn-sm" type="submit">Search</button>
            </div>
          </form>
        </div>

        <div class="col-sm-9 mb-3 d-flex">
          <div class="row">
            <Card v-for="el in movies" :key="el.id" :item="el" class="col-sm-4 mt-5" />
          </div>
        </div>
        <div class="page">
          <nav aria-label="Page navigation example" class="page">
            <ul class="pagination">
              <li class="page-item">
                <a
                  @click.prevent="changePagination(-1)"
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item">
                <a
                  @click.prevent="changePagination(1)"
                  class="page-link"
                  href="#"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.page {
  display: flex;
  justify-content: center;
}
</style>
