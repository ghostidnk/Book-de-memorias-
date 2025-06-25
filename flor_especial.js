document.getElementById("flor_especial-buraco-negro").addEventListener("click", function () {
  const mensagem = document.getElementById("flor_especial-mensagem");
  const texto = `
    Meu amor,

    Penso em dizer tantas coisas para você para tentar demonstrar ao menos um pouco daquilo que sinto por você.
    Uma vez cazuza em todo seu ser poetico (ou possivelmente drogado) compôs a seguinte frase dentro de uma canção.
    "Quando a gente conversa, 
    contado casos, besteiras, 
    tanta coisa incomum, 
    deixando escapar segredos..."
    É meu amor, assim como cazuza
    Eu preciso dizer que Te amo 

    Te quiero para daqui até o fim de minha vida!
    você é o meu universo, a minha canção favorita
    Eu te amo!

    - Com todo meu amor, Rafael
  `;

  let index = 0;
  mensagem.style.display = "block";
  mensagem.innerHTML = "<h1>Para Juiany</h1><p id='flor_especial-digitando'></p>";

  function escrever() {
    if (index < texto.length) {
      document.getElementById("flor_especial-digitando").innerHTML += texto.charAt(index);
      index++;
      setTimeout(escrever, 40); // velocidade da digitação
    }
  }

  escrever();
});
