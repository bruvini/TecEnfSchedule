document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Obtém usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Procura pelo usuário
    const usuario = usuarios.find(user => user.usuario === username && user.senha === password);

    if (usuario) {
        // Aqui é onde nós incluímos o nomeCompleto do usuário
        // Asegure-se de que seu objeto de usuário no localStorage tenha um campo para o nome completo, por exemplo, nomeCompleto
        sessionStorage.setItem('usuarioLogado', JSON.stringify({
            usuario: usuario.usuario,
            nomeCompleto: usuario.nomeCompleto, // Incluído o nomeCompleto aqui
            tipo: usuario.tipo,
            timestamp: new Date().getTime()
        }));

        // Redireciona baseado no tipo de usuário
        if (usuario.tipo === 'Funcionário') {
            window.location.href = 'index.html';
        } else if (usuario.tipo === 'Coordenação' || usuario.tipo === 'Desenvolvedor') {
            window.location.href = 'index.html'; // Mantive index.html para ambos os casos conforme o código original
        }
    } else {
        alert('Usuário ou senha inválidos!');
    }
});

document.getElementById('registerBtn').addEventListener('click', function() {
    window.location.href = 'cadastro.html';
});
