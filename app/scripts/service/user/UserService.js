angular.module("iprpAdminApp").factory("UserService", function($resource,session) {

  return{
      adminLogin : $resource(options.api.base_url + '/login', {}, {
        "login": {
          method: 'POST',
          isArray: false
        }
      }),
      updatePassword : $resource(options.api.base_url + '/up_password',{access_token:function(){return session.accessToken}},{
         "put":{
           method: 'PUT',
           isArray: false
         }
      }),
      logOut : $resource(options.api.base_url + '/logout',{access_token:function(){return session.accessToken}},{
        "put":{
           method: 'PUT',
           isArray: false
        } 
      })
  }
});
