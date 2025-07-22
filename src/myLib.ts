import alertFunction from './handleError.ts'

export default function isValidTokens (tokens: string[] | null) {
    if(!tokens || tokens.length === 0) return false

    const operators = new Set(['+', '-', '*', '/'])
    let depth = 0
    let prev: string | null = null

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if(token === '(') { //チェック： 空括弧でない・後がマイナス以外の演算子でない・前が数字でない
        
        depth++
        if(i + 1 < tokens.length && [')', '+', '*', '/'].includes(tokens[i + 1])) return false
        if(prev && /\d/.test(prev)) return false

      }else if(token === ')') { //チェック： 閉じすぎていない・前に演算子がない・後に数字がない
        
        depth--
        if(depth < 0) return false
        if(prev && operators.has(prev)) return  false
        if(i + 1 < tokens.length && !/\d/.test(tokens[i + 1])) return false

      }else if(operators.has(token)) { //チェック： 最初/最後でない・連続していない
        if(i === 0 || i === tokens.length - 1 || prev && operators.has(prev)) {
          alertFunction(['演算子エラー', token, prev])
          return false
        } 

      }else if(isNumber(token)) { //チェック： 連続していない
        
        if(prev && isNumber(prev)) return false

      }else if(token === '.') { //異常なドット
        alertFunction(['ドットエラー', token])
        return false
      }
      prev = token
    }
    return depth === 0 //括弧が閉じているか
  }

  const isNumber = (string: string) => {
    return /^-?\d+(.\d+)$/.test(string)
  }