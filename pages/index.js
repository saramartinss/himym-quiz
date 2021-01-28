import React, { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";

import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizLogo from "../src/components/QuizLogo";
import QuizBackground from "../src/components/QuizBackground";
import Footer from "../src/components/Footer";
import GithubCorner from "../src/components/GithubCorner";

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>HIMYM Quiz</title>
        <meta
          property="og:image"
          content="https://www.itl.cat/pngfile/big/107-1078833_how-i-met-your-mother-met-your-mother.jpg"
        />
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>How I Met Your Mother</h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={function (e) {
                e.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
            >
              <input
                onChange={function (e) {
                  setName(e.target.value);
                }}
                placeholder="Diz aí seu nome"
              />
              <button type="submit" disabled={!name}>
                Vamos jogar, {name}
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h2>Quizes da Galera...</h2>
            <p>
              Dá uma olhada nesses quizes incríveis que o pessoal da Imersão
              React fez:
            </p>
          </Widget.Content>
        </Widget>
        <Footer />
        <GithubCorner projectUrl="https://github.com/saramartinss" />
      </QuizContainer>
    </QuizBackground>
  );
}
