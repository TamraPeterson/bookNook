<template>
  <div><h2>Search for A book</h2></div>
  <form
    class="row form-group justify-content-between p-3 shadow"
    @submit.prevent="search"
  >
    <input
      type="text"
      v-model="searchTerm"
      class="col-9 rounded-2 bg-pink"
      placeholder="Search..."
    />
    <button class="btn col-3 bg-red rounded-2 text-dark shadow">
      <b> Search</b>
    </button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { booksService } from '../services/BooksService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const searchTerm = ref('')
    return {
      searchTerm,
      async search() {
        try {
          await booksService.searchBook(searchTerm.value)
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, "error")
        }
      }
    }
  }
}
</script>

<style>
</style>