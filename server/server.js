import express from "express";
import cors from "cors";
import routes from "./routes/index.js";



const app = express();

app.use(cors());
app.use(express.json());


app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Quizrr backend is running!");
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});