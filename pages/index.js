import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import db from "../db.json";
import Widget from "../src/components/Widget";
import Link from "../src/components/Link";
import QuizLogo from "../src/components/QuizLogo";
import QuizBackground from "../src/components/QuizBackground";
import QuizContainer from "../src/components/QuizContainer";
import Footer from "../src/components/Footer";
import GithubCorner from "../src/components/GithubCorner";
import Input from "../src/components/Input";
import Button from "../src/components/Button";

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
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" },
          }}
          initial="hidden"
          animate="show"
        >
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
              <Input
                name="nomeDoUsuario"
                onChange={(e) => setName(e.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={!name}>
                Vamos jogar, {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h2>Quizes da Galera...</h2>
            <ul>
              {db.external.map((linkExterno, index) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, "")
                  .replace("https:", "")
                  .replace(".vercel.app", "")
                  .split(".");
                return (
                  <li
                    key={`linkExterno__${index}`}
                    href={`${projectName}___${githubUser}`}
                  >
                    <Widget.Topic as={Link} href={linkExterno}>
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" },
          }}
          initial="hidden"
          animate="show"
        />
        <GithubCorner projectUrl="https://github.com/saramartinss" />
      </QuizContainer>
    </QuizBackground>
  );
}
