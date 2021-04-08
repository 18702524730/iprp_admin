angular.module("iprpAdminApp").factory("HighTechEnterprisesService", function($resource,$httpParamSerializer,$stateParams,session) {
    return $resource(options.api.base_url + '/spAdvise/:spAdviseId',{spAdviseId:'@spAdviseId',access_token:function(){return session.accessToken}},{
        'list':{
            url:options.api.base_url + '/portalsite/hightech/findHightech.htm',
            method:'GET',
            isArray: false
        },
        'addRemarks':{
            url:options.api.base_url + '/portalsite/hightech/addRemarks.htm',
            method:'POST',
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            //isArray: false,
            /*transformRequest: function(data) {
                return $httpParamSerializer(data);
            }*/
        },
    })
});
