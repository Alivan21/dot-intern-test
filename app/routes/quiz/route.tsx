import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/");
  }
  return {};
};

export default function QuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextClick = () => {};

  const handlePrevClick = () => {};

  return (
    <main className="min-h-[100dvh] flex flex-col">
      <div className="flex justify-center items-center m-5">
        <h1 className="text-center flex-1 text-xl font-bold">My Quiz App</h1>
        <Button className="rounded-full ms-auto" size="icon" variant="destructive">
          <X />
        </Button>
      </div>
      <div className="flex flex-col my-auto items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-muted-foreground">Geography Quiz</div>
            <div className="text-sm font-medium text-muted-foreground">Difficulty: Easy</div>
            <div className="text-sm font-medium text-muted-foreground">4 of 10 questions</div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            What is the capital of France?
          </h1>
          <div className="grid grid-cols-1 gap-2">
            <ButtonQuiz
              answer="Berlin"
              handleAnswerClick={handleAnswerClick}
              selectedAnswer={selectedAnswer}
            >
              Berlin
            </ButtonQuiz>
            <ButtonQuiz
              answer="Madrid"
              handleAnswerClick={handleAnswerClick}
              selectedAnswer={selectedAnswer}
            >
              Madrid
            </ButtonQuiz>
            <ButtonQuiz
              answer="Paris"
              handleAnswerClick={handleAnswerClick}
              selectedAnswer={selectedAnswer}
            >
              Paris
            </ButtonQuiz>
            <ButtonQuiz
              answer="Rome"
              handleAnswerClick={handleAnswerClick}
              selectedAnswer={selectedAnswer}
            >
              Rome
            </ButtonQuiz>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              onClick={handleNextClick}
              className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <ChevronLeft />
            </Button>
            <Button className="bg-green-500 hover:bg-green-700">
              <Save />
            </Button>
            <Button
              onClick={handlePrevClick}
              className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </main>
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
  return (
    <Button
      onClick={() => handleAnswerClick(answer)}
      className="justify-start w-full rounded-md px-4 py-2 text-left transition-colors"
      variant={selectedAnswer === answer ? "default" : "outline"}
    >
      {children}
    </Button>
  );
}
