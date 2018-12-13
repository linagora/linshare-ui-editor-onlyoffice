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
  import { DOCUMENT_LOAD_STATES, WEBSOCKET_EVENTS, WEBSOCKET_URL } from '../constants';
import { log } from 'util';

  export default {
    name: "editor",
    data: function() {
      return {
        loading: true,
        errorDialog: false
      }
    },
    methods: {
      openDocument: function (document) {
        const user = this.$auth.user();

        DocsAPI.DocEditor("placeholder", {
          document: {
            fileType: document.fileType,
            title: document.name,
            url: `${process.env.VUE_APP_BACKEND_URL}${document.downloadUrlPath}`
          },
          documentType: document.documentType,
          editorConfig: {
            user: {
              id: user.uuid,
              name: `${user.firstName} ${user.lastName}`
            },
            callbackUrl: `${process.env.VUE_APP_BACKEND_URL}${document.callbackUrlPath}`
          }
        });
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

      sio.on(WEBSOCKET_EVENTS.CONNECT, () => sio.emit(WEBSOCKET_EVENTS.SUBSCRIBE, { workGroupId, documentId }));

      sio.on(WEBSOCKET_EVENTS.ERROR, (error) => {
        this.errorDialog = true;
      });

      sio.on(WEBSOCKET_EVENTS.DOCUMENT_LOAD_DONE, ({ document }) => {
        this.loading = false;
        this.openDocument(document);
      });
    }
  };
</script>
<style lang="stylus" scoped>
    .editor
      width: 100vw;
      height: 100vh;
</style>
