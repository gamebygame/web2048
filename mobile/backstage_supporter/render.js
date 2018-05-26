/**
 * Created by dell on 2014/12/7.
 */


function showNumberWithAnimation(randomX, randomY, randomNumber) {
    // 动画显示也得一步步走 先拿到数字块吧
    var numberCell = $('#number-cell-' + randomX + "-" + randomY);

    // 拿到数字块就改变外观吧 方法跟前台展示数字块的方法一样
    numberCell.css('background-color', getNumberBackgroundColor(randomNumber));
    numberCell.css('color', getNumberColor(randomNumber));
    numberCell.text(randomNumber);

    // 最后用动画去改变到想要它成为的样子吧 勇敢的用数字块展示吧
    // 原理跟主类里改变前端的方法基本一致 只不过加了过渡时间 100ms 罢了
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPositionTop(randomX, randomY),
        left: getPositionLeft(randomX, randomY)
    }, 100);
}


/* 动态移动小格子的方法 */
function showMoveAnimation(fromX, fromY, toX, toY) {
    // 先拿到那个起始数字块
    var numberCell = $('#number-cell-' + fromX + '-' + fromY);
    numberCell.animate({
        // 目的地自然是要打印在合适的位置 并覆盖掉以前的块
        top: getPositionTop(toX, toY),
        left: getPositionLeft(toX, toY)
    }, 200);
}

