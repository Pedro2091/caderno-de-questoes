import { Typography, Stack, Backdrop, Fade, Modal, Container } from "@mui/material";
import Trophy from "@public/images/trophy.png";
import ClockSVG from "@public/icons/clock.svg";
import Image from "next/image";
import Button from "../Utils/Button";
import Link from "next/link";
import timerText from "@/utils/timerText";

interface FinishScreenProps {
  time: number;
}

export default function FinishModal({ time }: FinishScreenProps) {
  return (
    <>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={true} unmountOnExit>
          <Container
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              bgcolor: "white",
              borderRadius: "50px",
              boxShadow: 24,
              transform: "translate(-50%, -50%)",
              padding: {xs:"10% 15%", md:"85px 186px"},
              maxWidth: "90%",
            }}
          >
            <Stack
              alignItems="center"
              spacing="30px"
            >
              <Image
                width={153}
                height={153}
                alt="Troféu"
                src={Trophy}
              />
              <Stack
                alignItems="center"
                spacing="5px"
              >
                <Typography
                  variant="h1"
                  component="h1"
                  color="primary"
                  fontSize={{xs:"25px", sm:"30px"}}
                  fontWeight="bold"
                  textAlign="center"
                >
                  Agradecemos sua participação!
                </Typography>
                <Typography variant="body1" component="h2" textAlign="center">
                  Respostas enviadas com sucesso
                </Typography>
              </Stack>
              <Stack
                alignItems="center"
                spacing="4px"
                direction="row"
              >
                <ClockSVG/>
                <Typography variant="body1" component="h2">
                {timerText(time)} de prova
                </Typography>
              </Stack>
              <Link href="/">
                <Button outlined sx={{ width: "216px" }}>
                  Valeu!
                </Button>
              </Link>
            </Stack>
          </Container>
        </Fade>
      </Modal>
    </>
  );
}