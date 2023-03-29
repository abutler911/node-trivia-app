const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cors());

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

function getRandomQuestion(questions) {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

app.get("/questions", async (req, res) => {
  try {
    const { amount, type, category, difficulty, player1Name, player2Name } =
      req.query;

    const response = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount: amount,
        type: type,
        category: category,
        difficulty: difficulty,
      },
    });
    console.log(response.data);
    const questions = response.data.results;

    questions.forEach((question) => {
      question.allAnswers = shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);
    });

    res.render("trivia", {
      questions: questions,
      player1Name: player1Name,
      player2Name: player2Name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching questions...");
  }
});

app.listen(port, () => {
  console.log(`server up on localhost:${port}`);
});
