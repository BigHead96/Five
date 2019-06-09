// 获取开始按钮
var start = document.querySelector(".start");
// 获取开始界面内容
var mask = document.querySelector(".mask");
//获取统计工具栏
var tool = document.querySelector(".tool");
// 获取功能按钮的盒子
var functionBox = document.querySelector(".functionBox");
// 获取认输按钮
var lose = document.querySelector(".lose");
// 获取退出按钮
var exit = document.querySelector(".exit");
// 回去重新开始按钮
var restart = document.querySelector(".restart");
var cValue = NowData.time;
var cGrade = NowData.grade;
var obj = {};
var a = 5;
//获取得分纪录
// var cGrade = sessionStorage.getItem('grade');
// 用户登录注册
var NowData = 0;
var mask = document.querySelector(".mask");
var mask1 = document.querySelector(".mask1");
var JsonArray = [
    {
        "username" : "dxl",
        "time" : 0,
        "grade" : 100,
    }
];

function add(){
    var username = document.getElementById("username").value;
    obj.username = username;
    obj.grade = 0;
    JsonArray.push(obj);
    sessionStorage.setItem('object',JSON.stringify(JsonArray));
    NowData = obj;
    return;
}

function modTime(){
    var username = document.getElementById("username").value;
    obj.username = NowData.username;
    obj.time = cValue;
    obj.grade = cGrade;
    JsonArray.splice(1,1,obj);
    sessionStorage.setItem('object',JSON.stringify(JsonArray));
    NowData = obj;
    return;
}
function modGrade(){
    var username = document.getElementById("username").value;
    JsonArray[a].username = NowData.username;
    JsonArray[a].time = cValue;
    JsonArray[a].grade = NowData.grade;
    JsonArray.splice(a,1,obj);
    console.log(JsonArray)
    sessionStorage.setItem('object',JSON.stringify(JsonArray));
    // NowData = obj;
    return;
}
//进入游戏
function enterGame(){
    sessionStorage.setItem('object',JSON.stringify(JsonArray));
    var theData = $.parseJSON(sessionStorage.getItem("object"));
    var username = document.getElementById("username").value;
    if (username == ""){
        layer.msg('请输入用户名')
    }else{
        $.each(theData, function(x, result){
            if (username == result['username']){
                NowData = theData[x];
                a = x;
            }
            else{
                add();
                }
        });
        mask.style.display = "flex";
        mask1.style.display = "none";
    }
}

/*开始游戏*/
start.addEventListener("click", function () {
    mask.style.display = "none";
    functionBox.style.display = "flex";
    tool.style.display = "block";
    var now = new Date();
    startTime = now.getTime();
    timer();
    grade();
});
//得分
function grade() {
    // var cGrade = NowData.grade;
    $('#grade').attr('value', "得分：" + NowData.grade);
}
//时钟
function timer() {
    var now = new Date(),
        ms = now.getTime();
    cValue = Math.ceil((ms - startTime) / 1000);
    if (flag === false) {
        $('#cTime').attr('value', "时间：" + cValue);
        modTime();
        // sessionStorage.setItem('time', cValue);
        return;
    }
    else {
        if (cValue < 1000) {
            $('#cTime').attr('value', "时间：" + cValue);
            setTimeout(function () {
                timer();
            }, 100);
        }
        else
            layer.confirm('游戏结束', {
                btn: ['退出'] //按钮
            }, function () {
                location.reload();
            });
    }
    var time = [100];
    var Time = sessionStorage.getItem('time');
    for (var i = 0; i < time.length; i++) {
        if (flag === false) {
            time[i] = Time;
            console.log(time[i]);
        } else return;
    }
}
/*退出游戏*/
exit.addEventListener("click", function () {
    layer.confirm('确定要退出游戏？', {
        btn: ['取消', '退出'] //按钮
    }, function () {
        layer.msg('请继续游戏', { icon: 1, time: 1000 });
    }, function () {
        window.close();
    });
});
/*重新开始*/
restart.addEventListener("click", function () {
    layer.confirm('确定要重新开始？', {
        btn: ['取消', '确认'] //按钮
    }, function () {
        if (flag) {
            layer.msg('请继续游戏', { icon: 1, time: 1000 });
        } else {
            layer.alert("游戏结束,请重新开始")
        }
    }, function () {
        location.reload();
       });
});
// 认输
lose.addEventListener("click", function () {
    if (flag) {
        if (have === 1) {
            layer.confirm('确定要认输？', {
                btn: ['取消', '确认'] //按钮
            }, function () {
                layer.msg('请继续游戏', { icon: 1, time: 1000 });
            }, function () {
                over = true;
                // sessionStorage.setItem('time', cValue);
                modTime();
                NowData.grade=+50;
                cGrade = NowData.grade;
                modGrade();
                layer.msg('你输了', { icon: 5, time: 1000 });
                setTimeout(function () {
                    location.reload();
                }, 1100);
            });
        } else {
            layer.confirm('亲,还没开始下棋不能认输哦!', {
                btn: ['确认'] //按钮
            })
        }
    } else {
        layer.alert("游戏结束,无法认输");
    }

});
var about = document.querySelector(".about");
var aboutAlert = document.querySelector(".aboutAlert");
var closeBtn = document.querySelector(".closeBtn");
about.onclick = function () {
    aboutAlert.style.display = "block";
};
closeBtn.onclick = function () {
    aboutAlert.style.display = "none";
};