<template>
  <div class="container-fluid text-center">
    <div class="row justify-content-center bg-blue cover-img mb-3">
      <!-- <img :src="profile.coverImg" id="coverImg"> -->
      <div class="col-12 mb-0">
        <div class="mt-5">
          <img
            :src="profile.picture"
            class="profile-img rounded-circle elevation-4"
          />
          <h5>
            <i
              v-if="account.id == profile.id"
              data-bs-toggle="modal"
              data-bs-target="#profile-modal"
              class="mdi mdi-pencil selectable"
              >Edit Profile</i
            >
          </h5>
          <h1>{{ profile.name }}</h1>
          <!-- <h1>{{ profile.email }}</h1> -->
        </div>
      </div>
      <div class="row mt-5 p-2 justify-content-center">
        <div
          v-for="b in myShelfBooks"
          :key="b.id"
          class="col-md-2 m-3 d-flex justify-content-center"
        >
          <MyShelfBook :myShelfBook="b" />
        </div>
      </div>
    </div>

    <Modal id="profile-modal">
      <template #modal-title>
        <h1>Edit Profile Form</h1>
      </template>

      <template #modal-body>
        <form class="row d-flex flex-column bg-dark p-3">
          <h5 class="p-1 pt-3">Username:</h5>
          <input v-model="editable.name" type="text" />

          <h5 class="p-1 pt-3">Profile Photo:</h5>
          <input v-model="editable.picture" type="text" />

          <button type="button" class="btn btn-info" @click="update">
            Submit
          </button>
        </form>
      </template>
    </Modal>
    <!-- TODO make component for modal -->
    <Modal v-if="activeBook.title" id="bookDetails-modal">
      <template #modal-title>
        <h3>{{ activeBook.title }}</h3>
        {{ activeBook.subtitle }}</template
      >

      <template #modal-body>
        <div class="row align-items-center">
          <div class="col-md-6">
            <h5>Written by: {{ activeBook.authors }}</h5>

            <h6>{{ activeBook.pageCount }} pages</h6>
          </div>
          <div class="col-md-6">
            <img
              class="thumbnail img-fluid"
              :src="activeBook.imageLinks.thumbnail"
              alt=""
            />
          </div>

          <p v-html="activeBook.description"></p>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4 d-flex">
            <button class="btn bg-blue mt-3 shadow">
              <h3>
                <i
                  @click="removeFromShelf(activeBook.id)"
                  class="mdi mdi-delete"
                >
                  <h6>Remove</h6></i
                >
              </h3>
            </button>
          </div>
          <div class="col-md-4 d-flex">
            <button class="btn bg-blue mt-3 shadow ms-5">
              <h3>
                <i class="mdi mdi-account-group"> <h6>NookClub</h6></i>
              </h3>
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { profilesService } from '../services/ProfilesService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { booksService } from "../services/BooksService"
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    const editable = ref({})
    onMounted(async () => {
      // editable.value = AppState.account
      try {
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id)
          await booksService.getAll(route.params.id)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      editable,
      async update() {
        try {
          await accountService.update(editable.value)
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async removeFromShelf(id) {
        try {
          await booksService.removeFromShelf(id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
      myShelfBooks: computed(() => AppState.myShelfBooks),
      coverImg: computed(() => `url('${AppState.profile.coverImg}')`),
      activeBook: computed(() => AppState.activeBook)
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-img {
  min-width: 5em;
  max-width: 7em;
}

.cover-img {
  width: 100vw;
  height: 30rem;
  background-image: v-bind(coverImg);
  object-fit: cover;
}
</style>