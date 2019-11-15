const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// routes
app.get("/api/notes", async function (req, res) {
    const notes = await readFile("./db/db.json", "utf8");
    res.json(JSON.parse(notes));
});


app.post("/api/notes", function (req, res) {
    res.json("");
})

app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id;
})

app.get("*", function (req, res) {
    res.redirect("/");
});
// listener
app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`);
})