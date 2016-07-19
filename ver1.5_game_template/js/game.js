/*
 * 呼び出し開始
 */
enchant();

/*
 * 定数
 */
/*****各種パラメータ*****/
// スクリーン画面関連
var SCREEN_WIDTH = 663; // スクリーンの幅
var SCREEN_HEIGHT = 811; // スクリーンの高さ

// 音符関連
var MusicalNote_MAX_NUM = 5; // 音符の数
var MusicalNote_WIDTH = 32; // 音符の幅
var MusicalNote_HEIGHT = 32; // 音符の高さ
var MusicalNote_SPEED = 4; // 音符の移動スピード
var MusicalNote_MOVE_TIME = 30; // 音符の移動時間
var MusicalNote_WAIT_TIME = 1; // 音符の待ち時間

// 叩くオブジェクト関連
var MusicalObject_NUM = 5;//叩くオブジェクトの数

// 画像データ
var FIELD_IMAGE = "img/game_lane.png"// 背景画像
var MusicalNote_IMAGE = "img/bug.png";// 音符

// アセットリスト(画像登録用)
var ASSETS = [ FIELD_IMAGE, MusicalNote_IMAGE, ];

/*
 * グローバル変数
 */
var game = null;

var first = null;
var second = null;
var third = null;
var forth = null;
var fifth = null;

//var scoreLabel = null;

/*
 * 汎用処理
 */
// ランダム値生成
var randfloat = function(min, max) {
	return Math.random() * (max - min) + min;
};

/*
 * メイン処理
 */
window.onload = function() {
	// ゲームオブジェクトの生成
	game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
	// 画像の読み込み
	game.preload(ASSETS);
	// サウンドファイルの読み込み
	game.se = Sound.load('sound/test.mp3');
	// 音をならす
	game.se.play();

	first = [];
	second = [];
	third = [];
	forth = [];
	fifth = [];

	/*ゲーム領域をブラウザの中央に移動する処理(定期更新)*/
	setInterval(function() {
		var left = (window.innerWidth - (game.width * game.scale)) / 2;
		$('#enchant-stage').css({
			"position" : "absolute",
			"left" : left + "px"
		});
		game._pageX = left;
	}, 100);

	// ゲーム開始時の処理
	game.onload = function() {
		var scene = game.rootScene;
		scene.backgroundColor = "black";

		// 背景を生成, 表示
		var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
		bg.image = game.assets[FIELD_IMAGE];
		scene.addChild(bg);

		// スコアラベルを生成，表示
		// scoreLabel = newScoreLabel(10, 10);
		// scoreLabel.score = 0;
		// scoreLabel.element.style.zIndex = 100;
		// scene.addChild(scoreLabel);

		// 音符の数をセット
        game.MusicalNoteNum = MusicalNote_MAX_NUM;

		// 音符を生成
		for (var i = 0; i < MusicalNote_MAX_NUM; ++i) {
			var musicalnote = new MusicalNote();
			var num = Math.floor(Math.random() * 5);
			musicalnote.moveTo(num * (SCREEN_WIDTH / 5) + (SCREEN_WIDTH / 5)
					/ 2, 0);
			switch (num) {
			case 0:
				first.push(musicalnote);
				break;
			case 1:
				second.push(musicalnote);
				break;
			case 2:
				third.push(musicalnote);
				break;
			case 3:
				forth.push(musicalnote);
				break;
			case 4:
				fifth.push(musicalnote);
				break;
			}
			scene.addChild(musicalnote);
		}

		// 叩くオブジェクトを生成
		for (var i = 0; i < MusicalObject_NUM; i++) {
			var musicalobject = new MusicalObject(i);// 何番目のオブジェクトか指定
			musicalobject.moveTo(i * (SCREEN_WIDTH / 5) + (SCREEN_WIDTH / 5)
					/ 2, SCREEN_HEIGHT * 0.8);
			scene.addChild(musicalobject);
		}
	};
	game.start();// ゲーム起動
};

/*
 * 叩くオブジェクトクラス
 */
var MusicalObject = Class.create(Sprite, {
	// 初期化処理
	initialize : function(num) {
		Sprite.call(this, MusicalNote_WIDTH, MusicalNote_HEIGHT);
		this.image = game.assets[MusicalNote_IMAGE];// 画像
		this.num = num;
	},
});

/*
 * 音符クラス
 */
var MusicalNote = Class.create(Sprite, {
	// 初期化処理
	initialize : function() {
		Sprite.call(this, MusicalNote_WIDTH, MusicalNote_HEIGHT);
		this.image = game.assets[MusicalNote_IMAGE];// 画像
		this.timer = randfloat(0, MusicalNote_MOVE_TIME);
		// 移動処理をセット
		this.update = this.move;
	},
	// 移動処理
	move : function() {
		// 向いている方向に移動
		this.y += MusicalNote_SPEED;

		// フレームアニメーション
		this.frame = 1 - this.frame;

		// 待ちモードに切り替える
		if (this.timer > MusicalNote_MOVE_TIME) {
			this.timer = 0;
			this.update = this.wait;
		}
	},
	// 待ち処理
	wait : function() {
		// 移動モードに切り替える
		if (this.timer > MusicalNote_WAIT_TIME) {
			this.timer = 0;
			this.update = this.move;
		}
	},
	// 削除待ち
    destroyWait: function() {
        this.opacity = 1 - (this.timer/MusicalNote_WAIT_TIME);
        if (this.timer > MusicalNote_WAIT_TIME) {
            this.parentNode.removeChild(this);
        }
    },
	// 更新処理
	onenterframe : function() {
		// 更新処理実行
		this.update();
		// タイマー更新
		this.timer += 1;
		// 画面からはみ出た時に消去する(後で修正)
		var bottom = SCREEN_HEIGHT - this.height;
		if (bottom < this.y) {
			this.parentNode.removeChild(this);
			switch (this.num) {
			case 0:
				first.remove(musicalnote);
				break;
			case 1:
				second.remove(musicalnote);
				break;
			case 2:
				third.remove(musicalnote);
				break;
			case 3:
				forth.remove(musicalnote);
				break;
			case 4:
				fifth.remove(musicalnote);
				break;
			}
		}
	},
	// タッチ開始時処理
    ontouchstart: function() {
        this.timer = 0;
        this.frame  = 2;
        this.update = this.destroyWait;
        this.ontouchstart = null;       
        game.MusicalNoteNum-=1;
    },
});