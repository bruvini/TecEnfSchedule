document.addEventListener("DOMContentLoaded", function () {
  exibirFuncionarios();
});

function adicionarFuncionario() {
  const nomeFuncionario = document.getElementById("nomeFuncionario").value;
  const horarioEntrada = document.getElementById("entradaFuncionario").value;
  const horarioSaida = document.getElementById("saidaFuncionario").value;
  const horarioAlmoco = document.getElementById(
    "inicioAlmocoFuncionario"
  ).value;
  const duracaoAlmoco = document.getElementById(
    "duracaoAlmocoFuncionario"
  ).value;
  const fotoFuncionario = document.getElementById("fotoFuncionario").files[0];

  if (fotoFuncionario) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fotoBase64 = e.target.result; // Imagem em Base64

      const funcionario = {
        nomeFuncionario,
        horarioEntrada,
        horarioSaida,
        horarioAlmoco,
        duracaoAlmoco,
        fotoBase64,
      };

      let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
      funcionarios.push(funcionario);
      localStorage.setItem("funcionarios", JSON.stringify(funcionarios));

      // Limpa o formulário após adição
      document.getElementById("nomeFuncionario").value = "";
      document.getElementById("entradaFuncionario").value = "";
      document.getElementById("saidaFuncionario").value = "";
      document.getElementById("inicioAlmocoFuncionario").value = "";
      document.getElementById("duracaoAlmocoFuncionario").value = "";
      document.getElementById("fotoFuncionario").value = "";

      exibirFuncionarios();
    };

    reader.readAsDataURL(fotoFuncionario); // Inicia a leitura do arquivo como Base64
  } else {
    // Caso não tenha foto, adicione sem a foto
    const funcionarioSemFoto = {
      nomeFuncionario,
      horarioEntrada,
      horarioSaida,
      horarioAlmoco,
      duracaoAlmoco,
    };

    let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    funcionarios.push(funcionarioSemFoto);
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));

    exibirFuncionarios();
  }
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
  // Exibe uma caixa de diálogo de confirmação
  const confirmar = confirm("Tem certeza que deseja excluir este funcionário?");
  
  // Se o usuário confirmar, procede com a exclusão
  if (confirmar) {
    let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    funcionarios.splice(index, 1); // Remove o funcionário do array
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios)); // Atualiza o Local Storage
    exibirFuncionarios(); // Atualiza a tabela
  }
}

