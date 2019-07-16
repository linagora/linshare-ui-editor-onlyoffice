<template>
  <div class="language-menu">
    <v-menu bottom left offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <span :class="'flag-icon flag-icon-' + currentLanguage.key" />
        </v-btn>
      </template>
      <v-list>
        <v-list-tile v-for="(language, index) in languages" @click="onLanguageChange(language)" :key="index">
          <v-list-tile-title>
            <span :class="'flag-icon flag-icon-' + language.key" />
            <span class="language-name">{{ language.name }}</span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { SUPPORTED_LANGUAGES } from "@/i18n/constants";
import languageService from "@/services/language/";
import "flag-icon-css/css/flag-icon.min.css";

export default {
  name: "language-menu",
  data() {
    return {
      languages: SUPPORTED_LANGUAGES,
      currentLanguage: languageService.getCurrentLanguage()
    };
  },
  methods: {
    onLanguageChange(language) {
      languageService.setCurrentLanguage(language);
      this.currentLanguage = languageService.getCurrentLanguage();
    }
  }
};
</script>

<style src="flag-icon-css/css/flag-icon.min.css" scoped />

<style lang="stylus" scoped>
  .language-menu {
    padding-top: 3px;
  }

  .language-name {
    margin-left: 10px;
  }
</style>
