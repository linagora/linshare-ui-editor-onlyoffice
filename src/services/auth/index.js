import jwt from "./jwt";

export default {
  auth: jwt,
  http: require("@websanova/vue-auth/drivers/http/axios.1.x"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x"),
  refreshData: {
    enabled: true,
    url: "linshare/webservice/rest/user/v2/authentication/jwt",
    method: "GET",
    interval: "4" // refresh auth token every 4 minutes to make up for 5 minutes life span of auth token
  },
  fetchData: {
    url: "linshare/webservice/rest/user/v2/authentication/authorized",
    method: "GET",
    enabled: true
  },
  parseUserData: data => data || {}
};
