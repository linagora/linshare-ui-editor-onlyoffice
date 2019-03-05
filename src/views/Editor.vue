<template>
  <div class="editor">
    <div id="placeholder"></div>

    <div class="loading-spinner" v-if="state === 'loading'">
      <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
      <v-card-text class="loading-text">{{$t("Loading ...")}}</v-card-text>
    </div>

    <error-display v-if="state === 'error'" :error-type="errorType"></error-display>
  </div>
</template>

<script>
import io from "socket.io-client";
import ErrorDisplay from "@/components/ErrorDisplay.vue";
import { WEBSOCKET_EVENTS, WEBSOCKET_URL } from "@/constants";
import { getErrorType } from "@/services/utils";

export default {
  name: "editor",
  components: {
    "error-display": ErrorDisplay
  },
  data: function() {
    return {
      state: "loading"
    };
  },
  methods: {
    openDocument: function(payload) {
      payload.editorConfig.lang = this.$i18n.locale || "en";
      DocsAPI.DocEditor("placeholder", payload);
    },
    refresh: function() {
      this.$router.go();
    }
  },
  async mounted() {
    const userEmail = this.$auth.user().mail;
    const { workGroupId, documentId } = this.$route.params;
    const sio = io(WEBSOCKET_URL, {
      query: `token=${this.$auth.token()}&userEmail=${userEmail}`
    });

    sio.on(WEBSOCKET_EVENTS.CONNECT, () =>
      sio.emit(WEBSOCKET_EVENTS.SUBSCRIBE, {
        workGroupId,
        documentId
      })
    );

    sio.on(WEBSOCKET_EVENTS.ERROR, error => {
      this.loading = true;

      try {
        error = JSON.parse(error);
      } catch (error) {} // eslint-disable-line

      if (error.code === 401) {
        this.$auth.logout({
          redirect: "/login"
        });
      } else {
        this.state = "error";
      }
    });

    sio.on(WEBSOCKET_EVENTS.DOCUMENT_LOAD_DONE, payload => {
      this.state = "loaded";
      this.openDocument(payload);
    });

    sio.on(WEBSOCKET_EVENTS.DOCUMENT_LOAD_FAILED, payload => {
      this.state = "error";
      this.errorType = getErrorType(payload);
    });
  }
};
</script>
<style lang="stylus" scoped>
  .editor
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .loading-spinner
      display: flex;
      align-items: center;

      .loading-text
        font-weight: bold;
</style>
