angular.module("iprpAdminApp").factory("ChannelSpService", function($resource,$stateParams,session) {

    return {
        channelSp : $resource(options.api.base_url + '/channelSps/:channel_id', {channel_id:'@channel_id',access_token:function(){return session.accessToken}}, {
            'channelService':{
                url:options.api.base_url + '/channelSps/service',
                method: 'GET',
                isArray: false
            },
            'channelByIdService':{
                url:options.api.base_url + '/channelSps/:channel_id/service',
                method: 'GET',
                isArray: true
            },
            "list": {
                method: 'GET',
                isArray: true
            },
            'assignService':{
                method: 'POST',
                isArray: false,
                params:{
                    channel_id:$stateParams.channel_id
                }
            },
            'del_channel_service':{
                method: 'DELETE',
                isArray: false,
                params:{
                    channel_id:$stateParams.channel_id
                }
            }
        })
    }
});
