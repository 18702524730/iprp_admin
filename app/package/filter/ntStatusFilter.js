//存证列表

//存证状态
angular.module('iprpAdminApp').filter("ntStateFilter",function(){
    return function(td) {
        td = td +'';
        if(td == '0'){
            return "待存证";
        }else if(td == '1'){
            return "存证中";
        }else if(td == '2'){
            return "存证失败";
        }else if(td == '3'){
            return "存证成功";
        }
    };
});

//订单状态
angular.module('iprpAdminApp').filter("ntOrderStatusFilter",function(){
    return function(td) {
        if(td === -1){
            return "已关闭";
        }else if(td === 0){
            return "待付款";
        }else if(td === 1){
            return "已付款";
        }
    };
});

//存证类型
angular.module('iprpAdminApp').filter("ntTypeFilter",function(){
    return function(td) {
        if(td == 1){
            return "网页存证";
        }else if(td == 2){
            return "电子存证";
        }
    };
});

//存证内容大小
angular.module('iprpAdminApp').filter("ntFileSizeFilter",function(){
    return function(td) {
      if (!td) {
        return '';
      }
      var ret = td;
      if (td > 1024*1024) {
        ret = (ret/1024/1024).toFixed(1) + 'M';
      }else{
        var t = (ret/1024).toFixed(1);
        ret = (t === '0.0' ? '0.1' : t) + 'KB';
      }
      return ret;
    }
});

//存证用途
angular.module('iprpAdminApp').filter("ntUsesFilter",function(){
    return function(td) {
        var ret = ''
        switch (td+''){
            case '1':
              ret = "电商维权";
              break;
            case '2':
              ret = "自媒体内容维权";
              break;
            case '3':
              ret = "设计作品未经授权发布";
              break;
            case '4':
              ret = "文字创作存证";
              break;
            case '5':
              ret = "美术作品存证";
              break;
            case '6':
              ret = "音乐作品存证";
              break;
            case '7':
              ret = "影像摄影存证";
              break;
            case '8':
              ret = "其他";
              break;
        }
        return ret;
    };
});


//出证状态
angular.module('iprpAdminApp').filter("issueStatusFilter",function(){
    return function(td) {
        var ret = ''
        switch (td+''){
          case 'null':
            ret = "未申请";
            break;
          case '1':
            ret = "审核中";
            break;
          case '2':
            ret = "审核通过";
            break;
          case '3':
            ret = "受理中";
            break;
          case '4':
            ret = "已出证";
            break;
          case '5':
            ret = "受理完毕";
            break;
          case '6':
            ret = "终止";
            break;
          case '7':
            ret = "拒绝受理";
            break;
          case '8':
            ret = "撤销中";
            break;
          case '9':
            ret = "已撤销";
            break;
        }
        return ret;
    };
});

//联系状态
angular.module('iprpAdminApp').filter("contactStatusFilter",function(){
    return function(td) {
        var ret = ''
        switch (td+''){
            case '1':
              ret = "未联系";
              break;
            case '2':
              ret = "已联系";
              break;
        }
        return ret;
    };
});


//存证类型 1 存证 2 存证续费
angular.module('iprpAdminApp').filter("czTypeFilter",function(){
    return function(td) {
        var ret = ''
        switch (td+''){
            case '1':
              ret = "存证";
              break;
            case '2':
              ret = "续费";
              break;
        }
        return ret;
    };
});

//存证渠道
angular.module('iprpAdminApp').filter("ntChannelFilter",function(){
    return function(td) {
        td = td +'';
        if(td == '1'){
            return "司法鉴定存证";
        }else if(td == '2'){
            return "区块链存证";
        }else if(td == '3'){
            return "公证存证";
        }else if(td == '4'){
            return "公证存证";
        }else if(td == '5'){
            return "司法鉴定存证";
        }else if(td == '6'){
          return "互联网公证存证";
      }
    };
});

//存证
angular.module('iprpAdminApp').filter("Purpose",function(){
    return function(td) {
        td = td +'';
        if(td == '0'){
            return "个人作品";
        }else if(td == '1'){
            return "职务作品";
        }else if(td == '2'){
            return "合作作品";
        }else if(td == '3'){
            return "委托作品";
        }else if(td == '4'){
            return "法人作品";
        }
    };
});
// 发表状态
angular.module('iprpAdminApp').filter("publishState",function(){
    return function(td) {
        td = td +'';
        if(td == '0'){
            return "创作完成，未上线";
        }else if(td == '1'){
            return "网络发表";
        }else if(td == '2'){
            return "已出版";
        }else if(td == '3'){
            return "已上线";
        }
    };
});





