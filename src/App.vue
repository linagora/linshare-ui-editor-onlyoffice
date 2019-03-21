<template>
  <v-app id="linshare-editor">
    <v-toolbar clipped-left app fixed color="primary" height="54">
      <v-toolbar-title>
        <a v-bind:href="linshareUrl">
          <img src="@/assets/linshare-logo-white.png" alt="LinShare logo"/>
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
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
import settings from "@/settings";

export default {
  data: function() {
    return {
      linshareUrl: settings.LINSHARE_UI_USER_URL
    };
  },
  components: {
    "op-user-menu": UserMenu,
    "op-snackbar": Snackbar
  }
};
</script>
