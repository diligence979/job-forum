'use strict';
module.exports = {
  ERROR: {
    code: 0,
    msg: 'failed',
  },
  SUCCESS: {
    code: 1,
    msg: 'success',
  },
  unique(arr) {
    return arr.filter(function(item, index, arr) {
      return arr.indexOf(item) === index;
    });
  },
  toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
};
