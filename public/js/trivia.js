// Variables
const player1NameEl = document.getElementById("player1Name");
const player2NameEl = document.getElementById("player2Name");
const player1ScoreEl = document.getElementById("player1Score");
const player2ScoreEl = document.getElementById("player2Score");
const questions = JSON.parse(document.getElementById("questions").value);
let player1Score = parseInt(localStorage.getItem("player1Score")) || 0;
let player2Score = parseInt(localStorage.getItem("player2Score")) || 0;
let currentQuestionIndex = 0;

// Initial score display
player1ScoreEl.textContent = player1Score;
player2ScoreEl.textContent = player2Score;

// Event Listeners
document.getElementById("player1Increment").addEventListener("click", () => {
  player1Score++;
  player1ScoreEl.textContent = player1Score;
  localStorage.setItem("player1Score", player1Score);
  updatePlayerColors();
});

document.getElementById("player1Decrement").addEventListener("click", () => {
  if (player1Score > 0) {
    player1Score--;
    player1ScoreEl.textContent = player1Score;
    localStorage.setItem("player1Score", player1Score);
    updatePlayerColors();
  }
});

document.getElementById("player2Increment").addEventListener("click", () => {
  player2Score++;
  player2ScoreEl.textContent = player2Score;
  localStorage.setItem("player2Score", player2Score);
  updatePlayerColors();
});

document.getElementById("player2Decrement").addEventListener("click", () => {
  if (player2Score > 0) {
    player2Score--;
    player2ScoreEl.textContent = player2Score;
    localStorage.setItem("player2Score", player2Score);
    updatePlayerColors();
  }
});

document.getElementById("resetButton").addEventListener("click", resetGame);

document.getElementById("show-answer").addEventListener("click", () => {
  const listItems = document.querySelectorAll("li");
  listItems.forEach((item) => {
    if (item.getAttribute("data-correct") === "true") {
      item.style.color = "green";
      item.style.fontSize = "1.5rem";
    }
  });
});

document.getElementById("nextButton").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    const nextQuestion = questions[currentQuestionIndex];
    document.getElementById("questionText").textContent = nextQuestion.question;
    const answerList = document.getElementById("answerList");
    answerList.innerHTML = "";
    nextQuestion.allAnswers.forEach((answer) => {
      const li = document.createElement("li");
      li.textContent = answer;
      li.setAttribute("data-correct", answer === nextQuestion.correct_answer);
      answerList.appendChild(li);
    });
  } else {
    alert("You have reached the end of the questions.");
  }
});

// Functions
function updatePlayerColors() {
  if (player1Score > player2Score) {
    player1NameEl.style.color = "green";
    player2NameEl.style.color = "red";
  } else if (player1Score < player2Score) {
    player1NameEl.style.color = "red";
    player2NameEl.style.color = "green";
  } else {
    player1NameEl.style.color = "";
    player2NameEl.style.color = "";
  }
}

function resetGame() {
  localStorage.setItem("player1Score", 0);
  localStorage.setItem("player2Score", 0);
  window.location.href = "/";
}
