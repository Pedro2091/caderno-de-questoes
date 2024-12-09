'use client'

import { Stack, Typography } from "@mui/material";
import ClockSVG from "@public/icons/clock.svg";

import { useState, useEffect, useMemo, useCallback } from "react";

interface TimerProps {
    setTimeTotal: (time: number) => void;
    stop: boolean;
}

export default function Timer({ setTimeTotal, stop }: TimerProps) {
    const [timeCount, setTimeCount] = useState<string>();
    const [time, setTime] = useState<number>(1);

    const timerText = useMemo<string>(() => {
        const defaults = "00:00:00";

        if (!time) return defaults;

        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / 1000 / 60 / 60) % 24);

        return (
            (hours > 9 ? hours : "0" + hours) +
            ":" +
            (minutes > 9 ? minutes : "0" + minutes) +
            ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
    }, [time]);

    useEffect(() => {
        if (stop) {
            return;
        }
        const intervalId = setInterval(() => {
            setTime((prev) => {
                if (!prev) return prev;
                return prev + 1000;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time]);


    useEffect(() => {
        setTimeCount(timerText);
        setTimeTotal(time);
    }, [timerText, setTimeCount, time, setTimeTotal]);


    return (
        <Stack
            border="solid 2px"
            borderColor="gray.main"
            borderRadius="10px"
            padding="10px 20px"
            direction="row"
            spacing="10px"
            alignItems="center"
            width="fit-content"
            position={{ xs: "relative", sm: "absolute" }}
            right="0"
            top={{ xs: "0", sm: "20px" }}
        >
            <ClockSVG/>
            <Typography variant="body1" color="gray" component="span" fontSize="14px">
                {timeCount 
                    ? timeCount
                    : "00:00:00"
                }
            </Typography>
        </Stack>
    )
}