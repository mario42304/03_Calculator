import isNumber from "./isNumber";
//import alertFunction from "./alertFunction";

export default function evaluateRPN(
  tokens: string[],
  handleError: (message: string) => void
): string {
  const stack: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (isNumber(token)) {
      stack.push(token);
    } else {
      const a = stack.pop();
      const b = stack.pop();

      switch (token) {
        case "+":
          stack.push(String(Number(b) + Number(a)));
          break;
        case "-":
          stack.push(String(Number(b) - Number(a)));
          break;
        case "*":
          stack.push(String(Number(b) * Number(a)));
          break;
        case "/":
          if (/-?0/.test(a!)) {
            handleError("divided by zero");
          } else {
            //alertFunction([a, "/", b]);
            stack.push(String(Number(b) / Number(a)));
          }
          break;
        default:
          handleError("invalid token");
          break;
      }
    }
  }

  const answer = stack[0];

  return answer;
}
