interface OperatorInfo {
    priority: number;
    associativity: 'left' | 'right';
}

interface Operators {
    [key: string]: OperatorInfo;
}

const operators: Operators = {
    '+': {priority: 1, associativity: 'left'},
    '-': {priority: 1, associativity: 'left'},
    '*': {priority: 2, associativity: 'left'},
    '/': {priority: 2, associativity: 'left'},
}

export default operators;