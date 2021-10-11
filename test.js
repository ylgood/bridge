var split = require("./split");
var fs = require("fs");

const filedir = "/Users/bytedance/work/yuntu-product-jupiter/src/page/ProductSet/ProductSetsList.tsx";
var content = fs.readFileSync(filedir, "utf-8");

split.split(content);