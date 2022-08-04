import express from "express";
import cors from "cors";
// 1. first initialize express
const app = express();

// 2. doing this so that we get data from post method.
app.use(express.json());

// 3. doing this for the middle ware so that our api will go to client
app.use(cors());
const PORT = 8000;

app.use("/", (req, res, next) => {
  res.json({
    status: "name",
  });
});

// 2. listen for server
app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`Server running at http://localhost:${PORT}`);
});
