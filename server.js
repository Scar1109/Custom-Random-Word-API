const express = require("express");

const app = express();

app.use(express.json());

const words = require("./words.json");

function selectRandomWord(selectedWordSet) {
    return selectedWordSet[Math.floor(Math.random() * selectedWordSet.length)];
}

app.get("/api/getAllWords", (req, res) => {
    res.json(words);
});

app.get("/api/getRandomWord", (req, res) => {
    const difficulty = req.query.difficulty;
    console.log(difficulty);

    let temp = selectRandomWord(words);
    if (difficulty === "easy") {
        while (temp.word.length > 4) {
            temp = selectRandomWord(words);
        }
    } else if (difficulty === "normal") {
        while (temp.word.length < 5 || temp.word.length > 7) {
            temp = selectRandomWord(words);
        }
    } else if (difficulty === "hard") {
        while (temp.word.length < 8 || temp.word.length > 9) {
            temp = selectRandomWord(words);
        }
    }
    res.json(temp);
});


app.get("/api/getRandomWord" , (req, res) => {
    const len = req.query.len;
    console.log(difficulty);

    let temp = selectRandomWord(words);
    while (temp.word.length !== len) {
        temp = selectRandomWord(words);
    }
    res.json(temp);
});


const port = process.env.PORT || 5998;

app.listen(port, () => console.log(`Server running on port ${port}`));
