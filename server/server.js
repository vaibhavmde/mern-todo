require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const app = express();
const PORT = process.env.PORT || 5500;

//connect to mongodb
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
//to parse json
app.use(express.json());

// routes
app.use("/auth", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));

app.use(express.static("build"));
app.get("/", (req, res) => res.send("./public/index.html"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
