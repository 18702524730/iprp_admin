angular.module("iprpAdminApp").factory("PostalService", function($resource,$httpParamSerializer,$stateParams,session) {
    return $resource(options.api.base_url + '/spAdvise/:spAdviseId',{spAdviseId:'@spAdviseId',access_token:function(){return session.accessToken}},{
        'list':{
            url:options.api.base_url + '/portalsite/mainConfirmation/findMainConfirmationBy.htm',
            method:'GET',
            isArray: false
        },
        'edit':{
            url:options.api.base_url + '/portalsite/mainConfirmation/addMain.htm',
            method:'POST',
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            //isArray: false,
            /*transformRequest: function(data) {
                return $httpParamSerializer(data);
            }*/
        },
        'export':{
            url:options.api.base_url + '/portalsite/mainConfirmation/downXlsx.htm',
            method:'GET',
            isArray: false
        },
        // 查询意见反馈列表 
        'findOpinionFeedback':{
            url:options.api.base_url + '/findOpinionFeedback',
            method:'GET',
            isArray: false
        },
        // 编辑意见反馈列表
        'updateOpinionFeedback':{
            url:options.api.base_url + '/updateOpinionFeedback',
            method:'POST',
            isArray: false
        },
    })
});
