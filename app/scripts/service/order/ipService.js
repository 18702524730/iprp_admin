angular.module("iprpAdminApp").factory("ipService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/findPatentJudgeOrderDetail/:orderSn',{orderSn:'@orderSn',access_token:function(){return session.accessToken}},{
        'list':{
            url:options.api.base_url + '/findPatentJudgeOrderList',
            method:'GET',
            isArray: false
        },
        'orderDetail':{
            url:options.api.base_url + '/findPatentJudgeOrderDetail/:orderSn',
            method:'GET',
            isArray: false,
            params:{
                orderSn : $stateParams.orderSn
            }
        },
        'handlePatentJudgeOrder':{
            url:options.api.base_url + '/handlePatentJudgeOrder',
            method:'PUT',
            isArray: false,
        },
        // 保护投诉（官网）-列表
        'ipProtectList':{
           url:rootConfigNew.adminUrl + '/iprp_operator/api/ipprotect/ipProtectList',
           method:'GET',
           isArray: false
        },
        // 保护投诉（官网）-操作（受理/结案反馈）
        'updateIpProtectInfo':{
            url:rootConfigNew.adminUrl + '/iprp_operator/api/ipprotect/updateIpProtectInfo',
            method:'GET',
            isArray: false,
        },
        // 保护投诉（官网）-详情
        'ipProtectDetail':{
            url:options.api.base_url + '/ipprotect/ipProtectDetail',
            method:'GET',
            isArray: false,
            params:{
                businessSn : $stateParams.businessSn
            }
        },
        // 电商侵权投诉-列表  1,电商侵权投诉；2,电商维权申诉,3;质量抽检鉴定;4,海关知产保护
        'findStereoProtectOrderList':{
            url:options.api.base_url + '/findStereoProtectOrderList',
            method:'GET',
            isArray: false
        },
        // 电商侵权投诉-详情
        'findStereoProtectOrderDetail':{
            url:options.api.base_url + '/findStereoProtectOrderDetail/:orderSn',
            method:'GET',
            isArray: false,
            params:{
                orderSn : $stateParams.orderSn
            }
        },
        // 电商侵权投诉-操作（受理/结案反馈）
        'handleStereoProtectOrder':{
            url:options.api.base_url + '/handleStereoProtectOrder',
            method:'PUT',
            isArray: false,
        },
        // 维权公司案件-查询列表
        'findSafeguardCompanyCaseList':{
            url:options.api.base_url + '/findSafeguardCompanyCaseList',
            method:'GET',
            isArray: false
        },
        // 维权公司案件详情
        'findSafeguardCompanyCaseDetail':{
            url:options.api.base_url + '/findSafeguardCompanyCaseDetail/:orderSn',
            method:'GET',
            isArray: false,
            params:{
                orderSn : $stateParams.orderSn
            }
        },
    })
});

