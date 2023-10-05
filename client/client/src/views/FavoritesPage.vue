<script>
import Card from '../components/Card.vue'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
    Card
  },
  computed: {
    ...mapState(useCounterStore, ['favorites'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchFavorite'])
  },
  created() {
    this.fetchFavorite()
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
    <div class="col-sm-9 mb-3 d-flex">
      <div class="container mt-4">
        <div class="row gap-2 mb-4">
          <Card v-for="el in favorites" :key="el.id" :item="el" class="col-sm-4 mt-5" />
        </div>
      </div>
    </div>
  </div>
</template>
