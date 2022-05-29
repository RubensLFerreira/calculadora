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
    // check if current is empty
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      //change operation
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // get current and previous value
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0]; // pegando previousOperationText transformando pra number e armazenando
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearOperation();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // change values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null //deixando todos os valores vázios
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // check if value is zero, if it is just add current value
      if (previous === 0) {
        operationValue = current;
      }
      // add current value of previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // change math operation
  changeOperation(operation) {
    const mathOperation = ["*", "/", "+", "-"];

    if (!mathOperation.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }
  // Delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Clear current operation
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  // Clear all operation
  processClearOperation() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Process an operation
  processEqualOperator() {
    const operation = previousOperationText.innerHTML.split(" ")[1];
    this.processOperation(operation);
    // return currentOperationText.innerHTML = operationValue; 
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
