var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignUpController', ['$https', '$location', 'handleError', 'fwhAuth', function($https, $location, handleError, auth) {
    this.signup = true;
    this.errors = [];
    this.buttonText = 'Submit';
    this.authenticate = function(user) {
      $https.post(baseUrl + '/api/signup', user)
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getEmail();
          $location.path('/userprofile');
        }, handleError(this.errors, 'Could not create user.'));
    };
  }]);
};
