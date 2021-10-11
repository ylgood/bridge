const dir = require("./dir");//解析需要遍历的文件夹
const setMsg = (action, msg) => {
  return JSON.stringify({
    action,
    data: msg
  });
};

const decodeTs = (file) => {
  const { action, data } = JSON.parse(msg);
  switch (action) {
    case "dir":
      dir.action(data, (msg) => send(setMsg("dir", msg)));
  }
};
module.exports = {
  decodeTs
};