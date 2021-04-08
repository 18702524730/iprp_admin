angular.module("iprpAdminApp").factory("IptService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/refunds/:refund_id',{refund_id:'@refund_id',access_token:function(){return session.accessToken}},{
        // IPT日志信息
        'iptRecordList':{
            url:options.api.base_url + '/iptLogInfo',
            method:'GET'
        }, 
        // ipt统计信息
        'iptStatisticsInfo':{
            url:options.api.base_url + '/iptStatisticsInfo',
            method:'GET'
        }, 
        // 创力统计
        'countIptPower':{
            url:options.api.base_url + '/countIptPower',
            method:'GET'
        },
        // 统计生成珍珠
        'countIpt':{
            url:options.api.base_url + '/countIpt',
            method:'GET'
        },
        // 查询珍珠总数
        'countAllIpt':{
            url:options.api.base_url + '/countAllIpt',
            method:'GET'
        },
        // 创力奖励记录
        'findIptPower':{
            url:options.api.base_url + '/findIptPower',
            method:'GET'
        },
        // 珍珠生成记录
        'findIptBeach':{
            url:options.api.base_url + '/findIptBeach',
            method:'GET'
        },
    });
});
