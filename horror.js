document.addEventListener("DOMContentLoaded", function() {
    const intentosMaximos = 5;
    let intentos = intentosMaximos;
    let palabra = "";
  
    function getWord() {
      const endpoint = "https://random-word-api.herokuapp.com/word?length=5";
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          palabra = data[0].toLowerCase();
          iniciarJuego();
        })
        .catch(error => {
          console.error("Error al obtener la palabra:", error);
        });
    }
  
    function iniciarJuego() {
      const guessButton = document.getElementById("guess-button");
      guessButton.addEventListener("click", intentar);
  
      function intentar() {
        const input = document.getElementById("guess-input");
        const valor = input.value.toLowerCase();
        input.value = "";
  
        if (valor === palabra) {
          terminar("¡GANASTE!");
          return;
        }
  
        const grid = document.getElementById("grid");
        const row = document.createElement("div");
        row.className = "row";
  
        for (let i = 0; i < palabra.length; i++) {
          const span = document.createElement("span");
          span.className = "letter";
  
          if (i < valor.length) {
            if (valor[i] === palabra[i]) {
              span.innerHTML = valor[i];
              span.style.backgroundColor = "green";
            } else if (palabra.includes(valor[i])) {
              span.innerHTML = valor[i];
              span.style.backgroundColor = "orange";
            } else {
              span.innerHTML = valor[i];
              span.style.backgroundColor = "gray";
            }
          }
  
          row.appendChild(span);
        }
  
        grid.appendChild(row);
  
        intentos--;
        if (intentos === 0) {
          terminar("¡PERDISTE! La palabra era: " + palabra);
        }
      }
  
      function terminar(mensaje) {
        const input = document.getElementById("guess-input");
        input.disabled = true;
        guessButton.disabled = true;
        const guesses = document.getElementById("grid");
        const message = document.createElement("p");
        message.textContent = mensaje;
        message.style.color = "orange"
        guesses.appendChild(message);
      }
    }
      getWord();
  });