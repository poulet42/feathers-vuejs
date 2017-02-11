import feathers from '../../feathers';

const state = {
  movies: []
};

const getters = {
  getMovies (state) {
    console.log('getter called !', state.movies);
    return state.movies;
  }
};

const mutations = {
  ADD_MOVIES (state, moviesList) {
    state.movies.push(...moviesList);
  },
  REPLACE_MOVIES (state, moviesList) {
    state.movies = moviesList
  }
};

const actions = {
  listMovies: ({dispatch, commit}, {mode, query}) => {
    if (typeof mode == 'undefined') { mode = 'ADD' }
    console.log("query : ", query)
    return feathers.service('movies').find({query})
    .then(result => { commit((mode || 'ADD') + '_MOVIES', result); });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
