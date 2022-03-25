<template>
  <header>
    <LandingNavbar v-if="route.name == 'Home'" />
    <Navbar v-else />
  </header>
  <main class="p-0 container-fluid">
    <router-view />
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import { useRoute } from 'vue-router'
import { logger } from './utils/Logger'
export default {
  name: 'App',
  setup() {
    const route = useRoute()
    onMounted(() => {
      logger.log('App stuff', route.params)
    })
    return {
      route,
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
