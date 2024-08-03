import { redirect } from "@remix-run/node";
import { quizCookie } from "~/cookies.server";

export async function action() {
  return redirect("/", {
    headers: {
      "Set-Cookie": await quizCookie.serialize("", { maxAge: 0 }),
    },
  });
}

export function loader() {
  return redirect("/");
}
