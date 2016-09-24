'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _url = require('url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var jsonBodyParser = _bodyParser2.default.json();

function json(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.write(JSON.stringify(data));
  res.end();
}

function handleSuccess(data, req, res) {
  json(res, 200, data);
}

function handleError(err, req, res) {
  if (err.isBoom) {
    json(res, err.output.payload.statusCode, {
      error: err.output.payload.error,
      message: err.output.payload.message
    });
  } else if (err.isJoi) {
    json(res, 400, {
      error: err.details.map(function (d) {
        return d.message;
      })
    });
  } else {
    json(res, 500, {
      error: err.message
    });
  }
}

function list(operations, res) {
  json(res, 200, operations.map(function (_ref) {
    var name = _ref.name;
    var operation = _ref.operation;

    return {
      name: name,
      fields: operation.request.fields.map(function (f) {
        return {
          name: f.key,
          type: f.type.type,
          required: f.type.isRequired,
          constraints: f.type.options
        };
      })
    };
  }));
}

function handleRequest(_ref2, req, res) {
  var name = _ref2.name;
  var operation = _ref2.operation;
  var handler = _ref2.handler;

  var _this = this;

  jsonBodyParser(req, res, _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var request, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return operation.request.parse(req.body);

          case 3:
            request = _context.sent;
            _context.next = 6;
            return handler(request);

          case 6:
            data = _context.sent;

            handleSuccess(data, req, res);
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0.stack);
            handleError(_context.t0, req, res);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[0, 10]]);
  })));
}

