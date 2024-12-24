const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv =require('dotenv')

app.use(cors({
  origin: "https://theroadmap01.netlify.app", // Replace with your front-end origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
const feedbackModel = require("./model/model");

const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config();
const API_KEY=process.env.API_KEY
mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
port = 2001;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.post("/getData", async (req, res) => {
  const { request } = req.body;
  const prompt = ` ${request} and
    Please number each section and present the response in an organized format in detailed explanation in total.`;

  try {
    const result = await model.generateContent(prompt);
    res.status(200).json(result.response.text());
    console.log("Generated text:", result.response.text());
  } catch (error) {
    console.error("Error in getData endpoint:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch information", details: error.message });
  }
});
app.get("/info", (req, res) => {
try{
  feedbackModel.find()
  .then((resp) => {
    console.log(resp)
    res.json(resp)});

}catch(err)
{
  console.log("Something went wrong", err);
  res.status(500).json({ error: "Failed to fetch information", details: err.message });
}});
app.post("/info", (req, res) => {
  feedbackModel
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => {
      console.log("Something went wrong", err);
    });

  console.log("Received data:", req.body);
});
app.listen(port, () => {
  console.log("server is running");
});
