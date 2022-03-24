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
                            data-bs-target="#edit-profile"
                            class="mdi mdi-pencil selectable"
                    >Edit Profile</i>
                    </h5>
                    <h1>{{ profile.name }}</h1>
                    <a href="//thiscatdoesnotexist.com/" target="_blank">
                        <h5>{{ profile.email }}</h5>
                    </a>
                    <a href="//thiscatdoesnotexist.com/" target="_blank">
                        <h5>{{ profile.github }}</h5>
                    </a>
                    <h5>
                        Class: {{ profile.class }}
                        <i v-if="profile.graduated == true" class="mdi mdi-school"></i>
                        <div v-else></div>
                    </h5>
                </div>
            </div>
            <div class="col-6">
                <h5>{{ profile.bio }}</h5>
            </div>
        </div>
        <div class="row justify-content-center">
            <div v-for="p in posts" :key="p.id" class="col-8">
                <Post :post="p" />
            </div>
        </div>
        <Modal id="edit-profile">
            <template #title> Edit Profile </template>
            <template #body> <ProfileForm /> </template>
        </Modal>
    </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { profilesService } from '../services/ProfilesService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
    name: 'Profile',
    setup() {
        const route = useRoute()
        watchEffect(async () => {
            try {
                if(route.name == "Profile") {
                    await profilesService.getProfile(route.params.id)
                    // await postsService.getAll({ creatorId: route.params.id})
                }
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, "error")
            }
        })
        return {
            profile: computed(() => AppState.profile),
            account: computed(() => AppState.account),
            coverImg: computed(() => `url('${AppState.profile.coverImg}')`)
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