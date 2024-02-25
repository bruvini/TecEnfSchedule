document.addEventListener("DOMContentLoaded", function () {
    exibirFuncionarios();
  });
  
  function adicionarFuncionario() {
    const nomeFuncionario = document.getElementById("nomeFuncionario");
    const horarioEntrada = document.getElementById("entradaFuncionario"); // Corrigido
    const horarioSaida = document.getElementById("saidaFuncionario"); // Corrigido
    const horarioAlmoco = document.getElementById("inicioAlmocoFuncionario"); // Corrigido
    const duracaoAlmoco = document.getElementById("duracaoAlmocoFuncionario"); // Corrigido
  
    const funcionario = {
      nomeFuncionario: nomeFuncionario.value,
      horarioEntrada: horarioEntrada.value,
      horarioSaida: horarioSaida.value,
      horarioAlmoco: horarioAlmoco.value,
      duracaoAlmoco: duracaoAlmoco.value,
    };
  
    let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    funcionarios.push(funcionario);
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
  
    nomeFuncionario.value = "";
    horarioEntrada.value = "";
    horarioSaida.value = "";
    horarioAlmoco.value = "";
    duracaoAlmoco.value = "";
  
    exibirFuncionarios();
  }
  
  
  function exibirFuncionarios() {
    const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    const tabelaFuncionarios = document
      .getElementById("tabelaFuncionarios")
      .getElementsByTagName("tbody")[0];
    tabelaFuncionarios.innerHTML = ""; // Limpa a tabela antes de adicionar as linhas
  
    funcionarios.forEach((funcionario, index) => {
      let linha = tabelaFuncionarios.insertRow();
      let celulaNome = linha.insertCell(0);
      let celulaEntrada = linha.insertCell(1);
      let celulaSaida = linha.insertCell(2);
      let celulaAlmoco = linha.insertCell(3);
      let celulaDuracao = linha.insertCell(4);
      let celulaAcoes = linha.insertCell(5);
  
      celulaNome.textContent = funcionario.nomeFuncionario;
      celulaEntrada.textContent = funcionario.horarioEntrada;
      celulaSaida.textContent = funcionario.horarioSaida;
      celulaAlmoco.textContent = funcionario.horarioAlmoco;
      celulaDuracao.textContent = funcionario.duracaoAlmoco;
  
      // Adiciona botões de editar e excluir
      celulaAcoes.innerHTML = `<button class="editBtn" onclick="editarFuncionario(${index})">Editar</button>
                               <button class="deleteBtn" onclick="excluirFuncionario(${index})">Excluir</button>`;
    });
  }
  
  function editarFuncionario(index) {
    // Implementar a lógica para editar um funcionário baseado no índice
  }
  
  function excluirFuncionario(index) {
    let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    funcionarios.splice(index, 1); // Remove o funcionário do array
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios)); // Atualiza o Local Storage
    exibirFuncionarios(); // Atualiza a tabela
  }
  