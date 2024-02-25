document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aqui você implementaria a verificação de login
    console.log('Tentativa de login com:', username, password);

    // Se login for bem-sucedido, redireciona para a página principal
    // window.location.href = 'index.html';
});

document.getElementById('registerBtn').addEventListener('click', function() {
    // Redireciona para a página de cadastro
    window.location.href = 'cadastro.html';
});
