import {
    GoogleGenerativeAI,
    // HarmCategory,
    // HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey: string = "AIzaSyCc71r_D6Lz4SfxMMGbqTApKKZDCZGXOhI";
  
const genAI = new GoogleGenerativeAI(apiKey);
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
    const result = await model.generateContent(message);
    const response = result.response.text();
    return response;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Xin lỗi, tôi không thể trả lời ngay bây giờ.";
  }
}
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };
//   console.log(generationConfig,'cccccccc')
  
  // const safetySettings = [
  //   {
  //     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  //   {
  //     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  //   {
  //     category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  //   {
  //     category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  // ];
  
  // async function run(prompt: string): Promise<string> {
  //   const chatSession = model.startChat({
  //     generationConfig,
  //     safetySettings,
  //     history: [],
  //   });
  
  //   const result = await chatSession.sendMessage(prompt);
  //   console.log(result.response.text());
  //   return result.response.text();
  // }
  
  // console.log(apiKey);
  // export default run;
  