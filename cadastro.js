document.addEventListener("DOMContentLoaded", function () {
  const formCadastro = document.getElementById("formCadastro");
  formCadastro.addEventListener("submit", salvarCadastro);
});

function salvarCadastro(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtenção dos valores do formulário
  const nomeCompleto = document.getElementById("nomeCompleto").value.trim();
  const email = document.getElementById("email").value.trim();
  const matricula = document.getElementById("matricula").value.trim();
  const usuario = document.getElementById("nomeUsuario").value.trim();
  const senha = document.getElementById("senha").value;
  const repetirSenha = document.getElementById("repetirSenha").value;
  const fotoFuncionario = document.getElementById("fotoFuncionario").files[0];

  // Validações
  if (!nomeCompleto) return alert("Por favor, digite o nome completo.");
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    return alert("Por favor, digite um email válido.");
  if (!matricula.match(/^\d+$/))
    return alert("O número da matrícula deve conter apenas números.");
  if (!usuario.match(/^[a-zA-Z]+$/))
    return alert(
      "O nome do usuário não deve conter números, espaços ou caracteres especiais."
    );
  if (senha.length < 6) return alert("A senha deve ter pelo menos 6 dígitos.");
  if (senha !== repetirSenha) return alert("As senhas não coincidem.");

  // Conversão da foto para Base64 e salvamento
  if (fotoFuncionario) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const fotoBase64 = e.target.result;
      salvarDados({
        nomeCompleto,
        email,
        matricula,
        usuario,
        senha,
        fotoBase64,
        tipo: "funcionario",
      });
    };
    reader.readAsDataURL(fotoFuncionario);
  } else {
    salvarDados({
      nomeCompleto,
      email,
      matricula,
      usuario,
      senha,
      tipo: "Funcionário",
    });
  }
}

function salvarDados(dados) {
  // Aqui você pode implementar a lógica para salvar os dados no Local Storage
  // Exemplo:
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(dados);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html"; // Redireciona para a página de login
}
