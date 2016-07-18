/*
 * for を使う
 */
// 数値を表示する
for (var i=0; i<10; ++i) {
    document.write(i);
}
document.write("<br />");

// ★を段々に表示する
for (var i=0; i<16; ++i) {
    for (var j=0; j<=i; ++j) {
        document.write("★")
    }
    document.write("<br />");
}


/*
 * 配列
 */
var arr = [2, 4, 8, 16, 32, 64, 128];
// 配列の中身を表示
for (var i=0,len=arr.length; i<len; ++i) {
    document.write(i + ":" + arr[i]);
    document.write("<br />");
}


/*
 * オブジェクト
 */
var obj = {
    "name": "phi",
    "age": 23,
    "bloodType" : 'O',
};
// オブジェクトの中身を表示
for (var key in obj) {
    document.write(key + ":" + obj[key]);
    document.write("<br />");
}
