<template>
  <v-app id="linshare-editor">
    <div v-if="$auth.ready()">
      <v-content>
        <v-layout justify-center align-center>
          <router-view/>
        </v-layout>
      </v-content>
    </div>
    <div v-else>
      <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
    </div>
    <op-snackbar/>
  </v-app>
</template>

<script>
import UserMenu from "@/components/UserMenu.vue";
import Snackbar from "@/components/Snackbar.vue";

export default {
  components: {
    'op-user-menu': UserMenu,
    'op-snackbar': Snackbar
  }
};
</script>

<style lang="stylus">
  #header-logo
    height: 35px;
    width: 150px;
</style>
