import { Tabs, Tab, Container, Typography, Stack } from "@mui/material";
import { useState } from "react";
import TabPanel from "../Utils/TabPanel";
import Edit from "@public/icons/edit.svg";
import { QuestionBook } from "@/models/QuestionBook";
import timerText from "@/utils/timerText";

interface AnswersListProps {
  questionBooks: QuestionBook[];
}

export default function AnswersList({ questionBooks }: AnswersListProps) {
  const [valueTab, setValueTab] = useState(0);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <Container>
      <Tabs
        value={valueTab}
        onChange={handleChangeTabs}
        variant="scrollable"
        aria-label="abas de selecionar pergunta e resposta"
        sx={{
          "& .MuiTab-root": {
            opacity: 0.2,
            fontSize: "20px",
            fontWeight: "bold",
            textTransform: "none",
          },
          "& .Mui-selected": {
            opacity: 1,
            color: (theme) => theme.palette.primary.main,
          },
        }}
      >
        {questionBooks
          .filter((questionBook) => questionBook.finished)
          .map((questionBook, index) => (
            <Tab
              key={index}
              label={
                <Typography fontSize="18px" fontWeight="bold">
                  {questionBook.title}
                </Typography>
              }
              icon={<Edit stroke="#542DC0" />}
              iconPosition="start"
            />
          ))}
      </Tabs>
      {questionBooks
        .filter((questionBook) => questionBook.finished)
        .map((questionBook, index) => (
          <TabPanel
            key={index}
            value={valueTab}
            id="questions"
            aria-labelledby="Questões"
            index={index}
          >
            <Typography variant="body1" component="h1" fontWeight="bold" pb="20px">
              Tempo de prova: {timerText(questionBook.timeTotal)} de prova
            </Typography>

            {questionBook.questions.map((question, index) => (
              <Stack key={index} spacing="20px" borderBottom={1} borderColor="divider" pb="50px">
                <Typography variant="body1" component="h1" fontWeight="bold">
                  {question.title}
                </Typography>
                <Typography variant="body1" component="span" color="gray">
                  Resposta:
                </Typography>
                <Typography variant="body1" component="article" color="gray">
                  {question.answer}
                </Typography>
              </Stack>
            ))}
          </TabPanel>
        ))}
    </Container>
  );
}
 