import feathers from '../../feathers';

const state = {
  options: {page: 1, genre: undefined},
  movies: []
};

const getters = {
  getMovies (state) {
    return state.movies;
  },
  getOptions (state) {
    return state.options;
  },
  getGenre (state) {
    return state.options.genre;
  }
};
var extend = function (a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};
const mutations = {
  ADD_MOVIES (state, moviesList) {
    console.log('mutation add')
    state.movies.push(...moviesList);
  },
  REPLACE_MOVIES (state, moviesList) {
    console.log('mutation replace')
    state.movies = moviesList
  },
  SET_OPTIONS (state, options) {
    state.options = extend(state.options, options)
  },
  SET_GENRE (state, genre) {
    state.options.genre = genre;
  },
  SET_PAGE (state, page) {
    state.options.page = page;
  }
};

const actions = {
  listMovies: ({dispatch, commit}, {mode = 'ADD'}) => {
    return feathers.service('movies').find({query: state.options}).then(result => { commit((mode) + '_MOVIES', result); });
  },
  getPages: ({dispatch, commit}) => {
    return feathers.service('movies').find().then(result => {console.log(result)})
  },
  searchMovies: ({dispatch, commit}) => {
    feathers.service('movies').find()
    var kw = state.options.keywords;
    feathers.service('movies').find()
    .then(pagesList => {
      for (let i = 0, j = pagesList.length - 1; i <= j; i++) {
        feathers.service('movies').find({query: {page: i + 1, keywords: kw}})
        .then(result => commit( (i == 0 ? 'REPLACE' : 'ADD') + '_MOVIES', result))
        .catch( err => console.log('error: ' + err))
      }
    })
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
