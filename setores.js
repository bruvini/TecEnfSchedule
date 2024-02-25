document.addEventListener("DOMContentLoaded", function () {
  exibirSetores();
});

function adicionarSetor() {
  const nomeSetor = document.getElementById("nomeSetor");
  const inicioFuncionamento = document.getElementById(
    "inicioFuncionamentoSetor"
  );
  const terminoFuncionamento = document.getElementById(
    "terminoFuncionamentoSetor"
  );
  const setorPrioritario = document.getElementById("setorPrioritario");

  const setor = {
    nomeSetor: nomeSetor.value,
    inicioFuncionamento: inicioFuncionamento.value,
    terminoFuncionamento: terminoFuncionamento.value,
    setorPrioritario: setorPrioritario.value === "sim" ? "Sim" : "Não",
  };

  let setores = JSON.parse(localStorage.getItem("setores")) || [];
  setores.push(setor);
  localStorage.setItem("setores", JSON.stringify(setores));

  // Limpa o formulário
  nomeSetor.value = "";
  inicioFuncionamento.value = "";
  terminoFuncionamento.value = "";
  setorPrioritario.value = "nao"; // Define o valor padrão para "Não"

  exibirSetores();
}

function exibirSetores() {
  const setores = JSON.parse(localStorage.getItem("setores")) || [];
  const tabelaSetores = document
    .getElementById("tabelaSetores")
    .getElementsByTagName("tbody")[0];
  tabelaSetores.innerHTML = ""; // Limpa a tabela antes de adicionar as linhas

  setores.forEach((setor, index) => {
    let linha = tabelaSetores.insertRow();
    let celulaNome = linha.insertCell(0);
    let celulaInicio = linha.insertCell(1);
    let celulaTermino = linha.insertCell(2);
    let celulaPrioritario = linha.insertCell(3);
    let celulaAcoes = linha.insertCell(4);

    celulaNome.textContent = setor.nomeSetor;
    celulaInicio.textContent = setor.inicioFuncionamento;
    celulaTermino.textContent = setor.terminoFuncionamento;
    celulaPrioritario.textContent = setor.setorPrioritario;

    // Adiciona botões de editar e excluir
    celulaAcoes.innerHTML = `<button class="editBtn" onclick="editarSetor(${index})">Editar</button>
                         <button class="deleteBtn" onclick="excluirSetor(${index})">Excluir</button>`;
  });
}

function editarSetor(index) {
  // Implementar a lógica para editar um setor baseado no índice
}

function excluirSetor(index) {
  let setores = JSON.parse(localStorage.getItem("setores")) || [];
  setores.splice(index, 1); // Remove o setor do array
  localStorage.setItem("setores", JSON.stringify(setores)); // Atualiza o Local Storage
  exibirSetores(); // Atualiza a tabela
}
