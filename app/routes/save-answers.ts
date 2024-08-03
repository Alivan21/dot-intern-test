import type { LoaderFunctionArgs } from "@remix-run/node";
import { quizCookie } from "~/cookies.server";

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const answers = JSON.parse(formData.get("answers") as string);

  const cookieHeader = request.headers.get("Cookie");
  const cookieData = (await quizCookie.parse(cookieHeader)) || {};

  cookieData.answers = answers;

  return new Response(null, {
    headers: {
      "Set-Cookie": await quizCookie.serialize(cookieData),
    },
  });
}
