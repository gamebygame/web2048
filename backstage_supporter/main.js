/**
 * Created by dell on 2014/12/7.
 */


/* 主要逻辑 鉴于实现简易型  model 实体类直接在这里实现 */
/* 这里拼接整体架构 直指需求 我们需要表示界面的变量*/
// 脚手架 scaffold

// 表示界面
var board =  new Array();

// 表示分数
var score = 0;


/* 加载主函数 这里就是程序入口啦 */
$(document).ready(function () {
    newGame();
});


/* 入口调用的主要逻辑函数 */
function newGame() {
    // 先初始化盒子
    init();
    // 再初始化随机格子位置打印两个数字 把下面那个方法调用两次就 ok 了
    // 下面这个方法就是在 16 个格子里面随便找一个空闲的格子并随机赋给一个数字
    generateOneNumber();
    generateOneNumber();
}


/* 这里是入口调用的第一个方法 同志们好 我就是初始化盒子的函数 */
function init() {
    // 二维坐标系  4 * 4 打印
    for(var i = 0 ; i < 4; i++){
        for(var j = 0; j < 4; j++){
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPositionTop(i, j));
            gridCell.css('left', getPositionLeft(i, j));
        }
    }

    // 我们的全局变量 board 是个一位数组 可是我们需要二维数组啊 怎么办 切 每个数组里的成员自己成为数组不就好了
    for(var i = 0; i < 4; i++){
        board[i] = new Array();
        // 到这里越来越清晰了吧 其实布局也是很有意思的 循环不愧是 6 大描述世界的算法之一
        for(var j = 0; j < 4; j++){
            // 这样每个格子就完成初始化为 0 了
            board[i][j] = 0;
        }
    }

    // 上面那么辛苦在后台完成了每个格子初值的改变 我们接下来就让前台跟着改变吧
    updateBoardView();
}


/* 拿到后台全局数据的改变通知前台相应改变的函数 */
function updateBoardView() {
    // 这相当于每次数据改变前先把前台现有的情况归零
    $('.number-cell').remove();

    // 开始改变前台吧！
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            // 先在前台增加 div  这就是数字块啦
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            // 然后将每个数字块用变量表示 这样后台就可以操作了
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            // 判断每个小格子的现状 0 的话就不显示数字块
            if(board[i][j] == 0){
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                // 就算不显示数字块我们也得把它打印在 grid-cell 中间啊
                // 怎么做呢 很简单 把那个工具类拿出来的 grid-cell 坐标再往右下角推进一点就好啦
                theNumberCell.css('top', getPositionTop(i, j) + 50);
                theNumberCell.css('left', getPositionLeft(i, j) + 50);
            }else{
                // 小格子不为 0 果断用数字块覆盖掉小格子们啊 具体做法是将数字块的位置和大小全部跟小格子初始化为一样的
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPositionTop(i, j));
                theNumberCell.css('left', getPositionLeft(i, j));

                // 覆盖掉小格子后我们为了突出显示数字块 把颜色也弄成不同的吧
                // 这里做法是通过 board[i][j] 返回不同的背景色和前景色
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                // 颜色也区分的跟小格子不一样了 这样完美的覆盖了小格子 那么接着让玩家看到数字块本身的数字吧
                theNumberCell.text(board[i][j]);
            }
        }
    }
}


/* 这里是入口调用的第二个方法 大家好 我就是随机生成数字的方法 */
function generateOneNumber() {
    // 没有空闲格子了就没法生成数字了
    if(noSpace(board))
        return false;

    // 按需求来 一步步走 首先 不能意气用事 咳咳 玩笑啦
    // 直指需求 玩游戏肯定要在随机位置生成数字嘛 这小孩子都知道 也就是说我们随便给 x y 坐标点找个小于 4 的随机整数就好了嘛
    // 这里用 js 的随机生成数 0~1  然后乘以 4 变成 0~4 的浮点数  最后向下取整  千万别忘了浮点转整型啊
    var randomX = parseInt(Math.floor(Math.random() * 4));
    var randomY = parseInt(Math.floor(Math.random() * 4));
    // 作为业余做游戏的 我们同样应该保持逻辑清醒 上面的确找到一个位置了 但我们还不能断定这里可以让你拿来生成数字
    while(true){
        // 所以只有这格子为 0 的时候你才能拿去生成数字啦
        if (board[randomX][randomY] == 0){
            break;
        }
        // 不为 0 怎么办 还用得着想嘛 继续找空格子直到你能找到一个值为 0 的格子你就可以走出这个循环啦 加油吧
        randomX = parseInt(Math.floor(Math.random() * 4));
        randomY = parseInt(Math.floor(Math.random() * 4));
    }

    // 位置找好了就随便找个数字给这个位置吧
    // 灵活运用随机生成数字的方法 我们只需要 2 和 4 啊 所以亲爱的 你只需要拿着随机生成的数字判断它和 0.5 的大小就相应传出 2 或 4 嘛
    var randomNumber = Math.random() < 0.5 ? 2 : 4;

    // 位置 数字都有了 最后尼玛你不打印到前台的话玩家知道个毛啊
    // 先把数字给那个位置嘛
    board[randomX][randomY] = randomNumber;
    // 我们要让前台打印这个结果 为了照顾人性的成分 我们使用动画去渐渐的展示结果 传入相应的坐标和数字交给这个方法去显示吧
    showNumberWithAnimation(randomX, randomY, randomNumber);

    return true;
}


