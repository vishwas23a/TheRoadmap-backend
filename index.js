const express=require('express')
const app=express()
const mongoose=require('mongoose')
const feedbackModel=require('./model/model')
const cors=require('cors')
const { GoogleGenerativeAI } = require('@google/generative-ai');


mongoose.connect("mongodb://127.0.0.1:27017/Feedback")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
port=2001

const genAI = new GoogleGenerativeAI('AIzaSyB12x7uPfrkCRcRnLNykIjUHQMbupElPS4'); 
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
app.get('/hello',(req,res)=>{
    res.send("hekl")
})
  
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
app.post('/getData', async (req, res) => {
    const {lang}=req.body;
    const prompt = `Provide a comprehensive overview of the programming language or Framework ${lang}, with the following sections:

    1. Introduction: Briefly introduce ${lang}, including its origin and primary purpose.
    2. Key Features: List and describe ${lang}'s main features, focusing on its unique aspects and strengths.
    3. Syntax and Structure: Give an overview of ${lang}'s syntax and structural design principles.
    4. Popular Use Cases: Outline the most common applications and industries where ${lang} is used.
    5. Advantages and Limitations: Highlight ${lang}'s primary advantages and limitations, making note of its performance, ease of use, and any potential drawbacks.
    6. Ecosystem and Community: Describe the ecosystem of libraries, frameworks, and tools available for ${lang}, and comment on the community's size and activity.
    7. Learning Curve: Provide insights into how challenging or accessible ${lang} is for beginners and experienced programmers.
    8. Conclusion: Summarize the main points and offer an outlook on ${lang}'s future or its role in the industry.
      
    Please number each section and present the response in an organized format with around 1000 words in total.`;
      
    try {

      const result = await model.generateContent(prompt);
      res.json(result.response.text());
    } catch (error) {
      console.error("Error in getData endpoint:", error);
      res.status(500).json({ error: 'Failed to fetch information', details: error.message });
    }
  });
app.get("/info",(req,res)=>{
feedbackModel.find()
.then((resp)=>res.json(resp))
})
app.post("/info",(req,res)=>{
    feedbackModel.create(req.body)
    .then((data)=>res.json(data))
    .catch((err)=>{
        console.log("Something went wrong",err);
        
    })
    
    console.log('Received data:', req.body);
})
app.listen(port,()=>{
    console.log("server is running");
    
})