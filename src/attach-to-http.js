import bodyParser from 'body-parser';
import { parse as parseUrl } from 'url';

const jsonBodyParser = bodyParser.json();

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
      error: err.details.map(d => d.message)
    });
  } else {
    json(res, 500, {
      error: err.message
    });
  }
}

function list(operations, res) {
  json(res, 200, operations.map(({ name, operation }) => {
    return {
      name: name,
      fields: operation.request.fields.map((f) => {
        return {
          name: f.key,
          type: f.type.type,
          required: f.type.isRequired,
          constraints: f.type.options
        };
      })
    }
  }));
}

function handleRequest({ name, operation, handler }, req, res) {
  jsonBodyParser(req, res, async () => {
    try {
      const request = await operation.request.parse(req.body);
      const data = await handler(request);
      handleSuccess(data, req, res);
    } catch (err) {
      handleError(err, req, res);
    }
  });
}

function attachToHttp(httpServer, services = []) {
  const operations = {};

  services.forEach((s) => {
    Object.values(s.__service.operations).forEach((operation) => {
      const name = `${s.__service.name}.${operation.name}`;
      const handler = operation.handler(s);
      operations[name] = {
        service: s.__service.name,
        name: name,
        operation,
        handler
      };
    });
  });

  const listeners = httpServer.listeners('request').slice(0);
  httpServer.removeAllListeners('request');
  httpServer.on('request', function(req, res) {
    if (req.method === 'POST') {
      const pathname = parseUrl(req.url).pathname.slice(1);
      if (operations[pathname]) {
        return handleRequest(operations[pathname], req, res);
      }
    }

    if (req.method === 'GET' && /^\/__services\/?($|\?|#)/.test(req.url)) {
      return list(Object.values(operations), res);
    }

    for (let idx = 0; idx < listeners.length; ++idx) {
      listeners[idx].call(httpServer, req, res);
    }
  });
}

export default attachToHttp;
