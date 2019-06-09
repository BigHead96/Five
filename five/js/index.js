var me = true;
var over = false;
var nowi = 0, nowj = 0;
var comi = -1, comj = -1;
var comWin = [];
var meWin = [];
var have;  //棋盘是否有棋子
var flag = true; //能否继续下棋
var cGrade = 0;//获取得分纪录

//定义一个二维数组来保存棋盘上落子情况
var chessBoard = [];
for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
}
//拿画板
var c = document.querySelector("#c1");
//获得权限
var drawChess = c.getContext("2d");

//绘制棋盘
function drawChessBorad() {
    //线条颜色
    drawChess.strokeStyle = "#9c6111";

    for (var i = 0; i < 15; i++) {
        drawChess.moveTo(15 + 30 * i, 15);
        drawChess.lineTo(15 + 30 * i, 435);
        drawChess.stroke();   //画竖线
        drawChess.moveTo(15, 15 + 30 * i);
        drawChess.lineTo(435, 15 + 30 * i);
        drawChess.stroke();   //画横线
    }
}

drawChessBorad();

//绘制棋子
var chess = function (i, j, me) {
    drawChess.beginPath();
    drawChess.arc(15 + 30 * i, 15 + 30 * j, 13, 0, 2 * Math.PI);
    drawChess.closePath();
    //判断棋子颜色
    //设置渐变色
    var gradient = drawChess.createRadialGradient(15 + 30 * i + 2, 15 + 30 * j - 2, 13, 15 + 30 * i + 2, 15 + 30 * j, 2);
    if (me) {
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636767");
    } else {
        gradient.addColorStop(0, "#d1d1d1");
        gradient.addColorStop(1, "#f9f9f9");
}
    drawChess.fillStyle = gradient;
    drawChess.fill();//填充
};
//绘制标记
var chessMark = function (i, j) {
    drawChess.beginPath();
    drawChess.arc(15 + 30 * i, 15 + 30 * j, 1, 0, 2 * Math.PI);
    drawChess.closePath();
    //设置标记变色
    var gradient = drawChess.createRadialGradient(15 + 30 * i , 15 + 30 * j, 0, 15 + 30 * i, 15 + 30 * j, 2);
        gradient.addColorStop(0, "#fa0800");
        gradient.addColorStop(0.1, "#ee2721");
    drawChess.fillStyle = gradient;
    drawChess.fill();//填充
};

//赢法数组
var wins = [];
//初始化棋盘
for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}
//赢法的数量
var count = 0;
//横线赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
     }
}
//竖线赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}
//斜线赢法
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
//反斜线赢法
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}
//赢法统计
var myWin = [];
var computerWin = [];
for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}
//得分
var NowData = 0;
function grade(){
    var cGrade = NowData.grade;
    $('#grade').attr('value', "得分："+cGrade);
}

//下棋的方法
c.onclick = function (e) {
    if (over) {
        return;
    }
    if (!me) {
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    nowi = i;
    nowj = j;
    if (chessBoard[i][j] === 0) {
        chess(i, j, me);
        chessBoard[i][j] = 1;
        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                myWin[k]++;
                comWin[k] = computerWin[k];// 为悔棋做准备
                computerWin[k] = 6;
                if (myWin[k] === 5) {
                    over = true;
                    flag = false;
                    // NowData.grade=+50;
                    // console.log(NowData.grade);
                    grade();
                    layer.confirm('你赢了', {
                        btn: ['确认'] //按钮
                    }, function () {
                        layer.alert("想再来一局请点击重新开始");
                    });
                }
            }
        }
        if (!over) {
            me = !me;
            setTimeout(function () {
                computerChess()
            },500);
        }
    }
    have = chessBoard[i][j];
};

var computerChess = function () {
    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0, v = 0;
    chess(comi, comj, false);
    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] === 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (myWin[k] === 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] === 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] === 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] === 4) {
                            myScore[i][j] += 10000;
                        }
                        if (computerWin[k] === 1) {
                            computerScore[i][j] += 220;
                        } else if (computerWin[k] === 2) {
                            computerScore[i][j] += 420;
                        } else if (computerWin[k] === 3) {
                            computerScore[i][j] += 2100;
                        } else if (computerWin[k] === 4) {
                            computerScore[i][j] += 30000;
                        }
                    }
                }
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] === max) {
                    if (computerScore[i][j] > computerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                if (computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                } else if (computerScore[i][j] === max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    comi = u;
    comj = v;
    chess(u, v, false);
    chessMark(u,v);
    chessBoard[u][v] = 2;
    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            computerWin[k]++;
            meWin[k] = myWin[k];
            myWin[k] = 6;
            if (computerWin[k] === 5) {
                over = true;
                flag = false;
                NowData.grade = NowData.grade+50;
                cGrade = NowData.grade;
                console.log(cGrade);
                modGrade();
                grade();
                layer.confirm('你输了', {
                    btn: ['确认'] //按钮
                }, function () {
                    layer.alert("想再来一局请点击重新开始");
                });
            }
        }
    }
    if (!over) {
        me = !me;
    }
};
// 悔棋
var back = document.querySelector(".back");
var backCount = 0;
back.addEventListener("click", function (e) {
    if (flag) {
        if (have === 1) {
            backCount++;
            if (backCount === 1) {
                layer.confirm('确定要悔棋(整局游戏只能悔棋一次)？', {
                    btn: ['取消', '确认'] //按钮
                }, function () {
                    backCount--;
                    layer.msg('请继续游戏', {icon: 1, time: 1000});
                }, function () {
                    over = false;
                    me = true;

                    //我，悔棋
                    chessBoard[nowi][nowj] = 0; //我，已占位置还原
                    chessBack(nowi, nowj); //销毁棋子
                    for (var k = 0; k < count; k++) {      //将可能赢得情况都减一
                        if (wins[nowi][nowj][k]) {
                            myWin[k]--;
                            computerWin[k] = comWin[k];  //这个位置对方可能赢
                        }
                    }
                    //计算机相应的悔棋
                    chessBoard[comi][comj] = 0; //计算机已占位置还原
                    chessBack(comi, comj); //销毁棋子
                    for (var k = 0; k < count; k++) {
                        if (wins[comi][comj][k]) {
                            computerWin[k]--;
                            myWin[k] = meWin[k];  //这个位置对方可能赢
                        }
                    }

                    //擦除棋子
                    function chessBack(i, j) {
                        //擦除该圆
                        drawChess.clearRect((i) * 30, (j) * 30, 30, 30);
                        //重画该圆周围的格子
                        drawChess.strokeStyle = "#6f4611";
                        drawChess.beginPath();
                        drawChess.moveTo(15 + 30 * i, j * 30);
                        drawChess.lineTo(15 + 30 * i, j * 30 + 30);
                        drawChess.stroke();
                        drawChess.moveTo(i * 30, j * 30 + 15);
                        drawChess.lineTo((i + 1) * 30, j * 30 + 15);
                        drawChess.stroke();
                    }
                });
            } else {
                layer.alert("只能悔一次！");
            }
        } else {
            layer.alert("亲,还没开始下棋不能悔棋哦!！");
        }
    }else{
        layer.alert("游戏结束,无法悔棋");
    }
});