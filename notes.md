Difference between callback function and promise

```javascript
fs.readFile("index.html", "utf8", function (err, data) {

})

readFile("index.html", "utf8").then(data => {

})
```

Async VS Regular Promise
```javascript
app.get("/api/notes", function (req, res) {
    readFile("./db/db.json", "utf8").then(function (notes) {
        res.json(JSON.parse(notes));
    })
});

app.get("/api/notes", async function (req, res) {
    const notes = await readFile("./db/db.json", "utf8");
    res.json(JSON.parse(notes));
});
```

