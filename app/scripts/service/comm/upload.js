angular.module('iprpAdminApp').factory('UploadService', function (FileUploader) {

    var fileUploadService = {
        "uploader": function () {
            var uploader = new FileUploader({
                url: options.api.base_url + '/file/upload',
                method: 'POST',
                autoUpload: true,
                alias: 'Filedata'
            });
            uploader.filters.push({
                name: 'imageFilter',
                fn: function (item /*{File|FileLikeObject}*/, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return true;
                }
            });
            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
//                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function (fileItem) {
//                console.info('onAfterAddingFile', fileItem);
            };
            uploader.onAfterAddingAll = function (addedFileItems) {
//                console.info('onAfterAddingAll', addedFileItems);
            };
            uploader.onCancelItem = function (fileItem, response, status, headers) {
//                console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {
//                console.info('onCompleteItem', fileItem, response, status, headers);
            };
            return uploader;
        }
    };
    return fileUploadService;
});
