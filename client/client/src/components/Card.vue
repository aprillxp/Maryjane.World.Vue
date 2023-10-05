<script>
import { mapActions, mapStores } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  props: ['item'],
  methods: {
    ...mapActions(useCounterStore, ['fetchDataById', 'favoriteHandler', 'subscribe']),

    detailPage(id) {
      this.fetchDataById(id)
      this.$router.push(`/detail/${id}`)
    },

    subscribeHandler() {
      this.subscribe(this.item.id)
      console.log(this.item.id, 'this item');
    }
  },
  created() {
    // this.fetchDataById()
    console.log(this.item, 'ini created')
  }
}
</script>

<template>
  <div class="card shadow rounded-3 mx-auto" style="width: 13rem">
    <img :src="item.image" class="card-img-top" alt="..." style="object-fit: cover" />
    <div class="card-body">
      <h6 class="card-title fw-bold" style="color: black">{{ item.title }}</h6>
      <div class="d-flex justify-content-center">
        <a @click.prevent="detailPage(item.imdbId)" class="btn btn-white btn-sm">See Detail</a>
        <a @click.prevent="subscribeHandler" class="btn btn-white btn-sm" style="margin-left: 5px"
          ><span class="material-symbols-outlined"> bookmark </span></a
        >
      </div>
    </div>
  </div>
</template>
