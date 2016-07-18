// 変数を宣言
var num0;
var num1;
var num2;

// 代入
num0 = 32;      // 数値を代入
num1 = 7;       // 数値を代入
num2 = 32;      // 数値を代入

// 表示
document.write("num0 = " + num0);
document.write("<br />");
document.write("num1 = " + num1);
document.write("<br />");
document.write("num2 = " + num2);
document.write("<br />");

// num0 の値が偶数か奇数かを判定
if (num0 % 2 === 0) {
    document.write("num0 は偶数です!");
    document.write("<br />");
}
else {
    document.write("num0 は奇数です!");
    document.write("<br />");
}

// num1 の値が偶数か奇数かを判定
if (num1 % 2 === 0) {
    document.write("num1 は偶数です!");
    document.write("<br />");
}
else {
    document.write("num1 は奇数です!");
    document.write("<br />");
}

// num0 と num1 が等しいかを判定
var flag = (num0 === num1);
if (flag === true) {
    document.write("num0 と num1 は等しいです!");
    document.write("<br />");
}
else {
    document.write("num0 と num1 は等しくないです!");
    document.write("<br />");
}

// num0 と num2 が等しいかを判定
if (num0 === num2) {
    document.write("num0 と num2 は等しいです!");
    document.write("<br />");
}
else {
    document.write("num0 と num2 は等しくないです!");
    document.write("<br />");
}
