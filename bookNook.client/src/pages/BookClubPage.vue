<template>
  <div class="container-fluid">
    <b
      title="View Books"
      class="
        projects-btn
        btn btn-primary
        text-white
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvas"
    >
      <i class="mdi mdi-book"></i>
    </b>
    <b
      title="Join Club"
      class="
        join-btn
        btn btn-primary
        text-white
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
    >
      <i class="mdi mdi-plus"></i>
    </b>
    <div class="row justify-content-around">
      <!-- banner -->
      <div
        class="
          col-md-9
          rounded
          shadow
          bg-micks-hat
          m-3
          banner
          text-center
          justify-content-around
          align-items-center
          pt-3
          text-light
        "
      >
        <h1 class="title-text text-light">
          {{ activeClub.name }}
        </h1>
        <h5>{{ activeClub.description }}</h5>
      </div>
      <!-- Member Banner -->
      <div class="col-md-8 m-3 rounded shadow bg-pink banner d-flex p-3">
        <h5>Club Members</h5>
        <img
          class="img-fluid comment-photo m-2"
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt=""
        />
        <img
          class="img-fluid comment-photo m-2"
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt=""
        />
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
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt=""
            />

            <button class="btn bg-blue shadow comment-button">Comment</button>
          </div>
        </div>
      </div>
    </div>
    <OffCanvas>
      <template #offcanvas-header></template>
      <template #offcanvas-body></template>
    </OffCanvas>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { clubsService } from "../services/ClubsService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { useRoute } from "vue-router"
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        if (route.name == "BookClubPage") {
          await clubsService.getClubById(route.params.id)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })

    return {
      activeClub: computed(() => AppState.activeClub),

    }
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
.projects-btn {
  font-size: 20px;
  height: 60px;
  width: 60px;
  z-index: 100;
  position: fixed;
  top: 12vh;
  left: 5vh;
}
.join-btn {
  font-size: 20px;
  height: 60px;
  width: 60px;
  z-index: 100;
  position: fixed;
  top: 12vh;
  right: 5vh;
}
</style> 764321``