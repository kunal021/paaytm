const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const path = require("path");
const rootRouter = require("./routes/root.route");

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(__dirname, "/frontend/dist"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

mongoose
  .connect(process.env.DB_URI, {})
  .then(() => console.log("DB is connected"));

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
