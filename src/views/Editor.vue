<template>
    <div class="editor">
        <v-progress-circular indeterminate :size="50" color="primary" v-if="loading"></v-progress-circular>
        <div id="placeholder"></div>
    </div>
</template>

<script>
  import io from "socket.io-client";
  import { DOCUMENT_LOAD_STATES, WEBSOCKET_EVENTS, WEBSOCKET_URL } from '../constants';

  export default {
    name: "editor",
    data: function() {
      return {
        loading: false
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
      }
    },
    async mounted() {
      const { workGroupId: workGroupId, documentId } = this.$route.params;
      const sio = io(WEBSOCKET_URL);

      sio.on(WEBSOCKET_EVENTS.CONNECT, () => sio.emit(WEBSOCKET_EVENTS.SUBSCRIBE, documentId));

      const { data } = await this.axios.backend({
        method: 'GET',
        url: `api/documents?workGroupUuid=${workGroupId}&documentUuid=${documentId}`
      });

      if (data.state === DOCUMENT_LOAD_STATES.LOADING) {
        this.loading = true;
        sio.on(WEBSOCKET_EVENTS.DOCUMENT_LOAD_DONE, ({ document }) => {
          this.loading = false;
          this.openDocument(document);
        });
      } else if (data.state === DOCUMENT_LOAD_STATES.LOADED) {
        this.loading = false;
        this.openDocument(data)
      }
    }
  };
</script>
<style lang="stylus" scoped>
    .editor
      width: 100vw;
      height: 100vh;
</style>
