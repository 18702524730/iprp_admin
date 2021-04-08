angular.module("iprpAdminApp").factory("keerperReport", function($resource,$stateParams,session) {
    return $resource(options.api.base_url + '/findAllReport/:orde_id',{order_id:'@orde_id',access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
        'note':{
            url:options.api.base_url + '/applyReport',
            method:'GET',
            isArray: false
        },
        'detail':{
            url:options.api.base_url + '/findReportDetails',
            method:'GET',
            isArray: false
        },
        'downfile':{
            url:options.api.base_url + '/downFile',
            method:'GET',
            isArray: false
        }
    })
});
