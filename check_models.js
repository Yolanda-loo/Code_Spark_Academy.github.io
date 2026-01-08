require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function findMyModel() {
  try {
    console.log("📡 Connecting to Google to find available models...");
    
    // This command asks Google: "What models can I use?"
    const modelList = await genAI.getGenerativeModel({ model: "gemini-pro" }).apiKey; 
    // Wait, the SDK doesn't expose listModels easily on the instance. 
    // We have to assume the key works and try the fallback list.
    
    // We will try to fetch the list directly if the SDK supports it, 
    // otherwise we brute-force check the most common ones.
    
    const modelsToTry = [
        "gemini-1.5-flash", 
        "gemini-1.5-flash-001", 
        "gemini-1.5-flash-latest",
        "gemini-pro", 
        "gemini-1.0-pro"
    ];

    for (const modelName of modelsToTry) {
        console.log(`\n🔎 Testing model name: "${modelName}"...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            console.log(`✅ SUCCESS! Your server MUST use: "${modelName}"`);
            return; // We found a winner!
        } catch (e) {
            console.log(`❌ Failed: ${modelName} (${e.status || 'Error'})`);
        }
    }
    
    console.log("\n⚠️ CRITICAL: No models worked. Your API Key might be invalid or restricted.");

  } catch (error) {
    console.error("System Error:", error);
  }
}

findMyModel();