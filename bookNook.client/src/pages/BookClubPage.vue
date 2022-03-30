<template>
  <div class="container-fluid">
    <div class="row justify-content-around">
      <!-- banner -->
      <div
        class="
          col-md-10
          rounded
          shadow
          bg-micks-hat
          m-3
          banner
          d-flex
          justify-content-around
          align-items-center
        "
      >
        <h1 class="title-text text-light">
          The Lord of The Rings: The Fellowship of The Ring
        </h1>
      </div>
      <!-- Member Banner -->
      <div class="col-md-8 m-3 rounded shadow bg-pink banner d-flex">
        <h3>Club Members</h3>
      </div>
      <!-- Comment section -->
      <div class="col-md-6 rounded d-flex justify-content-around rounded">
        <!-- dark pink comment container  -->
        <div
          class="
            row
            container-fluid
            bg-pink
            shadow
            justify-content-around
            rounded
          "
        >
          <!-- light pink comment form -->
          <div
            class="
              col-md-8
              bg-light-pink
              d-flex
              justify-content-between
              rounded
            "
          >
            <img
              class="img-fluid comment-photo"
              src="data:image/jpeg;base64,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"
              alt=""
            />

            <button class="btn bg-blue shadow comment-button">Comment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.banner {
  height: 12vh;
}

.comment-photo {
  height: 75px;
  width: 75px;
  border-radius: 50%;
}
.comment-button {
  height: 40px;
}
</style>