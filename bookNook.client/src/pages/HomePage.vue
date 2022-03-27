<template>
<div class="hide-overflow">

  <div class="slideshow-container">
    <div class="">
      <img src="src/assets/img/Ladder.jpg" style="width: 100%" class="landing-img"/>
    </div>

    <div class="quote-text text-light rounded-2">
      <h1>"Fill your house with stacks of books,<br> in all the crannies and in all the nooks"</h1>
      <p>-Dr. Seuss</p>
    </div>
    <a
      data-bs-toggle="modal"
      data-bs-target="#login-modal"
      class="text-white btn bg-micks-hat rounded-pill fw-bold p-2 px-4 mt-2 button-center nook-shadow"
      >Start Your Next Adventure
    </a>
    
  </div>
</div>

<Modal id="login-modal" >
  <template #title> Modal Title </template>
  <template #body> <LoginModal /> </template>
  <template #footer> Modal Footer </template>
</Modal>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.hide-overflow{
  overflow: hidden;
  max-height: 88.4vh;
}

* {box-sizing:border-box}

.slideshow-container {
  min-height: 88.4vh;
  max-width: 100vw;
  position: relative;
}

.quote-text {
    background-color: #111927;
    background-color: rgba(17, 25, 39, 0.4);
    color: #e9ecef;
    font-weight: bold;
    border: 3px solid #e9ecef;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 50%;
    padding-top: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 1rem;
    text-align: center;
}

.button-center {
    font-weight: bold;
    position: absolute;
    top: 66%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 15%;
    padding: 2rem;
    text-align: center;
}

.landing-img {
  min-height: 10vh;
  max-height: 88vh;
  border-bottom: 0vh;
  min-width: 100vw;
  background-size: cover;
  object-fit: cover;
}

@media screen and (max-width: 1286px) {
  .quote-text {
    width: 65%;
  }
  .button-center {
    width: 25%;
    top: 70%;
  }
}
</style>
