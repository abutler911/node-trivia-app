const player1Name = "<%= player1Name %>";
const player2Name = "<%= player2Name %>";

let player1Score = parseInt(localStorage.getItem("player1Score")) || 0;
let player2Score = parseInt(localStorage.getItem("player2Score")) || 0;

const player1ScoreEl = document.getElementById("player1Score");
const player2ScoreEl = document.getElementById("player2Score");

player1ScoreEl.textContent = player1Score;
player2ScoreEl.textContent = player2Score;

document.getElementById("player1Increment").addEventListener("click", () => {
  player1Score++;
  player1ScoreEl.textContent = player1Score;
  localStorage.setItem("player1Score", player1Score);
  if (player1Score > player2Score) {
    document.getElementById("player1Name").style.color = "green";
    document.getElementById("player2Name").style.color = "red";
  } else if (player1Score < player2Score) {
    document.getElementById("player1Name").style.color = "red";
    document.getElementById("player2Name").style.color = "green";
  } else {
    document.getElementById("player1Name").style.color = "";
    document.getElementById("player2Name").style.color = "";
  }
});

document.getElementById("player1Decrement").addEventListener("click", () => {
  if (player1Score > 0) {
    player1Score--;
    player1ScoreEl.textContent = player1Score;
    localStorage.setItem("player1Score", player1Score);
  }
  if (player1Score > player2Score) {
    document.getElementById("player1Name").style.color = "green";
    document.getElementById("player2Name").style.color = "red";
  } else if (player1Score < player2Score) {
    document.getElementById("player1Name").style.color = "red";
    document.getElementById("player2Name").style.color = "green";
  } else {
    document.getElementById("player1Name").style.color = "";
    document.getElementById("player2Name").style.color = "";
  }
});

document.getElementById("player2Increment").addEventListener("click", () => {
  player2Score++;
  player2ScoreEl.textContent = player2Score;
  localStorage.setItem("player2Score", player2Score);
  if (player1Score > player2Score) {
    document.getElementById("player1Name").style.color = "green";
    document.getElementById("player2Name").style.color = "red";
  } else if (player1Score < player2Score) {
    document.getElementById("player1Name").style.color = "red";
    document.getElementById("player2Name").style.color = "green";
  } else {
    document.getElementById("player1Name").style.color = "";
    document.getElementById("player2Name").style.color = "";
  }
});

document.getElementById("player2Decrement").addEventListener("click", () => {
  if (player2Score > 0) {
    player2Score--;
    player2ScoreEl.textContent = player2Score;
    localStorage.setItem("player2Score", player2Score);
  }
  if (player1Score > player2Score) {
    document.getElementById("player1Name").style.color = "green";
    document.getElementById("player2Name").style.color = "red";
  } else if (player1Score < player2Score) {
    document.getElementById("player1Name").style.color = "red";
    document.getElementById("player2Name").style.color = "green";
  } else {
    document.getElementById("player1Name").style.color = "";
    document.getElementById("player2Name").style.color = "";
  }
});

document.getElementById("resetButton").addEventListener("click", resetGame);

document.getElementById("show-answer").addEventListener("click", function () {
  console.log("button clicked");
  const listItems = document.querySelectorAll("li");
  listItems.forEach((item) => {
    if (item.getAttribute("data-correct") === "true") {
      item.style.color = "green";
      item.style.fontSize = "1.5rem";
    }
  });
});

function resetGame() {
  localStorage.setItem("player1Score", 0);
  localStorage.setItem("player2Score", 0);
  window.location.href = "/";
}
