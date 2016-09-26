'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TYPE_RX = /^(!)?([^\.]+)(\.(.+))?$/;
var OPTION_RX = /^([^\(]+)(\(([^\)]+)\))?$/;

function parseValue(value) {
  if (/^\/.*\/[a-z]?$/.test(value)) {
    // regexp
    var _$exec = /^\/(.*)\/([a-z])?$/.exec(value);

    var _$exec2 = _slicedToArray(_$exec, 3);

    var content = _$exec2[1];
    var option = _$exec2[2];

    return new RegExp(content, option);
  } else if (/^-?0\.[0-9]+(\.[0-9]+)*$/.test(value)) {
    // number starting with 0.
    return parseFloat(value);
  } else if (/^-?[1-9][0-9]*(\.[0-9]+)*$/.test(value)) {
    // number
    return parseFloat(value);
  } else {
    return JSON.parse(value);
  }
}

function parseOptions() {
  var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  return value.split('.').map(function (a) {
    return a.trim();
  }).filter(function (a) {
    return a;
  }).map(function (opt) {
    var _OPTION_RX$exec = OPTION_RX.exec(opt);

    var _OPTION_RX$exec2 = _slicedToArray(_OPTION_RX$exec, 4);

    var method = _OPTION_RX$exec2[1];
    var arg = _OPTION_RX$exec2[3];

    if (!arg) {
      return method;
    }

    if (arg) {
      return [method, parseValue(arg)];
    } else {
      return method;
    }
  });
}

function parseType(spec) {
  var match = TYPE_RX.exec(spec);
  if (!match) {
    throw new Error('Invalid type spec: ' + spec);
  }

  var isRequired = match[1] === '!';
  var typeName = match[2];
  var typeOptions = parseOptions(match[4]);

  if (!_types2.default[typeName]) {
    throw new Error('Unknown type name: ' + typeName);
  }

  return {
    type: typeName,
    options: typeOptions,
    isRequired: isRequired,
    validator: _types2.default[typeName](typeOptions, { isRequired: isRequired })
  };
}

var Request = function () {
  function Request() {
    var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Request);

    // could be an array of objects or object or undefined

    this.fields = Object.entries(spec).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var k = _ref2[0];
      var v = _ref2[1];

      return {
        key: k,
        type: parseType(v)
      };
    });

    this.validator = _joi2.default.object().keys(this.fields.reduce(function (o, field) {
      o[field.key] = field.type.validator;
      return o;
    }, {}));
  }

  _createClass(Request, [{
    key: 'parse',
    value: function parse(data) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var result = _this.fields.reduce(function (o, field) {
          o[field.key] = data[field.key];
          return o;
        }, {});

        _joi2.default.validate(result, _this.validator, function (err, validatedResult) {
          if (err) {
            reject(err);
          } else {
            resolve(validatedResult);
          }
        });
      });
    }
  }]);

  return Request;
}();

