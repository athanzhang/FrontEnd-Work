$(document).ready(function() {
    var demo = document.getElementById('demo');
    var demo1 = document.getElementById('demo1');
    var demo2 = document.getElementById('demo2');
    var speed = 50;
    demo2.innerHTML = demo1.innerHTML;
    function autoScroll() {

        // 滚动至demo1完毕时，到demo2边界处
        if(demo2.offsetTop-demo.scrollTop<=0) { 
            demo.scrollTop -= demo1.offsetHeight;
        }
        else {
            demo.scrollTop++;
        }
        
    }
    var myScroll = setInterval(autoScroll,speed);
    demo.onmouseover = function () {
            clearInterval(myScroll);
      }
    demo.onmouseout = function() {
        myScroll = setInterval(autoScroll,speed);
    }  

})