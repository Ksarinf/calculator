let a = ''; /*первое число*/
let b = ''; /*второе число*/
let sign = ''; /*знак математической операции*/
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', '%', '+/-'];

//округляем до 4х знаков после запятой
const round = (num) => Math.round(num * 10000) / 10000;

//экран
const out = document.querySelector('.calc-screen p');

function clearAll () { /*очистка переменных*/
    a = ''; 
    b = ''; 
    sign = ''; 
    finish = false;
    out.textContent = '0';
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    //нажата не кнопка
    if(event.target.classList.contains('ac')) return;
    //нажата кнопка clearAll
    if(event.target.classList.contains('%')) return;
    //нажата кнопка %
    if(event.target.classList.contains('+/-')) return;
    //нажата кнопка +/-
    
    out.textContent = ''; //очистка экрана
    
    const key = event.target.textContent;
    //считываем текст нажатой кнопки и заносим значение в переменную key
    
    //если нажата кнопка 0-9 или .
    if(digit.includes(key)) { 
        if(b === '' && sign === '') { /*только начали заполнять*/
            if (key === '.' && a.includes('.')) { /*убираем возможность писать много точек для переменной а*/
                a += '';
                console.log(a, b, sign);
                out.textContent = a;
            }
            else {
                a += key;
                console.log(a, b, sign);
                out.textContent = a;
            }
        }
        else if(a !== '' && b !== '' && finish) {
                b = key;
                finish = false;
                out.textContent = a + ' ' + sign + ' ' + b;
            }
            else {
                if(key === '.' && b.includes('.')) { /*убираем возможность писать много точек для переменной b*/
                    b += '';
                    out.textContent = a + ' ' + sign + ' ' + b;
                }
                else {
                    b += key;
                    out.textContent = a + ' ' + sign + ' ' + b;
                }
            }
        console.table(a, b, sign);
        return;
    }
    
    //если нажата кнопка -, +, X, /
    if(action.includes(key)) { 
        sign = key;
        out.textContent = a + ' ' + sign;
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
            case "%":
                a = (a*b)/100;
                break;
            case "+/-":
                a = a * (-1);
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
        out.textContent = round(a);
        console.table(typeof(a), a, typeof(b), b, typeof(sign), sign);
    }
}