<template>
  <div class="off-canvas">
    <div
      class="offcanvas offcanvas-start bg-light-parchment"
      tabindex="-1"
      id="offcanvas"
      aria-labelledby="offcanvasLabel"
    >
      <div class="offcanvas-header">
        <h3 class="offcanvas-title border-bottom" id="offcanvasLabel">
          Club Books
        </h3>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div v-for="b in clubBooks" :key="b.id">
          <h5 class="p-2 m-2 d-flex justify-content-start selectable">
            {{ b.title }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { router } from "../router"
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { clubBooksService } from '../services/ClubBooksService'

export default {

  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await clubBooksService.getClubsBooks(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      clubBooks: computed(() => AppState.clubBooks)


    }
  }
}
</script>


<style lang="scss" scoped>
</style>