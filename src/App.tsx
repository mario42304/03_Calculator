import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [operator, setOperator] = useState<string | null>(null)
  const [overWrite, setOverwrite] = useState(false)

  const handleInput = (input: string) => {
    setInputValue(prev => {
      if (prev.length >= 20) {
        return prev
      }
      return prev + input
    })
  }

  const handleBackspace = () => {
    setInputValue(prev => prev.slice(0, -1))
  }

  const handleSignFlip = () => {
    setInputValue(prev => {
      if(prev.endsWith('±')){
        return prev.slice(0, -1)
      }
      return prev + '±'
    })
  }

  const handleCaluculate = () => {

  }

  const handleInputError = () => {
    throw new Error("SYNTAX ERROR");
  }

  return (
    <>
      <p>{inputValue.replace(/±/g, '-')}</p>
      <p>{answer}</p>
      <div>
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleInput('+')}>+</button>
      </div>
      <div>
        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleInput('-')}>-</button>
      </div>
      <div>
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleInput('*')}>*</button>
      </div>
      <div>
        <button onClick={() => handleSignFlip()}>±</button>
        <button onClick={() => handleInput('0')}>0</button>
        <button onClick={() => handleInput('.')}>.</button>
        <button onClick={() => handleInput('/')}>/</button>
      </div>
      <div>
        <button onClick={() => handleCaluculate()}>=</button>
        <button onClick={() => handleBackspace()}>BS</button>
        <button onClick={() => handleInput('')}></button>
        <button onClick={() => handleInput('')}></button>
      </div>
    </>
  )
}

export default App
