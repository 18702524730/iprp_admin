angular.module("iprpAdminApp").factory("czOutList", function($resource,$stateParams,session) {
    return $resource(options.api.base_url + '/findIssueListByParams/:orde_id',{order_id:'@orde_id',access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
        'note':{
            url:options.api.base_url + '/updateIssue',
            method:'GET',
            isArray: false
        },
        'detail':{
            url:options.api.base_url + '/getIssueDetail',
            method:'GET',
            isArray: false
        }
    })
});
