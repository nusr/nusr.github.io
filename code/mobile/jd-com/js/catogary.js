/**
 * Created by Steve on 2017/6/15.
 */

window.onload = function () {
    var left = document.querySelector(".ct_left");
    var ul = left.querySelector("ul");
    var lis = ul.querySelectorAll("li");
    console.log(lis);
    var maxTop = 0, minTop = left.offsetHeight - ul.offsetHeight;
    var max = maxTop + 100, min = minTop - 100;
    console.log(max + ":" + min);
    var startY = 0, moveY = 0, distanceY = 0, currentY = 0;
    ul.addEventListener("touchstart", function (event) {
        startY = event.targetTouches[0].clientY;
    });
    ul.addEventListener("touchmove", function (event) {
        moveY = event.targetTouches[0].clientY;
        distanceY = moveY - startY;
        if (distanceY + currentY > max || distanceY + currentY < min) {
            return;
        }
        ul.style.transition = "none";
        ul.style.top = distanceY + currentY + "px";
    });
    ul.addEventListener("touchend", function () {
        if (distanceY + currentY > maxTop) {
            ul.style.transition = "top 0.5s";
            ul.style.top = maxTop;
        }
        else if (distanceY + currentY < minTop) {
            ul.style.transition = "top 0.5s";
            ul.style.top = minTop;
        }
        else {
            currentY += distanceY;
        }

    });
};
