<template>
  <div class="container-fluid bg-image3">
    <!-- button for books -->
    <b
      title="View Club Books"
      class="
        projects-btn
        btn
        bg-club4
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
        bg-club4
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
          bg-club2
          m-3
          border
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
              v-if="!isMember"
              @click="createMembership()"
              class="btn bg-blue shadow rounded text-light"
            >
              Join this Club
            </button>
            <button
              v-else
              @click="deleteMembership()"
              class="btn bg-blue shadow rounded text-light"
            >
              Leave this club
            </button>
          </div>
        </div>
      </div>

      <!-- Member Banner -->
      <div
        class="
          col-md-9
          m-3
          p-3
          shadow
          bg-club3
          text-light
          border-top border-bottom
          banner
          d-flex
        "
      >
        <h5>Club Members</h5>
        <div v-for="m in memberships" :key="m.accountId">
          <img
            class="img-fluid comment-photo m-2"
            :src="m.picture"
            :title="m.name"
            alt=""
          />
        </div>
      </div>
      <!-- Comment section -->
      <div
        class="col-md-9 m-3 p-3 rounded d-flex justify-content-around rounded"
      >
        <!-- dark pink comment container  -->
        <div
          class="
            row
            container-fluid
            bg-club2
            justify-content-center
            rounded
            p-3
          "
        >
          <!--  comment form -->
          <div
            v-if="isMember"
            class="col-md-6 bg-club3 rounded px-4 py-2 m-3 shadow"
          >
            <div class="mb-3">
              <label
                for="exampleFormControlTextarea1"
                class="form-label"
              ></label>
              <textarea
                v-model="state.editable.body"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
              ></textarea>
            </div>

            <button
              class="btn bg-club shadow comment-button m-1"
              @click="createComment"
            >
              Comment
            </button>
          </div>
          <!-- iterate over comments -->
          <div
            class="row bg-club3 rounded border p-2 m-2"
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
import { membershipsService } from "../services/MembershipsService";

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
          await clubsService.getMemberships(route.params.id)
          await commentsService.getCommentsByBook(AppState.activeClub.clubBook.id)

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
      memberships: computed(() => AppState.memberships),
      state,
      isMember: computed(() => AppState.memberships.find((m) => m.id == AppState.account.id)),
      createComment() {
        let comment = {
          creatorId: AppState.account.id,
          body: state.editable.body,
          clubBookId: AppState.activeClub.clubBook.id
        }
        commentsService.newComment(comment)
      },
      async deleteComment(id) {
        if (await Pop.confirm('Are you sure?')) {
          logger.log('comment id', id)
          await commentsService.deleteComment(id)
        }

      },
      async createMembership() {
        let newMembership = {
          accountId: AppState.account.id,
          clubId: route.params.id

        };
        await membershipsService.createMembership(newMembership, route.params.id)
      },
      async deleteMembership() {
        try {
          await membershipsService.deleteMembership(AppState.account.id, route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
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
.bg-image3 {
  background-image: url("https://images.unsplash.com/photo-1525307932909-fd14b501d8d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-position: 100%;
  min-height: 91vh;
  background-size: cover;
  background-attachment: fixed;
}
</style> 