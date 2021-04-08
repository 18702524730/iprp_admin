angular.module("iprpAdminApp").factory("MemberApplicationService", function($resource,session,$stateParams) {

      return $resource(options.api.base_url + '/memberApplications/:member_id',{member_id:'@member_id',access_token:function(){return session.accessToken}},{
            'member_all':{
              method:'GET',
              isArray: false
            },
             "detail":{
               method:'GET',
               isArray: false,
               params:{
                 member_id : $stateParams.member_id
               }
             },
            'update_status':{
                url:options.api.base_url + '/memberApplications/:member_id/status',
                method:'PUT',
                isArray: false,
                params:{
                    member_id : $stateParams.member_id
                }
            },
             'update':{
               method:'PUT',
               isArray: false,
               params:{
                 member_id : $stateParams.member_id
               }
             },
             'delete':{
               method:'DELETE',
               isArray: false,
               params:{
                 member_id : $stateParams.member_id
               }
             }
      })
});
