import feathers from '../../feathers';

const state = {
  token: null,
  user: {}
};

const getters = {
  isAuthenticated (state) {
    return state.token !== null;
  }
};

const mutations = {
  LOGIN (state, result) {
    state.token = result.token;
    state.user = result.data;
  },
  LOGOUT (state) {
    state.token = null;
    state.user = {};
  }
};

const actions = {
  // Verify authentication with token from local storage
  authenticate: ({commit}) => {
    return feathers.authenticate()
      .then(result => commit('LOGIN', result));
  },
  // Login user with email / password
  login: ({commit}, payload) => {
    return feathers.authenticate({type: 'local', ...payload})
      .then(result => commit('LOGIN', result));
  },
  // Logout user
  logout: ({commit}) => {
    return feathers.logout()
      .then(result => commit('LOGOUT'));
  },
  // Register and login new user
  register: ({dispatch, commit}, payload) => {
    return feathers.service('users').create({...payload})
      .then(result => dispatch('login', {...payload}));
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
