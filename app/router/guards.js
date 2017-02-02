import feathers from '../feathers';

module.exports = {

  // Restrict to authenticated users
  restrictToAuthenticated (to, from, next) {
    feathers.authenticate()
      .then(() => { next(); })
      .catch(() => { next('/login?redirect=' + to.path); });
  },

  // Restrict to unauthenticated users
  restrictToUnauthenticated (to, from, next) {
    feathers.authenticate()
      .then(() => { next(false); })
      .catch(() => { next(); });
  }

};
