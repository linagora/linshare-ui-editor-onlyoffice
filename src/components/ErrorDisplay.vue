<template>
  <div class="error-display" v-if="errorType">
    <h1>{{$t("Oops!")}}</h1>
    <span v-if="errorType === 'extension'">{{$t("Document file format is not supported")}}</span>
    <span v-else-if="errorType === 'connect'">{{$t("Something went wrong on our side. Please try again later.")}}</span>
    <span v-else-if="errorType === 'document:not-found'">{{$t("Document not found")}}</span>
    <span v-else-if="errorType === 'user:forbidden'">{{$t("You do not have required permission to edit the document")}}</span>
    <span v-else-if="errorType === 'user:not-member'">{{$t("You are not a member of the target shared space")}}</span>
    <span v-else>{{$t("Unable to process the document")}}</span>
    <div class="actions">
      <v-btn v-if="action === 'backToLinShare'" depressed color="primary" v-bind:href="linshareUrl">
        {{$t("Back to LinShare")}}
      </v-btn>
      <v-btn v-if="action === 'refresh'" depressed color="primary" @click="refresh()">
        {{$t("Refresh")}}
      </v-btn>
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
  },
  created: function() {
    const actionFor = {
      connect: "refresh",
      extension: "backToLinShare",
      "document:not-found": "backToLinShare",
      "user:forbidden": "backToLinShare",
      "user:not-member": "backToLinShare"
    };

    this.action = actionFor[this.errorType];
  }
};
</script>

<style lang="stylus" scoped>
  .error-display
    text-align: center;

    .actions
      margin-top: 20px;
</style>
