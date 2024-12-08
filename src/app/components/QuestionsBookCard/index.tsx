import { Card, CardProps, CardContent, Typography, CardActions, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditSVG from "@public/icons/edit.svg";
import Button from "../Utils/Button";
import Link from "next/link";
import TagAnswered from "./TagAnswered";

interface QuestionsBookCardProps extends CardProps {
    title: string,
    answered: boolean, 
    questionsQuantity: number;
    // TODO type of questionsBooks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    questionsBook: any;
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

export default function QuestionsBookCard({ title, answered, questionsQuantity, questionsBook }: QuestionsBookCardProps) {
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
                <Link href={`/caderno/${questionsBook.slug}`} >
                    <Button disabled={answered}>
                        Responder
                    </Button>
                </Link>
            </CardActions>
        </CardStyled>
    )
}
