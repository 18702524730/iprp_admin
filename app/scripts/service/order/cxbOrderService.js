angular.module("iprpAdminApp").factory("cxbOrderService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/findOrdersList/:order_id',{order_id:'@order_id',access_token:function(){return session.accessToken}},{
        'list':{
        		url:options.api.base_url + '/findCxbWorkOrderList',
            method:'GET',
            isArray: false
        },
        'orderDetail':{
            url:options.api.base_url + '/findCxbWorkOrderDetail',
            method:'GET',
            isArray: false,
            params:{
                workOrderSn : $stateParams.order_id
            }
        },
        'hzwmList':{
        		url:options.api.base_url + '/orderOffline',
            method:'GET',
            isArray: false
        },
        'hzwmCzList':{
        		url:options.api.base_url + '/findList4Evidence',
            method:'GET',
            isArray: false
        },
        'hzhlList':{
        		url:options.api.base_url + '/industryhuili',
            method:'GET',
            isArray: false
        },
        'hzwmStatistics':{
        		url:options.api.base_url + '/fiveData',
            method:'GET',
            isArray: false
        },
        'countAmount':{
        		url:options.api.base_url + '/countAmount',
            method:'GET',
            isArray: false,
        },
        'hzwmUserList':{
        		url:options.api.base_url + '/userOffline',
            method:'GET',
            isArray: false
        },
        'countUserOffline':{
        		url:options.api.base_url + '/countUserOffline',
            method:'GET',
            isArray: false,
        },
        'gjhlist':{
          url:options.api.base_url + '/findCantonFairNameList',
          method:'GET',
          isArray: false
        },
    })
});

