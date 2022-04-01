<template>
  <div class="container-fluid">
    <!-- button for books -->
    <b
      title="View Club Books"
      class="
        projects-btn
        btn
        bg-micks-other-hat
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
    <!-- button for search books -->
    <b
      title="Add Book"
      class="
        join-btn
        btn
        bg-micks-other-hat
        text-white
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
    >
      <i class="mdi mdi-plus"></i>
    </b>

    <div class="row justify-content-around">
      <!-- banner -->
      <div
        class="
          p-4
          flex-grow
          col-md-9
          rounded
          shadow
          bg-micks-hat
          m-3
          justify-content-around
          align-items-center
          pt-3
          text-light
        "
      >
        <div class="row">
          <div class="col-md-6 p-3">
            <h1 class="title-text text-center text-light">
              {{ activeClub.name }}
            </h1>
            <h5>{{ activeClub.description }}</h5>
          </div>

          <div class="col-md-6 mt-4 text-center" v-if="activeClub.activeBookId">
            <h4>Book we're reading:</h4>

            <h3>{{ activeClub.clubBook.title }}</h3>
            <h6>
              Start Date:
              {{ new Date(activeClub.clubBook.startDate).toLocaleDateString() }}
            </h6>
          </div>
        </div>
        <div class="row mt-3 justify-content-center">
          <div class="col-md-8">
            <button
              @click="joinClub()"
              class="btn bg-blue shadow rounded text-light"
            >
              Join this Club
            </button>
          </div>
        </div>
      </div>

      <!-- Member Banner -->
      <div
        class="col-md-9 m-3 p-3 rounded shadow bg-micks-other-hat banner d-flex"
      >
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
      <div
        class="col-md-9 m-3 p-3 rounded d-flex justify-content-around rounded"
      >
        <!-- dark pink comment container  -->
        <div
          class="row container-fluid bg-blue justify-content-center rounded p-3"
        >
          <!--  comment form -->
          <div class="col-md-6 bg-micks-other-hat rounded px-4 py-2 m-3 shadow">
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Comment:</label
              >
              <textarea
                v-model="state.editable.body"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>

            <button
              class="btn bg-blue shadow comment-button m-1"
              @click="createComment"
            >
              Comment
            </button>
          </div>
          <!-- iterate over comments -->
          <div
            class="row bg-micks-other-hat rounded p-2 m-2"
            v-for="c in comments"
            :key="c.id"
          >
            <div class="col-md-2">
              <img
                class="comment-photo m-2"
                :src="c.creator.picture"
                title=""
                alt=""
              />
            </div>

            <div class="col-md-9 p-3">{{ c.body }}</div>
            <div class="col-1">
              <h3>
                <i
                  class="mdi mdi-alpha-x-circle-outline p-4 selectable"
                  @click="deleteComment(c.id)"
                ></i>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OffCanvas>
      <template #offcanvas-header></template>
      <template #offcanvas-body></template>
    </OffCanvas>
  </div>
  <RightOffCanvas />
</template>


<script>
import { computed, onMounted, reactive, watchEffect } from "@vue/runtime-core";
import { clubsService } from "../services/ClubsService";
import { commentsService } from "../services/CommentsService";

import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { useRoute } from "vue-router"
import { clubBooksService } from '../services/ClubBooksService';

export default {
  setup() {
    const route = useRoute();
    const state = reactive({
      editable: {},
    })
    watchEffect(async () => {
      try {
        if (route.name == "BookClubPage") {
          await clubsService.getClubById(route.params.id)
          logger.log(AppState.activeClub, 'active club')
          // if (AppState.activeClub.clubBook) {
          await commentsService.getCommentsByBook(AppState.activeClub.clubBook.id)
          // }

        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })

    return {
      activeClub: computed(() => AppState.activeClub),
      activeBook: computed(() => AppState.activeBook.data?.clubBook),
      comments: computed(() => AppState.comments),
      clubBooks: computed(() => AppState.clubBooks),
      state,
      createComment() {
        let comment = {
          creatorId: AppState.account.id,
          body: state.editable.body,
          clubBookId: AppState.activeClub.clubBook.id
        }
        commentsService.newComment(comment)
      },
      async deleteComment(id) {
        logger.log('comment id', id)
        await commentsService.deleteComment(id)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
// .banner {
//   height: 12vh;
// }

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
</style> 