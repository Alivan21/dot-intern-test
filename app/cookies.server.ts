import { createCookie } from "@remix-run/node";

export const quizCookie = createCookie("quiz", {
  maxAge: 604_800, // one week
});
