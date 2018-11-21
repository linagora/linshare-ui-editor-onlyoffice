<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary">
              <v-toolbar-title class="white--text">OpenPaaS Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="email"></v-text-field>
                <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="logMeIn"
                :loading="logMeIn"
                @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      logMeIn: false,
      email: null,
      password: null,
    };
  },
  methods: {
    login: async function() {
      this.logMeIn = true;
      try {
        const response = await this.$auth.login({
          url: 'linshare/webservice/rest/user/v2/authentication/jwt',
          method: 'GET',
          auth: {
            username: this.email,
            password: this.password
          },
          rememberMe: false,
          redirect: { name: 'home' }
        });

        this.$store.dispatch('session/setJWTToken', response.data.token);
      } catch(e) {
        this.$store.dispatch('ui/displaySnackbar', { message: 'Login error, please retry' });
      } finally {
        this.logMeIn = false
      }
    }
  }
};
</script>
