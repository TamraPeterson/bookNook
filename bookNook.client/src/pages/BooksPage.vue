<template>
  <div class="home container-fluid flex-grow-1 d-flex flex-column text-light">

    <!-- STUB Search Bar -->
    <div class="row d-flex justify-content-between">
      <div class="col-4 bg-dark">
        <Search />
      </div>

      <!-- NOTE Button to create new project -->
      <div class="col-1 bg-dark d-flex align-items-center">
        <i
          data-bs-toggle="modal"
          data-bs-target="#book-modal"
          class="mdi mdi-pencil selectable"
        >Create New Project</i>
      </div>
      <!-- End of note -->

    </div>

    <!-- STUB Project Buttons -->
    <!-- NOTE Sprint example -->
    <!-- <Project Button /> == <Sprint /> -->


    <!-- <div class="row px-5 mb-5 justify-content-center">
      <div v-for="p in projects" :key="p.id" class="col-md-8 mx-5">
        <ProjectButton :project="p" />
      </div>
    </div> -->

    <!-- STUB Create Project Modal -->
  </div>

    <!-- NOTE Create Project Modal -->
    <!-- ID can be changed out for "create-sprint", etc -->


    <Modal id="book-modal" >
      <template #title> Create New Project </template>
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
