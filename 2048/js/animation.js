//动画的形式显示数字
function showNumberWithAnimation(i, j, randNum) {
    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css({ color: getNumberColor(randNum), backgroundColor: getNumberBackgroundColor(randNum) });
    numberCell.text(randNum);
    numberCell.animate({
        height: "100px",
        width: "100px",
        left: getPosLeft(i, j),
        top: getPosTop(i, j)
    }, 50);
}
//动画的形式移动数字
function showMoveWithAnimation(i, j, i, k){
    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.animate({
        left: getPosLeft(i, k),
        top: getPosTop(i, k)
    }, 50);
}
