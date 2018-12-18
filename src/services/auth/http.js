// This app has two baseUrls, one for Linshare baseUrl and
// one for it's backend baseUrl. The vue-auth driver supports
// only one instance of axios (Vue.axios). Because we need
// two instances of axios for each baseUrl, we need to write
// new driver.
// This driver provides interceptors for both baseUrls, requests
// sent to Linshare and backend will be sent along with token,
// only responses from Linshare will be watched to get the token.
// Request sent by vue-auth will be sent to Linshare url.

import driver from "@websanova/vue-auth/drivers/http/axios.1.x";

const _interceptor = function(req, res) {
  const _this = this;

  if (req) {
    this.options.Vue.axios.linshare.interceptors.request.use(
      function(request) {
        req.call(_this, request);
        return request;
      },
      function(error) {
        req.call(_this, error.request);
        return Promise.reject(error);
      }
    );

    this.options.Vue.axios.backend.interceptors.request.use(
      function(request) {
        req.call(_this, request);
        return request;
      },
      function(error) {
        req.call(_this, error.request);
        return Promise.reject(error);
      }
    );
  }

  if (res) {
    this.options.Vue.axios.linshare.interceptors.response.use(
      function(response) {
        res.call(_this, response);
        return response;
      },
      function(error) {
        if (error && error.response) {
          res.call(_this, error.response);
        }

        return Promise.reject(error);
      }
    );
  }
};

const _http = function(data) {
  const http = this.options.Vue.axios.linshare(data);

  http.then(data.success, data.error);

  return http;
};

export default { ...driver, _interceptor, _http };
