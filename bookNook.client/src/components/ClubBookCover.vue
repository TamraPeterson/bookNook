<template>
  <div class="component d-flex flex-column align-items-center">
    <div class="pages nook-shadow rounded-1"></div>
    <h5 
        class="nook-shadow rounded-1 selectable text-start mb-4">
        {{ searchBook.title }}
    </h5>
  </div>
<!-- @click="getById(searchBook.bookId)" -->
</template>


<script>
import { computed } from '@vue/reactivity'
import { booksService } from '../services/BooksService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { Modal } from 'bootstrap'
import { router } from '../router'
import { createPopper } from '@popperjs/core'
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

      async addToShelf() {
        try {
          await booksService.addToShelf()
          Modal.getOrCreateInstance(document.getElementById("bookDetails-modal")).hide();
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
      },
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
</style>