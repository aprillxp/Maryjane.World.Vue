<script>
import Card from '../components/Card.vue'
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  methods: {
    ...mapActions(useCounterStore, ['fetchDataById'])
  },
  computed: {
    ...mapState(useCounterStore, ['detail'])
  },
  components: {
    Card
  },
  created() {
    this.fetchDataById(this.$route.params.id)
    console.log(this.$route.params.id);
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
      <div class="col-sm-4 mt-3 d-flex justify-content-center align-items-center">
        <div class="text-center">
          <img :src="detail.image" alt="mj" style="width: 300px" />
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-8 mb-3">
          <div class="container mt-4">
            <div class="p-2 text-start">
              <h2 class="fw-bolder">{{ detail.title }}</h2>
              <h4 class="fw-bold">★ {{ detail.rating }}</h4>
              <br />
              <h5 class="fw-bolder">Avg vote</h5>
              <p>{{ detail.count }}</p>
              <br />
              <h5 class="fw-bolder">Release date</h5>
              <p>{{ detail.date }}</p>
              <br />
              <h5 class="fw-bolder">Overview</h5>
              <p>{{ detail.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
