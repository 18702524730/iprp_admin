angular.module('iprpAdminApp').controller('CompanyAuditDetailCtrl',function($scope,$modal,$state,$cookies,bsOrderService,$stateParams,$location){
    $('#company_certification_list').addClass("selected").siblings().removeClass("selected");

    $scope.adminUrl = rootConfig.adminUrl;
    $scope.access_token = $cookies.get("token");
    /**
     * 订单详情
     */
    $scope.pdftourl=function(url){
        bsOrderService.channelPrevImg({
            pdf_url: url
        },function(data){
            $scope.imgurl = data.urls[0];
        },function(err){
            console.log(err)
        })
    }
    $scope.openmodal = function(opensrc){
        $modal.open({
            resolve:{
                ngsrc : function(){
                    return opensrc;
                }
            },
            templateUrl: 'package\\modal\\bs_order\\imgprev.html',
            controller: 'imgprevControl'
        }).result.then(function (result) {
            
        })
    };
    $scope.changeimg = function(url){
        bsOrderService.channelPrevImg({
            pdf_url: url
        },function(data){
            var urls = data.urls;
            // var urls = [
            //     'https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/77E0CA3F7C6B117EE6687DB5ABF24C92.jpg',
            //     "https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/A67013EAB141A2EEE28008B1B2B5149D.jpg"
            // ]
            $scope.openmodal(urls)
            console.log(data)
        },function(err){
            console.log(err)
        })
    }
    $scope.preview = function(src){
        $scope.changeimg(src)
    }
    bsOrderService.company_audit_detail({applySubjectId:$stateParams.applySubjectId},function(data){
        $scope.order_detail = data;
        if(data.standby1){
            $scope.pdftourl(data.standby1)
        }
    },function(error){
        // console.log(error)
        alert(error.data.msg);
    });
    $scope.ispass = {}
    $scope.ispass.step = ''
    $scope.ispass.errmsg = ''
    $scope.ispass.memo = ''
    $scope.auditorder = function(){
        bsOrderService.company_audit_verify({
            applySubjectId: $stateParams.applySubjectId*1,
            isChecked: $scope.ispass.step*1,
            authFailReason: $scope.ispass.memo
        },function(data){
            alert('操作成功')
            $state.reload()
        },function(err){
            alert(err.data.msg)
        })
    };
    
    $scope.showaudit=function(){
        $modal.open({
            resolve:{
                serviceType : function(){
                    return false;
                }

            },
            templateUrl: 'package\\modal\\user_manage\\companyaudit.html',
            controller: 'CompanyAuditDetailCtrl'
        }).result.then(function (result) {
            console.log(1111)
        })
    }
    $scope.closeaudit=function(){
        // $('.auditbox').hide()
        $scope.$dismiss("cancel");
        $scope.ispass.errmsg = '';
        $scope.ispass.step = '';
    }
    $scope.submitdata=function(){
        if($scope.ispass.step==''){
            $scope.ispass.errmsg = '请选择是否通过'
        }else{
            $scope.auditorder();
            $scope.closeaudit()
        }
        
    }
});

