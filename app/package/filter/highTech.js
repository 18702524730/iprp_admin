angular.module('iprpAdminApp').filter("companyScale",function(){
    return function(td) {
        if(td == 1){
            return "50人以下";
        }else if(td == 2){
            return "50-100人";
        }else if(td == 3){
            return "100人以上";
        }
    };
});
angular.module('iprpAdminApp').filter("yearSale",function(){
    return function(td) {
        if(td == 1){
            return "5000万以下";
        }else if(td == 2){
            return "5000万-2亿";
        }else if(td == 3){
            return "2亿以上";
        }
    };
});
angular.module('iprpAdminApp').filter("evaluating",function(){
    return function(td) {
        if(td == 1){
            return "重点培育";
        }else if(td == 2){
            return "鼓励申报";
        }else if(td == 3){
            return "推荐申报";
        }
    };
});
angular.module('iprpAdminApp').filter("contactState",function(){
    return function(td) {
        if(td == 0){
            return "未联系";
        }else if(td == 1){
            return "已联系";
        }
    };
});

angular.module('iprpAdminApp').filter("textFilter",function(){
    return function(td) {
    		if (!td) {
    			return '';
    		}
        if(td.length>15){
          return td.slice(0,15) + "...";
        }else{
          return td;
        }
    };
});

angular.module('iprpAdminApp').filter("textFilter2",function(){
    return function(td) {
    		if (!td) {
    			return '';
    		}
        if(td.length>10){
          return td.slice(0,10) + "...";
        }else{
          return td;
        }
    };
});

angular.module('iprpAdminApp').filter("streetFilter",function(){
    return function(input) {
	    switch (input){
	      case 1:
	        return "闸弄口街道"; break;
	      case 2:
	        return "凯旋街道"; break;
	    	case 3:
	        return "采荷街道"; break;
	      case 4:
	        return "四季青街道"; break;
	      case 5:
	        return "笕桥街道"; break;
	      case 6:
	        return "彭埠街道"; break;
	      case 7:
	        return "钱塘智慧城"; break;
	      case 8:
	        return "丁兰街道"; break;
	    }
  	};
});

angular.module('iprpAdminApp').filter("applyStatus",function(){
    return function(input) {
	    switch (input){
	      case 1:
	        return "新认定2019"; break;
	      case 2:
	        return "复评2019"; break;
	      case 3:
	        return "新认定2020"; break;
	      case 4:
	        return "复评2020"; break;
	      case 5:
	        return "新认定2021"; break;
	      case 6:
	        return "复评2021"; break;
	      case 7:
	        return "暂无意向"; break;
	    }
  	};
});

angular.module('iprpAdminApp').filter("intellectualPropertyIso",function(){
    return function(input) {
	    switch (input){
	      case 1:
	        return "未实施"; break;
	      case 2:
	        return "实施中"; break;
	      case 3:
	        return "取得证书"; break;
	      case 4:
	        return "是"; break;
	      case 5:
	        return "否"; break;
	    }
  	};
});

angular.module('iprpAdminApp').filter("researchOrgLevel",function(){
    return function(input) {
	    switch (input){
	      case 1:
	        return "区级"; break;
	      case 2:
	        return "市级"; break;
	      case 3:
	        return "省级"; break;
	      case 4:
	        return "国家级"; break;
	      case 5:
	        return "未设有"; break;
	    }
  	};
});

