export default (actionName) => ({
  LOADING: `${actionName}_LOADING`,
  SUCCESS: `${actionName}_SUCCESS`,
  FAIL: `${actionName}_FAIL`,
  toString() {
    return actionName;
  }
});
