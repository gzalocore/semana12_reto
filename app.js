let cuentas = [
    {nombre: "Mali", saldo: 200, password: "1234", dni: 44788834},
    {nombre: "Gera", saldo: 150, password: "5678", dni: 10247439},
    {nombre: "Sabi", saldo: 60, password: "9102", dni: 98005362}
];

let selectedAccount = null;

function login() {
    const accountIndex = document.getElementById('account-select').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    if (accountIndex === "") {
        loginError.textContent = "Por favor, selecciona una cuenta.";
        return;
    }

    if (password === cuentas[accountIndex].password) {
        selectedAccount = cuentas[accountIndex];
        document.getElementById('account-name').textContent = `Cuenta de ${selectedAccount.nombre}`;
        showScreen('operation-screen');
    } else {
        loginError.textContent = "Contraseña incorrecta.";
    }
}

function checkBalance() {
    const result = document.getElementById('operation-result');
    result.textContent = `Saldo actual: S/${selectedAccount.saldo}`;
}

function depositMoney() {
    showTransactionScreen("Ingresar monto", deposit);
}

function withdrawMoney() {
    showTransactionScreen("Retirar monto", withdraw);
}

function showTransactionScreen(title, action) {
    document.getElementById('transaction-title').textContent = title;
    document.getElementById('confirm-button').onclick = action;
    showScreen('transaction-screen');
}

function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('transaction-error').textContent = "Por favor, ingresa un monto válido.";
        return;
    }
    selectedAccount.saldo += amount;
    document.getElementById('operation-result').textContent = `Monto ingresado: S/${amount}. Nuevo saldo: S/${selectedAccount.saldo}`;
    showScreen('operation-screen');
}

function withdraw() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0 || amount > selectedAccount.saldo) {
        document.getElementById('transaction-error').textContent = "Monto inválido o insuficiente.";
        return;
    }
    selectedAccount.saldo -= amount;
    document.getElementById('operation-result').textContent = `Monto retirado: S/${amount}. Nuevo saldo: S/${selectedAccount.saldo}`;
    showScreen('operation-screen');
}

function logout() {
    selectedAccount = null;
    document.getElementById('password').value = '';
    document.getElementById('login-error').textContent = '';
    document.getElementById('operation-result').textContent = '';
    showScreen('login-screen');
}

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';
}
