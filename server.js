const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const Film = require("./models/Film");

// Connect to MongoDB database
mongoose
  .connect("mongodb://127.0.0.1:27017/filmstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Could not connect to MongoDB");
    console.error(error);
  });

// Body-parser middleware
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

// API routes
app.use("/films", require("./routes/Films"));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
