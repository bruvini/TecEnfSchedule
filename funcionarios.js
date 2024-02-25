document.addEventListener("DOMContentLoaded", function () {
  exibirFuncionarios();
  // Fechar modal ao clicar no botão de fechamento
  document.querySelector(".close").addEventListener("click", fecharModal);
});

function exibirFuncionarios() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards

  usuarios.forEach((usuario, index) => {
    let card = document.createElement("div");
    card.classList.add("funcionario-card");
    card.setAttribute("data-index", index.toString());

    // Adiciona o evento de clique ao card para abrir a modal com os detalhes do funcionário
    card.addEventListener("click", function () {
      abrirModalDetalhesFuncionario(index);
    });

    let foto = document.createElement("div");
    foto.classList.add("funcionario-foto");
    if (usuario.fotoBase64) {
      foto.style.backgroundImage = `url(${usuario.fotoBase64})`;
    } else {
      foto.style.backgroundColor = gerarCorPastel();
    }

    let info = document.createElement("div");
    info.classList.add("funcionario-info");

    let nome = document.createElement("div");
    nome.textContent = `Nome: ${usuario.nomeCompleto}`;
    let matricula = document.createElement("div");
    matricula.textContent = `Matrícula: ${usuario.matricula}`;
    let entrada = document.createElement("div");
    entrada.textContent = `Entrada: ${
      usuario.horarioEntrada || "Não definido"
    }`;
    let saida = document.createElement("div");
    saida.textContent = `Saída: ${usuario.horarioSaida || "Não definido"}`;
    let tipo = document.createElement("div");
    tipo.textContent = `Tipo: ${usuario.tipo}`;

    info.appendChild(nome);
    info.appendChild(matricula);
    info.appendChild(entrada);
    info.appendChild(saida);
    info.appendChild(tipo);

    card.appendChild(foto);
    card.appendChild(info);

    cardsContainer.appendChild(card);

    // Adiciona o evento de clique ao card para abrir a modal com os detalhes do funcionário
    card.addEventListener("click", function () {
      abrirModalDetalhesFuncionario(this.getAttribute("data-index"));
    });
  });

  // Configura o botão de fechar da modal para fechar a modal
  document.querySelector(".close").addEventListener("click", fecharModal);
}

function gerarCorPastel() {
  const baseRed = 256;
  const baseGreen = 256;
  const baseBlue = 256;

  const red = Math.floor(Math.random() * 128 + baseRed) / 2;
  const green = Math.floor(Math.random() * 128 + baseGreen) / 2;
  const blue = Math.floor(Math.random() * 128 + baseBlue) / 2;

  return `rgb(${red}, ${green}, ${blue})`;
}

// Função para abrir a modal com os detalhes do funcionário
function abrirModalDetalhesFuncionario(index) {
  // Obtém os dados dos funcionários do localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se o índice é válido
  if (index < 0 || index >= usuarios.length) {
    console.error("Índice de funcionário inválido.");
    return;
  }

  // Obtém os dados do funcionário específico
  const usuario = usuarios[index];

  // Atribui o índice do usuário à modal para uso posterior
  document
    .getElementById("modalFuncionario")
    .setAttribute("data-usuario-index", index.toString());

  // Preenche os dados na modal
  document.getElementById("modalNomeFuncionario").value = usuario.nomeCompleto;
  document.getElementById("modalMatriculaFuncionario").value =
    usuario.matricula;
  document.getElementById("modalEntradaFuncionario").value =
    usuario.horarioEntrada || "";
  document.getElementById("modalSaidaFuncionario").value =
    usuario.horarioSaida || "";
  document.getElementById("modalAlmocoFuncionario").value =
    usuario.horarioAlmoco || "";
  document.getElementById("modalDuracaoAlmocoFuncionario").value =
    usuario.duracaoAlmoco || "";
  document.getElementById("modalTipoFuncionario").value = usuario.tipo;

  // Define a imagem do funcionário na modal
  const foto = document.getElementById("modalFoto");
  if (usuario.fotoBase64) {
    foto.style.backgroundImage = `url(${usuario.fotoBase64})`;
  } else {
    // Se não houver foto, aplica uma cor de fundo ou imagem padrão
    foto.style.backgroundImage = "none";
    foto.style.backgroundColor = gerarCorPastel();
  }

  // Atribui eventos de clique aos botões de salvar e excluir com o índice correto
  document.getElementById("salvarDetalhesBtn").onclick = function () {
    salvarDetalhesFuncionario(index);
  };

  document.getElementById("excluirFuncionarioBtn").onclick = function () {
    excluirFuncionario(index);
  };

  // Exibe a modal
  document.getElementById("modalFuncionario").style.display = "block";
}

