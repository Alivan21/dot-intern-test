import { useFetcher, useNavigate } from "@remix-run/react";
import he from "he";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useState } from "react";
import Timer from "~/components/Timer";
import { Button } from "~/components/ui/button";
import type { Question } from "~/types/quiz";
import ResultsDialog from "./ResultsDialog";

export default function Quiz({ questions, timer }: { questions: Question[]; timer: number }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [remainingTime, setRemainingTime] = useState(timer);
  const [showResults, setShowResults] = useState(false);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const handleAnswerClick = (answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSaveClick = () => {
    fetcher.submit(
      {
        answers: JSON.stringify(answers),
        remainingTime: remainingTime.toString(),
      },
      { method: "post", action: "/save-answers" },
    );
  };

  const handleTimerEnd = () => {
    setShowResults(true);
  };

  const handleTimerTick = (timeLeft: number) => {
    setRemainingTime(timeLeft);
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  const handleClearCookiesAndNavigate = () => {
    fetcher.submit(null, { method: "post", action: "/clear-quiz-cookies" });
    navigate("/");
  };

  const calculateResults = () => {
    let totalCorrect = 0;
    let totalAnswered = 0;

    for (const [index, answer] of Object.entries(answers)) {
      totalAnswered++;
      if (answer === questions[Number(index)].correct_answer) {
        totalCorrect++;
      }
    }

    const totalWrong = totalAnswered - totalCorrect;
    const score = (totalCorrect / questions.length) * 100;

    return { totalCorrect, totalWrong, totalAnswered, score };
  };

  const currentSelectedAnswer = answers[currentQuestionIndex] || "";

  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }

  const { totalCorrect, totalWrong, totalAnswered, score } = calculateResults();

  return (
    <div className="w-full max-w-md space-y-6">
      <Timer time={timer} onEnd={handleTimerEnd} onTick={handleTimerTick} />
      {!showResults ? (
        <>
          <div className="flex justify-between items-center">
            <div className="text-sm flex-1 font-medium text-muted-foreground">
              {he.decode(questions[currentQuestionIndex].category)}
            </div>
            <div className="text-sm uppercase flex-1 font-medium text-muted-foreground">
              Difficulty: {questions[currentQuestionIndex].difficulty}
            </div>
            <div className="text-sm flex-1 font-medium text-muted-foreground">
              {currentQuestionIndex + 1} of {questions.length} questions
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {he.decode(questions[currentQuestionIndex].question)}
          </h1>
          <div className="grid grid-cols-1 gap-2">
            {[
              ...questions[currentQuestionIndex].incorrect_answers,
              questions[currentQuestionIndex].correct_answer,
            ].map((answer, index) => (
              <ButtonQuiz
                key={index}
                answer={he.decode(answer)}
                handleAnswerClick={handleAnswerClick}
                selectedAnswer={currentSelectedAnswer}
              >
                {answer}
              </ButtonQuiz>
            ))}
          </div>
          <div className="flex flex-row gap-2">
            <Button
              disabled={currentQuestionIndex === 0}
              onClick={handlePrevClick}
              className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <ChevronLeft />
            </Button>
            <Button onClick={handleSaveClick} className="bg-green-500 hover:bg-green-700">
              <Save />
            </Button>
            <Button
              disabled={currentQuestionIndex === questions.length - 1}
              onClick={handleNextClick}
              className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <ChevronRight />
            </Button>
          </div>
        </>
      ) : (
        <ResultsDialog
          onClearCookiesAndNavigate={handleClearCookiesAndNavigate}
          isOpen={showResults}
          onClose={handleCloseResults}
          totalCorrect={totalCorrect}
          totalWrong={totalWrong}
          totalAnswered={totalAnswered}
          score={score}
        />
      )}
    </div>
  );
}

function ButtonQuiz({
  handleAnswerClick,
  selectedAnswer,
  answer,
  children,
}: {
  handleAnswerClick: (answer: string) => void;
  selectedAnswer: string;
  answer: string;
  children: React.ReactNode;
}) {
  const isSelected = selectedAnswer === answer;
  return (
    <Button
      onClick={() => handleAnswerClick(answer)}
      className={`w-full justify-start rounded-md px-4 py-2 text-left transition-colors ${
        isSelected ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
      variant={isSelected ? "default" : "outline"}
    >
      {children}
    </Button>
  );
}
