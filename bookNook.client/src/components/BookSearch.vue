<template>
  <div><h2 class="text-light bold">Look for a Book</h2></div>
  <form
    class="row form-group justify-content-center p-3"
    @submit.prevent="search"
  >
    <input
      type="text"
      v-model="searchTerm"
      class="col-md-7 rounded-2 bg-light darken-10 search-shadow font-search"
      placeholder="Search..."
    />
    <button
      class="btn col-6 col-md-2 bg-red rounded-2 text-light search-shadow"
    >
      Search
    </button>
  </form>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap"
    rel="stylesheet"
  />
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

<style lang="scss" scoped>
.search-shadow {
  filter: drop-shadow(2px 2px 3px rgba(71, 63, 63, 0.6));
  transition: all 0.2s ease;
}

.search-shadow:hover {
  filter: drop-shadow(3px 3px 5px rgba(71, 63, 63, 0.6));
}

.font-search {
  font-family: "cutive";
  font-size: 25px;
  color: black;
}
.bold {
  font-size: 60px;
  text-shadow: 1px 1px 5px black;
}
</style>