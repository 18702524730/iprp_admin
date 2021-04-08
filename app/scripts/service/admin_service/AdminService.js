angular.module("iprpAdminApp").factory("AdminService", function($resource,$stateParams,session) {

      return $resource(options.api.base_url + '/admins/:admin_id',{admin_id:'@admin_id',access_token:function(){return session.accessToken}},{
          'admin_all': {
            method: 'GET',
            isArray: false
          },
          'getDetail':{
            method: 'GET',
            isArray:false,
            params :{
              admin_id : $stateParams.admin_id
            }
          },
          'update':{
            method: 'PUT',
            isArray: false,
            params :{
              admin_id : $stateParams.admin_id
            }
          },
          'add_admin':{
            url:options.api.base_url + '/add/admin',
            method: 'POST',
            isArray: false
          },
          'delete':{
            method: 'DELETE',
            isArray: false,
            params :{
              admin_id : $stateParams.admin_id
            }
          },
          'deleteBatch':{
            method: 'DELETE',
            isArray: false
          },
          'admin_manage':{
              url:options.api.base_url + '/token/admin',
              method: 'GET',
              isArray: false
          }
      });
});
