function adicionarSetor() {
  const nomeSetor = document.getElementById("nomeSetor").value;
  const inicioFuncionamento = document.getElementById(
    "inicioFuncionamentoSetor"
  ).value;
  const terminoFuncionamento = document.getElementById(
    "terminoFuncionamentoSetor"
  ).value;
  const setorPrioritario =
    document.getElementById("setorPrioritario").value === "sim";

  // Implementação da lógica para salvar no Local Storage
  const setor = {
    nomeSetor,
    inicioFuncionamento,
    terminoFuncionamento,
    setorPrioritario,
  };
  const setoresSalvos = JSON.parse(localStorage.getItem("setores")) || [];
  setoresSalvos.push(setor);
  localStorage.setItem("setores", JSON.stringify(setoresSalvos));

  console.log("Setor adicionado:", {
    nomeSetor,
    inicioFuncionamento,
    terminoFuncionamento,
    setorPrioritario,
  });

  // Resetar formulário
  document.getElementById("formSetor").reset();
}

function adicionarFuncionario() {
  // Implementar lógica para adicionar funcionário
  console.log("Adicionar funcionário");
}

function gerarEscala() {
  // Implementar lógica para gerar a escala
  console.log("Gerar escala");
  document.getElementById("escalaSemanal").innerText = "Escala gerada...";
}

// Exemplo de como armazenar e recuperar do Local Storage
function salvarDados() {
  const dados = { setores: [], funcionarios: [] };
  localStorage.setItem("dadosEscala", JSON.stringify(dados));
}

function carregarDados() {
  const dados = JSON.parse(localStorage.getItem("dadosEscala"));
  if (dados) {
    console.log(dados);
  }
}
