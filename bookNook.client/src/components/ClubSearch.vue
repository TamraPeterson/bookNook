<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <form
        class="row form-group justify-content-between p-3"
        @submit.prevent="search"
      >
        <input
          type="text"
          v-model="searchTerm"
          class="col-9 rounded-2 bg-pink shadow"
          placeholder="Search Clubs..."
        />
        <button class="btn col-3 bg-red rounded-2 text-light shadow">
          Search
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { clubsService } from '../services/ClubsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const searchTerm = ref('')
    return {
      searchTerm,
      async search() {
        try {
          logger.log(searchTerm.value, 'is dis it?')
          await clubsService.searchClub(searchTerm.value)
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