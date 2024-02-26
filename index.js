document.addEventListener("DOMContentLoaded", () => {
  verificarSessao();

  const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  if (usuarioLogado) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioDetalhes = usuarios.find(
      (u) => u.usuario === usuarioLogado.usuario
    );
    if (usuarioDetalhes) {
      document.getElementById("nomeUsuario").textContent =
        usuarioDetalhes.nomeCompleto || "Usuário";
    }
    ajustarConteudo(usuarioLogado.tipo);
    ajustarMenu(usuarioLogado.tipo); // Ajusta o menu baseado no tipo de usuário
  }

  const anoAtual = new Date().getFullYear();
  document.getElementById("anoAtual").textContent = anoAtual; // Atualiza o ano atual no rodapé

  // Garanta que esta parte esteja após a definição dos cards
  if (usuarioLogado && usuarioLogado.tipo !== 'Funcionário') {
    // Adiciona os event listeners aqui
    document.querySelector('.card[data-card="setores"]').addEventListener('click', function() {
        window.location.href = 'setores.html';
    });

    document.querySelector('.card[data-card="funcionarios"]').addEventListener('click', function() {
        window.location.href = 'funcionarios.html';
    });

    document.querySelector('.card[data-card="escalas"]').addEventListener('click', function() {
        window.location.href = 'gerar_escala.html';
    });
}
});

function verificarSessao() {
  const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  if (
    !usuarioLogado ||
    new Date().getTime() - usuarioLogado.timestamp > 600000
  ) {
    // 10 minutos em milissegundos
    window.location.href = "login.html";
  }
}

function ajustarConteudo(tipoUsuario) {
  const cards = document.querySelector(".cards");
  const main = document.querySelector("main");

  if (tipoUsuario === "Funcionário") {
    cards.style.display = "none"; // Esconde os cards

    // Cria e exibe a box com o texto para funcionários
    const box = document.createElement("div");
    box.id = "mensagemFuncionario";
    box.innerHTML = `
            <h3>Compromisso com a Excelência</h3>
            <p>Estamos empenhados em desenvolver a equipe e garantir qualidade assistencial a todos a partir de uma escala dinâmica, automatizada e adaptável às mudanças da equipe.</p>
        `;
    main.appendChild(box);
  } else {
    // Se não for funcionário, mostra os cards e atualiza os números
    cards.style.display = "flex";

    // Atualiza os números dos cards
    atualizarNumerosCards();
  }
}

function atualizarNumerosCards() {
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios'))?.length || 0;
    const setoresCadastrados = JSON.parse(localStorage.getItem('setores'))?.length || 0;
    const escalasGeradas = localStorage.getItem('escalasGeradas') || 0;

    // Chamadas para animar os números
    animarNumero(document.getElementById('setoresCadastrados'), 0, setoresCadastrados, 2000);
    animarNumero(document.getElementById('funcionariosCadastrados'), 0, usuariosCadastrados, 2000);
    animarNumero(document.getElementById('escalasGeradas'), 0, escalasGeradas, 2000);
}


function animarNumero(elemento, inicio, fim, duracao) {
  let atual = inicio;
  let incremento = (fim - inicio) / (duracao / 10); // Calcula o incremento para cada 10ms

  let contador = setInterval(function () {
    atual += incremento;
    elemento.textContent = Math.floor(atual);

    if (atual >= fim) {
      elemento.textContent = fim; // Garante que o número final seja exato
      clearInterval(contador);
    }
  }, 10);
}

function ajustarMenu(tipoUsuario) {
  // Se o usuário for do tipo "Funcionário", esconde certos links
  if (tipoUsuario === "Funcionário") {
    const linksEsconder = document.querySelectorAll(
      'nav ul li a[href="setores.html"], nav ul li a[href="funcionarios.html"], nav ul li a[href="gerar_escala.html"]'
    );
    linksEsconder.forEach((link) => {
      link.parentElement.style.display = "none";
    });
  }
  // Não precisa de um else, pois os links já são visíveis por padrão
}

document
  .getElementById("logoutBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
  });
