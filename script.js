// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = null
        expressionResult = 0
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' && expressionResult === 0) // изменено для накопления
            return
    
        let numA = parseFloat(a || 0)  //изменено для накопления
        let numB = parseFloat(b || 0)   //изменено для накопления
    
        switch(selectedOperation) {
            case 'x':
                expressionResult = (expressionResult || 1) * numB  //изменено для накопления
                break;
            case '+':
                expressionResult = (expressionResult || 0) + numB  //изменено для накопления
                break;
            case '-':
                expressionResult = (expressionResult || numA) - numB  //изменено для накопления
                break;
            case '/':
                if (numB === 0) {
                    outputElement.innerHTML = "Ошибка: Деление на ноль!";
                    return;
                }
                 expressionResult = (expressionResult || numA) / numB  //изменено для накопления
                break;
            default: // для первого ввода числа
                expressionResult = numA  //изменено для накопления
                break;
        }
    
        a = ''
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = expressionResult.toString()
    }
};
    //////////////Запрограммируйте операцию смены знака +/-;
    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a === '') return; // Ничего не делать, если 'a' пустое
            a = (parseFloat(a) * -1).toString(); // Преобразуем в число, меняем знак, обратно в строку
            outputElement.innerHTML = a;
        } else {
            if (b === '') return; // Ничего не делать, если 'b' пустое
            b = (parseFloat(b) * -1).toString(); // Преобразуем в число, меняем знак, обратно в строку
            outputElement.innerHTML = b;
        }
    }
    ///////////////Запрограммируйте операцию вычисления процента %;
    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a === '') return;
            a = (parseFloat(a) / 100).toString(); // Делим на 100
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
    
            //Вычисляем процент от числа 'a'
            switch(selectedOperation){
                case '+':
                case '-':
                    b = (parseFloat(a) * (parseFloat(b) / 100)).toString();
                    break;
                default:
                    b = (parseFloat(b) / 100).toString();
            }
            outputElement.innerHTML = b;
        }
    }
    //////// Добавьте кнопку стирания введенной цифры назад (backspace). Расположить кнопку можно, например, на месте нерабочих +/- и % кнопок;
    document.getElementById("btn_op_backspace").onclick = function() {
        if (!selectedOperation) {
            a = a.slice(0, -1); // Удаляем последний символ из 'a'
            outputElement.innerHTML = a || 0; // Отображаем 'a', или 0, если 'a' пустое
        } else {
            b = b.slice(0, -1); // Удаляем последний символ из 'b'
            outputElement.innerHTML = b || 0; // Отображаем 'b', или 0, если 'b' пустое
        }
    }
    /////////////Запрограммируйте операцию вычисления квадратного корня √;
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (!selectedOperation) {
            if (a === '') return;
    
            const num = parseFloat(a);
    
            if (num < 0) {
                outputElement.innerHTML = "Ошибка: Нельзя извлечь корень из отрицательного числа";
                a = '';
                return;
            }
    
            a = Math.sqrt(num).toString();
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
    
            const num = parseFloat(b);
    
            if (num < 0) {
                outputElement.innerHTML = "Ошибка: Нельзя извлечь корень из отрицательного числа";
                b = '';
                return;
            }
    
            b = Math.sqrt(num).toString();
            outputElement.innerHTML = b;
        }
    }
    //////////////Запрограммируйте операцию возведения в квадрат x²
    document.getElementById("btn_op_square").onclick = function() {
        if (!selectedOperation) {
            if (a === '') return;
    
            const num = parseFloat(a);
            a = (num * num).toString();
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
    
            const num = parseFloat(b);
            b = (num * num).toString();
            outputElement.innerHTML = b;
        }
    }
    /////////////Запрограммируйте операцию вычисления факториала x!
    document.getElementById("btn_op_factorial").onclick = function() {
        if (!selectedOperation) {
             if (a === '') return;
     
             let num = parseInt(a); // Факториал определен только для целых чисел
     
             if (isNaN(num) || num < 0) {
                 outputElement.innerHTML = "Ошибка: Некорректный ввод для факториала";
                 a = '';
                 return;
             }
     
             let result = 1;
             for (let i = 2; i <= num; i++) {
                 result *= i;
             }
     
             a = result.toString();
             outputElement.innerHTML = a;
         } else {
             outputElement.innerHTML = "Ошибка: Факториал применим только к первому числу";
         }
     }
    ////////  3 нуля
    document.getElementById("btn_digit_000").onclick = function() {
        if (!selectedOperation) {
            a += "000";
            outputElement.innerHTML = a;
        } else {
            b += "000";
            outputElement.innerHTML = b;
        }
    };

