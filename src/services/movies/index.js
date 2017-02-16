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
  baseUrl: 'http://localhost:5000/',
  json: true
});
class Service {
  constructor (options) {
    this.options = options || {};
  }
  find (params) {
    let defaultOpt = {page: undefined, sort: undefined, order: undefined, genre: undefined, keywords: undefined},
    qs = extend(defaultOpt, params.query);
    let page = qs.page;
    qs.page = undefined;
    console.log(params.query);
    return makeRequest({uri: (typeof page != "undefined" ? '/movies/' + page : '/movies'), qs})
    .then((result) => { return result; })
    .catch((err) => { console.log('attontion !!!', err); });
  }

  get (id, params) {
    console.log(id)
    return makeRequest({uri: '/movie_details.json', qs: {movie_id: id}})
    .then((result) => { return result.data.movie; })
    .catch((err) => { console.log('attontion !!!', err); });
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
