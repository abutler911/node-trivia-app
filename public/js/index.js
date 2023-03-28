let player1Score = 0;
let player2Score = 0;

document.getElementById("show-answer").addEventListener("click", function () {
  console.log("button clicked");
  const listItems = document.querySelectorAll("li");
  listItems.forEach((item) => {
    if (item.getAttribute("data-correct") === "true") {
      item.style.color = "green";
    }
  });
});

document
  .getElementById("player-names-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const player1Name = document.getElementById("player1Name").value;
    const player2Name = document.getElementById("player2Name").value;
    window.location.href = `/questions?player1Name=${player1Name}&player2Name=${player2Name}`;
  });
