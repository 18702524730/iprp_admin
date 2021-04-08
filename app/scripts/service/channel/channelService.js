angular.module("iprpAdminApp").factory("ChannelService", function($resource,$stateParams,session) {

    return {
        channel : $resource(options.api.base_url + '/channels/:channel_id', {channel_id:'@channel_id',access_token:function(){return session.accessToken}}, {
            "list": {
                method: 'GET',
                isArray: false
            },
            "channel_all":{
                url:options.api.base_url + '/channels/all',
                method: 'GET',
                isArray: false
            },
            "channels":{
                url:options.api.base_url + '/channels',
                method: 'GET',
                isArray: false
            },
            "channel_service":{
                url:options.api.base_url + '/channels/services',
                method: 'GET',
                isArray: false
            },
            "detail":{
                method:'GET',
                isArray: false,
                params:{
                    channel_id : $stateParams.channel_id
                }
            },
            'addChannel':{
                method:'POST',
                isArray: false
            },
            "editChannel":{
                method:'PUT',
                isArray: false,
                params:{
                    channel_id : $stateParams.channel_id
                }
            },
            
        })
    }
});
