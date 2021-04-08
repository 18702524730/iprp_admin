angular.module("iprpAdminApp").factory("BusinessFeedBackService", function($resource,$stateParams,session) {

    return $resource(options.api.base_url + '/businessFeedBacks',{bs_id:'@bs_id',access_token:function(){return session.accessToken}},{
        'BusinessFeedBack':{
            method:'GET',
            isArray: false
        },
        'add_BusinessFeedBack':{
            method:'POST',
            isArray: false
        },
        'edit_BusinessFeedBack':{
            method:'PUT',
            isArray: false
        },
        'deleteBatch':{
            method: 'DELETE',
            isArray: false
        }
    })
});