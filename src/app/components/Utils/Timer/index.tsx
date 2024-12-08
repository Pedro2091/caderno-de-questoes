'use client'

import { Stack, Typography } from "@mui/material";
import ClockSVG from "@public/icons/clock.svg";

import { useState, useEffect, useMemo, useCallback } from "react";

interface TimerProps {
    time: number;
}

export default function Timer({ time }: TimerProps) {
    const [timeCount, setTimeCount] = useState<string>();
    const [startDateMs, setStartDateMs] = useState<number | null>(null);
    const [endDateMs, setEndDateMs] = useState<number | null>(null);

    const timerText = useMemo<string>(() => {
        const defaults = "00:00:00";

        if (!startDateMs || !endDateMs) return defaults;

        const total = endDateMs - startDateMs;

        if (total <= 0) return defaults;

        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);

        return (
            (hours > 9 ? hours : "0" + hours) +
            ":" +
            (minutes > 9 ? minutes : "0" + minutes) +
            ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
    }, [startDateMs, endDateMs]);

    const start = useCallback(() => {
        const now = Date.now();
        setStartDateMs(now);
        setEndDateMs(now + time * 1000 * 60); 
    }, []);

    useEffect(() => {
        if (!startDateMs || !endDateMs || endDateMs - startDateMs <= 0) {
            return;
        }
        const intervalId = setInterval(() => {
            setEndDateMs((prev) => {
                if (!prev) return prev;
                return prev - 1000;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [startDateMs, endDateMs]);

    useEffect(() => {
        if (!endDateMs || !startDateMs) return;

        if (endDateMs - startDateMs <= 0) {
            setStartDateMs(null);
            setEndDateMs(null);
        }
    }, [endDateMs, startDateMs]);

    useEffect(() => {
        setTimeCount(timerText);
    }, [timerText, setTimeCount]);

    useEffect(() => {
        start();
    }, []);

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