<template>
  <div class="component">
    <div class="pages nook-shadow rounded"></div>
    <h1>Ye</h1>
  </div>
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
    searchClub: {
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
.cover-size:hover {
  transform: scale(1.04);
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
.cover-size:hover .pages {
  transform: scale(1.04);
  transition: 0.3s;
  background-color: blue;
}
</style>