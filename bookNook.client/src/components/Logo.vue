<template>
  <span class="navbar-text pt-0 pb-2">
    <div class="dropdown my-2 my-lg-0">
      <div class="dropdown-toggle selectable" data-bs-toggle="dropdown" aria-expanded="false" id="bDropdown">
        <div>
            <span class="mx-3 lighten-30">
                <img src="src/assets/img/BLogo.png" class="img-height" />
            </span>
        </div>
      </div>

<!-- Dropdown Buttons -->
      <div class="dropdown-menu p-0 list-group w-100" aria-labelledby="bDropdown">
        <router-link :to="{ name: 'Books' }">
          <div class="list-group-item list-group-item-action hoverable">
            <i class="mdi mdi-book"></i>
            Books
          </div>
        </router-link>

        <router-link :to="{ name: 'Clubs' }">
          <div class="list-group-item list-group-item-action hoverable">
            <i class="mdi mdi-account-group"></i>
            Clubs
          </div>
        </router-link>

        <router-link :to="{ name: 'Profile', params: { id: account.id } }">
          <div class="list-group-item list-group-item-action hoverable">
            <i class="mdi mdi-owl"></i>
            My Profile
          </div>
        </router-link>

        <div class="list-group-item list-group-item-action hoverable text-danger" @click="logout">
          <i class="mdi mdi-logout"></i>
          Logout
        </div>

      </div>
    </div>
  </span>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { AuthService } from '../services/AuthService';
    export default {
      setup() {
        return {
          account: computed(() => AppState.account),
          async logout() {
            AuthService.logout({ returnTo: window.location.origin });
          },
        }
      }
    };
</script>


<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
.img-height {
  height: 8vh;
}
</style>
