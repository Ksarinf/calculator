let a = ''; /*первое число*/
let b = ''; /*второе число*/
let sign = ''; /*знак математической операции*/
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];

//экран
const out = document.querySelector('.calc-screen p');

function clearAll () { /*очистка переменных*/
    a = ''; 
    b = ''; 
    sign = ''; 
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    //нажата не кнопка
    if(event.target.classList.contains('ac')) return;
    //нажата кнопка clearAll
    
    out.textContent = ''; //очистка экрана
    
    const key = event.target.textContent;
    //считываем текст нажатой кнопки и заносим значение в переменную key
    
    //если нажата кнопка 0-9 или .
    if(digit.includes(key)) { 
        if(b === '' && sign === '') { /*только начали заполнять*/
            a += key;
            console.log(a, b, sign);
            out.textContent = a;
        }
        else if(a !== '' && b !== '' && finish) {
                b = key;
                finish = false;
                out.textContent = b;
            }
            else {
                b += key;
                out.textContent = b;
            }
        console.table(a, b, sign);
        return;
    }
    
    //если нажата кнопка -, +, X, /
    if(action.includes(key)) { 
        sign = key;
        out.textContent = sign;
        console.table(a, b, sign);
        return;        
    }
    
    //нажата =
    if (key === '=') {
        if(b === '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                if(b === '0') {
                    out.textContent = 'Ошибка';
                    a = ''; 
                    b = ''; 
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;
        out.textContent = a;
        console.table(a, b, sign);
    }
}