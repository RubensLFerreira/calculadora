const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button"); //Selecionar todos os botôes

class calculator {
  // as funcionalidades da calculadora
  constructor(previousOperationText, currentOperationText) {
    // "função" que tras alguns objetos
    this.previousOperationText = previousOperationText; // atribuindo a previous o valor de previous
    this.currentOperationText = currentOperationText; // ex: calculator/constructor current recebe o valor de current
    this.currentOperation = ""; // valor que o usuário vai digitar
  }

  // add digit to calculator screen
  addDigit(digit) {
    // metodo
    //check if current operation already has dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      // possuir apenas um ponto .
      return;
    }
    this.currentOperation = digit; // escrever na tela currentOperation
    this.updateScreen(); // atualziar a tela do currentOperation
  }

  // process all claculator operations
  processOperation(operation) {
    // get current and previous value
    let operationValue;
    let previous = +this.previousOperationText.innerText; // pegando previousOperationText transformando pra number e armazenando
    let current = +this.currentOperationText.innerText;
  }

  // change values of the calculator screen
  updateScreen() {
    this.currentOperationText.innerText += this.currentOperation;
  }
}

const calc = new calculator(previousOperationText, currentOperationText); // instaciando

buttons.forEach((btn) => {
  // essa função é responsável por pegar os valores dos botões
  btn.addEventListener("click", (e) => {
    // um evento pra cada btn
    const value = e.target.innerText; // pegando o valor de cada botão e guardando

    if (+value >= 0 || value === ".") {
      // +value iquivale a Number ou parserInt
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
