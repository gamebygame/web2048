/**
 * Created by dell on 2014/12/7.
 */


/* 观察小格子边界布局算法的图片 我们发现第几行的参数影响小格子距离盒子顶部的距离 */
function getPositionTop (i, j){
    return 20 + 120 * i;
}

/* 同上道理 第几列的参数影响小格子距离盒子左边的距离 */
function getPositionLeft (i, j){
    return 20 + 120 * j;
}


/* 获取数据块背景色的方法 */
function getNumberBackgroundColor(number) {
    switch (number){
        case 2:return "#eee4da";break;
        case 4:return "#FFC0CB";break;
        case 8:return "#FF8247";break;
        case 16:return "#DB7093";break;
        case 32:return "#CD6889";break;
        case 64:return "#C67171";break;
        case 128:return "#BF3EFF";break;
        case 256:return "#C1CDC1";break;
        case 512:return "#97FFFF";break;
        case 1024:return "#8B4513";break;
        case 2048:return "#00FF7F";break;
        case 4096:return "#bebebe";break;
        case 8192:return "#663e8d";break;
    }
    return "black";
}

/* 获取数据块前景色的方法 就是数字文本自己的颜色啦 */
function getNumberColor(number) {
    // 其实数字本身的颜色除了 2 和 4 一样的之外 其他都是一个颜色
    if(number <= 4){
        return "#776e65";
    }
    return "white";
}


/* 判断是否还有空闲格子的方法 */
function noSpace(board) {
    // 别想复杂了 其实超简单 我们不是已经给了每个小格子一个数字么 这里只需要判断这个数字是否为 0 就好了
    // 具体做法是遍历所有小格子  为 0 果断就是空闲格子啊 华丽丽的把结果交给主类里面的方法去生成数字吧 这里的任务就完成了
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    return true;
}

/* 小格子无法移动的方法 */
function canNotMove(board) {
    // 这里当然指向上下左右都不能移动的时候返回 true 啦
    if(canMoveDown(board) ||
        canMoveLeft(board) ||
        canMoveRight(board) ||
        canMoveUp(board)){
        return false;
    }
    return true;
}


/* 判断能否向左移动的方法 */
function canMoveLeft(board) {
    // 根据 【向左移动算法图示】 我们了解到 我们只需要在这里判断左边还有没有数字 并判断左边的数字是否跟自己相等就好啦
    // 左边没有数字 并且左边数字跟自己想等 我们手里拿到的这个小格子就可以移动了
    for(var i = 0; i < 4; i++)
        // 最后再提醒下 我们向左移动是不用考虑最左边那一列啦 所以这里从第二列开始循环就好啦
        for(var j = 1; j < 4; j++){
            // 当前所遍历到的这个元素存在数字的话
            if(board[i][j] != 0)
                // 我们就接着判断它左侧的元素为 0 的话 或者 它左侧的元素等于自己的话都可以向左移动
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j])
                    return true;
        }
    return false;
}

/* 判断能否向上移动的方法 */
function canMoveUp(board) {
    for(var i = 1; i < 4; i++)
        // 这里不考虑最上面那一行啦
        for(var j = 0; j < 4; j++){
            if(board[i][j] != 0)
                if(board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                    return true;
        }
    return false;
}

/* 判断能否向右移动的方法 */
function canMoveRight(board) {
    for(var i = 0; i < 4; i++)
        // 这里不考虑最右面那一行啦
        for(var j = 0; j < 3; j++){
            if(board[i][j] != 0)
                if(board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                    return true;
        }
    return false;
}

/* 判断能否向下移动的方法 */
function canMoveDown(board) {
    for(var i = 0; i < 3; i++)
        // 这里不考虑最下面那一行啦
        for(var j = 0; j < 4; j++){
            if(board[i][j] != 0)
                if(board[i+1][j] == 0 || board[i+1][j] == board[i][j])
                    return true;
        }
    return false;
}


/* 判断当前格子水平方向上与将要移动到的格子之间是否有障碍物的判断 */
function noBlockHorizontal(row, col1, col2, board) {
    // TODO 我们这里改善一下逻辑 因为是同行判断 我们先找出在该行内较大和较小的那个列 重新赋值给新变量
    if(col1 < col2){
        var min = col1;
        var max = col2;
    }else{
        var min = col2;
        var max = col1;
    }
    // 然后一切照旧 我们从较小的列迭代累加至较大的列 判断那些格子中哪些不为 0
    for(var i = min + 1; i < max; i++){
        // 不为 0 就是有障碍物的意思 那么就直接返回 false  我们方法名可是判断没有障碍物才返回 true 啊
        if(board[row][i] != 0){
            return false;
        }
    }
    return true;
}

/* 判断当前格子竖直方向上与将要移动到的格子之间是否有障碍物的判断 */
function noBlockVertical(row1, row2, col, board){
    // TODO 这里也先按照上面的逻辑先比较下较大和较小的那个行
    if(row1 < row2){
        var min = row1;
        var max = row2;
    }else{
        var min = row2;
        var max = row1;
    }
    for(var i = min + 1; i < max; i++){
        if(board[i][col] != 0){
            return false;
        }
    }
    return true;
}

