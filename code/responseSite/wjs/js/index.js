/**
 * Created by Steve on 2017/6/18.
 */
$(function () {
    //工具提示初始化
    $('[data-toggle="tooltip"]').tooltip();
    //window绑定onresize事件
    $(window).on("resize", function () {
        var width = $(window).width();
        var items = $(".carousel-inner>.item");
        //console.log(items);
        items.each(function (index, value) {
            var item = $(this);
            //console.dir(item);
            //判断屏幕大小
            if (width < 768) {
                //屏幕小于768，判定为移动设备
                item.html('<a href="javascript:;" class="mobileImg"><img src="' + item.data('smallImage') + '" alt=""></a>')
            }
            else {
                item.html('<a class="pcImg" href="javascript:;" style="background-image: url(' + item.data('largeImage') + ')"></a>');
            }
            //转换为DOM对象
            var itemDom = item[0];
            var startX,
                endX;
            itemDom.addEventListener("touchstart", function (e) {
                startX = e.targetTouches[0].clientX;
            });
            itemDom.addEventListener("touchend", function (e) {
                //手指离开，使用changedTouches
                endX = e.changedTouches[0].clientX;
                //判断手指移动的方向
                if (endX < startX) {
                    //从左向右滑，调用bootstrap的方法，滑向下一张
                    $(".carousel").carousel('next');
                }
                else if (endX > startX) {
                    //从右向左滑，调用bootstrap的方法，滑向前一张
                    $(".carousel").carousel('prev');
                }
            });
        });
        //加上trigger，事件马上引发，不会等到窗口发生改变后才显示图片
    }).trigger('resize');

});
