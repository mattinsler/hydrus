'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _attachToHttp = require('./attach-to-http');

var _attachToHttp2 = _interopRequireDefault(_attachToHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  }]);

  return Container;
}();

exports.default = Container;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250YWluZXIuanMiXSwibmFtZXMiOlsiQ29udGFpbmVyIiwic2VydmljZXMiLCJzZXJ2aWNlIiwicHVzaCIsInNlcnZlciIsIlNlcnZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxTO0FBQ0osdUJBQWM7QUFBQTs7QUFDWixTQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0Q7Ozs7NEJBRU1DLE8sRUFBUztBQUNkLFdBQUtELFFBQUwsQ0FBY0UsSUFBZCxDQUFtQkQsT0FBbkI7QUFDRDs7OzJCQUVNRSxNLEVBQVE7QUFDYixVQUFJQSxrQkFBa0IsZUFBS0MsTUFBM0IsRUFBbUM7QUFDakM7QUFDQSxvQ0FBYUQsTUFBYixFQUFxQixLQUFLSCxRQUExQjtBQUNEO0FBQ0Y7Ozs7OztrQkFHWUQsUyIsImZpbGUiOiJjb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBhdHRhY2hUb0h0dHAgZnJvbSAnLi9hdHRhY2gtdG8taHR0cCc7XG5cbmNsYXNzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2VydmljZXMgPSBbXTtcbiAgfVxuXG4gIGV4cG9ydChzZXJ2aWNlKSB7XG4gICAgdGhpcy5zZXJ2aWNlcy5wdXNoKHNlcnZpY2UpO1xuICB9XG5cbiAgYXR0YWNoKHNlcnZlcikge1xuICAgIGlmIChzZXJ2ZXIgaW5zdGFuY2VvZiBodHRwLlNlcnZlcikge1xuICAgICAgLy8gYXR0YWNoIHRvIGh0dHAgc2VydmVyXG4gICAgICBhdHRhY2hUb0h0dHAoc2VydmVyLCB0aGlzLnNlcnZpY2VzKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xuIl19