import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "../../components/Link";
import Widget from "../../components/Widget";
import QuizLogo from "../../components/QuizLogo";
import QuizBackground from "../../components/QuizBackground";
import QuizContainer from "../../components/QuizContainer";
import Button from "../../components/Button";
import AlternativesForm from "../../components/AlternativesForm";
import BackLinkArrow from "../../components/BackLinkArrow";
import db from "../../../db.json";

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>Resultado...</Widget.Header>
      <Widget.Content>
        <h3>
          Você acertou{" "}
          {results.reduce((currentSum, currentResult) => {
            const isCorrect = currentResult === true;
            isCorrect && currentSum + 1;
            if (isCorrect) {
              return currentSum + 1;
            }
            return currentSum;
          }, 0)}{" "}
          perguntas
        </h3>
        <ul>
          {results.map((result, index) => {
            const actualQuestion = db.questions[index];
            return (
              <li key={`result__${index}`}>
                <Widget.Topic>
                  {index + 1}:{" "}
                  {result === true
                    ? "Muito bem, resposta certa!"
                    : `Você errou. A resposta correta é ${
                        actualQuestion.alternatives[actualQuestion.answer]
                      }`}
                </Widget.Topic>
              </li>
            );
          })}
        </ul>
        <div style={{ textAlign: "center" }}>
          <Button as={Link} href="/" style={{ textDecoration: "none" }}>
            Jogar novamente
          </Button>
        </div>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget
      as={motion.header}
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Widget.Header>Wait for it...</Widget.Header>
    </Widget>
  );
}

function QuestionWidget({
  addResult,
  onSubmit,
  question,
  questionIndex,
  totalQuestions,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          Pergunta {questionIndex} de {totalQuestions}
        </h3>
      </Widget.Header>
      <img
        alt={question.description}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 0.5 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? "SUCCESS" : "ERROR";
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: "none" }}
                  id={alternativeId}
                  name={questionId}
                  onClick={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};

export default function QuizScreen({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;

  function addResult(result) {
    setResults([...results, result]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else setScreenState(screenStates.RESULT);
  }

  return (
    <QuizBackground backgroundImage={externalBg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex + 1}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
