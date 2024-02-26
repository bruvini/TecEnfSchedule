document.addEventListener('DOMContentLoaded', () => {
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios'))?.length || 0;
    const setoresCadastrados = JSON.parse(localStorage.getItem('setores'))?.length || 0;
    const escalasGeradas = localStorage.getItem('escalasGeradas') || 0;

    document.getElementById('setoresCadastrados').textContent = setoresCadastrados;
    document.getElementById('funcionariosCadastrados').textContent = usuariosCadastrados;
    document.getElementById('escalasGeradas').textContent = escalasGeradas;

    const anoAtual = new Date().getFullYear();
    document.getElementById('anoAtual').textContent = anoAtual;

    verificarSessao();

    // Adiciona o nome do usuário ao <h1>
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
        // Aqui buscamos a lista de usuários para encontrar o nome completo do usuário logado
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioDetalhes = usuarios.find(u => u.usuario === usuarioLogado.usuario);
        if (usuarioDetalhes) {
            document.getElementById('nomeUsuario').textContent = usuarioDetalhes.nomeCompleto || 'Usuário';
        }
        ajustarMenu(usuarioLogado.tipo);
    }
});

function verificarSessao() {
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if (!usuarioLogado || new Date().getTime() - usuarioLogado.timestamp > 600000) { // 10 minutos em milissegundos
        window.location.href = 'login.html';
    }
}

function ajustarMenu(tipoUsuario) {
    // Se o usuário for do tipo "Funcionário", esconde certos links
    if(tipoUsuario === 'Funcionário') {
        const linksEsconder = document.querySelectorAll('nav ul li a[href="setores.html"], nav ul li a[href="funcionarios.html"], nav ul li a[href="gerar_escala.html"]');
        linksEsconder.forEach(link => {
            link.parentElement.style.display = 'none';
        });
    }
    // Não precisa de um else, pois os links já são visíveis por padrão
}

document.getElementById('logoutBtn').addEventListener('click', function(event) {
    event.preventDefault();
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
});
