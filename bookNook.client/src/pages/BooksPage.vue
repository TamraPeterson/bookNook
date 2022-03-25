<template>
  <div class="row mt-3">
    <div class="col-md-4"></div>
    <div class="col-md-4 mt-5"><Search /></div>
    <div class="col-md-4"></div>
    <div class="row mx-4 mt-5">
      <div class="col-md-2 d-flex justify-content-center">
        <img
          class="shadow cover-size"
          src="https://th.bing.com/th/id/OIP.3XjuDuMzRZ94XPkpUC8sCgHaKn?w=204&h=293&c=7&r=0&o=5&pid=1.7"
          alt=""
        />
      </div>
      <div class="col-md-2 d-flex justify-content-center">
        <img
          class="shadow cover-size"
          src="https://th.bing.com/th/id/OIP.a6jL_5Mu2AtBmER4We2sRwHaKe?pid=ImgDet&rs=1"
          alt=""
        />
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
.cover-size {
  height: 300px;
  width: 200px;
}
</style>
