/*
 * おまじない
 */
enchant();


/*
 * 定数
 */
// パラメータ
var SCREEN_WIDTH    = 640;  // スクリーンの幅
var SCREEN_HEIGHT   = 640;  // スクリーンの高さ


/*
 * グローバル変数
 */
var game    = null;


/*
 * 汎用処理
 */
// ランダム値生成
var randfloat = function(min, max) {
    return Math.random()*(max-min)+min;
};


/*
 * メイン処理
 */
window.onload = function() {
    // ゲームオブジェクトの生成
    game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
    
    // ゲーム開始時の処理
    game.onload = function() {
        // 3D 用シーン生成
        var scene = new Scene3D();
        
        // ライト生成
        var light = new DirectionalLight(); // 平行光源生成
        light.directionZ = 1;               // 向き
        light.color = [1.0, 1.0, 1.0];      // 色
        scene.setDirectionalLight(light);   // scene にセット
        
        // カメラ生成
        var camera = new Camera3D();                                // カメラ生成
        camera.x = 0; camera.y = 0; camera.z = 10;                  // カメラ位置をセット
        camera.centerX = 0; camera.centerY = 0; camera.centerZ = 0; // 注視点をセット
        scene.setCamera(camera);                                    // scene にセット
        
        // 球体
        var sphere = new Sphere();  // 生成
        scene.addChild(sphere);     // scene にセット
    };
    
    game.start();
};

