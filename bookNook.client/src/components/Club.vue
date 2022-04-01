<template>
  <div class="selectable component" @click="goTo">
    <div class="bg-club rounded elevation-2 p-3 m-2">
      <div class="clubs">
        <div class="f-name">
          <br />
          {{ club.name }}
        </div>
        <div class="f-desc">
          <br />
          {{ club.description }}
        </div>
        <i
          @click="deleteClub"
          v-if="account.id == club.creatorId"
          class="mdi mdi-close selectable"
        ></i>
      </div>
    </div>
  </div>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=BIZ+UDMincho&family=Bebas+Neue&family=Playfair+Display&display=swap"
    rel="stylesheet"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=BIZ+UDMincho&family=Playfair+Display&display=swap"
    rel="stylesheet"
  />
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
.component:hover {
  transform: scale(1.04);
}
.f-desc {
  font-family: "BIZ UDMincho", serif;
}
.f-name {
  font-family: "Bebas Neue", cursive;
  font-size: larger;
}
</style>