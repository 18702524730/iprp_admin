angular.module('iprpAdminApp').directive('upload',  function($window,UploadService,$timeout) {

    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };
    return {
        restrict: 'A',
        scope: {
            thumbSrc:"=thumbSrc",
            fileName:"=fileName",
            fileType:"=fileType"
        },
        template: '<input type="file" uploader="uploader" nv-file-select="" class="file" style="display:none;"/>' +
            '<button type="button" style="width: 43px; height: 25px;" class="type-file-text" ng-click ="selectFile()">浏览</button> ',
        compile: function compile(tElement, tattrs, transclude) {

            return {
                pre: function preLink(scope, iElement, iattrs, controller) {
                    var uploader = scope.uploader = UploadService.uploader();


                },
                post: function postLink(scope, element, attrs, controller) {
                    if (!helper.support){
                        return;
                    }
                    element.attr('style','position:relative;');


                    var fileInput = element.find('input:file');
                    var tipArea = angular.element('<div style="margin-top:-60px;position:absolute;width:100%;"></div>');
                    element.append(tipArea);
                    var progressBar = angular.element('<progress class="progress" min="0" max="100" value="0" style="width:100px;">0%</progress>');
                    var errorMsg = angular.element('<span class="display:inline">上传失败</span>');
                    var errorMsgTimeoutPromise = null;
                    scope.thumbSrc = scope.thumbSrc || "";

                    scope.uploader.onBeforeUploadItem = function(item) {
                        tipArea.append(progressBar);
                    };

                    scope.uploader.onProgressItem = function(fileItem, progress) {
                        progressBar.val(progress);
                        progressBar.text(progress+'%');

                    };
                    scope.uploader.onProgressAll = function(progress) {
                        progressBar.val(100);
                        progressBar.text(100+'%');
                        progressBar.remove();
                    };
                    scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
                        var file = fileItem.file.name.split(".");
//                        console.log(file);
                        scope.fileName = fileItem.file.name;
                        scope.fileType = "";
                        if(file.length>1) {
                            scope.fileType = file[file.length - 1];
                        }
                        scope.thumbSrc = response.url;
                    };
                    scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
                        tipArea.append(errorMsg);
                        if(errorMsgTimeoutPromise && !errorMsgTimeoutPromise.resolved){
                            $timeout.cancel(errorMsgTimeoutPromise);
                        }
                        errorMsgTimeoutPromise = $timeout(function(){
                            errorMsg.remove();
                            errorMsgTimeoutPromise = null;
                            return 0;
                        },5000);

                    };

                    scope.uploader.onCompleteAll = function() {
//                       console.info('onCompleteAll');

                    };

                    scope.selectFile = function() {
                        fileInput.click();
                    };


                }
            };
        },
        link: function(scope, element, attrs, fn) {

        }
    };
});
