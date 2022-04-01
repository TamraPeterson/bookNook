<template>
  <div class="container-fluid bg-image2 bg-light">
    <div class="col-6">
      <button class="btn bg-red m-3">
        <i
          v-if="account.id"
          data-bs-toggle="modal"
          data-bs-target="#club-modal"
          class="mdi mdi-pencil"
          >Create Club</i
        >
      </button>
    </div>
    <ClubSearch />

    <div class="justify-content-center">
      <div class="row">
        <div v-for="c in clubs" :key="c.id" class="col-6">
          <Club :club="c" />
        </div>
      </div>
    </div>
  </div>
  <Modal id="club-modal">
    <template #modal-title>
      <div class="row">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Club Name:</label
          >
          <input
            v-model="editable.name"
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name your new book club"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            Club description:</label
          >
          <textarea
            v-model="editable.description"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
      </div>
    </template>

    <template #modal-body>
      <form class="row d-flex flex-column bg-dark p-3">
        <button type="button" class="btn btn-info" @click="createClub">
          Submit
        </button>
      </form>
    </template>
  </Modal>
</template>

<script>
import { computed, reactive, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { clubsService } from '../services/ClubsService'
import { Modal } from 'bootstrap'
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
export default {
  name: 'ClubsPage',
  setup() {
    const route = useRoute()
    const editable = ref({})
    watchEffect(async () => {
      try {
        if (route.name == "Clubs") {
          await clubsService.getClubsByBookId(route.query)
        }
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })

    return {
      editable,
      async createClub() {
        try {
          editable.value.activeBookId = route.query.activeBookId
          await clubsService.createClub(editable.value)
          Modal.getOrCreateInstance(
            document.getElementById("club-modal")
          ).hide();
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },
      clubs: computed(() => AppState.clubs),
      searchClubs: computed(() => AppState.searchClubs),
      account: computed(() => AppState.account),
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.cover-size {
  height: 300px;
  width: 200px;
}
.texture1 {
  background-color: #ffffff;
  background-image: url("https://www.transparenttextures.com/patterns/french-stucco.png");
}
.bg-image2 {
  background-image: url("https://images.unsplash.com/photo-1588801143490-eed95059adfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGRhcmslMjBncmVlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60");
  background-position: 100%;
  min-height: 91vh;
}
</style>
