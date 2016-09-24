'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPTION_RX = /^([^\(]+)(\(([^\)]+)\))?$/;

function createJoiType(typeName) {
  return function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var _ref = arguments[1];
    var _ref$isRequired = _ref.isRequired;
    var isRequired = _ref$isRequired === undefined ? false : _ref$isRequired;

    var validator = _joi2.default[typeName]();

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
          if (/^\/.*\/$/.test(arg)) {
            arg = new RegExp(arg.slice(1, -1));
          } else {
            arg = JSON.parse(arg);
          }
          validator = validator[name].call(validator, arg);
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
  };
}

/*
  Hash of type -> method that creates a validator
*/
var types = {
  string: createJoiType('string'),
  number: createJoiType('number')
};

exports.default = types;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90eXBlcy5qcyJdLCJuYW1lcyI6WyJPUFRJT05fUlgiLCJjcmVhdGVKb2lUeXBlIiwidHlwZU5hbWUiLCJvcHRpb25zIiwiaXNSZXF1aXJlZCIsInZhbGlkYXRvciIsIm9wdCIsImV4ZWMiLCJuYW1lIiwiYXJnIiwidGVzdCIsIlJlZ0V4cCIsInNsaWNlIiwiSlNPTiIsInBhcnNlIiwiY2FsbCIsInJlcXVpcmVkIiwidHlwZXMiLCJzdHJpbmciLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLFlBQVksMkJBQWxCOztBQUVBLFNBQVNDLGFBQVQsQ0FBdUJDLFFBQXZCLEVBQWlDO0FBQy9CLFNBQU8sWUFBK0M7QUFBQSxRQUF0Q0MsT0FBc0MseURBQTVCLEVBQTRCO0FBQUE7QUFBQSwrQkFBdEJDLFVBQXNCO0FBQUEsUUFBdEJBLFVBQXNCLG1DQUFULEtBQVM7O0FBQ3BELFFBQUlDLFlBQVksY0FBSUgsUUFBSixHQUFoQjs7QUFEb0Q7QUFBQTtBQUFBOztBQUFBO0FBR3BELDJCQUFnQkMsT0FBaEIsOEhBQXlCO0FBQUEsWUFBaEJHLEdBQWdCOztBQUFBLDhCQUNETixVQUFVTyxJQUFWLENBQWVELEdBQWYsQ0FEQzs7QUFBQTs7QUFBQSxZQUNoQkUsSUFEZ0I7QUFBQSxZQUNSQyxHQURROztBQUV2QixZQUFJQSxHQUFKLEVBQVM7QUFDUCxjQUFJLFdBQVdDLElBQVgsQ0FBZ0JELEdBQWhCLENBQUosRUFBMEI7QUFDeEJBLGtCQUFNLElBQUlFLE1BQUosQ0FBV0YsSUFBSUcsS0FBSixDQUFVLENBQVYsRUFBYSxDQUFDLENBQWQsQ0FBWCxDQUFOO0FBQ0QsV0FGRCxNQUVPO0FBQ0xILGtCQUFNSSxLQUFLQyxLQUFMLENBQVdMLEdBQVgsQ0FBTjtBQUNEO0FBQ0RKLHNCQUFZQSxVQUFVRyxJQUFWLEVBQWdCTyxJQUFoQixDQUFxQlYsU0FBckIsRUFBZ0NJLEdBQWhDLENBQVo7QUFDRCxTQVBELE1BT087QUFDTEosc0JBQVlBLFVBQVVHLElBQVYsR0FBWjtBQUNEO0FBQ0Y7QUFmbUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFpQnBELFFBQUlKLFVBQUosRUFBZ0I7QUFDZEMsa0JBQVlBLFVBQVVXLFFBQVYsRUFBWjtBQUNEOztBQUVELFdBQU9YLFNBQVA7QUFDRCxHQXRCRDtBQXVCRDs7QUFFRDs7O0FBR0EsSUFBTVksUUFBUTtBQUNaQyxVQUFRakIsY0FBYyxRQUFkLENBREk7QUFFWmtCLFVBQVFsQixjQUFjLFFBQWQ7QUFGSSxDQUFkOztrQkFLZWdCLEsiLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgam9pIGZyb20gJ2pvaSc7XG5cbmNvbnN0IE9QVElPTl9SWCA9IC9eKFteXFwoXSspKFxcKChbXlxcKV0rKVxcKSk/JC87XG5cbmZ1bmN0aW9uIGNyZWF0ZUpvaVR5cGUodHlwZU5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9wdGlvbnMgPSBbXSwgeyBpc1JlcXVpcmVkID0gZmFsc2UgfSkge1xuICAgIGxldCB2YWxpZGF0b3IgPSBqb2lbdHlwZU5hbWVdKCk7XG5cbiAgICBmb3IgKGxldCBvcHQgb2Ygb3B0aW9ucykge1xuICAgICAgbGV0IFssIG5hbWUsICwgYXJnXSA9IE9QVElPTl9SWC5leGVjKG9wdCk7XG4gICAgICBpZiAoYXJnKSB7XG4gICAgICAgIGlmICgvXlxcLy4qXFwvJC8udGVzdChhcmcpKSB7XG4gICAgICAgICAgYXJnID0gbmV3IFJlZ0V4cChhcmcuc2xpY2UoMSwgLTEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcmcgPSBKU09OLnBhcnNlKGFyZyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsaWRhdG9yID0gdmFsaWRhdG9yW25hbWVdLmNhbGwodmFsaWRhdG9yLCBhcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRhdG9yID0gdmFsaWRhdG9yW25hbWVdKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgIHZhbGlkYXRvciA9IHZhbGlkYXRvci5yZXF1aXJlZCgpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0b3I7XG4gIH1cbn1cblxuLypcbiAgSGFzaCBvZiB0eXBlIC0+IG1ldGhvZCB0aGF0IGNyZWF0ZXMgYSB2YWxpZGF0b3JcbiovXG5jb25zdCB0eXBlcyA9IHtcbiAgc3RyaW5nOiBjcmVhdGVKb2lUeXBlKCdzdHJpbmcnKSxcbiAgbnVtYmVyOiBjcmVhdGVKb2lUeXBlKCdudW1iZXInKVxufVxuXG5leHBvcnQgZGVmYXVsdCB0eXBlcztcbiJdfQ==