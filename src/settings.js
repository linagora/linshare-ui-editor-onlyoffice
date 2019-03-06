const defaults = {
  LINSHARE_URL: process.env.VUE_APP_LINSHARE_URL || "http://172.17.0.1:30000",
  DOCUMENT_SERVER_URL: process.env.VUE_APP_DOCUMENT_SERVER_URL || "http://172.17.0.1:80",
  BACKEND_URL: process.env.VUE_APP_BACKEND_URL || "http://172.17.0.1:8081",
  LINSHARE_UI_USER_URL: process.env.VUE_APP_LINSHARE_UI_USER_URL || "http://172.17.0.1:30000"
};

const settings = { ...defaults, ...window.linshareEditor };

// In production mode, all requests to Linshare will
// sent to the server where this app is hosted
if (process.env.NODE_ENV === "production") {
  settings.LINSHARE_URL = window.location.origin;
}

export default settings;
