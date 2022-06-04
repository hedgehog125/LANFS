const PORT = process.env.PORT?? 7000;

const express = require("express");
const app = express();

app.use(express.static("../static/build/"));

//app.get("/", (req, res))

app.listen(PORT, _ => {
    console.log(`Running on port ${PORT}.`);
});