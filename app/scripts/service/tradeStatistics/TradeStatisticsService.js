angular.module("iprpAdminApp").factory("TradeStatisticsService", function($resource,session,$stateParams) {

    return{
        Statistics : $resource(options.api.base_url + '/welcome/services/statistics',{access_token:function(){return session.accessToken}},{
            "serviceCount":{
                method: 'GET',
                isArray: true
            },
            "channelCount":{
                url : options.api.base_url + '/welcome/channels/statistics',
                method: 'GET',
                isArray: true
            },
            "orderCount":{
                url : options.api.base_url + '/welcome/orders/statistics',
                method: 'GET',
                isArray: true
            },
            "refundCount":{
                url : options.api.base_url + '/welcome/refunds/statistics',
                method: 'GET',
                isArray: true
            },
            "businessCount":{
                url:options.api.base_url + '/welcome/businesses/statistics',
                method: 'GET',
                isArray: true
            }
        })
    }
});