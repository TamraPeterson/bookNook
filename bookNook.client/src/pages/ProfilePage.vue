<template>
    <div class="container-fluid text-center">
        <div class="row justify-content-center bg-dark cover-img mb-3">
            <!-- <img :src="profile.coverImg" id="coverImg"> -->
            <div class="col-12 mb-0">
                <div class="mt-5">
                    <img :src="profile.picture" class="profile-img rounded-circle elevation-4"/>
                    <h5>
                        
                    <i
                            v-if="account.id == profile.id"
                            data-bs-toggle="modal"
                            data-bs-target="#profile-modal"
                            class="mdi mdi-pencil selectable"
                    >Edit Profile</i>
                    </h5>
                    <h1>{{ profile.name }}</h1>
                    <h1>{{ profile.email }}</h1>
                </div>
            </div>
        </div>

<Modal id="profile-modal">
    <template #modal-title>
        <h1>Edit Profile Form</h1>
    </template>

    <template #modal-body>
    <form class="row d-flex flex-column bg-dark p-3">
      
        <h5 class="p-1 pt-3">Username:</h5>
        <input v-model="editable.name" type="text">
      
        <h5 class="p-1 pt-3">Profile Photo:</h5>
        <input v-model="editable.picture" type="text">

      <button type="button" class="btn btn-info" @click="update">Submit</button>
    </form>
    </template>
  </Modal>

    </div>
</template>

<script>
import { computed, ref, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { profilesService } from '../services/ProfilesService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
export default {
    name: 'Profile',
    setup() {
        const route = useRoute()
        const editable = ref({})
        watchEffect(async () => {
            // editable.value = AppState.account
            try {
                if(route.name == "Profile") {
                    await profilesService.getProfile(route.params.id)
                    // await booksService.getAll({ creatorId: route.params.id})
                }
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, "error")
            }
        })
        return {
            editable,
            async update() {
                try {
                    await accountService.update(editable.value)
                } catch (error) {
                    logger.error(error);
                    Pop.toast(error.message, "error");
                }
            },
            profile: computed(() => AppState.profile),
            account: computed(() => AppState.account),
            coverImg: computed(() => `url('${AppState.profile.coverImg}')`),
        }
    }
}
</script>

<style lang="scss" scoped>
.profile-img {
    min-width: 5em;
    max-width: 7em;
}

.cover-img {
    width: 100vw;
    height: 30rem;
    background-image: v-bind(coverImg);
    object-fit: cover;
}
</style>