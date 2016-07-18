/*
 * よく使う処理を関数化
 */
// 文字列を表示して改行
var println = function(str) {
    document.write(str);
    document.write("<br />");
};
// ランダム値生成
var randfloat = function(min, max) {
    return Math.random()*(max-min)+min;
};

// 関数を実行
println("Hello, world!");
println("Hello, world!");
println("Hello, world!");
println("ランダム値 : " + randfloat(0, 10));
println("ランダム値 : " + randfloat(-10, 10));


/*
 * 計算を関数化
 */
// 数値の合計を計算
var calcSum = function()
{
    var sum = 0;
    // 引数として渡された値全てを足す(arugments に配列として引数が入っている)
    for (var i=0, len=arguments.length; i<len; ++i) {
        sum += arguments[i];
    }
    
    return sum;
};
// 平均値を計算
var calcAverage = function() {
    return calcSum.apply(null, arguments) / arguments.length;
};

// 関数を実行
// 合計
println("[10, 20] の合計 : " + calcSum(10, 20));
println("[2, 4, 8, 16, 32] の合計 : " + calcSum(2, 4, 8, 16, 32));
// 平均
println("[0, 100] の平均 : " + calcAverage(0, 100));
println("[1, 1, 2, 3, 5, 8, 13, 21] の平均 : " + calcAverage(1, 1, 2, 3, 5, 8, 13, 21));







