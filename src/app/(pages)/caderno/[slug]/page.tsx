'use client'

import { Container, Typography, Stack, Box, Button as MUIButton } from "@mui/material";
import TextField from "@/app/components/Utils/TextField";
import Button from "@/app/components/Utils/Button";
import Image from "next/image";
import Logo from "@public/images/logo.png";
import EditSVG from "@public/icons/edit.svg";
import ArrowLeftSVG from "@public/icons/arrow-left.svg";
import ArrowRightSVG from "@public/icons/arrow-right.svg";
import { useState } from "react";
import FinishModal from "@/app/components/FinishModal";
import Timer from "@/app/components/Utils/Timer";

export default function QuestionPage() {
    // em caso de uso de API
    // o correto seria usar os dados vindos pelo slug/link para buscar as informações
    // porém preferi o uso de dados mockados para focar nos requisitos pedidos
    const title = "Titulo teste da prova";

    const questions = [
        {
            title: "1-Titulo da Pergunta",
            description: "1- Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
        },
        {
            title: "2- Titulo da Pergunta",
            description: "2- Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
        },
        {
            title: "3- Titulo da Pergunta",
            description: "3- Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
        },
    ]

    const steps = questions;

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ?steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = () => {
        // ENVIAR RESPOSTA PARA O BACKEND

        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };


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
                <Container
                    sx={{
                        py: "30px",
                        position: "relative",
                        borderBottom: 1,
                        borderColor: "divider"
                    }}
                >
                    <Stack spacing={{ xs: "32px", sm: "4px" }} alignItems="center">
                        <Timer time={25}/>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <EditSVG/>
        
                            <Typography variant="body1" component="h1" fontWeight="bold" textAlign="center">
                                {title}
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
                            {questions[activeStep].title} {activeStep + 1}/{steps.length}
                        </Typography>

                        <Typography variant="body1" component="article">
                            {questions[activeStep].description}
                        </Typography>
                    </Stack>

                    <Box marginTop="26px">
                        <TextField label={"Escreva sua resposta aqui"} characterlimit={300} />
                    </Box>

                    <Box width="200px" marginTop="40px">
                        <Button
                            onClick={handleComplete}
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
                                    <ArrowLeftSVG/>
                                }
                            >
                                Anterior
                            </MUIButton>
                        }

                        {!(activeStep + 1 === steps.length) &&
                            <MUIButton
                                onClick={handleNext}
                                endIcon={
                                    <ArrowRightSVG/>
                                }
                            >
                                Próximo
                            </MUIButton>
                        }
                    </Stack>
                </Container>

                {allStepsCompleted() && <FinishModal time="00:25:00"/>}
            </main>
        </>
    );
}