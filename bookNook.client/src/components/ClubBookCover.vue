<template>
  <div class="component d-flex flex-column w-100 border-bottom">
    <span
      class="d-inline-block nook-shadow rounded-1 selectable text-start pages"
      tabindex="0" data-bs-toggle="popover"
      data-bs-trigger="hover"
      data-bs-html="true"
      :title="`<b>${searchBook.title}</b>`"
      :data-bs-content="`
        <div class='row px-2'>
          <div class='col-6'>
            <img class='row cover-size nook-shadow' src='${searchBook.imageLinks?.thumbnail || 'src/assets/img/BookCoverTest2.jpg'}'>
          </div>
          <div class='col-6'>
            <p class='row px-3'>Written by: ${searchBook.authors}</p>
          </div>
        </div>
      `"
      data-bs-placement="left"
      @click="addBookToClub(searchBook)">
        <span class="p-1 pt-2 clip-text" type="button">{{ searchBook.title }}</span>
    </span>
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


<style lang="scss">
.cover-size {
  height: 200px;
  width: 133px;
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