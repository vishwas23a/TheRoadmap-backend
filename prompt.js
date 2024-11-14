// import express from 'express';

// const { GenerateTextRequest }=  require('@google/generative-ai');
// const app = express();

// const key="AIzaSyB12x7uPfrkCRcRnLNykIjUHQMbupElPS4";
// const model = new GenerateTextRequest({
//   model: 'gemini',
//   apiKey: key,
// });

// app.post('/get-info', async (req, res) => {
//   const { language } = req.body;

//   const prompt = `Provide a concise and informative summary of the programming language ${language}.`;

//   try {
//     const response = await model.generate(prompt);
//     res.json(response.text);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch information' });
//   }
// });