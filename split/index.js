const util = require("../util");//解析需要遍历的文件夹


const split = file => {
  const fl = file.split("\n");
  const flList = [];
  fl.forEach((f, index) => {
    const content = f.trim();

    if (content.startsWith("import") || content.startsWith("export") || content.startsWith("const") || content.startsWith("interface") || content.startsWith("const")) {
      flList.push({});
    }

  });

  const importList = [];
  const emptyList = [];
  const renderList = [];
  let connectContentStatus = false;
  let connectContent = "";
  let connectContentTest = () => false;
  fl.forEach((f, index) => {
    const content = f.trim();

    if (connectContentStatus) {
      if (connectContent === "import") {
        // import结束
        if (connectContentTest(content)) {
          connectContentStatus = false;
          importList.push({
            content: f,
            index,
            type: "import",
            id: importList[index - 1].id
          });
        }
      }
      renderList.push({
        content: f,
        index,
        layout: "render",
        id: util.random(10)
      });
      return;
    }
    // import
    if (content.startsWith("import")) {
      importList.push({
        content: f,
        index,
        type: "import",
        id: util.random(10)
      });
      // import结束
      if (/from( )*('|")(.*)('|")/.test(content)) {
        connectContentStatus = false;
      } else {
        connectContentStatus = true;
        connectContent = "import";
        connectContentTest = c => /from( )*('|")(.*)('|")/.test(c);
      }
    }

    if (content === "" || content.startsWith("//")) {
      importList.push({
        content: f,
        index,
        layout: "empty",
        id: util.random(10)
      });
    }

    if (content.startsWith("const") || content.startsWith("export const")) {
      importList.push({
        content: f,
        index,
        layout: "const",
        id: util.random(10),
        oper: {
          "=": 0

        }
      });

      // import结束
      if (/from( )*('|")(.*)('|")/.test(content)) {
        connectContentStatus = false;
      } else {
        connectContentStatus = true;
        connectContent = "import";
      }
    }

  });
};
module.exports = {
  split
};