<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-blue px-3">
    <!-- LOGO -->
    <div class="col-4"></div>
    <div class="col-4 d-flex justify-content-center">
      <img src="../assets/img/BigLogo.png" class="m-0 img-height" />
    </div>
    <div class="col-4"></div>
    <!-- Login in button -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <!-- LOGIN COMPONENT HERE -->
      <!-- <Login /> -->
    </div>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.img-height {
  height: 10vh;
}
</style>
