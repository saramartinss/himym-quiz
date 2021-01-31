import React from "react";
import { ThemeProvider } from "styled-components";
import db from "../../db.json";
import QuizScreen from "../../src/screens/Quiz";

export default function QuizPage() {
  return (
    <ThemeProvider theme={db.theme}>
      <QuizScreen externalQuestions={db.questions} externalBg={db.bg} />
    </ThemeProvider>
  );
}
