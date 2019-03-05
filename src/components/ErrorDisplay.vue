<template>
  <div class="error-display" v-if="errorType">
    <h1>{{$t("Error!")}}</h1>
    <span v-if="errorType === 'extension'">{{$t("Document file format is not supported")}}</span>
    <span v-else>{{$t("Unable to process the document")}}</span>
    <div class="actions">
      <v-btn v-if="errorType === 'extension'" depressed color="primary" v-bind:href="linshareUrl">{{$t("Back to LinShare")}}</v-btn>
      <v-btn v-else depressed color="primary" @click="refresh()">{{$t("Refresh")}}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "error-display",
  props: ["errorType"],
  data: function() {
    return {
      linshareUrl: `${process.env.VUE_APP_LINSHARE_UI_USER_URL}#/sharedspace/workgroups/${
        this.$route.params.workGroupId
      }`
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
