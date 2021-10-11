var fs = require("fs");
var path = require("path");//解析需要遍历的文件夹
var config = require("../config");//解析需要遍历的文件夹
// 获取目录树
// data {}
const getDir = (data, send) => {
  const tree = [];
  let d = 0;
  //调用文件遍历方法
  fileDisplay(config.dir, tree, d, () => send(tree));
};
// 解析文件
// data { url }
const decodeFile = (data, send) => {
  const content = fs.readFileSync(data.url).toString() || "";
  decodeTs(content);
};

module.exports = {
  action: (data, send) => {
    switch (data.action) {
      case "getDir":
        getDir(data.data, send);
      case "decodeFile":
        decodeFile(data.data, send);
    }
  }
};

//文件遍历方法
function fileDisplay(filePath, tree, d, send) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err);
    } else {
      d += files.length;
      //遍历读取到的文件列表
      files.forEach(function(filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function(eror, stats) {
          if (eror) {
            console.warn("获取文件stats失败");
          } else {
            d--;
            var isFile = stats.isFile();//是文件
            var isDir = stats.isDirectory();//是文件夹
            if (isFile) {
              tree.push({
                title: filename,
                key: filedir,
                isLeaf: true
              });
              if (d === 0) {
                send();
              }
              // 读取文件内容
              // var content = fs.readFileSync(filedir, "utf-8");
            }
            if (isDir) {
              const children = [];
              tree.push({
                title: filename,
                key: filedir,
                children: children
              });
              fileDisplay(filedir, children, d, send);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}


function decodeTs(file) {

}
