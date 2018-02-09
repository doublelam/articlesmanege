module.exports = source => {
  return source.replace(/^.*(?=\{(.|\n)*\}$)/g, '');
}
