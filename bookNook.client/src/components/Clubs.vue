<template>
  <div class="clubs">
    <div class="col-4">{{ club.name }}</div>
    <div class="col-4">{{ club.description }}</div>
    <div class="col-4">
      <button class="btn btn-primary" @click="goTo">Join</button>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  props: {
    club: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      activeBook: computed(() => AppState.activeBook),

    }
  }
}
</script>


<style lang="scss" scoped>
</style>