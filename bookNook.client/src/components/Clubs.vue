<template>
  <div class="bg-parchment rounded shadow p-3 m-4">
    <div class="clubs">
      <div class="row">
        <div class="col-4 text-truncate">
          Club Name: <br />
          {{ club.name }}
        </div>
        <div class="col-4 text-truncate">
          Description: <br />
          {{ club.description }}
        </div>
        <div class="col-4 d-flex justify-content-between">
          <button class="btn btn-primary" @click="goTo">View Club</button>
          <i
            @click="deleteClub"
            v-if="account.id == club.creatorId"
            class="mdi mdi-close"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { router } from "../router"
import { clubsService } from "../services/ClubsService"
export default {
  props: {
    club: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {

      async deleteClub() {
        await clubsService.deleteClub(props.club)
      },

      goTo() {
        router.push({ name: 'BookClubPage', params: { id: props.club.id } })
      },
      account: computed(() => AppState.account),
      activeBook: computed(() => AppState.activeBook),

    }
  }
}
</script>


<style lang="scss" scoped>
</style>