"use client";

import { useState } from "react";

interface PredictionResult {
  prediction: "TOXIC" | "NON-TOXIC";
  toxicProbability: number;
  nonToxicProbability: number;
  confidence: number;
}

const exampleComments = [
  "This is a great movie!",
  "You are stupid and worthless",
  "I love this product",
  "Go away and leave me alone",
];

export default function ToxicityDetector() {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeComment = async () => {
    if (!comment.trim()) {
      setError("Please enter a comment to analyze");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: comment }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze comment");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (example: string) => {
    setComment(example);
    setResult(null);
    setError(null);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-2xl">
      <div className="mb-6">
        <label
          htmlFor="comment"
          className="block text-white font-semibold mb-3 text-lg"
        >
          Enter a comment to analyze:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type or paste a comment here..."
          className="w-full h-32 px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all resize-none"
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <p className="text-gray-400 text-sm mb-2">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {exampleComments.map((example, index) => (
            <button
              key={index}
              onClick={() => loadExample(example)}
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors border border-gray-600"
              disabled={loading}
            >
              {example.length > 30
                ? example.substring(0, 30) + "..."
                : example}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={analyzeComment}
        disabled={loading || !comment.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Analyzing...
          </span>
        ) : (
          "Analyze Comment"
        )}
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-gray-900 rounded-lg border border-gray-700 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">
              {result.prediction === "TOXIC" ? "🔴" : "🟢"}
            </span>
            <div>
              <h3 className="text-2xl font-bold text-white">
                {result.prediction}
              </h3>
              <p className="text-gray-400 text-sm">
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Non-Toxic Probability</span>
                <span className="text-green-400 font-semibold">
                  {(result.nonToxicProbability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${result.nonToxicProbability * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Toxic Probability</span>
                <span className="text-red-400 font-semibold">
                  {(result.toxicProbability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-red-500 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${result.toxicProbability * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {result.prediction === "TOXIC" && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
              <p className="text-red-300 text-sm">
                ⚠ This comment may contain toxic content. Please review
                carefully and consider context before taking action.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
