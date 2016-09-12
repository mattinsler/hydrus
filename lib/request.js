'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    this.validator = joi.object().keys(this.fields.reduce(function (o, field) {
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

        joi.validate(result, _this.validator, function (err, validatedResult) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIlRZUEVfUlgiLCJwYXJzZVR5cGUiLCJzcGVjIiwibWF0Y2giLCJleGVjIiwiRXJyb3IiLCJpc1JlcXVpcmVkIiwidHlwZU5hbWUiLCJ0eXBlT3B0aW9ucyIsInNwbGl0IiwibWFwIiwiYSIsInRyaW0iLCJ0eXBlIiwib3B0aW9ucyIsInZhbGlkYXRvciIsIlJlcXVlc3QiLCJmaWVsZHMiLCJPYmplY3QiLCJlbnRyaWVzIiwiayIsInYiLCJrZXkiLCJqb2kiLCJvYmplY3QiLCJrZXlzIiwicmVkdWNlIiwibyIsImZpZWxkIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdWx0IiwidmFsaWRhdGUiLCJlcnIiLCJ2YWxpZGF0ZWRSZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxVQUFVLHlCQUFoQjs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxJQUFuQixFQUF5QjtBQUN2QixNQUFNQyxRQUFRSCxRQUFRSSxJQUFSLENBQWFGLElBQWIsQ0FBZDtBQUNBLE1BQUksQ0FBQ0MsS0FBTCxFQUFZO0FBQ1YsVUFBTSxJQUFJRSxLQUFKLHlCQUFnQ0gsSUFBaEMsQ0FBTjtBQUNEOztBQUVELE1BQU1JLGFBQWFILE1BQU0sQ0FBTixNQUFhLEdBQWhDO0FBQ0EsTUFBTUksV0FBV0osTUFBTSxDQUFOLENBQWpCO0FBQ0EsTUFBTUssY0FBY0wsTUFBTSxDQUFOLEVBQVNNLEtBQVQsQ0FBZSxHQUFmLEVBQW9CQyxHQUFwQixDQUF3QjtBQUFBLFdBQUtDLEVBQUVDLElBQUYsRUFBTDtBQUFBLEdBQXhCLENBQXBCOztBQUVBLE1BQUksQ0FBQyxnQkFBTUwsUUFBTixDQUFMLEVBQXNCO0FBQ3BCLFVBQU0sSUFBSUYsS0FBSix5QkFBZ0NFLFFBQWhDLENBQU47QUFDRDs7QUFFRCxTQUFPO0FBQ0xNLFVBQU1OLFFBREQ7QUFFTE8sYUFBU04sV0FGSjtBQUdMRiwwQkFISztBQUlMUyxlQUFXLGdCQUFNUixRQUFOLEVBQWdCQyxXQUFoQixFQUE2QixFQUFFRixzQkFBRixFQUE3QjtBQUpOLEdBQVA7QUFNRDs7SUFFS1UsTztBQUNKLHFCQUF1QjtBQUFBLFFBQVhkLElBQVcseURBQUosRUFBSTs7QUFBQTs7QUFDckI7O0FBRUEsU0FBS2UsTUFBTCxHQUFjQyxPQUFPQyxPQUFQLENBQWVqQixJQUFmLEVBQXFCUSxHQUFyQixDQUF5QixnQkFBWTtBQUFBOztBQUFBLFVBQVZVLENBQVU7QUFBQSxVQUFQQyxDQUFPOztBQUNqRCxhQUFPO0FBQ0xDLGFBQUtGLENBREE7QUFFTFAsY0FBTVosVUFBVW9CLENBQVY7QUFGRCxPQUFQO0FBSUQsS0FMYSxDQUFkOztBQU9BLFNBQUtOLFNBQUwsR0FBaUJRLElBQUlDLE1BQUosR0FBYUMsSUFBYixDQUNmLEtBQUtSLE1BQUwsQ0FBWVMsTUFBWixDQUFtQixVQUFDQyxDQUFELEVBQUlDLEtBQUosRUFBYztBQUMvQkQsUUFBRUMsTUFBTU4sR0FBUixJQUFlTSxNQUFNZixJQUFOLENBQVdFLFNBQTFCO0FBQ0EsYUFBT1ksQ0FBUDtBQUNELEtBSEQsRUFHRyxFQUhILENBRGUsQ0FBakI7QUFNRDs7OzswQkFFS0UsSSxFQUFNO0FBQUE7O0FBQ1YsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLFlBQU1DLFNBQVMsTUFBS2hCLE1BQUwsQ0FBWVMsTUFBWixDQUFtQixVQUFDQyxDQUFELEVBQUlDLEtBQUosRUFBYztBQUM5Q0QsWUFBRUMsTUFBTU4sR0FBUixJQUFlTyxLQUFLRCxNQUFNTixHQUFYLENBQWY7QUFDQSxpQkFBT0ssQ0FBUDtBQUNELFNBSGMsRUFHWixFQUhZLENBQWY7O0FBS0FKLFlBQUlXLFFBQUosQ0FBYUQsTUFBYixFQUFxQixNQUFLbEIsU0FBMUIsRUFBcUMsVUFBQ29CLEdBQUQsRUFBTUMsZUFBTixFQUEwQjtBQUM3RCxjQUFJRCxHQUFKLEVBQVM7QUFBRUgsbUJBQU9HLEdBQVA7QUFBYyxXQUF6QixNQUNLO0FBQUVKLG9CQUFRSyxlQUFSO0FBQTJCO0FBQ25DLFNBSEQ7QUFJRCxPQVZNLENBQVA7QUFXRDs7Ozs7O2tCQUdZcEIsTyIsImZpbGUiOiJyZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGVzIGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBUWVBFX1JYID0gL14oISk/KFteXFwuXSspKFxcLiguKykpPyQvO1xuXG5mdW5jdGlvbiBwYXJzZVR5cGUoc3BlYykge1xuICBjb25zdCBtYXRjaCA9IFRZUEVfUlguZXhlYyhzcGVjKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0eXBlIHNwZWM6ICR7c3BlY31gKTtcbiAgfVxuXG4gIGNvbnN0IGlzUmVxdWlyZWQgPSBtYXRjaFsxXSA9PT0gJyEnO1xuICBjb25zdCB0eXBlTmFtZSA9IG1hdGNoWzJdO1xuICBjb25zdCB0eXBlT3B0aW9ucyA9IG1hdGNoWzRdLnNwbGl0KCcuJykubWFwKGEgPT4gYS50cmltKCkpO1xuXG4gIGlmICghdHlwZXNbdHlwZU5hbWVdKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHR5cGUgbmFtZTogJHt0eXBlTmFtZX1gKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZU5hbWUsXG4gICAgb3B0aW9uczogdHlwZU9wdGlvbnMsXG4gICAgaXNSZXF1aXJlZCxcbiAgICB2YWxpZGF0b3I6IHR5cGVzW3R5cGVOYW1lXSh0eXBlT3B0aW9ucywgeyBpc1JlcXVpcmVkIH0pXG4gIH07XG59XG5cbmNsYXNzIFJlcXVlc3Qge1xuICBjb25zdHJ1Y3RvcihzcGVjID0ge30pIHtcbiAgICAvLyBjb3VsZCBiZSBhbiBhcnJheSBvZiBvYmplY3RzIG9yIG9iamVjdCBvciB1bmRlZmluZWRcblxuICAgIHRoaXMuZmllbGRzID0gT2JqZWN0LmVudHJpZXMoc3BlYykubWFwKChbaywgdl0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogayxcbiAgICAgICAgdHlwZTogcGFyc2VUeXBlKHYpXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdGhpcy52YWxpZGF0b3IgPSBqb2kub2JqZWN0KCkua2V5cyhcbiAgICAgIHRoaXMuZmllbGRzLnJlZHVjZSgobywgZmllbGQpID0+IHtcbiAgICAgICAgb1tmaWVsZC5rZXldID0gZmllbGQudHlwZS52YWxpZGF0b3I7XG4gICAgICAgIHJldHVybiBvO1xuICAgICAgfSwge30pXG4gICAgKTtcbiAgfVxuXG4gIHBhcnNlKGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5maWVsZHMucmVkdWNlKChvLCBmaWVsZCkgPT4ge1xuICAgICAgICBvW2ZpZWxkLmtleV0gPSBkYXRhW2ZpZWxkLmtleV07XG4gICAgICAgIHJldHVybiBvO1xuICAgICAgfSwge30pO1xuXG4gICAgICBqb2kudmFsaWRhdGUocmVzdWx0LCB0aGlzLnZhbGlkYXRvciwgKGVyciwgdmFsaWRhdGVkUmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHsgcmVqZWN0KGVycik7IH1cbiAgICAgICAgZWxzZSB7IHJlc29sdmUodmFsaWRhdGVkUmVzdWx0KTsgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdDtcbiJdfQ==