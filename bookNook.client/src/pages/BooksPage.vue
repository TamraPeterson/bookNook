<template>
  <div class="container-fluid bg-image1">
    <div class="row all-stuff">
      <div class="col-md-3"></div>
      <div class="col-md-6 mt-2 text-center"><BookSearch /></div>
      <div class="col-md-3"></div>
    </div>
    <div class="row mt-5 p-2 justify-content-around">
      <div
        class="col-12 col-sm-5 col-md-2 m-3 d-flex justify-content-center"
        v-for="b in searchBooks"
        :key="b.id"
      >
        <BookCover :searchBook="b" />
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

.bg-image1 {
  background-image: url("../assets/img/BookSearchImgEdit.jpg");
  background-size: cover;
  background-position: bottom;
  background-attachment: fixed;
  min-height: 91vh;
  left: 0%;
  top: 0%;
}

.all-stuff {
  z-index: 1;
}
</style>
