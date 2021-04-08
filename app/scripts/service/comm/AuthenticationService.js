angular.module('iprpAdminApp').factory('AuthenticationService', function ($rootScope,$q) {

    var AuthenticationService = $rootScope.$new();
    AuthenticationService.needAuthentication = function () {
        AuthenticationService.$emit('NeedAuthentication');
    };

    AuthenticationService.accessForbidden = function () {
        AuthenticationService.$emit('AccessForbidden');
    };

    AuthenticationService.HttpResponseAuthHandlerMap = {
        'responseError': function (response) {
            console.log(response)
            if (response.status === 401) {
                AuthenticationService.$emit('NeedAuthentication');
            } else if (response.status === 403) {
                AuthenticationService.$emit('AccessForbidden');
            } else if(response.status <200 || response.status > 299){
                return $q.reject(response);
            }
            return response;
        }
    };

    return AuthenticationService;
});
