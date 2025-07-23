import isNumber from "./isNumber.ts";
import operators from "./operators.ts";
//import alertFunction from "./alertFunction.ts";

export default function shuntingYard(tokens: string[]): string[] {
  const stack: string[] = [];
  const outputQue: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const curToken = tokens[i].replace("±", "-");
    //alertFunction(["Token", curToken]);
    if (isNumber(curToken)) {
      //alertFunction(["Number", curToken]);
      outputQue.push(curToken);
    } else if (curToken in operators) {
      //alertFunction(['Operator', curToken])
      while (
        stack.length > 0 &&
        stack[stack.length - 1] in operators &&
        (operators[stack[stack.length - 1]].priority >
          operators[curToken].priority ||
          (operators[stack[stack.length - 1]].priority ===
            operators[curToken].priority &&
            operators[curToken].associativity === "left"))
      ) {
        outputQue.push(stack.pop()!);
      }
      stack.push(curToken);
    } else if (curToken === "(") {
      //alertFunction(['Left Parenthesis', curToken])
      stack.push(curToken);
    } else if (curToken === ")") {
      //alertFunction(['Right Parenthesis', curToken])
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        outputQue.push(stack.pop()!);
      }
      stack.pop(); // Pop the '(' from the stack
    }
    //alertFunction(['Current Stack', stack, 'Current Output Queue', outputQue])
  }
  while (stack.length > 0) {
    //alertFunction(['Pop Remaining', stack[stack.length - 1]])
    outputQue.push(stack.pop()!);
  }
  return outputQue;
}
