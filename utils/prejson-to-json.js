const {
  getOptions,
  stringifyRequest,
  urlToRequest
} = require('loader-utils');

module.exports = function (source, map) {
  console.log('source', source);
  this.callback(null, source, map);
  return source;
};
