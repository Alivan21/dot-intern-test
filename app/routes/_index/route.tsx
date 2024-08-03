import { Link } from "@remix-run/react";
import { BadgeIcon, PowerIcon, TypeIcon } from "lucide-react";
import Footer from "~/components/Footer";
import HomeHeader from "~/components/HomeHeader";

export default function Index() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <HomeHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32" id="home">
          <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Test Your Knowledge with My Quiz App
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Engage your mind and challenge yourself with a wide range of quiz categories.
                  Track your progress, compete on the leaderboard, and become a trivia master.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
            <img
              src="https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width="550"
              height="550"
              alt="Quiz Illustration"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="feature">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Elevate Your Quiz Experience
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our quiz app offers a range of features to help you learn, compete, and track your
                  progress.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <TypeIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Diverse Categories</h3>
                <p className="text-muted-foreground">
                  Choose from a wide variety of quiz categories, from history and science to pop
                  culture and trivia.
                </p>
              </div>
              <div className="grid gap-1">
                <BadgeIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Leaderboards</h3>
                <p className="text-muted-foreground">
                  Compete with friends and other users on the global leaderboard to see who is the
                  ultimate trivia master.
                </p>
              </div>
              <div className="grid gap-1">
                <PowerIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your progress, see your quiz history, and identify areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
