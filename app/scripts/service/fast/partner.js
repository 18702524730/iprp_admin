angular.module("iprpAdminApp").factory("partnerService", function($resource,$stateParams,session) {
    return $resource(options.api.base_url + '/findMajorByParm',{access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
    })
});
