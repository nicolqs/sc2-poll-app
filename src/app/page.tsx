"use client";

import { useState } from "react";
import { questions } from "../json/questions";

import PollGame from "./PollGame";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-semibold mb-4">
        Pharaoh Starcraft 2 Poll App
      </h1>
      <PollGame />
    </main>
  );
}
