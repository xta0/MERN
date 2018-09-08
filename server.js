const express = require("express");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();

//middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
