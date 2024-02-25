document.addEventListener("DOMContentLoaded", () => {
  listarFuncionarios();
  document.getElementById("gerarEscala").addEventListener("click", gerarEscala);
});

// Exemplo de estrutura para armazenar a escala
let escalaSemanal = {
  "Segunda-feira": [],
  "Terça-feira": [],
  "Quarta-feira": [],
  "Quinta-feira": [],
  "Sexta-feira": [],
};

function listarFuncionarios() {
  const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
  const selecaoFuncionarios = document.getElementById("selecaoFuncionarios");

  funcionarios.forEach((funcionario, index) => {
    // Adicione o index aqui
    const card = document.createElement("div");
    card.classList.add("funcionario-card");
    const foto = document.createElement("div");
    foto.classList.add("funcionario-foto");
    // foto.style.backgroundImage = `url(${funcionario.fotoURL})`; // Quando você tiver fotos

    const nome = document.createElement("span");
    nome.classList.add("funcionario-nome");
    nome.textContent = funcionario.nomeFuncionario;

    card.appendChild(foto);
    card.appendChild(nome);

    card.addEventListener("click", function () {
      this.classList.toggle("selected");
      // Aqui você pode adicionar ou remover o funcionário de uma lista de selecionados
    });
    selecaoFuncionarios.appendChild(card);
  });
}

function atualizarContadorEscalas() {
  let escalasGeradas = parseInt(localStorage.getItem("escalasGeradas") || "0");
  escalasGeradas++;
  localStorage.setItem("escalasGeradas", escalasGeradas.toString());
}

function gerarEscala() {
  // Define todosFuncionarios dentro da função
  const todosFuncionarios =
    JSON.parse(localStorage.getItem("funcionarios")) || [];
  const todosSetores = JSON.parse(localStorage.getItem("setores")) || [];

  // Filtra apenas os funcionários selecionados
  const funcionariosSelecionados = [
    ...document.querySelectorAll(".funcionario-card.selected"),
  ].map((el) => {
    const index = Array.from(
      document.querySelectorAll(".funcionario-card")
    ).indexOf(el);
    return todosFuncionarios[index];
  });

  // Preparação inicial dos dados
  const setoresOrdenadosBase = todosSetores.sort((a, b) =>
    a.setorPrioritario === "Sim" ? -1 : 1
  );

  Object.keys(escalaSemanal).forEach((dia, indexDia) => {
    escalaSemanal[dia] = [];
    let alocaçõesPorDia = [];
    let setoresOrdenados = rotacionarArray(setoresOrdenadosBase, indexDia); // Rotaciona os setores para cada dia

    funcionariosSelecionados.forEach((funcionario) => {
      let setorAlocado = false;

      for (let setor of setoresOrdenados) {
        if (
          podeSerAlocado(funcionario, setor) &&
          !alocaçõesPorDia.includes(setor.nomeSetor)
        ) {
          alocaçõesPorDia.push(setor.nomeSetor);
          setorAlocado = true;
          adicionaFuncionarioAoSetor(dia, funcionario, setor);
          break;
        }
      }
    });
  });

  atualizarContadorEscalas();
  renderizarEscala();
}

function rotacionarArray(array, count) {
  let length = array.length;
  count = count % length;
  return [...array.slice(count, length), ...array.slice(0, count)];
}

function adicionaFuncionarioAoSetor(dia, funcionario, setor) {
  let horarioAlmocoInicio =
    funcionario.horarioAlmoco && funcionario.horarioAlmoco.split(":")[0];
  let horarioAlmocoFim = horarioAlmocoInicio
    ? `${parseInt(horarioAlmocoInicio) + 1}:${
        funcionario.horarioAlmoco.split(":")[1]
      }`
    : "não definido";
  escalaSemanal[dia].push(
    `${funcionario.nomeFuncionario} assume o ${setor.nomeSetor} das ${funcionario.horarioEntrada} até ${funcionario.horarioSaida}, intervalo das ${funcionario.horarioAlmoco} às ${horarioAlmocoFim}`
  );
}

function renderizarEscala() {
  const escalaGeradaDiv = document.getElementById("escalaGerada");
  escalaGeradaDiv.innerHTML = ""; // Limpa a escala anterior

  Object.entries(escalaSemanal).forEach(([dia, escalasDoDia]) => {
    const diaHeader = document.createElement("h3");
    diaHeader.textContent = dia;
    escalaGeradaDiv.appendChild(diaHeader);

    const escalasList = document.createElement("ul");
    escalasDoDia.forEach((escala) => {
      const escalaItem = document.createElement("li");
      escalaItem.textContent = escala;
      escalasList.appendChild(escalaItem);
    });
    escalaGeradaDiv.appendChild(escalasList);
  });
}

function podeSerAlocado(funcionario, setor) {
  // Converte os horários para minutos para facilitar a comparação
  const converteParaMinutos = (hora) => {
    const [horas, minutos] = hora.split(":").map(Number);
    return horas * 60 + minutos;
  };

  const inicioFuncionario = converteParaMinutos(funcionario.horarioEntrada);
  const fimFuncionario = converteParaMinutos(funcionario.horarioSaida);
  const inicioSetor = converteParaMinutos(setor.inicioFuncionamento);
  const fimSetor = converteParaMinutos(setor.terminoFuncionamento);

  // Verifica se o horário do funcionário e do setor se sobrepõem
  return inicioFuncionario < fimSetor && fimFuncionario > inicioSetor;
}
