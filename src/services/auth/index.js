import jwt from "./jwt";

export default {
  auth: jwt,
  http: require("@websanova/vue-auth/drivers/http/axios.1.x"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x"),
  refreshData: {
    enabled: true,
    url: 'linshare/webservice/rest/user/v2/authentication/jwt',
    method: "GET"
  },
  fetchData: {
    url: "linshare/webservice/rest/user/v2/authentication/authorized",
    method: "GET",
    enabled: true
  }
};
