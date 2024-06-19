import React, { useState } from "react";
import { questions } from "../json/questions";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const PollGame: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 dark:text-black">
        {currentQuestion.question}
      </h2>
      <div className="space-y-2">
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className={`block w-full py-2 px-4 rounded-md text-left ${
              selectedAnswer === answer
                ? answer === currentQuestion.correctAnswer
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            disabled={!!selectedAnswer}
          >
            {answer}
          </button>
        ))}
      </div>
      {selectedAnswer && (
        <div className="mt-4">
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Next Question
            </button>
          ) : (
            <>
              <div className="text-center">
                <p className="text-lg font-semibold">
                  You scored {score} out of {questions.length}
                </p>
              </div>
              <div className="mt-4 inline-block">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setSelectedAnswer(null);
                    setScore(0);
                  }}
                >
                  Reset Game
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PollGame;
