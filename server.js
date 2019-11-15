const fs = require("fs");
const util = require("util");
const uuid = require('uuid/v4');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

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
    try {
    const notes = await readFile("./db/db.json", "utf8");
    res.json(JSON.parse(notes));
}catch(err){
    console.log(err);
}
});

app.post("/api/notes", async function (req, res) {
    let allNotes;
    const {title, text} = req.body;
    const id = uuid();
    const newNote = {title, text, id}

    const currentNotes = await readFile("./db/db.json", "utf8");
    console.log("currentNotes", JSON.parse(currentNotes));

    allNotes = [].concat(JSON.parse(currentNotes));
    allNotes.push(newNote);
    console.log("allNotes: ", allNotes);

    try {
    const notes = await writeFile("./db/db.json", JSON.stringify(allNotes));
    res.json(allNotes);
}catch(err){
    console.log(err);
}

});

// app.post("/api/notes", function (req, res) {
//     res.json("");
// })

app.delete("/api/notes/:id", function (req, res) {
    console.log("delete route hit")
    const id = req.params.id;
    console.log(id);
    

})


    

app.get("*", function (req, res) {
    res.redirect("/");
});
// listener
app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`);
})