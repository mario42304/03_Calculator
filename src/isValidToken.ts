//import alertFunction from "./alertFunction";
import isNumber from "./isNumber.ts";
import operators from "./operators.ts";

export default function isValidTokens(tokens: string[] | null): boolean {
  if (!tokens || tokens.length === 0) return false;

  //const operators = new Set(['+', '-', '*', '/'])
  let depth = 0;
  let prev: string | null = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].replace("±", "-");
    //alertFunction(["token", token, "isNumber", isNumber(token)]);

    if (token === "(") {
      //チェック： 空括弧でない・後がマイナス以外の演算子でない・前が数字でない

      depth++;
      if (i + 1 < tokens.length && [")", "+", "*", "/"].includes(tokens[i + 1]))
        return false;
      if (/\d/.test(prev!)) return false;
    } else if (token === ")") {
      //チェック： 閉じすぎていない・前に演算子がない・後に数字がない

      depth--;
      if (depth < 0) return false;
      if (prev! in operators) return false;
      if (i + 1 < tokens.length && !/\d/.test(tokens[i + 1])) return false;
    } else if (token in operators) {
      //チェック： 最初/最後でない・連続していない
      if (i === 0 || i === tokens.length - 1 || (prev && prev in operators))
        return false;
    } else if (isNumber(token)) {
      //チェック： 連続していない
      //alertFunction(["token", token, "prev", prev]);
      if (isNumber(prev!)) {
        //alertFunction(["連続数値", token]);
        return false;
      }
    } else if (token === ".") return false; //異常なドット

    prev = token;
  }
  return depth === 0; //括弧が閉じているか
}
