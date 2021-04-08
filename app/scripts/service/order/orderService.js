angular.module("iprpAdminApp").factory("orderService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/findOrdersList/:order_id',{order_id:'@order_id',access_token:function(){return session.accessToken}},{
        'list':{
            method:'GET',
            isArray: false
        },
        'orderDetail':{
            url:options.api.base_url + '/findOrderDetailById',
            method:'GET',
            isArray: false,
            params:{
                order_id : $stateParams.order_id
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
        		url:options.api.base_url + '/findPartnerOrdersList',
            method:'GET',
            isArray: false
        },
        'partnerOrderDetail':{
            url:options.api.base_url + '/findPartnerOrderDetails',
            method:'GET',
            isArray: false,
            params:{
                orderFictitiousSn : $stateParams.orderFictitiousSn
            }
        },
        'exportChannelList':{
            url:options.api.base_url + '/exportChannelOrderList',
            method:'GET',
            isArray: false,
        },
        'channelList':{
            url:options.api.base_url + '/findChannelOrderList',
            method:'GET',
            isArray: false,
        },
        'channelOrderDetail':{
            url:options.api.base_url + '/findChannelOrderDetail/:orderFictitiousSn',
            method:'GET',
            isArray: false,
            params:{
                orderFictitiousSn : $stateParams.order_sn
            }
        },
        // 敦煌网订单
        'dunhuangList':{
            url:options.api.base_url + '/dhgate/getDhgateOrderList',
            method:'GET',
            isArray: false,
        },
        'dunhuangDetail':{
            url:options.api.base_url + '/dhgate/getDhgateOrderDetail/:orderFuwuId',
            method:'GET',
            isArray: false,
            params:{
                orderFuwuId : $stateParams.orderFuwuId
            }
        },
        'setServiceState':{
            url:options.api.base_url + '/dhgate/setServiceStatus',
            method:'POST',
            isArray: false
        },
        'receptionOrders':{
            url:options.api.base_url + '/dhgate/setStatus',
            method:'POST',
            isArray: false
        },
        //业务金额统计
        'businessTongjiList':{
            url:options.api.base_url + '/findBusinessAmountStatisticList',
            method:'GET',
            isArray: false,
        },
    })
});

