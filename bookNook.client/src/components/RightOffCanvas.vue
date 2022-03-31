<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">SEARCH BOOKS</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">

  <div class="container-fluid">
    <div class="row mt-1">
      <div class="col-12 mt-1 text-center"><OffCanvasSearch /></div>
    </div>
    <div class="row mb-1 p-2 justify-content-around">
        <div class="col-12 d-flex justify-content-start" v-for="b in searchBooks" :key="b.id">
          <ClubBookCover :searchBook="b" />
      </div>
    </div>
  </div>


    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {

  setup() {
    return {
      searchBooks: computed(() => AppState.searchBooks)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>