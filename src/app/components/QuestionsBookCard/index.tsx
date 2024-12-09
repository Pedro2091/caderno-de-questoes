import { Card, CardProps, CardContent, Typography, CardActions, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditSVG from "@public/icons/edit.svg";
import Button from "../Utils/Button";
import Link from "next/link";
import TagAnswered from "./TagAnswered";
import { QuestionBook } from "@/models/QuestionBook";

interface QuestionBookCardProps extends CardProps {
    title: string,
    answered: boolean, 
    questionsQuantity: number;
    questionBook: QuestionBook;
}

const CardStyled = styled(Card)<CardProps>(() => ({
    width: "100%",
    maxWidth: "300px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    borderRadius: "20px",
}));

export default function QuestionBookCard({ title, answered, questionsQuantity, questionBook }: QuestionBookCardProps) {
    return (
        <CardStyled variant="outlined">
            <CardContent sx={{p: "0" }}>
                <Stack spacing="20px">
                    <EditSVG />

                    <Stack spacing="10px">
                        <Typography variant="body1" component="h1" sx={{ fontWeight: "bold" }}>
                            {title}
                        </Typography>

                        {answered ?
                            <TagAnswered label="Respondido" answered />
                            :
                            <TagAnswered label="Não Respondido" />
                        }
                    </Stack>

                    <Typography variant="body2" component="span" sx={{ fontWeight: "medium" }}>
                        {questionsQuantity} questões
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions sx={{ p: "0", pointerEvents: answered ? "none" : "auto"}}>
                <Link href={{ pathname: `/caderno/${questionBook.slug}`, query: { id: questionBook.id }}}>
                    <Button disabled={answered}>
                        Responder
                    </Button>
                </Link>
            </CardActions>
        </CardStyled>
    )
}
