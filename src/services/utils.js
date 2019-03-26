export { getErrorType };

function getErrorType(payload) {
  if (payload.details && payload.details.match(/Document extension is not supported/)) {
    return "extension";
  }

  if (payload.code === 404 && payload.details && payload.details.match(/Document not found/)) {
    return "document:not-found";
  }

  if (payload.code === 404 && payload.details && payload.details.match(/Unable to find user in target workgroup/)) {
    return "user:not-member";
  }

  if (payload.code === 403) {
    return "user:forbidden";
  }

  return "unknown";
}
