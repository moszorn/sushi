//Cocos2d-JS項目使用resource.js文件管理資源文件
var res = {
    HelloWorld_png : "res/HelloWorld.png",

    BackGround_png : "res/Sushi/background.png",
        Start_N_png : "res/Sushi/start_N.png",
        Start_S_png : "res/Sushi/start_S.png",
        Sushi_png: "res/Sushi/sushi_1n/sushi_1n.png",
        Sushi_plist:"res/Sushi/sushi.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
