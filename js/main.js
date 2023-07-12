const generate = document.getElementById("generate");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

generate.addEventListener("click", function () {
  const difficulty = document.getElementById("difficulty");
  let cellsTotalNumber;

  switch (difficulty.value) {
    case "easy":
      cellsTotalNumber = 100;
      break;

    case "medium":
      cellsTotalNumber = 81;
      break;

    case "hard":
      cellsTotalNumber = 49;
      break;
  }

  const bombs = [];
  const bombsNumber = 16;

  for (let i = 0; i < bombsNumber; i++) {
    let rand = getRandomInt(1, cellsTotalNumber);

    while (bombs.includes(rand)) {
      rand = getRandomInt(1, cellsTotalNumber);
    }

    bombs.push(rand);
  }

  console.log(bombs);

  const field = document.getElementById("field");
  const message = document.getElementById("message");
  field.innerHTML = "";
  message.style.display = "none";

  let counter = 0;
  let lost = false;

  for (let i = 0; i < cellsTotalNumber; i++) {
    const cell = document.createElement("div");
    cell.innerHTML = i + 1;
    cell.classList.add("cell");
    cell.style.flexBasis = `${100 / Math.sqrt(cellsTotalNumber)}%`;

    field.append(cell);

    cell.addEventListener("click", function () {
      if (lost === false) {
        if (bombs.includes(parseInt(this.innerHTML))) {
          this.style.backgroundColor = "red";
          console.log(
            "Hai calpestato una bomba! Il tuo punteggio è: " + counter
          );
          message.style.display = "flex";
          message.innerHTML =
            "Hai calpestato una bomba! Il tuo punteggio è: " + counter;
          lost = true;

          const cells = document.querySelectorAll(".cell");

          for (let j = 0; j < cells.length; j++) {
            if (bombs.includes(parseInt(cells[j].innerHTML))) {
              cells[j].style.backgroundColor = "red";
            }
          }
        } else {
          this.style.backgroundColor = "lightblue";
          console.log(this.innerHTML);
          counter += 1;

          if (counter == cellsTotalNumber - bombsNumber) {
            console.log("Hai vinto!");
            message.style.display = "flex";
            message.innerHTML = "Hai vinto!";
          }
        }
      }
    });
  }
});
