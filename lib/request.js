'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TYPE_RX = /^(!)?([^\.]+)(\.(.+))?$/;

function parseType(spec) {
  var match = TYPE_RX.exec(spec);
  if (!match) {
    throw new Error('Invalid type spec: ' + spec);
  }

  var isRequired = match[1] === '!';
  var typeName = match[2];
  var typeOptions = match[4].split('.').map(function (a) {
    return a.trim();
  });

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIlRZUEVfUlgiLCJwYXJzZVR5cGUiLCJzcGVjIiwibWF0Y2giLCJleGVjIiwiRXJyb3IiLCJpc1JlcXVpcmVkIiwidHlwZU5hbWUiLCJ0eXBlT3B0aW9ucyIsInNwbGl0IiwibWFwIiwiYSIsInRyaW0iLCJ0eXBlIiwib3B0aW9ucyIsInZhbGlkYXRvciIsIlJlcXVlc3QiLCJmaWVsZHMiLCJPYmplY3QiLCJlbnRyaWVzIiwiayIsInYiLCJrZXkiLCJvYmplY3QiLCJrZXlzIiwicmVkdWNlIiwibyIsImZpZWxkIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdWx0IiwidmFsaWRhdGUiLCJlcnIiLCJ2YWxpZGF0ZWRSZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLFVBQVUseUJBQWhCOztBQUVBLFNBQVNDLFNBQVQsQ0FBbUJDLElBQW5CLEVBQXlCO0FBQ3ZCLE1BQU1DLFFBQVFILFFBQVFJLElBQVIsQ0FBYUYsSUFBYixDQUFkO0FBQ0EsTUFBSSxDQUFDQyxLQUFMLEVBQVk7QUFDVixVQUFNLElBQUlFLEtBQUoseUJBQWdDSCxJQUFoQyxDQUFOO0FBQ0Q7O0FBRUQsTUFBTUksYUFBYUgsTUFBTSxDQUFOLE1BQWEsR0FBaEM7QUFDQSxNQUFNSSxXQUFXSixNQUFNLENBQU4sQ0FBakI7QUFDQSxNQUFNSyxjQUFjTCxNQUFNLENBQU4sRUFBU00sS0FBVCxDQUFlLEdBQWYsRUFBb0JDLEdBQXBCLENBQXdCO0FBQUEsV0FBS0MsRUFBRUMsSUFBRixFQUFMO0FBQUEsR0FBeEIsQ0FBcEI7O0FBRUEsTUFBSSxDQUFDLGdCQUFNTCxRQUFOLENBQUwsRUFBc0I7QUFDcEIsVUFBTSxJQUFJRixLQUFKLHlCQUFnQ0UsUUFBaEMsQ0FBTjtBQUNEOztBQUVELFNBQU87QUFDTE0sVUFBTU4sUUFERDtBQUVMTyxhQUFTTixXQUZKO0FBR0xGLDBCQUhLO0FBSUxTLGVBQVcsZ0JBQU1SLFFBQU4sRUFBZ0JDLFdBQWhCLEVBQTZCLEVBQUVGLHNCQUFGLEVBQTdCO0FBSk4sR0FBUDtBQU1EOztJQUVLVSxPO0FBQ0oscUJBQXVCO0FBQUEsUUFBWGQsSUFBVyx5REFBSixFQUFJOztBQUFBOztBQUNyQjs7QUFFQSxTQUFLZSxNQUFMLEdBQWNDLE9BQU9DLE9BQVAsQ0FBZWpCLElBQWYsRUFBcUJRLEdBQXJCLENBQXlCLGdCQUFZO0FBQUE7O0FBQUEsVUFBVlUsQ0FBVTtBQUFBLFVBQVBDLENBQU87O0FBQ2pELGFBQU87QUFDTEMsYUFBS0YsQ0FEQTtBQUVMUCxjQUFNWixVQUFVb0IsQ0FBVjtBQUZELE9BQVA7QUFJRCxLQUxhLENBQWQ7O0FBT0EsU0FBS04sU0FBTCxHQUFpQixjQUFJUSxNQUFKLEdBQWFDLElBQWIsQ0FDZixLQUFLUCxNQUFMLENBQVlRLE1BQVosQ0FBbUIsVUFBQ0MsQ0FBRCxFQUFJQyxLQUFKLEVBQWM7QUFDL0JELFFBQUVDLE1BQU1MLEdBQVIsSUFBZUssTUFBTWQsSUFBTixDQUFXRSxTQUExQjtBQUNBLGFBQU9XLENBQVA7QUFDRCxLQUhELEVBR0csRUFISCxDQURlLENBQWpCO0FBTUQ7Ozs7MEJBRUtFLEksRUFBTTtBQUFBOztBQUNWLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxZQUFNQyxTQUFTLE1BQUtmLE1BQUwsQ0FBWVEsTUFBWixDQUFtQixVQUFDQyxDQUFELEVBQUlDLEtBQUosRUFBYztBQUM5Q0QsWUFBRUMsTUFBTUwsR0FBUixJQUFlTSxLQUFLRCxNQUFNTCxHQUFYLENBQWY7QUFDQSxpQkFBT0ksQ0FBUDtBQUNELFNBSGMsRUFHWixFQUhZLENBQWY7O0FBS0Esc0JBQUlPLFFBQUosQ0FBYUQsTUFBYixFQUFxQixNQUFLakIsU0FBMUIsRUFBcUMsVUFBQ21CLEdBQUQsRUFBTUMsZUFBTixFQUEwQjtBQUM3RCxjQUFJRCxHQUFKLEVBQVM7QUFBRUgsbUJBQU9HLEdBQVA7QUFBYyxXQUF6QixNQUNLO0FBQUVKLG9CQUFRSyxlQUFSO0FBQTJCO0FBQ25DLFNBSEQ7QUFJRCxPQVZNLENBQVA7QUFXRDs7Ozs7O2tCQUdZbkIsTyIsImZpbGUiOiJyZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGpvaSBmcm9tICdqb2knO1xuXG5pbXBvcnQgdHlwZXMgZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IFRZUEVfUlggPSAvXighKT8oW15cXC5dKykoXFwuKC4rKSk/JC87XG5cbmZ1bmN0aW9uIHBhcnNlVHlwZShzcGVjKSB7XG4gIGNvbnN0IG1hdGNoID0gVFlQRV9SWC5leGVjKHNwZWMpO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHR5cGUgc3BlYzogJHtzcGVjfWApO1xuICB9XG5cbiAgY29uc3QgaXNSZXF1aXJlZCA9IG1hdGNoWzFdID09PSAnISc7XG4gIGNvbnN0IHR5cGVOYW1lID0gbWF0Y2hbMl07XG4gIGNvbnN0IHR5cGVPcHRpb25zID0gbWF0Y2hbNF0uc3BsaXQoJy4nKS5tYXAoYSA9PiBhLnRyaW0oKSk7XG5cbiAgaWYgKCF0eXBlc1t0eXBlTmFtZV0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdHlwZSBuYW1lOiAke3R5cGVOYW1lfWApO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlTmFtZSxcbiAgICBvcHRpb25zOiB0eXBlT3B0aW9ucyxcbiAgICBpc1JlcXVpcmVkLFxuICAgIHZhbGlkYXRvcjogdHlwZXNbdHlwZU5hbWVdKHR5cGVPcHRpb25zLCB7IGlzUmVxdWlyZWQgfSlcbiAgfTtcbn1cblxuY2xhc3MgUmVxdWVzdCB7XG4gIGNvbnN0cnVjdG9yKHNwZWMgPSB7fSkge1xuICAgIC8vIGNvdWxkIGJlIGFuIGFycmF5IG9mIG9iamVjdHMgb3Igb2JqZWN0IG9yIHVuZGVmaW5lZFxuXG4gICAgdGhpcy5maWVsZHMgPSBPYmplY3QuZW50cmllcyhzcGVjKS5tYXAoKFtrLCB2XSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBrLFxuICAgICAgICB0eXBlOiBwYXJzZVR5cGUodilcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICB0aGlzLnZhbGlkYXRvciA9IGpvaS5vYmplY3QoKS5rZXlzKFxuICAgICAgdGhpcy5maWVsZHMucmVkdWNlKChvLCBmaWVsZCkgPT4ge1xuICAgICAgICBvW2ZpZWxkLmtleV0gPSBmaWVsZC50eXBlLnZhbGlkYXRvcjtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgICB9LCB7fSlcbiAgICApO1xuICB9XG5cbiAgcGFyc2UoZGF0YSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmZpZWxkcy5yZWR1Y2UoKG8sIGZpZWxkKSA9PiB7XG4gICAgICAgIG9bZmllbGQua2V5XSA9IGRhdGFbZmllbGQua2V5XTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgICB9LCB7fSk7XG5cbiAgICAgIGpvaS52YWxpZGF0ZShyZXN1bHQsIHRoaXMudmFsaWRhdG9yLCAoZXJyLCB2YWxpZGF0ZWRSZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikgeyByZWplY3QoZXJyKTsgfVxuICAgICAgICBlbHNlIHsgcmVzb2x2ZSh2YWxpZGF0ZWRSZXN1bHQpOyB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIl19