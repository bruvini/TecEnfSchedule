document.addEventListener('DOMContentLoaded', () => {
    verificarSessao();
    ajustarMenuPerfil();
});

function verificarSessao() {
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if (!usuarioLogado || new Date().getTime() - usuarioLogado.timestamp > 600000) { // 10 minutos em milissegundos
        window.location.href = 'login.html';
    } else {
        // Chamada da função ajustarMenuPerfil aqui garante que é chamada após a verificação da sessão
        ajustarMenuPerfil();
    }
}

function ajustarMenuPerfil() {
    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if(usuarioLogado && usuarioLogado.tipo === 'Funcionário') {
        const linksEsconder = document.querySelectorAll('nav ul li a[href="setores.html"], nav ul li a[href="funcionarios.html"], nav ul li a[href="gerar_escala.html"]');
        linksEsconder.forEach(link => {
            link.parentElement.style.display = 'none';
        });
    }
    // Não é necessário um else, pois os links são visíveis por padrão para outros tipos de usuários
}

document.getElementById('logoutBtn').addEventListener('click', function(event) {
    event.preventDefault();
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
});
