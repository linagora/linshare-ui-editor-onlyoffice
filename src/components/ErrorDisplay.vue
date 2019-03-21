<template>
  <div class="error-display" v-if="errorType">
    <h1>{{$t("Oops!")}}</h1>
    <span v-if="errorType === 'extension'">{{$t("Document file format is not supported")}}</span>
    <span v-if="errorType === 'connect'">{{$t("Something went wrong on our side. Please try again later.")}}</span>
    <span v-else>{{$t("Unable to process the document")}}</span>
    <div class="actions">
      <v-btn v-if="errorType === 'extension'" depressed color="primary" v-bind:href="linshareUrl">{{$t("Back to LinShare")}}</v-btn>
      <v-btn v-else depressed color="primary" @click="refresh()">{{$t("Refresh")}}</v-btn>
    </div>
  </div>
</template>

<script>
import settings from "@/settings";

export default {
  name: "error-display",
  props: ["errorType"],
  data: function() {
    return {
      linshareUrl: `${settings.LINSHARE_UI_USER_URL}#/sharedspace/workgroups/${this.$route.params.workGroupId}`
    };
  },
  methods: {
    refresh: function() {
      this.$router.go();
    }
  }
};
</script>

<style lang="stylus" scoped>
  .error-display
    text-align: center;

    .actions
      margin-top: 20px;
</style>
