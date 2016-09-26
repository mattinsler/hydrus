import got from 'got';
import http from 'http';
import attachToHttp from './attach-to-http';

function orderObject(obj) {
  const keys = Object.keys(obj);
  keys.sort();
  return keys.reduce((o, k) => {
    o[k] = obj[k];
    return o;
  }, {});
}

class Container {
  constructor() {
    this.services = [];
  }

  export(service) {
    this.services.push(service);
  }

  attach(server) {
    if (server instanceof http.Server) {
      // attach to http server
      attachToHttp(server, this.services);
    }
  }

  async register(url) {
    const servicesUrl = url.replace(/\/+$/, '') + '/services';

    const services = this.services.map(({ __service: service }) => {
      const data = {
        name: service.name,
        operations: Object.entries(service.operations).map(([k, v]) => ({
          name: v.name,
          fields: orderObject(v.request.fields.reduce((o, field) => {
            o[field.key] = {
              type: field.type.type,
              required: field.type.isRequired,
              constraints: field.type.options.map((opt) => {
                if (Array.isArray(opt)) {
                  return [opt[0], opt[1].toString()]
                } else {
                  return opt;
                }
              }).sort((l, r) => {
                const lhs = Array.isArray(l) ? l[0] : l;
                const rhs = Array.isArray(r) ? r[0] : r;
                return lhs.localeCompare(rhs);
              })
            };
            return o;
          }, {}))
        }))
      };

      data.operations.sort((l, r) => l.name.localeCompare(r.name));

      return data;
    });

    await Promise.all(
      services.map((service) => {
        return got.post(servicesUrl, {
          json: true,
          body: JSON.stringify(service),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      })
    );
  }
}

export default Container;
