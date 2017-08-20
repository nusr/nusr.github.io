/**
 * 封装的移动端点击tap事件,在PC端不能响应
 * @param domNode
 * @param callback
 */
function tap(domNode, callback) {
    var startX = 0,
        startY = 0,
        startTime = 0,
        endX = 0,
        endY = 0,
        endTime;
    domNode.addEventListener("touchstart", function (e) {
        if (e.targetTouches.length > 1) {
            return;
        }
        startX = e.targetTouches[0].clientX;
        startY = e.targetTouches[0].clientY;
        startTime = new Date();
    });
    domNode.addEventListener("touchend", function (e) {
        if (e.changedTouches.length > 1) {
            return;
        }
        endTime = new Date() - startTime;
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        if (endTime > 150) {
            return;
        }
        if (Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6) {
            console.log("移动端的点击事件");
            console.log(endTime);
            callback && callback();
        }
    });
}