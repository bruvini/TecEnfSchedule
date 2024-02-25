document.addEventListener("DOMContentLoaded", () => {
  listarUsuarios(); // Mudança aqui
  document.getElementById("gerarEscala").addEventListener("click", gerarEscala);
});

let escalaSemanal = {
  "Segunda-feira": [],
  "Terça-feira": [],
  "Quarta-feira": [],
  "Quinta-feira": [],
  "Sexta-feira": [],
};

function listarUsuarios() { // Nome da função modificado
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // Mudança aqui
  const selecaoFuncionarios = document.getElementById("selecaoFuncionarios");

  usuarios.forEach((usuario) => { // Mudança aqui
    const card = document.createElement("div");
    card.classList.add("funcionario-card");

    const foto = document.createElement("div");
    foto.classList.add("funcionario-foto");
    if (usuario.fotoBase64) { // Mudança aqui
      foto.style.backgroundImage = `url(${usuario.fotoBase64})`; // Mudança aqui
      foto.style.backgroundSize = 'cover';
      foto.style.backgroundPosition = 'center';
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

// Você também precisará ajustar as funções gerarEscala e outras relacionadas para usar os dados corretos do objeto "usuarios". Isso inclui adaptar a lógica de geração de escalas para usar os horários e tipos de usuários corretos.
