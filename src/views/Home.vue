<template>
  <div class="home">
    <div class="home-header">
      <h1>{{ $t("LinShare collaborative document editor") }}</h1>
    </div>
    <v-btn color="info" large :href="linshareSharedSpaceUrl">{{ $t("Start editing document") }}</v-btn>
  </div>
</template>

<script>
import settings from "@/settings";

export default {
  name: "home",
  data: function() {
    const { LINSHARE_UI_USER_URL, LINSHARE_SHARED_SPACE_PATH } = settings;

    return {
      linshareSharedSpaceUrl: `${LINSHARE_UI_USER_URL}${LINSHARE_SHARED_SPACE_PATH}`
    };
  }
};
</script>

<style lang="stylus" scoped>
.home {
  width: 100%;
  height: 100%;
  background-image: url('../assets/img_home_linshare.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.home-header {
  margin: 10px;
  text-transform: uppercase;
  color: white;
  text-shadow: -3px 0px 13px rgba(0, 107, 156, 0.7);
  padding: 0 10px;
  text-align: center;
}
</style>
