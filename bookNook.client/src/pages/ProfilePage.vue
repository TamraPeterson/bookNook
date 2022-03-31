<template>
  <div class="container-fluid text-center">
    <div class="row justify-content-center bg-blue cover-img mb-3 nook-shadow">
      <div class="col-12 mb-0">
        <div :class="`mt-5 backdrop
          ${profile.color == 'White' ? 'profile-white text-dark' : ''}
          ${profile.color == 'Blue' ? 'profile-blue text-light' : ''}
          ${profile.color == 'Red' ? 'profile-red text-light' : ''}
          ${profile.color == 'Pink' ? 'profile-pink text-dark' : ''}
        `">
          
          <img
            :src="profile.picture"
            class="profile-img rounded-circle elevation-4"
          />
          <h1>{{ profile.name }}</h1>
          <p>{{ profile.email }}</p>
          <h6>
            <i
              v-if="account.id == profile.id"
              data-bs-toggle="modal"
              data-bs-target="#profile-modal"
              class="mdi mdi-pencil selectable"
              >Edit Profile</i>
          </h6>

        </div>
      </div>
      <div class="row mt-5 p-2 justify-content-center">
        <div
          class="col-12 col-sm-5 col-md-2 m-3 d-flex justify-content-center"
          v-for="b in myShelfBooks"
          :key="b.id"
        >
          <MyShelfBook :myShelfBook="b" />
        </div>
      </div>
    </div>

    <Modal id="profile-modal">
      <template #modal-title>
        <h5>Edit Profile Form</h5>
      </template>

      <template #modal-body>
        <form class="row d-flex flex-column bg-micks-other-hat p-3">
          <h5 class="p-1 pt-3">Username:</h5>
          <input v-model="editable.name" type="text" maxlength="25" placeholder="Name..."/>

          <h5 class="p-1 pt-3">Profile Photo:</h5>
          <input v-model="editable.picture" type="text" placeholder="Url..."/>

          <h5 class="p-1 pt-3">Background Photo:</h5>
          <input v-model="editable.coverImg" type="text" placeholder="Url..." />

          <h5 class="p-1 pt-3">Backdrop Color:</h5>
          <select class="mb-2 py-1" v-model="editable.color" name="color" id="list-color">
            <option>White</option>
            <option>Blue</option>
            <option>Red</option>
            <option>Pink</option>
          </select>

          <button type="button" class="btn bg-micks-hat mt-4" @click="update">
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

      <template #modal-body><ShelfBookDetails /> </template>
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
import { Modal } from "bootstrap"
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    const editable = ref({})
    watchEffect(async () => {
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
          Modal.getOrCreateInstance(document.getElementById("profile-modal")).hide();
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
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
  height: 5rem;
  width: 5rem;
  object-fit: cover;
}

.cover-img {
  width: 100vw;
  height: 34rem;
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
}

.backdrop {
  // background-color: rgba(33, 61, 68, 0.8);
  color: #e9ecef;
  font-weight: bold;
  border: 3px solid #e9ecef;
  top: 50%;
  left: 50%;
  transform: translate(50%);
  z-index: 2;
  width: 50%;
  padding-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 1rem;
  text-align: center;
}

.profile-white {
  background-color: rgba(250, 248, 244, 0.8);
}
.profile-blue {
  background-color: rgba(33, 61, 68, 0.8);
}
.profile-red {
  background-color: rgba(146, 47, 47, 0.8);
}
.profile-pink {
  background-color: rgba(248, 221, 221, 0.8);
}
</style>