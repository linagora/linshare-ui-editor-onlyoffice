<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary">
              <v-toolbar-title class="white--text">{{$t('Login')}}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="login" v-model="valid" ref="form">
                <v-text-field
                  prepend-icon="person"
                  name="login"
                  :label="$t('Login')"
                  type="email"
                  v-model="email"
                  :rules="[v => !!v || $t('E-mail is required')]"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  :label="$t('Password')"
                  id="password"
                  type="password"
                  v-model="password"
                  :rules="[v => !!v || $t('Password is required')]"
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    type="submit"
                    :disabled="logMeIn || !valid"
                    :loading="logMeIn"
                    @click="login"
                  >{{$t('Login')}}</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      logMeIn: false,
      email: null,
      password: null,
      valid: true
    };
  },
  methods: {
    login: async function() {
      this.logMeIn = true;
      try {
        const redirect = this.$auth.redirect();
        const response = await this.$auth.login({
          url: "linshare/webservice/rest/user/v2/authentication/jwt",
          method: "GET",
          auth: {
            username: this.email,
            password: this.password
          },
          headers: {
            "WWW-No-Authenticate": "linshare"
          },
          rememberMe: false,
          redirect: { path: redirect ? redirect.from.path : "/" }
        });

        this.$store.dispatch("session/setJWTToken", response.data.token);
      } catch (e) {
        this.$store.dispatch("ui/displaySnackbar", {
          message: "Login error, please retry"
        });
      } finally {
        this.logMeIn = false;
      }
    }
  }
};
</script>
