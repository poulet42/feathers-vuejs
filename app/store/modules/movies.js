import feathers from '../../feathers';

const state = {
  options: {page: 1, genre: undefined},
  movies: []
};

const getters = {
  getMovies (state) {
    console.log('getter called !', state.movies);
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
    state.movies.push(...moviesList);
  },
  REPLACE_MOVIES (state, moviesList) {
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
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
