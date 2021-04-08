angular.module("iprpAdminApp").factory("mallServiceClassService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/businessClasses/:bs_class_id',{bs_class_id:'@bs_class_id',access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false,
            params:{
                bs_class_id : $stateParams.bs_class_id
            }
        },
        //设置服务搜索系数
        'updateSearchCoefficient':{
        		url: options.api.base_url + '/updateSearchCoefficient',
            method:'POST',
            isArray: false,
        },
        'manageList':{
            method:'POST',
            isArray: false,
            url: options.api.base_url + '/storeService'
        },
        'shopServiceDetail':{
            method:'GET',
            isArray: false,
            url: options.api.base_url + '/storeService'
        },
        'checkPass':{
            method:'POST',
            isArray: false,
            url: options.api.base_url + '/verify'
        },
    });
});
