let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

// Actualizar display
function updateDisplay() {
    display.textContent = currentInput;
}

// Agregar número
function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else if (num === '.' && currentInput.includes('.')) {
            return;
        } else {
            currentInput += num;
        }
    }
    updateDisplay();
}

// Agregar operación
function appendOperation(op) {
    if (operation !== null) {
        calculate();
    }
    previousInput = currentInput;
    operation = op;
    shouldResetDisplay = true;
}

// Calcular resultado
function calculate() {
    if (operation === null || shouldResetDisplay) {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Error: División por 0';
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

// Calcular potencia
function calculatePower() {
    const current = parseFloat(currentInput);
    
    if (isNaN(current)) {
        return;
    }

    if (previousInput === '' || operation === null) {
        previousInput = currentInput;
        operation = '^';
        shouldResetDisplay = true;
        return;
    }

    const prev = parseFloat(previousInput);
    if (isNaN(prev)) {
        return;
    }

    const result = Math.pow(prev, current);
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// Calcular factorial
function calculateFactorial() {
    const num = Math.floor(parseFloat(currentInput));

    if (isNaN(num) || num < 0) {
        currentInput = 'Error: Número inválido';
        updateDisplay();
        return;
    }

    if (num === 0 || num === 1) {
        currentInput = '1';
    } else {
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        currentInput = result.toString();
    }

    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

// Limpiar display
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// Borrar último carácter
function deleteLast() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Permitir usar el teclado
document.addEventListener('keydown', function(e) {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+') {
        appendOperation('+');
    } else if (e.key === '-') {
        appendOperation('-');
    } else if (e.key === '*') {
        appendOperation('*');
        e.preventDefault();
    } else if (e.key === '/') {
        appendOperation('/');
        e.preventDefault();
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

// Inicializar
updateDisplay();

function calcularEdad() {
    const inputFecha = document.getElementById('fechaNacimiento');
    const resultContainer = document.getElementById('resultado');
    
    if (!inputFecha.value) {
        resultContainer.innerHTML = '<div class="error-message">Por favor, selecciona una fecha de nacimiento.</div>';
        return;
    }

    const fechaNacimiento = new Date(inputFecha.value);
    const hoy = new Date();

    // Validar que la fecha no sea en el futuro
    if (fechaNacimiento > hoy) {
        resultContainer.innerHTML = '<div class="error-message">La fecha de nacimiento no puede ser en el futuro.</div>';
        return;
    }

    // Validar que sea una edad razonable
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    const diferenciaDias = hoy.getDate() - fechaNacimiento.getDate();

    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && diferenciaDias < 0)) {
        edad--;
    }

    if (edad > 150) {
        resultContainer.innerHTML = '<div class="error-message">Por favor, verifica la fecha ingresada.</div>';
        return;
    }

    // Calcular meses y días
    let meses = diferenciaMeses;
    let dias = diferenciaDias;

    if (dias < 0) {
        meses--;
        const mesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
        dias += mesAnterior.getDate();
    }

    if (meses < 0) {
        meses += 12;
    }

    // Calcular días vividos
    const diasVividos = Math.floor((hoy - fechaNacimiento) / (1000 * 60 * 60 * 24));

    // Calcular próximo cumpleaños
    let proximoCumpleanos = new Date(hoy.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate());
    if (proximoCumpleanos < hoy) {
        proximoCumpleanos.setFullYear(hoy.getFullYear() + 1);
    }
    const diasParaCumpleanos = Math.ceil((proximoCumpleanos - hoy) / (1000 * 60 * 60 * 24));

    // Mostrar resultado
    resultContainer.innerHTML = `
        <div class="resultado-card">
            <h2>¡Tu Edad es!</h2>
            <div class="resultado-details">
                <div class="resultado-item">
                    <div class="resultado-item-label">Años</div>
                    <div class="resultado-item-value">${edad}</div>
                </div>
                <div class="resultado-item">
                    <div class="resultado-item-label">Meses</div>
                    <div class="resultado-item-value">${meses}</div>
                </div>
                <div class="resultado-item">
                    <div class="resultado-item-label">Días</div>
                    <div class="resultado-item-value">${dias}</div>
                </div>
                <div class="resultado-item">
                    <div class="resultado-item-label">Días Vividos</div>
                    <div class="resultado-item-value">${diasVividos.toLocaleString('es-ES')}</div>
                </div>
                <div class="resultado-item">
                    <div class="resultado-item-label">Próximo Cumpleaños</div>
                    <div class="resultado-item-value">${diasParaCumpleanos}</div>
                </div>
            </div>
        </div>
    `;
}

// Permitir calcular presionando Enter
document.addEventListener('DOMContentLoaded', function() {
    const inputFecha = document.getElementById('fechaNacimiento');
    inputFecha.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calcularEdad();
        }
    });
});
