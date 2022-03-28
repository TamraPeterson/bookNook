<template>
  <div class="component">
    <div class="pages nook-shadow rounded"></div>
    <img
      @click="getById(myShelfBook.bookId)"
      class="nook-shadow cover-size rounded selectable"
      :src="
        myShelfBook.imageLinks?.thumbnail || 'src/assets/img/BookCoverTest2.jpg'
      "
      alt=""
    />
    <p class="text-center mt-2 text-blue">
      <small>{{ myShelfBook.title }}</small>
    </p>
  </div>
  <Modal v-if="activeBook.title" id="bookDetails-modal">
    <template #modal-title>
      <h3>{{}}</h3>
      {{
    }}</template>

    <template #modal-body>
      <div class="row align-items-center">
        <div class="col-md-6">
          <h5>Written by: {{}}</h5>

          <h6>{{}} pages</h6>
        </div>
        <div class="col-md-6">
          <img
            class="thumbnail img-fluid"
            src="
             
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
    myShelfBook: {
      type: Object,
      required: true
    }

  },
  setup() {
    return {
      activeBook: computed(() => AppState.activeBook),
      myShelfBooks: computed(() => AppState.myShelfBooks),

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
  transform: translateX(2%);
  position: absolute;
  height: 300px;
  width: 200px;
  transition: 0.3s;
  background-color: red;
  transition: 0.3s;
}
// .component:hover .pages {
//   transform: scale(1.04);
//   transition: 0.3s;
//   background-color: blue;
// }
</style>