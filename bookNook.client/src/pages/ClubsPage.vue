<template>
  <div class="container-fluid bg-light">
    <div class="row mt-1">
      <div class="col-md-4"></div>
      <div class="col-md-4 mt-2 text-center"><ClubSearch /></div>
      <div class="col-md-4"></div>
      <div class="row mt-5 p-2 justify-content-center">
        <div
          v-for="c in searchClubs"
          :key="c.id"
          class="col-md-2 m-3 d-flex justify-content-center"
        >
          <ClubButton :searchClub="c" />
        </div>
      </div>
    </div>
    <div class="col-6">
      <i
        v-if="account.id"
        data-bs-toggle="modal"
        data-bs-target="#club-modal"
        class="mdi mdi-pencil selectable"
      >Create Club</i>
    </div>
  </div>


  <Modal id="club-modal">
    <template #modal-title>
        <h1>Create Club Form</h1>
    </template>

    <template #modal-body>
    <form class="row d-flex flex-column bg-dark p-3">
      
        <!-- <h5 class="p-1 pt-3">Name:</h5>
        <input v-model="editable.name" type="text"> -->

      <button type="button" class="btn btn-info" @click="update">Submit</button>
    </form>
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  name: 'ClubsPage',
  setup() {
    return {
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
</style>
