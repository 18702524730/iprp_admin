angular.module('iprpAdminApp').factory('openAddressService',function(session,$resource) {

    return{
        provinces :$resource(options.api.base_url  + '/areas/:area_id',{area_id:'@area_id',access_token:function(){return session.accessToken}},{
            "list":{
                method:'GET',
                isArray:false,
                params:{
                }
            }
        })
    };
});