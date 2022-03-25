<template>
  <div class="container-fluid bg-light">
    <div class="row mt-1">
      <div class="col-md-4"></div>
      <div class="col-md-4 mt-2 text-center"><Search /></div>
      <div class="col-md-4"></div>
      <div class="row mt-5 p-2 justify-content-center">
        <div
          v-for="b in searchBooks"
          :key="b.id"
          class="col-md-2 m-3 d-flex justify-content-center"
        >
          <BookCover :searchBook="b" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    return {
      searchBooks: computed(() => AppState.searchBooks)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.cover-size {
  height: 300px;
  width: 200px;
}
</style>