// Função para fechar a modal
function fecharModal() {
  document.getElementById("modalFuncionario").style.display = "none";
}

// Implementar as funções salvarDetalhesFuncionario() e excluirFuncionario() conforme necessário
function salvarDetalhesFuncionario() {
  // Obtém o índice do usuário selecionado armazenado anteriormente
  const usuarioIndex = document
    .getElementById("modalFuncionario")
    .getAttribute("data-usuario-index");

  if (usuarioIndex === null) {
    alert("Não foi possível identificar o usuário selecionado.");
    return;
  }

  const index = parseInt(usuarioIndex);

  // Obtém os dados atualizados do formulário modal
  const horarioEntrada = document.getElementById(
    "modalEntradaFuncionario"
  ).value;
  const horarioSaida = document.getElementById("modalSaidaFuncionario").value;
  const horarioAlmoco = document.getElementById("modalAlmocoFuncionario").value;
  const duracaoAlmoco = document.getElementById(
    "modalDuracaoAlmocoFuncionario"
  ).value;
  const tipoFuncionario = document.getElementById("modalTipoFuncionario").value;

  // Obtém a lista atual de usuários do localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se o índice é válido
  if (index < 0 || index >= usuarios.length) {
    alert("Índice de usuário inválido.");
    return;
  }

  // Atualiza o usuário selecionado com os novos detalhes
  usuarios[index].horarioEntrada = horarioEntrada;
  usuarios[index].horarioSaida = horarioSaida;
  usuarios[index].horarioAlmoco = horarioAlmoco;
  usuarios[index].duracaoAlmoco = duracaoAlmoco;
  usuarios[index].tipo = tipoFuncionario;

  // Salva a lista atualizada de usuários de volta ao localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Fecha a modal e atualiza a exibição dos usuários
  fecharModal();
  exibirFuncionarios();

  alert("Detalhes do usuário salvos com sucesso!");
}

function excluirFuncionario() {
  // Obtém o índice do usuário selecionado armazenado anteriormente na modal
  const usuarioIndex = document
    .getElementById("modalFuncionario")
    .getAttribute("data-usuario-index");

  if (usuarioIndex === null) {
    alert("Não foi possível identificar o usuário selecionado para exclusão.");
    return;
  }

  const index = parseInt(usuarioIndex);

  // Confirmação antes de excluir
  const confirmar = confirm("Tem certeza que deseja excluir este funcionário?");
  if (!confirmar) {
    return; // Se o usuário cancelar, simplesmente retorna sem fazer nada
  }

  // Obtém a lista atual de usuários do localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se o índice é válido
  if (index >= 0 && index < usuarios.length) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    fecharModal();
    exibirFuncionarios();
    alert("Funcionário excluído com sucesso!");
  } else {
    alert("Índice de usuário inválido.");
  }

  // Remove o usuário do array
  usuarios.splice(index, 1);

  // Salva a lista atualizada de usuários de volta ao localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Fecha a modal e atualiza a exibição dos usuários
  fecharModal();
  exibirFuncionarios();

  alert("Funcionário excluído com sucesso!");
}

// Exemplo de como abrir a modal ao clicar em um card
document.querySelectorAll(".funcionario-card").forEach((card, index) => {
  card.addEventListener("click", () => abrirModalDetalhesFuncionario(index));
});

// Fechar modal ao clicar no botão de fechamento
document.querySelector(".close").addEventListener("click", fecharModal);