exports.default = Request;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIlRZUEVfUlgiLCJPUFRJT05fUlgiLCJwYXJzZVZhbHVlIiwidmFsdWUiLCJ0ZXN0IiwiZXhlYyIsImNvbnRlbnQiLCJvcHRpb24iLCJSZWdFeHAiLCJwYXJzZUZsb2F0IiwiSlNPTiIsInBhcnNlIiwicGFyc2VPcHRpb25zIiwic3BsaXQiLCJtYXAiLCJhIiwidHJpbSIsImZpbHRlciIsIm9wdCIsIm1ldGhvZCIsImFyZyIsInBhcnNlVHlwZSIsInNwZWMiLCJtYXRjaCIsIkVycm9yIiwiaXNSZXF1aXJlZCIsInR5cGVOYW1lIiwidHlwZU9wdGlvbnMiLCJ0eXBlIiwib3B0aW9ucyIsInZhbGlkYXRvciIsIlJlcXVlc3QiLCJmaWVsZHMiLCJPYmplY3QiLCJlbnRyaWVzIiwiayIsInYiLCJrZXkiLCJvYmplY3QiLCJrZXlzIiwicmVkdWNlIiwibyIsImZpZWxkIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdWx0IiwidmFsaWRhdGUiLCJlcnIiLCJ2YWxpZGF0ZWRSZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLFVBQVUseUJBQWhCO0FBQ0EsSUFBTUMsWUFBWSwyQkFBbEI7O0FBRUEsU0FBU0MsVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkI7QUFDekIsTUFBSSxpQkFBaUJDLElBQWpCLENBQXNCRCxLQUF0QixDQUFKLEVBQWtDO0FBQ2hDO0FBRGdDLGlCQUVKLHFCQUFxQkUsSUFBckIsQ0FBMEJGLEtBQTFCLENBRkk7O0FBQUE7O0FBQUEsUUFFdkJHLE9BRnVCO0FBQUEsUUFFZEMsTUFGYzs7QUFHaEMsV0FBTyxJQUFJQyxNQUFKLENBQVdGLE9BQVgsRUFBb0JDLE1BQXBCLENBQVA7QUFDRCxHQUpELE1BSU8sSUFBSSwyQkFBMkJILElBQTNCLENBQWdDRCxLQUFoQyxDQUFKLEVBQTRDO0FBQ2pEO0FBQ0EsV0FBT00sV0FBV04sS0FBWCxDQUFQO0FBQ0QsR0FITSxNQUdBLElBQUksNkJBQTZCQyxJQUE3QixDQUFrQ0QsS0FBbEMsQ0FBSixFQUE4QztBQUNuRDtBQUNBLFdBQU9NLFdBQVdOLEtBQVgsQ0FBUDtBQUNELEdBSE0sTUFHQTtBQUNMLFdBQU9PLEtBQUtDLEtBQUwsQ0FBV1IsS0FBWCxDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTUyxZQUFULEdBQWtDO0FBQUEsTUFBWlQsS0FBWSx5REFBSixFQUFJOztBQUNoQyxTQUFPQSxNQUNKVSxLQURJLENBQ0UsR0FERixFQUVKQyxHQUZJLENBRUE7QUFBQSxXQUFLQyxFQUFFQyxJQUFGLEVBQUw7QUFBQSxHQUZBLEVBR0pDLE1BSEksQ0FHRztBQUFBLFdBQUtGLENBQUw7QUFBQSxHQUhILEVBSUpELEdBSkksQ0FJQSxVQUFDSSxHQUFELEVBQVM7QUFBQSwwQkFDWWpCLFVBQVVJLElBQVYsQ0FBZWEsR0FBZixDQURaOztBQUFBOztBQUFBLFFBQ0xDLE1BREs7QUFBQSxRQUNLQyxHQURMOztBQUVaLFFBQUksQ0FBQ0EsR0FBTCxFQUFVO0FBQUUsYUFBT0QsTUFBUDtBQUFnQjs7QUFFNUIsUUFBSUMsR0FBSixFQUFTO0FBQ1AsYUFBTyxDQUFDRCxNQUFELEVBQVNqQixXQUFXa0IsR0FBWCxDQUFULENBQVA7QUFDRCxLQUZELE1BRU87QUFDTCxhQUFPRCxNQUFQO0FBQ0Q7QUFDRixHQWJJLENBQVA7QUFjRDs7QUFFRCxTQUFTRSxTQUFULENBQW1CQyxJQUFuQixFQUF5QjtBQUN2QixNQUFNQyxRQUFRdkIsUUFBUUssSUFBUixDQUFhaUIsSUFBYixDQUFkO0FBQ0EsTUFBSSxDQUFDQyxLQUFMLEVBQVk7QUFDVixVQUFNLElBQUlDLEtBQUoseUJBQWdDRixJQUFoQyxDQUFOO0FBQ0Q7O0FBRUQsTUFBTUcsYUFBYUYsTUFBTSxDQUFOLE1BQWEsR0FBaEM7QUFDQSxNQUFNRyxXQUFXSCxNQUFNLENBQU4sQ0FBakI7QUFDQSxNQUFNSSxjQUFjZixhQUFhVyxNQUFNLENBQU4sQ0FBYixDQUFwQjs7QUFFQSxNQUFJLENBQUMsZ0JBQU1HLFFBQU4sQ0FBTCxFQUFzQjtBQUNwQixVQUFNLElBQUlGLEtBQUoseUJBQWdDRSxRQUFoQyxDQUFOO0FBQ0Q7O0FBRUQsU0FBTztBQUNMRSxVQUFNRixRQUREO0FBRUxHLGFBQVNGLFdBRko7QUFHTEYsMEJBSEs7QUFJTEssZUFBVyxnQkFBTUosUUFBTixFQUFnQkMsV0FBaEIsRUFBNkIsRUFBRUYsc0JBQUYsRUFBN0I7QUFKTixHQUFQO0FBTUQ7O0lBRUtNLE87QUFDSixxQkFBdUI7QUFBQSxRQUFYVCxJQUFXLHlEQUFKLEVBQUk7O0FBQUE7O0FBQ3JCOztBQUVBLFNBQUtVLE1BQUwsR0FBY0MsT0FBT0MsT0FBUCxDQUFlWixJQUFmLEVBQXFCUixHQUFyQixDQUF5QixnQkFBWTtBQUFBOztBQUFBLFVBQVZxQixDQUFVO0FBQUEsVUFBUEMsQ0FBTzs7QUFDakQsYUFBTztBQUNMQyxhQUFLRixDQURBO0FBRUxQLGNBQU1QLFVBQVVlLENBQVY7QUFGRCxPQUFQO0FBSUQsS0FMYSxDQUFkOztBQU9BLFNBQUtOLFNBQUwsR0FBaUIsY0FBSVEsTUFBSixHQUFhQyxJQUFiLENBQ2YsS0FBS1AsTUFBTCxDQUFZUSxNQUFaLENBQW1CLFVBQUNDLENBQUQsRUFBSUMsS0FBSixFQUFjO0FBQy9CRCxRQUFFQyxNQUFNTCxHQUFSLElBQWVLLE1BQU1kLElBQU4sQ0FBV0UsU0FBMUI7QUFDQSxhQUFPVyxDQUFQO0FBQ0QsS0FIRCxFQUdHLEVBSEgsQ0FEZSxDQUFqQjtBQU1EOzs7OzBCQUVLRSxJLEVBQU07QUFBQTs7QUFDVixhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsWUFBTUMsU0FBUyxNQUFLZixNQUFMLENBQVlRLE1BQVosQ0FBbUIsVUFBQ0MsQ0FBRCxFQUFJQyxLQUFKLEVBQWM7QUFDOUNELFlBQUVDLE1BQU1MLEdBQVIsSUFBZU0sS0FBS0QsTUFBTUwsR0FBWCxDQUFmO0FBQ0EsaUJBQU9JLENBQVA7QUFDRCxTQUhjLEVBR1osRUFIWSxDQUFmOztBQUtBLHNCQUFJTyxRQUFKLENBQWFELE1BQWIsRUFBcUIsTUFBS2pCLFNBQTFCLEVBQXFDLFVBQUNtQixHQUFELEVBQU1DLGVBQU4sRUFBMEI7QUFDN0QsY0FBSUQsR0FBSixFQUFTO0FBQUVILG1CQUFPRyxHQUFQO0FBQWMsV0FBekIsTUFDSztBQUFFSixvQkFBUUssZUFBUjtBQUEyQjtBQUNuQyxTQUhEO0FBSUQsT0FWTSxDQUFQO0FBV0Q7Ozs7OztrQkFHWW5CLE8iLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqb2kgZnJvbSAnam9pJztcblxuaW1wb3J0IHR5cGVzIGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBUWVBFX1JYID0gL14oISk/KFteXFwuXSspKFxcLiguKykpPyQvO1xuY29uc3QgT1BUSU9OX1JYID0gL14oW15cXChdKykoXFwoKFteXFwpXSspXFwpKT8kLztcblxuZnVuY3Rpb24gcGFyc2VWYWx1ZSh2YWx1ZSkge1xuICBpZiAoL15cXC8uKlxcL1thLXpdPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgLy8gcmVnZXhwXG4gICAgY29uc3QgWywgY29udGVudCwgb3B0aW9uXSA9IC9eXFwvKC4qKVxcLyhbYS16XSk/JC8uZXhlYyh2YWx1ZSk7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoY29udGVudCwgb3B0aW9uKTtcbiAgfSBlbHNlIGlmICgvXi0/MFxcLlswLTldKyhcXC5bMC05XSspKiQvLnRlc3QodmFsdWUpKSB7XG4gICAgLy8gbnVtYmVyIHN0YXJ0aW5nIHdpdGggMC5cbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoL14tP1sxLTldWzAtOV0qKFxcLlswLTldKykqJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAvLyBudW1iZXJcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlT3B0aW9ucyh2YWx1ZSA9ICcnKSB7XG4gIHJldHVybiB2YWx1ZVxuICAgIC5zcGxpdCgnLicpXG4gICAgLm1hcChhID0+IGEudHJpbSgpKVxuICAgIC5maWx0ZXIoYSA9PiBhKVxuICAgIC5tYXAoKG9wdCkgPT4ge1xuICAgICAgbGV0IFssIG1ldGhvZCwgLCBhcmddID0gT1BUSU9OX1JYLmV4ZWMob3B0KTtcbiAgICAgIGlmICghYXJnKSB7IHJldHVybiBtZXRob2Q7IH1cblxuICAgICAgaWYgKGFyZykge1xuICAgICAgICByZXR1cm4gW21ldGhvZCwgcGFyc2VWYWx1ZShhcmcpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtZXRob2Q7XG4gICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHlwZShzcGVjKSB7XG4gIGNvbnN0IG1hdGNoID0gVFlQRV9SWC5leGVjKHNwZWMpO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHR5cGUgc3BlYzogJHtzcGVjfWApO1xuICB9XG5cbiAgY29uc3QgaXNSZXF1aXJlZCA9IG1hdGNoWzFdID09PSAnISc7XG4gIGNvbnN0IHR5cGVOYW1lID0gbWF0Y2hbMl07XG4gIGNvbnN0IHR5cGVPcHRpb25zID0gcGFyc2VPcHRpb25zKG1hdGNoWzRdKTtcblxuICBpZiAoIXR5cGVzW3R5cGVOYW1lXSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB0eXBlIG5hbWU6ICR7dHlwZU5hbWV9YCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHR5cGU6IHR5cGVOYW1lLFxuICAgIG9wdGlvbnM6IHR5cGVPcHRpb25zLFxuICAgIGlzUmVxdWlyZWQsXG4gICAgdmFsaWRhdG9yOiB0eXBlc1t0eXBlTmFtZV0odHlwZU9wdGlvbnMsIHsgaXNSZXF1aXJlZCB9KVxuICB9O1xufVxuXG5jbGFzcyBSZXF1ZXN0IHtcbiAgY29uc3RydWN0b3Ioc3BlYyA9IHt9KSB7XG4gICAgLy8gY291bGQgYmUgYW4gYXJyYXkgb2Ygb2JqZWN0cyBvciBvYmplY3Qgb3IgdW5kZWZpbmVkXG5cbiAgICB0aGlzLmZpZWxkcyA9IE9iamVjdC5lbnRyaWVzKHNwZWMpLm1hcCgoW2ssIHZdKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGssXG4gICAgICAgIHR5cGU6IHBhcnNlVHlwZSh2KVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHRoaXMudmFsaWRhdG9yID0gam9pLm9iamVjdCgpLmtleXMoXG4gICAgICB0aGlzLmZpZWxkcy5yZWR1Y2UoKG8sIGZpZWxkKSA9PiB7XG4gICAgICAgIG9bZmllbGQua2V5XSA9IGZpZWxkLnR5cGUudmFsaWRhdG9yO1xuICAgICAgICByZXR1cm4gbztcbiAgICAgIH0sIHt9KVxuICAgICk7XG4gIH1cblxuICBwYXJzZShkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZmllbGRzLnJlZHVjZSgobywgZmllbGQpID0+IHtcbiAgICAgICAgb1tmaWVsZC5rZXldID0gZGF0YVtmaWVsZC5rZXldO1xuICAgICAgICByZXR1cm4gbztcbiAgICAgIH0sIHt9KTtcblxuICAgICAgam9pLnZhbGlkYXRlKHJlc3VsdCwgdGhpcy52YWxpZGF0b3IsIChlcnIsIHZhbGlkYXRlZFJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7IHJlamVjdChlcnIpOyB9XG4gICAgICAgIGVsc2UgeyByZXNvbHZlKHZhbGlkYXRlZFJlc3VsdCk7IH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3Q7XG4iXX0=