angular.module("iprpAdminApp").factory("LimitsService", function($resource,$stateParams,session) {

      return {
          groups :$resource(options.api.base_url + '/groups/:fg_id',{fg_id:'@fg_id',access_token:function(){return session.accessToken}},{
              'all_group':{
                method: 'GET',
                isArray: false
              },
              'common_group':{
                  url:options.api.base_url + '/common/groups',
                  method: 'GET',
                  isArray: false
              },
              'groupDetail':{
                method: 'GET',
                isArray: false,
                params :{
                  fg_id : $stateParams.fg_id
                }
              },
              'addGroup':{
                  url:options.api.base_url + '/add/group',
                  method: 'POST',
                  isArray: false
              },
              'updateGroup':{
                  method: 'PUT',
                  isArray: false,
                  params :{
                      fg_id : $stateParams.fg_id
                  }
              },
              'delete':{
                method: 'DELETE',
                isArray: false,
                params :{
                  fg_id : $stateParams.fg_id
                }
              },
              'deleteBatch':{
                  method: 'DELETE',
                  isArray: false
              }
          })
      }
});
