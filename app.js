const express = require("express");
const app = express();
const axios = require("axios");

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

function getRandomQuestion(questions) {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

app.get("/questions", async (req, res) => {
  try {
    const { amount, type, category, difficulty } = req.query;

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

    const randomQuestion = getRandomQuestion(questions);
    res.render("trivia", {
      question: randomQuestion,
      answers: randomQuestion.incorrect_answers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching questions...");
  }
});

app.listen(port, () => {
  console.log(`server up on localhost:${port}`);
});
