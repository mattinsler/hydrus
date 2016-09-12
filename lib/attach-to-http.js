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
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            handleError(_context.t0, req, res);

          case 13:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdHRhY2gtdG8taHR0cC5qcyJdLCJuYW1lcyI6WyJqc29uQm9keVBhcnNlciIsImpzb24iLCJyZXMiLCJzdGF0dXNDb2RlIiwiZGF0YSIsInNldEhlYWRlciIsIndyaXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsImVuZCIsImhhbmRsZVN1Y2Nlc3MiLCJyZXEiLCJoYW5kbGVFcnJvciIsImVyciIsImlzQm9vbSIsIm91dHB1dCIsInBheWxvYWQiLCJlcnJvciIsIm1lc3NhZ2UiLCJpc0pvaSIsImRldGFpbHMiLCJtYXAiLCJkIiwibGlzdCIsIm9wZXJhdGlvbnMiLCJuYW1lIiwib3BlcmF0aW9uIiwiZmllbGRzIiwicmVxdWVzdCIsImYiLCJrZXkiLCJ0eXBlIiwicmVxdWlyZWQiLCJpc1JlcXVpcmVkIiwiY29uc3RyYWludHMiLCJvcHRpb25zIiwiaGFuZGxlUmVxdWVzdCIsImhhbmRsZXIiLCJwYXJzZSIsImJvZHkiLCJhdHRhY2hUb0h0dHAiLCJodHRwU2VydmVyIiwic2VydmljZXMiLCJmb3JFYWNoIiwicyIsIk9iamVjdCIsInZhbHVlcyIsIl9fc2VydmljZSIsInNlcnZpY2UiLCJsaXN0ZW5lcnMiLCJzbGljZSIsInJlbW92ZUFsbExpc3RlbmVycyIsIm9uIiwibWV0aG9kIiwicGF0aG5hbWUiLCJ1cmwiLCJ0ZXN0IiwiaWR4IiwibGVuZ3RoIiwiY2FsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLHFCQUFXQyxJQUFYLEVBQXZCOztBQUVBLFNBQVNBLElBQVQsQ0FBY0MsR0FBZCxFQUFtQkMsVUFBbkIsRUFBK0JDLElBQS9CLEVBQXFDO0FBQ25DRixNQUFJRyxTQUFKLENBQWMsY0FBZCxFQUE4QixrQkFBOUI7QUFDQUgsTUFBSUMsVUFBSixHQUFpQkEsVUFBakI7QUFDQUQsTUFBSUksS0FBSixDQUFVQyxLQUFLQyxTQUFMLENBQWVKLElBQWYsQ0FBVjtBQUNBRixNQUFJTyxHQUFK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QW9CbEIsVUFBcEIsRUFBZ0M5QixHQUFoQyxFQUFxQ1QsR0FBckM7QUFDRDtBQUNGLEdBZkQ7QUFnQkQ7O2tCQUVjc0MsWSIsImZpbGUiOiJhdHRhY2gtdG8taHR0cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCB7IHBhcnNlIGFzIHBhcnNlVXJsIH0gZnJvbSAndXJsJztcblxuY29uc3QganNvbkJvZHlQYXJzZXIgPSBib2R5UGFyc2VyLmpzb24oKTtcblxuZnVuY3Rpb24ganNvbihyZXMsIHN0YXR1c0NvZGUsIGRhdGEpIHtcbiAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgcmVzLnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xuICByZXMud3JpdGUoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICByZXMuZW5kKCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVN1Y2Nlc3MoZGF0YSwgcmVxLCByZXMpIHtcbiAganNvbihyZXMsIDIwMCwgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVycm9yKGVyciwgcmVxLCByZXMpIHtcbiAgaWYgKGVyci5pc0Jvb20pIHtcbiAgICBqc29uKHJlcywgZXJyLm91dHB1dC5wYXlsb2FkLnN0YXR1c0NvZGUsIHtcbiAgICAgIGVycm9yOiBlcnIub3V0cHV0LnBheWxvYWQuZXJyb3IsXG4gICAgICBtZXNzYWdlOiBlcnIub3V0cHV0LnBheWxvYWQubWVzc2FnZVxuICAgIH0pO1xuICB9IGVsc2UgaWYgKGVyci5pc0pvaSkge1xuICAgIGpzb24ocmVzLCA0MDAsIHtcbiAgICAgIGVycm9yOiBlcnIuZGV0YWlscy5tYXAoZCA9PiBkLm1lc3NhZ2UpXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAganNvbihyZXMsIDUwMCwge1xuICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbGlzdChvcGVyYXRpb25zLCByZXMpIHtcbiAganNvbihyZXMsIDIwMCwgb3BlcmF0aW9ucy5tYXAoKHsgbmFtZSwgb3BlcmF0aW9uIH0pID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGZpZWxkczogb3BlcmF0aW9uLnJlcXVlc3QuZmllbGRzLm1hcCgoZikgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGYua2V5LFxuICAgICAgICAgIHR5cGU6IGYudHlwZS50eXBlLFxuICAgICAgICAgIHJlcXVpcmVkOiBmLnR5cGUuaXNSZXF1aXJlZCxcbiAgICAgICAgICBjb25zdHJhaW50czogZi50eXBlLm9wdGlvbnNcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgfVxuICB9KSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVJlcXVlc3QoeyBuYW1lLCBvcGVyYXRpb24sIGhhbmRsZXIgfSwgcmVxLCByZXMpIHtcbiAganNvbkJvZHlQYXJzZXIocmVxLCByZXMsIGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IG9wZXJhdGlvbi5yZXF1ZXN0LnBhcnNlKHJlcS5ib2R5KTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBoYW5kbGVyKHJlcXVlc3QpO1xuICAgICAgaGFuZGxlU3VjY2VzcyhkYXRhLCByZXEsIHJlcyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBoYW5kbGVFcnJvcihlcnIsIHJlcSwgcmVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhdHRhY2hUb0h0dHAoaHR0cFNlcnZlciwgc2VydmljZXMgPSBbXSkge1xuICBjb25zdCBvcGVyYXRpb25zID0ge307XG5cbiAgc2VydmljZXMuZm9yRWFjaCgocykgPT4ge1xuICAgIE9iamVjdC52YWx1ZXMocy5fX3NlcnZpY2Uub3BlcmF0aW9ucykuZm9yRWFjaCgob3BlcmF0aW9uKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gYCR7cy5fX3NlcnZpY2UubmFtZX0uJHtvcGVyYXRpb24ubmFtZX1gO1xuICAgICAgY29uc3QgaGFuZGxlciA9IG9wZXJhdGlvbi5oYW5kbGVyKHMpO1xuICAgICAgb3BlcmF0aW9uc1tuYW1lXSA9IHtcbiAgICAgICAgc2VydmljZTogcy5fX3NlcnZpY2UubmFtZSxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgb3BlcmF0aW9uLFxuICAgICAgICBoYW5kbGVyXG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcblxuICBjb25zdCBsaXN0ZW5lcnMgPSBodHRwU2VydmVyLmxpc3RlbmVycygncmVxdWVzdCcpLnNsaWNlKDApO1xuICBodHRwU2VydmVyLnJlbW92ZUFsbExpc3RlbmVycygncmVxdWVzdCcpO1xuICBodHRwU2VydmVyLm9uKCdyZXF1ZXN0JywgZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICBjb25zdCBwYXRobmFtZSA9IHBhcnNlVXJsKHJlcS51cmwpLnBhdGhuYW1lLnNsaWNlKDEpO1xuICAgICAgaWYgKG9wZXJhdGlvbnNbcGF0aG5hbWVdKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVSZXF1ZXN0KG9wZXJhdGlvbnNbcGF0aG5hbWVdLCByZXEsIHJlcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcS5tZXRob2QgPT09ICdHRVQnICYmIC9eXFwvX19zZXJ2aWNlc1xcLz8oJHxcXD98IykvLnRlc3QocmVxLnVybCkpIHtcbiAgICAgIHJldHVybiBsaXN0KE9iamVjdC52YWx1ZXMob3BlcmF0aW9ucyksIHJlcyk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgbGlzdGVuZXJzLmxlbmd0aDsgKytpZHgpIHtcbiAgICAgIGxpc3RlbmVyc1tpZHhdLmNhbGwoaHR0cFNlcnZlciwgcmVxLCByZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGF0dGFjaFRvSHR0cDtcbiJdfQ==