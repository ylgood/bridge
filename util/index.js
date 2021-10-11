const random = (ln) => {
  return Array(ln).fill(1).map(i => Math.floor(Math.random() * 10)) + "";

};

const startkeyworld = ["import", "export", "const", "let", "interface", "type", "useEffect"];
const openStartkeyworld = ["=", "+", "-", "*", "｜", "||", "&&", "?", ":", "(", "{", "["];
const openEndkeyworld = ["=", "+", "-", "*", "｜", "||", "&&", "?", ":", "(", "{", "["];
const endKeyword = [")", "}", "]", ";"];
module.exports = {
  random
};