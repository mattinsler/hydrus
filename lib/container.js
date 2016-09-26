'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _attachToHttp = require('./attach-to-http');

var _attachToHttp2 = _interopRequireDefault(_attachToHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function orderObject(obj) {
  var keys = Object.keys(obj);
  keys.sort();
  return keys.reduce(function (o, k) {
    o[k] = obj[k];
    return o;
  }, {});
}

var Container = function () {
  function Container() {
    _classCallCheck(this, Container);

    this.services = [];
  }

  _createClass(Container, [{
    key: 'export',
    value: function _export(service) {
      this.services.push(service);
    }
  }, {
    key: 'attach',
    value: function attach(server) {
      if (server instanceof _http2.default.Server) {
        // attach to http server
        (0, _attachToHttp2.default)(server, this.services);
      }
    }
  }, {
    key: 'register',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
        var servicesUrl, services;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                servicesUrl = url.replace(/\/+$/, '') + '/services';
                services = this.services.map(function (_ref2) {
                  var service = _ref2.__service;

                  var data = {
                    name: service.name,
                    operations: Object.entries(service.operations).map(function (_ref3) {
                      var _ref4 = _slicedToArray(_ref3, 2);

                      var k = _ref4[0];
                      var v = _ref4[1];
                      return {
                        name: v.name,
                        fields: orderObject(v.request.fields.reduce(function (o, field) {
                          o[field.key] = {
                            type: field.type.type,
                            required: field.type.isRequired,
                            constraints: field.type.options.map(function (opt) {
                              if (Array.isArray(opt)) {
                                return [opt[0], opt[1].toString()];
                              } else {
                                return opt;
                              }
                            }).sort(function (l, r) {
                              var lhs = Array.isArray(l) ? l[0] : l;
                              var rhs = Array.isArray(r) ? r[0] : r;
                              return lhs.localeCompare(rhs);
                            })
                          };
                          return o;
                        }, {}))
                      };
                    })
                  };

                  data.operations.sort(function (l, r) {
                    return l.name.localeCompare(r.name);
                  });

                  return data;
                });
                _context.next = 4;
                return Promise.all(services.map(function (service) {
                  return _got2.default.post(servicesUrl, {
                    json: true,
                    body: JSON.stringify(service),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
                }));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function register(_x) {
        return _ref.apply(this, arguments);
      }

      return register;
    }()
  }]);

  return Container;
}();

exports.default = Container;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250YWluZXIuanMiXSwibmFtZXMiOlsib3JkZXJPYmplY3QiLCJvYmoiLCJrZXlzIiwiT2JqZWN0Iiwic29ydCIsInJlZHVjZSIsIm8iLCJrIiwiQ29udGFpbmVyIiwic2VydmljZXMiLCJzZXJ2aWNlIiwicHVzaCIsInNlcnZlciIsIlNlcnZlciIsInVybCIsInNlcnZpY2VzVXJsIiwicmVwbGFjZSIsIm1hcCIsIl9fc2VydmljZSIsImRhdGEiLCJuYW1lIiwib3BlcmF0aW9ucyIsImVudHJpZXMiLCJ2IiwiZmllbGRzIiwicmVxdWVzdCIsImZpZWxkIiwia2V5IiwidHlwZSIsInJlcXVpcmVkIiwiaXNSZXF1aXJlZCIsImNvbnN0cmFpbnRzIiwib3B0aW9ucyIsIm9wdCIsIkFycmF5IiwiaXNBcnJheSIsInRvU3RyaW5nIiwibCIsInIiLCJsaHMiLCJyaHMiLCJsb2NhbGVDb21wYXJlIiwiUHJvbWlzZSIsImFsbCIsInBvc3QiLCJqc29uIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsU0FBU0EsV0FBVCxDQUFxQkMsR0FBckIsRUFBMEI7QUFDeEIsTUFBTUMsT0FBT0MsT0FBT0QsSUFBUCxDQUFZRCxHQUFaLENBQWI7QUFDQUMsT0FBS0UsSUFBTDtBQUNBLFNBQU9GLEtBQUtHLE1BQUwsQ0FBWSxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUMzQkQsTUFBRUMsQ0FBRixJQUFPTixJQUFJTSxDQUFKLENBQVA7QUFDQSxXQUFPRCxDQUFQO0FBQ0QsR0FITSxFQUdKLEVBSEksQ0FBUDtBQUlEOztJQUVLRSxTO0FBQ0osdUJBQWM7QUFBQTs7QUFDWixTQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0Q7Ozs7NEJBRU1DLE8sRUFBUztBQUNkLFdBQUtELFFBQUwsQ0FBY0UsSUFBZCxDQUFtQkQsT0FBbkI7QUFDRDs7OzJCQUVNRSxNLEVBQVE7QUFDYixVQUFJQSxrQkFBa0IsZUFBS0MsTUFBM0IsRUFBbUM7QUFDakM7QUFDQSxvQ0FBYUQsTUFBYixFQUFxQixLQUFLSCxRQUExQjtBQUNEO0FBQ0Y7Ozs7NEVBRWNLLEc7Ozs7OztBQUNQQywyQixHQUFjRCxJQUFJRSxPQUFKLENBQVksTUFBWixFQUFvQixFQUFwQixJQUEwQixXO0FBRXhDUCx3QixHQUFXLEtBQUtBLFFBQUwsQ0FBY1EsR0FBZCxDQUFrQixpQkFBNEI7QUFBQSxzQkFBZFAsT0FBYyxTQUF6QlEsU0FBeUI7O0FBQzdELHNCQUFNQyxPQUFPO0FBQ1hDLDBCQUFNVixRQUFRVSxJQURIO0FBRVhDLGdDQUFZbEIsT0FBT21CLE9BQVAsQ0FBZVosUUFBUVcsVUFBdkIsRUFBbUNKLEdBQW5DLENBQXVDO0FBQUE7O0FBQUEsMEJBQUVWLENBQUY7QUFBQSwwQkFBS2dCLENBQUw7QUFBQSw2QkFBYTtBQUM5REgsOEJBQU1HLEVBQUVILElBRHNEO0FBRTlESSxnQ0FBUXhCLFlBQVl1QixFQUFFRSxPQUFGLENBQVVELE1BQVYsQ0FBaUJuQixNQUFqQixDQUF3QixVQUFDQyxDQUFELEVBQUlvQixLQUFKLEVBQWM7QUFDeERwQiw0QkFBRW9CLE1BQU1DLEdBQVIsSUFBZTtBQUNiQyxrQ0FBTUYsTUFBTUUsSUFBTixDQUFXQSxJQURKO0FBRWJDLHNDQUFVSCxNQUFNRSxJQUFOLENBQVdFLFVBRlI7QUFHYkMseUNBQWFMLE1BQU1FLElBQU4sQ0FBV0ksT0FBWCxDQUFtQmYsR0FBbkIsQ0FBdUIsVUFBQ2dCLEdBQUQsRUFBUztBQUMzQyxrQ0FBSUMsTUFBTUMsT0FBTixDQUFjRixHQUFkLENBQUosRUFBd0I7QUFDdEIsdUNBQU8sQ0FBQ0EsSUFBSSxDQUFKLENBQUQsRUFBU0EsSUFBSSxDQUFKLEVBQU9HLFFBQVAsRUFBVCxDQUFQO0FBQ0QsK0JBRkQsTUFFTztBQUNMLHVDQUFPSCxHQUFQO0FBQ0Q7QUFDRiw2QkFOWSxFQU1WN0IsSUFOVSxDQU1MLFVBQUNpQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUNoQixrQ0FBTUMsTUFBTUwsTUFBTUMsT0FBTixDQUFjRSxDQUFkLElBQW1CQSxFQUFFLENBQUYsQ0FBbkIsR0FBMEJBLENBQXRDO0FBQ0Esa0NBQU1HLE1BQU1OLE1BQU1DLE9BQU4sQ0FBY0csQ0FBZCxJQUFtQkEsRUFBRSxDQUFGLENBQW5CLEdBQTBCQSxDQUF0QztBQUNBLHFDQUFPQyxJQUFJRSxhQUFKLENBQWtCRCxHQUFsQixDQUFQO0FBQ0QsNkJBVlk7QUFIQSwyQkFBZjtBQWVBLGlDQUFPbEMsQ0FBUDtBQUNELHlCQWpCbUIsRUFpQmpCLEVBakJpQixDQUFaO0FBRnNELHVCQUFiO0FBQUEscUJBQXZDO0FBRkQsbUJBQWI7O0FBeUJBYSx1QkFBS0UsVUFBTCxDQUFnQmpCLElBQWhCLENBQXFCLFVBQUNpQyxDQUFELEVBQUlDLENBQUo7QUFBQSwyQkFBVUQsRUFBRWpCLElBQUYsQ0FBT3FCLGFBQVAsQ0FBcUJILEVBQUVsQixJQUF2QixDQUFWO0FBQUEsbUJBQXJCOztBQUVBLHlCQUFPRCxJQUFQO0FBQ0QsaUJBN0JnQixDOzt1QkErQlh1QixRQUFRQyxHQUFSLENBQ0psQyxTQUFTUSxHQUFULENBQWEsVUFBQ1AsT0FBRCxFQUFhO0FBQ3hCLHlCQUFPLGNBQUlrQyxJQUFKLENBQVM3QixXQUFULEVBQXNCO0FBQzNCOEIsMEJBQU0sSUFEcUI7QUFFM0JDLDBCQUFNQyxLQUFLQyxTQUFMLENBQWV0QyxPQUFmLENBRnFCO0FBRzNCdUMsNkJBQVM7QUFDUCxzQ0FBZ0I7QUFEVDtBQUhrQixtQkFBdEIsQ0FBUDtBQU9ELGlCQVJELENBREksQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWNLekMsUyIsImZpbGUiOiJjb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ290IGZyb20gJ2dvdCc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBhdHRhY2hUb0h0dHAgZnJvbSAnLi9hdHRhY2gtdG8taHR0cCc7XG5cbmZ1bmN0aW9uIG9yZGVyT2JqZWN0KG9iaikge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAga2V5cy5zb3J0KCk7XG4gIHJldHVybiBrZXlzLnJlZHVjZSgobywgaykgPT4ge1xuICAgIG9ba10gPSBvYmpba107XG4gICAgcmV0dXJuIG87XG4gIH0sIHt9KTtcbn1cblxuY2xhc3MgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IFtdO1xuICB9XG5cbiAgZXhwb3J0KHNlcnZpY2UpIHtcbiAgICB0aGlzLnNlcnZpY2VzLnB1c2goc2VydmljZSk7XG4gIH1cblxuICBhdHRhY2goc2VydmVyKSB7XG4gICAgaWYgKHNlcnZlciBpbnN0YW5jZW9mIGh0dHAuU2VydmVyKSB7XG4gICAgICAvLyBhdHRhY2ggdG8gaHR0cCBzZXJ2ZXJcbiAgICAgIGF0dGFjaFRvSHR0cChzZXJ2ZXIsIHRoaXMuc2VydmljZXMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyKHVybCkge1xuICAgIGNvbnN0IHNlcnZpY2VzVXJsID0gdXJsLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy9zZXJ2aWNlcyc7XG5cbiAgICBjb25zdCBzZXJ2aWNlcyA9IHRoaXMuc2VydmljZXMubWFwKCh7IF9fc2VydmljZTogc2VydmljZSB9KSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBuYW1lOiBzZXJ2aWNlLm5hbWUsXG4gICAgICAgIG9wZXJhdGlvbnM6IE9iamVjdC5lbnRyaWVzKHNlcnZpY2Uub3BlcmF0aW9ucykubWFwKChbaywgdl0pID0+ICh7XG4gICAgICAgICAgbmFtZTogdi5uYW1lLFxuICAgICAgICAgIGZpZWxkczogb3JkZXJPYmplY3Qodi5yZXF1ZXN0LmZpZWxkcy5yZWR1Y2UoKG8sIGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBvW2ZpZWxkLmtleV0gPSB7XG4gICAgICAgICAgICAgIHR5cGU6IGZpZWxkLnR5cGUudHlwZSxcbiAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZpZWxkLnR5cGUuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgY29uc3RyYWludHM6IGZpZWxkLnR5cGUub3B0aW9ucy5tYXAoKG9wdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdCkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBbb3B0WzBdLCBvcHRbMV0udG9TdHJpbmcoKV1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLnNvcnQoKGwsIHIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaHMgPSBBcnJheS5pc0FycmF5KGwpID8gbFswXSA6IGw7XG4gICAgICAgICAgICAgICAgY29uc3QgcmhzID0gQXJyYXkuaXNBcnJheShyKSA/IHJbMF0gOiByO1xuICAgICAgICAgICAgICAgIHJldHVybiBsaHMubG9jYWxlQ29tcGFyZShyaHMpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgIH0sIHt9KSlcbiAgICAgICAgfSkpXG4gICAgICB9O1xuXG4gICAgICBkYXRhLm9wZXJhdGlvbnMuc29ydCgobCwgcikgPT4gbC5uYW1lLmxvY2FsZUNvbXBhcmUoci5uYW1lKSk7XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBzZXJ2aWNlcy5tYXAoKHNlcnZpY2UpID0+IHtcbiAgICAgICAgcmV0dXJuIGdvdC5wb3N0KHNlcnZpY2VzVXJsLCB7XG4gICAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzZXJ2aWNlKSxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XG4iXX0=