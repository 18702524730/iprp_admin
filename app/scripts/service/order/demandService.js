angular.module("iprpAdminApp").factory("demandService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/findOrdersList/:id',{id:'@id',access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
        'orderDetail':{
            url:options.api.base_url + '/findOrderDetailById',
            method:'GET',
            isArray: false,
            params:{
                order_id : $stateParams.id
            }
        },
        'orderDetail_sn':{
            url:options.api.base_url + '/orders/order_sn',
            method:'GET',
            isArray: false
        },
        //  交易订单列表接口
        'findTradeOrder':{
            url:options.api.base_url + '/findTradeOrder',
            method:'POST',
            isArray: false
        },
        //  交易订单详情接口
        'findTradeOrderDetail':{
            url:options.api.base_url + '/findTradeOrderDetail',
            method:'GET',
            isArray: false
        },
        'partnerList':{
        		url:options.api.base_url + '/findPartnerRequirementList',
            method:'GET',
            isArray: false
        },
        'partnerOrderDetail':{
            url:options.api.base_url + '/findPartnerRequirementDetail/:id',
            method:'GET',
            isArray: false,
            params:{
                requirementSn : $stateParams.id
            }
        },
    })
});

