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
          <button class="btn bg-micks-other-hat shadow" @click="goTo">
            View Club
          </button>
          <i
            @click="deleteClub"
            v-if="account.id == club.creatorId"
            class="mdi mdi-close selectable"
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
import { watchEffect } from "@vue/runtime-core"
export default {
  props: {
    club: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    watchEffect(async () => {

    })
    return {
      async deleteClub() {
        await clubsService.deleteClub(props.club.id)
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