<template>
    <div class="editor">
        <v-progress-circular indeterminate :size="50" color="primary" v-if="loading"></v-progress-circular>
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

    sio.on(WEBSOCKET_EVENTS.ERROR, () => {
      this.errorDialog = true;
      this.loading = false;
    });

    sio.on(WEBSOCKET_EVENTS.DOCUMENT_LOAD_DONE, payload => {
      this.loading = false;
      this.openDocument(payload);
    });
  }
};
</script>
<style lang="stylus" scoped>
    .editor
      width: 100vw;
      height: 100vh;
</style>
