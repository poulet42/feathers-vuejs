'use strict';

const hooks = require('./hooks');
const request = require('request-promise');
var extend = function (a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};
const makeRequest = request.defaults({
  baseUrl: 'https://yts.ag/api/v2',
  json: true
});
class Service {
  constructor (options) {
    this.options = options || {};
  }
  find (params) {
    let defaultOpt = {page: 1, sort_by: 'date_added', order_by: 'desc', query_term: null, genre: null},
      qs = extend(defaultOpt, params.query);
    return makeRequest({uri: '/list_movies.json', qs})
    .then((result) => { return result.data.movies; })
    .catch((err) => { console.log('attontion !!!', err); });
  }

  get (id, params) {
    return makeRequest('/${id}');
  }

  // create(data, params) {
  //   if(Array.isArray(data)) {
  //     return Promise.all(data.map(current => this.create(current)));
  //   }

  //   return Promise.resolve(data);
  // }

  // update(id, data, params) {
  //   return Promise.resolve(data);
  // }

  // patch(id, data, params) {
  //   return Promise.resolve(data);
  // }

  // remove(id, params) {
  //   return Promise.resolve({ id });
  // }
}

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/movies', new Service());

  // Get our initialize service to that we can bind hooks
  const moviesService = app.service('/movies');

  // Set up our before hooks
  moviesService.before(hooks.before);

  // Set up our after hooks
  moviesService.after(hooks.after);
};

module.exports.Service = Service;
