import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // Option 1: Use Hugging Face Inference API
    // You'll need to set HUGGINGFACE_API_KEY environment variable
    const hfApiKey = process.env.HUGGINGFACE_API_KEY;

    if (hfApiKey) {
      // Use Hugging Face Inference API
      const response = await fetch(
        "https://api-inference.huggingface.co/models/unitary/toxic-bert",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hfApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: text }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get prediction from Hugging Face");
      }

      const result = await response.json();

      // Process Hugging Face response
      // toxic-bert returns scores for different labels
      const toxicScore = result[0]?.find((item: any) =>
        item.label.toLowerCase().includes("toxic")
      )?.score || 0;

      const nonToxicScore = 1 - toxicScore;

      return NextResponse.json({
        prediction: toxicScore > 0.5 ? "TOXIC" : "NON-TOXIC",
        toxicProbability: toxicScore,
        nonToxicProbability: nonToxicScore,
        confidence: Math.max(toxicScore, nonToxicScore),
      });
    } else {
      // Option 2: Mock predictions for demo (when no API key is set)
      // This simulates the model behavior for demonstration
      const toxicKeywords = [
        "stupid",
        "idiot",
        "hate",
        "kill",
        "worthless",
        "awful",
        "terrible",
        "bad",
        "worst",
        "ugly",
        "dumb",
        "moron",
      ];

      const lowerText = text.toLowerCase();
      const toxicWordsFound = toxicKeywords.filter((word) =>
        lowerText.includes(word)
      ).length;

      // Simple heuristic for demo purposes
      let toxicScore = Math.min(0.9, toxicWordsFound * 0.25 + 0.1);

      // Add some randomness to make it more realistic
      toxicScore = Math.min(0.95, toxicScore + Math.random() * 0.15);

      const nonToxicScore = 1 - toxicScore;

      return NextResponse.json({
        prediction: toxicScore > 0.5 ? "TOXIC" : "NON-TOXIC",
        toxicProbability: toxicScore,
        nonToxicProbability: nonToxicScore,
        confidence: Math.max(toxicScore, nonToxicScore),
      });
    }
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json(
      { error: "Failed to analyze comment" },
      { status: 500 }
    );
  }
}
