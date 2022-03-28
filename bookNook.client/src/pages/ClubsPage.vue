<template>
  <div class="container-fluid bg-light">
    <div class="col-6">
      <i
        v-if="account.id"
        data-bs-toggle="modal"
        data-bs-target="#club-modal"
        class="mdi mdi-pencil selectable"
        >Create Club</i
      >
    </div>
  </div>

  <Modal id="club-modal">
    <template #modal-title>
      <h1>Create Club Form</h1>
    </template>

    <template #modal-body>
      <form class="row d-flex flex-column bg-dark p-3">
        <button type="button" class="btn btn-info" @click="update">
          Submit
        </button>
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
