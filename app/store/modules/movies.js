import feathers from '../../feathers';

const state = {
  options: {page: 1, genre: ''},
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
  }
};

const actions = {
  listMovies: ({dispatch, commit}, {mode = 'ADD', query}) => {
    return feathers.service('movies').find({query}).then(result => { commit((mode) + '_MOVIES', result); });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
