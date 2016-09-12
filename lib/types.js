'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPTION_RX = /^([^\(]+)(\(([^\)]+)\))?$/;

/*
  Hash of type -> method that creates a validator
*/
var types = {
  string: function string() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var _ref = arguments[1];
    var _ref$isRequired = _ref.isRequired;
    var isRequired = _ref$isRequired === undefined ? false : _ref$isRequired;

    var validator = _joi2.default.string();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var opt = _step.value;

        var _OPTION_RX$exec = OPTION_RX.exec(opt);

        var _OPTION_RX$exec2 = _slicedToArray(_OPTION_RX$exec, 4);

        var name = _OPTION_RX$exec2[1];
        var arg = _OPTION_RX$exec2[3];

        if (arg) {
          validator = validator[name].call(validator, JSON.parse(arg));
        } else {
          validator = validator[name]();
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (isRequired) {
      validator = validator.required();
    }

    return validator;
  }
};

exports.default = types;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90eXBlcy5qcyJdLCJuYW1lcyI6WyJPUFRJT05fUlgiLCJ0eXBlcyIsInN0cmluZyIsIm9wdGlvbnMiLCJpc1JlcXVpcmVkIiwidmFsaWRhdG9yIiwib3B0IiwiZXhlYyIsIm5hbWUiLCJhcmciLCJjYWxsIiwiSlNPTiIsInBhcnNlIiwicmVxdWlyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLFlBQVksMkJBQWxCOztBQUVBOzs7QUFHQSxJQUFNQyxRQUFRO0FBQ1pDLFFBRFksb0JBQ2lDO0FBQUEsUUFBdENDLE9BQXNDLHlEQUE1QixFQUE0QjtBQUFBO0FBQUEsK0JBQXRCQyxVQUFzQjtBQUFBLFFBQXRCQSxVQUFzQixtQ0FBVCxLQUFTOztBQUMzQyxRQUFJQyxZQUFZLGNBQUlILE1BQUosRUFBaEI7O0FBRDJDO0FBQUE7QUFBQTs7QUFBQTtBQUczQywyQkFBZ0JDLE9BQWhCLDhIQUF5QjtBQUFBLFlBQWhCRyxHQUFnQjs7QUFBQSw4QkFDQ04sVUFBVU8sSUFBVixDQUFlRCxHQUFmLENBREQ7O0FBQUE7O0FBQUEsWUFDZEUsSUFEYztBQUFBLFlBQ05DLEdBRE07O0FBRXZCLFlBQUlBLEdBQUosRUFBUztBQUNQSixzQkFBWUEsVUFBVUcsSUFBVixFQUFnQkUsSUFBaEIsQ0FBcUJMLFNBQXJCLEVBQWdDTSxLQUFLQyxLQUFMLENBQVdILEdBQVgsQ0FBaEMsQ0FBWjtBQUNELFNBRkQsTUFFTztBQUNMSixzQkFBWUEsVUFBVUcsSUFBVixHQUFaO0FBQ0Q7QUFDRjtBQVYwQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVkzQyxRQUFJSixVQUFKLEVBQWdCO0FBQ2RDLGtCQUFZQSxVQUFVUSxRQUFWLEVBQVo7QUFDRDs7QUFFRCxXQUFPUixTQUFQO0FBQ0Q7QUFsQlcsQ0FBZDs7a0JBcUJlSixLIiwiZmlsZSI6InR5cGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGpvaSBmcm9tICdqb2knO1xuXG5jb25zdCBPUFRJT05fUlggPSAvXihbXlxcKF0rKShcXCgoW15cXCldKylcXCkpPyQvO1xuXG4vKlxuICBIYXNoIG9mIHR5cGUgLT4gbWV0aG9kIHRoYXQgY3JlYXRlcyBhIHZhbGlkYXRvclxuKi9cbmNvbnN0IHR5cGVzID0ge1xuICBzdHJpbmcob3B0aW9ucyA9IFtdLCB7IGlzUmVxdWlyZWQgPSBmYWxzZSB9KSB7XG4gICAgbGV0IHZhbGlkYXRvciA9IGpvaS5zdHJpbmcoKTtcblxuICAgIGZvciAobGV0IG9wdCBvZiBvcHRpb25zKSB7XG4gICAgICBjb25zdCBbLCBuYW1lLCAsIGFyZ10gPSBPUFRJT05fUlguZXhlYyhvcHQpO1xuICAgICAgaWYgKGFyZykge1xuICAgICAgICB2YWxpZGF0b3IgPSB2YWxpZGF0b3JbbmFtZV0uY2FsbCh2YWxpZGF0b3IsIEpTT04ucGFyc2UoYXJnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZGF0b3IgPSB2YWxpZGF0b3JbbmFtZV0oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgdmFsaWRhdG9yID0gdmFsaWRhdG9yLnJlcXVpcmVkKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvcjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB0eXBlcztcbiJdfQ==