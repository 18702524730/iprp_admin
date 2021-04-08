function IE8following(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串bill_tpl_list.html
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;

        if (IE55) {
            document.getElementById("IE8followings").style.display="block";
        }
        if (IE6) {
            document.getElementById("IE8followings").style.display="block"
        }
        if (IE7) {
            document.getElementById("IE8followings").style.display="block"
        }
        if (IE8) {
            document.getElementById("IE8followings").style.display="block"
        }
    }
}

function hideIE8followings(){
    document.getElementById("IE8followings").style.display="none";
}