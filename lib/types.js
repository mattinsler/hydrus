'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

        if (Array.isArray(opt) && opt.length === 2) {
          validator = validator[opt[0]].call(validator, opt[1]);
        } else if (typeof opt === 'string') {
          validator = validator[opt]();
        } else {
          throw new Error('Invalid option: ' + opt);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90eXBlcy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVKb2lUeXBlIiwidHlwZU5hbWUiLCJvcHRpb25zIiwiaXNSZXF1aXJlZCIsInZhbGlkYXRvciIsIm9wdCIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImNhbGwiLCJFcnJvciIsInJlcXVpcmVkIiwidHlwZXMiLCJzdHJpbmciLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTQSxhQUFULENBQXVCQyxRQUF2QixFQUFpQztBQUMvQixTQUFPLFlBQStDO0FBQUEsUUFBdENDLE9BQXNDLHlEQUE1QixFQUE0QjtBQUFBO0FBQUEsK0JBQXRCQyxVQUFzQjtBQUFBLFFBQXRCQSxVQUFzQixtQ0FBVCxLQUFTOztBQUNwRCxRQUFJQyxZQUFZLGNBQUlILFFBQUosR0FBaEI7O0FBRG9EO0FBQUE7QUFBQTs7QUFBQTtBQUdwRCwyQkFBZ0JDLE9BQWhCLDhIQUF5QjtBQUFBLFlBQWhCRyxHQUFnQjs7QUFDdkIsWUFBSUMsTUFBTUMsT0FBTixDQUFjRixHQUFkLEtBQXNCQSxJQUFJRyxNQUFKLEtBQWUsQ0FBekMsRUFBNEM7QUFDMUNKLHNCQUFZQSxVQUFVQyxJQUFJLENBQUosQ0FBVixFQUFrQkksSUFBbEIsQ0FBdUJMLFNBQXZCLEVBQWtDQyxJQUFJLENBQUosQ0FBbEMsQ0FBWjtBQUNELFNBRkQsTUFFTyxJQUFJLE9BQU9BLEdBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDbkNELHNCQUFZQSxVQUFVQyxHQUFWLEdBQVo7QUFDRCxTQUZNLE1BRUE7QUFDTCxnQkFBTSxJQUFJSyxLQUFKLHNCQUE2QkwsR0FBN0IsQ0FBTjtBQUNEO0FBQ0Y7QUFYbUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFhcEQsUUFBSUYsVUFBSixFQUFnQjtBQUNkQyxrQkFBWUEsVUFBVU8sUUFBVixFQUFaO0FBQ0Q7O0FBRUQsV0FBT1AsU0FBUDtBQUNELEdBbEJEO0FBbUJEOztBQUVEOzs7QUFHQSxJQUFNUSxRQUFRO0FBQ1pDLFVBQVFiLGNBQWMsUUFBZCxDQURJO0FBRVpjLFVBQVFkLGNBQWMsUUFBZDtBQUZJLENBQWQ7O2tCQUtlWSxLIiwiZmlsZSI6InR5cGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGpvaSBmcm9tICdqb2knO1xuXG5mdW5jdGlvbiBjcmVhdGVKb2lUeXBlKHR5cGVOYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbihvcHRpb25zID0gW10sIHsgaXNSZXF1aXJlZCA9IGZhbHNlIH0pIHtcbiAgICBsZXQgdmFsaWRhdG9yID0gam9pW3R5cGVOYW1lXSgpO1xuXG4gICAgZm9yIChsZXQgb3B0IG9mIG9wdGlvbnMpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdCkgJiYgb3B0Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICB2YWxpZGF0b3IgPSB2YWxpZGF0b3Jbb3B0WzBdXS5jYWxsKHZhbGlkYXRvciwgb3B0WzFdKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mKG9wdCkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhbGlkYXRvciA9IHZhbGlkYXRvcltvcHRdKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgb3B0aW9uOiAke29wdH1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgdmFsaWRhdG9yID0gdmFsaWRhdG9yLnJlcXVpcmVkKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvcjtcbiAgfVxufVxuXG4vKlxuICBIYXNoIG9mIHR5cGUgLT4gbWV0aG9kIHRoYXQgY3JlYXRlcyBhIHZhbGlkYXRvclxuKi9cbmNvbnN0IHR5cGVzID0ge1xuICBzdHJpbmc6IGNyZWF0ZUpvaVR5cGUoJ3N0cmluZycpLFxuICBudW1iZXI6IGNyZWF0ZUpvaVR5cGUoJ251bWJlcicpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVzO1xuIl19