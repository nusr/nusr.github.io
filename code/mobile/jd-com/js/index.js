/**
 *
 * Created by Steve on 2017/6/12.
 */
window.onload = function () {
    var search = document.querySelector(".jd_search");
    var banner = document.querySelector(".jd_banner");
    var height = banner.offsetHeight;
    window.onscroll = function () {
        var top = document.body.scrollTop;
        var opacity = 0;
        if (top < height) {
            opacity = top / height;
            console.log(opacity);
            search.style.backgroundColor = "rgba(233,35,34," + opacity + ")";
        }
    }
};
