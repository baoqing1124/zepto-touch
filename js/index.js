var globalWidth = window.innerWidth;
var radixNO = 25/750*globalWidth;
if(globalWidth<400){
    globalWidth = 375;
    radixNO = 12.5;
}
var fitStyle = "<style>html{font-size:" + radixNO + "px;}</style>";
document.write(fitStyle);
(function (doc, win) {
    var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var globalWidth = window.innerWidth;// for judge the screen ??
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 25 * (clientWidth / 750) + 'px';console.log(docEl.style.fontSize)
                if(clientWidth<400){
                    docEl.style.fontSize = 12.5 + 'px';
                }
            };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(document).ready(function() {
    touch();
    films('hot');
    films('coming');    
});

function touch(){
    console.log(document.body.scrollHeight)
    var startPosition, endPosition, deltaX, deltaY;
    $(".content").on('touchstart', function(e) {
        var touch = e.touches[0];
        startPosition = {
            x: touch.pageX,
            y: touch.pageY
        }
    }).on('touchmove', function(e) {
        var touch = e.touches[0];
        endPosition = {
            x: touch.pageX,
            y: touch.pageY
        };
        deltaX = endPosition.x - startPosition.x;
        deltaY = endPosition.y - startPosition.y;
    }).on('touchend', function(e) {console.log(deltaX)
        if (deltaX<-100) { // 向左划动  
            console.log("向左划动");
            $('#current').addClass('out');
            $('#next').css('display', 'block');
            $('#firstLi').removeClass('border-oringe');
            setTimeout(function(){
               $('#next').addClass('current');            
               $('#current').removeClass('current');
               $('#current').removeClass('out');
               $('#current').css('display', 'none');
               $('#secondLi').addClass('border-oringe')
            },400);
        } else if (deltaX > 100) { // 向右划动  
            console.log("向右划动");
            $('#current').css('display', 'block');
            $('#next').addClass('out-right');
            $('#secondLi').removeClass('border-oringe')
            setTimeout(function(){
               $('#current').addClass('current');           
               $('#next').removeClass('current');
               $('#next').removeClass('out-right');
               $('#next').css('display', 'none');
               $('#firstLi').addClass('border-oringe')
            },400);
        }
    });
}
function films(name){
    if(name==='hot'){
        var oUrl = 'json/films.json';
    }else if(name==='coming'){
        var oUrl = 'json/comingFilms.json';
    }    
    var oCallBack = function(data){
        var respCode = data.data.respCode;
        var respMsg = data.data.respMsg;
        var films = data.data.films;
        if(respCode==='0000'){
            var str = [];
            for(var i=0;i<films.length;i++){
                str.push('<li>');
                str.push('<img src="'+films[i].picHor+'">');
                str.push('<div Class="detail"><h1>'+films[i].filmName+'</h1>');
                str.push('<p>导演：'+films[i].director+'</p>');
                str.push('<p>主演：'+films[i].actor+'</p>');
                str.push('<p>片长：'+films[i].duration+'分钟</p></div>');
                str.push('</li>');
            }
            str = str.join('');
            if(name==='hot'){
                $('#current ul').html(str);
            }else if(name==='coming'){
                $('#next ul').html(str);
            }  
        }
    };
    ajaxRequestFun(oUrl,'',oCallBack);
}

function ajaxRequestFun(url,data,callBack){
    $.ajax({
        type : "post",
        url : url,
        dataType : "json",
        data : data,
        success : function(data) {
            callBack(data);
        },
        error : function(e){
            showAlert2("获取数据失败");
        }
    });
}