<template>
  <div class="component d-flex flex-column align-items-center">
    <div class="pages nook-shadow rounded-1"></div>
    <h5
      @click="addBookToClub(searchBook)"
      class="nook-shadow rounded-1 selectable text-start mb-4"
    >
      {{ searchBook.title }}
    </h5>
  </div>
  <!-- @click="getById(searchBook.bookId)" -->

<div>
  
</div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { booksService } from '../services/BooksService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { Modal, Popover } from 'bootstrap'
import { createPopper } from '@popperjs/core'
import { clubBooksService } from '../services/ClubBooksService'
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
export default {
  props: {
    searchBook: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new Popover(popoverTriggerEl)
    })
    onMounted(() => {
      logger.log('popoverList', popoverList)
      popoverList
    })
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
      async addBookToClub(searchBook) {
        try {
          let date = await Pop.getDate('When do you want to start reading this book?')
          if (date) {
            searchBook.clubId = route.params.id
            searchBook.startDate = date
            await clubBooksService.addBookToClub(searchBook, route.params.id)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }

      }
    }
  },
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