/* 因为 2048 是基于玩家控制推动游戏循环进行的 所以我们不多开线程 只用单线程一个方法拼接主逻辑*/
$(document).keydown(function (event) {
    switch (event.keyCode){
        // 只有上下左右四个按键触发玩家控制 我们在这里就制作主逻辑的一部分 即玩家控制器
        case 65:        // 左
            // 以此为例 比俄罗斯方块还简单 被按下后 能向左移动就移动
            if(moveLeft()){
                // 先新增加一个数字 这里不需要担心新增加的数字是否会挤满格子 因为我们下面的方法里有处理这里的逻辑
                setTimeout("generateOneNumber()", 220);
                // 根据正常情况 这有可能导致游戏结束
                setTimeout("isGameOver()", 300);
            }
            break;

        /* 下面都是一个道理 */
        case 87:        // 上
            if(moveUp()){
                setTimeout("generateOneNumber()", 220);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 68:        // 右
            if(moveRight()){
                setTimeout("generateOneNumber()", 220);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 83:        // 下
            if(moveDown()){
                setTimeout("generateOneNumber()", 220);
                setTimeout("isGameOver()", 300);
            }
            break;
        default:
            break;
    }
});


/* 判断结束游戏的方法 */
function isGameOver(){
    /* 当所有小格子全部占满的时候并且不会产生移动的时候判定游戏结束 */
    if(noSpace(board) && canNotMove(board)){
        alert("boy, Game Over now!");
    }
}


/* 向左键入的方法 */
function moveLeft() {
    // 以向左移动为例 移动的前提自然是能不能移动啦
    if(!canMoveLeft(board)){
        return false;
    }
    // 确定可以向左移动之后 我们依然遍历除第一列之外的小格子
    for(var i = 0; i < 4; i++)
        for(var j = 1; j < 4; j++){
            // 这里其实可以不要下面的再次判断 因为 我们上面 canMoveLeft(board) 已经判断过了 不过无妨
            if(board[i][j] != 0){
                // 我们接着遍历当前小格子左边的所有格子
                for(var k = 0; k < j; k++){

                    // 这里我们拿到当前小格子左边的那个被迭代到的那个小格子 判断它是否为 0
                    // 并且当前的小格子和左边这个被迭代的小格子之间不能有障碍物的时候
                    // 注意那个判断不能有障碍物的方法 需要判断在第 i 行 j 列 与 k 列 之间的空间在 board 上是否为空的信息
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                        // 条件都满足就可以移动了 这里我们还是使用动画移动 从 i j 位置移动到 i k 位置
                        showMoveAnimation(i, j, i, k);
                        // 移动后会产生什么结果 无非是目的地格子被替换为起始格子的值 然后起始格子归零罢了
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        // 被迭代的这一次判断完成后直接进入下一次迭代重新判断
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)){
                        // 另一种可能性是将要移动的位置小格子跟自己相等 这个时候不仅仅要移动 还要相加
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        // 然后同上继续下一次迭代判断
                        continue;
                    }
                }
            }
        }
    // 因为计算机的循环过快 我们需要等待一会儿再执行初始化游戏界面的方法
    setTimeout("updateBoardView()", 200);
    return true;
}

/* 向上键入的方法 */
function moveUp() {
    if(!canMoveUp(board)){
        return false;
    }
    for(var i = 1; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(board[i][j] != 0){
                for(var k = 0; k < i; k++){
                    if(board[k][j] == 0 && noBlockVertical(i, k, j, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[k][j] == board[i][j] && noBlockVertical(i, k, j, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

/* 向右键入的方法 */
function moveRight() {
    if(!canMoveRight(board)){
        return false;
    }
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 3; j++){
            if(board[i][j] != 0){
                for(var k = j + 1; k < 4; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

/* 向下键入的方法 */
function moveDown() {
    if(!canMoveDown(board)){
        return false;
    }
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 4; j++){
            if(board[i][j] != 0){
                for(var k = i + 1; k < 4; k++){
                    if(board[k][j] == 0 && noBlockVertical(i, k, j, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[k][j] == board[i][j] && noBlockVertical(i, k, j, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

