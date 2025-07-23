import { useState } from "react";
import isValidTokens from "./isValidToken.ts";
import alertFunction from "./alertFunction.ts";
import shuntingYard from "./shuntingYard.ts";
import evaluateRPN from "./evaluateRPN.ts";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleError = (message: string) => {
    alertFunction(message);
    setInputValue("");
    setAnswer("");
  };

  const handleInput = (input: string) => {
    setInputValue((prev) => {
      if (prev.length >= 20) {
        return prev;
      }
      return prev + input;
    });
  };

  const handleAllClear = () => {
    setInputValue("");
    setAnswer("");
  };

  const handleBackspace = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleSignFlip = () => {
    setInputValue((prev) => {
      if (prev.endsWith("±")) {
        return prev.slice(0, -1);
      }
      return prev + "±";
    });
  };

  const tokenizer = (input: string) => {
    const regex = /±?\d+(\.\d+)?|[+\-*/()]|\S/g;
    return input.match(regex);
  };

  const handleCaluculate = (input: string) => {
    const tokens = tokenizer(input);

    if (isValidTokens(tokens)) {
      //alertFunction(["tokens", tokens]);
      const RPNTokens = shuntingYard(tokens!);
      //alertFunction(["RPN", RPNTokens]);
      setAnswer(evaluateRPN(RPNTokens, handleError));
    } else {
      handleError("SyntaxError");
    }
  };

  return (
    <>
      <p>{inputValue.replace(/±/g, "-")}</p>
      <p>{answer}</p>
      <div>
        <button onClick={() => handleInput("7")}>7</button>
        <button onClick={() => handleInput("8")}>8</button>
        <button onClick={() => handleInput("9")}>9</button>
        <button onClick={() => handleInput("+")}>+</button>
        <button onClick={() => handleAllClear()}>AC</button>
      </div>
      <div>
        <button onClick={() => handleInput("4")}>4</button>
        <button onClick={() => handleInput("5")}>5</button>
        <button onClick={() => handleInput("6")}>6</button>
        <button onClick={() => handleInput("-")}>-</button>
        <button onClick={() => handleAllClear()}>AC</button>
      </div>
      <div>
        <button onClick={() => handleInput("1")}>1</button>
        <button onClick={() => handleInput("2")}>2</button>
        <button onClick={() => handleInput("3")}>3</button>
        <button onClick={() => handleInput("*")}>*</button>
        <button onClick={() => handleAllClear()}>AC</button>
      </div>
      <div>
        <button onClick={() => handleSignFlip()}>±</button>
        <button onClick={() => handleInput("0")}>0</button>
        <button onClick={() => handleInput(".")}>.</button>
        <button onClick={() => handleInput("/")}>/</button>
        <button onClick={() => handleAllClear()}>AC</button>
      </div>
      <div>
        <button onClick={() => handleCaluculate(inputValue)}>=</button>
        <button onClick={() => handleBackspace()}>BS</button>
        <button onClick={() => handleInput("(")}>(</button>
        <button onClick={() => handleInput(")")}>)</button>
        <button onClick={() => handleAllClear()}>AC</button>
      </div>
    </>
  );
}

export default App;
