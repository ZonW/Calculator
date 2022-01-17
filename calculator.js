class Calculator {
    constructor(preTextElement, currTextElement){
        this.preTextElement = preTextElement
        this.currTextElement = currTextElement
        this.clear()
    }
    chooseOperation(operation) {
        //if nothing selected, don't do anything
        if (this.currOps == '') {
            return
        }
        //if there's previous operation, exceute the compututation
        if (this.preOps != '') {
            this.compute()
        }
        //update previous operation and clear curr operation
        this.operation = operation
        this.preOps = this.currOps
        this.currOps = ''
    }

    compute () {
        let result
        const prev = parseFloat(this.preOps)
        const curr = parseFloat(this.currOps)
        //if inputs are not numbers
        if (isNaN(prev) || isNaN(curr)) {
            return
        }
        switch (this.operation) {
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '*':
                result = prev * curr
                break
            case '÷':
                result = prev / curr
                break
        }
        this.currOps = result
        this.preOps = ''
        this.operation = undefined
    }

    updateDisplay() {
        this.currTextElement.innerText = this.currOps
        if (this.operation != null) {
            this.preTextElement.innerText = 
            this.preOps.toString() + this.operation.toString()
        }
        else (this.preTextElement.innerText = '')
    }

    append(number) {
        if(number == '.' && this.currOps.includes('.')) {
            return
        }
        this.currOps = this.currOps.toString() + number.toString()
    }

    delete() {
        this.currOps = this.currOps.toString().slice(0, -1)
    }

    clear() {
        this.preOps = ''
        this.currOps = ''
        this.operation = undefined
    }

}

const numButtons = document.querySelectorAll('[data-num]')
const opsButtons = document.querySelectorAll('[data-ops]')
const equalButton = document.querySelector('[data-equal]')
const delButton = document.querySelector('[data-del]')
const clearButton = document.querySelector('[data-clear]')
const preTextElement = document.querySelector('[data-previous-ops]')
const currTextElement = document.querySelector('[data-current-ops]')

const calculator = new Calculator(preTextElement,currTextElement)

numButtons.forEach(button => {
    button.addEventListener('click', function() {
        calculator.append(button.innerText)
        calculator.updateDisplay()
    })
})

opsButtons.forEach(button => {
    button.addEventListener('click', function() {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalButton.addEventListener('click', function() {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', function() {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click',  function() {
    calculator.delete()
    calculator.updateDisplay()
})