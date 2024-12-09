'use client'

import { Box, Typography, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { useState } from "react";

type TextFieldProps = MuiTextFieldProps & {
    label: string;
    characterlimit?: number;
}

export default function TextField({ label, characterlimit, ...rest }: TextFieldProps) {
    const [values, setValues] = useState({ name: "" });

    const handleChange = (name: string) => {
        return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setValues((prevValues) => ({
                ...prevValues,
                [name]: event.target.value,
            }));
        };
    };

    return (
        <Box position="relative">
            <MuiTextField
                label={label}
                multiline
                rows={8}
                variant="filled"
                value={values.name}
                onChange={handleChange("name")}
                {...rest}
                
                sx={{
                    width: "100%",
                    backgroundColor: "gray.light",
                }}

                slotProps={{
                    input: {
                        disableUnderline: true,
                    },
                    htmlInput: { maxLength: characterlimit }
                }}
            />
            {characterlimit && (
                <Typography
                    variant="body1"
                    component="span"
                    fontSize={{ xs: "12px", sm: "14px" }}
                    color="gray"
                    position="absolute"
                    top="10px"
                    right="10px"
                >
                    {`${values.name.length}/${characterlimit}`}
                </Typography>
            )}
        </Box>
    )
}
