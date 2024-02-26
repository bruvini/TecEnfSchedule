document.addEventListener("DOMContentLoaded", () => {
  verificarSessao();
  ajustarMenuPerfil();
  carregarDadosUsuario();
  document
    .getElementById("perfilForm")
    .addEventListener("submit", salvarAlteracoesPerfil);
  document
    .getElementById("fotoPerfilImg")
    .addEventListener("click", function () {
      document.getElementById("perfilFoto").click(); // Aciona o clique no input file quando a imagem é clicada
    });
  document
    .getElementById("perfilFoto")
    .addEventListener("change", alterarFotoPerfil);
});

function verificarSessao() {
  const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  if (
    !usuarioLogado ||
    new Date().getTime() - usuarioLogado.timestamp > 600000
  ) {
    window.location.href = "login.html";
  }
}

function ajustarMenuPerfil() {
  const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  if (usuarioLogado && usuarioLogado.tipo === "Funcionário") {
    const linksEsconder = document.querySelectorAll(
      'nav ul li a[href="setores.html"], nav ul li a[href="funcionarios.html"], nav ul li a[href="gerar_escala.html"]'
    );
    linksEsconder.forEach((link) => {
      link.parentElement.style.display = "none";
    });
  }
}

function carregarDadosUsuario() {
  const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioDetalhes = usuarios.find(
    (u) => u.usuario === usuarioLogado.usuario
  );

  if (usuarioDetalhes) {
    const fotoPerfilImg = document.getElementById("fotoPerfilImg");
    if (usuarioDetalhes.fotoBase64) {
        fotoPerfilImg.src = usuarioDetalhes.fotoBase64;
        fotoPerfilImg.style.backgroundColor = ''; // Remove a cor de fundo se houver uma foto
        fotoPerfilImg.title = "Clique para alterar a foto de perfil"; // Tooltip
    } else {
        fotoPerfilImg.src = ''; // Remove a src para que não tente carregar uma imagem inexistente
        fotoPerfilImg.style.backgroundColor = gerarCorPastel();
        fotoPerfilImg.style.display = 'block'; // Certifique-se de que o elemento está visível
        fotoPerfilImg.title = "Clique para adicionar uma foto de perfil"; // Tooltip para quando não há foto
    }
    
    document.getElementById("perfilNome").value = usuarioDetalhes.nomeCompleto;
    document.getElementById("perfilEmail").value = usuarioDetalhes.email;
    document.getElementById("perfilSenha").value = usuarioDetalhes.senha;
    document.getElementById("perfilMatricula").value =
      usuarioDetalhes.matricula;
    document.getElementById("perfilEntrada").value =
      usuarioDetalhes.horarioEntrada;
    document.getElementById("perfilSaida").value = usuarioDetalhes.horarioSaida;
    document.getElementById("perfilAlmoco").value =
      usuarioDetalhes.horarioAlmoco;
    document.getElementById("perfilDuracaoAlmoco").value =
      usuarioDetalhes.duracaoAlmoco;
  }
}

function gerarCorPastel() {
    const base = 100;
    const red = base + Math.floor(Math.random() * (255 - base));
    const green = base + Math.floor(Math.random() * (255 - base));
    const blue = base + Math.floor(Math.random() * (255 - base));
    return `rgb(${red}, ${green}, ${blue})`;
}


function salvarAlteracoesPerfil(e) {
  e.preventDefault();
  const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuarioIndex = usuarios.findIndex(
    (usuario) => usuario.usuario === usuarioLogado.usuario
  );

  if (usuarioIndex !== -1) {
    usuarios[usuarioIndex].nomeCompleto =
      document.getElementById("perfilNome").value;
    usuarios[usuarioIndex].email = document.getElementById("perfilEmail").value;
    usuarios[usuarioIndex].senha = document.getElementById("perfilSenha").value;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Perfil atualizado com sucesso!");
  }
}

function alterarFotoPerfil(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const fotoPerfilImg = document.getElementById("fotoPerfilImg");
      fotoPerfilImg.src = e.target.result;

      const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      let usuarioIndex = usuarios.findIndex(
        (usuario) => usuario.usuario === usuarioLogado.usuario
      );

      if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].fotoBase64 = e.target.result;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
      }
    };
    reader.readAsDataURL(file);
  }
}

document
  .getElementById("logoutBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
  });
