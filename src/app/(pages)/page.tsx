"use client"

import { Tabs, Tab, Container, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import Header from "@/app/components/Header";
import AnswersList from "@/app/components/AnswersList";
import TabPanel from "@/app/components/Utils/TabPanel";
import QuestionBookCard from "@/app/components/QuestionsBookCard";
import api from "@/services/api";
import { QuestionBook } from "@/models/QuestionBook";

export default function Home() {
  const [questionBooks, setQuestionBooks] = useState<QuestionBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isAnsweredFilter, setIsAnsweredFilter] = useState<boolean>(false);
  const [valueTab, setValueTab] = useState<number>(0);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    api.get('/questionBooks?_embed=questions')
      .then(response => {
        setQuestionBooks(response.data)
        setIsLoading(false)
      }).catch(error => {
        console.error(error)
        setIsLoading(false)
      })
  }, [])


  return (
    <div>
      <Header />
      <main>
        <Container sx={{ py: "44px" }}>
          <Tabs
            value={valueTab}
            onChange={handleChangeTabs}
            aria-label="abas de selecionar pergunta e resposta"
            sx={{
              "& .MuiTab-root": {
                opacity: .2,
                fontSize: "20px",
                fontWeight: "bold",
                textTransform: "none",
              },
              "& .Mui-selected": {
                opacity: 1,
                color: (theme) => theme.palette.primary.main,
              }
            }}
          >
            <Tab label="Questões" id="questions" aria-controls="Questões" />
            <Tab label="Respostas" id="answers" aria-controls="Respostas" />
          </Tabs>
          <TabPanel value={valueTab} id="questions" aria-labelledby="Questões" index={0}>
            {!isLoading
              ?
              <>
                <FormControlLabel control={<Checkbox />} label="Mostrar apenas questões não respondidas" value={isAnsweredFilter} onChange={() => setIsAnsweredFilter(!isAnsweredFilter)} />
                <Stack direction="row" gap="33px" justifyContent="center" flexWrap="wrap">
                  {questionBooks.filter(questionBook => !(questionBook.finished && isAnsweredFilter)).map((questionBook, index) => (
                    <QuestionBookCard
                      key={index}
                      title={questionBook.title}
                      answered={questionBook.finished}
                      questionsQuantity={questionBook.questions.length}
                      questionBook={questionBook}
                    />
                  ))}
                </Stack>
              </>
              :
              <Stack alignItems="center" py="20px">
                <Typography variant="body1" component="span">
                  Carregando...
                </Typography>
              </Stack>
            }


          </TabPanel>
          <TabPanel value={valueTab} id="answers" aria-controls="Respostas" index={1}>
            {!isLoading
              ?
              <AnswersList questionBooks={questionBooks} />
              :
              <Stack alignItems="center" py="20px">
                <Typography variant="body1" component="span">
                  Carregando...
                </Typography>
              </Stack>
            }
          </TabPanel>
        </Container>
      </main>
    </div>
  );
}
