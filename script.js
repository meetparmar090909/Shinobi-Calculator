let CurrentOperand = '';
let lastResult = '';
const prevDisplay = document.querySelector('.previous-operand');
const currDisplay = document.querySelector('.current-operand');

function updateUI() {
    prevDisplay.innerText = lastResult ? CurrentOperand : '';
    currDisplay.innerText = lastResult || CurrentOperand || '0';
}

function appendToken(token) {
    const operators = ['+', '-', '*', '/'];
    const lastChar = CurrentOperand.slice(-1);

    if (token === '.' && CurrentOperand.split(/[+\-*/]/).pop().includes('.')) return;

    if (operators.includes(token) && operators.includes(lastChar)) {
        CurrentOperand = CurrentOperand.slice(0, -1) + token;
    } else {
        CurrentOperand += token;
    }

    lastResult = '';
    updateUI();
}

document.querySelectorAll('button').forEach(btn => {
    if(btn.id.startsWith('btn-') && !['btn-ac', 'btn-del', 'btn-equals', 'btn-add', 'btn-subtract', 'btn-multiply', 'btn-divide'].includes(btn.id)) {
        btn.onclick = () => {
            appendToken(btn.innerText);
        }
    }
});

document.querySelector('#btn-ac').onclick = () => {
    CurrentOperand = '';
    lastResult = '';
    currDisplay.innerText = '0';
    updateUI();
}

document.querySelector('#btn-del').onclick = () => {
    CurrentOperand = CurrentOperand.slice(0, -1);
    lastResult = '';
    updateUI();
}

document.querySelector('#btn-add').onclick = () => appendToken('+');
document.querySelector('#btn-subtract').onclick = () => appendToken('-');
document.querySelector('#btn-multiply').onclick = () => appendToken('*');
document.querySelector('#btn-divide').onclick = () => appendToken('/');

document.querySelector('#btn-equals').onclick = () => {
    try {
        if(!CurrentOperand) return;
        let result = Function(`"use strict"; return (${CurrentOperand})`)();
        lastResult = Number.isFinite(result) ? String(Number(result.toFixed(10))) : 'Error';
        updateUI();
    } catch (e) {
        lastResult = 'Error';
        updateUI();
    }
}
