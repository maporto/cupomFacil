/* jshint -W117, -W030 */
describe('login', function() {
  describe('state', function() {
    var views = {
      login: 'app/login/login.html'
    };

    beforeEach(function() {
      module('app.login');
      bard.inject('$location', '$rootScope', '$state', '$templateCache');
      $templateCache.put(views.core, '');
    });

    it('should map /login route to 404 View template', function() {
      expect($state.get('login').templateUrl).to.equal(views.login);
    });
  });
});
