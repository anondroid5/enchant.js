enchant();
 
window.onload = function(){

	var BPM = 123;
	var HOSEI = 950;//100ずつ変更し、Chromeなどの音ずれ現象に対応
	var bpf = 60000 / BPM / 4;
 		
	var YOKO = 0,
		MARU = 1,
		KURA = 2,
		SUBA = 3,
		RYO = 4,
		YASU = 5,
		HINA = 6;
			
	var yoko = new Array();
	var maru = new Array();
	var kura = new Array();
	var suba = new Array();
	var ryo = new Array();
	var yasu = new Array();
	var hina = new Array();
	 
	var memberLoc_x = new Array(7),
	    memberLoc_y = new Array(7),
	    moveOver_x = new Array(7),
	    moveOver_y = new Array(7);

	var yokoEnter = new Array(),
	    maruEnter = new Array(),
	    kuraEnter = new Array(),
 	    subaEnter = new Array(),
	    ryoEnter = new Array(),
	    yasuEnter = new Array(),
 	    hinaEnter = new Array();
	
	var yokoHit = new Array(),yokoPop = new Array(),
	    maruHit = new Array(),maruPop = new Array(),
	    kuraHit = new Array(),kuraPop = new Array(),
	    subaHit = new Array(),subaPop = new Array(),
	    ryoHit = new Array(),ryoPop = new Array(),
	    yasuHit = new Array(),yasuPop = new Array(),
	    hinaHit = new Array(),hinaPop = new Array();

var	line1 = 0,line2 = 0,
	line3 = 0,line4 = 0,
	line5 = 0,line6 = 0,line7 = 0;

	var count = 1;
	
		
	var memberColor = ["#404040","#ffa020","#00c000","#800000","#c0c000","#00e0e0","#c000c0"];
	var iconColor = ["#e0e0e0","#ffe080","#e0ffe0","#ffe0e0","#ffffc0","#e0ffff","#e0e0ff"];
	var effectColor = ["rgba(51,51,51,0.5)","rgba(255, 215, 0,0.3)","rgba(84, 255, 159,0.3)","rgba(255, 0, 0,0.3)","rgba(255, 255, 0,0.3)","rgba(0, 255, 255,0.3)","rgba(160, 32, 240,0.3)"];
 
	var game = new Game(800, 400); 
	game.fps = 24; 
	game.preload('img/icon.png','img/background.png','img/life.png','img/logo.png','sound/song.mp3'); 
 
	game.onload = function(){

	game.rootScene.tl.setTimeBased();
	
	for(var i = YOKO; i <= HINA; i++)
	{
		memberLoc_x[i] = 350-(350*(Math.cos(((i+1)/8)*Math.PI)));
		memberLoc_y[i] = 350*(Math.sin(((i+1)/8)*Math.PI))-70;
	}
	for(var i = YOKO; i <= HINA; i++)
	{
		moveOver_x[i] = 350-(700*(Math.cos(((i+1)/8)*Math.PI)));
		moveOver_y[i] = 700*(Math.sin(((i+1)/8)*Math.PI))-210;
	}
	
 
//背景設定
	game.rootScene.backgroundColor = '#000000'
	var point = new Label();
	var background = new Sprite(800,400);
	background.image = game.assets['img/background.png'];
	game.rootScene.addChild(background);
	
//キャラ背景を配置
	for( var i = YOKO; i <= HINA; i++ )
	{
	var iconback = new Sprite(100, 100);
	iconback.x = memberLoc_x[i];
	iconback.y = memberLoc_y[i];
	var surface1 = new Surface(100, 100);
	iconback.image = surface1;
	context = surface1.context;
	context.beginPath();        
	context.arc( 50, 50, 46, 0, Math.PI*2, true );
	context.fillStyle  = iconColor[i];
	context.fill();
	game.rootScene.addChild(iconback);
	}
 
//キャラを配置
	member = new Group();
	var icon = game.assets["img/icon.png"];
	for (var i = YOKO; i <= HINA; i++)
	{
		var chara = new Sprite(100,100);
		chara.image = icon;
		chara.x = memberLoc_x[i];
		chara.y = memberLoc_y[i];
		chara.frame = i;
		member.addChild(chara);
	}
	game.rootScene.addChild(member);
 
//Circleクラスを作成
var Circle = Class.create(Sprite,{
    	initialize: function(number){
    	Sprite.call(this, 100, 100);
    	this.x = memberLoc_x[number];
    	this.y = memberLoc_y[number];
    	var color = memberColor[number];
    	this.image = this.draw(color);
    	},
    	draw : function(color) {
    	var surface = new Surface(100, 100);
		context = surface.context;
		context.beginPath();        
		context.arc( 50, 50, 46, 0, Math.PI*2, true );
		context.strokeStyle  = color;
		context.lineWidth = 6;
		context.stroke();
		return surface;
    	}
    });
 
Circles = new Group();
	for (var i = YOKO ; i <= HINA; i++)
	{
		var circle = new Circle( i );
		Circles.addChild(circle);    
	}
game.rootScene.addChild(Circles);
 
//エフェクト
var Effect = Class.create(Sprite,{
    	initialize: function(number){
    	Sprite.call(this, 100, 100);
    	this.x = memberLoc_x[number];
    	this.y = memberLoc_y[number];
    	var color = effectColor[number];
		this.opacity = 0.3;
    	this.image = this.draw(color);
    	},
    	draw : function(color) {
    	var surface = new Surface(100, 100);
		context = surface.context;
		context.beginPath();        
		context.arc( 50, 50, 46, 0, Math.PI*2, true );
		context.fillStyle  = color;
		return surface;
    	},
    	hit : function(){
    	context = this.image.context;
    	this.tl.fadeIn(5);
    	context.fill();
		this.tl.fadeOut(5);
    	},   	
    });
 
Effects = new Group();
	for (var i = YOKO ; i <= HINA; i++)
	{
		var effect = new Effect( i );
		Effects.addChild(effect);    
	}
game.rootScene.addChild(Effects);
 
 
//点数表示
var point = 0;
var total = new Label();
total.color = "#FFFFFF";
total.text = point;
total.moveTo(350,0);
total.font = "20px cursive";
game.rootScene.addChild(total);
 
var pointUp = function(num){
 
point += num;
total.text = point;
 
}
 
//ライフ表示
var lifecount = 10;
var life = new Array(10);
var hearts = 9;
 
	for (var i = 0; i < 10; i++)
	{
		life[i] = new Sprite(20,20);
		var lifeicon = game.assets['img/life.png'];
		life[i].image = lifeicon;
		life[i].x = 25 * i+10;
		life[i].y = 30;		
		life[i].frame = i;
		game.rootScene.addChild(life[i]);
	}
 
 
//発射口
var shoot = new Sprite(100,60);
shoot.moveTo(350,70);
shoot.image = game.assets["img/logo.png"];
game.rootScene.addChild(shoot);
 
shoot.tl.setTimeBased();
shoot.tl.scaleTo(0.9, bpf*4)
		.scaleTo(1.1, 0)
		.loop();
 
//Beatクラス作成
var Beat = Class.create(Sprite,{
    	initialize: function(number){
    	Sprite.call(this, 100, 100);
    	this.x = 350;
    	this.y = 70;
    	this.color = memberColor[number];
    	this.target_x = moveOver_x[number];
    	this.target_y = moveOver_y[number];
    	this.image = this.draw(this.color);
    	this.scale(0.1,0.1);
    	//this.tl.setTimeBased();
    	},
	   	draw : function(color) {
    		var surface = new Surface(100, 100);
		context = surface.context;
		context.beginPath();        
		context.arc( 50, 50, 46, 0, Math.PI*2, true );
		context.lineWidth = 6;
		var grad = context.createLinearGradient(0, 30, 60, 100);
		grad.addColorStop(0, color);
		grad.addColorStop(0.5, "#FFFFFF");
		grad.addColorStop(1, color);
		context.strokeStyle= grad;
		context.strokeStyle= grad;
	    	context.stroke();
		return surface;
    	},
    	hit : function(){
 	game.rootScene.removeChild(this);
    	},
    	pop : function(){
	var count_p = count;
	this.addEventListener('enterframe', function() {
		if((count - count_p)<6){
			this.scaleX += 0.05;
			this.scaleY += 0.05;
			this.x += (this.target_x - this.x) / 35;
			this.y += (this.target_y - this.y) / 35;
		}
		else if((count - count_p)<8){
			this.x += (this.target_x - this.x) / 35;
			this.y += (this.target_y - this.y) / 35;
		}
		else if((count - count_p)<16){
			this.x += (this.target_x - this.x) / 25;
			this.y += (this.target_y - this.y) / 25;
		}else{
  		game.rootScene.removeChild(this);
		}	
   	});
		
	}
    });
    
//タイミング判定 
var hantei = function(num,line){

	var delay;
	if(num == YOKO){delay = yokoPop[line] - yokoHit[line];}
	else if(num == MARU){delay = maruPop[line] - maruHit[line];}
	else if(num == KURA){delay = kuraPop[line] - kuraHit[line];}
	else if(num == SUBA){delay = subaPop[line] - subaHit[line];}
	else if(num == RYO){delay = ryoPop[line] - ryoHit[line];}
	else if(num == YASU){delay = yasuPop[line] - yasuHit[line];}
	else if(num == HINA){delay = hinaPop[line] - hinaHit[line];}
	var popup = new Popup();
console.log(delay);
	if((delay < 50) && (delay > -50) ){
	popup.perfect();
	pointUp(100);
	}
	else if( (delay < 100) && (delay > -100)  ){
	popup.good();
	pointUp(50);
	}
	else{
	popup.bad();
 
	}
}
 
//ポップアップクラス
var Popup = Class.create(Label,{
  	initialize:function(){ 
    Label.call(this);
	this.color = "#FFFFFF";
	this.moveTo(350,150);
	this.font = "35px cursive";
	this.tl.setTimeBased();
	},
    perfect : function(){
    game.rootScene.addChild(this);
	this.text = "perfect"; 
	this.tl.fadeOut(300)
	.removeFromScene();
    },
    good : function(){
    game.rootScene.addChild(this);
	this.text = " good"; 
	this.tl.fadeOut(300)
	.removeFromScene();
    },
    bad : function(){
    game.rootScene.addChild(this);
	this.text = "  bad"; 
	this.tl.fadeOut(300)
	.removeFromScene();
    }, 
});
 
//キーバインド
game.keybind(73, 'a');
game.keybind(66, 'b');
game.keybind(69, 'e');
game.addEventListener('ebuttondown', function(e) {
	if (!game.input['e']) game.input['e'] = true;
	game.currentScene.dispatchEvent(e);
	});
game.keybind(70, 'f');
game.addEventListener('fbuttondown', function(e) {
	if (!game.input['f']) game.input['f'] = true;
	game.currentScene.dispatchEvent(e);
	});
game.keybind(86, 'v');
game.addEventListener('vbuttondown', function(e) {
	if (!game.input['v']) game.input['v'] = true;
	game.currentScene.dispatchEvent(e);
	});
game.keybind(78, 'n');
game.addEventListener('nbuttondown', function(e) {
	if (!game.input['n']) game.input['n'] = true;
	game.currentScene.dispatchEvent(e);
	});
game.keybind(74, 'j');
game.addEventListener('jbuttondown', function(e) {
	if (!game.input['j']) game.input['j'] = true;
	game.currentScene.dispatchEvent(e);
	});
 

var yokoMap = [72,184,516,532,540,548,564,582,588,596,602,684,700,716,732,740,1132,1148,1164,1180,1198,1204,1212,1218,1300,1316,1332,1348,1356,1556,1588,1612,1750,1752,1860,1876,1892,1908,1916,1988,2004,2020,2036,2044,2244,2292,2338];
var maruMap = [80,176,340,388,404,412,594,630,644,660,676,868,872,1004,1006,1020,1022,1210,1244,1260,1276,1292,1460,1468,1476,1484,1488,1574,1598,1618,1756,1758,1804,1820,1836,1852,1932,1948,1964,1980,2148,2156,2164,2172,2176,2236,2240,2260,2294];
var kuraMap = [88,168,452,468,484,500,634,648,664,668,780,788,796,1004,1006,1020,1022,1248,1264,1280,1284,1396,1404,1412,1620,1636,1652,1668,1676,1762,1764,1774,1808,1824,1840,1844,1936,1952,1968,1972,2084,2092,2100,2276,2296,2331];
var subaMap = [96,160,324,340,356,372,380,388,404,412,688,696,704,712,720,728,760,764,776,780,788,796,1132,1148,1164,1180,1200,1206,1216,1222,1304,1312,1320,1328,1336,1344,1376,1380,1392,1396,1404,1412,1768,1770,1864,1872,1880,1888,1896,1904,1992,2000,2008,2016,2024,2032,2064,2068,2080,2084,2092,2100,2298,2306];
var ryoMap = [104,152,196,198,228,230,260,262,276,278,624,640,656,676,812,828,844,852,860,868,872,1068,1084,1100,1116,1240,1256,1272,1292,1428,1440,1444,1456,1460,1468,1476,1484,1488,1762,1764,1774,1800,1816,1832,1852,1928,1944,1960,1980,2116,2132,2144,2148,2156,2164,2172,2176,2212,2228,2236,2240,2284,2304];
var yasuMap = [112,144,516,532,540,548,564,584,590,600,606,620,636,652,668,940,942,956,958,972,974,988,990,1236,1252,1268,1284,1572,1596,1616,1684,1700,1716,1732,1740,1756,1758,1796,1812,1828,1844,1924,1940,1956,1972,2268,2336,3302];
var hinaMap = [120,136,452,468,484,500,692,708,724,732,740,1068,1084,1100,1116,1308,1324,1340,1348,1356,1558,1590,1614,1750,1752,1868,1884,1900,1908,1916,1996,2012,2028,2036,2044,2252,2300,2332];

for (var i = 0 ; i< yokoMap.length; i++){
	yoko[i] = new Beat(YOKO);

} 
for (var i = 0 ; i< maruMap.length; i++){
	maru[i] = new Beat(MARU);
} 
for (var i = 0 ; i< kuraMap.length; i++){
	kura[i] = new Beat(KURA);
}
for (var i = 0 ; i< subaMap.length; i++){
	suba[i] = new Beat(SUBA);
} 
for (var i = 0 ; i< ryoMap.length; i++){
	ryo[i] = new Beat(RYO);
} 
for (var i = 0 ; i< yasuMap.length; i++){
	yasu[i] = new Beat(YASU);
} 
for (var i = 0 ; i< hinaMap.length; i++){
	hina[i] = new Beat(HINA);
} 
 

//キー操作 
game.addEventListener('ebuttondown', function(){
	if( yokoEnter.length == 1)
	{
		yoko[yokoEnter[0]].hit();

		var d = new Date();	
		yokoHit[yokoEnter[0]] = d.getTime();
		hantei(YOKO,yokoEnter[0]);
		yokoEnter.shift();
	}
	else
	{
		var dist = new Array();
		var min = 0;
		dist[0] = Math.abs(yoko[yokoEnter[0]].x - member.childNodes[YOKO].x);

		for (var i = 1; i< yokoEnter.length; i++)
		{
			dist[i] = Math.abs(yoko[yokoEnter[i]].x - member.childNodes[YOKO].x);
			if(dist[i-1] < dist[i]){
			min = yokoEnter[i-1];
			}else{
			min = yokoEnter[i];
			}		
		}
		yoko[min].hit();

		yoko[min].x = 800;
		var d = new Date();	
		yokoHit[min] = d.getTime();
		hantei(YOKO,min);

		yokoEnter.shift();	
	}

});


game.addEventListener('fbuttondown', function(){

	if( maruEnter.length == 1)
	{
		maru[maruEnter[0]].hit();
		var d = new Date();	
		maruHit[maruEnter[0]] = d.getTime();
		hantei(MARU,maruEnter[0]);
		maruEnter.shift();
	}
	else
	{
		var dist = new Array();
		var min = 0;
		dist[0] = Math.abs(maru[maruEnter[0]].x - member.childNodes[MARU].x);

		for (var i = 1; i< maruEnter.length; i++)
		{
			dist[i] = Math.abs(maru[maruEnter[i]].x - member.childNodes[MARU].x);
			if(dist[i-1] < dist[i]){
			min = maruEnter[i-1];
			}else{
			min = maruEnter[i];
			}		
		}
		maru[min].hit();
		maru[min].x = 800;
		var d = new Date();	
		maruHit[min] = d.getTime();
		hantei(MARU,min);

		maruEnter.shift();	
	} 
});
 
game.addEventListener('vbuttondown', function(){

	if( kuraEnter.length == 1)
	{
		kura[kuraEnter[0]].hit();
		var d = new Date();	
		kuraHit[kuraEnter[0]] = d.getTime();
		hantei(KURA,kuraEnter[0]);
		kuraEnter.shift();
	}
	else
	{
		var dist = new Array();
		var min = 0;
		dist[0] = Math.abs(kura[kuraEnter[0]].x - member.childNodes[KURA].x);

		for (var i = 1; i< kuraEnter.length; i++)
		{
			dist[i] = Math.abs(kura[kuraEnter[i]].x - member.childNodes[KURA].x);
			if(dist[i-1] < dist[i]){
			min = kuraEnter[i-1];
			}else{
			min = kuraEnter[i];
			}		
		}
		kura[min].hit();
		kura[min].x = 800;
		var d = new Date();	
		kuraHit[min] = d.getTime();
		hantei(KURA,min);

		kuraEnter.shift();	
	}
});
 
game.addEventListener('bbuttondown', function(){

	if( subaEnter.length == 1)
	{
		suba[subaEnter[0]].hit();
		var d = new Date();	
		subaHit[subaEnter[0]] = d.getTime();
		hantei(SUBA,subaEnter[0]);
		subaEnter.shift();
	}
	else
	{
		var dist = new Array();
		var min = 0;
		dist[0] = Math.abs(suba[subaEnter[0]].y - member.childNodes[SUBA].y);

		for (var i = 1; i< subaEnter.length; i++)
		{
			dist[i] = Math.abs(suba[subaEnter[i]].y - member.childNodes[SUBA].y);
			if(dist[i-1] < dist[i]){
			min = subaEnter[i-1];
			}else{
			min = subaEnter[i];
			}		
		}
		suba[min].hit();
		suba[min].y = 0;
		var d = new Date();	
		subaHit[min] = d.getTime();
		hantei(SUBA,min);

		subaEnter.shift();	
	}
});
 
game.addEventListener('nbuttondown', function(){

	if( ryoEnter.length == 1)
	{
		ryo[ryoEnter[0]].hit();
		var d = new Date();	
		ryoHit[ryoEnter[0]] = d.getTime();
		hantei(RYO,ryoEnter[0]);
		ryoEnter.shift();
	}
	else
	{
		var dist = new Array();
		var min = 0;
		dist[0] = Math.abs(ryo[ryoEnter[0]].x - member.childNodes[RYO].x);

		for (var i = 1; i< ryoEnter.length; i++)
		{
			dist[i] = Math.abs(ryo[ryoEnter[i]].x - member.childNodes[RYO].x);
			if(dist[i-1] < dist[i]){
			min = ryoEnter[i-1];
			}else{
			min = ryoEnter[i];
			}		
		}
		ryo[min].hit();
		ryo[min].x = 0;
		var d = new Date();	
		ryoHit[min] = d.getTime();
		hantei(RYO,min);

		ryoEnter.shift();	
	}
});
 
game.addEventListener('jbuttondown', function(){

	if( yasuEnter.length == 1)
	{
		yasu[yasuEnter[0]].hit();
		var d = new Date();	
		yasuHit[yasuEnter[0]] = d.getTime();
		hantei(YASU,yasuEnter[0]);
		yasuEnter.shift();
	}
	else
	{
		var dist = new Array();
		var min = 0;
		dist[0] = Math.abs(yasu[yasuEnter[0]].x - member.childNodes[YASU].x);

		for (var i = 1; i< yasuEnter.length; i++)
		{
			dist[i] = Math.abs(yasu[yasuEnter[i]].x - member.childNodes[YASU].x);
			if(dist[i-1] < dist[i]){
			min = yasuEnter[i-1];
			}else{
			min = yasuEnter[i];
			}		
		}
		yasu[min].hit();
		yasu[min].x = 0;
		var d = new Date();	
		yasuHit[min] = d.getTime();
		hantei(YASU,min);

		yasuEnter.shift();	
	}
});
 
game.addEventListener('abuttondown', function(){

	if( hinaEnter.length == 1)
	{
		hina[hinaEnter[0]].hit();
		var d = new Date();	
		hinaHit[hinaEnter[0]] = d.getTime();
		hantei(HINA,hinaEnter[0]);
		hinaEnter.shift();
	}
	else
	{
		var dist = new Array();
		var min = 0;
		dist[0] = Math.abs(hina[hinaEnter[0]].x - member.childNodes[HINA].x);

		for (var i = 1; i< hinaEnter.length; i++)
		{
			dist[i] = Math.abs(hina[hinaEnter[i]].x - member.childNodes[HINA].x);
			if(dist[i-1] < dist[i]){
			min = hinaEnter[i-1];
			}else{
			min = hinaEnter[i];
			}		
		}
		hina[min].hit();
		hina[min].x = 0;
		var d = new Date();	
		hinaHit[min] = d.getTime();
		hantei(HINA,min);

		hinaEnter.shift();	
	}
 
});

var yokoCue = function(){
		game.rootScene.addChild(yoko[line1]);
		yoko[line1].pop();
		yokoEnter.push(line1);
		var d = new Date();
		yokoPop[line1] = d.getTime() + bpf*8;
		line1++;		
}
var maruCue = function(){
		game.rootScene.addChild(maru[line2]);
		maru[line2].pop();
		maruEnter.push(line2);
		var d = new Date();
		maruPop[line2] = d.getTime() + bpf*8;
		line2++;
}
var kuraCue = function(){
		game.rootScene.addChild(kura[line3]);
		kura[line3].pop();
		kuraEnter.push(line3);
		var d = new Date();
		kuraPop[line3] = d.getTime() + bpf*8;
		line3++;
}
var subaCue = function(){ 
		game.rootScene.addChild(suba[line4]);

		suba[line4].pop();
		subaEnter.push(line4);
		var d = new Date();
		subaPop[line4] = d.getTime() + bpf*8;
		line4++;
}
var ryoCue = function(){ 
		game.rootScene.addChild(ryo[line5]);

		ryo[line5].pop();
		ryoEnter.push(line5);
		var d = new Date();
		ryoPop[line5] = d.getTime() + bpf*8;
		line5++;
}
var yasuCue = function(){ 
		game.rootScene.addChild(yasu[line6]);

		yasu[line6].pop();
		yasuEnter.push(line6);
		var d = new Date();
		yasuPop[line6] = d.getTime() + bpf*8;
		line6++;
}
var hinaCue = function(){ 
		game.rootScene.addChild(hina[line7]);

		hina[line7].pop();
		hinaEnter.push(line7);
		var d = new Date();
		hinaPop[line7] = d.getTime() + bpf*8;
		line7++;
}

var currTime = 0;
var bgm;
 
// Startシーン
        var second = new Scene();
        second.backgroundColor = "rgba(51,51,51,0.5)";
 
        var secondMessage = new Label("PUSH PLAY");
        secondMessage.x = 350;
        secondMessage.y = 150;
		secondMessage.color = "#FFFFFF";
		secondMessage.font = "20px cursive";
        
        second.addChild(secondMessage);
 
        game.pushScene(second);
 
second.addEventListener('touchstart', function() {
        game.popScene(second);
 
	var t = new Date();
	currTime = t.getTime() - HOSEI;
	bgm = game.assets['sound/song.mp3'].play();
 
//フレーム処理
	game.addEventListener('enterframe', function() {
		var d = new Date();
		var tlTime = d.getTime();
		var timing = tlTime - currTime;

		if( timing > (bpf * count)){
		count++;
		}
		if( yokoMap[line1] == count ){
		yokoCue();
		}
		if( maruMap[line2] == count ){
		maruCue();
		}
		if( kuraMap[line3] == count ){
		kuraCue();
		}	 		
		if( subaMap[line4] == count ){
		subaCue();
		}	 		
		if( ryoMap[line5] == count ){
		ryoCue();
		}	 		
		if( yasuMap[line6] == count ){
		yasuCue();
		}	 		
		if( hinaMap[line7] == count ){
		hinaCue();
		}	 		
        });
		        
});
    }   
    game.start();
};