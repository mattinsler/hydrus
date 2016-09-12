import http from 'http';
import attachToHttp from './attach-to-http';

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
}

export default Container;
