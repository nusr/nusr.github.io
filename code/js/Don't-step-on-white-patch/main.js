var rows = 4;
var cols = 4;
//1表示黑块，0表示白块
var blocks = [];
//计时
var timeCount = 0.000;
//点击的块数
var clickBlocks = 0;
//计时器
var timeId = null;
function $(name){
    return document.querySelector(name);
}
function $all(name){
    return document.querySelectorAll(name);
}
window.onload = function(){
    //游戏初始化
    init();
};
document.onkeydown = function(event) {
    // console.log(event.keyCode);
    switch (event.keyCode) {
        //H
        case 72:
         if (blocks[rows - 1][0] && clickBlocks == 0) {
                //敲击正确，向下移动
                runTime();
                moveDown();
                clearText();
            } else if (blocks[rows - 1][0] && clickBlocks >= 0) {
                moveDown();
            } else {
                //否则游戏结束
                isGameOver();
            }
            break;
        //J
        case 74:
            //判断是否敲击正确
            if (blocks[rows - 1][1] && clickBlocks == 0) {
                //敲击正确，向下移动
                runTime();
                moveDown();
                clearText();
            } else if (blocks[rows - 1][1] && clickBlocks >= 0) {
                moveDown();
            } else {
                //否则游戏结束
                isGameOver();
            }
            break;
            //K
        case 75:
            //判断是否敲击正确
            if (blocks[rows - 1][2] && clickBlocks == 0) {
                //敲击正确，向下移动
                runTime();
                moveDown();
                clearText();
            } else if (blocks[rows - 1][2] && clickBlocks >= 0) {
                moveDown();
            } else {
                //否则游戏结束
                isGameOver();
            }
            break;
            //L
        case 76:
            //判断是否敲击正确
            if (blocks[rows - 1][3] && clickBlocks == 0) {
                //敲击正确，向下移动
                runTime();
                moveDown();
                clearText();
            } else if (blocks[rows - 1][3] && clickBlocks >= 0) {
                moveDown();
            } else {
                //否则游戏结束
                isGameOver();
            }
            break;
    }
};

function init() {
    for (var i = 0; i < rows; i++) {
        blocks[i] = [];
        for (var j = 0; j < cols; j++) {
            blocks[i][j] = 0;
            //白块布局
            var whiteBlock = $('#whiteBlock-' + i + '-' + j);
            whiteBlock.style.top = getPosTop(i, j) + 'px';
            whiteBlock.style.left = getPosLeft(i, j) + 'px';
            //黑块布局
            $('#block-container').innerHTML += '<div class="blackBlock" id="blackBlock-' + i + '-' + j + '"></div>';
            var blackBlock = $('#blackBlock-' + i + '-' + j);
            blackBlock.style.top = getPosTop(i, j) + 'px';
            blackBlock.style.left = getPosLeft(i, j) + 'px';
        }
    }
    //每一行随机生成一个黑块，且所有黑块不能再同一列
    for (var i = 0; i < rows; i++) {
        var count = 0;
        var randY = Math.floor(Math.random() * cols);
        while (i > 0 && blocks[i - 1][randY]) {
            //当上一行的同一列是黑块，重新生成位置
            randY = Math.floor(Math.random() * cols);
            count++;
            if (count > 100) {
                break;
            }
        }
        blocks[i][randY] = 1;
        $('#blackBlock-' + i + '-' + randY).style.backgroundColor = '#000';
    }
    $('#blackBlock-3-0').innerText = '按H移动';
    $('#blackBlock-3-1').innerText = '按J移动';
    $('#blackBlock-3-2').innerText = '按K移动';
    $('#blackBlock-3-3').innerText = '按L移动';
    timeCount = 0;
    clickBlocks = 0;
}

function getPosTop(i, j) {
    return i * 100;
}

function getPosLeft(i, j) {
    return j * 100;
}

function moveDown() {
    for (var i = rows - 1; i >= 0; i--) {
        for (var j = cols - 1; j >= 0; j--) {
            if (blocks[i][j]) {
                //是黑色块就执行
                blocks[i][j] = 0;
                $('#blackBlock-' + i + '-' + j).style.backgroundColor='#fff';
                if(i !== (rows - 1)) {
                    //上一列设置为白色，下一列设置为黑色
                    blocks[i + 1][j] = 1;
                    $('#blackBlock-' + (i + 1) + '-' + j).style.backgroundColor= '#000';
                }

            }
        }

    }
    var randY = Math.floor(Math.random() * cols);
    blocks[0][randY] = 1;
    $('#blackBlock-0-' + randY).style.backgroundColor= '#000';
    clickBlocks++;
}

function isGameOver() {
    //停止计时器
    clearTimeout(timeId);
    //获取计时器最后的时间
    var str = timeCount.toString().replace(/(\d+)\.(\d{3})(\d*)/g, '$1.$2');
    //游戏结束提示
    if (!document.getElementById("info")) {
        $("#block-container").innerHTML += '<div id="info"><p id="getTime">用时：<span>' + str + '</span></p><p>得分：<span>' + clickBlocks + '</span></p><a href="javascript:restartGame();" id="restartGame">Try Again</a></div>';
        $("#info").style.width = "412px";
        $("#info").style.height = "412px";
        $("#info").style.backgroundColor = "rgba(0,0,0,.5)";
    }

}

function runTime() {
    timeCount += 0.001;
    //正则替换，保证整数位不变，小数始终是3位
    var str = timeCount.toString().replace(/(\d+)\.(\d{3})(\d*)/g, '$1.$2');
    // console.log(str);
    $("#timeCount").innerText = str;
    timeId = setTimeout(runTime, 1);
    if(timeCount >= 10.00){
        isGameOver();
    }
}

function clearText() {
    $('#blackBlock-3-0').innerText = '';
    $('#blackBlock-3-1').innerText = '';
    $('#blackBlock-3-2').innerText = '';
    $('#blackBlock-3-3').innerText = '';
}

function restartGame() {
    var arr = $all(".blackBlock");
    for(var i = arr.length -1;i >= 0;i-- ){
        arr[i].parentNode.removeChild(arr[i]);
    }
    $("#info").parentNode.removeChild($("#info"))
    console.log(2)
    init();
    $("#timeCount").innerText = "0.000";
}
