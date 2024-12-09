'use client'

import { Container, Typography, Stack, Box, Button as MUIButton } from "@mui/material";
import TextField from "@/app/components/Utils/TextField";
import Button from "@/app/components/Utils/Button";
import Image from "next/image";
import Logo from "@public/images/logo.png";
import EditSVG from "@public/icons/edit.svg";
import ArrowLeftSVG from "@public/icons/arrow-left.svg";
import ArrowRightSVG from "@public/icons/arrow-right.svg";
import { useState, useEffect, useRef, useCallback } from "react";
import FinishModal from "@/app/components/FinishModal";
import Timer from "@/app/components/Utils/Timer";
import api from "@/services/api";
import { QuestionBook } from "@/models/QuestionBook";
import { useSearchParams } from "next/navigation";

export default function QuestionPage() {
    const [questionBook, setQuestionBook] = useState<QuestionBook>({} as QuestionBook);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [timeTotal, setTimeTotal] = useState<number>(0);
    const [stopTimer, setStopTimer] = useState<boolean>(false);

    const searchParams = useSearchParams()
    
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        api.get(`/questionBooks/${searchParams.get('id')}?_embed=questions`)
            .then(response => {
                setQuestionBook(response.data)
                setIsLoading(false)
            }).catch(error => {
                console.error(error)
                setIsLoading(false)
            })
    }, [searchParams])

    const steps = questionBook.questions || 0

    const [activeStep, setActiveStep] = useState<number>(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = useCallback(() => {
        return steps.length;
    }, [steps.length]);

    const completedSteps =  useCallback(() => {
        return Object.keys(completed).length;
    }, [completed]);

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = useCallback(() => {
        return completedSteps() === totalSteps();
    }, [completedSteps, totalSteps]);

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = (id: number | undefined) => {
        api.patch(`/questions/${id}`,
            { "answer": inputRefs?.current[activeStep]?.value },
        ).catch(error => {
            console.error(error)
            setIsLoading(false)
        })

        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };

    useEffect(() => {
        if (allStepsCompleted()) {
            setStopTimer(true)

            api.patch(`/questionBooks/${searchParams.get('id')}`,
                { "timeTotal": timeTotal, "finished": true },
            ).catch(error => {
                console.error(error)
                setIsLoading(false)
            })
        }
    }, [allStepsCompleted, searchParams, timeTotal])

    return (
        <>
            <header>
                <Container
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        display: "flex",
                        justifyContent: "center",
                        py: "16px"
                    }}
                >
                    <Image
                        width={107}
                        height={17}
                        alt="Logotipo Estudologia"
                        src={Logo}
                    />
                </Container>
            </header>
            <main>
                {questionBook && !isLoading
                    ? <>
                        <Container
                            sx={{
                                py: "30px",
                                position: "relative",
                                borderBottom: 1,
                                borderColor: "divider"
                            }}
                        >
                            <Stack spacing={{ xs: "32px", sm: "4px" }} alignItems="center">
                                <Timer setTimeTotal={setTimeTotal} stop={stopTimer}/>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <EditSVG />

                                    <Typography variant="body1" component="h1" fontWeight="bold" textAlign="center">
                                        {questionBook.title}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Stack spacing={2} marginTop={{ xs: "40px", sm: "72px" }}>
                                <Typography
                                    variant="body1"
                                    component="h2"
                                    color="gray"
                                    fontWeight="bold"
                                    textTransform="uppercase"
                                >
                                    {questionBook?.questions?.at(activeStep)?.title} {activeStep + 1}/{steps.length}
                                </Typography>

                                <Typography variant="body1" component="article">
                                    {questionBook?.questions?.at(activeStep)?.description}
                                </Typography>
                            </Stack>
                           
                            {questionBook?.questions?.map((question, index) => (
                                <Box key={index} marginTop="26px" display={activeStep === index ? "block" : "none"}>
                                    <TextField
                                        inputRef={(ref:HTMLInputElement) => { inputRefs.current[index] = ref }}
                                        label={`Escreva sua resposta aqui`}
                                        characterlimit={300}
                                        disabled={completed[activeStep]}
                                    />
                                </Box>
                            ))}

                            <Box width="200px" marginTop="40px">
                                <Button
                                    onClick={() => {handleComplete(questionBook?.questions?.at(activeStep)?.id)}}
                                    disabled={completed[activeStep]}
                                >
                                    {completed[activeStep]
                                        ? 'Resposta enviada'
                                        : completedSteps() === totalSteps() - 1
                                            ? 'Finalizar'
                                            : 'Enviar resposta'
                                    }
                                </Button>
                            </Box>
                             
                        </Container>
                        <Container>
                            <Stack
                                direction="row"
                                justifyContent={activeStep === 0 ? "flex-end" : "space-between"}
                                py="26px"

                                sx={{
                                    "& .MuiButton-root": {
                                        color: "gray.main",
                                        textTransform: "capitalize",
                                        fontSize: "14px",
                                    }
                                }}
                            >
                                {!(activeStep === 0) &&
                                    <MUIButton
                                        color="inherit"
                                        onClick={handleBack}
                                        startIcon={
                                            <ArrowLeftSVG />
                                        }
                                    >
                                        Anterior
                                    </MUIButton>
                                }

                                {!(activeStep + 1 === steps.length) &&
                                    <MUIButton
                                        onClick={handleNext}
                                        endIcon={
                                            <ArrowRightSVG />
                                        }
                                    >
                                        Próximo
                                    </MUIButton>
                                }
                            </Stack>
                        </Container>

                        {allStepsCompleted() && <FinishModal time={timeTotal} />}
                    </>
                    :
                    <Stack alignItems="center" py="20px">
                        <Typography variant="body1" component="span">
                            Carregando...
                        </Typography>
                    </Stack>
                }
            </main>
        </>
    );
}