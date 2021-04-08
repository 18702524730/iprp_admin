angular.module('iprpAdminApp').directive('mtShowModel', function(session) {
    return {
        restrict: 'A',
        scope:{
            modelName:'@modelName'
        },
        link: function(scope, element, attrs, fn) {
            //设置某菜单下的模块显示
            var initShowModel = function(S, scope, element){
                var isHide = !S.containModel(scope.modelName);
                var setModelState = function(isHide){
                    element[isHide ? 'addClass':'removeClass']('hide');
                    /*
                    老的方式手动添加，如下：(感觉有点写反了，session.bloc_member_manage_show===false时为显示)
                    if(scope.modelName ==="IPRPBlocMemberManageModel"){
                        session.bloc_member_manage_show = isHide;
                    }
                    */
                    //改为自动匹配设置，去除原来的手动设置方式 2017.6.23
                    
                    //都去除，改在session.js中的 initSelfPermission 统一处理, 这儿只负责隐藏或显示 2017.7.12
                    //var modelName = scope.modelName.replace('IPRP','').replace('Model','');
                    //var arr = modelName.match(/[A-Z][^A-Z]*/g);
                    //arr.push('show');
                    //var modelShowName = arr.join('_').toLowerCase();
                    //S[modelShowName] = isHide;
                }
                setModelState(isHide);
            };
            session.$on('sessionChangePage', function (event,newSession) {
                initShowModel(newSession, scope, element);
            });
            initShowModel(session, scope, element);
        }
    };
});
