<template>
  <div class="component d-flex flex-column align-items-center">
    <div class="pages nook-shadow rounded-1"></div>
    <div v-if="onMyShelf">
      <img
        src="../assets/img/BookNookBookMarks/BookMark1.png"
        class="book-mark"
      />
    </div>

    <img
      @click="getById(searchBook.bookId)"
      class="nook-shadow cover-size rounded-1 selectable"
      :src="
        searchBook.imageLinks?.thumbnail || '../assets/img/BookCoverTest2.jpg'
      "
      alt=""
    />
    <p class="text-center mt-2 rounded-1 frosted-bg">
      <small>{{ searchBook.title }}</small>
    </p>
  </div>

  <Modal v-if="activeBook.title" :id="'bookDetails-modal' + searchBook.bookId">
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
              '../assets/img/BookCoverTest2.jpg'
            "
            alt=""
          />
        </div>

        <p v-html="activeBook.description"></p>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-4 d-flex">
          <div>
            <button :disabled="onMyShelf" class="btn bg-blue mt-3 shadow">
              <h3>
                <i @click="addToShelf(searchBook.bookId)" class="mdi mdi-heart">
                  <h6>Add To Shelf</h6></i
                >
              </h3>
            </button>
          </div>
        </div>
        <div class="col-md-4 d-flex">
          <button
            @click="goToClubs(searchBook.bookId)"
            class="btn bg-blue mt-3 shadow ms-5"
          >
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
import { router } from '../router'
export default {
  props: {
    searchBook: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      activeBook: computed(() => AppState.activeBook),
      searchBooks: computed(() => AppState.searchBooks),
      myShelfBooks: computed(() => AppState.myShelfBooks),
      onMyShelf: computed(() => AppState.myShelfBooks.find(b => b.bookId === props.searchBook.bookId)),

      async addToShelf(id) {
        try {
          await booksService.addToShelf()
          Modal.getOrCreateInstance(document.getElementById("bookDetails-modal" + id)).hide();
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
            document.getElementById("bookDetails-modal" + id)
          ).show();
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, "error")
        }
      },

      async goToClubs(id) {
        try {
          router.push({ name: "Clubs", query: { activeBookId: props.searchBook.bookId } })
          Modal.getOrCreateInstance(document.getElementById("bookDetails-modal" + id)).hide();
        } catch (error) {
          logger.log(error)
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
  height: 302px;
  width: 200px;
  transform: translateX(1.7%);
  position: absolute;
  transition: 0.3s;
  background-color: #dbd9d4;
}
.book-mark {
  position: absolute;
  z-index: 1;
  transform: translateX(-280%) translateY(-10%);
}

.frosted-bg {
  background-color: #111927;
  background-color: rgba(17, 25, 39, 0.75);
  color: #e9ecef;
  font-weight: bold;
  // border: 2px solid #e9ecef;
  z-index: 2;
  width: 90%;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2px;
  padding-right: 2px;
  text-align: center;
}
</style>