<template>
  <form class="row d-flex flex-column bg-dark p-3">
      
        <h5 class="p-1 pt-3">Username:</h5>
        <input v-model="editable.name" type="text">
      
        <h5 class="p-1 pt-3">Class:</h5>
        <input v-model="editable.class" type="text">

        <h5 class="p-1 pt-3">Email:</h5>
        <input v-model="editable.email" type="text">

        <h5 class="p-1 pt-3">Github:</h5>
        <input v-model="editable.github" type="text">
      
        <h5 class="p-1 pt-3">Profile Photo:</h5>
        <input v-model="editable.picture" type="text">
      
        <h5 class="p-1 pt-3">Background Image:</h5>
        <input v-model="editable.coverImg" type="text">

        <h5 class="p-1 pt-3">Bio:</h5>
        <input v-model="editable.bio" type="text" maxlength="220">
        <!-- NOTE not sure why this isn't working.... -->
        <h5 class="p-1 pt-3">Graduated?:</h5>
        <input v-model="editable.graduated" :checked="editable.graduated" type="checkbox" id="graduated" name="graduated">
      <button type="button" class="btn btn-info" @click="update">Submit</button>
  </form>
</template>

<script>
import { ref, watchEffect } from '@vue/runtime-core';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService';
import Pop from '../utils/Pop';
export default {
    setup() {
        const editable = ref({});
        watchEffect(() => {
            editable.value = AppState.account
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
            }
        }
    }
}
</script>

<style>

</style>