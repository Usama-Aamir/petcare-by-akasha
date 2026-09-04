import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are "Ask a Vet Bot" for Pet Care by Akasha, a Lahore-based pet shop and house-call vet service.
You answer basic, non-diagnostic pet-care questions: food and diet advice, general care tips,
common husbandry, grooming, behavior basics, and product recommendations.
You must NOT diagnose symptoms, illnesses, or medical conditions.
If a user asks about their pet's health or symptoms, politely refuse to diagnose and direct them
to book a vet visit through the "Book a Vet" page or use the emergency button for urgent concerns.
Always keep replies short, friendly, and practical.
`.trim();

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const prompt = `${SYSTEM_PROMPT}\n\nUser message: ${message}`;
    const models = ["gemini-3.5-flash-lite", "gemini-3.6-flash"];

    let reply: string | null = null;
    for (let i = 0; i < models.length; i++) {
      const modelName = models[i];
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        reply = response.text();
        break;
      } catch (err) {
        console.error(`Gemini chat error (${modelName}):`, err);
        if (i < models.length - 1) {
          console.log(`Falling back to ${models[i + 1]}...`);
        }
      }
    }

    if (!reply) {
      return Response.json(
        { error: "Failed to generate a response." },
        { status: 503 }
      );
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Gemini chat error:", error);
    return Response.json(
      { error: "Failed to generate a response." },
      { status: 500 }
    );
  }
}
