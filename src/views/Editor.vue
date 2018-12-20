<template>
    <div class="editor">
        <div v-if="loading">
          <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
          <v-card-text class="loading-text">Loading ...</v-card-text>
        </div>

        <div id="placeholder"></div>
        <v-dialog v-model="errorDialog" persistent max-width="290">
          <v-card>
            <v-card-text>Error while opening document. Please refresh page.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="onRefreshBtnClick()">Refresh</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </div>
</template>

<script>
import io from "socket.io-client";
import { WEBSOCKET_EVENTS, WEBSOCKET_URL } from "../constants";

export default {
  name: "editor",
  data: function() {
    return {
      loading: true,
      errorDialog: false
    };
  },
  methods: {
    openDocument: function(payload) {
      DocsAPI.DocEditor("placeholder", payload);
    },
    onRefreshBtnClick: function() {
      this.$router.go();
    }
  },
  async mounted() {
    const userEmail = this.$auth.user().mail;
    const { workGroupId: workGroupId, documentId } = this.$route.params;
    const sio = io(WEBSOCKET_URL, {
      query: `token=${this.$auth.token()}&userEmail=${userEmail}`
    });

    sio.on(WEBSOCKET_EVENTS.CONNECT, () =>
      sio.emit(WEBSOCKET_EVENTS.SUBSCRIBE, {
        workGroupId,
        documentId,
        documentStorageServerUrl: process.env.VUE_APP_BACKEND_URL
      })
    );

    sio.on(WEBSOCKET_EVENTS.ERROR, error => {
      this.loading = false;

      try {
        error = JSON.parse(error);
      } catch (error) {} // eslint-disable-line

      if (error.code === 401) {
        this.$auth.logout({
          redirect: "/login"
        });
      } else {
        this.errorDialog = true;
      }
    });

    sio.on(WEBSOCKET_EVENTS.DOCUMENT_LOAD_DONE, payload => {
      this.loading = false;
      this.openDocument(payload);
    });

    sio.on(WEBSOCKET_EVENTS.DOCUMENT_LOAD_FAILED, () => {
      this.loading = false;
      this.errorDialog = true;
    });
  }
};
</script>
<style lang="stylus" scoped>
    .editor
      width: 100vw;
      height: 100vh;
      text-align:center;

      .v-progress-circular
        margin-top: 45vh !important; //override default css
      .loading-text
        font-weight: bold;
</style>
