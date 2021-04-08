angular.module('iprpAdminApp').controller('AddEmailTplCtrl',function($window,$scope,MailTemplateService,$location){
    $('#email_tpl').siblings().removeClass("selected");
    $('#email_tpl').addClass("selected");

    $scope.add_template_obj = { };

    /**
     * 添加邮件模板
     */
    $scope.add_template = function(){
        $scope.add_template_obj.content = ($(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html() !="" )
            ? $(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html() : "";

        if(!$scope.add_template_obj.code || !$scope.add_template_obj.name || !$scope.add_template_obj.title || !$scope.add_template_obj.content){
            $scope.AddEmailTplForm.submitted = true;
        }else{
            MailTemplateService.add_mailTpl($scope.add_template_obj,function(data){
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
