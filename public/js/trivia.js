const player1Name = "<%= player1Name %>";
const player2Name = "<%= player2Name %>";
let currentQuestionIndex = 0;
const questions = JSON.parse(document.getElementById("questions").value);

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

function loadNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    const nextQuestion = questions[currentQuestionIndex];
    // Update the question text and answers
    document.querySelector(".card-title").textContent = nextQuestion.question;
    const listItems = document.querySelectorAll("li");
    listItems.forEach((item, index) => {
      item.textContent = nextQuestion.allAnswers[index];
      item.style.color = "";
      item.style.fontSize = "";
      item.setAttribute(
        "data-correct",
        item.textContent === nextQuestion.correct_answer
      );
    });
  } else {
    alert("No more questions available.");
  }
}

// document
//   .getElementById("nextButton")
//   .addEventListener("click", loadNextQuestion);

document.getElementById("nextButton").addEventListener("click", () => {
  const questions = JSON.parse(document.getElementById("questions").value);
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    const nextQuestion = questions[currentQuestionIndex];
    const answerList = document.getElementById("answerList");

    // Update the question text
    document.getElementById("questionText").textContent = nextQuestion.question;

    // Clear the current answers
    answerList.innerHTML = "";

    // Add the new answers
    nextQuestion.allAnswers.forEach((answer) => {
      const li = document.createElement("li");
      li.textContent = answer;
      li.setAttribute("data-correct", answer === nextQuestion.correct_answer);
      answerList.appendChild(li);
    });
  } else {
    // Handle the end of the question list (e.g., show a message or redirect)
    alert("You have reached the end of the questions.");
  }
});
