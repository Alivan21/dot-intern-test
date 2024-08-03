import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { quizCookie } from "~/cookies.server";
import type { Question } from "~/types/quiz";
import Quiz from "./_components/Quiz";

export async function loader({ request, params, context }: LoaderFunctionArgs) {
  const { userId } = await getAuth({ request, params, context });
  if (!userId) {
    return redirect("/");
  }

  const cookieHeader = request.headers.get("Cookie");
  const cookieData = (await quizCookie.parse(cookieHeader)) || {};

  if (cookieData.questions) {
    return cookieData;
  }

  const data = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
  const questions = await data.json();
  const questionsWithId = questions.results.map((q: Question, index: number) => ({
    id: index + 1,
    ...q,
  }));

  const cookieValue = { questions: questionsWithId, timer: 5 };

  return new Response(JSON.stringify(cookieValue), {
    headers: {
      "Set-Cookie": await quizCookie.serialize(cookieValue),
    },
  });
}

export default function QuizPage() {
  const { questions, timer } = useLoaderData<{ questions: Question[]; timer: number }>();

  if (!questions) {
    return (
      <main className="flex min-h-[100dvh] flex-col">
        <div className="m-5 flex items-center justify-center">
          <h1 className="flex-1 text-center font-bold text-xl">My Quiz App</h1>
        </div>
        <div className="my-auto flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div>Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[100dvh] flex-col">
      <div className="m-5 flex items-center justify-center">
        <h1 className="flex-1 text-center font-bold text-xl">My Quiz App</h1>
      </div>
      <div className="my-auto flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Quiz questions={questions} timer={timer} />
      </div>
    </main>
  );
}
