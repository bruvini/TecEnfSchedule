document.addEventListener('DOMContentLoaded', () => {
    const escalasGeradas = localStorage.getItem('escalasGeradas') || 0;
    const setoresCadastrados = JSON.parse(localStorage.getItem('setores'))?.length || 0;
    const funcionariosCadastrados = JSON.parse(localStorage.getItem('funcionarios'))?.length || 0;

    document.getElementById('setoresCadastrados').textContent = setoresCadastrados;
    document.getElementById('funcionariosCadastrados').textContent = funcionariosCadastrados;
    document.getElementById('escalasGeradas').textContent = escalasGeradas;

    const anoAtual = new Date().getFullYear();
    document.getElementById('anoAtual').textContent = anoAtual;
});
