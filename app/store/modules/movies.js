import feathers from '../../feathers';

const state = {
  movies: []
};

const getters = {
  getMovies (state) {
    console.log('getter called !', state.movies)
    return state.movies;
  }
};

const mutations = {
  populate (state, moviesList) {
    console.log(moviesList.length, moviesList)
    state.movies.push(...moviesList)
  }
};

const actions = {
  listMovies: ({dispatch, commit}, payload) => {
    return feathers.service('movies').find({query: payload})
    .then(result => {commit('populate', result)});
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
