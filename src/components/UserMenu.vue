<template>
  <v-menu bottom left offset-y>
    <v-avatar class="avatar" size="36px" slot="activator" color="white">
      <span class="text-avatar">{{getAvatarText}}</span>
    </v-avatar>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title class="display-name">{{getDisplayName}}</v-list-tile-title>
          <v-list-tile-sub-title>{{getEmail}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
      <v-list-tile @click.prevent="logout">
        <v-list-tile-content>
          <v-list-tile-title>Log out</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "op-user-menu",
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push({ name: "login" });
    },

    profile() {},

    settings() {}
  },
  computed: {
    getDisplayName: function() {
      const user = this.$auth.user();

      return `${user.firstName} ${user.lastName}`;
    },
    getEmail: function() {
      return this.$auth.user().mail;
    },
    getAvatarText: function() {
      return this.$auth.user().firstName[0].toUpperCase();
    }
  }
};
</script>

<style lang="stylus" scoped>
  .display-name {
    font-weight: 500;
  }
  .avatar
    box-shadow: 0 1px 2px rgba(0,0,0,.16), 0 2px 1px rgba(0,0,0,.12);
    span
      color: #0070a3;
      font-weight: 500;
</style>
