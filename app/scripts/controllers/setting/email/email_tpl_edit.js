angular.module('iprpAdminApp').controller('EmailTplEditCtrl',function($window,$scope,MailTemplateService,$stateParams,$location){
    $('#email_tpl').siblings().removeClass("selected");
    $('#email_tpl').addClass("selected");

    /**
     * 获取邮件模板详情
     */
    MailTemplateService.mailTpl_detail({code:$stateParams.code},function(data){
        $scope.mail_tpl_detail = data;
        $(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html($scope.mail_tpl_detail.content);
    },function(error){
        alert(error.data.msg);
    })

    /**
     * 编辑邮件模板
     */
    $scope.save_email_tpl = function(){
        //图文混排 信息赋值
        $scope.mail_tpl_detail.content = ($(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html() !="" )
            ? $(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html() : "";
        if(!$scope.mail_tpl_detail || !$scope.mail_tpl_detail.content){
            $scope.EmailTplForm.submitted = true;
        }else{
            MailTemplateService.edit_mailTpl({code:$stateParams.code},$scope.mail_tpl_detail,function(data){
                $location.path('main/setting_home/email_tpl');
            },function(error){
                alert(error.data.msg);
            })
        }
    }
    //kindeditor插件
    $window.KindEditor.create('textarea[name="content"]', {
        resizeType : 0,
        uploadJson:"/iprp_operator/api/file/upload_formdatas",
        allowPreviewEmoticons : false,
        allowImageUpload : true,
        allowFileManager:true ,
        items :   [
            'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'cut', 'copy', 'paste',
            'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
            'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
            'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
            'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
            'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
            'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
            'anchor', 'link', 'unlink']

    });
});
