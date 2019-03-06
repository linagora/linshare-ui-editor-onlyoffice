import settings from "../settings";

const { LINSHARE_URL, BACKEND_URL } = settings;

export default () => ({
  linshareBaseUrl: LINSHARE_URL,
  backendBaseUrl: BACKEND_URL
});
