const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv =require('dotenv')
const feedbackModel = require("./model/model");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY="AIzaSyB12x7uPfrkCRcRnLNykIjUHQMbupElPS4"
mongoose.connect("mongodb+srv://vishwas_23a:wnSC74rtg4NGsYRt@mydarabase.jyzdgzw.mongodb.net/FeedBack?retryWrites=true&w=majority&appName=myDaraBase");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
port = 2001;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


//     try {
//       const [response] = await client.generateText({
//         model: 'models/text-bison-001',
//         prompt: prompt,
//       });
//       res.json(response.text);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to fetch information' });
//     }
//   });
app.post("/getData", async (req, res) => {
  const { request } = req.body;
  const prompt = ` ${request} and
    Please number each section and present the response in an organized format in detailed explanation in total.`;

  try {
    const result = await model.generateContent(prompt);
    res.json(result.response.text());
  } catch (error) {
    console.error("Error in getData endpoint:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch information", details: error.message });
  }
});
app.get("/info", (req, res) => {
try{
  feedbackModel.find().then((resp) => res.json(resp));

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
