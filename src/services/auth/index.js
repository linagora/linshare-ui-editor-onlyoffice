import jwt from "./jwt";
import http from "./http";

export default {
  auth: jwt,
  http,
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x"),
  refreshData: {
    enabled: true,
    url: "linshare/webservice/rest/user/v2/authentication/jwt",
    method: "GET"
  },
  fetchData: {
    url: "linshare/webservice/rest/user/v2/authentication/authorized",
    method: "GET",
    enabled: true
  },
  parseUserData: data => data || {}
};
