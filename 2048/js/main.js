//存放数字格，0表示没有数字，1表示有数字
var board = [];
//存放分数
var score = 0;
//4 2 2，右移时，出现这种情况，就会2与2合并为4，4与4合并为8，需要消除这种情况
//用一个数组存放合并的情况
var hasConflict = [];
$(document).ready(function() {
    newGame();
});
$(document).keydown(function(event) {
    // console.log(event.keyCode);
    switch (event.keyCode) {
        case 65: //A
            if (moveLeft()) {
                genetateOneNumber();
                isGameOver();
            }
            break;
        case 68: //D
            if (moveRight()) {
                genetateOneNumber();
                isGameOver();
            }
            break;
        case 87: //W
            if (moveTop()) {
                genetateOneNumber();
                isGameOver();

            }
            break;
        case 83: //S
            if (moveDown()) {
                genetateOneNumber();
                isGameOver();
            }
            break;
        default:
            break;
    }

});

function newGame() {
    //初始化棋盘格
    init();
    //随机位置生成两个随机数
    genetateOneNumber();
    genetateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        hasConflict[i] = [];
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css({ "top": getPosTop(i, j), "left": getPosLeft(i, j) });
            board[i][j] = 0;
            hasConflict[i][j] = false;
        }
    }
    score = 0;
    updateScore(score);
    updateBoardView();
}
//更新得分
function updateScore(score) {
    $("#score").text(score);
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var numberCell = $('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            $("#grid-container").append(numberCell);
            if (board[i][j] === 0) {
                numberCell.css({ height: "0px", width: "0px", left: getPosLeft(i, j), top: getPosTop(i, j) });
            } else {
                numberCell.css({ height: "100px", width: "100px", left: getPosLeft(i, j), top: getPosTop(i, j), color: getNumberColor(board[i][j]), backgroundColor: getNumberBackgroundColor(board[i][j]) });
                numberCell.text(board[i][j]);
            }
            hasConflict[i][j] = false;
        }
    }
}

function genetateOneNumber() {
    if (noSpace(board)) {
        return false;
    }
    //随机位置
    var randX = Math.floor(Math.random() * 4);
    var randY = Math.floor(Math.random() * 4);
    var count = 0;
    //优化随机位置算法
    while (true) {
        if (board[randX][randY] == 0 || count > 50) {
            break;
        }
        randX = Math.floor(Math.random() * 4);
        randY = Math.floor(Math.random() * 4);
        count++;
    }
    if(count > 50){
        for(var i = 0;i < 4;i ++){
            for(var j = 0;j < 4;j++){
                if(board[i][j] ==0){
                    randX = i;
                    randY = j;
                }
            }
        }
    }
    //随机一个数字
    var randNum = Math.random() < 0.5 ? 2 : 4;
    //随机位置显示数字
    board[randX][randY] = randNum;
    showNumberWithAnimation(randX, randY, randNum);
    return true;
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        showMoveWithAnimation(i, j, i, k);
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflict[i][k]) {
                        //add
                        board[i][k] += board[i][j];
                        score += board[i][j];
                        board[i][j] = 0;
                        //move
                        showMoveWithAnimation(i, j, i, k);
                        updateScore(score);
                        hasConflict[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        showMoveWithAnimation(i, j, i, k);
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)&&!hasConflict[i][j]) {
                        //add
                        board[i][k] += board[i][j];
                        score += board[i][j];
                        board[i][j] = 0;
                        //move
                        showMoveWithAnimation(i, j, i, k);
                        updateScore(score);
                        hasConflict[i][j] =true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
    return true;
}

function moveTop() {
    if (!canMoveTop(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        showMoveWithAnimation(i, j, k, j);
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockHorizontal(j, k, i, board)&&!hasConflict[k][j] ) {
                        //add
                        board[k][j] += board[i][j];
                        score += board[i][j];
                        board[i][j] = 0;
                        //move
                        showMoveWithAnimation(i, j, k, j);
                        updateScore(score);
                        hasConflict[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        showMoveWithAnimation(i, j, k, j);
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockHorizontal(j, i, k, board)&&!hasConflict[k][j]) {
                        //add
                        board[k][j] += board[i][j];
                        score += board[i][j];
                        board[i][j] = 0;
                        //move
                        showMoveWithAnimation(i, j, k, j);
                        updateScore(score);
                        hasConflict[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
    return true;
}

function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        gameOver();
    }

}

function restartGame() {
    $("#info").remove();
    newGame();
}

function gameOver() {
    //防止重复添加结束提示
    if (!document.getElementById('info')) {
        $("#grid-container").append($('<div id="info"><p class="tips">本次得分:</p><div class="sumScore">' + score + '</div><a href="javascript:restartGame();" id="restartGameButton">Try Again</a></div>'));
        $("#info").css({
            width: "500px",
            height: '500px',
            backgroundColor: 'rgba(0,0,0,0.5)'
        });
        score = 0;
        updateScore(score);
    }
}