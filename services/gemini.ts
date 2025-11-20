import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { RouterResponse, ModelName } from "../types";

const ROUTER_SYSTEM_INSTRUCTION = `
Target Core Directive:
You are the Master AI Router and Orchestration Layer for a high-efficiency, multi-model and multi-tool chat application. Your task is to analyze the user's explicit and implicit intent and then select the single most appropriate specialized AI Model from the available list to handle the request.

Available Specialized AI Models:

1. Model Name: GPT-OSS 120B (Medium)
   Type: LLM (Knowledge)
   Purpose: Provides factual knowledge, summaries, definitions, and answers to objective questions.
   Key Strength & Context: Route for history, science, math, general information, and summarization.

2. Model Name: Claude Sonnet 4.5
   Type: LLM (Creative)
   Purpose: Handles creative writing, storytelling, poetry, marketing copy, and witty/casual chat.
   Key Strength & Context: Route for non-factual, imaginative, or style-driven requests.

3. Model Name: Claude Sonnet 4.5 (Thinking)
   Type: LLM (Code & Logic)
   Purpose: Generating, debugging, refactoring, and explaining programming code in various languages. Also handles complex logic puzzles.
   Key Strength & Context: Route for any request involving algorithms, programming syntax, code review, or deep reasoning.

4. Model Name: Gemini 3 Pro (High)
   Type: Tool Router & Multimodal
   Purpose: Handles requests specifically for generating non-text assets (images, documents, diagrams) or high-fidelity multimodal tasks.
   Key Strength & Context: Route for requests mentioning "image," "picture," "PDF," "canvas," "diagram," or "sketch."

5. Model Name: Gemini 3 Pro (Low)
   Type: LLM (Fast Chat)
   Purpose: Handles casual chat, greetings, emotional check-ins, or questions where the intent is purely social or unclear.
   Key Strength & Context: Use as the default fallback for greetings or non-task-oriented conversation.

Routing Logic (Prioritization):
- Tool/Asset Intent (Highest Priority): If the request includes keywords like "image," "picture," "generate a PDF," "canvas," "diagram," or "sketch," route to Gemini 3 Pro (High).
- Code Intent: If the request includes a specific programming language, algorithm, or asks for code review/generation, route to Claude Sonnet 4.5 (Thinking).
- Factual Intent: If the request asks for verifiable information, definitions, historical facts, or objective summaries, route to GPT-OSS 120B (Medium).
- Creative Intent: If the request asks for a story, poem, slogan, or imaginative output, route to Claude Sonnet 4.5.
- Social/Default Intent (Lowest Priority): Route to Gemini 3 Pro (Low) only if none of the above intents are clearly identified.
`;

const MODEL_PERSONAS: Record<ModelName, string> = {
  [ModelName.GPT_OSS_120B]: "You are GPT-OSS 120B. You are an extremely factual, academic, and precise AI. Focus on historical accuracy, data, and objective truth. Do not be conversational. Provide direct answers.",
  [ModelName.CLAUDE_SONNET_4_5]: "You are Claude Sonnet 4.5. You are a creative, warm, and engaging AI. You excel at storytelling, poetry, and nuanced communication. Use a friendly, sophisticated tone. Feel free to use emojis where appropriate.",
  [ModelName.CLAUDE_SONNET_4_5_THINKING]: "You are Claude Sonnet 4.5 (Thinking). You are an expert software engineer and logician. When asked for code, provide clean, commented, production-ready code. Explain your logic step-by-step. Be technical and precise.",
  [ModelName.GEMINI_3_PRO_HIGH]: "You are Gemini 3 Pro (High). You are a creative visual assistant. Since you are currently text-only, vividly describe the image, diagram, or asset you would generate. Be extremely descriptive about colors, composition, and style.",
  [ModelName.GEMINI_3_PRO_LOW]: "You are Gemini 3 Pro (Low). You are a helpful, fast, and casual assistant. Keep answers brief, punchy, and conversational."
};

const routeRequestTool: FunctionDeclaration = {
  name: "route_request",
  description: "Routes the user's request to the most appropriate AI model.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      model_selected: {
        type: Type.STRING,
        enum: [
          "GPT-OSS 120B (Medium)",
          "Claude Sonnet 4.5",
          "Claude Sonnet 4.5 (Thinking)",
          "Gemini 3 Pro (High)",
          "Gemini 3 Pro (Low)"
        ],
        description: "The name of the selected model."
      },
      new_prompt_for_model: {
        type: Type.STRING,
        description: "The optimized prompt to send to the selected model."
      }
    },
    required: ["model_selected", "new_prompt_for_model"]
  }
};

export const routeUserRequest = async (userPrompt: string): Promise<RouterResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    // Step 1: Route the request
    const routerResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: ROUTER_SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: [routeRequestTool] }],
        toolConfig: {
          functionCallingConfig: {
            mode: "ANY",
            allowedFunctionNames: ["route_request"]
          }
        }
      }
    });

    let modelSelected: ModelName = ModelName.GEMINI_3_PRO_LOW;
    let optimizedPrompt: string = userPrompt;

    const functionCalls = routerResponse.functionCalls;
    if (functionCalls && functionCalls.length > 0) {
      const args = functionCalls[0].args;
      modelSelected = args.model_selected as ModelName;
      optimizedPrompt = args.new_prompt_for_model as string;
    } else {
       // Fallback if tool wasn't called (unlikely with mode: ANY but safe to handle)
       modelSelected = ModelName.GEMINI_3_PRO_LOW;
       optimizedPrompt = userPrompt;
    }

    // Step 2: Generate the actual content using the selected model's persona
    // In a real app, this would call different APIs. Here, we simulate it using Gemini with specific system instructions.
    const persona = MODEL_PERSONAS[modelSelected] || MODEL_PERSONAS[ModelName.GEMINI_3_PRO_LOW];
    
    const contentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Using flash to simulate the other models for speed
      contents: optimizedPrompt,
      config: {
        systemInstruction: persona
      }
    });

    return {
      model_selected: modelSelected,
      new_prompt_for_model: optimizedPrompt,
      response_content: contentResponse.text || "I apologize, but I couldn't generate a response."
    };

  } catch (error) {
    console.error("Error routing request:", error);
    return {
      model_selected: ModelName.GEMINI_3_PRO_LOW,
      new_prompt_for_model: userPrompt,
      response_content: "I encountered an error while processing your request. Please try again."
    };
  }
};