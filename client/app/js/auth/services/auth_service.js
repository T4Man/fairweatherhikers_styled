var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.factory('fwhAuth', ['$https', '$q', function($https, $q) {
    return {
      removeToken: function() {
        this.token = null;
        this.email = null;
        $https.defaults.headers.common.token = null;
        window.localStorage.token = '';
      },
      saveToken: function(token) {
        this.token = token;
        $https.defaults.headers.common.token = token;
        window.localStorage.token = token;
        return token;
      },
      getToken: function() {
        this.token = this.token || this.saveToken(window.localStorage.token);
        return this.token;
      },
      getEmail: function() {
        return $q(function(resolve, reject) {
          if (this.email) return resolve(this.email);
          if (!this.getToken()) return reject(new Error('No valid token.'));

          $https.get(baseUrl + '/api/userprofile')
            .then((res) => {
              this.email = res.data.email;
              resolve(res.data.email);
            }, reject);
        }.bind(this));
      }
    };
  }]);
};
