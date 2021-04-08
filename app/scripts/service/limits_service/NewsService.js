angular.module('iprpAdminApp').factory('NewsService',function(session,$stateParams,$resource) {

    return $resource(options.api.base_url + '/news/:message_id',{message_id:'@message_id',access_token:function(){return session.accessToken}},{
        'news_list': {
            method: 'GET',
            isArray: false
        },
        'read_news':{
            method: 'PUT',
            isArray: false
        },
        'deleteBatch':{
            method: 'DELETE',
            isArray: false
        }
    });
});