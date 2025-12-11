"use client";

import { useState } from "react";
import ToxicityDetector from "@/components/ToxicityDetector";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Toxic Comment Detection
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl">
            AI-powered content moderation using DistilBERT
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Powered by Hugging Face Transformers</span>
          </div>
        </div>

        <ToxicityDetector />

        <div className="mt-12 text-center text-gray-400 text-sm">
          <p className="mb-4">
            This tool helps identify potentially toxic or harmful comments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-green-400">✓</span> How it works
              </h3>
              <p className="text-gray-400 text-sm">
                Uses a fine-tuned DistilBERT model trained on 160k+ comments
                to detect toxic language patterns with high accuracy.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-yellow-400">⚠</span> Ethical Use
              </h3>
              <p className="text-gray-400 text-sm">
                This tool should be used as a flagging system, not for
                automatic content removal. Always include human review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
