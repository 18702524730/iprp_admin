angular.module("iprpAdminApp").factory("MemberStatisticsService", function($resource,session,$stateParams) {

    return $resource(options.api.base_url + '/welcome/members/statistics',{access_token:function(){return session.accessToken}},{
        'member_count':{
            method:'GET',
            isArray: true
        },
        'application_member_count':{
            url:options.api.base_url + '/welcome/membersApplication/statistics',
            method:'GET',
            isArray:true
        }
    })
});
