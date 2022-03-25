<template>
  <div class="home container-fluid flex-grow-1 d-flex flex-column text-light">
    <!-- STUB Search Bar -->
    <div class="row d-flex justify-content-between">
      <div class="col-4 bg-dark">
        <Search />
      </div>
    </div>
  </div>

  <Modal id="book-modal">
    <template #title> Add book to library </template>
    <!-- CreateProject cna be replaced with any other Create file -->
    <template #body> </template>
    <template #footer> Footer </template>
  </Modal>

  <!-- End of note -->
</template>

<script>
export default {
  name: 'Home',
  setup() {

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
</style>
