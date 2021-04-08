angular.module("iprpAdminApp").factory("ChannelBsService", function ($resource,session,$stateParams) {

    return {
        channelBs: $resource(options.api.base_url + '/channelBs/:channel_id/:bs_id',
            {channel_id: '@channel_id',bs_id: '@bs_id',order_sn: '@order_sn',bs_code: '@bs_code',access_token:function(){return session.accessToken}}, {
                "detail": {
                    method: 'GET',
                    isArray: false,
                    params: {
                        channel_id: $stateParams.channel_id,
                        bs_id:$stateParams.bs_id
                    }
                }
            })
    }
});
