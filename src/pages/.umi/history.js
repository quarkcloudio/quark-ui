// create history
const history = require('history/createHashHistory').default({
  basename: '/admin/',
});
window.g_history = history;
export default history;