function attachToHttp(httpServer) {
  var services = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var operations = {};

  services.forEach(function (s) {
    Object.values(s.__service.operations).forEach(function (operation) {
      var name = s.__service.name + '.' + operation.name;
      var handler = operation.handler(s);
      operations[name] = {
        service: s.__service.name,
        name: name,
        operation: operation,
        handler: handler
      };
    });
  });

  var listeners = httpServer.listeners('request').slice(0);
  httpServer.removeAllListeners('request');
  httpServer.on('request', function (req, res) {
    if (req.method === 'POST') {
      var pathname = (0, _url.parse)(req.url).pathname.slice(1);
      if (operations[pathname]) {
        return handleRequest(operations[pathname], req, res);
      }
    }

    if (req.method === 'GET' && /^\/__services\/?($|\?|#)/.test(req.url)) {
      return list(Object.values(operations), res);
    }

    for (var idx = 0; idx < listeners.length; ++idx) {
      listeners[idx].call(httpServer, req, res);
    }
  });
}

exports.default = attachToHttp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdHRhY2gtdG8taHR0cC5qcyJdLCJuYW1lcyI6WyJqc29uQm9keVBhcnNlciIsImpzb24iLCJyZXMiLCJzdGF0dXNDb2RlIiwiZGF0YSIsInNldEhlYWRlciIsIndyaXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsImVuZCIsImhhbmRsZVN1Y2Nlc3MiLCJyZXEiLCJoYW5kbGVFcnJvciIsImVyciIsImlzQm9vbSIsIm91dHB1dCIsInBheWxvYWQiLCJlcnJvciIsIm1lc3NhZ2UiLCJpc0pvaSIsImRldGFpbHMiLCJtYXAiLCJkIiwibGlzdCIsIm9wZXJhdGlvbnMiLCJuYW1lIiwib3BlcmF0aW9uIiwiZmllbGRzIiwicmVxdWVzdCIsImYiLCJrZXkiLCJ0eXBlIiwicmVxdWlyZWQiLCJpc1JlcXVpcmVkIiwiY29uc3RyYWludHMiLCJvcHRpb25zIiwiaGFuZGxlUmVxdWVzdCIsImhhbmRsZXIiLCJwYXJzZSIsImJvZHkiLCJjb25zb2xlIiwibG9nIiwic3RhY2siLCJhdHRhY2hUb0h0dHAiLCJodHRwU2VydmVyIiwic2VydmljZXMiLCJmb3JFYWNoIiwicyIsIk9iamVjdCIsInZhbHVlcyIsIl9fc2VydmljZSIsInNlcnZpY2UiLCJsaXN0ZW5lcnMiLCJzbGljZSIsInJlbW92ZUFsbExpc3RlbmVycyIsIm9uIiwibWV0aG9kIiwicGF0aG5hbWUiLCJ1cmwiLCJ0ZXN0IiwiaWR4IiwibGVuZ3RoIiwiY2FsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLHFCQUFXQyxJQUFYLEVBQXZCOztBQUVBLFNBQVNBLElBQVQsQ0FBY0MsR0FBZCxFQUFtQkMsVUFBbkIsRUFBK0JDLElBQS9CLEVBQXFDO0FBQ25DRixNQUFJRyxTQUFKLENBQWMsY0FBZCxFQUE4QixrQkFBOUI7QUFDQUgsTUFBSUMsVUFBSixHQUFpQkEsVUFBakI7QUFDQUQsTUFBSUksS0FBSixDQUFVQyxLQUFLQyxTQUFMLENBQWVKLElB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QUFsQyxFQUEwQyxFQUFFRCxHQUE1QyxFQUFpRDtBQUMvQ1IsZ0JBQVVRLEdBQVYsRUFBZUUsSUFBZixDQUFvQmxCLFVBQXBCLEVBQWdDakMsR0FBaEMsRUFBcUNULEdBQXJDO0FBQ0Q7QUFDRixHQWZEO0FBZ0JEOztrQkFFY3lDLFkiLCJmaWxlIjoiYXR0YWNoLXRvLWh0dHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVybCB9IGZyb20gJ3VybCc7XG5cbmNvbnN0IGpzb25Cb2R5UGFyc2VyID0gYm9keVBhcnNlci5qc29uKCk7XG5cbmZ1bmN0aW9uIGpzb24ocmVzLCBzdGF0dXNDb2RlLCBkYXRhKSB7XG4gIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gIHJlcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcbiAgcmVzLndyaXRlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgcmVzLmVuZCgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTdWNjZXNzKGRhdGEsIHJlcSwgcmVzKSB7XG4gIGpzb24ocmVzLCAyMDAsIGRhdGEpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvcihlcnIsIHJlcSwgcmVzKSB7XG4gIGlmIChlcnIuaXNCb29tKSB7XG4gICAganNvbihyZXMsIGVyci5vdXRwdXQucGF5bG9hZC5zdGF0dXNDb2RlLCB7XG4gICAgICBlcnJvcjogZXJyLm91dHB1dC5wYXlsb2FkLmVycm9yLFxuICAgICAgbWVzc2FnZTogZXJyLm91dHB1dC5wYXlsb2FkLm1lc3NhZ2VcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChlcnIuaXNKb2kpIHtcbiAgICBqc29uKHJlcywgNDAwLCB7XG4gICAgICBlcnJvcjogZXJyLmRldGFpbHMubWFwKGQgPT4gZC5tZXNzYWdlKVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGpzb24ocmVzLCA1MDAsIHtcbiAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxpc3Qob3BlcmF0aW9ucywgcmVzKSB7XG4gIGpzb24ocmVzLCAyMDAsIG9wZXJhdGlvbnMubWFwKCh7IG5hbWUsIG9wZXJhdGlvbiB9KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBmaWVsZHM6IG9wZXJhdGlvbi5yZXF1ZXN0LmZpZWxkcy5tYXAoKGYpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBmLmtleSxcbiAgICAgICAgICB0eXBlOiBmLnR5cGUudHlwZSxcbiAgICAgICAgICByZXF1aXJlZDogZi50eXBlLmlzUmVxdWlyZWQsXG4gICAgICAgICAgY29uc3RyYWludHM6IGYudHlwZS5vcHRpb25zXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgIH1cbiAgfSkpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KHsgbmFtZSwgb3BlcmF0aW9uLCBoYW5kbGVyIH0sIHJlcSwgcmVzKSB7XG4gIGpzb25Cb2R5UGFyc2VyKHJlcSwgcmVzLCBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBvcGVyYXRpb24ucmVxdWVzdC5wYXJzZShyZXEuYm9keSk7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgaGFuZGxlcihyZXF1ZXN0KTtcbiAgICAgIGhhbmRsZVN1Y2Nlc3MoZGF0YSwgcmVxLCByZXMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyLnN0YWNrKTtcbiAgICAgIGhhbmRsZUVycm9yKGVyciwgcmVxLCByZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGF0dGFjaFRvSHR0cChodHRwU2VydmVyLCBzZXJ2aWNlcyA9IFtdKSB7XG4gIGNvbnN0IG9wZXJhdGlvbnMgPSB7fTtcblxuICBzZXJ2aWNlcy5mb3JFYWNoKChzKSA9PiB7XG4gICAgT2JqZWN0LnZhbHVlcyhzLl9fc2VydmljZS5vcGVyYXRpb25zKS5mb3JFYWNoKChvcGVyYXRpb24pID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBgJHtzLl9fc2VydmljZS5uYW1lfS4ke29wZXJhdGlvbi5uYW1lfWA7XG4gICAgICBjb25zdCBoYW5kbGVyID0gb3BlcmF0aW9uLmhhbmRsZXIocyk7XG4gICAgICBvcGVyYXRpb25zW25hbWVdID0ge1xuICAgICAgICBzZXJ2aWNlOiBzLl9fc2VydmljZS5uYW1lLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBvcGVyYXRpb24sXG4gICAgICAgIGhhbmRsZXJcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IGxpc3RlbmVycyA9IGh0dHBTZXJ2ZXIubGlzdGVuZXJzKCdyZXF1ZXN0Jykuc2xpY2UoMCk7XG4gIGh0dHBTZXJ2ZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZXF1ZXN0Jyk7XG4gIGh0dHBTZXJ2ZXIub24oJ3JlcXVlc3QnLCBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgIGlmIChyZXEubWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgIGNvbnN0IHBhdGhuYW1lID0gcGFyc2VVcmwocmVxLnVybCkucGF0aG5hbWUuc2xpY2UoMSk7XG4gICAgICBpZiAob3BlcmF0aW9uc1twYXRobmFtZV0pIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZVJlcXVlc3Qob3BlcmF0aW9uc1twYXRobmFtZV0sIHJlcSwgcmVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ0dFVCcgJiYgL15cXC9fX3NlcnZpY2VzXFwvPygkfFxcP3wjKS8udGVzdChyZXEudXJsKSkge1xuICAgICAgcmV0dXJuIGxpc3QoT2JqZWN0LnZhbHVlcyhvcGVyYXRpb25zKSwgcmVzKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBsaXN0ZW5lcnMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgbGlzdGVuZXJzW2lkeF0uY2FsbChodHRwU2VydmVyLCByZXEsIHJlcyk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXR0YWNoVG9IdHRwO1xuIl19