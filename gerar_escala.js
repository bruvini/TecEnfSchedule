document.addEventListener("DOMContentLoaded", () => {
  listarUsuarios();
  handleTipoEscalaChange();

  const tipoEscalaSelect = document.getElementById("tipoEscala");
  tipoEscalaSelect.addEventListener("change", handleTipoEscalaChange);

  // Ajusta a configuração do Dragula
  const drake = dragula([...document.querySelectorAll(".linhaDoTempo"), document.getElementById("selecaoFuncionarios")], {
    copy: function (el, source) {
      return source === document.getElementById("selecaoFuncionarios");
    },
    accepts: function (el, target) {
      return target.classList.contains("linhaDoTempo");
    },
    removeOnSpill: true
  }).on("drop", function (el, target, source) {
    if (target && target.classList.contains("linhaDoTempo")) {
      solicitarHorariosEajustarCard(el, target, true); // Passa true para indicar que é uma cópia
    }
  }).on("remove", function (el) {
    // Lógica para tratar a remoção de um card
  });
});

function handleTipoEscalaChange() {
  const tipoEscala = document.getElementById("tipoEscala").value;
  const dataEscalaInput = document.querySelector(".inputContainer");

  // Limpa o container de setores
  document.getElementById("setoresContainer").innerHTML = "";

  if (tipoEscala === "diaria") {
    dataEscalaInput.style.display = "block"; // Mostra input de data se diária é selecionada
    carregarSetores(); // Carrega os setores somente se diária é selecionada
  } else {
    dataEscalaInput.style.display = "none"; // Oculta input de data se não é diária
  }
}

function carregarSetores() {
  const setoresContainer = document.getElementById("setoresContainer");
  setoresContainer.innerHTML = ""; // Limpa antes de adicionar novos setores

  const setores = JSON.parse(localStorage.getItem("setores")) || [];

  setores.forEach((setor) => {
    const setorElement = document.createElement("div");
    setorElement.classList.add("setor");

    // Nome do setor acima da linha do tempo
    const nomeSetor = document.createElement("div");
    nomeSetor.textContent = setor.nomeSetor;
    nomeSetor.classList.add("nomeSetor");
    setoresContainer.appendChild(nomeSetor);

    // Linha do tempo
    const linhaDoTempo = document.createElement("div");
    linhaDoTempo.classList.add("linhaDoTempo");
    for (let hora = 8; hora <= 20; hora++) {
      const horaElement = document.createElement("div");
      horaElement.classList.add("hora");
      horaElement.setAttribute("data-hora", `${hora}h`); // Atributo para identificação
      linhaDoTempo.appendChild(horaElement);
    }
    setorElement.appendChild(linhaDoTempo);

    setoresContainer.appendChild(setorElement);
  });
}

// Esta função será chamada quando um item for solto na linha do tempo
function solicitarHorariosEajustarCard(el, target, isCopy) {
  if (!isCopy) return; // Se não for cópia, não faz nada

  const inicio = parseInt(prompt("A que hora o funcionário inicia? (Ex: 13 para 13h)"));
  const fim = parseInt(prompt("Até que hora o funcionário fica? (Ex: 17 para 17h)"));

  if (!inicio || !fim || fim <= inicio) {
    alert("Horários inválidos.");
    return; // Encerra se os horários não forem válidos
  }

  // Calcula largura e posição do card
  const larguraTotalLinhaDoTempo = target.offsetWidth;
  const larguraPorHora = larguraTotalLinhaDoTempo / 12; // De 8h às 20h
  const posicaoInicio = (inicio - 8) * larguraPorHora;

  // Ajusta a posição e largura do card
  const cardClone = el.cloneNode(true); // Ou crie um novo elemento, conforme necessário
  cardClone.style.left = `${posicaoInicio}px`;
  cardClone.style.width = `${(fim - inicio) * larguraPorHora}px`; // Ajuste a largura com base na duração

  // Adiciona o clone à linha do tempo
  target.appendChild(cardClone);

  novoCard.addEventListener("dblclick", function () {
    novoCard.remove(); // Permite remover o card ao dar duplo clique
  });
}

function listarUsuarios() {
  // Nome da função modificado
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // Mudança aqui
  const selecaoFuncionarios = document.getElementById("selecaoFuncionarios");

  usuarios.forEach((usuario) => {
    // Mudança aqui
    const card = document.createElement("div");
    card.classList.add("funcionario-card");

    const foto = document.createElement("div");
    foto.classList.add("funcionario-foto");
    if (usuario.fotoBase64) {
      // Mudança aqui
      foto.style.backgroundImage = `url(${usuario.fotoBase64})`; // Mudança aqui
      foto.style.backgroundSize = "cover";
      foto.style.backgroundPosition = "center";
    } else {
      foto.style.backgroundColor = gerarCorPastel();
    }

    const nome = document.createElement("span");
    nome.classList.add("funcionario-nome");
    nome.textContent = usuario.nomeCompleto; // Mudança aqui

    card.appendChild(foto);
    card.appendChild(nome);

    card.addEventListener("click", function () {
      this.classList.toggle("selected");
    });
    selecaoFuncionarios.appendChild(card);
  });
}

function gerarCorPastel() {
  const base = 100;
  const red = base + Math.floor(Math.random() * (255 - base));
  const green = base + Math.floor(Math.random() * (255 - base));
  const blue = base + Math.floor(Math.random() * (255 - base));
  return `rgb(${red}, ${green}, ${blue})`;
}

function atualizarContadorEscalas() {
  let escalasGeradas = parseInt(localStorage.getItem("escalasGeradas") || "0");
  escalasGeradas++;
  localStorage.setItem("escalasGeradas", escalasGeradas.toString());
}

// Exemplo de como inicializar Dragula para permitir arrastar funcionários para os setores
dragula([...document.querySelectorAll(".setor")]);

// Gerando a linha do tempo para cada setor
const setores = ["Setor 1", "Setor 2"]; // Substitua pela sua lógica para obter setores
const setoresContainer = document.getElementById("setoresContainer");

setores.forEach((setor) => {
  const setorDiv = document.createElement("div");
  setorDiv.classList.add("setor");
  setorDiv.textContent = setor;
  setoresContainer.appendChild(setorDiv);

  // Adiciona a linha do tempo no setor
  const linhaTempo = document.createElement("div");
  linhaTempo.classList.add("linhaTempo");
  for (let hora = 7; hora <= 20; hora++) {
    const horaDiv = document.createElement("div");
    horaDiv.classList.add("hora");
    // horaDiv.textContent = `${hora}h`; // Opcional, se quiser marcar as horas
    linhaTempo.appendChild(horaDiv);
  }
  setorDiv.appendChild(linhaTempo);
});
