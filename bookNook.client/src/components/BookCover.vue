<template>
  <div class="component">
    <div class="pages nook-shadow rounded-1"></div>
    <img
      @click="getById(searchBook.bookId)"
      class="nook-shadow cover-size rounded-1 selectable"
      :src="
        searchBook.imageLinks?.thumbnail || 'src/assets/img/BookCoverTest2.jpg'
      "
      alt=""
    />
    <p class="text-center mt-2">
      <small>{{ searchBook.title }}</small>
    </p>
  </div>
  <Modal v-if="activeBook.title" id="bookDetails-modal">
    <template #modal-title>
      <h3>{{ activeBook.title }}</h3>
      {{ activeBook.subtitle }}</template
    >

    <template #modal-body>
      <div class="row align-items-center">
        <div class="col-md-6">
          <h5>Written by: {{ activeBook.authors[0] }}</h5>
          <h6>Published by: {{ activeBook.publisher }}</h6>
          <h6>{{ activeBook.pageCount }} pages</h6>
        </div>
        <div class="col-md-6">
          <img
            class="thumbnail img-fluid"
            :src="
              activeBook.imageLinks?.smallThumbnail ||
              'src/assets/img/BookCoverTest2.jpg'
            "
            alt=""
          />
        </div>

        <p v-html="activeBook.description"></p>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-4 d-flex">
          <button class="btn bg-blue mt-3 shadow">
            <h3>
              <i @click="addToShelf()" class="mdi mdi-heart">
                <h6>add to shelf</h6></i
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
    </template>
  </Modal>
</template>


<script>
import { computed } from '@vue/reactivity'
import { booksService } from '../services/BooksService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { Modal } from 'bootstrap'
export default {
  props: {
    searchBook: {
      type: Object,
      required: true
    }

  },
  setup() {
    return {
      activeBook: computed(() => AppState.activeBook),

      async addToShelf() {
        try {
          await booksService.addToShelf()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async getById(id) {
        try {
          logger.log('the shelf book id', id)
          await booksService.getBookById(id)
          Modal.getOrCreateInstance(
            document.getElementById("bookDetails-modal")
          ).show();
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, "error")
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-size {
  height: 300px;
  width: 200px;
  transition: 0.3s;
}
.component:hover {
  transform: scale(1.04);
}
.component {
  transition: 0.3s;
}
.thumbnail {
  height: 300px;
  width: 200px;
  object-fit: cover;
}
.pages {
  transform: translateX(1.7%);
  position: absolute;
  height: 302px;
  width: 200px;
  transition: 0.3s;
  background-color: #dbd9d4;
}
// .component:hover .pages {
//   transform: scale(1.04);
//   transition: 0.3s;
//   background-color: blue;
// }
</style>