var shell = require("shelljs");

var a = shell.dirs();
var a1 = shell.cat("/Users/bytedance/study/project/bridge/bridge/dir/index.js");
console.log(JSON.stringify(a1));
console.log(typeof (a1));
console.log((a1.stdout));