//configuration of the gemini api

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = "AIzaSyCMyDmamXGSnK6W0wuGXcGicQlBwIFCSsU"; 
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // the model i am using here is gemini-1.5-flash
  });
  
  const generationConfig = {
    temperature: 1, //for the randomness in output
    topP: 0.95, //token selection probability
    topK: 64,//limiting the top probable token
    maxOutputTokens: 8192, //maximum number of output tokens
    responseMimeType: "text/plain", 
  };
  
  //implementing run method
  export async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
  
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  }
  
  export default run;
  