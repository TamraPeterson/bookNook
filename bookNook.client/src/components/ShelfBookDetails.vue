// Injects into the modal on the profile page 
<template>
  <div>
    <div class="row align-items-center">
      <div class="col-md-6">
        <h5>Written by: {{ activeBook.authors[0] }}</h5>

        <h6>{{ activeBook.pageCount }} pages</h6>
      </div>
      <div class="col-md-6">
        <img
          class="thumbnail img-fluid"
          :src="activeBook.imageLinks.thumbnail"
          alt=""
        />
      </div>

      <p v-html="activeBook.description"></p>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-4 d-flex">
        <button class="btn bg-blue mt-3 shadow">
          <h3>
            <i @click="removeFromShelf(activeBook.id)" class="mdi mdi-delete">
              <h6>Remove</h6></i
            >
          </h3>
        </button>
      </div>
      <div class="col-md-4 d-flex">
        <button class="btn bg-blue mt-3 shadow ms-5">
          <h3>
            <i class="mdi mdi-account-group"> <h6>NookClub</h6></i>
          </h3>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    return {
      myShelfBooks: computed(() => AppState.myShelfBooks),
      activeBook: computed(() => AppState.activeBook)


    }
  }
}
</script>


<style lang="scss" scoped>
</style>