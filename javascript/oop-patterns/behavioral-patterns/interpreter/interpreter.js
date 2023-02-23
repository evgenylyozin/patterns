// терминальное выражение
class Numeral {
  value;

  constructor(value) {
    this.value = parseInt(value);
  }

  interpret() {
    return this.value;
  }
}

// Нетерминальное выражение
class Add {
  left;
  right;

  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  interpret() {
    return this.left.interpret() + this.right.interpret();
  }
}

class Subtract {
  left;
  right;

  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  interpret() {
    return this.left.interpret() - this.right.interpret();
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//------------------------------- Клиентский код -------------------------------
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Интерпретируемая строка состоит из чисел, пробелов и знаков "+" и "-"
const SENTENCE = '5 + 4 - 3 + 7 - 2';
console.log(SENTENCE);

// В данном случае создание Абстрактного синтаксического дерева (AST) происходит
// вручную
const AST = [];
AST.push(new Add(new Numeral('5'), new Numeral('4'))); // 5 + 4
AST.push(new Subtract(AST[0], new Numeral('3'))); // ^ - 3
AST.push(new Add(AST[1], new Numeral('7'))); // ^ + 7
AST.push(new Subtract(AST[2], new Numeral('2'))); // ^ - 2

const AST_ROOT = AST.pop();

console.log(AST_ROOT.interpret()); // => 11
