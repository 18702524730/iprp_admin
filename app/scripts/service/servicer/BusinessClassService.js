angular.module("iprpAdminApp").factory("BusinessClassService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/businessClasses/:bs_class_id',{bs_class_id:'@bs_class_id',access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false,
            params:{
                bs_class_id : $stateParams.bs_class_id
            }
        },
        'detail_businessClass':{
            method:'GET',
            isArray: false,
            params:{
                bs_class_id : $stateParams.bs_class_id
            }
        },
        'findChildByParentId':{
            method:'GET',
            isArray: false
        },
        'common_findChildByParentId':{
           url:options.api.base_url + '/common/businessClasses',
           method:'GET',
           isArray: false
        },
        'edit':{
            method:'PUT',
            isArray: false,
            params:{
                bs_class_id : $stateParams.bs_class_id
            }
        },
        'add_business_class':{
            url:options.api.base_url + '/businessClasses',
            method:'POST',
            isArray: false
        },
        'delete':{
            method: 'DELETE',
            isArray: false,
            params :{
                bs_class_id : $stateParams.bs_class_id
            }
        },
        'deleteBatch':{
            method: 'DELETE',
            isArray: false
        },
        'business_class_tree':{
            url:options.api.base_url + '/business_classes/tree',
            method:'GET',
            isArray: true
        },
        'business_class_second':{
           url:options.api.base_url + '/business_classes/second',
            method:'GET',
            isArray: true
        },
        'business_class':{
            url:options.api.base_url + '/businesses_class_all',
            method:'GET',
            isArray: true
        },
        'getidcode':{
            url:options.api.base_url + '/getidcode',
            method:'GET',
            isArray: false
        }
    })
});
