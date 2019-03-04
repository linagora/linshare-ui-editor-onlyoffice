export { getErrorType };

function getErrorType(payload) {
  if (payload.details && payload.details.match(/Document extension is not supported/)) {
    return "extension";
  }

  return "unknown";
}
