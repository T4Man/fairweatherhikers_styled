const angular = require('angular');
require('angular-mocks');

describe('User controller', function() {
  var $controller;

  beforeEach(angular.mock.module('demoApp'));
  beforeEach(angular.mock.inject(function(_$controller_){
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var userctrl = $controller('UserprofileController');
    expect(typeof userctrl).toBe('object');
    expect(typeof userctrl.addUserprofile).toBe('function');
    expect('kregg').not.toBe('givingUsUp');
  });
});
